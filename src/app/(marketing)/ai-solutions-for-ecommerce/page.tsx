import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  ecommerceBenefits,
  ecommerceFaqs,
  ecommerceHero,
  ecommerceMeta,
  ecommerceMidCta,
  ecommerceOverview,
  ecommerceProcess,
  ecommerceServices,
} from '@/lib/home/ecommerce-ai-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content. Only the
// ones the live eCommerce AI Solutions page actually carries: it has a client logo strip, a
// positioning block, a technology list, success stories. It has no
// company stats block, no awards section, no recognitions band and no
// "industries we serve" section, so none are rendered here.
import Manifesto from '@/components/home/manifesto';
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import TechStack from '@/components/home/tech-stack';
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
 * eCommerce AI Solutions landing page.
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
  title: `${ecommerceMeta.title} | Soft Suave`,
  description: ecommerceMeta.description,
  alternates: { canonical: ecommerceMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${ecommerceMeta.title} | Soft Suave`,
    description: ecommerceMeta.description,
    url: absoluteUrl(ecommerceMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(ecommerceMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${ecommerceMeta.title} | Soft Suave`,
    description: ecommerceMeta.description,
    images: [dynamicOgImage(ecommerceMeta.title, 'Soft Suave')],
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
  path: ecommerceMeta.path,
  title: ecommerceMeta.title,
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

        <Manifesto />

        <div className={home.light}>
          <Overview content={ecommerceOverview} />
        </div>

        <Services content={ecommerceServices} variant="bold" />

        <div className={home.light}>
          <CardGrid content={ecommerceBenefits} id="benefits" variant="feature" />
        </div>

        <Process content={ecommerceProcess} variant="mosaic" />

        <div className={home.light}>
          <TechStack />
        </div>

        <WorkGrid />

        <div className={home.light}>
          <CtaBand content={ecommerceMidCta} />
        </div>

        <Faq content={ecommerceFaqs} idPrefix="ecommerce-faq" />

        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
