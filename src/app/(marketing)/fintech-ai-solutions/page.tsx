import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  fintechBenefits,
  fintechFaqs,
  fintechHero,
  fintechMeta,
  fintechMidCta,
  fintechOverview,
  fintechProcess,
  fintechSegments,
  fintechServices,
} from '@/lib/home/fintech-ai-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content. Only the
// ones the live FinTech AI Solutions page actually carries: it has a client logo strip, a
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
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';

/**
 * FinTech AI Solutions landing page.
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
  title: `${fintechMeta.title} | Soft Suave`,
  description: fintechMeta.description,
  alternates: { canonical: fintechMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${fintechMeta.title} | Soft Suave`,
    description: fintechMeta.description,
    url: absoluteUrl(fintechMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(fintechMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${fintechMeta.title} | Soft Suave`,
    description: fintechMeta.description,
    images: [dynamicOgImage(fintechMeta.title, 'Soft Suave')],
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
  path: fintechMeta.path,
  title: fintechMeta.title,
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
          <Clients />
        </div>

        <Manifesto />

        <div className={home.light}>
          <Overview content={fintechOverview} />
        </div>

        <Services content={fintechServices} variant="bold" />

        <div className={home.light}>
          <CardGrid content={fintechBenefits} id="benefits" variant="feature" />
        </div>

        <CardGrid content={fintechSegments} id="sectors" variant="bold" />

        <div className={home.light}>
          <Process content={fintechProcess} variant="mosaic" />
        </div>

        <TechStack />

        <div className={home.light}>
          <WorkGrid />
        </div>

        <CtaBand content={fintechMidCta} />

        <div className={home.light}>
          <Testimonials />
        </div>

        <Faq content={fintechFaqs} idPrefix="fintech-faq" />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
