import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { homepageEnabled } from '@/lib/flags';
import { meta as indexMeta } from '@/lib/home/industries-content';
import type { SectorPageContent } from './types';

/**
 * Metadata and structured data for a sector page.
 *
 * Shared rather than written into all eight routes: they differ only by their
 * content object, and eight hand-copied metadata blocks would drift the first
 * time one of them was edited.
 */

export function sectorMetadata(content: SectorPageContent): Metadata {
  const { meta, slug } = content;
  return {
    // The root layout's title template is "%s", so this renders verbatim.
    title: meta.title,
    description: meta.description,
    alternates: { canonical: slug },
    robots: { index: true, follow: true },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(slug),
      siteName: 'Soft Suave',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

/**
 * A Service for the sector, carrying its solutions as an offer catalogue, plus
 * the trail back up through the index.
 *
 * The catalogue is built from the same array the page renders, so the schema
 * cannot advertise a solution the page does not show. Nothing here states a
 * figure: the only numbers on these pages come from `why.stats` and the case
 * studies, which have their own markup elsewhere.
 */
export function sectorJsonLd(content: SectorPageContent): Record<string, unknown>[] {
  const { name, slug, meta, solutions } = content;

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `AI solutions for ${name}`,
    serviceType: `AI development for ${name}`,
    description: meta.description,
    url: absoluteUrl(slug),
    provider: {
      '@type': 'Organization',
      name: 'Soft Suave',
      url: 'https://www.softsuave.com',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${name} AI solutions`,
      itemListElement: solutions.items.map((item, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: item.name,
          description: item.body,
        },
      })),
    },
  };

  // "/" is only a page this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect. The index is ours
  // either way, so the trail is never shorter than two items.
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: 'Industries', path: indexMeta.path },
    { name, path: slug },
  ];

  return [serviceLd, breadcrumbLd(trail) as Record<string, unknown>];
}
