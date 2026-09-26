import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  deEngagement,
  deFaqs,
  deHero,
  deIndustries,
  deMeta,
  deOverview,
  dePlanCta,
  deProcess,
  deSolutions,
  deTech,
  deUseCases,
  deWhyUs,
} from '@/lib/home/data-engineering-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Comparison from '@/components/common/comparison';
import ServicesGrid from '@/components/common/services-grid';
import ProcessRail from '@/components/common/process-rail';
import Industries from '@/components/landing/industries';
import WhyUs from '@/components/landing/why-us';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';

// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section.
import Clients from '@/components/home/clients';
import TechStack from '@/components/home/tech-stack';
import CaseStudies from '@/components/home/work-grid';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Data Engineering Services landing page.
 *
 * Served at `/data-engineering-services` — the app owns the domain root (no
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

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${deMeta.title} | Soft Suave`,
  description: deMeta.description,
  alternates: { canonical: deMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${deMeta.title} | Soft Suave`,
    description: deMeta.description,
    url: absoluteUrl(deMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${deMeta.title} | Soft Suave`,
    description: deMeta.description,
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
  path: deMeta.path,
  title: deMeta.title,
  description: deMeta.description,
  // Both of these are the SEO sheet's own wording for this page (23 Sep).
  serviceType: 'Data Pipeline, Integration, and Cloud Data Engineering',
  audience:
    'Businesses, data leaders, analytics teams, product leaders, CTOs, and enterprise technology teams',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'Data Engineering Services',
  breadcrumbName: 'Data Engineering Services',
  offerCatalogName: deSolutions.title,
  offers: deSolutions.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: deFaqs.title,
  faqs: deFaqs.items,
});

export default function DataEngineeringServicesPage() {
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
       * band is dark; everything between alternates, with two deliberate
       * two-dark runs — Why Soft Suave into its CTA band (a CTA band wants
       * the deepest ground) and FAQ into the close.
       */}
      <main id="main">
        {/* Compact look — the generative-AI page's hero, so the service
            pages read as a matched set. */}
        <Hero content={deHero} idPrefix="de" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={deOverview} variant="compact" />

        {/* Every solution on screen at once, each card wearing its own
            artwork in its top corner — the GCC page's feature card. */}
        <div className={home.light}>
          <ServicesGrid content={deSolutions} />
        </div>

        {/* The six steps hang off one drawn spine. */}
        <ProcessRail content={deProcess} />

        {/* A true ledger: considerations down the middle, each option's
            answers in its own column. */}
        <div className={home.light}>
          <Comparison content={deEngagement} id="engagement" tone="neutral" layout="table" />
        </div>

        {/* Five cards fill one row on a wide desktop. The watermark index
            keeps this from reading as a repeat of the industries grid. */}
        <Industries content={deUseCases} id="use-cases" columns={5} variant="watermark" />

        <div className={home.light}>
          <Industries content={deIndustries} columns={3} />
        </div>

        <WhyUs content={deWhyUs} />

        {/* No light-field backdrop here: the review asked for this band to sit on
            the page's own ground rather than a colour of its own. */}
        <CtaBand content={dePlanCta} backdrop={false} />

        {/* Homepage case-study gallery, on the warm-white band as it is there. */}
        <div className={home.light}>
          <CaseStudies />
        </div>

        {/* Same layout as /rag-development-services: the homepage's marquee
            rows, one per group, alternating direction. Dark, as on the
            homepage; `.techCompact` only clears its full-viewport
            min-height. */}
        <div className={home.techCompact}>
          <TechStack content={deTech} />
        </div>

        {/* Homepage client stories, on the warm-white band as they are there. */}
        <div className={home.light}>
          <Testimonials />
        </div>

        <Faq content={deFaqs} idPrefix="de-faq" />

        {/* The homepage's closing CTA, on its default /contact destination —
            the review sheet asked for the CTA buttons to lead to the contact
            page rather than back up to the hero's enquiry form. */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
