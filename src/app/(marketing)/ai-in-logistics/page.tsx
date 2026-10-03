import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  logisticsBenefits,
  logisticsFaqs,
  logisticsHero,
  logisticsMeta,
  logisticsOverview,
  logisticsSolutions,
  logisticsSuccessStories,
} from '@/lib/home/logistics-ai-content';
import { industryTechApproach } from '@/lib/home/industry-shared';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components: the client strip the
// live page opens on, the story lane (fed this page's success stories), the
// client testimonials, and the closing enquiry band.
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// SECTOR-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import CardGrid from '@/components/landing/industries';
import TechStack from '@/components/landing/tech-stack';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';

/**
 * Logistics AI Solutions landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/logistics-ai-content.ts`). Bands alternate so no two dark sections
 * sit together: the client strip and overview share one light band, benefits
 * and technology another, and testimonials and the FAQ a third, so the FAQ
 * sits light ahead of the dark closing band.
 */

export const revalidate = 300;

// The live page's own <title>, verbatim — it carries no brand suffix there.
export const metadata: Metadata = {
  title: logisticsMeta.title,
  description: logisticsMeta.description,
  alternates: { canonical: logisticsMeta.path },
  robots: pageRobots,
  openGraph: {
    title: logisticsMeta.title,
    description: logisticsMeta.description,
    url: absoluteUrl(logisticsMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(logisticsMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: logisticsMeta.title,
    description: logisticsMeta.description,
    images: [dynamicOgImage(logisticsMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder: `Service` (its offers are the
 * page's own solutions list), `WebPage` and `FAQPage` (the page's own FAQs),
 * `@id`-linked to the organization `app/(marketing)/layout.tsx` declares once.
 * Built from the same content the page renders, so the schema can never drift
 * from what a visitor reads.
 */
const LD = pageSchemaGraph({
  path: logisticsMeta.path,
  title: logisticsMeta.title,
  // The live <title> verbatim, as the page's own metadata uses it.
  webPageName: logisticsMeta.title,
  description: logisticsMeta.description,
  serviceType: 'Logistics and supply chain AI development services',
  offerCatalogName: logisticsSolutions.title,
  offers: logisticsSolutions.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: logisticsFaqs.title,
  faqs: logisticsFaqs.items,
});

export default function LogisticsAiSolutionsPage() {
  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={logisticsHero} idPrefix="logistics" />

        <div className={home.light}>
          <Clients />
          <Overview content={logisticsOverview} id="overview" />
        </div>

        <Services content={logisticsSolutions} id="solutions" variant="bold" />

        <div className={home.light}>
          <CardGrid content={logisticsBenefits} id="benefits" variant="feature" />
          <TechStack content={industryTechApproach} />
        </div>

        <WorkGrid content={logisticsSuccessStories} id="results" countLabel="success stories" />

        <div className={home.light}>
          <Testimonials />
          <Faq content={logisticsFaqs} idPrefix="logistics-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
