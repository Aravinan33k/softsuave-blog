import Link from 'next/link';
import type { ArchiveViewProps } from '../_contract';
import { BANNER_BG } from './banner';
import { ARCHIVE_CARD_SIZES, SoftSuavePostCard } from './post-card';
import { LoadMore } from './load-more';

export function SoftSuaveArchiveView({ site, heading, description, posts, total, filter }: ArchiveViewProps) {
  const isHome = !filter?.category && !filter?.tag;

  // The tabs moved onto the dark hero, so the resting state is a translucent
  // white instead of the light grey it wore against the white page body.
  const pill = (active: boolean) =>
    `ss-heading rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
      active ? 'bg-[#ff0042] text-white' : 'border border-white/20 bg-white/10 text-white hover:bg-white/20'
    }`;

  return (
    <div>
      {/* The backdrop is a CSS background, so the preload scanner cannot see it,
          and it is this page's LCP element. Ask for it explicitly. React hoists
          rel=preload links into <head>. */}
      <link rel="preload" as="image" href={BANNER_BG} fetchPriority="high" />

      {/* Hero: full-bleed backdrop, left-aligned copy, category tabs inside. */}
      <section
        className="bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.88), rgba(0,0,0,0.55)), url(${BANNER_BG})` }}
      >
        <div className="mx-auto max-w-[1320px] px-4 py-14 text-white sm:py-20">
          <div className="max-w-4xl">
            <h1 className="ss-heading text-3xl font-bold leading-tight sm:text-[2.6rem]">
              {isHome ? site.tagline ?? 'Embark On A Journey Of Technical Growth With Us!' : heading}
            </h1>
            <p className="mt-4 text-neutral-300">
              {description ?? 'Explore insights and perspectives on the latest trends and technology updates.'}
            </p>
          </div>

          {site.categories.length > 0 && (
            <nav aria-label="Post categories" className="mt-10">
              <div className="flex items-center gap-4">
                <h2 className="ss-heading whitespace-nowrap font-bold">Category:</h2>
                {/* Decorative rule. Capped so it echoes the live design rather
                    than stretching the full width of a wide viewport. */}
                <span aria-hidden className="h-px max-w-2xl flex-1 bg-white/30" />
              </div>
              <ul className="mt-5 flex flex-wrap gap-3">
                <li>
                  {/* "/blog" — the unfiltered archive. "/" is the marketing homepage. */}
                  <Link href="/blog" className={pill(isHome)} aria-current={isHome ? 'page' : undefined}>
                    All
                  </Link>
                </li>
                {site.categories.map((c) => {
                  const active = filter?.category === c.slug;
                  return (
                    <li key={c.slug}>
                      <Link
                        href={`/category/${c.slug}`}
                        className={pill(active)}
                        aria-current={active ? 'page' : undefined}
                      >
                        {c.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-4 py-12">
        {posts.length === 0 ? (
          <p className="text-center text-neutral-500">No posts yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              // The hero backdrop is the LCP element now and carries the preload,
              // so the cards stay lazy — eager first-row fetches would only
              // compete with it for bandwidth.
              <SoftSuavePostCard key={p.slug} post={p} sizes={ARCHIVE_CARD_SIZES} />
            ))}
            {/* Inside the grid so loaded cards continue the same column flow. */}
            {typeof total === 'number' && total > posts.length && (
              <LoadMore shown={posts.length} total={total} filter={filter} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
