import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
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
  piWhyUs,
} from '@/lib/home/predictive-intelligence-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Comparison from '@/components/common/comparison';
import ServicesCarousel from '@/components/common/services-carousel';
import Industries from '@/components/landing/industries';
import Process from '@/components/landing/process';
import Integration from '@/components/common/integration';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';

// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section.
import Clients from '@/components/home/clients';
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

/** Nav for this page: its own section anchors, plus real routes out. */
const PAGE_NAV = [
  // "/" goes through next/link, so it resolves to the marketing homepage
  // under either mount.
  { label: 'Home', href: '/' },
  { label: 'Overview', href: '#overview' },
  { label: 'Capabilities', href: '#services' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Process', href: '#journey' },
  { label: 'Integration', href: '#integration' },
  { label: 'Industries', href: '#industries' },
  { label: 'Why Us', href: '#why' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: 'Book AI Strategy Call', href: '#enquiry' } as const;

/** FAQPage + Service structured data — this page's answers are its SEO surface. */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: piFaqs.items.map((f) => ({
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
  name: piMeta.title,
  serviceType: 'Predictive intelligence development',
  description: piMeta.description,
  url: absoluteUrl(piMeta.path),
  provider: {
    '@type': 'Organization',
    name: 'Soft Suave',
    url: 'https://www.softsuave.com',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: piCapabilities.title,
    itemListElement: piCapabilities.items.map((i) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: i.name, description: i.body },
    })),
  },
};

export default function PredictiveIntelligenceServicesPage() {
  // "/" is only a page this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect — which leaves a
  // single-item trail, so the schema is omitted rather than emitted empty.
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: 'Predictive Intelligence Services', path: piMeta.path },
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
        <Comparison content={piComparison} id="vs-analytics" tone="neutral" level={3} />

        {/* Centre-focused carousel — one capability in focus with its
            neighbours as context, each card wearing its own artwork. */}
        <div className={home.light}>
          <ServicesCarousel content={piCapabilities} />
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

        <div className={home.light}>
          <Faq content={piFaqs} idPrefix="pi-faq" />
        </div>

        {/* The homepage's closing CTA, pointed at this page's own enquiry
            form rather than the /contact route — the same close as the other
            new service pages. */}
        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
