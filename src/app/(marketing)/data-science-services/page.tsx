import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { aiPageJsonLd, softSuaveOrganizationLd } from '@/lib/seo/ai-page-schema';
import {
  dsFaqs,
  dsFit,
  dsHero,
  dsIndustries,
  dsMeta,
  dsOverview,
  dsProcess,
  dsServices,
  dsTech,
  dsWhyUs,
} from '@/lib/home/data-science-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import FitGuide from '@/components/data-science/fit-guide';
import ServicesGrid from '@/components/common/services-grid';
import TechCluster from '@/components/data-science/tech-cluster';
import Industries from '@/components/landing/industries';
import CapabilityLattice from '@/components/data-science/capability-lattice';
import Faq from '@/components/landing/faq';

// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section.
import Clients from '@/components/home/clients';
import Process from '@/components/landing/process';
import CaseStudies from '@/components/home/work-grid';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Data Science Services landing page.
 *
 * Served at `/data-science-services` — the app owns the domain root (no
 * `basePath`; see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
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
 * The page's OG image — the hero artwork cropped to 1200×630, served from the
 * exact path the approved schema spec names, so the Service `image`, the
 * WebPage `primaryImageOfPage` and the og:image are one file.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/data-science-services-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Data Science Services and Consulting by Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${dsMeta.title} | Soft Suave`,
  description: dsMeta.description,
  alternates: { canonical: dsMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${dsMeta.title} | Soft Suave`,
    description: dsMeta.description,
    url: absoluteUrl(dsMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${dsMeta.title} | Soft Suave`,
    description: dsMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

/**
 * Service + WebPage + FAQPage, from the approved SEO spec
 * (`lib/seo/ai-page-schema.ts`). It replaces the graph this page used to build
 * from its own content with `pageSchemaGraph`: the approved set is the page's
 * exact structured data.
 */
const LD = aiPageJsonLd('dataScience');

export default function DataScienceServicesPage() {
  return (
    <div className={home.page}>
      {/* The spec's four blocks are this page's entire structured data:
          Organization (verbatim — no Facebook profile, unlike the site-wide
          node) + Service, WebPage, FAQPage. The layout adds nothing here, not
          even its WebSite, and the footer's PostalAddress microdata is off —
          see PAGES_WITH_OWN_SITE_GRAPH. */}
      <JsonLd data={softSuaveOrganizationLd} />
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a
       * band is just the wrapper. Hero opens dark and the closing Contact
       * band is dark; everything between alternates, with two deliberate
       * two-dark runs — the services carousel into the pinned journey (which
       * has to be dark), and FAQ into the close.
       */}
      <main id="main">
        {/* Compact look — the generative-AI page's hero, so the service
            pages read as a matched set. */}
        <Hero content={dsHero} idPrefix="ds" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={dsOverview} variant="compact" />

        {/* The brief's triage table as routed rows: problem → data → the
            starting point it earns, with the fallback branch beneath. */}
        <div className={home.light}>
          <FitGuide content={dsFit} />
        </div>

        <ServicesGrid content={dsServices} />

        {/* The six phases as the shared simple process row — one process
            design on every landing page, per the Sep corrections review. */}
        <Process content={dsProcess} />

        <div className={home.light}>
          <Industries content={dsIndustries} columns={3} />
        </div>

        {/* Not six cards in a row: this section's own copy argues the six
            capabilities have to connect, so every card is wired to every
            other and pointing at one lights just its connections. */}
        <CapabilityLattice content={dsWhyUs} />

        {/* Homepage case-study gallery, on the warm-white band as it is there. */}
        <div className={home.light}>
          <CaseStudies />
        </div>

        {/* Not the marquee the other service pages use: twenty-two tools in
            nine categories is small enough to show whole, so they arrive as
            scattered points and resolve into their clusters — this page's
            own subject, drawn. */}
        <TechCluster content={dsTech} />

        {/* Homepage client stories, on the warm-white band as they are there. */}
        <div className={home.light}>
          <Testimonials />
        </div>

        <Faq content={dsFaqs} idPrefix="ds-faq" />

        {/* The homepage's closing CTA, on its default /contact destination —
            the review sheet asked for the CTA buttons to lead to the contact
            page rather than back up to the hero's enquiry form. */}
        <Contact />
      </main>

      <Footer addressMicrodata={false} />
    </div>
  );
}
