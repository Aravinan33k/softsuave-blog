import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  xamHero,
  xamHireCta,
  xamMeta,
  xamOverview,
  xamServices,
  xamTech,
} from '@/lib/home/xamarin-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own; every section the live page carries
// already had a home here.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServiceBoard from '@/components/common/service-board';
import CtaBand from '@/components/landing/cta-band';
import TechStack from '@/components/landing/tech-stack';

// Reused from the homepage verbatim. Not a stylistic choice: the live page's
// reviews band IS the homepage's, to the word — "What Our Clients Say About Us"
// with the same standfirst.
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Xamarin App Development landing page.
 *
 * Served at `/xamarin-app-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The app owns the domain root (no `basePath`;
 * see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/xamarin-app-content.ts`, extracted with the Playwright MCP
 * browser); the photography is free-licence Pexels art cropped for this
 * surface, credited in `public/images/landing/xamarin/credits.json`.
 *
 * The live page carries no FAQ and no case studies, so neither is emitted here
 * — which also means this route emits no FAQPage schema, unlike its siblings.
 *
 * A SERVER component on purpose: only a server component may export `metadata`
 * (node_modules/next/dist/docs/.../generate-metadata.md), and the (marketing)
 * layout's own metadata is the homepage's. Every section below is a client
 * component, which a server component may freely render.
 *
 * Fonts, the `.theme-four` token scope and Lenis smooth scroll all come from
 * `app/(marketing)/layout.tsx`, so nothing here re-declares them.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${xamMeta.title} | Soft Suave`,
  description: xamMeta.description,
  alternates: { canonical: xamMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${xamMeta.title} | Soft Suave`,
    description: xamMeta.description,
    url: absoluteUrl(xamMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${xamMeta.title} | Soft Suave`,
    description: xamMeta.description,
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

/** Service structured data — no FAQPage here, because the page has no FAQ. */
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
  path: xamMeta.path,
  title: xamMeta.title,
  description: xamMeta.description,
  serviceType: 'Xamarin app development',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'Xamarin App Development',
  // Matches the live page's own breadcrumb trail, minus one level: live runs
  // Home › Mobile App › Cross-platform › Xamarin Development, but we have no
  // page at the "Cross-platform" URL live links to, so that level is dropped
  // rather than pointing our own schema at a page this app doesn't serve.
  showBreadcrumb: true,
  parents: [{ name: 'Mobile App', path: '/mobile-application-development-company' }],
  breadcrumbName: 'Xamarin Development',
  offerCatalogName: xamServices.title,
  offers: xamServices.items.map((i) => ({ name: i.name, description: i.paragraphs[0] })),
});

export default function XamarinAppDevelopmentPage() {
  // "/" is only a page this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect — which leaves a
  // single-item trail, so the schema is omitted rather than emitted empty.

  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a
       * band is just the wrapper. Hero opens dark and the closing Contact
       * band is dark, and everything between alternates — the one two-dark
       * run is the service board into its CTA, which is deliberate: moving
       * that band ahead of the technology stack puts it directly under the
       * services, and a CTA wants the deepest ground beneath it.
       *
       * This is the shortest page on the surface, because the live one is:
       * no clients band, no industries grid, no case studies, no FAQ.
       * Nothing is invented to pad the rhythm.
       */}
      <main id="main">
        {/* Compact look — the same hero as the other app-development pages,
            so the marketing surface reads as a matched set. */}
        <Hero content={xamHero} idPrefix="xam" variant="compact" />

        <div className={home.light}>
          <Overview content={xamOverview} variant="compact" />
        </div>

        {/* Four names to pick from, one stage to read on. Their copy is too
            long to sit on cards and too long to run down the page. */}
        <ServiceBoard content={xamServices} />

        {/* The CTA now sits between the services and the technology stack, as
            the review asked — the reader is invited to act straight off the
            services they have just read, rather than after a grid of logos. */}
        <CtaBand content={xamHireCta} />

        {/* Moving the CTA up leaves the stack and the stories adjacent on the
            warm white, so they share one wrapper: two light bands stacked
            would double the padding between them and read as separate panels
            rather than one chapter. Same merge `landing/hire-page` does with
            its own runs. */}
        <div className={home.light}>
          <TechStack content={xamTech} />
          {/* Homepage client stories — the live page's band carries the same
              heading and standfirst. */}
          <Testimonials />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
