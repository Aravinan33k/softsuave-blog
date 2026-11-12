import type { Metadata } from 'next';
import { pageRobots } from '@/lib/flags';
import { sdesMeta, sdesPage } from '@/lib/home/software-spain-content';
import SoftwareLocationPage from '@/components/landing/software-location-page';

/**
 * Software Development Company Spain — softsuave.com's
 * /software-development-company-spain carried into the new theme, slug
 * unchanged, every word from `lib/home/software-spain-content.ts`, in the live
 * page's own section order. Built on the France page's structure: the layout
 * is `SoftwareLocationPage`, which every software location page shares.
 *
 * No JSON-LD and no Twitter tags: the live page publishes neither, so neither
 * is emitted, and the route is in PAGES_WITH_OWN_SITE_GRAPH so the marketing
 * layout adds no structured data either (the footer keeps its address
 * microdata, as live's does).
 *
 * A SERVER component so it can export `metadata`.
 */

export const revalidate = 300;

/**
 * Open Graph is deliberately NOT in `metadata`: whenever `openGraph` is set
 * and `twitter` is not, Next.js auto-fills `twitter:card/title/description/
 * image` from it (`postProcessMetadata` in next/dist/lib/metadata/
 * resolve-metadata.js — `twitter: null` does not stop it). The live page has
 * Open Graph tags and no Twitter tags at all, so its six `og:` tags are
 * rendered below instead, in the live order; React hoists them into <head>.
 */
export const metadata: Metadata = {
  // The live page's own title, verbatim (it ends with a space); the root
  // title template is "%s".
  title: sdesMeta.title,
  description: sdesMeta.description,
  // The live canonical, verbatim — the production URL, not this deployment's.
  alternates: { canonical: sdesMeta.canonical },
  robots: pageRobots,
};

export default function SoftwareDevelopmentCompanySpainPage() {
  return (
    <>
      <meta property="og:title" content={sdesMeta.ogTitle} />
      <meta property="og:site_name" content={sdesMeta.ogSiteName} />
      <meta property="og:url" content={sdesMeta.canonical} />
      <meta property="og:description" content={sdesMeta.ogDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={sdesMeta.ogImage} />
      <SoftwareLocationPage content={sdesPage} />
    </>
  );
}
