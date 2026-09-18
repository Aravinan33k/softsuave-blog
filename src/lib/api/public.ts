import 'server-only';
import { prisma } from '../db';
import { Prisma } from '@/generated/prisma/client';
import { publicMediaUrl } from '../media-url';
import { toFulltextQuery } from '../search/fulltext';
import type { PostListItem, PostDetail, TaxonomyItem } from './schemas';

// Serializers + queries for the public read API. Only published, live content.

function publishedFilter() {
  return { status: 'PUBLISHED' as const, publishedAt: { lte: new Date() } };
}

// `select`, not `include`: include would also pull contentHtml/contentJson into
// every list and search result, which no list consumer reads.
const apiSelect = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  publishedAt: true,
  readingTimeMinutes: true,
  coverImage: { select: { url: true, altText: true } },
  author: { select: { name: true } },
  categories: { include: { category: { select: { name: true, slug: true } } } },
  tags: { include: { tag: { select: { name: true, slug: true } } } },
} as const;

type ApiRow = Prisma.PostGetPayload<{ select: typeof apiSelect }>;

// Cover URLs are stored root-relative ("/uploads/…") to keep the database
// deployment-agnostic, but the app is mounted under a subpath and only serves
// /uploads prefixed — so the raw value 404s for every consumer of this API: ours
// (LoadMore hands it straight to next/image, which then can't optimise it) and
// external alike. Prefix here, exactly as the server-rendered read path in
// lib/public/queries does. Idempotent, and absolute Cloudinary/S3 URLs are
// returned untouched.
function serialize(p: ApiRow): PostListItem {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImage: p.coverImage ? { url: publicMediaUrl(p.coverImage.url), alt: p.coverImage.altText } : null,
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
    prisma.post.findMany({ where, orderBy: { publishedAt: 'desc' }, skip: (opts.page - 1) * opts.perPage, take: opts.perPage, select: apiSelect }),
    prisma.post.count({ where }),
  ]);
  return { data: rows.map(serialize), total };
}

export async function getPostDetail(slug: string): Promise<PostDetail | null> {
  // The detail endpoint is the one place that does need the rendered body.
  const p = await prisma.post.findFirst({
    where: { slug, ...publishedFilter() },
    select: { ...apiSelect, contentHtml: true },
  });
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

// Relative weight of a title hit over a body hit. The Postgres original used
// tsvector setweight(A/B/C) across title/excerpt/body; MySQL has no per-column
// weighting inside one MATCH, so ranking adds a second MATCH against the
// title-only FULLTEXT index (see @@fulltext in schema.prisma) on top of the
// combined score.
const TITLE_BOOST = 2;

export interface SearchResult {
  data: PostListItem[];
  total: number;
  /**
   * Terms MySQL cannot index (below innodb_ft_min_token_size) that were dropped
   * from the query. Surfaced so the UI can say why "AI" found nothing — without
   * it a real limitation reads as "this blog has no posts about AI".
   */
  ignoredTerms: string[];
}

export async function searchPosts(q: string, opts: { page: number; perPage: number }): Promise<SearchResult> {
  const offset = (opts.page - 1) * opts.perPage;

  // Nothing the FULLTEXT index can match (e.g. every term below
  // innodb_ft_min_token_size). Must short-circuit: an empty AGAINST string is a
  // MySQL syntax error, and stripping the predicate would return every post.
  const fts = toFulltextQuery(q);
  if (fts.query === null) return { data: [], total: 0, ignoredTerms: fts.ignored };

  // One scan, not two: `COUNT(*) OVER ()` returns the unpaginated total on every
  // row, so the page of ranked ids and the total come back together instead of
  // evaluating the same FULLTEXT predicate a second time for the count.
  //
  // UTC_TIMESTAMP(), not NOW(): DATETIME columns carry no timezone and the driver
  // writes them as UTC (see the `timezone` option in lib/db.ts), so NOW() would
  // compare against the MySQL server's local clock and publish/hide scheduled
  // posts at the wrong moment on any server not set to UTC.
  const ranked = await prisma.$queryRaw<{ id: string; total: number | bigint }[]>`
    SELECT id, COUNT(*) OVER () AS total FROM \`Post\`
    WHERE status = 'PUBLISHED' AND publishedAt <= UTC_TIMESTAMP(3)
      AND MATCH(title, excerpt, searchText) AGAINST (${fts.query} IN BOOLEAN MODE)
    ORDER BY
      MATCH(title, excerpt, searchText) AGAINST (${fts.query} IN BOOLEAN MODE)
        + ${TITLE_BOOST} * MATCH(title) AGAINST (${fts.query} IN BOOLEAN MODE) DESC
    LIMIT ${opts.perPage} OFFSET ${offset}`;
  const ids = ranked.map((r) => r.id);
  // The window total is only present when the page has rows; an out-of-range
  // page (or no matches at all) correctly yields 0. MySQL returns COUNT() as
  // BIGINT, which the driver surfaces as a JS BigInt — coerced here because it
  // is serialised into JSON responses, where BigInt throws.
  const total = Number(ranked[0]?.total ?? 0);

  if (ids.length === 0) return { data: [], total, ignoredTerms: fts.ignored };

  const rows = await prisma.post.findMany({ where: { id: { in: ids } }, select: apiSelect });
  const byId = new Map(rows.map((r) => [r.id, r]));
  const data = ids.map((id) => byId.get(id)).filter((r): r is ApiRow => Boolean(r)).map(serialize);
  return { data, total, ignoredTerms: fts.ignored };
}
