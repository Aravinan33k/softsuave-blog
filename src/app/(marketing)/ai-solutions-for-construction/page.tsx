import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  constructionBenefits,
  constructionCta,
  constructionFaqs,
  constructionHero,
  constructionMeta,
  constructionOverview,
  constructionSolutions,
  constructionSuccessStories,
} from '@/lib/home/construction-ai-content';
import { industryTechApproach } from '@/lib/home/industry-shared';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content: the
// client strip the live page opens on, the case-study lane (with this page's
// own stories), the testimonials, and the closing enquiry band.
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
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';

/**
 * Construction AI Solutions landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/construction-ai-content.ts`). Bands alternate so no two dark
 * sections sit together. The CTA band is always dark (it re-points its own
 * tokens), so technology and success stories share one light band ahead of it,
 * and testimonials and FAQ share the light band after it, ahead of the dark
 * closing band.
 */

export const revalidate = 300;

// The live page's own <title>, verbatim — it carries no brand suffix there.
export const metadata: Metadata = {
  title: constructionMeta.title,
  description: constructionMeta.description,
  alternates: { canonical: constructionMeta.path },
  robots: pageRobots,
  openGraph: {
    title: constructionMeta.title,
    description: constructionMeta.description,
    url: absoluteUrl(constructionMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(constructionMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: constructionMeta.title,
    description: constructionMeta.description,
    images: [dynamicOgImage(constructionMeta.title, 'Soft Suave')],
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
  path: constructionMeta.path,
  title: constructionMeta.title,
  // The live <title> verbatim, as the page's own metadata uses it.
  webPageName: constructionMeta.title,
  description: constructionMeta.description,
  serviceType: 'Construction AI development services',
  offerCatalogName: constructionSolutions.title,
  offers: constructionSolutions.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: constructionFaqs.title,
  faqs: constructionFaqs.items,
});

export default function ConstructionAiSolutionsPage() {
  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={constructionHero} idPrefix="construction" />

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={constructionOverview} id="overview" />

        <div className={home.light}>
          <Services content={constructionSolutions} id="solutions" variant="bold" />
        </div>

        <CardGrid content={constructionBenefits} id="benefits" variant="feature" />

        <div className={home.light}>
          <TechStack content={industryTechApproach} />
          <WorkGrid
            content={constructionSuccessStories}
            id="success-stories"
            countLabel="case studies"
          />
        </div>

        {/* The band is its own dark surface wherever it sits, so it takes a
            dark slot rather than a `.light` wrapper. */}
        <CtaBand content={constructionCta} />

        <div className={home.light}>
          <Testimonials />
          <Faq content={constructionFaqs} idPrefix="construction-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
