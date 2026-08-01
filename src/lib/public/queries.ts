import 'server-only';
import { cache } from 'react';
import type { JSONContent } from '@tiptap/core';
import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '../db';
import { withHeadingAnchors } from '../content/toc';
import type { SiteInfo, PostSummary, PostFull, SocialLink } from '@/themes/_contract';

// Read model for the public site. Only published, already-live content is
// returned. Prisma rows are normalised into the theme view models here so themes
// never touch the database shape.
//
// Loaders that a route calls more than once per render — generateMetadata and
// the page body both need the site chrome and the content row — are wrapped in
// React's cache(). Next only auto-dedupes fetch(), not Prisma calls, so without
// this every public page issues each of these queries twice.

function publishedFilter() {
  return { status: 'PUBLISHED' as const, publishedAt: { lte: new Date() } };
}

// `select`, not `include`: include returns every scalar column of the base row,
// which for Post means dragging contentHtml and contentJson (the two largest
// columns) into archive, related and search listings that never render a body.
const summarySelect = {
  slug: true,
  title: true,
  excerpt: true,
  publishedAt: true,
  readingTimeMinutes: true,
  coverImage: { select: { url: true, altText: true } },
  author: { select: { name: true } },
  categories: { include: { category: { select: { name: true, slug: true } } } },
} as const;

type SummaryRow = {
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: Date | null;
  readingTimeMinutes: number;
  coverImage: { url: string; altText: string } | null;
  author: { name: string | null } | null;
  categories: { category: { name: string; slug: string } }[];
};

function toSummary(p: SummaryRow): PostSummary {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImageUrl: p.coverImage?.url ?? null,
    coverAlt: p.coverImage?.altText ?? null,
    publishedAt: p.publishedAt?.toISOString() ?? null,
    readingTimeMinutes: p.readingTimeMinutes,
    authorName: p.author?.name ?? null,
    categories: p.categories.map((c) => c.category),
  };
}

function parseSocial(json: unknown): SocialLink[] {
  if (!Array.isArray(json)) return [];
  return json
    .filter((x): x is { label?: unknown; url?: unknown } => !!x && typeof x === 'object' && typeof (x as { url?: unknown }).url === 'string')
    .map((x) => ({ label: String(x.label ?? x.url), url: String(x.url) }));
}

const DEFAULT_SITE: SiteInfo = {
  title: 'Softsuave Blog',
  tagline: null,
  description: null,
  logoUrl: null,
  accentColor: '#2563eb',
  fontChoice: 'inter',
  socialLinks: [],
  navPages: [],
  categories: [],
};

// Build-time resilience: if the DB is unreachable during `next build` (CI /
// Docker without a database), return safe defaults so prerendering succeeds;
// pages regenerate with real data via ISR on the first request.
async function safe<T>(fn: () => Promise<T>, fallback: T, ctx: string): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.warn(`[public query] ${ctx} failed (using fallback):`, (err as Error).message);
    return fallback;
  }
}

export const getSiteInfo = cache(async function getSiteInfo(): Promise<SiteInfo> {
  return safe(
    async () => {
      const [settings, pages, categories] = await Promise.all([
        prisma.siteSettings.findUnique({ where: { id: 'singleton' }, include: { logo: { select: { url: true } } } }),
        prisma.page.findMany({ where: publishedFilter(), orderBy: { title: 'asc' }, select: { title: true, slug: true }, take: 12 }),
        prisma.category.findMany({ where: { posts: { some: { post: publishedFilter() } } }, orderBy: { name: 'asc' }, select: { name: true, slug: true }, take: 20 }),
      ]);
      return {
        title: settings?.siteTitle ?? 'Softsuave Blog',
        tagline: settings?.tagline ?? null,
        description: settings?.siteDescription ?? null,
        logoUrl: settings?.logo?.url ?? null,
        accentColor: settings?.accentColor ?? '#2563eb',
        fontChoice: settings?.fontChoice ?? 'inter',
        socialLinks: parseSocial(settings?.socialLinksJson),
        navPages: pages,
        categories,
      };
    },
    DEFAULT_SITE,
    'getSiteInfo',
  );
});

