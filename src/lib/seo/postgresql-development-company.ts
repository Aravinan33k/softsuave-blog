import 'server-only';
import { absoluteUrl, dynamicOgImage } from './metadata';
import { organizationLd } from './organization';
import { pgFaqs, pgMeta, pgServices } from '@/lib/home/postgresql-content';

/**
 * Service, WebPage and FAQPage JSON-LD for `/postgresql-development-company`,
 * built from the same content the page renders (`pgServices`, `pgFaqs`) so the
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

const pageUrl = absoluteUrl(pgMeta.path);
const ogImage = dynamicOgImage(pgMeta.title, 'Soft Suave');

export const pgServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${pageUrl}#service`,
  name: 'PostgreSQL Development Services',
  serviceType: 'PostgreSQL Database Development',
  description:
    'PostgreSQL development services for database architecture, schema design, migrations, performance reviews, application integrations, and ongoing support aligned with business and application requirements.',
  url: pageUrl,
  image: ogImage,
  provider: { '@id': organizationLd['@id'] },
  areaServed: 'Worldwide',
  audience: {
    '@type': 'BusinessAudience',
    name: 'Startups, enterprises, product teams, application teams, and data engineering teams',
  },
  mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'PostgreSQL Development Services',
    itemListElement: pgServices.items.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.name,
        description: item.body,
      },
    })),
  },
} as const;

export const pgWebPageLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${pageUrl}#webpage`,
  url: pageUrl,
  // The doc's title carries no suffix — see postgresql-content.ts.
  name: pgMeta.title,
  description: pgMeta.description,
  inLanguage: 'en',
  // The content doc's own dateModified; bump when the page's copy changes.
  dateModified: '2026-09-15',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    '@id': `${pageUrl}#primaryimage`,
    url: ogImage,
    contentUrl: ogImage,
    caption: 'PostgreSQL Development Company for Reliable Databases',
  },
  mainEntity: { '@id': `${pageUrl}#service` },
  about: { '@id': `${pageUrl}#service` },
  publisher: { '@id': organizationLd['@id'] },
} as const;

export const pgFaqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${pageUrl}#faq`,
  url: pageUrl,
  name: pgFaqs.title,
  inLanguage: 'en',
  isPartOf: { '@id': `${pageUrl}#webpage` },
  about: { '@id': `${pageUrl}#service` },
  mainEntity: pgFaqs.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: typeof item.a === 'string' ? item.a : item.a.join(' '),
    },
  })),
} as const;
