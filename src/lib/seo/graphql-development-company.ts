import 'server-only';
import { absoluteUrl, dynamicOgImage } from './metadata';
import { organizationLd } from './organization';
import { gqFaqs, gqMeta, gqServices } from '@/lib/home/graphql-content';

/**
 * Service, WebPage and FAQPage JSON-LD for `/graphql-development-company`,
 * built from the same content the page renders (`gqServices`, `gqFaqs`) so the
 * structured data can never drift from what a visitor actually sees.
 *
 * These reference `organizationLd`'s `@id` for `provider`/`publisher` rather
 * than repeating that object. The node itself is emitted once for the whole
 * surface by `app/(marketing)/layout.tsx`, so the reference resolves without
 * this route carrying its own copy — one Organization node per document, every
 * schema pointing at it, which is how a linked JSON-LD graph is meant to work.
 *
 * The page has no bundled Open Graph image of its own, so `dynamicOgImage`
 * generates one from the title through the existing `/og` route — the same
 * fallback `buildMetadata` uses for every post and page without a custom
 * image, applied here to the schema's own image fields.
 */

const pageUrl = absoluteUrl(gqMeta.path);
const ogImage = dynamicOgImage(gqMeta.title, 'Soft Suave');

export const gqServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${pageUrl}#service`,
  name: 'GraphQL Development Services',
  serviceType: 'GraphQL API Development',
  description:
    'GraphQL development services for designing schemas, queries, mutations, resolvers, authentication, and integrations that provide structured access to connected databases, services, APIs, and business systems.',
  url: pageUrl,
  image: ogImage,
  provider: { '@id': organizationLd['@id'] },
  areaServed: 'Worldwide',
  audience: {
    '@type': 'BusinessAudience',
    name: 'Startups, enterprises, product teams, and engineering teams',
  },
  mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'GraphQL Development Services',
    itemListElement: gqServices.items.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.name,
        description: item.body,
      },
    })),
  },
} as const;

export const gqWebPageLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${pageUrl}#webpage`,
  url: pageUrl,
  name: `${gqMeta.title} | Soft Suave`,
  description: gqMeta.description,
  inLanguage: 'en',
  // Bump this when the page's own copy changes; today's date at authoring.
  dateModified: '2026-09-16',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    '@id': `${pageUrl}#primaryimage`,
    url: ogImage,
    contentUrl: ogImage,
    caption: 'GraphQL Development Company for Modern APIs',
  },
  mainEntity: { '@id': `${pageUrl}#service` },
  about: { '@id': `${pageUrl}#service` },
  publisher: { '@id': organizationLd['@id'] },
} as const;

export const gqFaqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${pageUrl}#faq`,
  url: pageUrl,
  name: gqFaqs.title,
  inLanguage: 'en',
  isPartOf: { '@id': `${pageUrl}#webpage` },
  about: { '@id': `${pageUrl}#service` },
  mainEntity: gqFaqs.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: typeof item.a === 'string' ? item.a : item.a.join(' '),
    },
  })),
} as const;
