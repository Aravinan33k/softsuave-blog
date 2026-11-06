import 'server-only';

import { anthropicFaqs, anthropicMeta, anthropicServices } from '@/lib/home/anthropic-content';

/**
 * Service, WebPage and FAQPage JSON-LD for `/hire-anthropic-developers`, the
 * same four-block shape as `/vuejs-development-company` (see
 * `vuejs-development-company.ts`). With the Organization
 * (`softSuaveOrganizationLd`, emitted by the page) these are the page's entire
 * structured data — the route is in `PAGES_WITH_OWN_SITE_GRAPH`, so the layout
 * adds no WebSite or second Organization.
 *
 * The offer catalog and the FAQ are read from the page's own copy, so the
 * schema cannot drift from what the page shows.
 *
 * URLs are absolute and production-canonical, like `ai-page-schema.ts`. The OG
 * image path serves `public/assets/images/hire-anthropic-developers-og.webp`
 * (a PLACEHOLDER copy of the Vue page's until real artwork replaces it).
 */

const PAGE_URL = `https://www.softsuave.com${anthropicMeta.path}`;
const OG_IMAGE = 'https://www.softsuave.com/assets/images/hire-anthropic-developers-og.webp';

export const anthropicServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${PAGE_URL}#service`,
  name: 'Anthropic Development Services',
  serviceType: 'Claude-Powered AI Application Development',
  description:
    'Anthropic development services covering custom Claude applications, Claude API integration, AI agents and MCP servers, RAG and document intelligence, enterprise assistants and workflow automation, and ongoing support, evaluation and optimization.',
  url: PAGE_URL,
  image: OG_IMAGE,
  provider: { '@id': 'https://www.softsuave.com/#organization' },
  areaServed: 'Worldwide',
  audience: {
    '@type': 'BusinessAudience',
    name: 'Startups, SMBs, product teams, engineering leaders, and enterprises building AI applications with Claude',
  },
  mainEntityOfPage: { '@id': `${PAGE_URL}#webpage` },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Anthropic Development Services',
    itemListElement: anthropicServices.items.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name, description: s.body },
    })),
  },
};

export const anthropicWebPageLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: `${anthropicMeta.title} | Soft Suave`,
  description: anthropicMeta.description,
  inLanguage: 'en',
  dateModified: '2026-09-30',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    '@id': `${PAGE_URL}#primaryimage`,
    url: OG_IMAGE,
    contentUrl: OG_IMAGE,
    caption: 'Anthropic Developer Services for Claude-Powered Applications',
  },
  mainEntity: { '@id': `${PAGE_URL}#service` },
  about: { '@id': `${PAGE_URL}#service` },
  publisher: { '@id': 'https://www.softsuave.com/#organization' },
};

export const anthropicFaqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${PAGE_URL}#faq`,
  url: PAGE_URL,
  name: anthropicFaqs.title,
  isPartOf: { '@id': `${PAGE_URL}#webpage` },
  about: { '@id': `${PAGE_URL}#service` },
  mainEntity: anthropicFaqs.items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: typeof f.a === 'string' ? f.a : f.a.join(' ') },
  })),
};
