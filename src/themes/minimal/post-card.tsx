import Link from 'next/link';
import type { PostCardProps } from '../_contract';
import { formatDate } from '@/lib/format';

export function MinimalPostCard({ post }: PostCardProps) {
  return (
    <article className="border-b py-6 last:border-b-0">
      <div className="mb-1 flex items-center gap-2 text-xs text-neutral-500">
        {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
        <span>·</span>
        <span>{post.readingTimeMinutes} min read</span>
      </div>
      <h2 className="text-xl font-semibold tracking-tight">
        <Link href={`/${post.slug}`} className="hover:[color:var(--theme-accent)]">
          {post.title}
        </Link>
      </h2>
      {post.excerpt && <p className="mt-2 text-neutral-600">{post.excerpt}</p>}
      {post.categories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {post.categories.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="rounded bg-neutral-100 px-2 py-0.5 hover:bg-neutral-200">
              {c.name}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
