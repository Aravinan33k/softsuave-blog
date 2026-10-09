import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  edtechBenefits,
  edtechFaqs,
  edtechHero,
  edtechMeta,
  edtechOverview,
  edtechSolutions,
  edtechSuccessStories,
} from '@/lib/home/edtech-ai-content';
import { industryTechApproach } from '@/lib/home/industry-shared';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components: the client strip the
// live page opens on, the success-story lane (with this page's stories), the
// testimonials, and the closing enquiry band.
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// SECTOR-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import CardGrid from '@/components/landing/industries';
import TechStack from '@/components/landing/tech-stack';
import Faq from '@/components/landing/faq';
// The live page's solution tabs — the same selector-and-panel the hire pages
// run for their evaluation criteria.
import Problems from '@/components/generative-ai/problems';

import home from '@/components/home/home.module.css';

/**
 * EdTech AI Solutions landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/edtech-ai-content.ts`). Bands alternate so no two dark sections
 * sit together; testimonials and FAQ share one light band so the FAQ can sit
 * light ahead of the dark closing band.
 */

export const revalidate = 300;

// The live page's own <title>, verbatim — it carries no brand suffix there.
export const metadata: Metadata = {
  title: edtechMeta.title,
  description: edtechMeta.description,
  alternates: { canonical: edtechMeta.path },
  robots: pageRobots,
  openGraph: {
    title: edtechMeta.title,
    description: edtechMeta.description,
    url: absoluteUrl(edtechMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(edtechMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: edtechMeta.title,
    description: edtechMeta.description,
    images: [dynamicOgImage(edtechMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder: `Service` (its offers are the
 * page's own solution list), `WebPage` and `FAQPage` (the page's own FAQs),
 * `@id`-linked to the organization `app/(marketing)/layout.tsx` declares once.
 * Built from the same content the page renders, so the schema can never drift
 * from what a visitor reads.
 */
const LD = pageSchemaGraph({
  path: edtechMeta.path,
  title: edtechMeta.title,
  // The live <title> verbatim, as the page's own metadata uses it.
  webPageName: edtechMeta.title,
  description: edtechMeta.description,
  serviceType: 'EdTech AI development services',
  offerCatalogName: edtechSolutions.title,
  offers: edtechSolutions.rows.map((r) => ({ name: r.problem, description: r.solution })),
  faqName: edtechFaqs.title,
  faqs: edtechFaqs.items,
});

export default function EdtechAiSolutionsPage() {
  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={edtechHero} idPrefix="edtech" />

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={edtechOverview} id="overview" />

        <div className={home.light}>
          <Problems content={edtechSolutions} id="solutions" />
        </div>

        <CardGrid content={edtechBenefits} id="benefits" variant="feature" />

        <div className={home.light}>
          <TechStack content={industryTechApproach} />
        </div>

        <WorkGrid content={edtechSuccessStories} id="success-stories" countLabel="case studies" />

        <div className={home.light}>
          <Testimonials />
          <Faq content={edtechFaqs} idPrefix="edtech-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
