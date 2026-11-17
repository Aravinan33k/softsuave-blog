import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { webFaqLd } from '@/lib/seo/web-application-development-company';
import { webMeta } from '@/lib/home/web-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
import Sections from './sections';

/**
 * Web Application Development landing page.
 *
 * Served at `/web-application-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The app owns the domain root (no `basePath`;
 * see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/web-app-content.ts`). That page is server-rendered, so the copy was
 * fetched with `curl` and walked with jsdom rather than driven through a
 * headless browser.
 *
 * A SERVER component on purpose: only a server component may export `metadata`
 * (node_modules/next/dist/docs/.../generate-metadata.md), and the (marketing)
 * layout's own metadata is the homepage's. Every section below is a client
 * component, which a server component may freely render.
 *
 * Fonts, the `.theme-four` token scope and Lenis smooth scroll all come from
 * `app/(marketing)/layout.tsx`, so nothing here re-declares them.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

/**
 * The page's link-preview image: softsuave.com's own share card rebuilt at
 * 1200x630 — live's is 840x439, too small for the large preview — with the
 * same logo-and-title layout over this page's hero photograph (review: "add
 * Social Share Preview image").
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/web-application-development-company-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Web App Development Company In India - Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${webMeta.title} | Soft Suave`,
  description: webMeta.description,
  alternates: { canonical: webMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${webMeta.title} | Soft Suave`,
    description: webMeta.description,
    url: absoluteUrl(webMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${webMeta.title} | Soft Suave`,
    description: webMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function WebApplicationDevelopmentPage() {
  return (
    <div className={home.page}>
      {/* The live page's one JSON-LD block, verbatim — see
          `lib/seo/web-application-development-company.ts`. */}
      <JsonLd data={webFaqLd} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a
       * band is just the wrapper. Hero opens dark and the closing Contact
       * band is dark; this is the longest page on the surface, so the
       * reading-heavy sections pair up two to a band in places rather than
       * flipping one by one, which would strobe over eleven sections.
       *
       * The live page has no mid-page CTA band and no case studies, so
       * neither appears here. Nothing is invented to pad the rhythm.
       */}
      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
