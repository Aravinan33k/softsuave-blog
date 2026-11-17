import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { softSuaveOrganizationLd } from '@/lib/seo/ai-page-schema';
import { vueFaqLd, vueServiceLd, vueWebPageLd } from '@/lib/seo/vuejs-development-company';
import { vueMeta, vueTech } from '@/lib/home/vuejs-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechStack from '@/components/home/tech-stack';

import home from '@/components/home/home.module.css';
import Sections from './sections';

/**
 * Vue.js Development landing page.
 *
 * Served at `/vuejs-development-company` — the app owns the domain root (no
 * `basePath`; see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * Every word of the copy is the content doc's own (see
 * `lib/home/vuejs-content.ts`, which also notes where this page adapts that copy
 * to fit the shared components).
 *
 * The structured data is the approved SEO spec's four blocks and nothing else:
 * its Organization (`softSuaveOrganizationLd`) plus the Service, WebPage and
 * FAQPage in `lib/seo/vuejs-development-company.ts` — see
 * PAGES_WITH_OWN_SITE_GRAPH for why the layout adds nothing here.
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

// The hero artwork cropped to 1200×630, served from the exact path the schema
// spec names, so the Service `image`, the WebPage `primaryImageOfPage` and the
// og:image are one file.
const ogImage = ogImageUrl('/assets/images/vuejs-development-company-og.webp');

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${vueMeta.title} | Soft Suave`,
  description: vueMeta.description,
  alternates: { canonical: vueMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${vueMeta.title} | Soft Suave`,
    description: vueMeta.description,
    url: absoluteUrl(vueMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630, alt: vueMeta.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${vueMeta.title} | Soft Suave`,
    description: vueMeta.description,
    images: [ogImage],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function VueJsDevelopmentCompanyPage() {
  return (
    <div className={home.page}>
      <JsonLd data={softSuaveOrganizationLd} />
      <JsonLd data={[vueServiceLd, vueWebPageLd, vueFaqLd]} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a
       * band is just the wrapper. Hero opens dark and the closing Contact
       * band is dark, and everything between alternates cleanly — no run of
       * two dark sections anywhere on the page.
       */}
      <main id="main">
        <Sections
          techStack={<TechStack content={vueTech} staticFrom={768} />}
        />
      </main>

      <Footer addressMicrodata={false} />
    </div>
  );
}
