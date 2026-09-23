import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  rnBenefits,
  rnFaqs,
  rnHero,
  rnMeta,
  rnOutsourceCta,
  rnOverview,
  rnServices,
} from '@/lib/home/react-native-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own: every section the live page carries
// already had a home here, and the service board it shares with the Android
// page moved into `common` for it.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServiceBoard from '@/components/common/service-board';
import CtaBand from '@/components/landing/cta-band';
import Industries from '@/components/landing/industries';
import Faq from '@/components/landing/faq';

// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section.
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * React Native App Development landing page.
 *
 * Served at `/react-native-app-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The app owns the domain root (no `basePath`;
 * see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/react-native-app-content.ts`, extracted with the Playwright MCP
 * browser); the layout, the motion and the photography are this surface's.
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
  title: `${rnMeta.title} | Soft Suave`,
  description: rnMeta.description,
  alternates: { canonical: rnMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${rnMeta.title} | Soft Suave`,
    description: rnMeta.description,
    url: absoluteUrl(rnMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${rnMeta.title} | Soft Suave`,
    description: rnMeta.description,
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
  path: rnMeta.path,
  title: rnMeta.title,
  description: rnMeta.description,
  serviceType: 'React Native app development',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'React Native App Development',
  breadcrumbName: 'React Native App Development',
  offerCatalogName: rnServices.title,
  offers: rnServices.items.map((i) => ({ name: i.name, description: i.paragraphs[0] })),
  faqName: rnFaqs.title,
  // The builder folds each answer's bulleted `points` into its text, as the
  // hand-written block here did — the schema must say what the page shows.
  faqs: rnFaqs.items,
});

export default function ReactNativeAppDevelopmentPage() {
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
       * band is dark; everything between alternates, with one deliberate
       * two-dark run — the service board into its outsourcing CTA, because a
       * CTA band wants the deepest ground under it.
       *
       * This page carries no clients band, industries grid or case studies:
       * the live page has none, and nothing is invented to fill the rhythm.
       */}
      <main id="main">
        {/* Compact look — the same hero as the other app-development pages,
            so the marketing surface reads as a matched set. */}
        <Hero content={rnHero} idPrefix="rn" variant="compact" />

        <div className={home.light}>
          <Overview content={rnOverview} variant="compact" />
        </div>

        {/* Four names to pick from, one stage to read on. Their copy is too
            long to sit on cards and too long to run down the page. */}
        <ServiceBoard content={rnServices} />

        <CtaBand content={rnOutsourceCta} />

        {/* Six benefits, three across so neither row is left with an orphan. */}
        <div className={home.light}>
          <Industries content={rnBenefits} id="benefits" columns={3} />
        </div>

        <Faq content={rnFaqs} idPrefix="rn-faq" />

        {/* Homepage client stories, on the warm-white band as they are there. */}
        <div className={home.light}>
          <Testimonials />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
