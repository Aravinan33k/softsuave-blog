import 'server-only';
import { homepageEnabled } from '../flags';
import { breadcrumbLd } from './jsonld';
import { absoluteUrl, dynamicOgImage } from './metadata';
import { organizationLd } from './organization';

/**
 * One `@id`-linked JSON-LD graph for a marketing landing page.
 *
 * Every service/hire page on this surface was emitting its own hand-rolled
 * `Service` object with an inline `{'@type': 'Organization', name: 'Soft Suave'}`
 * as `provider`. Forty-odd pages doing that is forty-odd *different* unnamed
 * organizations as far as a consumer is concerned — none of them the canonical
 * `organizationLd`, which until now was wired into exactly one route. The nodes
 * were also unlinked: a `Service`, a `FAQPage` and a breadcrumb sitting in the
 * same script with nothing tying them to each other or to a page.
 *
 * This builds the shape `typescript-development-company.ts` established by hand
 * — `Service` + `WebPage` + `FAQPage`, joined by `@id`, `provider`/`publisher`
 * pointing at the one organization — from a page's own content, so that shape
 * is a function rather than a thing each page is trusted to re-type correctly.
 *
 * The organization node itself is NOT returned here: it is emitted once for the
 * whole surface by `app/(marketing)/layout.tsx`, which is what makes a bare
 * `{'@id': …}` reference resolve on every page. Returning it per page would put
 * eighty copies of the same object back into the graph, which is the thing this
 * exists to stop.
 *
 * Offers are omitted rather than faked: a page with no services section gets a
 * `Service` with no `hasOfferCatalog`, not an empty catalogue. Same for the FAQ
 * — `NestJS` publishes none, and an empty `FAQPage` is a rich-result warning.
 */

/** Today's date at authoring. One constant so a copy change bumps one line. */
export const SCHEMA_DATE_MODIFIED = '2026-09-19';

/**
 * The marketing surface's `WebSite`, with the `@id` every page's `WebPage`
 * points `isPartOf` at.
 *
 * `jsonld.ts` already exports a `websiteLd()`, but it builds from a `SiteInfo`
 * (the blog's theme contract) and carries no `@id`, so nothing can reference
 * it. This surface needs a stable identifier more than it needs the theme's
 * title, so it gets its own node rather than an `@id` bolted onto that one.
 */
export const marketingWebSiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${absoluteUrl('/')}#website`,
  url: absoluteUrl('/'),
  name: 'Soft Suave',
  description:
    'Build scalable AI solutions, intelligent automation systems, and seamless integrations with AI-enabled engineering teams focused on real business outcomes.',
  inLanguage: 'en',
  publisher: { '@id': organizationLd['@id'] },
  /* The site's own search, which this app serves at `app/search/page.tsx`
     reading `q`. It belongs to the website rather than to the homepage: it was
     declared inside `home-seo.ts`'s own WebSite node, which only existed
     because the homepage described the site a second time. */
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${absoluteUrl('/search')}?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
} as const;

/**
 * The two site-wide nodes, emitted once by `app/(marketing)/layout.tsx`.
 *
 * Every page graph references these by `@id` instead of repeating them. They
 * live at the layout rather than in each page so the identity is declared once
 * per document — which is also what makes a page's bare `{'@id': …}` resolve.
 */
export const MARKETING_SITE_GRAPH: object[] = [organizationLd, marketingWebSiteLd];

/** One entry of a page's services/offer catalogue. */
export interface GraphOffer {
  readonly name: string;
  readonly description?: string;
}

/** One FAQ pair. `a` is an array on pages whose answers run to several paragraphs. */
export interface GraphFaqItem {
  readonly q: string;
  readonly a: string | readonly string[];
  /**
   * The bulleted list inside the answer, where the copy introduces one.
   *
   * It is part of what the reader sees, so it is part of what the schema says:
   * Google requires the answer in the markup to match the answer on the page,
   * and an answer that drops its list is a different answer.
   */
  readonly points?: readonly string[];
}

