import type { Metadata } from 'next';
import { pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { mazaFaqLd } from '@/lib/seo/mobile-app-development-company-south-africa';
import { mazaMeta, mazaPage } from '@/lib/home/mobile-app-south-africa-content';
import LocationAppPage from '@/components/landing/location-app-page';

/**
 * Mobile App Development Company South Africa — softsuave.com's
 * /mobile-app-development-company-south-africa carried into the new theme,
 * slug unchanged, every word from `lib/home/mobile-app-south-africa-content.ts`,
 * in the live page's own section order. Built on the Dubai page's structure:
 * the layout is `LocationAppPage`, which every location page shares.
 *
 * A SERVER component so it can export `metadata` and emit JSON-LD. Fonts,
 * `.theme-four` and Lenis come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

const OG_IMAGE = { url: mazaMeta.ogImage };

export const metadata: Metadata = {
  // The live page's own title, verbatim (a space at each end); the root
  // title template is "%s".
  title: mazaMeta.title,
  description: mazaMeta.description,
  // The live canonical, verbatim — the production URL, not this deployment's.
  alternates: { canonical: mazaMeta.canonical },
  robots: pageRobots,
  openGraph: {
    title: mazaMeta.ogTitle,
    description: mazaMeta.ogDescription,
    url: mazaMeta.canonical,
    siteName: mazaMeta.ogSiteName,
    // Live serves "Website"; Next.js only emits the protocol's lowercase value.
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: mazaMeta.twitterSite,
    title: mazaMeta.ogTitle,
    description: mazaMeta.ogDescription,
    images: [OG_IMAGE.url],
  },
};

export default function MobileAppDevelopmentCompanySouthAfricaPage() {
  return (
    <>
      {/* softsuave.com's own schema for this page, verbatim — its lone
          FAQPage. The route is in PAGES_WITH_OWN_SITE_GRAPH, so the layout
          adds nothing beside it. */}
      <JsonLd data={mazaFaqLd} />
      <LocationAppPage content={mazaPage} />
    </>
  );
}
