import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import {
  smartWarrantyCaseStudy,
  smartWarrantyMeta,
} from '@/lib/home/case-studies/smart-warranty-document-management';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import CaseStudy from '@/components/case-study/case-study';

import home from '@/components/home/home.module.css';

/**
 * Smart Warranty and Document Management App, rebuilt from
 * https://www.softsuave.com/case-study-smart-warranty-and-document-management-app
 * on the case-study template (`components/case-study`). Copy and PDF are the
 * live page's; the layout and type are this site's.
 *
 * Head tags mirror live's exactly: its `<title>`, meta description and
 * canonical, and of Open Graph only `og:site_name` ("Soft Suave
 * Technologies") — live sets no `og:title`, `og:url`, `og:type`, `og:image`
 * or Twitter tags, so neither does this page. That tag is rendered as a
 * `<meta>` in the page (React hoists it into `<head>`), not through
 * `metadata.openGraph`: given any `openGraph`, Next fills in `og:title`,
 * `og:description` and the `twitter:*` set from the title and description
 * (`postProcessMetadata` in next/dist/lib/metadata/resolve-metadata.js),
 * which would add five tags live doesn't have.
 *
 * Schema likewise: live carries no JSON-LD, so this page emits none, and the
 * route is in PAGES_WITH_OWN_SITE_GRAPH so the layout adds nothing in its
 * place. What an SEO tool reports on live is its template's microdata — the
 * footer's PostalAddress, which this page's footer keeps, and an empty
 * `itemscope itemtype="http://schema.org/WebPage"` on `<html>`, which belongs
 * to the root layout every page shares and is not reproduced per page (see
 * `lib/seo/flutter-application-development-company.ts`).
 *
 * A SERVER component so it can own its `metadata`. Fonts, the `.theme-four`
 * tokens and Lenis smooth scroll come from `app/(marketing)/layout.tsx`.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: smartWarrantyMeta.title,
  description: smartWarrantyMeta.description,
  alternates: { canonical: 'https://www.softsuave.com/case-study-smart-warranty-and-document-management-app' },
  robots: pageRobots,
  // No `openGraph`/`twitter` here — see the note above; `og:site_name` is
  // rendered in the page instead.
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath. */
const HOME_HREF = BASE_PATH || '/';

export default function SmartWarrantyCaseStudyPage() {
  return (
    <div className={home.page}>
      {/* Live's only Open Graph tag; hoisted into <head> by React. */}
      <meta property="og:site_name" content={smartWarrantyMeta.ogSiteName} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <CaseStudy
          content={smartWarrantyCaseStudy}
          idPrefix="case-study-smart-warranty-and-document-management-app"
        />
      </main>

      <Footer />
    </div>
  );
}
