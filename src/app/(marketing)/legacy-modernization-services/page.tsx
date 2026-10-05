import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import {
  legacyAbout,
  legacyHero,
  legacyMeta,
  legacyServices,
  legacyTopCompany,
} from '@/lib/home/legacy-modernization-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's closing enquiry band, which is the
// live page's "Book Free Consultation" form.
import Contact from '@/components/home/contact';

// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
// Four services carrying three or four paragraphs each — the board keeps every
// paragraph without a wall of text, as on the PHP and NodeJS pages.
import ServiceBoard from '@/components/common/service-board';

import home from '@/components/home/home.module.css';

/**
 * Legacy Modernization Services landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/legacy-modernization-content.ts`). Bands alternate light / dark /
 * light between the dark hero and the dark closing band.
 */

export const revalidate = 300;

/**
 * The page's link-preview image (review: "add the Social Share Preview
 * image"). softsuave.com publishes none for this page, so it is a 1200x630
 * card in the style of its other share images: the logo and the page's name
 * over a darkened photograph from the page.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/legacy-modernization-services-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Legacy Application Modernization Services - Soft Suave',
};

// The live page's own <title>, verbatim — it carries its brand suffix already.
export const metadata: Metadata = {
  title: legacyMeta.title,
  description: legacyMeta.description,
  alternates: { canonical: legacyMeta.path },
  robots: pageRobots,
  openGraph: {
    title: legacyMeta.title,
    description: legacyMeta.description,
    url: absoluteUrl(legacyMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: legacyMeta.title,
    description: legacyMeta.description,
    images: [OG_IMAGE.url],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function LegacyModernizationPage() {
  return (
    <div className={home.page}>
      {/* No page JSON-LD: softsuave.com's own page carries none (its only block
          is the site Organization the shared GTM container injects, which
          this site loads too), and the review asked for the live schema with
          the rest removed. The route is in PAGES_WITH_OWN_SITE_GRAPH, so the
          layout adds no Organization/WebSite of its own either. */}
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={legacyHero} idPrefix="legacy" variant="compact" />

        <div className={home.light}>
          <Overview content={legacyTopCompany} id="overview" />
        </div>

        <Overview content={legacyAbout} id="why" />

        <div className={home.light}>
          <ServiceBoard content={legacyServices} />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
