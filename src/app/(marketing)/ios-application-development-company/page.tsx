import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  iosBenefits,
  iosDevelopersCta,
  iosFaqs,
  iosHero,
  iosLaunchCta,
  iosMeta,
  iosServices,
  iosStories,
  iosTech,
  iosWhyUs,
} from '@/lib/home/ios-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Springboard from '@/components/ios-app/springboard';
import Industries from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import StoryCards from '@/components/common/story-cards';
import Faq from '@/components/landing/faq';

// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section.
import Clients from '@/components/home/clients';
import Recognitions from '@/components/home/recognitions';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * iOS App Development landing page.
 *
 * Served at `/ios-application-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The app owns the domain root (no `basePath`;
 * see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/ios-app-content.ts`, extracted with the Playwright MCP browser),
 * including two copy bugs on that page which are reproduced and flagged rather
 * than quietly rewritten. The layout, the motion and the photography are this
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
  title: `${iosMeta.title} | Soft Suave`,
  description: iosMeta.description,
  alternates: { canonical: iosMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${iosMeta.title} | Soft Suave`,
    description: iosMeta.description,
    url: absoluteUrl(iosMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${iosMeta.title} | Soft Suave`,
    description: iosMeta.description,
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
  path: iosMeta.path,
  title: iosMeta.title,
  description: iosMeta.description,
  serviceType: 'iOS app development',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'iOS App Development',
  breadcrumbName: 'iOS App Development',
  offerCatalogName: iosServices.title,
  offers: iosServices.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: iosFaqs.title,
  faqs: iosFaqs.items,
});

export default function IosAppDevelopmentPage() {
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
       * band is dark; everything between alternates, with the two CTA bands
       * taking the deepest ground.
       */}
      <main id="main">
        {/* Compact look — the same hero as the other service pages, so the
            marketing surface reads as a matched set. */}
        <Hero content={iosHero} idPrefix="ios" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        {/* Six services on rounded square tiles — the home-screen grid the
            iPhone, Watch and TV work all share. */}
        <Springboard content={iosServices} />

        {/* Four technology themes, with the section's own three bullets. */}
        <div className={home.light}>
          <Industries content={iosTech} id="tech" columns={4} />
        </div>

        {/* Carries the page's three counters. */}
        <CtaBand content={iosLaunchCta} />

        <div className={home.light}>
          <Industries content={iosBenefits} id="benefits" columns={3} variant="watermark" />
        </div>

        <Industries content={iosWhyUs} id="why" columns={3} />

        <CtaBand content={iosDevelopersCta} />

        {/* This page's own three case studies, not the homepage gallery. */}
        <div className={home.light}>
          <StoryCards content={iosStories} />
        </div>

        {/* The live page's "Awards & Certifications" band. NOT
            `home/awards.tsx` — that file is misleadingly named and renders
            the enterprise integrations section; the awards band is
            `home/recognitions.tsx` (id="awards"). */}
        <Recognitions />

        {/* Homepage client stories, on the warm-white band as they are there. */}
        <div className={home.light}>
          <Testimonials />
        </div>

        <Faq content={iosFaqs} idPrefix="ios-faq" />

        {/* The homepage's closing CTA, pointed at this page's own enquiry
            form rather than the /contact route — the same close as the other
            service pages. */}
        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
