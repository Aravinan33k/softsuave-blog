import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  gccAudience,
  gccBenefits,
  gccHero,
  gccMeta,
  gccMidCta,
  gccOverview,
  gccProcess,
  gccServices,
} from '@/lib/home/gcc-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

/*
 * COMPANY-LEVEL SECTIONS — the homepage's own components, rendered with the
 * homepage's own content (`lib/home/content.ts`). None of these take props:
 * "Why Soft Suave", the statistics odometer, the client logos, the case-study
 * scene, the integrations and recognition marquees, the tech stack, the client
 * stories and the closing CTA say the same thing everywhere on this site, so
 * they are imported rather than restated. That is what makes this page read as
 * part of the site instead of a standalone landing page.
 */
import Manifesto from '@/components/home/manifesto';
import Contact from '@/components/home/contact';

/*
 * SERVICE-SPECIFIC SECTIONS — the shared landing components, each taking this
 * page's own copy. `CardGrid` is `components/landing/industries`, which is a
 * generic bordered card grid despite the filename; it is aliased here because
 * the homepage's real Industries scene is imported above under that name.
 */
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';

import home from '@/components/home/home.module.css';

/**
 * Global Capability Center landing page.
 *
 * A SERVER component on purpose: only a server component may export `metadata`,
 * and the (marketing) layout's own metadata is the homepage's. Every section
 * below is a client component, which a server component may freely render.
 *
 * Fonts, the `.theme-four` token scope and Lenis smooth scroll all come from
 * `app/(marketing)/layout.tsx`, so nothing here re-declares them.
 *
 * `ChapterNav` is deliberately not mounted: its `SECTIONS` array is hardcoded to
 * the homepage's own sections, so it would label this page's bands wrongly.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${gccMeta.title} | Soft Suave`,
  description: gccMeta.description,
  alternates: { canonical: gccMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${gccMeta.title} | Soft Suave`,
    description: gccMeta.description,
    url: absoluteUrl(gccMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(gccMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${gccMeta.title} | Soft Suave`,
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
 * FAQPage + Service structured data.
 *
 * The Service catalogue is this page's own offering list. The case-study
 * `subjectOf` is intentionally absent: those now come from the homepage's
 * shared content, so they are described by the homepage's schema rather than
 * re-asserted on every service page.
 */
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
  path: gccMeta.path,
  title: gccMeta.title,
  description: gccMeta.description,
  serviceType: 'Global Capability Center setup and operations',
  offerCatalogName: gccServices.title,
  offers: gccServices.items.map((i) => ({ name: i.name, description: i.body })),
});

export default function GlobalCapabilityCenterPage() {
  // "/" is only a route this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect — which leaves a
  // single-item trail, so the schema is omitted rather than emitted empty.

  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={gccHero} idPrefix="gcc" />

        <div id="why" className={`${home.light} ${home.whySection}`}>
          <Manifesto />
        </div>

        <div className={home.light}>
          <Overview content={gccOverview} />
        </div>

        <Services content={gccServices} variant="bold" />

        <div className={home.light}>
          <CardGrid content={gccBenefits} id="benefits" variant="feature" />
        </div>

        <CtaBand content={gccMidCta} />

        <div className={home.light}>
          <Process content={gccProcess} variant="mosaic" />
        </div>

        <CardGrid content={gccAudience} id="audience" variant="bold" />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
