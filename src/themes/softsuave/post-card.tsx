import Link from 'next/link';
import Image from 'next/image';
import type { PostCardProps } from '../_contract';

// Deliberately carries no 'use client' directive. It has no state or handlers,
// so as a shared module it renders server-side (zero client JS) in the static
// archive and related grids, while still being importable by the client-side
// Load More control, which pulls it into that route's client graph on its own.
export function SoftSuavePostCard({ post, sizes = '(max-width: 768px) 100vw, 600px', preload = false }: PostCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/${post.slug}`} className="relative block aspect-[300/157] overflow-hidden bg-neutral-100">
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt={post.coverAlt ?? ''}
            fill
            sizes={sizes}
            preload={preload}
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
