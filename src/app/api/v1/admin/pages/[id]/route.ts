import { NextResponse, type NextRequest } from 'next/server';
import type { JSONContent } from '@tiptap/core';
import { prisma } from '@/lib/db';
import { Prisma } from '@/generated/prisma/client';
import type { ContentStatus } from '@/generated/prisma/enums';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { pageUpdateSchema } from '@/lib/validation/content';
import { slugify, ensureUniqueSlug } from '@/lib/content/slug';
import { canModifyContent, renderContent, resolvePublishState } from '@/lib/content/service';
import { PAGE_INCLUDE } from '@/lib/content/queries';
import { revalidateContent } from '@/lib/revalidate';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;
    const { id } = await params;
    const page = await prisma.page.findUnique({ where: { id }, include: PAGE_INCLUDE });
    if (!page) return jsonError(404, 'not_found', 'Page not found.');
    return NextResponse.json({ page });
  } catch (err) {
    return handleRouteError(err, 'admin/pages/[id] GET');
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const existing = await prisma.page.findUnique({ where: { id } });
    if (!existing) return jsonError(404, 'not_found', 'Page not found.');
    if (!canModifyContent(session, existing.authorId)) {
      return jsonError(403, 'forbidden', 'You can only edit your own pages.');
    }

    const body = await req.json().catch(() => null);
    const parsed = pageUpdateSchema.safeParse(body);
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Invalid page data.');
    const d = parsed.data;
    const autosave = new URL(req.url).searchParams.get('autosave') === '1';

    const data: Prisma.PageUpdateInput = {};
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
      data.wordCount = rendered.wordCount;
      data.readingTimeMinutes = rendered.readingTimeMinutes;
      if (d.excerpt === undefined && !existing.excerpt) data.excerpt = rendered.excerpt;
    }

    if (d.slug !== undefined) {
      data.slug = await ensureUniqueSlug(
        d.slug ?? slugify(d.title ?? existing.title),
        async (s) => (await prisma.page.count({ where: { slug: s, NOT: { id } } })) > 0,
      );
    }

    const newStatus: ContentStatus = d.status ?? existing.status;
    if (d.status !== undefined || d.publishedAt !== undefined) {
      const pub = resolvePublishState(newStatus, d.publishedAt, existing.publishedAt);
      if (!pub.ok) return jsonError(400, 'invalid_request', pub.error);
      data.status = pub.value.status;
      data.publishedAt = pub.value.publishedAt;
    }

    const page = await prisma.page.update({ where: { id }, data, include: PAGE_INCLUDE });

    if (!autosave) {
      await logAudit({ action: 'UPDATE', userId: session.sub, targetType: 'page', targetId: id, req });
      if (existing.status !== 'PUBLISHED' && page.status === 'PUBLISHED') {
        await logAudit({ action: 'PUBLISH', userId: session.sub, targetType: 'page', targetId: id, req });
      }
      if (page.status === 'PUBLISHED' || existing.status === 'PUBLISHED') {
        revalidateContent([`/${page.slug}`, ...(existing.slug !== page.slug ? [`/${existing.slug}`] : [])]);
      }
    }
    return NextResponse.json({ page });
  } catch (err) {
    return handleRouteError(err, 'admin/pages/[id] PATCH');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { id } = await params;
    const existing = await prisma.page.findUnique({ where: { id }, select: { authorId: true, slug: true, status: true } });
    if (!existing) return jsonError(404, 'not_found', 'Page not found.');
    if (!canModifyContent(session, existing.authorId)) {
      return jsonError(403, 'forbidden', 'You can only delete your own pages.');
    }

    await prisma.page.delete({ where: { id } });
    await logAudit({ action: 'DELETE', userId: session.sub, targetType: 'page', targetId: id, req });
    if (existing.status === 'PUBLISHED') revalidateContent([`/${existing.slug}`]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleRouteError(err, 'admin/pages/[id] DELETE');
  }
}
