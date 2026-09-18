import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
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
export function sectorJsonLd(content: SectorPageContent): object[] {
  const { name, slug, meta, solutions } = content;

  /*
   * Through the shared builder, so a sector page carries the same `@id`-linked
   * Service + WebPage the rest of the surface does. What was here before was a
   * `Service` with no `@id`, no `WebPage` to belong to, and an inline
   * `{'@type': 'Organization', name: 'Soft Suave'}` as provider — one more
   * unidentified company in the graph rather than the canonical one.
   *
   * `position` on each Offer is dropped: an OfferCatalog's `itemListElement` is
   * unordered, and these solutions carry no rank the page states.
   *
   * The index crumb survives the homepage gate — "/" is only served once the
   * marketing homepage ships, but `/industries` is ours either way, so this
   * trail is never shorter than two items.
   */
  return pageSchemaGraph({
    path: slug,
    title: meta.title,
    description: meta.description,
    serviceName: `AI solutions for ${name}`,
    serviceType: `AI development for ${name}`,
    breadcrumbName: name,
    caption: `AI solutions for ${name}`,
    audience: `Organisations in ${name} adopting AI`,
    parents: [{ name: 'Industries', path: indexMeta.path }],
    offerCatalogName: `${name} AI solutions`,
    offers: solutions.items.map((item) => ({ name: item.name, description: item.body })),
  });
}
