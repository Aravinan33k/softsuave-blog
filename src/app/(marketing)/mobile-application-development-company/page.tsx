import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import {
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

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${madMeta.title} | Soft Suave`,
  description: madMeta.description,
  alternates: { canonical: madMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${madMeta.title} | Soft Suave`,
    description: madMeta.description,
    url: absoluteUrl(madMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${madMeta.title} | Soft Suave`,
    description: madMeta.description,
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
  { label: 'Services', href: '#services' },
  { label: 'Platforms', href: '#platforms' },
  { label: 'Process', href: '#journey' },
  { label: 'Why Us', href: '#why' },
  { label: 'Industries', href: '#industries' },
  { label: 'Engagement', href: '#engagement' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: 'Talk to Our Experts', href: '#enquiry' } as const;

/** FAQPage + Service structured data — this page's answers are its SEO surface. */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: madFaqs.items.map((f) => ({
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
  name: madMeta.title,
  serviceType: 'Mobile app development',
  description: madMeta.description,
  url: absoluteUrl(madMeta.path),
  provider: {
    '@type': 'Organization',
    name: 'Soft Suave',
    url: 'https://www.softsuave.com',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: madServices.title,
    itemListElement: madServices.items.map((i) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: i.name, description: i.body },
    })),
  },
};

export default function MobileAppDevelopmentPage() {
  // "/" is only a page this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect — which leaves a
  // single-item trail, so the schema is omitted rather than emitted empty.
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: 'Mobile App Development', path: madMeta.path },
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

        {/* Homepage case-study gallery. */}
        <div className={home.light}>
          <CaseStudies />
        </div>

        {/* Homepage client stories, on the warm-white band as they are there. */}
        <div className={home.light}>
          <Testimonials />
        </div>

        <Faq content={madFaqs} idPrefix="mad-faq" />

        {/* The homepage's closing CTA, pointed at this page's own enquiry
            form rather than the /contact route — the same close as the other
            service pages. */}
        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
