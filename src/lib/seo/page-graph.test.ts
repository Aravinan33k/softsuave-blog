import { describe, expect, it } from 'vitest';

import {
  MARKETING_SITE_GRAPH,
  marketingWebSiteLd,
  pageSchemaGraph,
  SCHEMA_DATE_MODIFIED,
} from './page-graph';
import { organizationLd } from './organization';
import { absoluteUrl } from './metadata';
import { homepageEnabled } from '../flags';

/**
 * The point of this builder is that eighty pages stop each inventing their own
 * `Service`. So what is pinned here is the contract a consumer actually reads:
 * the nodes are joined by `@id`, `provider`/`publisher` resolve to the ONE
 * organization, and nothing is emitted empty.
 *
 * The `@id` graph is the part that breaks silently — a typo in a reference is
 * still valid JSON and still valid JSON-LD; it just quietly means "some other
 * thing". These assert the references resolve against the nodes that exist.
 */

/*
 * The origin comes from `NEXT_PUBLIC_SITE_URL`, which is localhost under vitest
 * and the real domain in a build, so expectations are built with the same
 * helper the builder uses rather than spelling a host that only holds in one of
 * the two. Same for `homepageEnabled`: it gates the breadcrumb and is off by
 * default, so the trail assertions follow the flag instead of assuming it.
 */
const PAGE = absoluteUrl('/hire-python-developers');

const base = {
  path: '/hire-python-developers',
  title: 'Hire Python Developers',
  description: 'Hire vetted Python developers for your team.',
  serviceType: 'Python development',
};

/** Collect every `{'@id': x}` reference in a graph — the bare-reference form. */
function refs(graph: object[]): string[] {
  const out: string[] = [];
  const walk = (v: unknown): void => {
    if (!v || typeof v !== 'object') return;
    if (Array.isArray(v)) return v.forEach(walk);
    const o = v as Record<string, unknown>;
    if (Object.keys(o).length === 1 && typeof o['@id'] === 'string') out.push(o['@id'] as string);
    Object.values(o).forEach(walk);
  };
  graph.forEach(walk);
  return out;
}

const idsOf = (graph: object[]) =>
  graph.map((n) => (n as Record<string, string>)['@id']).filter(Boolean);
const typeOf = (graph: object[], t: string) =>
  graph.find((n) => (n as Record<string, string>)['@type'] === t) as Record<string, unknown> | undefined;

