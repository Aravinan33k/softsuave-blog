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
