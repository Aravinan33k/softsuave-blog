import type { Metadata } from 'next';
import { pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { sdfrPageGraphLd, sdfrServiceLd } from '@/lib/seo/software-development-company-france';
import { sdfrMeta, sdfrPage } from '@/lib/home/software-france-content';
import SoftwareLocationPage from '@/components/landing/software-location-page';

/**
 * Software Development Company France — softsuave.com's
 * /software-development-company-france carried into the new theme, slug
 * unchanged, every word from `lib/home/software-france-content.ts`, in the
 * live page's own section order. The layout is `SoftwareLocationPage`, which
 * every software location page shares.
 *
 * A SERVER component so it can export `metadata` and emit JSON-LD.
 */

export const revalidate = 300;

const OG_IMAGE = { url: sdfrMeta.ogImage };

export const metadata: Metadata = {
  // The live page's own title, verbatim (it ends with a space); the root
  // title template is "%s".
  title: sdfrMeta.title,
  description: sdfrMeta.description,
  // The live canonical, verbatim — the production URL, not this deployment's.
  alternates: { canonical: sdfrMeta.canonical },
  robots: pageRobots,
  openGraph: {
    title: sdfrMeta.ogTitle,
    description: sdfrMeta.ogDescription,
    url: sdfrMeta.canonical,
    siteName: sdfrMeta.ogSiteName,
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: sdfrMeta.twitterSite,
    title: sdfrMeta.twitterTitle,
    description: sdfrMeta.twitterDescription,
    images: [OG_IMAGE.url],
  },
};

export default function SoftwareDevelopmentCompanyFrancePage() {
  return (
    <>
      {/* softsuave.com's own schema for this page, both blocks — see
          lib/seo/software-development-company-france.ts. The route is in
          PAGES_WITH_OWN_SITE_GRAPH, so the layout adds nothing beside them. */}
      <JsonLd data={sdfrPageGraphLd} />
      <JsonLd data={sdfrServiceLd} />
      <SoftwareLocationPage content={sdfrPage} />
    </>
  );
}
