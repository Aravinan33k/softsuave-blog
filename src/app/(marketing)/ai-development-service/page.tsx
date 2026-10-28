import type { Metadata } from 'next';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import home from '@/components/home/home.module.css';

import { JsonLd } from '@/components/seo/json-ld';
import { BASE_PATH } from '@/lib/flags';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import * as copy from '@/lib/services/ai-development';
import Sections from './sections';

/**
 * Custom AI Development Services — /ai-development-service.
 *
 * A server component: the copy is static, so the whole page prerenders and only
 * the sections that genuinely need the browser (the hero's enquiry card, and the
 * homepage sections it reuses) ship JavaScript. The FAQ is native
 * <details>/<summary>, so it costs nothing at all.
 *
 * Three sections are the homepage's own components, not copies — Our Clients,
 * What Our Clients Say and the closing Business Enquiry CTA. They read
 * `lib/home/content.ts`, so that copy stays in exactly one place and this page
 * inherits any change to it. Everything specific to this page lives in
 * `lib/services/ai-development.ts`.
 *
 * Section ids (#services, #industries, #work, #why, #contact) match the shared
 * nav's anchors so the header links work here as they do on the homepage.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  title: `${copy.meta.title} | Soft Suave`,
  description: copy.meta.description,
  alternates: { canonical: copy.meta.path },
  openGraph: {
    title: `${copy.meta.title} | Soft Suave`,
    description: copy.meta.description,
    url: copy.meta.path,
    type: 'website',
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath, so
 *  it needs the already-public path. */
const HOME_HREF = BASE_PATH || '/';

export default function AiDevelopmentServicePage() {
  return (
    <div className={home.page}>
      {/*
       * Through the shared builder, like the rest of the surface.
       *
       * Two things were wrong with the hand-assembled version. `serviceLd`'s
       * `providerName` inlined an unidentified Organization rather than naming
       * the canonical one, and it emitted no `WebPage`, so the Service, the FAQ
       * and the trail had nothing joining them. And the trail hardcoded a Home
       * crumb: every other page gates that on `homepageEnabled`, because while
       * the flag is off "/" is a 307 and a breadcrumb must not point a crawler
       * at a redirect. The builder applies that gate.
       */}
      <JsonLd
        data={pageSchemaGraph({
          path: copy.meta.path,
          title: copy.meta.title,
          description: copy.meta.description,
          serviceType: copy.meta.title,
          offerCatalogName: copy.offerings.title,
          offers: copy.offerings.items.map((i) => ({ name: i.name, description: i.body })),
          faqName: copy.faq.title,
          faqs: copy.faq.items,
        })}
      />

      {/* This page has the bar's own #services and #why sections, so its
          anchors stay in-page instead of resolving to the homepage's copies.
          `logoHref` is stated because `ownsAnchors` keeps the logo's default
          `#top` in-page too, and the lockup must go HOME from a sub-page. */}
      <Nav ownsAnchors logoHref={HOME_HREF} />

      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
