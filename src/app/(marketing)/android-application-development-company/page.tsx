import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { andFaqLd, andServiceLd } from '@/lib/seo/android-application-development-company';
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
import TechStack from '@/components/home/tech-stack';
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

/**
 * The page's link-preview image: the hero's photograph (an Android phone
 * showing an app's strings.xml) centred at 1200×630. softsuave.com's own
 * og:image is an SVG, which Facebook, LinkedIn and X do not render as a
 * preview, so there is nothing on the live page to copy.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/android-application-development-company-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Android Application Development Service - Soft Suave',
};

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
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${andMeta.title} | Soft Suave`,
    description: andMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function AndroidAppDevelopmentPage() {
  return (
    <div className={home.page}>
      {/* softsuave.com's own schema for this page, verbatim — see
          `lib/seo/android-application-development-company.ts`. */}
      <JsonLd data={andServiceLd} />
      <JsonLd data={andFaqLd} />
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
            heading.

            The tech stack is the homepage's tech rows, as the Vue.js,
            PostgreSQL, TypeScript and GraphQL pages have it (review: "update
            the tech stack section like in other pages"). It stays on this
            light band rather than going dark as on those pages: the service
            board and CTA band above are already two dark bands in a row.
            `.techFit` clears the homepage's full-viewport min-height (the
            `.techCompact` those pages use never matches — see the CSS);
            `staticFrom` holds the rows still from tablet width up. */}
        <div className={home.light}>
          <div className={home.techFit}>
            <TechStack content={andStack} staticFrom={768} />
          </div>
          <Testimonials />
          <Faq content={andFaqs} idPrefix="and-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
