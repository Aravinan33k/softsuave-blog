import type { Metadata } from 'next';
import { pageRobots } from '@/lib/flags';
import { mamdMeta, mamdPage } from '@/lib/home/mobile-app-maryland-content';
import LocationAppPage from '@/components/landing/location-app-page';

/**
 * Mobile App Development Company Maryland — softsuave.com's
 * /mobile-app-development-company-maryland carried into the new theme, slug
 * unchanged, every word from `lib/home/mobile-app-maryland-content.ts`, in the
 * live page's own section order. Built on the Dubai page's structure: the
 * layout is `LocationAppPage`, which every location page shares — here in its
 * short form, without the process and FAQ bands the live page does not run.
 *
 * No JSON-LD: the live page publishes no structured data, so none is
 * emitted, and the route is in PAGES_WITH_OWN_SITE_GRAPH so the marketing
 * layout adds none either (the footer keeps its address microdata, as
 * live's does).
 *
 * A SERVER component so it can export `metadata`. Fonts, `.theme-four` and
 * Lenis come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

const OG_IMAGE = { url: mamdMeta.ogImage };

export const metadata: Metadata = {
  // The live page's own title, verbatim; the root title template is "%s".
  title: mamdMeta.title,
  description: mamdMeta.description,
  // The live canonical, verbatim — the production URL, not this deployment's.
  alternates: { canonical: mamdMeta.canonical },
  robots: pageRobots,
  openGraph: {
    title: mamdMeta.ogTitle,
    description: mamdMeta.ogDescription,
    url: mamdMeta.canonical,
    siteName: mamdMeta.ogSiteName,
    // Live serves "Website"; Next.js only emits the protocol's lowercase value.
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: mamdMeta.twitterSite,
    title: mamdMeta.ogTitle,
    description: mamdMeta.ogDescription,
    images: [OG_IMAGE.url],
  },
};

export default function MobileAppDevelopmentCompanyMarylandPage() {
  return <LocationAppPage content={mamdPage} />;
}
