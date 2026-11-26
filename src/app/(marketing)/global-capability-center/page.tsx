import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { GCC_LIVE_LD } from '@/lib/seo/global-capability-center';
import { gccMeta } from '@/lib/home/gcc-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';
import location from '@/components/landing/location-app-page.module.css';
import Sections from './sections';

/**
 * Global Capability Center landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/gcc-content.ts`). The closing "Talk To Us" band is the shared
 * mid-page `CtaBand`, as on every other page, ahead of the closing enquiry
 * section.
 */

export const revalidate = 300;

/**
 * The page's link-preview image: softsuave.com's own share card for this
 * page (1200x628), set to the exact 1200x630 the large preview uses
 * (review: "add the Social Share Preview image").
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/global-capability-center-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Global Capability Center (GCC) as a Service - Soft Suave',
};

// The live page's own <title>, verbatim — it carries no brand suffix there.
export const metadata: Metadata = {
  title: gccMeta.title,
  description: gccMeta.description,
  alternates: { canonical: gccMeta.path },
  robots: pageRobots,
  openGraph: {
    title: gccMeta.title,
    description: gccMeta.description,
    url: absoluteUrl(gccMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: gccMeta.title,
    description: gccMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 * needs the already-public path. `BASE_PATH` is '' while the app owns the
 * domain root — hence the fallback, without which it would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function GlobalCapabilityCenterPage() {
  return (
    <div className={`${home.page} ${location.submitBlack} ${landing.stackedHeads} ${home.stackedHeads}`}>
      {/* softsuave.com's own schema for this page, verbatim, one <script> per
          block — see `lib/seo/global-capability-center.ts`. */}
      {GCC_LIVE_LD.map((block, i) => (
        <JsonLd key={i} data={block} />
      ))}
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