export interface PageGraphInput {
  /** App-internal route, leading slash, no mount subpath — e.g. `/hire-python-developers`. */
  readonly path: string;
  /** The page's `<title>`, before the " | Soft Suave" suffix. */
  readonly title: string;
  /** The page's meta description. Used as the WebPage description. */
  readonly description: string;
  /** schema.org `serviceType`, e.g. "ReactJS application development". */
  readonly serviceType: string;
  /** `Service.name`. Defaults to the page title. */
  readonly serviceName?: string;
  /** `Service.description`. Defaults to the page description. */
  readonly serviceDescription?: string;
  /** Trailing breadcrumb label. Defaults to the page title. */
  readonly breadcrumbName?: string;
  /**
   * Crumbs between Home and this page, for a page that sits under an index —
   * the sector pages hang off `/industries`. Their own trail is never shorter
   * than two items, so their breadcrumb survives the homepage gate below.
   */
  readonly parents?: readonly { readonly name: string; readonly path: string }[];
  /** `primaryImageOfPage` caption. Defaults to the page title. */
  readonly caption?: string;
  /** ISO date. Defaults to {@link SCHEMA_DATE_MODIFIED}. */
  readonly dateModified?: string;
  /** Who the page is for, as `Service.audience`. Omitted when absent. */
  readonly audience?: string;
  /** Heading of the services band the offers come from. */
  readonly offerCatalogName?: string;
  /** The page's services. Omitted entirely when empty. */
  readonly offers?: readonly GraphOffer[];
  /** Heading of the FAQ band. */
  readonly faqName?: string;
  /** The page's FAQ. Omitted entirely when empty. */
  readonly faqs?: readonly GraphFaqItem[];
}

/** Answers arrive as prose, as paragraphs, or as prose plus a bulleted list;
 *  schema.org wants the whole visible answer as one string. */
function answerText(item: GraphFaqItem): string {
  const paragraphs = typeof item.a === 'string' ? [item.a] : item.a;
  return [...paragraphs, ...(item.points ?? [])].join(' ');
}

/**
 * Build the page's graph: `Service`, `WebPage`, then `FAQPage` and
 * `BreadcrumbList` where the page has them.
 *
 * The breadcrumb is dropped when the trail would be a single item — while the
 * homepage is behind its flag "/" is a 307, and a trail must not point a
 * crawler at a redirect. That gate is `homepageEnabled`, the same one the
 * pages used to apply themselves.
 */
export function pageSchemaGraph(input: PageGraphInput): object[] {
  const pageUrl = absoluteUrl(input.path);
  const image = dynamicOgImage(input.title, 'Soft Suave');
  const serviceId = `${pageUrl}#service`;
  const webPageId = `${pageUrl}#webpage`;

  const offers = input.offers?.filter((o) => o.name) ?? [];
  const faqs = input.faqs?.filter((f) => f.q && f.a) ?? [];

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': serviceId,
    name: input.serviceName ?? input.title,
    serviceType: input.serviceType,
    description: input.serviceDescription ?? input.description,
    url: pageUrl,
    image,
    provider: { '@id': organizationLd['@id'] },
    areaServed: 'Worldwide',
    mainEntityOfPage: { '@id': webPageId },
    ...(input.audience
      ? { audience: { '@type': 'BusinessAudience', name: input.audience } }
      : {}),
    ...(offers.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: input.offerCatalogName ?? input.title,
            itemListElement: offers.map((o) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: o.name,
                ...(o.description ? { description: o.description } : {}),
              },
            })),
          },
        }
      : {}),
  };

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': webPageId,
    url: pageUrl,
    name: `${input.title} | Soft Suave`,
    description: input.description,
    inLanguage: 'en',
    dateModified: input.dateModified ?? SCHEMA_DATE_MODIFIED,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      '@id': `${pageUrl}#primaryimage`,
      url: image,
      contentUrl: image,
      caption: input.caption ?? input.title,
    },
    mainEntity: { '@id': serviceId },
    about: { '@id': serviceId },
    publisher: { '@id': organizationLd['@id'] },
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
  };

  const graph: object[] = [service, webPage];

  if (faqs.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      url: pageUrl,
      ...(input.faqName ? { name: input.faqName } : {}),
      isPartOf: { '@id': webPageId },
      about: { '@id': serviceId },
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: answerText(f) },
      })),
    });
  }

  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    ...(input.parents ?? []),
    { name: input.breadcrumbName ?? input.title, path: input.path },
  ];
  if (trail.length > 1) graph.push(breadcrumbLd(trail));

  return graph;
}
