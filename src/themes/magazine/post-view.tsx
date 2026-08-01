import Link from 'next/link';
import Image from 'next/image';
import type { PostViewProps } from '../_contract';
import { formatDate } from '@/lib/format';

export function MagazinePostView({ post }: PostViewProps) {
  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-8 text-center">
        {post.categories[0] && (
          <Link
            href={`/category/${post.categories[0].slug}`}
            className="text-sm font-semibold uppercase tracking-wide [color:var(--theme-accent)]"
          >
            {post.categories[0].name}
          </Link>
        )}
        <h1 className="mt-2 text-4xl font-black leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-neutral-500">
          {post.authorName && <span>{post.authorName}</span>}
          {post.authorName && <span>·</span>}
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
          <span>·</span>
          <span>{post.readingTimeMinutes} min read</span>
        </div>
      </header>

      {post.coverImageUrl && (
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image src={post.coverImageUrl} alt={post.coverAlt ?? ''} fill sizes="768px" className="object-cover" priority />
        </div>
      )}

      {post.toc.length > 1 && (
        <nav aria-label="Table of contents" className="mb-8 rounded-lg border bg-white p-4">
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

      <div className="rendered-content text-lg text-neutral-800" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

      {post.tags.length > 0 && (
        <footer className="mt-12 flex flex-wrap justify-center gap-2 border-t pt-6 text-sm">
          {post.tags.map((t) => (
            <Link key={t.slug} href={`/tag/${t.slug}`} className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-600 hover:bg-neutral-200">
              #{t.name}
            </Link>
          ))}
        </footer>
      )}
    </article>
  );
}
