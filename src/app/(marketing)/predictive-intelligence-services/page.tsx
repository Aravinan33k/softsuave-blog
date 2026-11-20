import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { aiPageJsonLd, softSuaveOrganizationLd } from '@/lib/seo/ai-page-schema';
import { piMeta, piTech } from '@/lib/home/predictive-intelligence-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechStack from '@/components/home/tech-stack';

import home from '@/components/home/home.module.css';
import Sections from './sections';

/**
 * Predictive Intelligence Services landing page.
 *
 * Served at `/predictive-intelligence-services` — the app owns the domain
 * root (no `basePath`; see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
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
  url: ogImageUrl('/assets/images/predictive-intelligence-services-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Predictive Intelligence Services and Solutions by Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${piMeta.title} | Soft Suave`,
  description: piMeta.description,
  alternates: { canonical: piMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${piMeta.title} | Soft Suave`,
    description: piMeta.description,
    url: absoluteUrl(piMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${piMeta.title} | Soft Suave`,
    description: piMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

/**
 * Service + WebPage + FAQPage, from the approved SEO spec
 * (`lib/seo/ai-page-schema.ts`). It replaces the graph this page used to build
 * from its own content with `pageSchemaGraph`: the approved set is the page's
 * exact structured data.
 */
const LD = aiPageJsonLd('predictiveIntelligence');

export default function PredictiveIntelligenceServicesPage() {
  return (
    <div className={home.page}>
      {/* The spec's four blocks are this page's entire structured data:
          Organization (verbatim — no Facebook profile, unlike the site-wide
          node) + Service, WebPage, FAQPage. The layout adds nothing here, not
          even its WebSite, and the footer's PostalAddress microdata is off —
          see PAGES_WITH_OWN_SITE_GRAPH. Each block is its own <script>, as
          the spec lays them out (1 Oct check), not one array of three. */}
      <JsonLd data={softSuaveOrganizationLd} />
      {LD.map((node) => (
        <JsonLd key={String((node as { '@type': string })['@type'])} data={node} />
      ))}
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a
       * band is just the wrapper. Hero opens dark and the closing Contact
       * band is dark (it carries its own veiled backdrop); everything between
       * alternates, with the Overview and its comparison table sharing one
       * dark band because the copy marks them as a single section.
       */}
      <main id="main">
        <Sections
          techStack={<TechStack content={piTech} staticFrom={768} />}
        />
      </main>

      <Footer addressMicrodata={false} />
    </div>
  );
}
