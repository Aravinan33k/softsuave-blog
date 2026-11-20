import { describe, expect, it } from 'vitest';
import { absoluteUrl as serverAbsoluteUrl } from './metadata';
import { absoluteUrl } from './site-url';
import { MARKETING_SITE_GRAPH, marketingWebSiteLd } from './site-graph-data';
import * as pageGraph from './page-graph';

describe('client-safe absoluteUrl', () => {
  // The browser bundle builds JSON-LD with this one while the server builds the rest with
  // `metadata.ts`'s; a page's schema must not depend on which of them wrote it.
  it.each(['/', '/about', 'about', '/case-study-tender-intelligence', '/search', 'https://cdn.example.com/x.webp', '/assets/a b.webp'])(
    'matches the server helper for %s',
    (path) => {
      expect(absoluteUrl(path)).toBe(serverAbsoluteUrl(path));
    },
  );
});

describe('site-wide graph', () => {
  it('is still exported from page-graph for the server callers that import it there', () => {
    expect(pageGraph.MARKETING_SITE_GRAPH).toBe(MARKETING_SITE_GRAPH);
    expect(pageGraph.marketingWebSiteLd).toBe(marketingWebSiteLd);
  });

  it('is the Organization and the WebSite, in that order', () => {
    expect(MARKETING_SITE_GRAPH.map((n) => (n as { '@type': string })['@type'])).toEqual(['Organization', 'WebSite']);
  });
});
