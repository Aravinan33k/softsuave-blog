import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  flBenefits,
  flFaqs,
  flHero,
  flIdeaCta,
  flMeta,
  flOverview,
  flProjects,
  flTech,
} from '@/lib/home/flutter-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own: every section the live page carries
// already had a home here, and the story cards it shares with the iOS page
// moved into `common` for it.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import CtaBand from '@/components/landing/cta-band';
import ServiceBoard from '@/components/common/service-board';
import TechStack from '@/components/landing/tech-stack';
import StoryCards from '@/components/common/story-cards';
import Faq from '@/components/landing/faq';

// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section. The
// live page's testimonials band carries the identical heading.
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Flutter App Development landing page.
 *
 * Served at `/flutter-application-development-company` — the same path the
 * live softsuave.com page uses, so this is a drop-in replacement for it rather
 * than a second URL competing with it. The app owns the domain root (no
 * `basePath`; see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/flutter-app-content.ts`, extracted with the Playwright MCP
 * browser), and the four project cards carry the live page's own artwork,
 * bundled under `public/images/landing/flutter/`. The layout and the motion
 * are this surface's.
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
  title: `${flMeta.title} | Soft Suave`,
  description: flMeta.description,
  alternates: { canonical: flMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${flMeta.title} | Soft Suave`,
    description: flMeta.description,
    url: absoluteUrl(flMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${flMeta.title} | Soft Suave`,
    description: flMeta.description,
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
  path: flMeta.path,
  title: flMeta.title,
  description: flMeta.description,
  serviceType: 'Flutter app development',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'Flutter App Development',
  breadcrumbName: 'Flutter App Development',
  offerCatalogName: flBenefits.title,
  offers: flBenefits.items.map((i) => ({ name: i.name, description: i.paragraphs[0] })),
  faqName: flFaqs.title,
  faqs: flFaqs.items,
});

export default function FlutterAppDevelopmentPage() {
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
       * run is FAQ → Contact at the end, which is what moving the FAQ past
       * the client stories leaves, and is how the other corrected pages on
       * this surface close too.
       *
       * This page carries no clients band or industries grid: the live page
       * has none, and nothing is invented to fill the rhythm.
       */}
      <main id="main">
        {/* Compact look — the same hero as the other app-development pages,
            so the marketing surface reads as a matched set. */}
        <Hero content={flHero} idPrefix="fl" variant="compact" />

        {/* The live page's "Why Choose Soft Suave" block: the prose, then the
            six reasons it names as a claim list. */}
        <div className={home.light}>
          <Overview content={flOverview} variant="compact" />
        </div>

        <CtaBand content={flIdeaCta} />

        {/* Six names to pick from, one stage to read on. Their copy is too
            long to sit on cards and too long to run down the page. */}
        <div className={home.light}>
          <ServiceBoard content={flBenefits} />
        </div>

        <TechStack content={flTech} />

        {/* The FAQ now follows the client stories, as the review asked and as
            every corrected page on this surface runs them — the proof lands
            before the objection-handling rather than after it.

            That puts the projects and the stories back to back on the warm
            white, so they share one wrapper: two light bands stacked would
            double the padding between them and read as separate panels rather
            than one chapter of proof. Same merge `landing/hire-page` does with
            its own runs. */}
        <div className={home.light}>
          {/* This page's own four projects, each with the live page's artwork —
              not the homepage case-study gallery, which is a different set of
              work. */}
          <StoryCards content={flProjects} />
          {/* Homepage client stories — the live page's band carries the same
              heading, "What Our Clients Say About Us". */}
          <Testimonials />
        </div>

        <Faq content={flFaqs} idPrefix="fl-faq" />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
