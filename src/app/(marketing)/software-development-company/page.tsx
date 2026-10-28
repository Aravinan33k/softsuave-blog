import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { sdServiceLd } from '@/lib/seo/software-development-company';
import { sdMeta, sdTech } from '@/lib/home/software-development-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechStack from '@/components/home/tech-stack';

import home from '@/components/home/home.module.css';
import Sections from './sections';

/**
 * Software Development Company landing page.
 *
 * Served at `/software-development-company` — the same path the live
 * softsuave.com page uses, so this is a drop-in replacement for it rather than
 * a second URL competing with it. The app owns the domain root (no `basePath`;
 * see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the live page's own (see
 * `lib/home/software-development-content.ts`, extracted with the Playwright MCP
 * browser); the photography is free-licence Pexels art cropped for this
 * surface, credited in
 * `public/images/landing/software-development/credits.json`.
 *
 * This is the broadest page on the surface — it is the company's general
 * services page rather than a single technology's — so it carries the widest
 * industries grid, twelve sectors, and a thirty-six tool stack.
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
 * The page's link-preview image: softsuave.com's own share card for this page
 * (logo and "Software Development Company" over a darkened desk photo),
 * resized from its 1200×627 to 1200×630.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/software-development-company-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Software Development Company in India - Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${sdMeta.title} | Soft Suave`,
  description: sdMeta.description,
  alternates: { canonical: sdMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${sdMeta.title} | Soft Suave`,
    description: sdMeta.description,
    url: absoluteUrl(sdMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${sdMeta.title} | Soft Suave`,
    description: sdMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function SoftwareDevelopmentCompanyPage() {
  return (
    <div className={home.page}>
      {/* The live page's one JSON-LD block, verbatim — see
          `lib/seo/software-development-company.ts`. */}
      <JsonLd data={sdServiceLd} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a
       * band is just the wrapper. Hero opens dark and the closing Contact
       * band is dark. Two sections that must keep the deep ground, the
       * journey scene and the tech marquee, set the cadence: the reading-heavy
       * sections around them pair up two to a band rather than flipping one by
       * one, so no run of two dark sections appears anywhere.
       *
       * The live page has no mid-page CTA band and no case studies, so
       * neither appears here. Nothing is invented to pad the rhythm.
       */}
      <main id="main">
        <Sections
          techStack={<TechStack content={sdTech} loopShortRows />}
        />
      </main>

      <Footer />
    </div>
  );
}
