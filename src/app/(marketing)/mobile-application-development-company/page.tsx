import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { madFaqLd } from '@/lib/seo/mobile-application-development-company';
import {
  madCaseStudies,
  madEngagement,
  madFaqs,
  madHero,
  madHireCta,
  madIndustries,
  madMeta,
  madPlatforms,
  madProcess,
  madServices,
  madWhyUs,
} from '@/lib/home/mobile-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import ServiceSlats from '@/components/mobile-app/service-slats';
import PlatformTabs from '@/components/mobile-app/platform-tabs';
import ReleaseTrack from '@/components/mobile-app/release-track';
import WhyUs from '@/components/landing/why-us';
import Industries from '@/components/landing/industries';
import EngagementModels from '@/components/common/engagement-models';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';

// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section. The
// live page's clients band carries the identical heading, so it is literally
// the same section.
import Clients from '@/components/home/clients';
import CaseStudies from '@/components/home/work-grid';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Mobile App Development landing page.
 *
 * Served at `/mobile-application-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The app owns the domain root (no `basePath`;
 * see next.config.ts and lib/flags.ts). Registered in lib/home/landing-pages.ts,
 * which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/mobile-app-content.ts`); the layout and the motion are this
 * surface's.
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

/** The hero artwork cropped to 1200×630 — the page's link-preview image. */
const OG_IMAGE = {
  url: absoluteUrl('/assets/images/mobile-application-development-company-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Mobile App Development Company in India - Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${madMeta.title} | Soft Suave`,
  description: madMeta.description,
  alternates: { canonical: madMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${madMeta.title} | Soft Suave`,
    description: madMeta.description,
    url: absoluteUrl(madMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${madMeta.title} | Soft Suave`,
    description: madMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function MobileAppDevelopmentPage() {
  return (
    <div className={home.page}>
      {/* softsuave.com's own schema for this page, verbatim — see
          `lib/seo/mobile-application-development-company.ts`. */}
      <JsonLd data={madFaqLd} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a
       * band is just the wrapper. Hero opens dark and the closing Contact
       * band is dark; everything between alternates, with one deliberate
       * two-dark run — FAQ into the close.
       */}
      <main id="main">
        {/* Compact look — the same hero as the other service pages, so the
            marketing surface reads as a matched set. */}
        <Hero content={madHero} idPrefix="mad" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        {/* Seven slats, all on screen, one of them open. The section's
            argument is the range, so the range stays visible. */}
        <ServiceSlats content={madServices} />

        {/* "Choose the right technology" — so it is built as a chooser. */}
        <div className={home.light}>
          <PlatformTabs content={madPlatforms} />
        </div>

        {/* Six phases on one rail, alternating above and below it. */}
        <ReleaseTrack content={madProcess} />

        <div className={home.light}>
          <WhyUs content={madWhyUs} />
        </div>

        {/* Nine sectors: three across, three full rows, no orphan card. */}
        <Industries content={madIndustries} columns={3} />

        <div className={home.light}>
          <EngagementModels content={madEngagement} />
        </div>

        {/* The dark band the live page closes its engagement section with —
            its own title, paragraph and button, so it is its own section
            here too. */}
        <CtaBand content={madHireCta} />

        {/* Homepage case-study gallery, this page's own mobile-app projects
            rather than the generic AI/Vision default (review: "need to
            update relevant case studies"). */}
        <div className={home.light}>
          <CaseStudies content={madCaseStudies} countLabel="projects" />
        </div>

        {/* Homepage client stories, on the warm-white band as they are there. */}
        <div className={home.light}>
          <Testimonials />
        </div>

        <Faq content={madFaqs} idPrefix="mad-faq" />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
