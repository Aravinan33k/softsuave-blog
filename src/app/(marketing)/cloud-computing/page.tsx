import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  cloudAbout,
  cloudApproach,
  cloudApproachSteps,
  cloudHero,
  cloudIntro,
  cloudMeta,
  cloudModels,
  cloudPlatforms,
  cloudServices,
} from '@/lib/home/cloud-computing-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's closing enquiry band, which stands
// in for the live page's "Book Free Consultation" form.
import Contact from '@/components/home/contact';

// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import TechStack from '@/components/landing/tech-stack';

import home from '@/components/home/home.module.css';

/**
 * Cloud Computing Services landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/cloud-computing-content.ts`). Bands alternate so no two dark
 * sections sit together; the models and platforms share one light band so the
 * section ahead of the dark closing band is light.
 */

export const revalidate = 300;

// The live page's own <title>, verbatim — it carries its brand suffix already.
export const metadata: Metadata = {
  title: cloudMeta.title,
  description: cloudMeta.description,
  alternates: { canonical: cloudMeta.path },
  robots: pageRobots,
  openGraph: {
    title: cloudMeta.title,
    description: cloudMeta.description,
    url: absoluteUrl(cloudMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(cloudMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: cloudMeta.title,
    description: cloudMeta.description,
    images: [dynamicOgImage(cloudMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder: `Service` (its offers are the
 * page's own four services), `WebPage` and `BreadcrumbList`, `@id`-linked to
 * the organization `app/(marketing)/layout.tsx` declares once. Built from the
 * same content the page renders, so the schema can never drift from what a
 * visitor reads. The live page runs no FAQ, so none is emitted.
 */
const LD = pageSchemaGraph({
  path: cloudMeta.path,
  title: cloudMeta.title,
  // The live <title> verbatim, as the page's own metadata uses it.
  webPageName: cloudMeta.title,
  description: cloudMeta.description,
  serviceType: 'Cloud computing services',
  // Matches the visible trail: Home › Software Development › Cloud Computing
  // Services.
  showBreadcrumb: true,
  parents: [{ name: 'Software Development', path: '/software-development-company' }],
  breadcrumbName: 'Cloud Computing Services',
  offerCatalogName: cloudServices.title,
  offers: cloudServices.items.map((i) => ({ name: i.name, description: i.body })),
});

export default function CloudComputingPage() {
  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={cloudHero} idPrefix="cloud" variant="compact" />

        <div className={home.light}>
          <Overview content={cloudIntro} id="overview" />
        </div>

        <Overview content={cloudAbout} id="about" />

        <div className={home.light}>
          <Overview content={cloudApproach} id="approach" />
          <Process content={cloudApproachSteps} id="approach-steps" />
        </div>

        {/* Live cards carry no links, so none are inferred from their names. */}
        <CardGrid content={cloudServices} id="services" variant="bold" autoLink={false} />

        <div className={home.light}>
          <CardGrid content={cloudModels} id="models" variant="bold" autoLink={false} />
          <TechStack content={cloudPlatforms} id="platforms" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
