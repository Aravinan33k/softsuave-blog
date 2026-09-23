import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  phpFaqs,
  phpHero,
  phpHireCta,
  phpMeta,
  phpOverview,
  phpServices,
  phpTech,
} from '@/lib/home/php-content';

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
// reviews band IS the homepage's, to the word — "What Our Clients Say About
// Us" with the same standfirst.
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * PHP Development landing page.
 *
 * Served at `/php-application-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather
 * than a second URL competing with it. The app owns the domain root (no
 * `basePath`; see next.config.ts and lib/flags.ts).
 *
 * Until this route existed, every nav link to PHP fell through `navHref`'s
 * local-path check (themes/softsuave/nav-data.ts) and was rewritten to an
 * absolute softsuave.com URL — the nav's documented fallback for a page this
 * app does not serve. Registering the path in lib/home/landing-pages.ts is
 * what flips those links to local, and what puts the page in the sitemap.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/php-content.ts`). That page is server-rendered, so the copy was
 * fetched with `curl` and walked rather than driven through a headless
 * browser.
 *
 * A SERVER component on purpose: only a server component may export
 * `metadata`, and the (marketing) layout's own metadata is the homepage's.
 * Every section below is a client component, which a server component may
 * freely render.
 *
 * Fonts, the `.theme-four` token scope and Lenis smooth scroll all come from
 * `app/(marketing)/layout.tsx`, so nothing here re-declares them.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${phpMeta.title} | Soft Suave`,
  description: phpMeta.description,
  alternates: { canonical: phpMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${phpMeta.title} | Soft Suave`,
    description: phpMeta.description,
    url: absoluteUrl(phpMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${phpMeta.title} | Soft Suave`,
    description: phpMeta.description,
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder: `Service`, `WebPage`,
 * `FAQPage` and a `BreadcrumbList`, `@id`-linked and pointing provider and
 * publisher at the organization `app/(marketing)/layout.tsx` declares once.
 *
 * The builder folds each answer's bulleted `points` into its text, so the
 * schema says what the page shows rather than dropping the third answer's
 * list.
 */
const LD = pageSchemaGraph({
  path: phpMeta.path,
  title: phpMeta.title,
  description: phpMeta.description,
  serviceType: 'PHP application development',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'PHP Development',
  breadcrumbName: 'PHP Development',
  offerCatalogName: phpServices.title,
  offers: phpServices.items.map((i) => ({ name: i.name, description: i.paragraphs[0] })),
  faqName: phpFaqs.title,
  faqs: phpFaqs.items,
});

export default function PhpApplicationDevelopmentCompanyPage() {
  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a band
       * is just the wrapper. Hero opens dark and the closing Contact band is
       * dark; everything between alternates, with one deliberate two-dark run
       * — the services into their hiring CTA, because a CTA band wants the
       * deepest ground under it. Same rhythm as the NodeJS page, which
       * carries the same section set including the FAQ.
       */}
      <main id="main">
        {/* Compact look — the same hero as the rest of the surface. */}
        <Hero content={phpHero} idPrefix="php" variant="compact" />

        <div className={home.light}>
          <Overview content={phpOverview} variant="compact" />
        </div>

        {/* Six names to pick from, one stage to read on. Their copy is too
            long to sit on cards and too long to run down the page. */}
        <ServiceBoard content={phpServices} />

        <CtaBand content={phpHireCta} />

        <div className={home.light}>
          <TechStack content={phpTech} />
        </div>

        <Faq content={phpFaqs} idPrefix="php-faq" />

        {/* Homepage client stories, on the warm-white band as they are there
            — the live page's band carries the same heading and standfirst. */}
        <div className={home.light}>
          <Testimonials />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
