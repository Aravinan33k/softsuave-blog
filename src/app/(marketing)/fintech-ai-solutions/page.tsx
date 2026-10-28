import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import { fintechFaqs, fintechMeta, fintechServices } from '@/lib/home/fintech-ai-content';
import { industryTechApproach } from '@/lib/home/industry-shared';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechStack from '@/components/home/tech-stack';

import home from '@/components/home/home.module.css';
import Sections from './sections';

/**
 * Fintech AI Solutions landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/fintech-ai-content.ts`). Eleven sections alternate light and dark
 * from the dark hero, so no two dark bands sit together and the FAQ sits light
 * ahead of the dark closing band.
 */

export const revalidate = 300;

// The live page's own <title>, verbatim — it carries no brand suffix there.
export const metadata: Metadata = {
  title: fintechMeta.title,
  description: fintechMeta.description,
  alternates: { canonical: fintechMeta.path },
  robots: pageRobots,
  openGraph: {
    title: fintechMeta.title,
    description: fintechMeta.description,
    url: absoluteUrl(fintechMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(fintechMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: fintechMeta.title,
    description: fintechMeta.description,
    images: [dynamicOgImage(fintechMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder: `Service` (its offers are the
 * page's own service list), `WebPage` and `FAQPage` (the page's own FAQs),
 * `@id`-linked to the organization `app/(marketing)/layout.tsx` declares once.
 * Built from the same content the page renders, so the schema can never drift
 * from what a visitor reads.
 */
const LD = pageSchemaGraph({
  path: fintechMeta.path,
  title: fintechMeta.title,
  // The live <title> verbatim, as the page's own metadata uses it.
  webPageName: fintechMeta.title,
  description: fintechMeta.description,
  serviceType: 'Fintech AI development services',
  offerCatalogName: fintechServices.title,
  offers: fintechServices.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: fintechFaqs.title,
  faqs: fintechFaqs.items,
});

export default function FintechAiSolutionsPage() {
  return (
    <div className={home.page}>
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
