import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
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
    images: [dynamicOgImage(legacyMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: legacyMeta.title,
    description: legacyMeta.description,
    images: [dynamicOgImage(legacyMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder: `Service` (its offers are the
 * page's own four services), `WebPage` and a `BreadcrumbList` matching the
 * visible trail (Home › Software Development › Legacy Modernization Services),
 * `@id`-linked to the organization `app/(marketing)/layout.tsx` declares once.
 * The live page carries no FAQ, so there is no `FAQPage`.
 */
const LD = pageSchemaGraph({
  path: legacyMeta.path,
  title: legacyMeta.title,
  // The live <title> verbatim, as the page's own metadata uses it.
  webPageName: legacyMeta.title,
  description: legacyMeta.description,
  serviceType: 'Legacy application modernization',
  offerCatalogName: legacyServices.title,
  offers: legacyServices.items.map((i) => ({ name: i.name, description: i.paragraphs[0] })),
  showBreadcrumb: true,
  parents: [{ name: 'Software Development', path: '/software-development-company' }],
  breadcrumbName: 'Legacy Modernization Services',
});

export default function LegacyModernizationPage() {
  return (
    <div className={home.page}>
      <JsonLd data={LD} />
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
