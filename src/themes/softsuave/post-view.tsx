import Link from 'next/link';
import Image from 'next/image';
import type { PostViewProps } from '../_contract';
import { formatDate } from '@/lib/format';
import { ShareButtons } from './share-buttons';
import { ReadingProgress } from './reading-progress';
import { PostToc } from './post-toc';
import { SoftSuavePostCard } from './post-card';
import { navHref, RELATED_CASE_STUDIES, RELATED_SERVICES } from './nav-data';

const BANNER_BG = 'https://www.softsuave.com/blog/wp-content/uploads/2026/01/blog-bg.png';

/** True when the post was modified on a later day than it was published. */
function wasUpdated(publishedAt: string | null, updatedAt: string | null): boolean {
  if (!publishedAt || !updatedAt) return false;
  return updatedAt.slice(0, 10) > publishedAt.slice(0, 10);
}

export function SoftSuavePostView({ post, prev, next, relatedPosts }: PostViewProps) {
  const author = post.authorProfile;
  const category = post.categories[0];

  return (
    <article>
      <ReadingProgress />
      {/* Full-width dark banner (post cover as backdrop when available) */}
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.88), rgba(0,0,0,0.35)), url(${post.coverImageUrl ?? BANNER_BG})` }}
      >
        <div className="mx-auto max-w-[1320px] px-4 pb-14 pt-10 text-white">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/80">
            <ol className="flex flex-wrap items-center">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              {category && (
                <li className="flex items-center">
                  <span aria-hidden className="mx-2">›</span>
                  <Link href={`/category/${category.slug}`} className="hover:text-white">{category.name}</Link>
                </li>
              )}
              <li className="flex min-w-0 items-center">
                <span aria-hidden className="mx-2">›</span>
                <span aria-current="page" className="truncate text-white">{post.title}</span>
              </li>
            </ol>
          </nav>

          {category && (
            <Link
              href={`/category/${category.slug}`}
              className="ss-heading mb-3 inline-block rounded-full bg-[#ff0042] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
            >
              {category.name}
            </Link>
          )}
          <h1 className="ss-heading max-w-4xl text-3xl font-bold leading-tight sm:text-[2.6rem]">{post.title}</h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-3">
              {author?.avatarUrl ? (
                <Image src={author.avatarUrl} alt={author.name ?? ''} width={64} height={64} unoptimized className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <div className="h-16 w-16 rounded-full bg-white/20" />
              )}
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-white/70">Written By</span>
                <span className="ss-heading font-semibold">{post.authorName ?? 'Soft Suave'}</span>
              </div>
            </div>
            <div className="hidden h-11 w-px bg-white/30 sm:block" />
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wide text-white/70">Published on</span>
              <span className="ss-heading font-semibold">{formatDate(post.publishedAt)}</span>
            </div>
            {wasUpdated(post.publishedAt, post.updatedAt) && (
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-white/70">Updated on</span>
                <span className="ss-heading font-semibold">{formatDate(post.updatedAt)}</span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wide text-white/70">Read time</span>
              <span className="ss-heading font-semibold">{post.readingTimeMinutes} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured image (1200×630, WebP from the media pipeline) */}
      {post.coverImageUrl && (
        <div className="mx-auto max-w-[1320px] px-4 pt-10">
          <figure className="relative aspect-[1200/630] overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={post.coverImageUrl}
              alt={post.coverAlt ?? post.title}
              fill
              priority
              sizes="(max-width: 1320px) 100vw, 1320px"
              className="object-cover"
            />
          </figure>
        </div>
      )}

      {/* Body: content + sticky sidebar */}
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="rendered-content text-[1.05rem] leading-relaxed text-neutral-800" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

          {post.tags.length > 0 && (
            <div className="mt-10 border-t pt-6">
              <h4 className="ss-heading mb-2 font-bold">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <Link key={t.slug} href={`/tag/${t.slug}`} className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700 hover:bg-neutral-200">
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {author && (author.bio || author.title) && (
            <div className="mt-10 flex flex-wrap gap-4 rounded-xl border bg-neutral-50 p-6">
              {author.avatarUrl && (
                <Image src={author.avatarUrl} alt={author.name ?? ''} width={72} height={72} unoptimized className="h-16 w-16 shrink-0 rounded-full object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <p className="ss-heading text-lg font-bold">{author.name}</p>
                {author.title && <p className="text-sm font-semibold text-[#ff0042]">{author.title}</p>}
                {author.bio && <p className="mt-2 text-sm text-neutral-600">{author.bio}</p>}
                {author.socialLinks.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-3 text-sm">
                    {author.socialLinks.map((s) => (
                      <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#ff0042] hover:underline">
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sticky sidebar: TOC first (most useful while reading), then share + CTA.
            The aside itself doesn't scroll — the TOC box scrolls internally, so the
            cards below stay pinned in the viewport. */}
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          {post.toc.length > 1 && <PostToc items={post.toc} />}

          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <ShareButtons title={post.title} />
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#ff0042] to-[#c0003a] p-5 text-white shadow-lg shadow-[#ff0042]/20">
            <p className="ss-heading text-lg font-bold leading-snug">Need a dev team?</p>
            <p className="mt-1 text-sm text-white/90">Hire vetted developers & AI experts with Soft Suave.</p>
            <a
              href="https://www.softsuave.com/contact"
              className="ss-heading mt-4 inline-block rounded-full bg-white px-4 py-2 text-sm font-bold text-[#ff0042] transition-transform hover:scale-105"
            >
              Let&apos;s Connect →
            </a>
          </div>
        </aside>
      </div>

      {/* Related content + prev/next, full width below the body grid */}
      <div className="mx-auto max-w-[1320px] px-4 pb-14">
        {relatedPosts && relatedPosts.length > 0 && (
          <section aria-labelledby="related-blogs" className="border-t pt-10">
            <h2 id="related-blogs" className="ss-heading mb-6 text-2xl font-bold text-neutral-900">Related Blogs</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedPosts.map((p) => (
                <SoftSuavePostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        <section aria-label="Related services and case studies" className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="ss-heading mb-4 text-xl font-bold text-neutral-900">Related Services</h2>
            <ul className="space-y-3">
              {RELATED_SERVICES.map((s) => (
                <li key={s.href}>
                  <a href={navHref(s.href)} className="group block">
                    <span className="ss-heading font-semibold text-neutral-800 group-hover:text-[#ff0042]">{s.label} →</span>
                    {s.desc && <span className="block text-sm text-neutral-500">{s.desc}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h2 className="ss-heading mb-4 text-xl font-bold text-neutral-900">Related Case Studies</h2>
            <ul className="space-y-3">
              {RELATED_CASE_STUDIES.map((c) => (
                <li key={c.href}>
                  <a href={navHref(c.href)} className="group block">
                    <span className="ss-heading font-semibold text-neutral-800 group-hover:text-[#ff0042]">{c.label} →</span>
                    {c.desc && <span className="block text-sm text-neutral-500">{c.desc}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {(prev || next) && (
          <div className="mt-10 flex justify-between gap-4 border-t pt-6 text-sm font-medium">
            {prev ? <Link href={`/${prev.slug}`} className="max-w-[46%] hover:text-[#ff0042]">← {prev.title}</Link> : <span />}
            {next ? <Link href={`/${next.slug}`} className="max-w-[46%] text-right hover:text-[#ff0042]">{next.title} →</Link> : <span />}
          </div>
        )}
      </div>
    </article>
  );
}
