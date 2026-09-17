import 'server-only';
import { absoluteUrl, dynamicOgImage } from './metadata';
import { organizationLd } from './organization';
import { txFaqs, txMeta, txServices } from '@/lib/home/typescript-content';

/**
 * Service, WebPage and FAQPage JSON-LD for `/typescript-development-company`,
 * built from the same content the page renders (`txServices`, `txFaqs`) so the
 * structured data can never drift from what a visitor actually sees.
 *
 * Same pattern as `nextjs-development-company.ts`: these reference
 * `organizationLd`'s `@id` for `provider`/`publisher` rather than repeating
 * that object, which is why the route also emits `organizationLd` itself
 * alongside these three.
 *
 * The page has no bundled Open Graph image of its own, so `dynamicOgImage`
 * generates one from the title through the existing `/og` route — the same
 * fallback `buildMetadata` uses for every post and page without a custom
 * image, applied here to the schema's own image fields.
 */

const pageUrl = absoluteUrl(txMeta.path);
const ogImage = dynamicOgImage(txMeta.title, 'Soft Suave');

export const txServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${pageUrl}#service`,
  name: 'TypeScript Development Services',
  serviceType: 'TypeScript Application Development',
  description:
    'TypeScript development services covering custom applications, JavaScript-to-TypeScript migration, typed frontend development, Node.js backend development, API contract integration, maintenance, and codebase improvement.',
  url: pageUrl,
  image: ogImage,
  provider: { '@id': organizationLd['@id'] },
  areaServed: 'Worldwide',
  audience: {
    '@type': 'BusinessAudience',
    name: 'Startups, SMBs, product teams, engineering leaders, and enterprises building or modernizing TypeScript applications',
  },
  mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'TypeScript Development Services',
    itemListElement: txServices.items.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.name,
        description: item.body,
      },
    })),
  },
} as const;

export const txWebPageLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${pageUrl}#webpage`,
  url: pageUrl,
  name: `${txMeta.title} | Soft Suave`,
  description: txMeta.description,
  inLanguage: 'en',
  // Bump this when the page's own copy changes; today's date at authoring.
  dateModified: '2026-09-16',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    '@id': `${pageUrl}#primaryimage`,
    url: ogImage,
    contentUrl: ogImage,
    caption: 'TypeScript Development Company for Business-Critical Applications',
  },
  mainEntity: { '@id': `${pageUrl}#service` },
  about: { '@id': `${pageUrl}#service` },
  publisher: { '@id': organizationLd['@id'] },
} as const;

export const txFaqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${pageUrl}#faq`,
  url: pageUrl,
  name: txFaqs.title,
  isPartOf: { '@id': `${pageUrl}#webpage` },
  about: { '@id': `${pageUrl}#service` },
  mainEntity: txFaqs.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: typeof item.a === 'string' ? item.a : item.a.join(' '),
    },
  })),
} as const;
