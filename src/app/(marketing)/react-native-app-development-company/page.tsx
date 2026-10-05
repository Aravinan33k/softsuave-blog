import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { rnFaqLd, rnServiceLd } from '@/lib/seo/react-native-app-development-company';
import {
  rnBenefits,
  rnFaqs,
  rnHero,
  rnMeta,
  rnOutsourceCta,
  rnOverview,
  rnServices,
} from '@/lib/home/react-native-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own: every section the live page carries
// already had a home here, and the service board it shares with the Android
// page moved into `common` for it.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServiceBoard from '@/components/common/service-board';
import CtaBand from '@/components/landing/cta-band';
import Industries from '@/components/landing/industries';
import Faq from '@/components/landing/faq';

// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section.
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * React Native App Development landing page.
 *
 * Served at `/react-native-app-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The app owns the domain root (no `basePath`;
 * see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/react-native-app-content.ts`, extracted with the Playwright MCP
 * browser); the layout, the motion and the photography are this surface's.
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
 * The page's link-preview image: the hero's artwork (one app's screens on
 * iPhone and Android handsets alike) cropped to 1200×630 from its right side,
 * clear of the mock product cards that name real brands. softsuave.com's own
 * og:image is an SVG, which Facebook, LinkedIn and X do not render as a
 * preview, so there is nothing on the live page to copy.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/react-native-app-development-company-og.webp'),
  width: 1200,
  height: 630,
  alt: 'React Native App Development Company - Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${rnMeta.title} | Soft Suave`,
  description: rnMeta.description,
  alternates: { canonical: rnMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${rnMeta.title} | Soft Suave`,
    description: rnMeta.description,
    url: absoluteUrl(rnMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${rnMeta.title} | Soft Suave`,
    description: rnMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function ReactNativeAppDevelopmentPage() {
  return (
    <div className={home.page}>
      {/* softsuave.com's own schema for this page, verbatim — see
          `lib/seo/react-native-app-development-company.ts`. */}
      <JsonLd data={rnServiceLd} />
      <JsonLd data={rnFaqLd} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a
       * band is just the wrapper. Hero opens dark and the closing Contact
       * band is dark; everything between alternates, with one deliberate
       * two-dark run — the service board into its outsourcing CTA, because a
       * CTA band wants the deepest ground under it.
       *
       * This page carries no clients band, industries grid or case studies:
       * the live page has none, and nothing is invented to fill the rhythm.
       */}
      <main id="main">
        {/* Compact look — the same hero as the other app-development pages,
            so the marketing surface reads as a matched set. */}
        <Hero content={rnHero} idPrefix="rn" variant="compact" />

        <div className={home.light}>
          <Overview content={rnOverview} variant="compact" />
        </div>

        {/* Four names to pick from, one stage to read on. Their copy is too
            long to sit on cards and too long to run down the page. */}
        <ServiceBoard content={rnServices} />

        {/* `backdrop={false}` drops the coral light-field loop, which read on
            review as "the section is in a different colour theme than the other
            sections" — the band now sits on the page's own near-black ground
            like everything around it. */}
        <CtaBand content={rnOutsourceCta} backdrop={false} />

        {/* Client stories now sit ahead of the FAQ, as the review asked and as
            every corrected page on this surface runs them — the proof lands
            before the objection-handling rather than after it.

            That puts two light bands back to back, so they share one wrapper:
            the benefits grid and the stories read as a single warm-white
            chapter instead of two stacked panels with doubled padding, which is
            how `landing/hire-page` merges its own runs. */}
        <div className={home.light}>
          {/* Six benefits, three across so neither row is left with an orphan. */}
          <Industries content={rnBenefits} id="benefits" columns={3} />
          <Testimonials />
        </div>

        <Faq content={rnFaqs} idPrefix="rn-faq" />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
