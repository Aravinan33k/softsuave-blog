import type { Metadata } from 'next';
import { pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { sddePageGraphLd, sddeServiceLd } from '@/lib/seo/software-development-company-germany';
import { sddeMeta, sddePage } from '@/lib/home/software-germany-content';
import SoftwareLocationPage from '@/components/landing/software-location-page';

/**
 * Software Development Company Germany — softsuave.com's
 * /software-development-company-germany carried into the new theme, slug
 * unchanged, every word from `lib/home/software-germany-content.ts`, in the
 * live page's own section order. Built on the France page's structure: the
 * layout is `SoftwareLocationPage`, which every software location page shares.
 *
 * A SERVER component so it can export `metadata` and emit JSON-LD.
 */

export const revalidate = 300;

const OG_IMAGE = { url: sddeMeta.ogImage };

export const metadata: Metadata = {
  // The live page's own title, verbatim; the root title template is "%s".
  title: sddeMeta.title,
  description: sddeMeta.description,
  // The live canonical, verbatim — the production URL, not this deployment's.
  alternates: { canonical: sddeMeta.canonical },
  robots: pageRobots,
  openGraph: {
    title: sddeMeta.ogTitle,
    description: sddeMeta.ogDescription,
    url: sddeMeta.canonical,
    siteName: sddeMeta.ogSiteName,
    // Live serves "Website"; Next.js only emits the protocol's lowercase value.
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: sddeMeta.twitterSite,
    title: sddeMeta.ogTitle,
    description: sddeMeta.ogDescription,
    images: [OG_IMAGE.url],
  },
};

export default function SoftwareDevelopmentCompanyGermanyPage() {
  return (
    <>
      {/* softsuave.com's own schema for this page, both blocks — see
          lib/seo/software-development-company-germany.ts. The route is in
          PAGES_WITH_OWN_SITE_GRAPH, so the layout adds nothing beside them. */}
      <JsonLd data={sddePageGraphLd} />
      <JsonLd data={sddeServiceLd} />
      <SoftwareLocationPage content={sddePage} />
    </>
  );
}
