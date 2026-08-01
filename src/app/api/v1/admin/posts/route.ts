import { NextResponse, type NextRequest } from 'next/server';
import type { JSONContent } from '@tiptap/core';
import { prisma } from '@/lib/db';
import { Prisma } from '@/generated/prisma/client';
import type { ContentStatus } from '@/generated/prisma/enums';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { postCreateSchema } from '@/lib/validation/content';
import { slugify, ensureUniqueSlug } from '@/lib/content/slug';
import { renderContent, resolvePublishState } from '@/lib/content/service';
import { POST_INCLUDE } from '@/lib/content/queries';
import { revalidateContent } from '@/lib/revalidate';

// GET /api/v1/admin/posts — paginated list with optional status/search filters.
export async function GET(req: NextRequest) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number.parseInt(searchParams.get('page') ?? '1', 10) || 1);
    const perPage = Math.min(50, Math.max(1, Number.parseInt(searchParams.get('perPage') ?? '20', 10) || 20));
    const status = searchParams.get('status');
    const q = searchParams.get('q')?.trim();
    const mine = searchParams.get('mine') === '1';

    const where: Prisma.PostWhereInput = {};
    if (status && ['DRAFT', 'SCHEDULED', 'PUBLISHED'].includes(status)) where.status = status as ContentStatus;
    if (mine) where.authorId = session.sub;
    if (q) where.title = { contains: q, mode: 'insensitive' };

    const [items, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          publishedAt: true,
          updatedAt: true,
          readingTimeMinutes: true,
          author: { select: { id: true, email: true, name: true } },
        },
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, perPage });
  } catch (err) {
    return handleRouteError(err, 'admin/posts GET');
  }
}

// POST /api/v1/admin/posts — create a post authored by the current user.
export async function POST(req: NextRequest) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const body = await req.json().catch(() => null);
    const parsed = postCreateSchema.safeParse(body);
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Invalid post data.');
    const d = parsed.data;

    const rendered = renderContent(d.contentJson as unknown as JSONContent, d.excerpt);
    const pub = resolvePublishState(d.status ?? 'DRAFT', d.publishedAt, null);
    if (!pub.ok) return jsonError(400, 'invalid_request', pub.error);

    const slug = await ensureUniqueSlug(
      d.slug ?? slugify(d.title),
      async (s) => (await prisma.post.count({ where: { slug: s } })) > 0,
    );

    const post = await prisma.post.create({
      data: {
        title: d.title,
        slug,
        contentJson: d.contentJson as unknown as Prisma.InputJsonValue,
        contentHtml: rendered.contentHtml,
        excerpt: rendered.excerpt,
        status: pub.value.status,
        publishedAt: pub.value.publishedAt,
        authorId: session.sub,
        coverImageId: d.coverImageId ?? null,
        seoTitle: d.seoTitle ?? null,
        seoDescription: d.seoDescription ?? null,
        ogImageId: d.ogImageId ?? null,
        canonicalUrl: d.canonicalUrl ?? null,
        noIndex: d.noIndex ?? false,
        readingTimeMinutes: rendered.readingTimeMinutes,
        wordCount: rendered.wordCount,
        categories: d.categoryIds?.length ? { create: d.categoryIds.map((categoryId) => ({ categoryId })) } : undefined,
        tags: d.tagIds?.length ? { create: d.tagIds.map((tagId) => ({ tagId })) } : undefined,
      },
      include: POST_INCLUDE,
    });

    await logAudit({ action: 'CREATE', userId: session.sub, targetType: 'post', targetId: post.id, req });
    if (post.status === 'PUBLISHED') {
      await logAudit({ action: 'PUBLISH', userId: session.sub, targetType: 'post', targetId: post.id, req });
      revalidateContent([`/${post.slug}`]);
    }
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    return handleRouteError(err, 'admin/posts POST');
  }
}
