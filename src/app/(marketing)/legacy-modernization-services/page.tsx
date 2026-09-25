import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  legacyDrivers,
  legacyHero,
  legacyMeta,
  legacyMidCta,
  legacyOverview,
  legacyServices,
} from '@/lib/home/legacy-modernization-content';

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
import CardGrid from '@/components/landing/industries';

import home from '@/components/home/home.module.css';

/**
 * Legacy Modernization Services landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${legacyMeta.title} | Soft Suave`,
  description: legacyMeta.description,
  alternates: { canonical: legacyMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${legacyMeta.title} | Soft Suave`,
    description: legacyMeta.description,
    url: absoluteUrl(legacyMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(legacyMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${legacyMeta.title} | Soft Suave`,
    description: legacyMeta.description,
    images: [dynamicOgImage(legacyMeta.title, 'Soft Suave')],
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
  path: legacyMeta.path,
  title: legacyMeta.title,
  description: legacyMeta.description,
  serviceType: 'Legacy application modernization',
  offerCatalogName: legacyServices.title,
  offers: legacyServices.items.map((i) => ({ name: i.name, description: i.body })),
});

export default function LegacyModernizationPage() {

  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={legacyHero} idPrefix="legacy" />

        <div id="why" className={`${home.light} ${home.whySection}`}>
          <Manifesto />
        </div>

        <div className={home.light}>
          <Overview content={legacyOverview} />
        </div>

        <CardGrid content={legacyDrivers} id="drivers" variant="feature" />

        <div className={home.light}>
          <Services content={legacyServices} variant="bold" />
        </div>

        <CtaBand content={legacyMidCta} />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