export async function getPublishedPosts(opts: {
  page?: number;
  perPage?: number;
  categorySlug?: string;
  tagSlug?: string;
} = {}): Promise<{ posts: PostSummary[]; total: number }> {
  const perPage = opts.perPage ?? 10;
  const page = Math.max(1, opts.page ?? 1);
  const where = {
    ...publishedFilter(),
    ...(opts.categorySlug ? { categories: { some: { category: { slug: opts.categorySlug } } } } : {}),
    ...(opts.tagSlug ? { tags: { some: { tag: { slug: opts.tagSlug } } } } : {}),
  };
  return safe(
    async () => {
      const [rows, total] = await Promise.all([
        prisma.post.findMany({ where, orderBy: { publishedAt: 'desc' }, skip: (page - 1) * perPage, take: perPage, select: summarySelect }),
        prisma.post.count({ where }),
      ]);
      return { posts: rows.map(toSummary), total };
    },
    { posts: [], total: 0 },
    'getPublishedPosts',
  );
}

export async function getPublishedPostSlugs(): Promise<string[]> {
  return safe(
    async () => {
      const rows = await prisma.post.findMany({ where: publishedFilter(), select: { slug: true } });
      return rows.map((r) => r.slug);
    },
    [],
    'getPublishedPostSlugs',
  );
}

export const getPostBySlug = cache(async function getPostBySlug(slug: string): Promise<PostFull | null> {
  const p = await prisma.post.findFirst({
    where: { slug, ...publishedFilter() },
    include: {
      coverImage: { select: { url: true, altText: true } },
      author: { select: { name: true, title: true, bio: true, socialLinksJson: true, avatar: { select: { url: true } } } },
      categories: { include: { category: { select: { name: true, slug: true } } } },
      tags: { include: { tag: { select: { name: true, slug: true } } } },
    },
  });
  if (!p) return null;
  const { html, toc } = withHeadingAnchors(p.contentHtml);
  const summary: PostSummary = {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImageUrl: p.coverImage?.url ?? null,
    coverAlt: p.coverImage?.altText ?? null,
    publishedAt: p.publishedAt?.toISOString() ?? null,
    readingTimeMinutes: p.readingTimeMinutes,
    authorName: p.author?.name ?? null,
    categories: p.categories.map((c) => c.category),
  };
  const authorProfile = p.author
    ? {
        name: p.author.name,
        title: p.author.title,
        bio: p.author.bio,
        avatarUrl: p.author.avatar?.url ?? null,
        socialLinks: parseSocial(p.author.socialLinksJson),
      }
    : null;
  return {
    ...summary,
    contentHtml: html,
    contentJson: (p.contentJson as JSONContent) ?? null,
    toc,
    tags: p.tags.map((t) => t.tag),
    authorProfile,
    updatedAt: p.updatedAt?.toISOString() ?? null,
    wordCount: p.wordCount,
  };
});

/**
 * Related posts for the "Related Blogs" section: posts sharing a category first,
 * then shared tags, then recent posts as backfill. The current post is excluded
 * and no post appears twice.
 */
export async function getRelatedPosts(post: PostFull, limit = 4): Promise<PostSummary[]> {
  return safe(
    async () => {
      const seen = new Set<string>([post.slug]);
      const take = async (extra: Prisma.PostWhereInput, n: number): Promise<PostSummary[]> => {
        if (n <= 0) return [];
        const rows = await prisma.post.findMany({
          where: { ...publishedFilter(), slug: { notIn: [...seen] }, ...extra },
          orderBy: { publishedAt: 'desc' },
          take: n,
          select: summarySelect,
        });
        rows.forEach((r) => seen.add(r.slug));
        return rows.map(toSummary);
      };

      const categorySlugs = post.categories.map((c) => c.slug);
      const tagSlugs = post.tags.map((t) => t.slug);
      const byCategory = await take(
        categorySlugs.length ? { categories: { some: { category: { slug: { in: categorySlugs } } } } } : {},
        limit,
      );
      const byTag = await take(
        tagSlugs.length ? { tags: { some: { tag: { slug: { in: tagSlugs } } } } } : {},
        limit - byCategory.length,
      );
      const recent = await take({}, limit - byCategory.length - byTag.length);
      return [...byCategory, ...byTag, ...recent];
    },
    [],
    'getRelatedPosts',
  );
}

/** Previous (older) and next (newer) published posts, by publish date. */
export async function getAdjacentPosts(publishedAt: string | null): Promise<{ prev: { slug: string; title: string } | null; next: { slug: string; title: string } | null }> {
  if (!publishedAt) return { prev: null, next: null };
  const at = new Date(publishedAt);
  const [prev, next] = await Promise.all([
    prisma.post.findFirst({ where: { ...publishedFilter(), publishedAt: { lt: at } }, orderBy: { publishedAt: 'desc' }, select: { slug: true, title: true } }),
    prisma.post.findFirst({ where: { ...publishedFilter(), publishedAt: { gt: at } }, orderBy: { publishedAt: 'asc' }, select: { slug: true, title: true } }),
  ]);
  return { prev, next };
}

