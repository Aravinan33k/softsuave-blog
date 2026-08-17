import 'server-only';
import { prisma } from '../db';
import { absoluteUrl } from './metadata';

// Shared data for sitemap + feeds. Only indexable, published, live content.

/**
 * The archive's landing URL. The app is mounted at /blog, so its root IS the
 * archive — absoluteUrl('/') resolves to https://…/blog. The marketing homepage
 * is deliberately absent: this deployment cannot serve the site root (the existing
 * website does), so listing it would advertise a URL this app never answers.
 */
function landingEntries(now: Date): SitemapEntry[] {
  return [{ url: absoluteUrl('/'), lastModified: now }];
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
