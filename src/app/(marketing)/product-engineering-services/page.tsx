import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  prodAbout,
  prodHero,
  prodMeta,
  prodOverview,
  prodProcess,
  prodServices,
} from '@/lib/home/product-engineering-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's closing enquiry band, standing in for
// the live page's "Book Free Consultation" form.
import Contact from '@/components/home/contact';

// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Process from '@/components/landing/process';
import ServiceBoard from '@/components/common/service-board';

import home from '@/components/home/home.module.css';

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
    images: [dynamicOgImage(prodMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: prodMeta.title,
    description: prodMeta.description,
    images: [dynamicOgImage(prodMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder: `Service` (its offers are the
 * page's own six services), `WebPage` and `BreadcrumbList`, `@id`-linked to the
 * organization `app/(marketing)/layout.tsx` declares once. The trail matches
 * the visible one — Home › Software Development › Product Engineering
 * Services. The live page runs no FAQ, so none is emitted.
 */
const LD = pageSchemaGraph({
  path: prodMeta.path,
  title: prodMeta.title,
  // The live <title> verbatim, as the page's own metadata uses it.
  webPageName: prodMeta.title,
  description: prodMeta.description,
  serviceType: 'Product engineering',
  offerCatalogName: prodServices.title,
  offers: prodServices.items.map((i) => ({ name: i.name, description: i.paragraphs[0] })),
  showBreadcrumb: true,
  parents: [{ name: 'Software Development', path: '/software-development-company' }],
  breadcrumbName: 'Product Engineering Services',
});

export default function ProductEngineeringPage() {
  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={prodHero} idPrefix="product-eng" variant="compact" />

        <div className={home.light}>
          <Overview content={prodOverview} />
          <Overview content={prodAbout} id="about" />
        </div>

        <Process content={prodProcess} />

        {/* Six names to pick from, one stage to read on — the live page's own
            tabs, whose copy is too long to sit on cards. */}
        <div className={home.light}>
          <ServiceBoard content={prodServices} />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
