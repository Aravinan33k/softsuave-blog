import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import {
  legalViolationCaseStudy,
  legalViolationMeta,
} from '@/lib/home/case-studies/legal-violation-tracking-application';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import CaseStudy from '@/components/case-study/case-study';

import home from '@/components/home/home.module.css';

/**
 * Legal Violation Tracking Application, rebuilt from
 * https://www.softsuave.com/case-study-legal-violation-tracking-application
 * on the case-study template (`components/case-study`). Copy and PDF are the
 * live page's; the layout and type are this site's.
 *
 * Head tags mirror live's exactly, as on the Smart Warranty page: its
 * `<title>`, meta description and canonical, and of Open Graph only
 * `og:site_name` ("Soft Suave Technologies") — live sets no other Open Graph
 * or Twitter tags, so neither does this page (any `metadata.openGraph` would
 * make Next add `og:title`, `og:description` and the `twitter:*` set).
 *
 * Schema likewise: live carries no JSON-LD, so this page emits none, and the
 * route is in PAGES_WITH_OWN_SITE_GRAPH so the layout adds nothing in its
 * place. Live's only structured data is its template's microdata — the
 * footer's PostalAddress, which this page's footer keeps, and the empty
 * WebPage `itemscope` on `<html>`, which belongs to the root layout (see the
 * Smart Warranty page).
 *
 * A SERVER component so it can own its `metadata`. Fonts, the `.theme-four`
 * tokens and Lenis smooth scroll come from `app/(marketing)/layout.tsx`.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: legalViolationMeta.title,
  description: legalViolationMeta.description,
  alternates: { canonical: 'https://www.softsuave.com/case-study-legal-violation-tracking-application' },
  robots: pageRobots,
  // No `openGraph`/`twitter` here — see the note above; `og:site_name` is
  // rendered in the page instead.
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath. */
const HOME_HREF = BASE_PATH || '/';

export default function LegalViolationCaseStudyPage() {
  return (
    <div className={home.page}>
      {/* Live's only Open Graph tag; hoisted into <head> by React. */}
      <meta property="og:site_name" content={legalViolationMeta.ogSiteName} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <CaseStudy
          content={legalViolationCaseStudy}
          idPrefix="case-study-legal-violation-tracking-application"
        />
      </main>

      <Footer />
    </div>
  );
}
