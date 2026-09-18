import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  rjAudience,
  rjBenefits,
  rjFaqs,
  rjHero,
  rjHireCta,
  rjMeta,
  rjOverview,
  rjServices,
  rjWhyUs,
} from '@/lib/home/reactjs-content';

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
import Industries from '@/components/landing/industries';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';

// Reused from the homepage verbatim. The clients band carries this page's
// own eight-logo strip rather than the homepage's larger roster on the live
// site, but the homepage's own component is reused for it anyway — see the
// content module's docblock. The reviews band IS the homepage's, to the
// word: "What Our Clients Say About Us" with the same standfirst.
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * ReactJS App Development landing page.
 *
 * Served at `/reactjs-app-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The app owns the domain root (no `basePath`;
 * see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/reactjs-content.ts`). That page is server-rendered, so the copy
 * was fetched with `curl` and walked with jsdom rather than driven through a
 * headless browser.
 *
 * The live page carries no technology stack section, so none is emitted
 * here. No new component: every section here already had a home in
 * `components/landing/*` or `components/common/*`.
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
  title: `${rjMeta.title} | Soft Suave`,
  description: rjMeta.description,
  alternates: { canonical: rjMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${rjMeta.title} | Soft Suave`,
    description: rjMeta.description,
    url: absoluteUrl(rjMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${rjMeta.title} | Soft Suave`,
    description: rjMeta.description,
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
  path: rjMeta.path,
  title: rjMeta.title,
  description: rjMeta.description,
  serviceType: 'ReactJS application development',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'ReactJS App Development',
  breadcrumbName: 'ReactJS App Development',
  offerCatalogName: rjServices.title,
  offers: rjServices.items.map((i) => ({ name: i.name, description: i.paragraphs[0] })),
  faqName: rjFaqs.title,
  // The builder folds each answer's bulleted `points` into its text, as the
  // hand-written block here did — the schema must say what the page shows.
  faqs: rjFaqs.items,
});

export default function ReactjsAppDevelopmentPage() {
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
       * band is dark, and everything between alternates cleanly — no run of
       * two dark sections anywhere on the page.
       *
       * This page carries no technology stack section: the live page has
       * none, and nothing is invented to fill the rhythm.
       */}
      <main id="main">
        {/* Compact look — the same hero as the rest of the surface. */}
        <Hero content={rjHero} idPrefix="rj" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={rjOverview} variant="compact" />

        {/* Six names to pick from, one stage to read on. Their copy is too
            long to sit on cards and too long to run down the page. */}
        <div className={home.light}>
          <ServiceBoard content={rjServices} />
        </div>

        <CtaBand content={rjHireCta} />

        <div className={home.light}>
          <Industries content={rjBenefits} id="benefits" columns={3} />
        </div>

        {/* "We Work For" names three audiences and describes them only in one
            closing sentence, so it renders as a claim list rather than as
            cards needing a body each we do not have. Its own "Talk to
            Experts" button carries through as the claim list's cta. */}
        <div className={home.light}>
          <Overview content={rjAudience} id="audience" variant="compact" />
        </div>

        <WhyUs content={rjWhyUs} />

        <div className={home.light}>
          <Faq content={rjFaqs} idPrefix="rj-faq" />
        </div>

        {/* Homepage client stories, on the warm-white band as they are there —
            the live page's band carries the same heading and standfirst. */}
        <div className={home.light}>
          <Testimonials />
        </div>

        {/* The homepage's closing CTA, pointed at this page's own enquiry
            form rather than the /contact route — the same close as every
            other service page. */}
        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
