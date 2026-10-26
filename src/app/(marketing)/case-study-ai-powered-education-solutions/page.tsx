import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { liveSiteOrganizationLd } from '@/lib/seo/live-site-organization';
import { aiEducationCaseStudy, aiEducationMeta } from '@/lib/home/case-studies/ai-powered-education-solutions';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import CaseStudy from '@/components/case-study/case-study';

import home from '@/components/home/home.module.css';

/**
 * AI-Powered Education Solutions, rebuilt from
 * https://www.softsuave.com/case-study-ai-powered-education-solutions on the
 * case-study template (`components/case-study`). Copy and PDF are the live
 * page's; the layout and type are this site's.
 *
 * Head tags mirror live's exactly, as on the Smart Warranty page: its
 * `<title>`, meta description and canonical, and of Open Graph only
 * `og:site_name` ("Soft Suave Technologies") — live sets no other Open Graph
 * or Twitter tags, so neither does this page (any `metadata.openGraph` would
 * make Next add `og:title`, `og:description` and the `twitter:*` set).
 *
 * Schema: the site Organization live's GTM container injects, emitted here in
 * the HTML itself (`liveSiteOrganizationLd`, verbatim) so view-source,
 * crawlers and GTM-blocked visitors see it too, as on the LMS page. GTM still
 * adds its own copy once it loads — see `lib/seo/live-site-organization.ts`.
 * The route is in PAGES_WITH_OWN_SITE_GRAPH so the layout adds nothing beside
 * it. Live's only other structured data is its template's microdata — the
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
  title: aiEducationMeta.title,
  description: aiEducationMeta.description,
  alternates: { canonical: 'https://www.softsuave.com/case-study-ai-powered-education-solutions' },
  robots: pageRobots,
  // No `openGraph`/`twitter` here — see the note above; `og:site_name` is
  // rendered in the page instead.
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath. */
const HOME_HREF = BASE_PATH || '/';

export default function AiEducationCaseStudyPage() {
  return (
    <div className={home.page}>
      <JsonLd data={liveSiteOrganizationLd} />
      {/* Live's only Open Graph tag; hoisted into <head> by React. */}
      <meta property="og:site_name" content={aiEducationMeta.ogSiteName} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <CaseStudy content={aiEducationCaseStudy} idPrefix="case-study-ai-powered-education-solutions" />
      </main>

      <Footer />
    </div>
  );
}
