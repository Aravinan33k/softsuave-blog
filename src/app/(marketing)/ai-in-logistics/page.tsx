import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import { logisticsFaqs, logisticsMeta, logisticsSolutions } from '@/lib/home/logistics-ai-content';
import { industryTechApproach } from '@/lib/home/industry-shared';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechStack from '@/components/home/tech-stack';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';
import Sections from './sections';

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
    <div className={`${home.page} ${location.submitBlack}`}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Sections
          techStack={<TechStack content={industryTechApproach} />}
        />
      </main>

      <Footer />
    </div>
  );
}
