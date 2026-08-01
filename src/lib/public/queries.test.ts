import { describe, it, expect, vi, beforeEach } from 'vitest';

// getRelatedPosts ranking: shared categories first, then shared tags, then recent
// backfill — excluding the current post, with no duplicates, and a safe empty
// fallback when the database is unreachable.

const { findMany } = vi.hoisted(() => ({ findMany: vi.fn() }));
vi.mock('../db', () => ({ prisma: { post: { findMany } } }));

import { getRelatedPosts } from './queries';
import type { PostFull } from '@/themes/_contract';

interface Fixture {
  slug: string;
  publishedAt: Date;
  cats: string[];
  tags: string[];
}

const POSTS: Fixture[] = [
  { slug: 'current', publishedAt: new Date('2026-07-04'), cats: ['tech'], tags: ['ai'] },
  { slug: 'cat-new', publishedAt: new Date('2026-07-01'), cats: ['tech'], tags: [] },
  { slug: 'cat-old', publishedAt: new Date('2026-06-01'), cats: ['tech'], tags: [] },
  { slug: 'tag-only', publishedAt: new Date('2026-05-01'), cats: ['other'], tags: ['ai'] },
  { slug: 'unrelated', publishedAt: new Date('2026-04-01'), cats: ['other'], tags: ['other'] },
];

// Emulates the where/orderBy/take semantics used by getRelatedPosts.
function mockDb() {
  findMany.mockImplementation(async (args: {
    where: {
      slug?: { notIn?: string[] };
      categories?: { some: { category: { slug: { in: string[] } } } };
      tags?: { some: { tag: { slug: { in: string[] } } } };
    };
    take: number;
  }) => {
    const notIn = args.where.slug?.notIn ?? [];
    const catSlugs = args.where.categories?.some.category.slug.in;
    const tagSlugs = args.where.tags?.some.tag.slug.in;
    return POSTS.filter((p) => !notIn.includes(p.slug))
      .filter((p) => !catSlugs || p.cats.some((c) => catSlugs.includes(c)))
      .filter((p) => !tagSlugs || p.tags.some((t) => tagSlugs.includes(t)))
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, args.take)
      .map((p) => ({
        slug: p.slug,
        title: `Title ${p.slug}`,
        excerpt: null,
        publishedAt: p.publishedAt,
        readingTimeMinutes: 5,
        coverImage: null,
        author: { name: 'Author' },
        categories: p.cats.map((c) => ({ category: { name: c, slug: c } })),
      }));
  });
}

function currentPost(overrides: Partial<PostFull> = {}): PostFull {
  return {
    slug: 'current',
    title: 'Current',
    excerpt: null,
    coverImageUrl: null,
    coverAlt: null,
    publishedAt: '2026-07-04T00:00:00.000Z',
    readingTimeMinutes: 5,
    authorName: 'Author',
    categories: [{ name: 'Tech', slug: 'tech' }],
    contentHtml: '',
    contentJson: null,
    tags: [{ name: 'AI', slug: 'ai' }],
    toc: [],
    authorProfile: null,
    updatedAt: null,
    wordCount: 1000,
    ...overrides,
  };
}

describe('getRelatedPosts', () => {
  beforeEach(() => {
    findMany.mockReset();
    mockDb();
  });

  it('ranks shared-category posts first, then shared tags, then recent backfill', async () => {
    const related = await getRelatedPosts(currentPost(), 4);
    expect(related.map((p) => p.slug)).toEqual(['cat-new', 'cat-old', 'tag-only', 'unrelated']);
  });

  it('excludes the current post and never repeats a post', async () => {
    const related = await getRelatedPosts(currentPost(), 4);
    expect(related.map((p) => p.slug)).not.toContain('current');
    expect(new Set(related.map((p) => p.slug)).size).toBe(related.length);
  });

  it('respects the limit', async () => {
    const related = await getRelatedPosts(currentPost(), 2);
    expect(related.map((p) => p.slug)).toEqual(['cat-new', 'cat-old']);
  });

  it('falls back to recent posts when nothing matches by category or tag', async () => {
    const post = currentPost({ categories: [], tags: [] });
    const related = await getRelatedPosts(post, 2);
    expect(related.map((p) => p.slug)).toEqual(['cat-new', 'cat-old']);
  });

  it('returns an empty array when the database is unreachable', async () => {
    findMany.mockRejectedValue(new Error('connection refused'));
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    await expect(getRelatedPosts(currentPost(), 4)).resolves.toEqual([]);
    warn.mockRestore();
  });
});
