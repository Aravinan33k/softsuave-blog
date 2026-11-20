import type { Metadata } from 'next';
import { pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { masaFaqLd } from '@/lib/seo/mobile-app-development-company-saudi-arabia';
import { masaMeta, masaPage } from '@/lib/home/mobile-app-saudi-arabia-content';
import LocationAppPage from '@/components/landing/location-app-page';

/**
 * Mobile App Development Company Saudi Arabia — softsuave.com's
 * /mobile-app-development-company-saudi-arabia carried into the new theme,
 * slug unchanged, every word from `lib/home/mobile-app-saudi-arabia-content.ts`,
 * in the live page's own section order. Built on the Dubai page's structure:
 * the layout is `LocationAppPage`, which every location page shares.
 *
 * A SERVER component so it can export `metadata` and emit JSON-LD. Fonts,
 * `.theme-four` and Lenis come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

const OG_IMAGE = { url: masaMeta.ogImage };

export const metadata: Metadata = {
  // The live page's own title, verbatim (it ends with a space); the root
  // title template is "%s".
  title: masaMeta.title,
  description: masaMeta.description,
  // The live canonical, verbatim — the production URL, not this deployment's.
  alternates: { canonical: masaMeta.canonical },
  robots: pageRobots,
  openGraph: {
    title: masaMeta.ogTitle,
    description: masaMeta.ogDescription,
    url: masaMeta.canonical,
    siteName: masaMeta.ogSiteName,
    // Live serves "Website"; Next.js only emits the protocol's lowercase value.
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: masaMeta.twitterSite,
    title: masaMeta.ogTitle,
    description: masaMeta.ogDescription,
    images: [OG_IMAGE.url],
  },
};

export default function MobileAppDevelopmentCompanySaudiArabiaPage() {
  return (
    <>
      {/* softsuave.com's own schema for this page, verbatim — its lone
          FAQPage. The route is in PAGES_WITH_OWN_SITE_GRAPH, so the layout
          adds nothing beside it. */}
      <JsonLd data={masaFaqLd} />
      <LocationAppPage content={masaPage} />
    </>
  );
}
