import type { Metadata } from 'next';
import { pageRobots } from '@/lib/flags';
import { maitMeta, maitPage } from '@/lib/home/mobile-app-italy-content';
import LocationAppPage from '@/components/landing/location-app-page';

/**
 * Mobile App Development Company Italy — softsuave.com's
 * /mobile-app-development-company-italy carried into the new theme, slug
 * unchanged, every word from `lib/home/mobile-app-italy-content.ts`, in the
 * live page's own section order. Built on the Dubai page's structure: the
 * layout is `LocationAppPage`, which every location page shares.
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

const OG_IMAGE = { url: maitMeta.ogImage };

export const metadata: Metadata = {
  // The live page's own title, verbatim (it opens with a space); the root
  // title template is "%s".
  title: maitMeta.title,
  description: maitMeta.description,
  // The live canonical, verbatim — the production URL, not this deployment's.
  alternates: { canonical: maitMeta.canonical },
  robots: pageRobots,
  openGraph: {
    title: maitMeta.ogTitle,
    description: maitMeta.ogDescription,
    url: maitMeta.canonical,
    siteName: maitMeta.ogSiteName,
    // Live serves "Website"; Next.js only emits the protocol's lowercase value.
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: maitMeta.twitterSite,
    title: maitMeta.ogTitle,
    description: maitMeta.ogDescription,
    images: [OG_IMAGE.url],
  },
};

export default function MobileAppDevelopmentCompanyItalyPage() {
  return <LocationAppPage content={maitPage} />;
}
