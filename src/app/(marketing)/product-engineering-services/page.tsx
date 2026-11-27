import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { prodMeta } from '@/lib/home/product-engineering-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';
import location from '@/components/landing/location-app-page.module.css';
import Sections from './sections';

/**
 * Product Engineering Services landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/product-engineering-content.ts`). Bands alternate so no two dark
 * sections sit together: the two overview blocks share one light band, and
 * the services board sits light ahead of the dark closing band.
 */

export const revalidate = 300;

/**
 * The page's link-preview image (review: "add the Social Share Preview
 * image"). softsuave.com publishes none for this page, so it is a 1200x630
 * card in the style of its other share images: the logo and the page's name
 * over a darkened photograph from the page.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/product-engineering-services-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Software Product Engineering Services - Soft Suave',
};

// The live page's own <title>, verbatim — it carries no brand suffix there.
export const metadata: Metadata = {
  title: prodMeta.title,
  description: prodMeta.description,
  alternates: { canonical: prodMeta.path },
  robots: pageRobots,
  openGraph: {
    title: prodMeta.title,
    description: prodMeta.description,
    url: absoluteUrl(prodMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: prodMeta.title,
    description: prodMeta.description,
    images: [OG_IMAGE.url],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function ProductEngineeringPage() {
  return (
    <div className={`${home.page} ${location.submitBlack} ${landing.stackedHeads} ${home.stackedHeads}`}>
      {/* No page JSON-LD: softsuave.com's own page carries none (its only block
          is the site Organization the shared GTM container injects, which
          this site loads too), and the review asked for the live schema with
          the rest removed. The route is in PAGES_WITH_OWN_SITE_GRAPH, so the
          layout adds no Organization/WebSite of its own either. */}
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
