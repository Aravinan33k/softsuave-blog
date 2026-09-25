import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  webAudience,
  webCoreTech,
  webOutsourceCta,
  webDelivery,
  webFaqs,
  webHero,
  webMeta,
  webOverview,
  webProcess,
  webServices,
  webSpecialties,
  webWhyUs,
} from '@/lib/home/web-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own; every section the live page carries
// already had a home here.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Integration from '@/components/common/integration';
import ServiceBoard from '@/components/common/service-board';
import Industries from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';

// Reused from the homepage verbatim. Not a stylistic choice: the live page's
// copy for both IS the homepage's, to the word — its clients band reads
// "Preferred AI-Enabled Technology Partner for Startups and SMBs" and its
// reviews band "What Our Clients Say About Us", each with the same standfirst.
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Web Application Development landing page.
 *
 * Served at `/web-application-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The app owns the domain root (no `basePath`;
 * see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/web-app-content.ts`). That page is server-rendered, so the copy was
 * fetched with `curl` and walked with jsdom rather than driven through a
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
  title: `${webMeta.title} | Soft Suave`,
  description: webMeta.description,
  alternates: { canonical: webMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${webMeta.title} | Soft Suave`,
    description: webMeta.description,
    url: absoluteUrl(webMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${webMeta.title} | Soft Suave`,
    description: webMeta.description,
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
  path: webMeta.path,
  title: webMeta.title,
  description: webMeta.description,
  serviceType: 'Web application development',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'Web Application Development',
  breadcrumbName: 'Web Application Development',
  offerCatalogName: webServices.title,
  offers: webServices.items.map((i) => ({ name: i.name, description: i.paragraphs[0] })),
  faqName: webFaqs.title,
  faqs: webFaqs.items,
});

export default function WebApplicationDevelopmentPage() {
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
       * band is dark; this is the longest page on the surface, so the
       * reading-heavy sections pair up two to a band in places rather than
       * flipping one by one, which would strobe over eleven sections.
       *
       * The live page has no mid-page CTA band and no case studies, so
       * neither appears here. Nothing is invented to pad the rhythm.
       */}
      <main id="main">
        {/* Compact look — the same hero as the rest of the surface. */}
        <Hero content={webHero} idPrefix="web" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={webOverview} variant="compact" />

        {/* Two blocks, front end and back end, each with its own paragraph. */}
        <div className={home.light}>
          <Integration content={webSpecialties} id="specialties" />
        </div>

        {/* Six names to pick from, one stage to read on. Their copy is too
            long to sit on cards and too long to run down the page. */}
        <ServiceBoard content={webServices} />

        {/* The live page's conversion band, between the services and the
            technology grid. `backdrop={false}` keeps it on the page's own
            ground rather than the coral light-field, as every corrected CTA on
            this surface now does. */}
        <CtaBand content={webOutsourceCta} backdrop={false} />

        {/* Eight technologies four across, then the four delivery models. They
            share a band so the process scene below keeps a clean alternation
            over a page this long.
            
            `autoLink` on both: every card in the two grids names a page we
            publish, and neither anchor ("core-tech", "engagement") is a word
            the id heuristic in `landing/industries` looks for, so both grids
            were rendering as plain statements. */}
        <div className={home.light}>
          <Industries content={webCoreTech} id="core-tech" autoLink />
          <Industries content={webDelivery} id="engagement" variant="watermark" autoLink />
        </div>

        {/* Seven stages, one row of five then two on a wide desktop. */}
        <Process content={webProcess} variant="stages" />

        {/* "Who We Work With" names three audiences and describes none, so they
            render as the overview's claim list rather than as empty cards. */}
        <div className={home.light}>
          <Overview content={webAudience} id="audience" variant="compact" />
        </div>

        <WhyUs content={webWhyUs} />

        {/* The closing pair share the warm-white band, same reason as the two
            grids above — with the client stories first, as the review asked
            and as every corrected page on this surface runs them: the proof
            lands before the objection-handling rather than after it. */}
        <div className={home.light}>
          <Testimonials />
          <Faq content={webFaqs} idPrefix="web-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
