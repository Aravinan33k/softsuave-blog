/**
 * Pages whose approved schema spec is the page's COMPLETE structured data, so
 * the marketing layout emits nothing site-wide for them — neither its
 * Organization nor its WebSite (see `SiteGraph`).
 *
 * Each page listed here carries exactly the spec's four blocks — Organization,
 * Service, WebPage, FAQPage (24–29 Sep requests):
 *
 *   /agentic-ai-development-services
 *   /android-application-development-company (an exception, like the
 *     Mobile App page below: it mirrors softsuave.com's page, whose schema is
 *     a Service graph and a FAQPage — its Organization arrives from GTM and
 *     its footer keeps the address microdata, as live's does)
 *   /computer-vision-development-services
 *   /custom-ai-development-services
 *   /data-engineering-services
 *   /data-science-services
 *   /generative-ai-development-company
 *   /graphql-development-company
 *   /mobile-application-development-company (the one exception to the
 *     list below: it mirrors softsuave.com's page, whose schema is a lone
 *     FAQPage — its Organization arrives from GTM and its footer keeps the
 *     address microdata, as live's does)
 *   /nextjs-development-company
 *   /postgresql-development-company
 *   /predictive-intelligence-services
 *   /rag-development-services
 *   /typescript-development-company
 *   /vuejs-development-company
 *
 * so each page must also:
 *   - emit the spec's Organization itself (`softSuaveOrganizationLd`, which
 *     lists no Facebook profile — the site-wide node does);
 *   - turn off the footer's PostalAddress microdata
 *     (`<Footer addressMicrodata={false} />`).
 * Their WebPages carry no `isPartOf`, so nothing on them points at the WebSite.
 *
 * Kept free of `server-only` so the client `SiteGraph` can read it.
 */
export const PAGES_WITH_OWN_SITE_GRAPH: ReadonlySet<string> = new Set([
  '/agentic-ai-development-services',
  '/android-application-development-company',
  '/computer-vision-development-services',
  '/custom-ai-development-services',
  '/data-engineering-services',
  '/data-science-services',
  '/generative-ai-development-company',
  '/graphql-development-company',
  '/mobile-application-development-company',
  '/nextjs-development-company',
  '/postgresql-development-company',
  '/predictive-intelligence-services',
  '/rag-development-services',
  '/typescript-development-company',
  '/vuejs-development-company',
]);
