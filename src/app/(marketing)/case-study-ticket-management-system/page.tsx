import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import {
  ticketManagementCaseStudy,
  ticketManagementMeta,
} from '@/lib/home/case-studies/ticket-management-system';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import CaseStudy from '@/components/case-study/case-study';

import home from '@/components/home/home.module.css';

/**
 * Advanced Ticket Management App for Risk-Free Transactions, rebuilt from
 * https://www.softsuave.com/case-study-ticket-management-system on the
 * case-study template (`components/case-study`). Copy, images and PDF are the
 * live page's; the layout and type are this site's.
 *
 * Head tags mirror live's: its `<title>` (typo and all), meta description
 * and canonical, and its Open Graph and Twitter sets field for field — the
 * social title is live's "…case study" wording, not the `<title>`, the site
 * name is "Soft Suave Technologies", and the image names no size or alt, as
 * live's doesn't. (`og:type` renders "website"; live writes "Website".)
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

/**
 * The link-preview image: live's own share card for this page, as served
 * (840×439 JPEG), at live's path.
 */
const OG_IMAGE_URL = ogImageUrl('/assets/case-studies/ticket-management-system.jpg');

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: ticketManagementMeta.title,
  description: ticketManagementMeta.description,
  alternates: { canonical: 'https://www.softsuave.com/case-study-ticket-management-system' },
  robots: pageRobots,
  openGraph: {
    title: ticketManagementMeta.socialTitle,
    description: ticketManagementMeta.description,
    url: absoluteUrl(ticketManagementMeta.path),
    siteName: ticketManagementMeta.ogSiteName,
    type: 'website',
    images: [{ url: OG_IMAGE_URL }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@softsuave',
    title: ticketManagementMeta.socialTitle,
    description: ticketManagementMeta.description,
    images: [OG_IMAGE_URL],
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath. */
const HOME_HREF = BASE_PATH || '/';

export default function TicketManagementCaseStudyPage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <CaseStudy content={ticketManagementCaseStudy} idPrefix="case-study-ticket-management-system" />
      </main>

      <Footer />
    </div>
  );
}
