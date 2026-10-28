import { organizationLd } from './organization';
import { absoluteUrl } from './site-url';

// Moved out of `page-graph.ts` (which is `server-only`) so the layout's client `SiteGraph`
// can render it from its own import. A server-rendered `<JsonLd>` passed to `SiteGraph` as
// children is serialized into the RSC payload on every page, including the ones that render
// nothing, because the layout cannot see the path to decide first. `page-graph.ts` re-exports
// both names, so server code keeps importing them from there.

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
