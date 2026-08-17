import Link from 'next/link';
import type { ArchiveViewProps } from '../_contract';
import { SoftSuavePostCard } from './post-card';
import { LoadMore } from './load-more';

export function SoftSuaveArchiveView({ site, heading, description, posts, total, filter }: ArchiveViewProps) {
  const isHome = !filter?.category && !filter?.tag;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1a1f] to-[#2a0a14] px-4 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="ss-heading text-3xl font-black leading-tight sm:text-5xl">
            {isHome ? site.tagline ?? 'Embark On A Journey Of Technical Growth With Us!' : heading}
          </h1>
          <p className="mt-4 text-neutral-300">
            {description ?? 'Explore insights and perspectives on the latest trends and technology updates.'}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 py-12">
        {/* Category tabs */}
        {site.categories.length > 0 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <Link
              href="/blog"
              className={`ss-heading rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                isHome ? 'bg-[#ff0042] text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All
            </Link>
            {site.categories.map((c) => {
              const active = filter?.category === c.slug;
              return (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className={`ss-heading rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    active ? 'bg-[#ff0042] text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {c.name}
                </Link>
              );
            })}
          </div>
        )}

        {posts.length === 0 ? (
          <p className="text-center text-neutral-500">No posts yet.</p>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((p, i) => (
                // These archive pages have no hero image, so the first row of
                // cards holds the LCP element. Without preload they lazy-load.
                <SoftSuavePostCard key={p.slug} post={p} preload={i < 2} />
              ))}
            </div>
            {typeof total === 'number' && total > posts.length && (
              <LoadMore shown={posts.length} total={total} filter={filter} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
