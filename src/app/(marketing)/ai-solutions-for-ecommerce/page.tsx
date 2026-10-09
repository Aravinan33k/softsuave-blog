import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  ecommerceCaseStudies,
  ecommerceChallenges,
  ecommerceFaqs,
  ecommerceHero,
  ecommerceMeta,
  ecommerceProcess,
  ecommerceServices,
  ecommerceWhyUs,
} from '@/lib/home/ecommerce-ai-content';
import { industryTechApproach } from '@/lib/home/industry-shared';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content: the
// client strip the live page opens on, and the closing enquiry band.
import Clients from '@/components/home/clients';
import Contact from '@/components/home/contact';

// SECTOR-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import TechStack from '@/components/landing/tech-stack';
import Process from '@/components/landing/process';
import CaseStudies from '@/components/landing/case-studies';
import Faq from '@/components/landing/faq';
// The live page's challenge tabs — the same selector-and-panel the hire pages
// run for their evaluation criteria.
import Problems from '@/components/generative-ai/problems';

import home from '@/components/home/home.module.css';

/**
 * eCommerce AI Solutions landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/ecommerce-ai-content.ts`). Bands alternate so no two dark sections
 * sit together; technology and process share one light band so the FAQ can
 * sit light ahead of the dark closing band.
 */

export const revalidate = 300;

// The live page's own <title>, verbatim — it carries no brand suffix there.
export const metadata: Metadata = {
  title: ecommerceMeta.title,
  description: ecommerceMeta.description,
  alternates: { canonical: ecommerceMeta.path },
  robots: pageRobots,
  openGraph: {
    title: ecommerceMeta.title,
    description: ecommerceMeta.description,
    url: absoluteUrl(ecommerceMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(ecommerceMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: ecommerceMeta.title,
    description: ecommerceMeta.description,
    images: [dynamicOgImage(ecommerceMeta.title, 'Soft Suave')],
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
  path: ecommerceMeta.path,
  title: ecommerceMeta.title,
  // The live <title> verbatim, as the page's own metadata uses it.
  webPageName: ecommerceMeta.title,
  description: ecommerceMeta.description,
  serviceType: 'eCommerce AI development services',
  offerCatalogName: ecommerceServices.title,
  offers: ecommerceServices.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: ecommerceFaqs.title,
  faqs: ecommerceFaqs.items,
});

export default function EcommerceAiSolutionsPage() {
  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={ecommerceHero} idPrefix="ecommerce" />

        <div className={home.light}>
          <Clients />
        </div>

        <Problems content={ecommerceChallenges} id="challenges" />

        <div className={home.light}>
          <Overview content={ecommerceWhyUs} id="why" />
        </div>

        <Services content={ecommerceServices} variant="bold" />

        <div className={home.light}>
          <TechStack content={industryTechApproach} />
          <Process content={ecommerceProcess} />
        </div>

        <CaseStudies content={ecommerceCaseStudies} />

        <div className={home.light}>
          <Faq content={ecommerceFaqs} idPrefix="ecommerce-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
