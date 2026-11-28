import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { aiPageJsonLd, softSuaveOrganizationLd } from '@/lib/seo/ai-page-schema';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { caMeta, caTech } from '@/lib/home/custom-ai-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechStack from '@/components/landing/tech-stack';

// Page-specific section: the custom-vs-off-the-shelf comparison.
import Comparison from '@/components/custom-ai/comparison';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';
import Sections from './sections';

/**
 * Custom AI Development Services landing page.
 *
 * Public URL depends on the mount: `basePath` is '/blog' in production and ''
 * in local dev (next.config.ts / lib/flags.ts), so this route serves at
 * `https://www.softsuave.com/blog/custom-ai-development-services` in production and at
 * `http://localhost:3100/custom-ai-development-services` locally.
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
 * The page's OG image — the hero artwork cropped to 1200×630, served from the
 * exact path the approved schema spec names, so the Service `image`, the
 * WebPage `primaryImageOfPage` and the og:image are one file.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/custom-ai-development-services-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Custom AI Development Services by Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${caMeta.title} | Soft Suave`,
  description: caMeta.description,
  alternates: { canonical: caMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${caMeta.title} | Soft Suave`,
    description: caMeta.description,
    url: absoluteUrl(caMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${caMeta.title} | Soft Suave`,
    description: caMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 * needs the already-public path. `BASE_PATH` is '' in local dev and '/blog' in
 * production — hence the fallback, without which dev would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

/**
 * Service + WebPage + FAQPage, from the approved SEO spec
 * (`lib/seo/ai-page-schema.ts`).
 *
 * This replaces the FAQPage and Service this page used to derive from its own
 * content objects. The approved Service carries an offer catalogue whose
 * entries link out to the sibling service pages by `@id` — Generative AI,
 * Agentic AI, RAG & Document AI, Computer Vision, Predictive Intelligence —
 * which is the hub relationship this page is meant to express and which a
 * catalogue built from `caOfferings` could not state.
 */
const structuredData = aiPageJsonLd('customAi');

export default function CustomAiDevelopmentPage() {
  return (
    <div className={`${home.page} ${location.submitBlack}`}>
      {/* The spec's four blocks are this page's entire structured data:
          Organization (verbatim — no Facebook profile, unlike the site-wide
          node) + Service, WebPage, FAQPage. The layout adds nothing here, not
          even its WebSite, and the footer's PostalAddress microdata is off —
          see PAGES_WITH_OWN_SITE_GRAPH. */}
      <JsonLd data={softSuaveOrganizationLd} />
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Dark/light alternates every section (the `home.light` wrapper
       * re-points the same --bg/--surface/--text tokens every component
       * already reads — see the "light band" comment in landing.module.css),
       * same technique the homepage uses for its own light bands. Hero opens
       * dark and FinalCta closes dark, matching the homepage's Hero → …→
       * Contact bookends; everything between strictly alternates so no run of
       * dark sections gets longer than one.
       */}
      <main id="main">
        <Sections
          comparison={<Comparison />}
          techStack={<TechStack content={caTech} largeLogos />}
        />
      </main>

      <Footer addressMicrodata={false} />
    </div>
  );
}
