import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { vehicleIntelligenceArticleLd } from '@/lib/seo/case-study-vehicle-intelligence';
import { vehicleCaseStudy, vehicleMeta } from '@/lib/home/case-studies/vehicle-intelligence';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import CaseStudy from '@/components/case-study/case-study';

import home from '@/components/home/home.module.css';

/**
 * Vehicle Intelligence — the first case study served by this app, rebuilt
 * from https://www.softsuave.com/case-study-vehicle-intelligence on the
 * case-study template (`components/case-study`). Copy, images, PDF and schema
 * are the live page's; the layout and type are this site's.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD. Fonts,
 * the `.theme-four` tokens and Lenis smooth scroll come from
 * `app/(marketing)/layout.tsx`.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

/**
 * The link-preview image: softsuave.com's own share card for this page (logo,
 * "Vehicle Intelligence" and the H1 over a darkened traffic photo), resized
 * from 1200×628 to 1200×630 and hosted at live's path — the one the page's
 * JSON-LD names.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/case-studies/vehicle-intelligence-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Vehicle Intelligence – A Vision AI Platform for Real-Time Axle Counting & Traffic Monitoring',
};

const TITLE = `${vehicleMeta.title} | Soft Suave`;

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: TITLE,
  description: vehicleMeta.description,
  alternates: { canonical: vehicleMeta.path },
  robots: pageRobots,
  openGraph: {
    title: TITLE,
    description: vehicleMeta.description,
    url: absoluteUrl(vehicleMeta.path),
    siteName: 'Soft Suave',
    type: 'article',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@softsuave',
    title: TITLE,
    description: vehicleMeta.description,
    images: [OG_IMAGE.url],
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath. */
const HOME_HREF = BASE_PATH || '/';

export default function VehicleIntelligenceCaseStudyPage() {
  return (
    <div className={home.page}>
      {/* softsuave.com's own schema for this page — see
          `lib/seo/case-study-vehicle-intelligence.ts`. The route is in
          PAGES_WITH_OWN_SITE_GRAPH, so the layout adds nothing beside it. */}
      <JsonLd data={vehicleIntelligenceArticleLd} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <CaseStudy content={vehicleCaseStudy} idPrefix="case-study-vehicle-intelligence" />
      </main>

      <Footer />
    </div>
  );
}
