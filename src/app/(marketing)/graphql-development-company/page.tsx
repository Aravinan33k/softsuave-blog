import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { gqFaqLd, gqServiceLd, gqWebPageLd } from '@/lib/seo/graphql-development-company';
import {
  gqFaqs,
  gqHero,
  gqMeta,
  gqOverview,
  gqPlanCta,
  gqServices,
  gqTech,
  gqWhyUs,
} from '@/lib/home/graphql-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — every section the brief calls for already had
// a home here; this page adds none of its own.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServicesCarousel from '@/components/common/services-carousel';
import CtaBand from '@/components/landing/cta-band';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';

// Reused from the homepage verbatim, as the brief asks for both explicitly:
// the clients logo band, the testimonials band, and the closing enquiry CTA.
// TechStack is the homepage's own marquee too — the same choice made for the
// Next.js and TypeScript pages, so the three closest sibling pages on this
// surface read as a matched set rather than one using the static panel grid.
import Clients from '@/components/home/clients';
import TechStack from '@/components/home/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * GraphQL Development landing page.
 *
 * Served at `/graphql-development-company` — the app owns the domain root (no
 * `basePath`; see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the supplied brief's own (see
 * `lib/home/graphql-content.ts`, which also notes the one place this page's
 * technology table needed folding to avoid a thin marquee row).
 *
 * The structured data follows the same split as `/nextjs-development-company`
 * and `/typescript-development-company`: the site-wide Organization node
 * (`lib/seo/organization.ts`, unchanged, not re-declared) plus Service,
 * WebPage and FAQPage schemas built from this page's own content
 * (`lib/seo/graphql-development-company.ts`), the three linked back to the
 * Organization by `@id` rather than repeating it.
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

// No bundled OG image for this page yet, so the dynamic /og route generates
// one from the title — the same fallback every post and page without a
// custom image already gets from `buildMetadata`.
const ogImage = dynamicOgImage(gqMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${gqMeta.title} | Soft Suave`,
  description: gqMeta.description,
  alternates: { canonical: gqMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${gqMeta.title} | Soft Suave`,
    description: gqMeta.description,
    url: absoluteUrl(gqMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630, alt: gqMeta.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${gqMeta.title} | Soft Suave`,
    description: gqMeta.description,
    images: [ogImage],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function GraphQLDevelopmentCompanyPage() {
  return (
    <div className={home.page}>
      <JsonLd data={[gqServiceLd, gqWebPageLd, gqFaqLd]} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a
       * band is just the wrapper. Hero opens dark and the closing Contact
       * band is dark, and everything between alternates cleanly — no run of
       * two dark sections anywhere on the page.
       */}
      <main id="main">
        {/* Compact look — the same hero as the rest of the surface. */}
        <Hero content={gqHero} idPrefix="gq" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={gqOverview} variant="compact" />

        {/* Centre-focused carousel — one service in focus with its neighbours
            as context, each card wearing its own artwork. */}
        <div className={home.light}>
          <ServicesCarousel content={gqServices} />
        </div>

        <CtaBand content={gqPlanCta} />

        <div className={home.light}>
          <WhyUs content={gqWhyUs} />
        </div>

        {/* The homepage's marquee tech rows, one per group, rather than the
            landing set's static panel grid. Dark, as on the homepage;
            `.techCompact` only clears the homepage's full-viewport
            min-height for this content-height page. */}
        <div className={home.techCompact}>
          <TechStack content={gqTech} />
        </div>

        {/* Client stories ahead of the FAQ (review: "move the testimonials
            before the FAQ") — both are light bands, so they share one
            wrapper rather than reopening the same surface twice in a row. */}
        <div className={home.light}>
          <Testimonials />
          <Faq content={gqFaqs} idPrefix="gq-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
