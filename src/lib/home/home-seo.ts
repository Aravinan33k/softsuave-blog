import 'server-only';
import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { brand } from './content';
import { HOME_LIVE_JSON_LD } from './home-live-schema';

/**
 * Metadata and structured data for the homepage.
 *
 * The 11 Sep review found the page shipping neither: no Open Graph or Twitter
 * tags (the group layout declared title, description and canonical and stopped
 * there, so a shared link had no card), and no JSON-LD at all, while every
 * landing page beside it emits both. This module is the homepage's equivalent of
 * `sectors/seo.ts` and `hire-roles/page-meta.ts`.
 *
 * It lives here rather than in the route so the page file stays a composition of
 * sections, and it is `server-only` because `absoluteUrl` is.
 *
 * The JSON-LD is a verbatim mirror of softsuave.com's homepage — see
 * `home-live-schema.ts`. The marketing layout emits the site-wide
 * Organization and WebSite (`lib/seo/organization.ts`) on every other page but
 * not this one (`NotOnHomepage`), so this page's schema is the live page's and
 * nothing more.
 */

/* The SEO title and description as supplied for the homepage (24 Sep): 46 and
   149 characters, inside the ~60 / ~160 where Google truncates on desktop. */
const TITLE = 'Soft Suave | AI & Software Development Company';

/*
 * Both figures are ones the page already publishes — 13+ years in
 * `clients.body`, 400+ specialists in the proof band's `why.stats` — so neither
 * is a new claim. If either changes on the page, this has to change with it.
 */
const DESCRIPTION =
  'Soft Suave is an AI and software development company with 13+ years of ' +
  'experience and 400+ specialists building scalable, production-ready solutions.';

const OG_IMAGE = dynamicOgImage(brand.name, 'AI & Software Development Company');

export const homeMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/'),
    siteName: brand.name,
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

/**
 * The homepage's JSON-LD: softsuave.com's homepage blocks, copied verbatim —
 * Service, LocalBusiness and Organization, in the live page's order. See
 * `home-live-schema.ts` for why they are kept exactly as the live site has
 * them, quirks included.
 *
 * Copies, so a caller mutating the result cannot edit the source for the next
 * render.
 */
export function homeJsonLd(): Record<string, unknown>[] {
  return HOME_LIVE_JSON_LD.map((node) => structuredClone(node));
}
