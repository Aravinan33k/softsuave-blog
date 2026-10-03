import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  fintechBenefits,
  fintechFaqs,
  fintechFeatures,
  fintechHero,
  fintechMeta,
  fintechProcess,
  fintechSectors,
  fintechServices,
  fintechSolutions,
  fintechSuccessStories,
  fintechWhyUs,
} from '@/lib/home/fintech-ai-content';
import { industryTechApproach } from '@/lib/home/industry-shared';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components: the success-story
// lane (given this page's own stories), the testimonials the live page runs,
// and the closing enquiry band.
import WorkGrid from '@/components/home/work-grid';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// SECTOR-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import TechStack from '@/components/landing/tech-stack';
import Faq from '@/components/landing/faq';
// The live page's solution blocks — the same selector-and-panel the hire pages
// run for their evaluation criteria.
import Problems from '@/components/generative-ai/problems';

import home from '@/components/home/home.module.css';

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
        <Hero content={fintechHero} idPrefix="fintech" />

        <div className={home.light}>
          <Problems content={fintechSolutions} id="solutions" />
        </div>

        <Services content={fintechServices} variant="bold" />

        <div className={home.light}>
          <Process content={fintechProcess} />
        </div>

        <CardGrid content={fintechSectors} id="sectors" variant="watermark" columns={5} />

        <div className={home.light}>
          <CardGrid content={fintechBenefits} id="benefits" variant="feature" />
        </div>

        <CardGrid content={fintechFeatures} id="features" columns={5} />

        <div className={home.light}>
          <Overview content={fintechWhyUs} id="why" />
        </div>

        <TechStack content={industryTechApproach} />

        <div className={home.light}>
          <WorkGrid content={fintechSuccessStories} id="success-stories" countLabel="success stories" />
        </div>

        <Testimonials />

        <div className={home.light}>
          <Faq content={fintechFaqs} idPrefix="fintech-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
