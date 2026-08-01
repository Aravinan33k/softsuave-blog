import 'server-only';
import { prisma } from '../db';
import { Prisma } from '@/generated/prisma/client';
import type { PostListItem, PostDetail, TaxonomyItem } from './schemas';

// Serializers + queries for the public read API. Only published, live content.

function publishedFilter() {
  return { status: 'PUBLISHED' as const, publishedAt: { lte: new Date() } };
}

const apiInclude = {
  coverImage: { select: { url: true, altText: true } },
  author: { select: { name: true } },
  categories: { include: { category: { select: { name: true, slug: true } } } },
  tags: { include: { tag: { select: { name: true, slug: true } } } },
} as const;

type ApiRow = Prisma.PostGetPayload<{ include: typeof apiInclude }>;

function serialize(p: ApiRow): PostListItem {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImage: p.coverImage ? { url: p.coverImage.url, alt: p.coverImage.altText } : null,
    publishedAt: p.publishedAt?.toISOString() ?? null,
    readingTimeMinutes: p.readingTimeMinutes,
    author: { name: p.author?.name ?? null },
    categories: p.categories.map((c) => c.category),
    tags: p.tags.map((t) => t.tag),
  };
}

export async function listPosts(opts: { page: number; perPage: number; category?: string; tag?: string }): Promise<{ data: PostListItem[]; total: number }> {
  const where: Prisma.PostWhereInput = {
    ...publishedFilter(),
    ...(opts.category ? { categories: { some: { category: { slug: opts.category } } } } : {}),
    ...(opts.tag ? { tags: { some: { tag: { slug: opts.tag } } } } : {}),
  };
  const [rows, total] = await Promise.all([
    prisma.post.findMany({ where, orderBy: { publishedAt: 'desc' }, skip: (opts.page - 1) * opts.perPage, take: opts.perPage, include: apiInclude }),
    prisma.post.count({ where }),
  ]);
  return { data: rows.map(serialize), total };
}

export async function getPostDetail(slug: string): Promise<PostDetail | null> {
  const p = await prisma.post.findFirst({ where: { slug, ...publishedFilter() }, include: apiInclude });
  return p ? { ...serialize(p), contentHtml: p.contentHtml } : null;
}

export async function listTaxonomy(kind: 'category' | 'tag'): Promise<TaxonomyItem[]> {
  const where = { posts: { some: { post: publishedFilter() } } };
  // Count only published posts (not drafts) for the public API.
  const select = {
    name: true,
    slug: true,
    description: true,
    _count: { select: { posts: { where: { post: publishedFilter() } } } },
  };
  const rows =
    kind === 'category'
      ? await prisma.category.findMany({ where, orderBy: { name: 'asc' }, select })
      : await prisma.tag.findMany({ where, orderBy: { name: 'asc' }, select });
  return rows.map((r) => ({ name: r.name, slug: r.slug, description: r.description, postCount: r._count.posts }));
}

export async function getTaxonomyBySlug(kind: 'category' | 'tag', slug: string): Promise<{ name: string; slug: string; description: string | null } | null> {
  return kind === 'category'
    ? prisma.category.findUnique({ where: { slug }, select: { name: true, slug: true, description: true } })
    : prisma.tag.findUnique({ where: { slug }, select: { name: true, slug: true, description: true } });
}

export async function searchPosts(q: string, opts: { page: number; perPage: number }): Promise<{ data: PostListItem[]; total: number }> {
  const offset = (opts.page - 1) * opts.perPage;

  const ranked = await prisma.$queryRaw<{ id: string }[]>`
    SELECT id FROM "Post"
    WHERE status = 'PUBLISHED' AND "publishedAt" <= now()
      AND "searchVector" @@ websearch_to_tsquery('english', ${q})
    ORDER BY ts_rank("searchVector", websearch_to_tsquery('english', ${q})) DESC
    LIMIT ${opts.perPage} OFFSET ${offset}`;
  const ids = ranked.map((r) => r.id);

  const countRows = await prisma.$queryRaw<{ count: number }[]>`
    SELECT count(*)::int AS count FROM "Post"
    WHERE status = 'PUBLISHED' AND "publishedAt" <= now()
      AND "searchVector" @@ websearch_to_tsquery('english', ${q})`;
  const total = countRows[0]?.count ?? 0;

  if (ids.length === 0) return { data: [], total };

  const rows = await prisma.post.findMany({ where: { id: { in: ids } }, include: apiInclude });
  const byId = new Map(rows.map((r) => [r.id, r]));
  const data = ids.map((id) => byId.get(id)).filter((r): r is ApiRow => Boolean(r)).map(serialize);
  return { data, total };
}
