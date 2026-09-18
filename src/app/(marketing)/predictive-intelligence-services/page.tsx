import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  piApplications,
  piCapabilities,
  piComparison,
  piFaqs,
  piHero,
  piIndustries,
  piIntegration,
  piMeta,
  piOverview,
  piProcess,
  piTech,
  piWhyUs,
} from '@/lib/home/predictive-intelligence-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Comparison from '@/components/common/comparison';
import ServicesGrid from '@/components/common/services-grid';
import Industries from '@/components/landing/industries';
import Process from '@/components/landing/process';
import Integration from '@/components/common/integration';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';

// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section.
import Clients from '@/components/home/clients';
import CaseStudies from '@/components/home/work-grid';
import TechStack from '@/components/home/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Predictive Intelligence Services landing page.
 *
 * Served at `/predictive-intelligence-services` — the app owns the domain
 * root (no `basePath`; see next.config.ts and lib/flags.ts). Registered in
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

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${piMeta.title} | Soft Suave`,
  description: piMeta.description,
  alternates: { canonical: piMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${piMeta.title} | Soft Suave`,
    description: piMeta.description,
    url: absoluteUrl(piMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${piMeta.title} | Soft Suave`,
    description: piMeta.description,
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
  path: piMeta.path,
  title: piMeta.title,
  description: piMeta.description,
  serviceType: 'Predictive intelligence development',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'Predictive Intelligence Services',
  breadcrumbName: 'Predictive Intelligence Services',
  offerCatalogName: piCapabilities.title,
  offers: piCapabilities.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: piFaqs.title,
  faqs: piFaqs.items,
});

export default function PredictiveIntelligenceServicesPage() {
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
       * band is dark (it carries its own veiled backdrop); everything between
       * alternates, with the Overview and its comparison table sharing one
       * dark band because the copy marks them as a single section.
       */}
      <main id="main">
        {/* Compact look — the generative-AI page's hero, so the service
            pages read as a matched set. */}
        <Hero content={piHero} idPrefix="pi" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        {/* The comparison is an H3 sub-section under the Overview's H2, so it
            renders at level 3 and stays in the same band. `neutral` tone
            because the table distinguishes two approaches rather than
            recommending one. */}
        <Overview content={piOverview} variant="compact" />
        <Comparison
          content={piComparison}
          id="vs-analytics"
          tone="neutral"
          level={3}
          layout="table"
        />

        {/* Every capability on screen at once, each card wearing its own
            artwork in its top corner — the GCC page's feature card. */}
        <div className={home.light}>
          <ServicesGrid content={piCapabilities} />
        </div>

        <Industries content={piApplications} id="use-cases" />

        <div className={home.light}>
          <Process content={piProcess} variant="stages" />
        </div>

        <Integration content={piIntegration} />

        {/* Six industries read as two rows of three rather than four then a
            two-card remainder. */}
        <div className={home.light}>
          <Industries content={piIndustries} columns={3} />
        </div>

        <WhyUs content={piWhyUs} />

        {/* Homepage case-study gallery, on the warm-white band as it is there. */}
        <div className={home.light}>
          <CaseStudies />
        </div>

        {/* The review sheet's tech-stack table, rendered as the homepage's
            marquee rows (one per category) like /data-engineering-services.
            `techCompact` only clears the band's full-viewport min-height. */}
        <div className={home.techCompact}>
          <TechStack content={piTech} />
        </div>

        {/* Homepage client stories, on the warm-white band as they are there. */}
        <div className={home.light}>
          <Testimonials />
        </div>

        <div className={home.light}>
          <Faq content={piFaqs} idPrefix="pi-faq" />
        </div>

        {/* The homepage's closing CTA, on its default /contact destination —
            the review sheet asked for the CTA buttons to lead to the contact
            page rather than back up to the hero's enquiry form. */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
