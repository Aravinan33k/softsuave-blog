import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import {
  andFaqs,
  andHero,
  andHireCta,
  andMeta,
  andOverview,
  andServices,
  andStack,
} from '@/lib/home/android-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServiceBoard from '@/components/common/service-board';
import CtaBand from '@/components/landing/cta-band';
import StackLayers from '@/components/android-app/stack-layers';
import Faq from '@/components/landing/faq';

// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section. The
// live page's testimonials band carries the identical heading.
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Android Application Development landing page.
 *
 * Served at `/android-application-development-company` — the same path the
 * live softsuave.com page uses, so this is a drop-in replacement for it rather
 * than a second URL competing with it. The app owns the domain root (no
 * `basePath`; see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/android-app-content.ts`, extracted with the Playwright MCP
 * browser); the layout and the motion are this surface's.
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
  title: `${andMeta.title} | Soft Suave`,
  description: andMeta.description,
  alternates: { canonical: andMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${andMeta.title} | Soft Suave`,
    description: andMeta.description,
    url: absoluteUrl(andMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${andMeta.title} | Soft Suave`,
    description: andMeta.description,
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
  { label: 'Services', href: '#services' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: 'Talk To Experts', href: '#enquiry' } as const;

/** FAQPage + Service structured data — this page's answers are its SEO surface. */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: andFaqs.items.map((f) => ({
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
  name: andMeta.title,
  serviceType: 'Android app development',
  description: andMeta.description,
  url: absoluteUrl(andMeta.path),
  provider: {
    '@type': 'Organization',
    name: 'Soft Suave',
    url: 'https://www.softsuave.com',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: andServices.title,
    itemListElement: andServices.items.map((i) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: i.name, description: i.paragraphs[0] },
    })),
  },
};

export default function AndroidAppDevelopmentPage() {
  // "/" is only a page this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect — which leaves a
  // single-item trail, so the schema is omitted rather than emitted empty.
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: 'Android Application Development', path: andMeta.path },
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
       * two-dark run — the services into their CTA band, because a CTA band
       * wants the deepest ground under it.
       *
       * This page carries no clients band, industries grid or case studies:
       * the live page has none, and nothing is invented to fill the rhythm.
       */}
      <main id="main">
        {/* Compact look — the same hero as the other service pages, so the
            marketing surface reads as a matched set. */}
        <Hero content={andHero} idPrefix="and" variant="compact" />

        <div className={home.light}>
          <Overview content={andOverview} variant="compact" />
        </div>

        {/* Six names to pick from, one stage to read on. Their copy is too
            long to sit on cards and too long to run down the page. */}
        <ServiceBoard content={andServices} />

        <CtaBand content={andHireCta} />

        {/* The stack, drawn as a stack: four slabs that assemble from the
            base up. */}
        <div className={home.light}>
          <StackLayers content={andStack} />
        </div>

        <Faq content={andFaqs} idPrefix="and-faq" />

        {/* Homepage client stories, on the warm-white band as they are there —
            the live page's band carries the same heading. */}
        <div className={home.light}>
          <Testimonials />
        </div>

        {/* The homepage's closing CTA, pointed at this page's own enquiry
            form rather than the /contact route — the same close as the other
            service pages. */}
        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
