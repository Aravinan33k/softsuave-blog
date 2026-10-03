import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { xamBreadcrumbLd, xamProductLd } from '@/lib/seo/xamarin-app-development-company';
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
import PlatformTabs from '@/components/mobile-app/platform-tabs';

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

/**
 * The page's link-preview image: the hero's photograph (a laptop, a tablet and
 * a phone side by side — the devices one Xamarin codebase targets) cropped to
 * 1200×630, as the other mobile pages do. softsuave.com's own og:image is an
 * 840×439 PNG, under the 1200×630 the large preview card is drawn at, so it
 * is not reused.
 */
const OG_IMAGE = {
  url: absoluteUrl('/assets/images/xamarin-app-development-company-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Xamarin Development Company In India - Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${xamMeta.title} | Soft Suave`,
  description: xamMeta.description,
  alternates: { canonical: xamMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${xamMeta.title} | Soft Suave`,
    description: xamMeta.description,
    url: absoluteUrl(xamMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${xamMeta.title} | Soft Suave`,
    description: xamMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function XamarinAppDevelopmentPage() {
  return (
    <div className={home.page}>
      {/* softsuave.com's own schema for this page, verbatim — see
          `lib/seo/xamarin-app-development-company.ts`. */}
      <JsonLd data={xamProductLd} />
      <JsonLd data={xamBreadcrumbLd} />
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
          {/* The Mobile App page's tab chooser (review: "change the tech stack
              design like this page - /mobile-application-development-company"),
              keeping this section's `#tech` anchor. */}
          <PlatformTabs content={xamTech} id="tech" />
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
