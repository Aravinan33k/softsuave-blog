import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { softSuaveOrganizationLd } from '@/lib/seo/ai-page-schema';
import { nxFaqLd, nxServiceLd, nxWebPageLd } from '@/lib/seo/nextjs-development-company';
import {
  nxFaqs,
  nxHero,
  nxMeta,
  nxOverview,
  nxPlanCta,
  nxServices,
  nxTech,
  nxWhyUs,
} from '@/lib/home/nextjs-content';

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
import Clients from '@/components/home/clients';
import TechStack from '@/components/landing/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Next.js Development landing page.
 *
 * Served at `/nextjs-development-company` — the app owns the domain root (no
 * `basePath`; see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the supplied brief's own (see
 * `lib/home/nextjs-content.ts`, which also notes the two places this page
 * normalises that copy to fit the shared components).
 *
 * The structured data is the approved SEO spec's four blocks and nothing else:
 * its Organization (`softSuaveOrganizationLd`) plus the Service, WebPage and
 * FAQPage in `lib/seo/nextjs-development-company.ts` — see
 * PAGES_WITH_OWN_SITE_GRAPH for why the layout adds nothing here.
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

// A 1200×630 crop of the page's React-code artwork, served from the exact path
// the schema spec names, so the Service `image`, the WebPage
// `primaryImageOfPage` and the og:image are one file.
const ogImage = absoluteUrl('/assets/images/nextjs-development-company-og.webp');

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${nxMeta.title} | Soft Suave`,
  description: nxMeta.description,
  alternates: { canonical: nxMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${nxMeta.title} | Soft Suave`,
    description: nxMeta.description,
    url: absoluteUrl(nxMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630, alt: nxMeta.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${nxMeta.title} | Soft Suave`,
    description: nxMeta.description,
    images: [ogImage],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function NextjsDevelopmentCompanyPage() {
  return (
    <div className={home.page}>
      <JsonLd data={softSuaveOrganizationLd} />
      <JsonLd data={[nxServiceLd, nxWebPageLd, nxFaqLd]} />
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
        <Hero content={nxHero} idPrefix="nx" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={nxOverview} variant="compact" />

        {/* Centre-focused carousel — one service in focus with its neighbours
            as context, each card wearing its own artwork. */}
        <div className={home.light}>
          <ServicesCarousel content={nxServices} />
        </div>

        <CtaBand content={nxPlanCta} />

        <div className={home.light}>
          <WhyUs content={nxWhyUs} />
        </div>

        {/* The landing set's grouped panel grid, not the homepage's marquee.
            The marquee scrolls each row continuously, so at any moment the
            chips at both ends are cut mid-word — fine as homepage motion,
            but this is a reference table a reader scans, and the review
            asked for the design to be updated. The same grid the .NET,
            Ionic and Flutter pages use, so the surface reads as one set. */}
        <TechStack content={nxTech} />

        {/* The client stories now come before the FAQ, as the review asked and
            as every corrected page on this surface runs them — the proof lands
            before the objection-handling rather than after it. They share the
            warm-white band, so the two read as one closing chapter. */}
        <div className={home.light}>
          <Testimonials />
          <Faq content={nxFaqs} idPrefix="nx-faq" />
        </div>

        <Contact />
      </main>

      <Footer addressMicrodata={false} />
    </div>
  );
}
