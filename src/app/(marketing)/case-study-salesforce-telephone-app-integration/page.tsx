import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { liveSiteOrganizationLd } from '@/lib/seo/live-site-organization';
import {
  salesforceTelephoneCaseStudy,
  salesforceTelephoneMeta,
} from '@/lib/home/case-studies/salesforce-telephone-app-integration';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import CaseStudy from '@/components/case-study/case-study';

import home from '@/components/home/home.module.css';

/**
 * A Cloud-based Integration Telephone App, rebuilt from
 * https://www.softsuave.com/case-study-salesforce-telephone-app-integration
 * on the case-study template (`components/case-study`). Copy, images, icons
 * and PDF are the live page's; the layout and type are this site's.
 *
 * Head tags mirror live's, as on the Ticket Management page: its `<title>`
 * ("Salseforce" and all), meta description and canonical, and its Open Graph
 * and Twitter sets field for field — the social title is live's "…case study"
 * wording, the site name "Soft Suave Technologies", and the image names no
 * size or alt, as live's doesn't. (`og:type` renders "website"; live writes
 * "Website".)
 *
 * Schema: the site Organization live's GTM container injects, emitted here in
 * the HTML itself (`liveSiteOrganizationLd`, verbatim) so view-source,
 * crawlers and GTM-blocked visitors see it too, as on the LMS page. GTM still
 * adds its own copy once it loads — see `lib/seo/live-site-organization.ts`.
 * The route is in PAGES_WITH_OWN_SITE_GRAPH so the layout adds nothing beside
 * it; the footer keeps its PostalAddress microdata, as live's does.
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
const OG_IMAGE_URL = ogImageUrl('/assets/case-studies/a-cloud-based-integration-telephone-app.jpg');

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: salesforceTelephoneMeta.title,
  description: salesforceTelephoneMeta.description,
  alternates: { canonical: 'https://www.softsuave.com/case-study-salesforce-telephone-app-integration' },
  robots: pageRobots,
  openGraph: {
    title: salesforceTelephoneMeta.socialTitle,
    description: salesforceTelephoneMeta.description,
    url: absoluteUrl(salesforceTelephoneMeta.path),
    siteName: salesforceTelephoneMeta.ogSiteName,
    type: 'website',
    images: [{ url: OG_IMAGE_URL }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@softsuave',
    title: salesforceTelephoneMeta.socialTitle,
    description: salesforceTelephoneMeta.description,
    images: [OG_IMAGE_URL],
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath. */
const HOME_HREF = BASE_PATH || '/';

export default function SalesforceTelephoneCaseStudyPage() {
  return (
    <div className={home.page}>
      <JsonLd data={liveSiteOrganizationLd} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <CaseStudy
          content={salesforceTelephoneCaseStudy}
          idPrefix="case-study-salesforce-telephone-app-integration"
        />
      </main>

      <Footer />
    </div>
  );
}
