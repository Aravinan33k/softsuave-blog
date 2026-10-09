import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { sdServiceLd } from '@/lib/seo/software-development-company';
import {
  sdDelivery,
  sdFaqs,
  sdHero,
  sdIndustries,
  sdMeta,
  sdProcess,
  sdServices,
  sdTech,
  sdWhyUs,
} from '@/lib/home/software-development-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own; every section the live page carries
// already had a home here.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServicesCarousel from '@/components/common/services-carousel';
import Industries from '@/components/landing/industries';
import Faq from '@/components/landing/faq';

// Reused from the homepage verbatim. Not a stylistic choice: the live page's
// copy for both IS the homepage's, to the word — its clients band reads
// "Preferred AI-Enabled Technology Partner for Startups and SMBs" and its
// reviews band "What Our Clients Say About Us", each with the same standfirst.
import Clients from '@/components/home/clients';
import Process from '@/components/landing/process';
import TechStack from '@/components/home/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Software Development Company landing page.
 *
 * Served at `/software-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The app owns the domain root (no `basePath`;
 * see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/software-development-content.ts`, extracted with the Playwright MCP
 * browser); the photography is free-licence Pexels art cropped for this
 * surface, credited in
 * `public/images/landing/software-development/credits.json`.
 *
 * This is the broadest page on the surface — it is the company's general
 * services page rather than a single technology's — so it carries the widest
 * industries grid, twelve sectors, and a thirty-six tool stack.
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
 * The page's link-preview image: softsuave.com's own share card for this page
 * (logo and "Software Development Company" over a darkened desk photo),
 * resized from its 1200×627 to 1200×630.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/software-development-company-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Software Development Company in India - Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${sdMeta.title} | Soft Suave`,
  description: sdMeta.description,
  alternates: { canonical: sdMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${sdMeta.title} | Soft Suave`,
    description: sdMeta.description,
    url: absoluteUrl(sdMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${sdMeta.title} | Soft Suave`,
    description: sdMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function SoftwareDevelopmentCompanyPage() {
  return (
    <div className={home.page}>
      {/* The live page's one JSON-LD block, verbatim — see
          `lib/seo/software-development-company.ts`. */}
      <JsonLd data={sdServiceLd} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a
       * band is just the wrapper. Hero opens dark and the closing Contact
       * band is dark. Two sections that must keep the deep ground, the
       * journey scene and the tech marquee, set the cadence: the reading-heavy
       * sections around them pair up two to a band rather than flipping one by
       * one, so no run of two dark sections appears anywhere.
       *
       * The live page has no mid-page CTA band and no case studies, so
       * neither appears here. Nothing is invented to pad the rhythm.
       */}
      <main id="main">
        {/* Compact look — the same hero as the rest of the surface. */}
        <Hero content={sdHero} idPrefix="sd" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        {/* Centre-focused carousel — one service in focus with its neighbours
            as context, each card wearing its own artwork. Six one-paragraph
            services suit it better than the two-paragraph service board the
            app-framework pages use. */}
        <ServicesCarousel content={sdServices} />

        {/* The live page's "Why Choose Us" block: one line of prose, then the
            six reasons it names as a claim list. */}
        <div className={home.light}>
          <Overview content={sdWhyUs} variant="compact" />
        </div>

        {/* The seven stages as the shared simple process row — one process
            design on every landing page, per the Sep corrections review. */}
        <Process content={sdProcess} />

{/* One inverted band carrying both grids: twelve sectors four across,
            then the four delivery models. They pair up rather than alternating
            because the tech stack below them has to be dark, and the watermark
            numerals keep the second grid from reading as a repeat of the
            first. */}
        <div className={home.light}>
          <Industries content={sdIndustries} />
          {/* Its own anchor, so the nav reaches it without colliding with the
              industries grid above. */}
          <Industries content={sdDelivery} id="engagement" variant="watermark" />
        </div>

        {/* The homepage's marquee tech rows, one per group. Dark, as on the
            homepage: the rows fade out against the deep ground at both ends.
            `.techCompact` only clears the homepage's full-viewport
            min-height for this content-height page. `loopShortRows`: the five-
            tool Design and QA row is too short to overflow on a wide screen,
            and sat still while the four above it scrolled (review: "no
            scrolling effect"), so it repeats its chips to fill the strip. */}
        <div className={home.techCompact}>
          <TechStack content={sdTech} loopShortRows />
        </div>

        {/* The closing pair share the warm-white band, for the same reason the
            two grids above do. Testimonials lead: the review asked for them
            above the FAQ, so the page ends on the answers a reader came with
            rather than on the praise. */}
        <div className={home.light}>
          <Testimonials />
          <Faq content={sdFaqs} idPrefix="sd-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
