import type { Metadata } from 'next';
import { pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { madeFaqLd } from '@/lib/seo/mobile-app-development-company-germany';
import { madeMeta, madePage } from '@/lib/home/mobile-app-germany-content';
import LocationAppPage from '@/components/landing/location-app-page';

/**
 * Mobile App Development Company Germany — softsuave.com's
 * /mobile-app-development-company-germany carried into the new theme, slug
 * unchanged, every word from `lib/home/mobile-app-germany-content.ts`, in the
 * live page's own section order. Built on the Dubai page's structure: the
 * layout is `LocationAppPage`, which every location page shares.
 *
 * A SERVER component so it can export `metadata` and emit JSON-LD. Fonts,
 * `.theme-four` and Lenis come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

const OG_IMAGE = { url: madeMeta.ogImage };

export const metadata: Metadata = {
  // The live page's own title, verbatim; the root title template is "%s".
  title: madeMeta.title,
  description: madeMeta.description,
  // The live canonical, verbatim — the production URL, not this deployment's.
  alternates: { canonical: madeMeta.canonical },
  robots: pageRobots,
  openGraph: {
    title: madeMeta.ogTitle,
    description: madeMeta.ogDescription,
    url: madeMeta.canonical,
    siteName: madeMeta.ogSiteName,
    // Live serves "Website"; Next.js only emits the protocol's lowercase value.
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: madeMeta.twitterSite,
    title: madeMeta.ogTitle,
    description: madeMeta.ogDescription,
    images: [OG_IMAGE.url],
  },
};

export default function MobileAppDevelopmentCompanyGermanyPage() {
  return (
    <>
      {/* softsuave.com's own schema for this page, verbatim — its lone
          FAQPage. The route is in PAGES_WITH_OWN_SITE_GRAPH, so the layout
          adds nothing beside it. */}
      <JsonLd data={madeFaqLd} />
      <LocationAppPage content={madePage} />
    </>
  );
}
