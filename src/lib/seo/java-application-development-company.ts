import 'server-only';
import { absoluteUrl, dynamicOgImage } from './metadata';
import { organizationLd } from './organization';
import { javaFaqs, javaMeta, javaServices } from '@/lib/home/java-content';

/**
 * Service, WebPage and FAQPage JSON-LD for
 * `/java-application-development-company`, built from the same content the
 * page renders (`javaServices`, `javaFaqs`) so the structured data can never
 * drift from what a visitor actually sees.
 *
 * Same pattern as `typescript-development-company.ts` and
 * `nextjs-development-company.ts`: these reference `organizationLd`'s `@id`
 * for `provider`/`publisher` rather than repeating that object, which is why
 * the route also emits `organizationLd` itself alongside these three.
 *
 * The page has no bundled Open Graph image of its own, so `dynamicOgImage`
 * generates one from the title through the existing `/og` route.
 */

const pageUrl = absoluteUrl(javaMeta.path);
const ogImage = dynamicOgImage(javaMeta.title, 'Soft Suave');

export const javaServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${pageUrl}#service`,
  name: 'Java Application Development Services',
  serviceType: 'Java Application Development',
  description:
    'Java development services covering cloud-native development, Java-based SaaS applications, application migration, REST API development, maintenance and support, and dedicated Java teams.',
  url: pageUrl,
  image: ogImage,
  provider: { '@id': organizationLd['@id'] },
  areaServed: 'Worldwide',
  audience: {
    '@type': 'BusinessAudience',
    name: 'Startups, SMBs, and enterprises building, migrating, or maintaining Java applications',
  },
  mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Java Application Development Services',
    itemListElement: javaServices.items.map((item) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: item.name,
        description: item.body,
      },
    })),
  },
} as const;

export const javaWebPageLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${pageUrl}#webpage`,
  url: pageUrl,
  name: `${javaMeta.title} | Soft Suave`,
  description: javaMeta.description,
  inLanguage: 'en',
  // Bump this when the page's own copy changes; today's date at authoring.
  dateModified: '2026-09-18',
  primaryImageOfPage: {
    '@type': 'ImageObject',
    '@id': `${pageUrl}#primaryimage`,
    url: ogImage,
    contentUrl: ogImage,
    caption: 'Java Development Company in India',
  },
  mainEntity: { '@id': `${pageUrl}#service` },
  about: { '@id': `${pageUrl}#service` },
  publisher: { '@id': organizationLd['@id'] },
} as const;

export const javaFaqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${pageUrl}#faq`,
  url: pageUrl,
  name: javaFaqs.title,
  isPartOf: { '@id': `${pageUrl}#webpage` },
  about: { '@id': `${pageUrl}#service` },
  mainEntity: javaFaqs.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: typeof item.a === 'string' ? item.a : item.a.join(' '),
    },
  })),
} as const;
