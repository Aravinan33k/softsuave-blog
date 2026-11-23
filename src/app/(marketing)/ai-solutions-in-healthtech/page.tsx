import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  healthtechFaqs,
  healthtechMeta,
  healthtechServices,
} from '@/lib/home/healthtech-ai-content';
import { industryTechApproach } from '@/lib/home/industry-shared';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechStack from '@/components/home/tech-stack';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';
import Sections from './sections';

/**
 * HealthTech AI Solutions landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/healthtech-ai-content.ts`). Bands alternate so no two dark sections
 * sit together; testimonials and FAQ share one light band so the FAQ can sit
 * light ahead of the dark closing band.
 */

export const revalidate = 300;

// The live page's own <title>, verbatim — it carries no brand suffix there.
export const metadata: Metadata = {
  title: healthtechMeta.title,
  description: healthtechMeta.description,
  alternates: { canonical: healthtechMeta.path },
  robots: pageRobots,
  openGraph: {
    title: healthtechMeta.title,
    description: healthtechMeta.description,
    url: absoluteUrl(healthtechMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(healthtechMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: healthtechMeta.title,
    description: healthtechMeta.description,
    images: [dynamicOgImage(healthtechMeta.title, 'Soft Suave')],
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
  path: healthtechMeta.path,
  title: healthtechMeta.title,
  // The live <title> verbatim, as the page's own metadata uses it.
  webPageName: healthtechMeta.title,
  description: healthtechMeta.description,
  serviceType: 'HealthTech AI development services',
  offerCatalogName: healthtechServices.title,
  offers: healthtechServices.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: healthtechFaqs.title,
  faqs: healthtechFaqs.items,
});

export default function HealthtechAiSolutionsPage() {
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
