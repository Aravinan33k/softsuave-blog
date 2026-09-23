import 'server-only';
import { absoluteUrl, dynamicOgImage } from './metadata';
import { organizationLd } from './organization';
import { vueFaqs, vueMeta, vueServices } from '@/lib/home/vuejs-content';

/**
 * Service, WebPage and FAQPage JSON-LD for `/vuejs-development-company`,
 * built from the same content the page renders (`vueServices`, `vueFaqs`) so the
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

const pageUrl = absoluteUrl(vueMeta.path);
const ogImage = dynamicOgImage(vueMeta.title, 'Soft Suave');

export const vueServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${pageUrl}#service`,
  name: 'Vue.js Development Services',
  serviceType: 'Vue.js Web Application Development',
  description:
    'Vue.js development services covering custom web applications, single-page applications, ecommerce frontends, enterprise portals, dashboards, frontend modernization, system integration, support, and maintenance.',
  url: pageUrl,
  image: ogImage,
  provider: { '@id': organizationLd['@id'] },
  areaServed: 'Worldwide',
  audience: {
    '@type': 'BusinessAudience',
    name: 'Startups, SMBs, product teams, engineering leaders, and enterprises building or modernizing web applications',
  },
  mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Vue.js Development Services',
    itemListElement: vueServices.items.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.name,
        description: item.body,
      },
    })),
  },
} as const;

export const vueWebPageLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${pageUrl}#webpage`,
  url: pageUrl,
  name: `${vueMeta.title} | Soft Suave`,
  description: vueMeta.description,
  inLanguage: 'en',
  // The content doc's own dateModified; bump when the page's copy changes.
  dateModified: '2026-09-15',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    '@id': `${pageUrl}#primaryimage`,
    url: ogImage,
    contentUrl: ogImage,
    caption: 'Vue.js Development Company for Modern Web Applications',
  },
  mainEntity: { '@id': `${pageUrl}#service` },
  about: { '@id': `${pageUrl}#service` },
  publisher: { '@id': organizationLd['@id'] },
} as const;

export const vueFaqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${pageUrl}#faq`,
  url: pageUrl,
  name: vueFaqs.title,
  inLanguage: 'en',
  isPartOf: { '@id': `${pageUrl}#webpage` },
  about: { '@id': `${pageUrl}#service` },
  mainEntity: vueFaqs.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: typeof item.a === 'string' ? item.a : item.a.join(' '),
    },
  })),
} as const;
