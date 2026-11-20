import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { flFaqLd, flServiceLd } from '@/lib/seo/flutter-application-development-company';
import { flMeta, flTech } from '@/lib/home/flutter-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechStack from '@/components/landing/tech-stack';

import home from '@/components/home/home.module.css';
import Sections from './sections';

/**
 * Flutter App Development landing page.
 *
 * Served at `/flutter-application-development-company` — the same path the
 * live softsuave.com page uses, so this is a drop-in replacement for it rather
 * than a second URL competing with it. The app owns the domain root (no
 * `basePath`; see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/flutter-app-content.ts`, extracted with the Playwright MCP
 * browser), and the four project cards carry the live page's own artwork,
 * bundled under `public/images/landing/flutter/`. The layout and the motion
 * are this surface's.
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
 * The page's link-preview image: an iPhone and an Android phone held side by
 * side — Flutter's one-codebase, both-platforms pitch — at 1200×630 (the
 * photo behind the board's "Flutter Development for iOS and Android"). Not
 * the hero's artwork: the React Native page's preview is already cut from
 * that, and two pages sharing one preview read as the same link.
 * softsuave.com's own og:image is an SVG, which Facebook, LinkedIn and X do
 * not render as a preview, so there is nothing on the live page to copy.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/flutter-application-development-company-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Flutter App Development Services - Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${flMeta.title} | Soft Suave`,
  description: flMeta.description,
  alternates: { canonical: flMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${flMeta.title} | Soft Suave`,
    description: flMeta.description,
    url: absoluteUrl(flMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${flMeta.title} | Soft Suave`,
    description: flMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function FlutterAppDevelopmentPage() {
  return (
    <div className={home.page}>
      {/* softsuave.com's own schema for this page, verbatim — see
          `lib/seo/flutter-application-development-company.ts`. */}
      <JsonLd data={flServiceLd} />
      <JsonLd data={flFaqLd} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a
       * band is just the wrapper. Hero opens dark and the closing Contact
       * band is dark, and everything between alternates — the one two-dark
       * run is FAQ → Contact at the end, which is what moving the FAQ past
       * the client stories leaves, and is how the other corrected pages on
       * this surface close too.
       *
       * This page carries no clients band or industries grid: the live page
       * has none, and nothing is invented to fill the rhythm.
       */}
      <main id="main">
        <Sections
          techStack={<TechStack content={flTech} />}
        />
      </main>

      <Footer />
    </div>
  );
}
