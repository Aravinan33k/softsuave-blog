import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  cloudBenefits,
  cloudHero,
  cloudMeta,
  cloudMidCta,
  cloudOverview,
  cloudProcess,
  cloudServiceModels,
  cloudServices,
} from '@/lib/home/cloud-computing-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content.
import Manifesto from '@/components/home/manifesto';
import Contact from '@/components/home/contact';

// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';

import home from '@/components/home/home.module.css';

/**
 * Cloud Computing Services landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${cloudMeta.title} | Soft Suave`,
  description: cloudMeta.description,
  alternates: { canonical: cloudMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${cloudMeta.title} | Soft Suave`,
    description: cloudMeta.description,
    url: absoluteUrl(cloudMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(cloudMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${cloudMeta.title} | Soft Suave`,
    description: cloudMeta.description,
    images: [dynamicOgImage(cloudMeta.title, 'Soft Suave')],
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
  path: cloudMeta.path,
  title: cloudMeta.title,
  description: cloudMeta.description,
  serviceType: 'Cloud computing services',
  offerCatalogName: cloudServices.title,
  offers: cloudServices.items.map((i) => ({ name: i.name, description: i.body })),
});

export default function CloudComputingPage() {

  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={cloudHero} idPrefix="cloud" />

        <div id="why" className={`${home.light} ${home.whySection}`}>
          <Manifesto />
        </div>

        <div className={home.light}>
          <Overview content={cloudOverview} />
        </div>

        <CardGrid content={cloudBenefits} id="benefits" variant="feature" />

        <div className={home.light}>
          <Services content={cloudServices} variant="bold" />
        </div>

        <CardGrid content={cloudServiceModels} id="service-models" variant="bold" />

        <div className={home.light}>
          <Process content={cloudProcess} variant="mosaic" />
        </div>

        <CtaBand content={cloudMidCta} />

        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
