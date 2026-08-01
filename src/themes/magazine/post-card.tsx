import Link from 'next/link';
import Image from 'next/image';
import type { PostCardProps } from '../_contract';
import { formatDate } from '@/lib/format';

export function MagazinePostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/${post.slug}`} className="relative block aspect-video overflow-hidden bg-neutral-100">
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt={post.coverAlt ?? ''}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">No image</div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        {post.categories[0] && (
          <Link
            href={`/category/${post.categories[0].slug}`}
            className="mb-2 text-xs font-semibold uppercase tracking-wide [color:var(--theme-accent)]"
          >
            {post.categories[0].name}
          </Link>
        )}
        <h2 className="text-lg font-bold leading-snug">
          <Link href={`/${post.slug}`} className="hover:opacity-80">{post.title}</Link>
        </h2>
        {post.excerpt && <p className="mt-2 line-clamp-3 text-sm text-neutral-600">{post.excerpt}</p>}
        <div className="mt-auto pt-3 text-xs text-neutral-500">
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
          {' · '}
          {post.readingTimeMinutes} min read
        </div>
      </div>
    </article>
  );
}
