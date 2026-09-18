import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
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
import Journey from '@/components/home/journey';
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

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${dsMeta.title} | Soft Suave`,
  description: dsMeta.description,
  alternates: { canonical: dsMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${dsMeta.title} | Soft Suave`,
    description: dsMeta.description,
    url: absoluteUrl(dsMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${dsMeta.title} | Soft Suave`,
    description: dsMeta.description,
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

/** Nav for this page: its own section anchors, plus real routes out. */
const PAGE_NAV = [
  // "/" goes through next/link, so it resolves to the marketing homepage
  // under either mount.
  { label: 'Home', href: '/' },
  { label: 'Overview', href: '#overview' },
  { label: 'Business Fit', href: '#fit' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#journey' },
  { label: 'Industries', href: '#industries' },
  { label: 'Why Us', href: '#why' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: 'Discuss Your Project', href: '/contact' } as const;

/** FAQPage + Service structured data — this page's answers are its SEO surface. */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: dsFaqs.items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: typeof f.a === 'string' ? f.a : f.a.join(' '),
    },
  })),
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: dsMeta.title,
  serviceType: 'Data science',
  description: dsMeta.description,
  url: absoluteUrl(dsMeta.path),
  provider: {
    '@type': 'Organization',
    name: 'Soft Suave',
    url: 'https://www.softsuave.com',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: dsServices.title,
    itemListElement: dsServices.items.map((i) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: i.name, description: i.body },
    })),
  },
};

export default function DataScienceServicesPage() {
  // "/" is only a page this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect — which leaves a
  // single-item trail, so the schema is omitted rather than emitted empty.
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: 'Data Science Services', path: dsMeta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={home.page}>
      <JsonLd data={[serviceLd, faqLd, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav links={PAGE_NAV} cta={PAGE_CTA} logoHref={HOME_HREF} />

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

        {/* The homepage's pinned journey scene over this page's six phases —
            the process is a route walked once, in order, which is what that
            layout is for. Dark, and NOT wrapped in `.light`: the beam, the
            hub auras and the scrim are all built for the deep ground. */}
        <Journey content={dsProcess} />

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

      <Footer />
    </div>
  );
}
