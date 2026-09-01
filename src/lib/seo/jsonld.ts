import { absoluteUrl } from './metadata';
import type { SiteInfo, PostFull } from '@/themes/_contract';

// JSON-LD structured data builders.

export function organizationLd(site: SiteInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.title,
    url: absoluteUrl('/'),
    ...(site.logoUrl ? { logo: absoluteUrl(site.logoUrl) } : {}),
    ...(site.socialLinks.length ? { sameAs: site.socialLinks.map((s) => s.url) } : {}),
  };
}

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
    publisher: {
      '@type': 'Organization',
      name: site.title,
      url: absoluteUrl('/'),
      ...(site.logoUrl ? { logo: { '@type': 'ImageObject', url: absoluteUrl(site.logoUrl) } } : {}),
    },
    ...(post.categories[0] ? { articleSection: post.categories[0].name } : {}),
    ...(post.tags.length ? { keywords: post.tags.map((t) => t.name).join(', ') } : {}),
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
    ...(post.readingTimeMinutes ? { timeRequired: `PT${post.readingTimeMinutes}M` } : {}),
    inLanguage: 'en',
    isAccessibleForFree: true,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export function websiteLd(site: SiteInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.title,
    url: absoluteUrl('/'),
    ...(site.description ? { description: site.description } : {}),
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
