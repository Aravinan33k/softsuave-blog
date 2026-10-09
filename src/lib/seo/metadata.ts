import 'server-only';
import type { Metadata } from 'next';
import { env } from '../env';
import { BASE_PATH, pageRobots } from '../flags';
import type { SiteInfo } from '@/themes/_contract';

// Central metadata builder for public pages: canonical URLs, Open Graph, Twitter
// cards, and robots directives, all from a single call.

// The app owns the domain root, so NEXT_PUBLIC_SITE_URL is the bare origin
// ("https://www.softsuave.com"). It must carry BASE_PATH if the app is ever mounted
// under a subpath again: `basePath` in next.config prefixes routes and assets but
// does NOT reach this helper, so without the subpath there every canonical, sitemap
// and feed URL would point one level too high — at whatever serves the root instead.
const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path; // already absolute (e.g. S3/R2 URL)
  let p = path.startsWith('/') ? path : `/${path}`;
  // Idempotent in the mount subpath. SITE_URL would already end with it, so a path
  // that also carries it — anything through publicMediaUrl, e.g. post.coverImageUrl
  // — must have it stripped or the result doubles to …/blog/blog/uploads/x.webp.
  if (BASE_PATH) {
    if (p === BASE_PATH) return SITE_URL;
    if (p.startsWith(`${BASE_PATH}/`)) p = p.slice(BASE_PATH.length);
  }
  // The site root is SITE_URL itself; appending "/" would emit a trailing slash
  // that redirects, and a canonical must never point at a redirect.
  return p === '/' ? SITE_URL : `${SITE_URL}${p}`;
}

/**
 * Origin that actually serves this deployment's files, for link-preview
 * images. Canonicals and `og:url` must name the public site (SITE_URL), but a
 * crawler has to be able to FETCH an `og:image` — and while the site runs on
 * its Vercel address ahead of launch, SITE_URL (www.softsuave.com) is still
 * the old site, where none of these images exist, so every share preview came
 * back empty ("Social Share Preview is not coming"). On a Vercel deployment
 * with no custom domain yet, `VERCEL_PROJECT_PRODUCTION_URL` is that
 * `*.vercel.app` address; anywhere else — or once the project has its real
 * domain — this is SITE_URL, so nothing changes after launch.
 */
const VERCEL_HOST = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const ASSET_ORIGIN =
  VERCEL_HOST && /\.vercel\.app$/.test(VERCEL_HOST) ? `https://${VERCEL_HOST}` : SITE_URL;

/** Absolute URL of a link-preview image this app serves — see `ASSET_ORIGIN`. */
export function ogImageUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return absoluteUrl(path).replace(SITE_URL, ASSET_ORIGIN);
}

/** URL of the dynamically-generated OG image for content without a custom one. */
export function dynamicOgImage(title: string, subtitle?: string): string {
  const q = new URLSearchParams({ title });
  if (subtitle) q.set('subtitle', subtitle);
  return ogImageUrl(`/og?${q.toString()}`);
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
    // `pageRobots` is noindex too while the site is closed to search engines
    // (`siteIndexable`, lib/flags.ts).
    robots: a.noIndex ? { index: false, follow: false } : pageRobots,
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
