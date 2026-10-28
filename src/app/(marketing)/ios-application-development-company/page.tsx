import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import {
  iosBreadcrumbLd,
  iosFaqLd,
  iosProductLd,
  iosServiceLd,
} from '@/lib/seo/ios-application-development-company';
import { iosMeta } from '@/lib/home/ios-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
import Sections from './sections';

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

/**
 * The page's link-preview image: the hero's photograph (an iPhone on its iOS
 * home screen in front of a laptop) cropped to 1200×630, as the Android and
 * Mobile App pages do. softsuave.com's own card carries the retired "The
 * smart way..." tagline and Apple-logo shapes, so it is not reused.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/ios-application-development-company-og.webp'),
  width: 1200,
  height: 630,
  alt: 'iOS App Development Services - Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${iosMeta.title} | Soft Suave`,
  description: iosMeta.description,
  alternates: { canonical: iosMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${iosMeta.title} | Soft Suave`,
    description: iosMeta.description,
    url: absoluteUrl(iosMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${iosMeta.title} | Soft Suave`,
    description: iosMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function IosAppDevelopmentPage() {
  return (
    <div className={home.page}>
      {/* softsuave.com's own schema for this page, verbatim — see
          `lib/seo/ios-application-development-company.ts`. */}
      <JsonLd data={iosServiceLd} />
      <JsonLd data={iosBreadcrumbLd} />
      <JsonLd data={iosFaqLd} />
      <JsonLd data={iosProductLd} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a
       * band is just the wrapper. Hero opens dark and the closing Contact
       * band is dark; everything between alternates, with the two CTA bands
       * taking the deepest ground.
       */}
      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
