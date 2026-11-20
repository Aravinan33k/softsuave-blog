import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { RestoredLiveLd } from '@/components/seo/restored-live-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import { ngFaqs, ngMeta, ngServices } from '@/lib/home/angular-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
import Sections from './sections';

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
  robots: pageRobots,
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
  path: ngMeta.path,
  title: ngMeta.title,
  description: ngMeta.description,
  serviceType: 'Angular development',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'Angular Development',
  // Matches the live page's own breadcrumb trail exactly: Home › Web
  // Development › Angular Development Services.
  showBreadcrumb: true,
  parents: [{ name: 'Web Development', path: '/web-application-development-company' }],
  breadcrumbName: 'Angular Development Services',
  offerCatalogName: ngServices.title,
  offers: ngServices.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: ngFaqs.title,
  faqs: ngFaqs.items,
});

export default function AngularDevelopmentPage() {
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
       * The success stories and the awards wall share one inverted band: the
       * award badges are directory artwork with white grounds baked in, so
       * they need the warm-white ground to sit on, and pairing them keeps the
       * alternation intact either side.
       */}
      <RestoredLiveLd path="/angularjs-development-company" />
      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
