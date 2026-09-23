import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  rorHero,
  rorHireCta,
  rorMeta,
  rorOverview,
  rorServices,
  rorTech,
} from '@/lib/home/ruby-on-rails-content';

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
// reviews band IS the homepage's, to the word — "What Our Clients Say About
// Us" with the same standfirst.
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Ruby on Rails Development landing page.
 *
 * Served at `/ruby-on-rails-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The app owns the domain root (no `basePath`;
 * see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/ruby-on-rails-content.ts`). That page is server-rendered, so the
 * copy was fetched with `curl` and walked with jsdom rather than driven
 * through a headless browser.
 *
 * The live page carries no FAQ and no case studies, so neither is emitted here
 * — which also means this route emits no FAQPage schema, unlike its siblings
 * with a FAQ section (Ionic, .NET, Angular, Next.js).
 *
 * No new component: every section here already had a home in
 * `components/landing/*` or `components/common/*`.
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
  title: `${rorMeta.title} | Soft Suave`,
  description: rorMeta.description,
  alternates: { canonical: rorMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${rorMeta.title} | Soft Suave`,
    description: rorMeta.description,
    url: absoluteUrl(rorMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${rorMeta.title} | Soft Suave`,
    description: rorMeta.description,
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
  path: rorMeta.path,
  title: rorMeta.title,
  description: rorMeta.description,
  serviceType: 'Ruby on Rails development',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'Ruby on Rails Development',
  breadcrumbName: 'Ruby on Rails Development',
  offerCatalogName: rorServices.title,
  offers: rorServices.items.map((i) => ({ name: i.name, description: i.paragraphs[0] })),
});

export default function RubyOnRailsDevelopmentPage() {
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
       * band is dark, and everything between alternates cleanly — no run of
       * two dark sections anywhere on the page.
       *
       * This is a short page, like the live one: no clients band, no
       * industries grid, no case studies, no FAQ. Nothing is invented to pad
       * the rhythm.
       */}
      <main id="main">
        {/* Compact look — the same hero as the rest of the surface. */}
        <Hero content={rorHero} idPrefix="ror" variant="compact" />

        <div className={home.light}>
          <Overview content={rorOverview} variant="compact" />
        </div>

        {/* Four names to pick from, one stage to read on. Their copy is too
            long to sit on cards and too long to run down the page. */}
        <ServiceBoard content={rorServices} />

        <div className={home.light}>
          <CtaBand content={rorHireCta} />
        </div>

        <TechStack content={rorTech} />

        {/* Homepage client stories, on the warm-white band as they are there —
            the live page's band carries the same heading and standfirst. */}
        <div className={home.light}>
          <Testimonials />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
