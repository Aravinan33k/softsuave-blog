import { describe, expect, it } from 'vitest';

import { blogArchiveLd } from './blog-graph';
import { marketingWebSiteLd } from './page-graph';
import { organizationLd } from './organization';
import { absoluteUrl } from './metadata';
import { homepageEnabled } from '../flags';
import type { PostSummary } from '@/themes/_contract';

/**
 * These archives emitted either one stray `Organization` (`/blog`) or nothing
 * at all (`/category`, `/tag`) before this builder existed, so what is pinned
 * here is the thing that was missing: the listing pages join the SAME graph the
 * marketing surface uses, by `@id`, rather than describing the site a second
 * time.
 *
 * As in `page-graph.test.ts`, expectations are built with `absoluteUrl` and the
 * `homepageEnabled` flag rather than spelling a host or assuming a trail — both
 * differ between vitest and a production build.
 */

const post = (slug: string, title: string): PostSummary => ({
  slug,
  title,
  excerpt: `About ${title}`,
  coverImageUrl: null,
  coverAlt: null,
  publishedAt: '2026-01-15T00:00:00.000Z',
  readingTimeMinutes: 4,
  authorName: 'Priya R',
  categories: [],
});

const posts = [post('scaling-rag', 'Scaling RAG'), post('vector-db', 'Choosing a vector DB')];

/** Collect every `{'@id': x}` bare reference in a graph. */
function refs(graph: object[]): string[] {
  const found: string[] = [];
  const walk = (v: unknown) => {
    if (Array.isArray(v)) return v.forEach(walk);
    if (!v || typeof v !== 'object') return;
    const o = v as Record<string, unknown>;
    const keys = Object.keys(o);
    if (keys.length === 1 && keys[0] === '@id' && typeof o['@id'] === 'string') {
      found.push(o['@id'] as string);
      return;
    }
    Object.values(o).forEach(walk);
  };
  walk(graph);
  return found;
}

describe('blogArchiveLd', () => {
  it('types the main archive Blog and a filtered one CollectionPage', () => {
    const [blog] = blogArchiveLd({ path: '/blog', name: 'Soft Suave Blog', posts, type: 'Blog' });
    const [collection] = blogArchiveLd({
      path: '/category/ai',
      name: 'AI',
      posts,
      type: 'CollectionPage',
      parents: [{ name: 'Blog', path: '/blog' }],
    });

    expect((blog as Record<string, unknown>)['@type']).toBe('Blog');
    expect((blog as Record<string, unknown>)['@id']).toBe(`${absoluteUrl('/blog')}#blog`);
    expect((collection as Record<string, unknown>)['@type']).toBe('CollectionPage');
    expect((collection as Record<string, unknown>)['@id']).toBe(
      `${absoluteUrl('/category/ai')}#collection`,
    );
  });

  it('references the one organization and the one website by @id', () => {
    const graph = blogArchiveLd({ path: '/blog', name: 'Soft Suave Blog', posts, type: 'Blog' });
    const archive = graph[0] as Record<string, unknown>;

    expect(archive.publisher).toEqual({ '@id': organizationLd['@id'] });
    expect(archive.isPartOf).toEqual({ '@id': marketingWebSiteLd['@id'] });
    // Nothing in the archive restates either node inline.
    expect(refs(graph)).toContain(organizationLd['@id']);
    expect(refs(graph)).toContain(marketingWebSiteLd['@id']);
  });

  it('lists the posts it renders, in order, as an ItemList', () => {
    const [archive] = blogArchiveLd({
      path: '/blog',
      name: 'Soft Suave Blog',
      posts,
      total: 37,
      type: 'Blog',
    });
    const list = (archive as Record<string, unknown>).mainEntity as Record<string, unknown>;

    expect(list['@type']).toBe('ItemList');
    // The archive paginates, so the count is the total, not the page length.
    expect(list.numberOfItems).toBe(37);
    const items = list.itemListElement as Record<string, unknown>[];
    expect(items).toHaveLength(2);
    expect(items[0].position).toBe(1);
    expect(items[0].url).toBe(absoluteUrl('/scaling-rag'));
    expect((items[1].item as Record<string, unknown>).headline).toBe('Choosing a vector DB');
  });

  it('omits the ItemList entirely when the archive is empty', () => {
    const [archive] = blogArchiveLd({
      path: '/tag/unused',
      name: 'unused',
      posts: [],
      type: 'CollectionPage',
      parents: [{ name: 'Blog', path: '/blog' }],
    });
    // An empty list is a rich-result warning, the same reason an empty FAQPage
    // is never emitted — a term with no published posts is a real state.
    expect(archive).not.toHaveProperty('mainEntity');
  });

  it('puts a filtered archive under /blog in the trail', () => {
    const graph = blogArchiveLd({
      path: '/category/ai',
      name: 'AI',
      posts,
      type: 'CollectionPage',
      parents: [{ name: 'Blog', path: '/blog' }],
    });
    const crumb = graph.find(
      (n) => (n as Record<string, unknown>)['@type'] === 'BreadcrumbList',
    ) as Record<string, unknown>;
    const items = crumb.itemListElement as Record<string, unknown>[];

    expect(items.map((i) => i.item)).toEqual([
      ...(homepageEnabled ? [absoluteUrl('/')] : []),
      absoluteUrl('/blog'),
      absoluteUrl('/category/ai'),
    ]);
    expect(items.map((i) => i.position)).toEqual(items.map((_, i) => i + 1));
  });

  it('drops the breadcrumb when the trail would be a single item', () => {
    // "/" is a 307 while the marketing homepage is gated, so /blog's own trail
    // is just itself — and a one-item trail must not be emitted.
    const graph = blogArchiveLd({ path: '/blog', name: 'Soft Suave Blog', posts, type: 'Blog' });
    const crumb = graph.find((n) => (n as Record<string, unknown>)['@type'] === 'BreadcrumbList');

    if (homepageEnabled) {
      expect(crumb).toBeDefined();
    } else {
      expect(crumb).toBeUndefined();
    }
  });
});
