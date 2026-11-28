import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { rjFaqLd, rjServiceLd } from '@/lib/seo/reactjs-app-development-company';
import { rjMeta } from '@/lib/home/reactjs-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';
import Sections from './sections';

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
  robots: pageRobots,
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

export default function ReactjsAppDevelopmentPage() {
  return (
    <div className={`${home.page} ${location.submitBlack}`}>
      {/* softsuave.com's own schema for this page, one <script> per block —
          see `lib/seo/reactjs-app-development-company.ts`. */}
      <JsonLd data={rjServiceLd} />
      <JsonLd data={rjFaqLd} />
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
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
