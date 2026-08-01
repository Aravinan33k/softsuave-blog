import Link from 'next/link';
import Image from 'next/image';
import type { PostViewProps } from '../_contract';
import { formatDate } from '@/lib/format';

export function MinimalPostView({ post }: PostViewProps) {
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-4xl font-bold leading-tight tracking-tight">{post.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
          {post.authorName && <span>{post.authorName}</span>}
          {post.authorName && <span>·</span>}
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
          <span>·</span>
          <span>{post.readingTimeMinutes} min read</span>
        </div>
        {post.categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {post.categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="rounded bg-neutral-100 px-2 py-0.5 hover:bg-neutral-200">
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {post.coverImageUrl && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
          <Image src={post.coverImageUrl} alt={post.coverAlt ?? ''} fill sizes="768px" className="object-cover" priority />
        </div>
      )}

      {post.toc.length > 1 && (
        <nav aria-label="Table of contents" className="mb-8 rounded-lg border bg-neutral-50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">On this page</p>
          <ul className="space-y-1 text-sm">
            {post.toc.map((t) => (
              <li key={t.id} className={t.level === 3 ? 'ml-4' : ''}>
                <a href={`#${t.id}`} className="text-neutral-600 hover:[color:var(--theme-accent)]">{t.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* contentHtml is sanitized on write. */}
      <div className="rendered-content text-neutral-800" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

      {post.tags.length > 0 && (
        <footer className="mt-10 flex flex-wrap gap-2 border-t pt-6 text-sm">
          {post.tags.map((t) => (
            <Link key={t.slug} href={`/tag/${t.slug}`} className="text-neutral-500 hover:[color:var(--theme-accent)]">
              #{t.name}
            </Link>
          ))}
        </footer>
      )}
    </article>
  );
}
