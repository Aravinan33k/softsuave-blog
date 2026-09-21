import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  pyHero,
  pyHireCta,
  pyMeta,
  pyOverview,
  pyServices,
  pyTech,
} from '@/lib/home/python-content';

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

// Reused from the homepage verbatim. Not a stylistic choice: the live page's
// reviews band IS the homepage's, to the word — "What Our Clients Say About
// Us" with the same standfirst.
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Python Development landing page.
 *
 * Served at `/python-application-development-company` — the same path the
 * live softsuave.com page uses, so this is a drop-in replacement for it
 * rather than a second URL competing with it. The app owns the domain root
 * (no `basePath`; see next.config.ts and lib/flags.ts).
 *
 * Until this route existed, every nav link to Python fell through
 * `navHref`'s local-path check (themes/softsuave/nav-data.ts) and was
 * rewritten to an absolute softsuave.com URL — the nav's documented fallback
 * for a page this app does not serve. Registering the path in
 * lib/home/landing-pages.ts is what flips those three links (the header mega
 * menu, the nav data's technology list, and the web-app page's Django tile)
 * to local, and what puts the page in the sitemap.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/python-content.ts`). That page is server-rendered, so the copy
 * was fetched with `curl` and walked rather than driven through a headless
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
  title: `${pyMeta.title} | Soft Suave`,
  description: pyMeta.description,
  alternates: { canonical: pyMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${pyMeta.title} | Soft Suave`,
    description: pyMeta.description,
    url: absoluteUrl(pyMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pyMeta.title} | Soft Suave`,
    description: pyMeta.description,
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder: `Service`, `WebPage` and a
 * `BreadcrumbList`, `@id`-linked and pointing provider and publisher at the
 * organization `app/(marketing)/layout.tsx` declares once.
 *
 * No `FAQPage` node — the live page carries no FAQ, so there is nothing to
 * describe. `pageSchemaGraph` omits it entirely when `faqs` is absent rather
 * than emitting an empty one.
 */
const LD = pageSchemaGraph({
  path: pyMeta.path,
  title: pyMeta.title,
  description: pyMeta.description,
  serviceType: 'Python application development',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'Python Development',
  breadcrumbName: 'Python Development',
  offerCatalogName: pyServices.title,
  offers: pyServices.items.map((i) => ({ name: i.name, description: i.paragraphs[0] })),
});

export default function PythonApplicationDevelopmentCompanyPage() {
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
       * carries the same section set.
       *
       * The technology stack and the testimonials share one continuous
       * warm-white run at the end. That is the Java page's pattern for a
       * closing stretch of more than one section, and it is what keeps the
       * FAQ-shaped gap in this page (the live page has none) from leaving two
       * dark bands back to back before the close.
       */}
      <main id="main">
        {/* Compact look — the same hero as the rest of the surface. */}
        <Hero content={pyHero} idPrefix="py" variant="compact" />

        <div className={home.light}>
          <Overview content={pyOverview} variant="compact" />
        </div>

        {/* Six names to pick from, one stage to read on. Their copy is too
            long to sit on cards and too long to run down the page. */}
        <ServiceBoard content={pyServices} />

        <CtaBand content={pyHireCta} />

        <div className={home.light}>
          <TechStack content={pyTech} />

          {/* Homepage client stories, on the warm-white band as they are
              there — the live page's band carries the same heading and
              standfirst. */}
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
