'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { PostCardProps } from '../_contract';

// Client component so it can be reused by the Load More client control.
export function SoftSuavePostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/${post.slug}`} className="relative block aspect-[300/157] overflow-hidden bg-neutral-100">
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt={post.coverAlt ?? ''}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">Soft Suave</div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap gap-2">
          {post.categories.slice(0, 2).map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="ss-heading rounded-full bg-[#ff0042]/10 px-3 py-1 text-xs font-semibold text-[#ff0042]"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <h2 className="ss-heading text-lg font-bold leading-snug text-neutral-900">
          <Link href={`/${post.slug}`} className="hover:text-[#ff0042]">{post.title}</Link>
        </h2>
        {post.excerpt && <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{post.excerpt}</p>}
        <div className="mt-4 flex items-center justify-between">
          <Link href={`/${post.slug}`} className="ss-heading text-sm font-bold text-[#ff0042] hover:underline">
            Know More →
          </Link>
          {post.authorName && <span className="text-xs text-neutral-500">{post.authorName}</span>}
        </div>
      </div>
    </article>
  );
}
