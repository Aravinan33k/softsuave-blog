import 'server-only';
import { homepageEnabled } from '../flags';
import { breadcrumbLd } from './jsonld';
import { absoluteUrl } from './metadata';
import { organizationLd } from './organization';
import { marketingWebSiteLd } from './page-graph';
import type { PostSummary } from '@/themes/_contract';

/**
 * The blog surface's listing pages — `/blog`, `/category/<slug>`, `/tag/<slug>`
 * — as an `@id`-linked graph, the counterpart to `page-graph.ts` for the
 * marketing surface.
 *
 * Before this, `/blog` emitted a single `Organization` and nothing else, and
 * the category and tag archives emitted no structured data at all: three page
 * types whose entire job is to list posts, saying nothing about the posts they
 * list. The nodes here reference `organizationLd` and `marketingWebSiteLd` by
 * `@id` rather than restating them, which is what makes these archives part of
 * the same graph as every marketing page instead of a second description of the
 * same site.
 *
 * `/blog` is a `Blog`; the filtered archives are `CollectionPage`. Both carry
 * the listing as an `ItemList` of `BlogPosting` references, so a consumer can
 * follow an archive to its posts without fetching each one.
 */

/** Where an archive sits in the trail, and what it is called there. */
export interface ArchiveCrumb {
  readonly name: string;
  readonly path: string;
}

export interface BlogArchiveInput {
  /** App-internal route with leading slash, e.g. `/category/engineering`. */
  readonly path: string;
  /** The archive's heading — the site title for `/blog`, else the term name. */
  readonly name: string;
  readonly description?: string | null;
  /** The posts this page lists, in the order it lists them. */
  readonly posts: readonly PostSummary[];
  /** Total across all pages, where the archive paginates. */
  readonly total?: number;
  /**
   * `Blog` for the main archive, `CollectionPage` for a filtered one. A
   * category listing is not the blog itself, and typing it `Blog` would claim
   * there are as many blogs as there are taxonomy terms.
   */
  readonly type: 'Blog' | 'CollectionPage';
  /**
   * Crumbs between the trail root and this page. `/blog` passes none; a
   * category or tag archive passes the archive it filters.
   */
  readonly parents?: readonly ArchiveCrumb[];
}

/**
 * The archive node plus its breadcrumb, ready to spread into a page's `ld`
 * array alongside `MARKETING_SITE_GRAPH`.
 *
 * The breadcrumb is dropped when the trail would be a single item — while the
 * marketing homepage is behind its flag "/" is a 307, and a trail must not
 * point a crawler at a redirect. Same gate the post route and every marketing
 * page apply.
 */
export function blogArchiveLd(input: BlogArchiveInput): object[] {
  const url = absoluteUrl(input.path);
  const archiveId = `${url}#${input.type === 'Blog' ? 'blog' : 'collection'}`;

  const archive: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': input.type,
    '@id': archiveId,
    url,
    name: input.name,
    ...(input.description ? { description: input.description } : {}),
    inLanguage: 'en',
    isPartOf: { '@id': marketingWebSiteLd['@id'] },
    publisher: { '@id': organizationLd['@id'] },
  };

  // An empty archive gets no ItemList rather than an ItemList of nothing: a
  // term with no published posts is a real state here, and an empty list is a
  // rich-result warning for the same reason an empty FAQPage is.
  if (input.posts.length) {
    archive.mainEntity = {
      '@type': 'ItemList',
      ...(input.total ? { numberOfItems: input.total } : { numberOfItems: input.posts.length }),
      itemListElement: input.posts.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absoluteUrl(`/${post.slug}`),
        item: {
          '@type': 'BlogPosting',
          '@id': `${absoluteUrl(`/${post.slug}`)}#blogposting`,
          headline: post.title.slice(0, 110),
          url: absoluteUrl(`/${post.slug}`),
          ...(post.excerpt ? { description: post.excerpt } : {}),
          ...(post.coverImageUrl ? { image: [absoluteUrl(post.coverImageUrl)] } : {}),
          ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
          ...(post.authorName ? { author: { '@type': 'Person', name: post.authorName } } : {}),
          publisher: { '@id': organizationLd['@id'] },
        },
      })),
    };
  }

  const trail: ArchiveCrumb[] = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    ...(input.parents ?? []),
    { name: input.name, path: input.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return [archive, ...(breadcrumb ? [breadcrumb] : [])];
}
