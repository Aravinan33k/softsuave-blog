import { absoluteUrl } from './metadata';
import { organizationLd } from './organization';
import type { SiteInfo, PostFull } from '@/themes/_contract';

// JSON-LD structured data builders.
//
// The `Organization` and `WebSite` this file used to build from `SiteInfo` are
// gone. They carried no `@id`, so nothing could reference them and they read as
// a SECOND company alongside the canonical `organizationLd` that all 80-odd
// marketing pages point their `provider`/`publisher` at — the blog surface was
// the one surface never migrated to the shared graph in `page-graph.ts`.
// The blog routes now emit `MARKETING_SITE_GRAPH` like every other surface, so
// one identity is declared once per document and everything else links to it.

export function blogPostingLd(site: SiteInfo, post: PostFull) {
  const url = absoluteUrl(`/${post.slug}`);
  const author = post.authorProfile;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title.slice(0, 110),
    ...(post.excerpt ? { description: post.excerpt } : {}),
    ...(post.coverImageUrl ? { image: [absoluteUrl(post.coverImageUrl)] } : {}),
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    // dateModified helps Google understand freshness; fall back to publish date.
    ...(post.updatedAt || post.publishedAt ? { dateModified: post.updatedAt ?? post.publishedAt } : {}),
    author: {
      '@type': 'Person',
      name: post.authorName ?? site.title,
      ...(author?.title ? { jobTitle: author.title } : {}),
      ...(author?.socialLinks?.length ? { sameAs: author.socialLinks.map((s) => s.url) } : {}),
    },
    // By `@id`, not repeated inline: the full node is emitted once per document
    // by the surface's site graph, and an inline copy here was a third unnamed
    // Organization in the same graph.
    publisher: { '@id': organizationLd['@id'] },
    ...(post.categories[0] ? { articleSection: post.categories[0].name } : {}),
    ...(post.tags.length ? { keywords: post.tags.map((t) => t.name).join(', ') } : {}),
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
    ...(post.readingTimeMinutes ? { timeRequired: `PT${post.readingTimeMinutes}M` } : {}),
    inLanguage: 'en',
    isAccessibleForFree: true,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/**
 * FAQPage from a plain question/answer list.
 *
 * `faq-ld.ts` builds the same schema by walking a TipTap document — that one is
 * for CMS posts whose FAQ lives in the editor. This one is for pages whose FAQ is
 * code, e.g. the service landing pages. Google requires the answer to be visible
 * on the page, which is why those render every answer into the DOM (collapsed,
 * not absent).
 */
export function faqPageLd(items: readonly { readonly q: string; readonly a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/** A single named service offered by the organization, for a service page. */
export function serviceLd(args: {
  name: string;
  description: string;
  path: string;
  providerName: string;
  /** Sub-offerings listed on the page, e.g. the five capability areas. */
  offers?: readonly { readonly name: string; readonly body: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: args.name,
    description: args.description,
    url: absoluteUrl(args.path),
    serviceType: args.name,
    provider: { '@type': 'Organization', name: args.providerName, url: absoluteUrl('/') },
    ...(args.offers?.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: args.name,
            itemListElement: args.offers.map((o) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: o.name, description: o.body },
            })),
          },
        }
      : {}),
  };
}
