import 'server-only';
import type { Metadata } from 'next';
import { env } from '../env';
import { BASE_PATH } from '../flags';
import type { SiteInfo } from '@/themes/_contract';

// Central metadata builder for public pages: canonical URLs, Open Graph, Twitter
// cards, and robots directives, all from a single call.

// Includes the mount subpath, because the app is served under one: NEXT_PUBLIC_SITE_URL
// is "https://www.softsuave.com/blog", not the bare origin. `basePath` in
// next.config prefixes routes and assets but does NOT reach this helper, so without
// the subpath here every canonical, sitemap and feed URL would point one level too
// high — at the existing website, which does not serve them.
const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path; // already absolute (e.g. S3/R2 URL)
  let p = path.startsWith('/') ? path : `/${path}`;
  // Idempotent in the mount subpath. SITE_URL already ends with it, so a path that
  // also carries it — anything through publicMediaUrl, e.g. post.coverImageUrl —
  // must have it stripped or the result doubles to …/blog/blog/uploads/x.webp.
  if (p === BASE_PATH) return SITE_URL;
  if (p.startsWith(`${BASE_PATH}/`)) p = p.slice(BASE_PATH.length);
  // The mount root is SITE_URL itself; appending "/" would emit a trailing slash
  // that redirects, and a canonical must never point at a redirect.
  return p === '/' ? SITE_URL : `${SITE_URL}${p}`;
}

/** URL of the dynamically-generated OG image for content without a custom one. */
export function dynamicOgImage(title: string, subtitle?: string): string {
  const q = new URLSearchParams({ title });
  if (subtitle) q.set('subtitle', subtitle);
  return absoluteUrl(`/og?${q.toString()}`);
}

interface BuildArgs {
  site: SiteInfo;
  title: string;
  description?: string | null;
  /** Canonical path, e.g. "/my-post". */
  path: string;
  home?: boolean;
  /** Use this exact title (e.g. an imported Yoast SEO title) instead of the template. */
  rawTitle?: string | null;
  type?: 'website' | 'article';
  /** Absolute image URLs; falls back to a generated OG image. */
  images?: string[];
  noIndex?: boolean;
  canonicalOverride?: string | null;
  publishedTime?: string | null;
  modifiedTime?: string | null;
  section?: string | null;
  tags?: string[];
  authorName?: string | null;
}

export function buildMetadata(a: BuildArgs): Metadata {
  const title = a.rawTitle?.trim() || (a.home ? a.site.title : `${a.title} | ${a.site.title}`);
  const description = a.description ?? a.site.description ?? a.site.tagline ?? undefined;
  const canonical = a.canonicalOverride?.trim() || absoluteUrl(a.path);
  const hasCustomImage = !!a.images && a.images.length > 0;
  const images = hasCustomImage ? a.images : [dynamicOgImage(a.title, a.site.title)];
  // The generated fallback OG image is exactly 1200×630 (see app/og/route.tsx), so
  // declare its dimensions; custom uploads get alt only (true size unknown here).
  const ogImages = (images as string[]).map((url) =>
    hasCustomImage ? { url, alt: a.title } : { url, width: 1200, height: 630, alt: a.title },
  );
  const twitterHandle = a.site.socialLinks
    .map((s) => s.url.match(/(?:twitter\.com|x\.com)\/@?([A-Za-z0-9_]+)/)?.[1])
    .find(Boolean);

  return {
    title,
    description,
    alternates: { canonical },
    robots: a.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: a.site.title,
      type: a.type ?? 'website',
      images: ogImages,
      ...(a.publishedTime ? { publishedTime: a.publishedTime } : {}),
      ...(a.modifiedTime ? { modifiedTime: a.modifiedTime } : {}),
      ...(a.section ? { section: a.section } : {}),
      ...(a.tags && a.tags.length ? { tags: a.tags } : {}),
      ...(a.authorName ? { authors: [a.authorName] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
      ...(twitterHandle ? { site: `@${twitterHandle}` } : {}),
    },
  };
}
