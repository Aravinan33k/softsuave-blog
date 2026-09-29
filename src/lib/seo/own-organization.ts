/**
 * Pages that publish their own Organization node instead of the site-wide one.
 *
 * The marketing layout emits the site-wide Organization + WebSite on every
 * page (see `SiteGraph`). A page listed here supplies its approved Organization
 * block itself, so the layout emits only the WebSite for it — two Organization
 * nodes sharing `https://www.softsuave.com/#organization` in one document would
 * collide rather than merge.
 *
 *   /agentic-ai-development-services   the spec's Organization block verbatim
 *     (`softSuaveOrganizationLd`), which lists no Facebook profile — the
 *     site-wide node does (24 Sep request).
 *
 * Kept free of `server-only` so the client `SiteGraph` can read it.
 */
export const PAGES_WITH_OWN_ORGANIZATION: ReadonlySet<string> = new Set([
  '/agentic-ai-development-services',
]);

/**
 * Pages whose approved schema spec is the page's COMPLETE structured data, so
 * the layout emits nothing site-wide for them — not even the WebSite.
 *
 *   /custom-ai-development-services    exactly the spec's four blocks —
 *     Organization, Service, WebPage, FAQPage (29 Sep request). Its WebPage
 *     carries no `isPartOf`, so nothing on the page points at the WebSite. The
 *     page also turns off the footer's PostalAddress microdata for the same
 *     reason (`<Footer addressMicrodata={false} />`).
 */
export const PAGES_WITH_OWN_SITE_GRAPH: ReadonlySet<string> = new Set([
  '/custom-ai-development-services',
]);
