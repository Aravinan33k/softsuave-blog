import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { wellPetArticleLd } from '@/lib/seo/case-study-wellpet-ai-smart-wellness-platform';
import { wellPetCaseStudy, wellPetMeta } from '@/lib/home/case-studies/wellpet-ai-smart-wellness-platform';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import CaseStudy from '@/components/case-study/case-study';

import home from '@/components/home/home.module.css';

/**
 * WellPet AI Smart Wellness Platform, rebuilt from
 * https://www.softsuave.com/case-study-wellpet-ai-smart-wellness-platform on
 * the case-study template (`components/case-study`), the same way the Vehicle
 * Intelligence page is. Copy, images, PDF and schema are the live page's; the
 * layout and type are this site's.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD. Fonts,
 * the `.theme-four` tokens and Lenis smooth scroll come from
 * `app/(marketing)/layout.tsx`.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

/**
 * The link-preview image: softsuave.com's share card for this page (the one
 * its JSON-LD names), resized from 1200×628 to 1200×630 and hosted at live's
 * path.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/case-studies/well-pet-og.webp'),
  width: 1200,
  height: 630,
  alt: 'WellPet – An AI-Powered Smart Wellness Platform Revolutionizing Pet Healthcare',
};

const TITLE = `${wellPetMeta.title} | Soft Suave`;

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: TITLE,
  description: wellPetMeta.description,
  alternates: { canonical: 'https://www.softsuave.com/case-study-wellpet-ai-smart-wellness-platform' },
  robots: pageRobots,
  openGraph: {
    title: TITLE,
    description: wellPetMeta.description,
    url: absoluteUrl(wellPetMeta.path),
    siteName: 'Soft Suave',
    type: 'article',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@softsuave',
    title: TITLE,
    description: wellPetMeta.description,
    images: [OG_IMAGE.url],
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath. */
const HOME_HREF = BASE_PATH || '/';

export default function WellPetCaseStudyPage() {
  return (
    <div className={home.page}>
      {/* softsuave.com's own schema for this page — see
          `lib/seo/case-study-wellpet-ai-smart-wellness-platform.ts`. The route
          is in PAGES_WITH_OWN_SITE_GRAPH, so the layout adds nothing beside it. */}
      <JsonLd data={wellPetArticleLd} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <CaseStudy content={wellPetCaseStudy} idPrefix="case-study-wellpet-ai-smart-wellness-platform" />
      </main>

      <Footer />
    </div>
  );
}
