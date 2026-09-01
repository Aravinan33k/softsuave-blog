import 'server-only';
import { prisma } from '../db';
import { homepageEnabled } from '../flags';
import { absoluteUrl } from './metadata';

// Shared data for sitemap + feeds. Only indexable, published, live content.

/**
 * The hand-written landing URLs: the marketing surface in app/(marketing) plus
 * "/blog", the post archive. Everything else in the sitemap comes from the
 * database.
 *
 * The marketing routes are listed only once the homepage is released. While the
 * flag is off they are 307s to the archive, and a sitemap must never advertise a
 * redirect. Keep this list in step with MARKETING_ROUTES in next.config.ts.
 */
const MARKETING_ROUTES = ['/', '/ai-development-service'];

function landingEntries(now: Date): SitemapEntry[] {
  return [
    ...(homepageEnabled ? MARKETING_ROUTES.map((p) => ({ url: absoluteUrl(p), lastModified: now })) : []),
    { url: absoluteUrl('/blog'), lastModified: now },
  ];
}

function published() {
  return { status: 'PUBLISHED' as const, publishedAt: { lte: new Date() } };
}

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  /** Cover image URLs for Google's image-sitemap extension. */
  images?: string[];
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  try {
    return await sitemapEntriesQuery();
  } catch (err) {
    console.warn('[sitemap] query failed (using home only):', (err as Error).message);
    return landingEntries(new Date());
  }
}

async function sitemapEntriesQuery(): Promise<SitemapEntry[]> {
  const [posts, pages, categories, tags] = await Promise.all([
    prisma.post.findMany({
      where: { ...published(), noIndex: false },
      select: { slug: true, updatedAt: true, coverImage: { select: { url: true } } },
    }),
    prisma.page.findMany({ where: { ...published(), noIndex: false }, select: { slug: true, updatedAt: true } }),
    prisma.category.findMany({ where: { posts: { some: { post: published() } } }, select: { slug: true } }),
    prisma.tag.findMany({ where: { posts: { some: { post: published() } } }, select: { slug: true } }),
  ]);

  const now = new Date();
  const entries = landingEntries(now);
  posts.forEach((p) =>
    entries.push({
      url: absoluteUrl(`/${p.slug}`),
      lastModified: p.updatedAt,
      images: p.coverImage ? [absoluteUrl(p.coverImage.url)] : undefined,
    }),
  );
  pages.forEach((p) => entries.push({ url: absoluteUrl(`/${p.slug}`), lastModified: p.updatedAt }));
  categories.forEach((c) => entries.push({ url: absoluteUrl(`/category/${c.slug}`), lastModified: now }));
  tags.forEach((t) => entries.push({ url: absoluteUrl(`/tag/${t.slug}`), lastModified: now }));
  return entries;
}

export interface FeedPost {
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: Date | null;
  authorName: string | null;
}

export async function getFeedPosts(limit = 30): Promise<FeedPost[]> {
  try {
    return await feedPostsQuery(limit);
  } catch (err) {
    console.warn('[feed] query failed (empty feed):', (err as Error).message);
    return [];
  }
}

async function feedPostsQuery(limit: number): Promise<FeedPost[]> {
  const posts = await prisma.post.findMany({
    where: { ...published(), noIndex: false },
    orderBy: { publishedAt: 'desc' },
    take: limit,
    select: { slug: true, title: true, excerpt: true, publishedAt: true, author: { select: { name: true } } },
  });
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    publishedAt: p.publishedAt,
    authorName: p.author?.name ?? null,
  }));
}
