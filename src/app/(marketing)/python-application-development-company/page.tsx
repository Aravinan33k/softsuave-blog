import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { pyServiceLd } from '@/lib/seo/python-application-development-company';
import { pyMeta, pyTech } from '@/lib/home/python-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechStack from '@/components/landing/tech-stack';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';
import Sections from './sections';

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

/**
 * The page's link-preview image: Python source on screen (`print(...)`,
 * `complex(5,6)`, `from ctypes import`) at 1200×630, Pexels #27427258. Not the
 * hero's photograph: that one shows C++ (`cout <<`, `cin >>`), which a
 * reader would see as the wrong language on a card that names Python.
 * softsuave.com's own og:image is an SVG, which Facebook, LinkedIn and X do
 * not render as a preview, so there is nothing on the live page to copy.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/python-application-development-company-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Python Development Company in India - Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim —
  // the live page's full title, brand included (see `pyMeta`).
  title: pyMeta.title,
  description: pyMeta.description,
  alternates: { canonical: pyMeta.path },
  robots: pageRobots,
  openGraph: {
    title: pyMeta.title,
    description: pyMeta.description,
    url: absoluteUrl(pyMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: pyMeta.title,
    description: pyMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function PythonApplicationDevelopmentCompanyPage() {
  return (
    <div className={`${home.page} ${location.submitBlack}`}>
      {/* softsuave.com's own schema for this page, verbatim — see
          `lib/seo/python-application-development-company.ts`. */}
      <JsonLd data={pyServiceLd} />
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
        <Sections
          techStack={<TechStack content={pyTech} />}
        />
      </main>

      <Footer />
    </div>
  );
}
