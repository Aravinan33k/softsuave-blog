import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { ionFaqLd, ionServiceLd } from '@/lib/seo/ionic-app-development-company';
import {
  ionFaqs,
  ionHero,
  ionHireCta,
  ionMeta,
  ionOverview,
  ionServices,
  ionTech,
} from '@/lib/home/ionic-app-content';

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
import Faq from '@/components/landing/faq';

// Sections reused from the homepage verbatim. Not a stylistic choice here: the
// live page's copy for both IS the homepage's, to the word — its clients band
// reads "Preferred AI-Enabled Technology Partner for Startups and SMBs" and its
// reviews band "What Our Clients Say About Us", both with the same standfirst.
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Ionic App Development landing page.
 *
 * Served at `/ionic-app-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The app owns the domain root (no `basePath`;
 * see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/ionic-app-content.ts`, extracted with the Playwright MCP browser);
 * the layout, the motion and the photography are this surface's.
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

/**
 * The page's link-preview image: the hero's photograph (one site open on a
 * laptop, a tablet and phones — Ionic's one-codebase pitch) cropped to
 * 1200×630 and lifted a little, since the hero frame is dark. softsuave.com's
 * own og:image is an SVG, which Facebook, LinkedIn and X do not render as a
 * preview, so there is nothing on the live page to copy.
 */
const OG_IMAGE = {
  url: absoluteUrl('/assets/images/ionic-app-development-company-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Ionic App Development Company - Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${ionMeta.title} | Soft Suave`,
  description: ionMeta.description,
  alternates: { canonical: ionMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${ionMeta.title} | Soft Suave`,
    description: ionMeta.description,
    url: absoluteUrl(ionMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${ionMeta.title} | Soft Suave`,
    description: ionMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function IonicAppDevelopmentPage() {
  return (
    <div className={home.page}>
      {/* softsuave.com's own schema for this page, verbatim — see
          `lib/seo/ionic-app-development-company.ts`. */}
      <JsonLd data={ionServiceLd} />
      <JsonLd data={ionFaqLd} />
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
       * This page carries no industries grid or case studies: the live page
       * has none, and nothing is invented to fill the rhythm.
       */}
      <main id="main">
        {/* Compact look — the same hero as the other app-development pages,
            so the marketing surface reads as a matched set. */}
        <Hero content={ionHero} idPrefix="ion" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={ionOverview} variant="compact" />

        {/* Six names to pick from, one stage to read on. Their copy is too
            long to sit on cards and too long to run down the page. */}
        <div className={home.light}>
          <ServiceBoard content={ionServices} />
        </div>

        <CtaBand content={ionHireCta} />

        {/* The FAQ now follows the client stories, as the review asked and as
            every corrected page on this surface runs them — the proof lands
            before the objection-handling rather than after it.

            That puts the technology stack and the stories back to back on the
            warm white, so they share one wrapper: two light bands stacked
            would double the padding between them and read as separate panels
            rather than one chapter. Same merge `landing/hire-page` does with
            its own runs. */}
        <div className={home.light}>
          <TechStack content={ionTech} />
          {/* Homepage client stories — the live page's band carries the same
              heading and standfirst. */}
          <Testimonials />
        </div>

        <Faq content={ionFaqs} idPrefix="ion-faq" />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
