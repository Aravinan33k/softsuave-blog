import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { jobProgressCaseStudy, jobProgressMeta } from '@/lib/home/case-studies/job-progress-tracking';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import CaseStudy from '@/components/case-study/case-study';

import home from '@/components/home/home.module.css';

/**
 * Effective Tool to track the Jobs or Projects for the Customers, rebuilt
 * from https://www.softsuave.com/case-study-job-progress-tracking on the
 * case-study template (`components/case-study`). Copy, images, icons and PDF
 * are the live page's; the layout and type are this site's.
 *
 * Head tags mirror live's, as on the Ticket Management page: its `<title>`,
 * meta description and canonical, and its Open Graph and Twitter sets field
 * for field — the social title and description are live's own wording, not
 * the `<title>` and meta description, and the two sets name different
 * images, as live's do (`og:image` is the Secured Communication study's
 * share card, `twitter:image` this study's own). Neither names a size or alt,
 * as live's don't. (`og:type` renders "website"; live writes "Website".)
 *
 * Live carries no JSON-LD, so this page emits none either; the route is in
 * PAGES_WITH_OWN_SITE_GRAPH so the layout adds nothing in its place. The
 * footer keeps its PostalAddress microdata, as live's does.
 *
 * A SERVER component so it can own its `metadata`. Fonts, the `.theme-four`
 * tokens and Lenis smooth scroll come from `app/(marketing)/layout.tsx`.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

/** Live's `og:image` (840×439 JPEG), already self-hosted for the Telehealth page. */
const OG_IMAGE_URL = ogImageUrl('/assets/case-studies/secured-communication-app-for-patient-care.jpg');
/** Live's `twitter:image`, this study's own share card, at live's path. */
const TWITTER_IMAGE_URL = ogImageUrl('/assets/case-studies/job-progress-tracking-application.jpg');

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: jobProgressMeta.title,
  description: jobProgressMeta.description,
  alternates: { canonical: 'https://www.softsuave.com/case-study-job-progress-tracking' },
  robots: pageRobots,
  openGraph: {
    title: jobProgressMeta.socialTitle,
    description: jobProgressMeta.socialDescription,
    url: absoluteUrl(jobProgressMeta.path),
    siteName: jobProgressMeta.ogSiteName,
    type: 'website',
    images: [{ url: OG_IMAGE_URL }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@softsuave',
    title: jobProgressMeta.socialTitle,
    description: jobProgressMeta.socialDescription,
    images: [TWITTER_IMAGE_URL],
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath. */
const HOME_HREF = BASE_PATH || '/';

export default function JobProgressCaseStudyPage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <CaseStudy content={jobProgressCaseStudy} idPrefix="case-study-job-progress-tracking" />
      </main>

      <Footer />
    </div>
  );
}
