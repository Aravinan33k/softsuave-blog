import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  telecomBenefits,
  telecomCta,
  telecomFaqs,
  telecomHero,
  telecomIndustryOverview,
  telecomMeta,
  telecomSolutions,
  telecomSuccessStories,
} from '@/lib/home/telecom-ai-content';
import { industryTechApproach } from '@/lib/home/industry-shared';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content: the
// client strip the live page opens on, its testimonials, and the closing
// enquiry band. The success-story lane is the homepage's, fed this page's copy.
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
 * Telecom AI Solutions landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/telecom-ai-content.ts`). Bands alternate so no two dark sections
 * sit together: technology and success stories share one light band, and
 * testimonials and FAQ another, either side of the dark consultation band, so
 * the FAQ sits light ahead of the dark closing band.
 */

export const revalidate = 300;

// The live page's own <title>, verbatim — it already carries the brand, so no
// suffix is added.
export const metadata: Metadata = {
  title: telecomMeta.title,
  description: telecomMeta.description,
  alternates: { canonical: telecomMeta.path },
  robots: pageRobots,
  openGraph: {
    title: telecomMeta.title,
    description: telecomMeta.description,
    url: absoluteUrl(telecomMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(telecomMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: telecomMeta.title,
    description: telecomMeta.description,
    images: [dynamicOgImage(telecomMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder: `Service` (its offers are the
 * page's own AI solutions list), `WebPage` and `FAQPage` (the page's own FAQs),
 * `@id`-linked to the organization `app/(marketing)/layout.tsx` declares once.
 * Built from the same content the page renders, so the schema can never drift
 * from what a visitor reads.
 *
 * `webPageName` is the live title as it stands: it already carries the brand,
 * so the builder's default " | Soft Suave" suffix would double it.
 */
const LD = pageSchemaGraph({
  path: telecomMeta.path,
  title: telecomMeta.title,
  webPageName: telecomMeta.title,
  description: telecomMeta.description,
  serviceType: 'Telecom AI development services',
  offerCatalogName: telecomSolutions.title,
  offers: telecomSolutions.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: telecomFaqs.title,
  faqs: telecomFaqs.items,
});

export default function TelecomAiSolutionsPage() {
  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={telecomHero} idPrefix="telecom" />

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={telecomIndustryOverview} id="industry-overview" />

        <div className={home.light}>
          <Services content={telecomSolutions} variant="bold" />
        </div>

        <CardGrid content={telecomBenefits} id="benefits" variant="feature" />

        <div className={home.light}>
          <TechStack content={industryTechApproach} />
          <WorkGrid content={telecomSuccessStories} id="success-stories" countLabel="success stories" />
        </div>

        {/* The consultation band draws its own dark ground whatever wraps it,
            so it takes the dark slot between the two light pairs. */}
        <CtaBand content={telecomCta} />

        <div className={home.light}>
          <Testimonials />
          <Faq content={telecomFaqs} idPrefix="telecom-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
