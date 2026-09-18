import { NextResponse, type NextRequest } from 'next/server';
import type { JSONContent } from '@tiptap/core';
import { prisma } from '@/lib/db';
import { Prisma } from '@/generated/prisma/client';
import type { ContentStatus } from '@/generated/prisma/enums';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { pageCreateSchema } from '@/lib/validation/content';
import { slugify, ensureUniqueSlug } from '@/lib/content/slug';
import { renderContent, resolvePublishState } from '@/lib/content/service';
import { PAGE_INCLUDE } from '@/lib/content/queries';
import { revalidateContent } from '@/lib/revalidate';

// GET /api/v1/admin/pages — paginated list.
export async function GET(req: NextRequest) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number.parseInt(searchParams.get('page') ?? '1', 10) || 1);
    const perPage = Math.min(50, Math.max(1, Number.parseInt(searchParams.get('perPage') ?? '20', 10) || 20));
    const status = searchParams.get('status');
    const q = searchParams.get('q')?.trim();

    const where: Prisma.PageWhereInput = {};
    if (status && ['DRAFT', 'SCHEDULED', 'PUBLISHED'].includes(status)) where.status = status as ContentStatus;
    if (q) where.title = { contains: q }; // case-insensitive via utf8mb4_unicode_ci collation

    const [items, total] = await Promise.all([
      prisma.page.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
        select: { id: true, title: true, slug: true, status: true, publishedAt: true, updatedAt: true, author: { select: { email: true, name: true } } },
      }),
      prisma.page.count({ where }),
    ]);
    return NextResponse.json({ items, total, page, perPage });
  } catch (err) {
    return handleRouteError(err, 'admin/pages GET');
  }
}

// POST /api/v1/admin/pages — create.
export async function POST(req: NextRequest) {
  try {
    const session = await requireApiRole(req);
    if (session instanceof NextResponse) return session;

    const body = await req.json().catch(() => null);
    const parsed = pageCreateSchema.safeParse(body);
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Invalid page data.');
    const d = parsed.data;

    const rendered = renderContent(d.contentJson as unknown as JSONContent, d.excerpt);
    const pub = resolvePublishState(d.status ?? 'DRAFT', d.publishedAt, null);
    if (!pub.ok) return jsonError(400, 'invalid_request', pub.error);

    const slug = await ensureUniqueSlug(
      d.slug ?? slugify(d.title),
      async (s) => (await prisma.page.count({ where: { slug: s } })) > 0,
    );

    const pageRecord = await prisma.page.create({
      data: {
        title: d.title,
        slug,
        contentJson: d.contentJson as unknown as Prisma.InputJsonValue,
        contentHtml: rendered.contentHtml,
        searchText: rendered.searchText,
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
      },
      include: PAGE_INCLUDE,
    });

    await logAudit({ action: 'CREATE', userId: session.sub, targetType: 'page', targetId: pageRecord.id, req });
    if (pageRecord.status === 'PUBLISHED') {
      await logAudit({ action: 'PUBLISH', userId: session.sub, targetType: 'page', targetId: pageRecord.id, req });
      revalidateContent([`/${pageRecord.slug}`]);
    }
    return NextResponse.json({ page: pageRecord }, { status: 201 });
  } catch (err) {
    return handleRouteError(err, 'admin/pages POST');
  }
}
