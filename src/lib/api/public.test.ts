import { describe, it, expect, vi, beforeEach } from 'vitest';

// The public read API is consumed by the browser (LoadMore feeds coverImage.url
// straight into next/image), so the mount subpath has to be applied here rather
// than left to each caller — an unprefixed "/uploads/…" would 404 under a subpath mount.

const { findMany, count } = vi.hoisted(() => ({ findMany: vi.fn(), count: vi.fn() }));
vi.mock('../db', () => ({ prisma: { post: { findMany, count } } }));

import { listPosts } from './public';
import { BASE_PATH } from '../flags';

function row(coverUrl: string | null) {
  return {
    id: 'p1',
    slug: 'a-post',
    title: 'A post',
    excerpt: null,
    publishedAt: new Date('2026-07-04'),
    readingTimeMinutes: 5,
    coverImage: coverUrl === null ? null : { url: coverUrl, altText: 'Alt' },
    author: { name: 'Author' },
    categories: [],
    tags: [],
  };
}

async function coverUrlFor(stored: string | null) {
  findMany.mockResolvedValue([row(stored)]);
  count.mockResolvedValue(1);
  const { data } = await listPosts({ page: 1, perPage: 12 });
  return data[0].coverImage?.url ?? null;
}

describe('listPosts cover URLs', () => {
  beforeEach(() => vi.clearAllMocks());

  it('prefixes stored root-relative uploads with the mount subpath', async () => {
    expect(await coverUrlFor('/uploads/2026/08/a.webp')).toBe(`${BASE_PATH}/uploads/2026/08/a.webp`);
  });

  it('leaves an already-prefixed path alone', async () => {
    expect(await coverUrlFor(`${BASE_PATH}/uploads/2026/08/a.webp`)).toBe(`${BASE_PATH}/uploads/2026/08/a.webp`);
  });

  it('returns absolute CDN URLs untouched', async () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/a.webp';
    expect(await coverUrlFor(url)).toBe(url);
  });

  it('keeps a missing cover null', async () => {
    expect(await coverUrlFor(null)).toBeNull();
  });
});
