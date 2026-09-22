import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  itoCollaboration,
  itoDestinations,
  itoFaqs,
  itoFit,
  itoHero,
  itoMeta,
  itoMidCta,
  itoModels,
  itoOverview,
  itoProcess,
  itoServices,
} from '@/lib/home/it-outsourcing-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content.
import Manifesto from '@/components/home/manifesto';
import Stats from '@/components/home/stats';
import Clients from '@/components/home/clients';
import Industries from '@/components/home/industries';
import WorkGrid from '@/components/home/work-grid';
import TechStack from '@/components/home/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import Comparison from '@/components/landing/comparison';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';

/**
 * IT Outsourcing Company in India landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Slug note: the mega menu (`lib/home/nav-menu.ts`) previously pointed at
 * `/it-outsourcing-services`. The live page this replaces is published at
 * `/it-outsourcing-company-india`, so that is the canonical slug here and the
 * menu entry was corrected to match rather than the other way round — changing
 * the slug would have orphaned the existing page's search equity.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${itoMeta.title} | Soft Suave`,
  description: itoMeta.description,
  alternates: { canonical: itoMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${itoMeta.title} | Soft Suave`,
    description: itoMeta.description,
    url: absoluteUrl(itoMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(itoMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${itoMeta.title} | Soft Suave`,
    description: itoMeta.description,
    images: [dynamicOgImage(itoMeta.title, 'Soft Suave')],
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
  path: itoMeta.path,
  title: itoMeta.title,
  description: itoMeta.description,
  serviceType: 'IT outsourcing',
  // Matches the live page's own breadcrumb trail exactly: Home › Software
  // Development › IT Outsourcing Services.
  showBreadcrumb: true,
  parents: [{ name: 'Software Development', path: '/software-development-company' }],
  breadcrumbName: 'IT Outsourcing Services',
  offerCatalogName: itoServices.title,
  offers: itoServices.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: itoFaqs.title,
  faqs: itoFaqs.items,
});

export default function ItOutsourcingCompanyIndiaPage() {

  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={itoHero} idPrefix="it-outsourcing" />

        <div id="why" className={`${home.light} ${home.whySection}`}>
          <Manifesto />
          <Stats />
        </div>

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={itoOverview} />

        <div className={home.light}>
          <Services content={itoServices} variant="bold" />
        </div>

        <CardGrid content={itoFit} id="fit" variant="feature" />

        <div className={home.light}>
          <Comparison content={itoDestinations} />
        </div>

        <CardGrid content={itoModels} id="models" variant="bold" />

        <div className={home.light}>
          <Process content={itoProcess} variant="mosaic" />
        </div>

        <CtaBand content={itoMidCta} />

        <div className={home.light}>
          <CardGrid content={itoCollaboration} id="collaboration" variant="bold" />
        </div>

        <Industries />

        <div className={home.light}>
          <WorkGrid />
        </div>

        <TechStack />

        <div className={home.light}>
          <Testimonials />
          <Faq content={itoFaqs} idPrefix="it-outsourcing-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
