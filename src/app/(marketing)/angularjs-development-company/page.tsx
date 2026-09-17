import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import {
  ngFaqs,
  ngHero,
  ngHireCta,
  ngMeta,
  ngServices,
  ngStacks,
  ngStories,
  ngStrengths,
  ngWhyUs,
} from '@/lib/home/angular-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own; every section the live page carries
// already had a home here.
import Hero from '@/components/landing/hero';
import ServicesCarousel from '@/components/common/services-carousel';
import Industries from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import WhyUs from '@/components/landing/why-us';
import StoryCards from '@/components/common/story-cards';
import Faq from '@/components/landing/faq';

// Reused from the homepage verbatim: the logo band, the awards wall and the
// reviews band. The testimonials heading here is the homepage's to the word;
// the clients heading is shorter on the live page, but the logos are the same,
// so the shared band is used rather than a second copy of it.
import Clients from '@/components/home/clients';
import Recognitions from '@/components/home/recognitions';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Angular Development landing page.
 *
 * Served at `/angularjs-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The slug keeps the older "AngularJS"
 * spelling because that is the indexed URL, even though every heading on the
 * page says "Angular". The app owns the domain root (no `basePath`; see
 * next.config.ts and lib/flags.ts). Registered in lib/home/landing-pages.ts,
 * which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/angular-app-content.ts`). That page is server-rendered, so the copy
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
  title: `${ngMeta.title} | Soft Suave`,
  description: ngMeta.description,
  alternates: { canonical: ngMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${ngMeta.title} | Soft Suave`,
    description: ngMeta.description,
    url: absoluteUrl(ngMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${ngMeta.title} | Soft Suave`,
    description: ngMeta.description,
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
  { label: 'Tech Stacks', href: '#stacks' },
  { label: 'Capabilities', href: '#strengths' },
  { label: 'Why Us', href: '#why' },
  { label: 'Work', href: '#work' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: 'Hire Angular Developers', href: '#enquiry' } as const;

/** FAQPage + Service structured data — this page's answers are its SEO surface. */
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ngFaqs.items.map((f) => ({
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
  name: ngMeta.title,
  serviceType: 'Angular development',
  description: ngMeta.description,
  url: absoluteUrl(ngMeta.path),
  provider: {
    '@type': 'Organization',
    name: 'Soft Suave',
    url: 'https://www.softsuave.com',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: ngServices.title,
    itemListElement: ngServices.items.map((i) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: i.name, description: i.body },
    })),
  },
};

export default function AngularDevelopmentPage() {
  // "/" is only a page this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect — which leaves a
  // single-item trail, so the schema is omitted rather than emitted empty.
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: 'Angular Development', path: ngMeta.path },
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
       * band is dark, and everything between alternates cleanly — no run of
       * two dark sections anywhere on the page.
       *
       * The success stories and the awards wall share one inverted band: the
       * award badges are directory artwork with white grounds baked in, so
       * they need the warm-white ground to sit on, and pairing them keeps the
       * alternation intact either side.
       */}
      <main id="main">
        {/* Compact look — the same hero as the rest of the surface. */}
        <Hero content={ngHero} idPrefix="ng" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        {/* Centre-focused carousel — one service in focus with its neighbours
            as context, each card wearing its own artwork. */}
        <ServicesCarousel content={ngServices} />

        {/* Four stacks, the three supporting claims above them. */}
        <div className={home.light}>
          <Industries content={ngStacks} id="stacks" columns={4} />
        </div>

        {/* Carries this page's three counters. */}
        <CtaBand content={ngHireCta} />

        {/* Six capabilities, three across, two full rows. */}
        <div className={home.light}>
          <Industries content={ngStrengths} id="strengths" columns={3} variant="watermark" />
        </div>

        <WhyUs content={ngWhyUs} />

        <div className={home.light}>
          <StoryCards content={ngStories} />
          {/* The live page's "Awards & Certifications" band. NOT
              `home/awards.tsx` — that file is misleadingly named and renders
              the enterprise integrations section; the awards band is
              `home/recognitions.tsx`. */}
          <Recognitions />
        </div>

        <Faq content={ngFaqs} idPrefix="ng-faq" />

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