export const getPageBySlug = cache(async function getPageBySlug(slug: string): Promise<PostFull | null> {
  const p = await prisma.page.findFirst({
    where: { slug, ...publishedFilter() },
    include: { coverImage: { select: { url: true, altText: true } }, author: { select: { name: true } } },
  });
  if (!p) return null;
  const { html, toc } = withHeadingAnchors(p.contentHtml);
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImageUrl: p.coverImage?.url ?? null,
    coverAlt: p.coverImage?.altText ?? null,
    publishedAt: p.publishedAt?.toISOString() ?? null,
    readingTimeMinutes: p.readingTimeMinutes,
    authorName: p.author?.name ?? null,
    categories: [],
    contentHtml: html,
    contentJson: (p.contentJson as JSONContent) ?? null,
    toc,
    tags: [],
    authorProfile: null,
    updatedAt: p.updatedAt?.toISOString() ?? null,
    wordCount: p.wordCount,
  };
});

export interface ContentMeta {
  kind: 'post' | 'page';
  title: string;
  excerpt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  noIndex: boolean;
  canonicalUrl: string | null;
  ogImageUrl: string | null;
  coverImageUrl: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
  section: string | null;
  tags: string[];
  authorName: string | null;
}

/** SEO metadata for a post or page by slug (post takes precedence). */
export const getContentMeta = cache(async function getContentMeta(slug: string): Promise<ContentMeta | null> {
  // Explicit select: this runs in generateMetadata on every content page, and
  // none of the body columns are used to build the tags.
  const baseSelect = {
    title: true,
    excerpt: true,
    seoTitle: true,
    seoDescription: true,
    noIndex: true,
    canonicalUrl: true,
    publishedAt: true,
    updatedAt: true,
    ogImage: { select: { url: true } },
    coverImage: { select: { url: true } },
    author: { select: { name: true } },
  } as const;
  const post = await prisma.post.findFirst({
    where: { slug, ...publishedFilter() },
    select: {
      ...baseSelect,
      categories: { include: { category: { select: { name: true } } } },
      tags: { include: { tag: { select: { name: true } } } },
    },
  });
  const row = post ?? (await prisma.page.findFirst({ where: { slug, ...publishedFilter() }, select: baseSelect }));
  if (!row) return null;
  return {
    kind: post ? 'post' : 'page',
    title: row.title,
    excerpt: row.excerpt,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    noIndex: row.noIndex,
    canonicalUrl: row.canonicalUrl,
    ogImageUrl: row.ogImage?.url ?? null,
    coverImageUrl: row.coverImage?.url ?? null,
    publishedAt: row.publishedAt?.toISOString() ?? null,
    updatedAt: row.updatedAt?.toISOString() ?? null,
    section: post?.categories[0]?.category.name ?? null,
    tags: post?.tags.map((t) => t.tag.name) ?? [],
    authorName: row.author?.name ?? null,
  };
});

export const getCategoryBySlug = cache(async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug }, select: { name: true, slug: true, description: true } });
});

export const getTagBySlug = cache(async function getTagBySlug(slug: string) {
  return prisma.tag.findUnique({ where: { slug }, select: { name: true, slug: true, description: true } });
});

/** Slugs of published categories/tags that have at least one live post — used by generateStaticParams. */
export const getTaxonomySlugs = cache(async function getTaxonomySlugs(kind: 'category' | 'tag'): Promise<string[]> {
  return safe(
    async () => {
      const where = { posts: { some: { post: publishedFilter() } } };
      const rows =
        kind === 'category'
          ? await prisma.category.findMany({ where, select: { slug: true } })
          : await prisma.tag.findMany({ where, select: { slug: true } });
      return rows.map((r) => r.slug);
    },
    [],
    `getTaxonomySlugs(${kind})`,
  );
});

/** Slugs of published standalone pages — the `[slug]` route serves these too. */
export const getPublishedPageSlugs = cache(async function getPublishedPageSlugs(): Promise<string[]> {
  return safe(
    async () => {
      const rows = await prisma.page.findMany({ where: publishedFilter(), select: { slug: true } });
      return rows.map((r) => r.slug);
    },
    [],
    'getPublishedPageSlugs',
  );
});
