'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { SoftSuavePostCard } from './post-card';
import type { PostSummary } from '../_contract';

const PER_PAGE = 10;

interface ApiPost {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: { url: string; alt: string } | null;
  publishedAt: string | null;
  readingTimeMinutes: number;
  author: { name: string | null };
  categories: { name: string; slug: string }[];
}

function toSummary(p: ApiPost): PostSummary {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    coverImageUrl: p.coverImage?.url ?? null,
    coverAlt: p.coverImage?.alt ?? null,
    publishedAt: p.publishedAt,
    readingTimeMinutes: p.readingTimeMinutes,
    authorName: p.author?.name ?? null,
    categories: p.categories,
  };
}

export function LoadMore({ shown, total, filter }: { shown: number; total: number; filter?: { category?: string; tag?: string } }) {
  const [items, setItems] = useState<PostSummary[]>([]);
  const [page, setPage] = useState(1); // page 1 was server-rendered
  const [loading, setLoading] = useState(false);

  const hasMore = shown + items.length < total;

  async function loadMore() {
    setLoading(true);
    try {
      const next = page + 1;
      const q = new URLSearchParams({ page: String(next), perPage: String(PER_PAGE) });
      if (filter?.category) q.set('category', filter.category);
      if (filter?.tag) q.set('tag', filter.tag);
      const data = await api<{ data: ApiPost[] }>(`/api/v1/posts?${q.toString()}`);
      setItems((prev) => [...prev, ...data.data.map(toSummary)]);
      setPage(next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {items.length > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {items.map((p) => (
            <SoftSuavePostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="ss-heading rounded-full bg-[#ff0042] px-8 py-3 font-bold text-white transition-colors hover:bg-[#d6003a] disabled:opacity-60"
          >
            {loading ? 'Loading…' : 'Load More'}
          </button>
        </div>
      )}
    </>
  );
}