describe('pageSchemaGraph', () => {
  it('emits Service and WebPage for a page with nothing else', () => {
    const g = pageSchemaGraph(base);
    expect(g.map((n) => (n as Record<string, string>)['@type'])).toEqual(
      homepageEnabled ? ['Service', 'WebPage', 'BreadcrumbList'] : ['Service', 'WebPage'],
    );
  });

  it('joins the nodes by @id rather than nesting copies', () => {
    const g = pageSchemaGraph({ ...base, faqs: [{ q: 'Q?', a: 'A.' }] });
    const service = typeOf(g, 'Service')!;
    const webPage = typeOf(g, 'WebPage')!;
    const faq = typeOf(g, 'FAQPage')!;

    expect(service['@id']).toBe(`${PAGE}#service`);
    expect(webPage['@id']).toBe(`${PAGE}#webpage`);
    expect(service.mainEntityOfPage).toEqual({ '@id': webPage['@id'] });
    expect(webPage.mainEntity).toEqual({ '@id': service['@id'] });
    expect(webPage.about).toEqual({ '@id': service['@id'] });
    expect(faq.isPartOf).toEqual({ '@id': webPage['@id'] });
    expect(faq.about).toEqual({ '@id': service['@id'] });
  });

  it('points provider and publisher at the one organization, never a copy', () => {
    const g = pageSchemaGraph(base);
    const service = typeOf(g, 'Service')!;
    const webPage = typeOf(g, 'WebPage')!;
    // A bare reference — the whole defect this replaces was an inline stub.
    expect(service.provider).toEqual({ '@id': organizationLd['@id'] });
    expect(webPage.publisher).toEqual({ '@id': organizationLd['@id'] });
    expect(JSON.stringify(g)).not.toContain('"@type":"Organization"');
  });

  it('references only @ids that the page graph or the site graph defines', () => {
    const g = pageSchemaGraph({
      ...base,
      faqs: [{ q: 'Q?', a: 'A.' }],
      offers: [{ name: 'Django APIs', description: 'REST and GraphQL.' }],
    });
    const defined = new Set([...idsOf(g), ...idsOf(MARKETING_SITE_GRAPH)]);
    for (const r of refs(g)) expect(defined, `dangling reference ${r}`).toContain(r);
  });

  it('builds the offer catalogue from the page\'s own services', () => {
    const g = pageSchemaGraph({
      ...base,
      offerCatalogName: 'What our Python developers build',
      offers: [
        { name: 'Django APIs', description: 'REST and GraphQL.' },
        { name: 'Data pipelines' },
      ],
    });
    const cat = typeOf(g, 'Service')!.hasOfferCatalog as Record<string, unknown>;
    expect(cat.name).toBe('What our Python developers build');
    expect(cat.itemListElement).toEqual([
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Django APIs', description: 'REST and GraphQL.' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Data pipelines' } },
    ]);
  });

  it('omits empty sections rather than emitting hollow nodes', () => {
    // NestJS publishes no FAQ; a page with no services band has no catalogue.
    // An empty FAQPage or OfferCatalog is a rich-result warning, not a neutral.
    const g = pageSchemaGraph({ ...base, faqs: [], offers: [] });
    expect(typeOf(g, 'FAQPage')).toBeUndefined();
    expect(typeOf(g, 'Service')!.hasOfferCatalog).toBeUndefined();
  });

  it('drops entries that are blank rather than trusting the caller', () => {
    const g = pageSchemaGraph({
      ...base,
      faqs: [{ q: 'Real?', a: 'Yes.' }, { q: '', a: 'orphan answer' }],
      offers: [{ name: 'Real' }, { name: '' }],
    });
    expect((typeOf(g, 'FAQPage')!.mainEntity as unknown[]).length).toBe(1);
    const cat = typeOf(g, 'Service')!.hasOfferCatalog as Record<string, unknown[]>;
    expect(cat.itemListElement.length).toBe(1);
  });

  it('joins multi-paragraph answers into one string', () => {
    const g = pageSchemaGraph({ ...base, faqs: [{ q: 'Q?', a: ['One.', 'Two.'] }] });
    const q = (typeOf(g, 'FAQPage')!.mainEntity as Record<string, Record<string, string>>[])[0];
    expect(q.acceptedAnswer.text).toBe('One. Two.');
  });

  /* An answer that introduces a bulleted list and then drops it is a different
     answer from the one on the page, which is the mismatch Google penalises. */
  it('keeps the bulleted list that is part of a visible answer', () => {
    const g = pageSchemaGraph({
      ...base,
      faqs: [{ q: 'What do you cover?', a: 'These:', points: ['APIs.', 'Migrations.'] }],
    });
    const q = (typeOf(g, 'FAQPage')!.mainEntity as Record<string, Record<string, string>>[])[0];
    expect(q.acceptedAnswer.text).toBe('These: APIs. Migrations.');
  });

  it('dates the page from one constant unless told otherwise', () => {
    expect((typeOf(pageSchemaGraph(base), 'WebPage') as Record<string, string>).dateModified).toBe(
      SCHEMA_DATE_MODIFIED,
    );
    expect(
      (typeOf(pageSchemaGraph({ ...base, dateModified: '2026-01-02' }), 'WebPage') as Record<string, string>)
        .dateModified,
    ).toBe('2026-01-02');
  });

  it('gives the WebPage an image and ties the page to the site', () => {
    const webPage = typeOf(pageSchemaGraph(base), 'WebPage')!;
    const img = webPage.primaryImageOfPage as Record<string, string>;
    expect(img.url).toContain('/og?');
    expect(img.caption).toBe('Hire Python Developers');
    expect(webPage.isPartOf).toEqual({ '@id': marketingWebSiteLd['@id'] });
  });

  /* While the homepage is behind its flag "/" is a 307, so the trail collapses
     to one item — which must be dropped, not emitted as a one-crumb list
     pointing a crawler at a redirect. Both sides of that gate are asserted. */
  it('puts the page last in its own breadcrumb trail, or omits a lone crumb', () => {
    const g = pageSchemaGraph({ ...base, breadcrumbName: 'Hire Python Developers' });
    const crumb = typeOf(g, 'BreadcrumbList');
    if (!homepageEnabled) {
      expect(crumb).toBeUndefined();
      return;
    }
    const items = crumb!.itemListElement as Record<string, unknown>[];
    expect(items[items.length - 1]).toMatchObject({
      name: 'Hire Python Developers',
      item: PAGE,
    });
    expect(items.map((i) => i.position)).toEqual(items.map((_, i) => i + 1));
  });
});

describe('MARKETING_SITE_GRAPH', () => {
  it('carries the organization and website that pages reference', () => {
    expect(idsOf(MARKETING_SITE_GRAPH)).toEqual([
      organizationLd['@id'],
      marketingWebSiteLd['@id'],
    ]);
  });

  it('is emitted once, so no page graph repeats it', () => {
    const g = pageSchemaGraph(base);
    for (const id of idsOf(MARKETING_SITE_GRAPH)) expect(idsOf(g)).not.toContain(id);
  });
});
