import 'server-only';
import { absoluteUrl, dynamicOgImage } from './metadata';
import { organizationLd } from './organization';
import { nxFaqs, nxMeta, nxServices } from '@/lib/home/nextjs-content';

/**
 * Service, WebPage and FAQPage JSON-LD for `/nextjs-development-company`,
 * built from the same content the page renders (`nxServices`, `nxFaqs`) so the
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

const pageUrl = absoluteUrl(nxMeta.path);
const ogImage = dynamicOgImage(nxMeta.title, 'Soft Suave');

export const nxServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${pageUrl}#service`,
  name: 'Next.js Development Services',
  serviceType: 'Next.js Web Application Development',
  description:
    'Next.js development services covering custom applications, server-rendered websites, ecommerce platforms, SaaS portals, dashboards, React-to-Next.js migration, performance optimization, maintenance, and ongoing support.',
  url: pageUrl,
  image: ogImage,
  provider: { '@id': organizationLd['@id'] },
  areaServed: 'Worldwide',
  audience: {
    '@type': 'BusinessAudience',
    name: 'Startups, SMBs, product teams, engineering leaders, and enterprises building or modernizing Next.js web applications',
  },
  mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Next.js Development Services',
    itemListElement: nxServices.items.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.name,
        description: item.body,
      },
    })),
  },
} as const;

export const nxWebPageLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${pageUrl}#webpage`,
  url: pageUrl,
  name: `${nxMeta.title} | Soft Suave`,
  description: nxMeta.description,
  inLanguage: 'en',
  // Bump this when the page's own copy changes; today's date at authoring.
  dateModified: '2026-09-16',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    '@id': `${pageUrl}#primaryimage`,
    url: ogImage,
    contentUrl: ogImage,
    caption: 'Next.js Development Company for Flexible Web Platforms',
  },
  mainEntity: { '@id': `${pageUrl}#service` },
  about: { '@id': `${pageUrl}#service` },
  publisher: { '@id': organizationLd['@id'] },
} as const;

export const nxFaqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${pageUrl}#faq`,
  url: pageUrl,
  name: nxFaqs.title,
  isPartOf: { '@id': `${pageUrl}#webpage` },
  about: { '@id': `${pageUrl}#service` },
  mainEntity: nxFaqs.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: typeof item.a === 'string' ? item.a : item.a.join(' '),
    },
  })),
} as const;
