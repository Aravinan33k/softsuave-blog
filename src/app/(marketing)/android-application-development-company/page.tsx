import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  andFaqs,
  andHero,
  andHireCta,
  andMeta,
  andOverview,
  andServices,
  andStack,
} from '@/lib/home/android-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServiceBoard from '@/components/common/service-board';
import CtaBand from '@/components/landing/cta-band';
import TechStack from '@/components/landing/tech-stack';
import Faq from '@/components/landing/faq';

// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section. The
// live page's testimonials band carries the identical heading.
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Android Application Development landing page.
 *
 * Served at `/android-application-development-company` — the same path the
 * live softsuave.com page uses, so this is a drop-in replacement for it rather
 * than a second URL competing with it. The app owns the domain root (no
 * `basePath`; see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/android-app-content.ts`, extracted with the Playwright MCP
 * browser); the layout and the motion are this surface's.
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
  title: `${andMeta.title} | Soft Suave`,
  description: andMeta.description,
  alternates: { canonical: andMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${andMeta.title} | Soft Suave`,
    description: andMeta.description,
    url: absoluteUrl(andMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${andMeta.title} | Soft Suave`,
    description: andMeta.description,
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

/** FAQPage + Service structured data — this page's answers are its SEO surface. */

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
  path: andMeta.path,
  title: andMeta.title,
  description: andMeta.description,
  serviceType: 'Android app development',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'Android Application Development',
  breadcrumbName: 'Android Application Development',
  offerCatalogName: andServices.title,
  offers: andServices.items.map((i) => ({ name: i.name, description: i.paragraphs[0] })),
  faqName: andFaqs.title,
  faqs: andFaqs.items,
});

export default function AndroidAppDevelopmentPage() {
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
       * band is dark; everything between alternates, with one deliberate
       * two-dark run — the services into their CTA band, because a CTA band
       * wants the deepest ground under it.
       *
       * This page carries no clients band, industries grid or case studies:
       * the live page has none, and nothing is invented to fill the rhythm.
       */}
      <main id="main">
        {/* Compact look — the same hero as the other service pages, so the
            marketing surface reads as a matched set. */}
        <Hero content={andHero} idPrefix="and" variant="compact" />

        <div className={home.light}>
          <Overview content={andOverview} variant="compact" />
        </div>

        {/* Six names to pick from, one stage to read on. Their copy is too
            long to sit on cards and too long to run down the page. */}
        <ServiceBoard content={andServices} />

        <CtaBand content={andHireCta} />

        {/* Client stories ahead of the FAQ (review: "place the faqs after
            the testimonials"). Tech stack, testimonials and the FAQ are all
            light bands once reordered, so they share one wrapper — the FAQ
            sat dark on its own before, between two light bands either side
            of it. Homepage client stories carry the live page's own
            heading. */}
        <div className={home.light}>
          <TechStack content={andStack} />
          <Testimonials />
          <Faq content={andFaqs} idPrefix="and-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
