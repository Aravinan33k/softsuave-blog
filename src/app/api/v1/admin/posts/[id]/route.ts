import { NextResponse, type NextRequest } from 'next/server';
import type { JSONContent } from '@tiptap/core';
import { prisma } from '@/lib/db';
import { Prisma } from '@/generated/prisma/client';
import type { ContentStatus } from '@/generated/prisma/enums';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { postUpdateSchema } from '@/lib/validation/content';
import { slugify, ensureUniqueSlug } from '@/lib/content/slug';
import { canModifyContent, renderContent, resolvePublishState, MAX_REVISIONS } from '@/lib/content/service';
import { POST_INCLUDE } from '@/lib/content/queries';
import { revalidateContent, taxonomyPaths } from '@/lib/revalidate';

// GET /api/v1/admin/posts/[id] — full post for the editor.
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id }, include: POST_INCLUDE });
    if (!post) return jsonError(404, 'not_found', 'Post not found.');
    return NextResponse.json({ post });
  } catch (err) {
    return handleRouteError(err, 'admin/posts/[id] GET');
  }
}

// PATCH /api/v1/admin/posts/[id] — update (partial). `?autosave=1` skips creating
// a revision. A non-autosave save that changes content snapshots the prior
// version into PostRevision (pruned to MAX_REVISIONS).
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return jsonError(404, 'not_found', 'Post not found.');
    if (!canModifyContent(session, existing.authorId)) {
      return jsonError(403, 'forbidden', 'You can only edit your own posts.');
    }

    const body = await req.json().catch(() => null);
    const parsed = postUpdateSchema.safeParse(body);
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Invalid post data.');
    const d = parsed.data;
    const autosave = new URL(req.url).searchParams.get('autosave') === '1';

    const data: Prisma.PostUpdateInput = {};
    if (d.title !== undefined) data.title = d.title;
    if (d.excerpt !== undefined) data.excerpt = d.excerpt ?? null;
    if (d.coverImageId !== undefined) data.coverImage = d.coverImageId ? { connect: { id: d.coverImageId } } : { disconnect: true };
    if (d.ogImageId !== undefined) data.ogImage = d.ogImageId ? { connect: { id: d.ogImageId } } : { disconnect: true };
    if (d.seoTitle !== undefined) data.seoTitle = d.seoTitle ?? null;
    if (d.seoDescription !== undefined) data.seoDescription = d.seoDescription ?? null;
    if (d.canonicalUrl !== undefined) data.canonicalUrl = d.canonicalUrl ?? null;
    if (d.noIndex !== undefined) data.noIndex = d.noIndex;

    if (d.contentJson !== undefined) {
      const rendered = renderContent(d.contentJson as unknown as JSONContent, d.excerpt);
      data.contentJson = d.contentJson as unknown as Prisma.InputJsonValue;
      data.contentHtml = rendered.contentHtml;
      data.searchText = rendered.searchText;
      data.wordCount = rendered.wordCount;
      data.readingTimeMinutes = rendered.readingTimeMinutes;
      if (d.excerpt === undefined && !existing.excerpt) data.excerpt = rendered.excerpt;
    }

    if (d.slug !== undefined) {
      data.slug = await ensureUniqueSlug(
        d.slug ?? slugify(d.title ?? existing.title),
        async (s) => (await prisma.post.count({ where: { slug: s, NOT: { id } } })) > 0,
      );
    }

    const newStatus: ContentStatus = d.status ?? existing.status;
    if (d.status !== undefined || d.publishedAt !== undefined) {
      const pub = resolvePublishState(newStatus, d.publishedAt, existing.publishedAt);
      if (!pub.ok) return jsonError(400, 'invalid_request', pub.error);
      data.status = pub.value.status;
      data.publishedAt = pub.value.publishedAt;
    }

    const willSnapshot = !autosave && d.contentJson !== undefined;

    const post = await prisma.$transaction(async (tx) => {
      if (willSnapshot) {
        await tx.postRevision.create({
          data: {
            postId: id,
            title: existing.title,
            excerpt: existing.excerpt,
            contentJson: existing.contentJson as Prisma.InputJsonValue,
          },
        });
        // Prune to the newest MAX_REVISIONS.
        const stale = await tx.postRevision.findMany({
          where: { postId: id },
          orderBy: { createdAt: 'desc' },
          skip: MAX_REVISIONS,
          select: { id: true },
        });
        if (stale.length) {
          await tx.postRevision.deleteMany({ where: { id: { in: stale.map((r) => r.id) } } });
        }
      }

      if (d.categoryIds !== undefined) {
        await tx.postCategory.deleteMany({ where: { postId: id } });
        if (d.categoryIds.length) {
          await tx.postCategory.createMany({ data: d.categoryIds.map((categoryId) => ({ postId: id, categoryId })) });
        }
      }
      if (d.tagIds !== undefined) {
        await tx.postTag.deleteMany({ where: { postId: id } });
        if (d.tagIds.length) {
          await tx.postTag.createMany({ data: d.tagIds.map((tagId) => ({ postId: id, tagId })) });
        }
      }

      return tx.post.update({ where: { id }, data, include: POST_INCLUDE });
    });

    if (!autosave) {
      await logAudit({ action: 'UPDATE', userId: session.sub, targetType: 'post', targetId: id, req });
      if (existing.status !== 'PUBLISHED' && post.status === 'PUBLISHED') {
        await logAudit({ action: 'PUBLISH', userId: session.sub, targetType: 'post', targetId: id, req });
      }
      // Revalidate if the post is (or just was) publicly visible.
      if (post.status === 'PUBLISHED' || existing.status === 'PUBLISHED') {
        revalidateContent([
          `/${post.slug}`,
          ...(existing.slug !== post.slug ? [`/${existing.slug}`] : []),
          ...taxonomyPaths(post),
        ]);
      }
    }
    return NextResponse.json({ post });
  } catch (err) {
    return handleRouteError(err, 'admin/posts/[id] PATCH');
  }
}

// DELETE /api/v1/admin/posts/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    // Categories/tags are read before the delete cascades the join rows, so the
    // archives the post used to appear in can still be revalidated.
    const existing = await prisma.post.findUnique({
      where: { id },
      select: {
        authorId: true,
        slug: true,
        status: true,
        categories: { select: { category: { select: { slug: true } } } },
        tags: { select: { tag: { select: { slug: true } } } },
      },
    });
    if (!existing) return jsonError(404, 'not_found', 'Post not found.');
    if (!canModifyContent(session, existing.authorId)) {
      return jsonError(403, 'forbidden', 'You can only delete your own posts.');
    }

    await prisma.post.delete({ where: { id } }); // revisions + join rows cascade
    await logAudit({ action: 'DELETE', userId: session.sub, targetType: 'post', targetId: id, req });
    if (existing.status === 'PUBLISHED') revalidateContent([`/${existing.slug}`, ...taxonomyPaths(existing)]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleRouteError(err, 'admin/posts/[id] DELETE');
  }
}
