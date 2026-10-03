import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  gccAudience,
  gccBenefits,
  gccClosingCta,
  gccHero,
  gccIntro,
  gccMeta,
  gccServices,
  gccWhyUs,
} from '@/lib/home/gcc-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTION — the homepage's own closing enquiry band, standing in
// for the live page's "Book Free Consultation" form block.
import Contact from '@/components/home/contact';

// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
// `CardGrid` is `components/landing/industries`, a generic bordered card grid
// despite the filename.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import WhyUs from '@/components/landing/why-us';
import Services from '@/components/landing/services';
import CardGrid from '@/components/landing/industries';

import home from '@/components/home/home.module.css';

/**
 * Global Capability Center landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/gcc-content.ts`). Bands alternate so no two dark sections sit
 * together; the audience grid and the closing consultation block share one
 * light band ahead of the dark closing enquiry section.
 */

export const revalidate = 300;

// The live page's own <title>, verbatim — it carries no brand suffix there.
export const metadata: Metadata = {
  title: gccMeta.title,
  description: gccMeta.description,
  alternates: { canonical: gccMeta.path },
  robots: pageRobots,
  openGraph: {
    title: gccMeta.title,
    description: gccMeta.description,
    url: absoluteUrl(gccMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(gccMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: gccMeta.title,
    description: gccMeta.description,
    images: [dynamicOgImage(gccMeta.title, 'Soft Suave')],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 * needs the already-public path. `BASE_PATH` is '' while the app owns the
 * domain root — hence the fallback, without which it would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder: `Service` (its offers are the
 * page's own service list) and `WebPage`, `@id`-linked to the organization
 * `app/(marketing)/layout.tsx` declares once. Built from the same content the
 * page renders, so the schema can never drift from what a visitor reads. The
 * live page runs no FAQs, so there is no `FAQPage`.
 */
const LD = pageSchemaGraph({
  path: gccMeta.path,
  title: gccMeta.title,
  // The live <title> verbatim, as the page's own metadata uses it.
  webPageName: gccMeta.title,
  description: gccMeta.description,
  serviceType: 'Global Capability Center setup and operations',
  offerCatalogName: gccServices.title,
  offers: gccServices.items.map((i) => ({ name: i.name, description: i.body })),
});

export default function GlobalCapabilityCenterPage() {
  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={gccHero} idPrefix="gcc" />

        <div className={home.light}>
          <Overview content={gccIntro} id="overview" />
        </div>

        <WhyUs content={gccWhyUs} id="why" />

        <div className={home.light}>
          <Services content={gccServices} variant="bold" />
        </div>

        <CardGrid content={gccBenefits} id="benefits" variant="feature" />

        <div className={home.light}>
          <CardGrid content={gccAudience} id="audience" variant="bold" />
          <Overview content={gccClosingCta} id="consultation" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
