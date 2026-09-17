import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import {
  njFaqs,
  njHero,
  njHireCta,
  njMeta,
  njOverview,
  njServices,
  njTech,
} from '@/lib/home/nodejs-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own; every section the live page carries
// already had a home here.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServiceBoard from '@/components/common/service-board';
import CtaBand from '@/components/landing/cta-band';
import TechStack from '@/components/landing/tech-stack';
import Faq from '@/components/landing/faq';

// Reused from the homepage verbatim. Not a stylistic choice: the live page's
// reviews band IS the homepage's, to the word — "What Our Clients Say About Us"
// with the same standfirst.
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * NodeJS Development landing page.
 *
 * Served at `/nodejs-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The app owns the domain root (no `basePath`;
 * see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/nodejs-content.ts`). That page is server-rendered, so the copy
 * was fetched with `curl` and walked with jsdom rather than driven through a
 * headless browser.
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
  title: `${njMeta.title} | Soft Suave`,
  description: njMeta.description,
  alternates: { canonical: njMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${njMeta.title} | Soft Suave`,
    description: njMeta.description,
    url: absoluteUrl(njMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${njMeta.title} | Soft Suave`,
    description: njMeta.description,
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

const PAGE_CTA = { label: 'Hire NodeJS Developer', href: '#enquiry' } as const;

/** FAQPage + Service structured data — this page's answers are its SEO surface. */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: njFaqs.items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      // The bulleted `points` are part of the visible answer, so the schema
      // carries them too — Google requires the two to agree.
      text: [...(typeof f.a === 'string' ? [f.a] : f.a), ...(f.points ?? [])].join(' '),
    },
  })),
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: njMeta.title,
  serviceType: 'NodeJS application development',
  description: njMeta.description,
  url: absoluteUrl(njMeta.path),
  provider: {
    '@type': 'Organization',
    name: 'Soft Suave',
    url: 'https://www.softsuave.com',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: njServices.title,
    itemListElement: njServices.items.map((i) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: i.name, description: i.paragraphs[0] },
    })),
  },
};

export default function NodejsDevelopmentPage() {
  // "/" is only a page this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect — which leaves a
  // single-item trail, so the schema is omitted rather than emitted empty.
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: 'NodeJS Development', path: njMeta.path },
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
       * two-dark run — the services into their hiring CTA, because a CTA band
       * wants the deepest ground under it.
       *
       * This page carries no clients band, benefits grid or case studies:
       * the live page has none (its only "brand-logo"-classed element is the
       * footer's own social-icon mark, not a partner-clients strip), and
       * nothing is invented to fill the rhythm.
       */}
      <main id="main">
        {/* Compact look — the same hero as the rest of the surface. */}
        <Hero content={njHero} idPrefix="nj" variant="compact" />

        <div className={home.light}>
          <Overview content={njOverview} variant="compact" />
        </div>

        {/* Six names to pick from, one stage to read on. Their copy is too
            long to sit on cards and too long to run down the page. */}
        <ServiceBoard content={njServices} />

        <CtaBand content={njHireCta} />

        <div className={home.light}>
          <TechStack content={njTech} />
        </div>

        <Faq content={njFaqs} idPrefix="nj-faq" />

        {/* Homepage client stories, on the warm-white band as they are there —
            the live page's band carries the same heading and standfirst. */}
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
