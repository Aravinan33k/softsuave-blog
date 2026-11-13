import type { Metadata } from 'next';
import { pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { madubaiFaqLd } from '@/lib/seo/mobile-app-development-company-dubai';
import { madubaiMeta, madubaiPage } from '@/lib/home/mobile-app-dubai-content';
import LocationAppPage from '@/components/landing/location-app-page';

/**
 * Mobile App Development Company Dubai — softsuave.com's
 * /mobile-app-development-company-dubai carried into the new theme, slug
 * unchanged, every word from `lib/home/mobile-app-dubai-content.ts`, in the
 * live page's own section order.
 *
 * A SERVER component so it can export `metadata` and emit JSON-LD; the layout
 * is `LocationAppPage`, which every location page shares. Fonts,
 * `.theme-four` and Lenis come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

const OG_IMAGE = { url: madubaiMeta.ogImage };

export const metadata: Metadata = {
  // The live page's own title, verbatim; the root title template is "%s".
  title: madubaiMeta.title,
  description: madubaiMeta.description,
  // The live canonical, verbatim — the production URL, not this deployment's.
  alternates: { canonical: madubaiMeta.canonical },
  robots: pageRobots,
  openGraph: {
    title: madubaiMeta.ogTitle,
    description: madubaiMeta.ogDescription,
    url: madubaiMeta.canonical,
    siteName: madubaiMeta.ogSiteName,
    // Live serves "Website"; Next.js only emits the protocol's lowercase value.
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: madubaiMeta.twitterSite,
    title: madubaiMeta.ogTitle,
    description: madubaiMeta.ogDescription,
    images: [OG_IMAGE.url],
  },
};

export default function MobileAppDevelopmentCompanyDubaiPage() {
  return (
    <>
      {/* softsuave.com's own schema for this page, verbatim — its lone
          FAQPage. The route is in PAGES_WITH_OWN_SITE_GRAPH, so the layout
          adds nothing beside it. */}
      <JsonLd data={madubaiFaqLd} />
      <LocationAppPage content={madubaiPage} />
    </>
  );
}
