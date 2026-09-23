import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  constructionBenefits,
  constructionFaqs,
  constructionHero,
  constructionMeta,
  constructionMidCta,
  constructionOverview,
  constructionSegments,
  constructionServices,
} from '@/lib/home/construction-ai-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content. Only the
// ones the live Construction AI Solutions page actually carries: it has a client logo strip, a
// positioning block, a technology list, success stories and testimonials. It has no
// company stats block, no awards section, no recognitions band and no
// "industries we serve" section, so none are rendered here.
import Manifesto from '@/components/home/manifesto';
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import TechStack from '@/components/home/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// SECTOR-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import CtaBand from '@/components/landing/cta-band';
import CardGrid from '@/components/landing/industries';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';

/**
 * Construction AI Solutions landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Section order mirrors the live page's own. Bands alternate strictly by
 * position, so a section this page does not have cannot leave two light bands
 * adjacent.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${constructionMeta.title} | Soft Suave`,
  description: constructionMeta.description,
  alternates: { canonical: constructionMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${constructionMeta.title} | Soft Suave`,
    description: constructionMeta.description,
    url: absoluteUrl(constructionMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(constructionMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${constructionMeta.title} | Soft Suave`,
    description: constructionMeta.description,
    images: [dynamicOgImage(constructionMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder.
 *
 * It replaces a hand-written `Service` whose `provider` was an inline
 * `{'@type': 'Organization', name: 'Soft Suave'}` — an unidentified company
 * repeated on every page of this surface rather than the canonical one — with
 * no `WebPage` node and nothing joining the Service, the FAQ and the trail.
 * `pageSchemaGraph` emits those `@id`-linked and points provider and publisher
 * at the organization `app/(marketing)/layout.tsx` declares once.
 */
const LD = pageSchemaGraph({
  path: constructionMeta.path,
  title: constructionMeta.title,
  description: constructionMeta.description,
  serviceType: 'Construction AI development services',
  offerCatalogName: constructionServices.title,
  offers: constructionServices.items.map((i) => ({ name: i.name, description: i.body })),
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

        <Manifesto />

        <div className={home.light}>
          <Overview content={constructionOverview} />
        </div>

        <Services content={constructionServices} variant="bold" />

        <div className={home.light}>
          <CardGrid content={constructionBenefits} id="benefits" variant="feature" />
        </div>

        <CardGrid content={constructionSegments} id="applications" variant="bold" />

        <div className={home.light}>
          <TechStack />
        </div>

        <WorkGrid />

        <div className={home.light}>
          <CtaBand content={constructionMidCta} />
        </div>

        <Testimonials />

        <div className={home.light}>
          <Faq content={constructionFaqs} idPrefix="construction-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
