import Link from 'next/link';
import Image from 'next/image';
import type { PostViewProps } from '../_contract';
import { formatDate } from '@/lib/format';
import { ShareButtons } from './share-buttons';
import { ReadingProgress } from './reading-progress';
import { PostToc } from './post-toc';
import { BANNER_BG } from './banner';
import { SoftSuavePostCard } from './post-card';
import { SiteLink } from './site-link';

export function SoftSuavePostView({ post, relatedPosts }: PostViewProps) {
  const author = post.authorProfile;
  const category = post.categories[0];

  return (
    <article>
      <ReadingProgress />
      {/* The site's blog banner artwork, matching the live post pages: shown at
          full vibrancy with no darkening wash, which is what the live markup does
          too — its .banner-overlay exists for featured-photo banners and is not
          rendered for this one. Its own deep-purple end falls on the left, under
          the copy. A CSS background is invisible to the preload scanner and this
          is the LCP element, so ask for it explicitly. */}
      <link rel="preload" as="image" href={BANNER_BG} fetchPriority="high" />
      <div className="bg-cover bg-center" style={{ backgroundImage: `url(${BANNER_BG})` }}>
        <div className="mx-auto max-w-[1320px] px-4 py-14 text-white sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-white/80">
            <ol className="flex flex-wrap items-center">
              <li>
                <SiteLink href="/" className="hover:text-white">Home</SiteLink>
              </li>
              <li className="flex items-center">
                <span aria-hidden className="mx-2">›</span>
                <Link href="/blog" className="hover:text-white">Blog</Link>
              </li>
              {/* Hidden on phones: the category level plus a long post title left
                  no room for the title itself. Kept in the DOM so it still shows
                  from sm up and stays consistent with the BreadcrumbList JSON-LD,
                  which also carries the category. */}
              {category && (
                <li className="hidden items-center sm:flex">
                  <span aria-hidden className="mx-2">›</span>
                  <Link href={`/category/${category.slug}`} className="hover:text-white">{category.name}</Link>
                </li>
              )}
              {/* Not a flex row and not truncated: the chevron and title share one
                  inline flow, so a long title wraps in full instead of ellipsing. */}
              <li className="min-w-0">
                <span aria-hidden className="mx-2">›</span>
                <span aria-current="page" className="text-white">{post.title}</span>
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
          </div>
        </div>
      </div>

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
        <aside className="flex min-w-0 flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
          {/* Desktop only. Below lg the sidebar stacks under the article, where a
              scrollspy TOC sits after the sections it indexes and helps nobody.
              gap (not space-y) spaces the cards, so hiding this one leaves no
              orphan margin above Share — a display:none flex item takes no gap. */}
          {post.toc.length > 1 && <PostToc items={post.toc} className="hidden lg:block" />}

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

      {/* Related blogs, full width below the body grid */}
      <div className="mx-auto max-w-[1320px] px-4 pb-14">
        {relatedPosts && relatedPosts.length > 0 && (
          <section aria-labelledby="related-blogs" className="border-t pt-10">
            <h2 id="related-blogs" className="ss-heading mb-6 text-2xl font-bold text-neutral-900">Related Blogs</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedPosts.map((p) => (
                // Four across in a 1320px container is a ~300px slot, half the
                // card default — without this the browser fetches ~4x the pixels.
                <SoftSuavePostCard
                  key={p.slug}
                  post={p}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 310px"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
