import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  javaBreadcrumbLd,
  javaFaqLd,
  javaProductLd,
  javaServiceLd,
} from '@/lib/seo/java-application-development-company';
import { javaMeta } from '@/lib/home/java-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
import Sections from './sections';

/**
 * Java Application Development landing page.
 *
 * Served at `/java-application-development-company` — softsuave.com's own slug
 * for this page, so this route takes over a URL that already exists rather
 * than inventing a new one. Registered in `lib/home/landing-pages.ts`, which
 * gates it behind the homepage release flag and puts it in the sitemap.
 *
 * Every word of the copy is the live page's own — see `lib/home/java-content.ts`,
 * whose header maps each live section to the export that carries it and records
 * the one typo corrected along the way.
 *
 * Structured data follows the same split as the Next.js and TypeScript pages:
 * the site-wide Organization node (`lib/seo/organization.ts`, unchanged, not
 * re-declared) plus Service, WebPage and FAQPage schemas built from this page's
 * own content, the three linked back to the Organization by `@id`.
 *
 * A SERVER component on purpose: only a server component may export `metadata`,
 * and the (marketing) layout's own metadata is the homepage's. Every section
 * below is a client component, which a server component may freely render.
 *
 * Fonts, the `.theme-four` token scope and Lenis smooth scroll all come from
 * `app/(marketing)/layout.tsx`, so nothing here re-declares them.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

// No bundled OG image for this page yet, so the dynamic /og route generates one
// from the title — the same fallback every page without a custom image gets.
const ogImage = dynamicOgImage(javaMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${javaMeta.title} | Soft Suave`,
  description: javaMeta.description,
  alternates: { canonical: javaMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${javaMeta.title} | Soft Suave`,
    description: javaMeta.description,
    url: absoluteUrl(javaMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630, alt: javaMeta.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${javaMeta.title} | Soft Suave`,
    description: javaMeta.description,
    images: [ogImage],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function JavaApplicationDevelopmentCompanyPage() {
  return (
    <div className={home.page}>
      {/* softsuave.com's own schema for this page, one <script> per block —
          see `lib/seo/java-application-development-company.ts`. */}
      <JsonLd data={javaServiceLd} />
      <JsonLd data={javaFaqLd} />
      <JsonLd data={javaBreadcrumbLd} />
      <JsonLd data={javaProductLd} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a band
       * is just the wrapper. Hero opens dark and the closing Contact band is
       * dark, and everything between alternates — no run of two dark sections.
       */}
      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
