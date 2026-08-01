import type { Metadata } from 'next';
import { getSiteInfo } from '@/lib/public/queries';
import { getActiveTheme } from '@/lib/public/theme';
import { searchPosts } from '@/lib/api/public';
import type { PostSummary } from '@/themes/_contract';

// Public search UI over the Postgres full-text search used by /api/v1/search.
// Results are noindexed — thin/duplicate search pages should stay out of the index.

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Search: ${q}` : 'Search',
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q: raw } = await searchParams;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim().slice(0, 100) ?? '';

  const [site, theme] = await Promise.all([getSiteInfo(), getActiveTheme()]);
  const { Layout, PostCard } = theme;

  let results: PostSummary[] = [];
  let total = 0;
  let failed = false;
  if (q) {
    try {
      const { data, total: t } = await searchPosts(q, { page: 1, perPage: 12 });
      total = t;
      results = data.map((d) => ({
        slug: d.slug,
        title: d.title,
        excerpt: d.excerpt,
        coverImageUrl: d.coverImage?.url ?? null,
        coverAlt: d.coverImage?.alt ?? null,
        publishedAt: d.publishedAt,
        readingTimeMinutes: d.readingTimeMinutes,
        authorName: d.author.name,
        categories: d.categories,
      }));
    } catch {
      failed = true;
    }
  }

  return (
    <Layout site={site}>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          {q ? <>Search results for &ldquo;{q}&rdquo;</> : 'Search the blog'}
        </h1>

        {/* Progressive-enhancement form: works without client JS */}
        <form action="/search" role="search" className="mt-6 flex max-w-xl gap-2">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search blogs…"
            aria-label="Search blogs"
            className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-4 py-2.5 outline-none focus:border-[#ff0042]"
          />
          <button type="submit" className="rounded-lg bg-[#ff0042] px-5 py-2.5 font-semibold text-white hover:bg-[#d6003a]">
            Search
          </button>
        </form>

        {q && !failed && (
          <p className="mt-6 text-sm text-neutral-500">
            {total === 0 ? 'No results found.' : total > results.length ? `Showing ${results.length} of ${total} results.` : `${total} result${total === 1 ? '' : 's'}.`}
          </p>
        )}
        {failed && <p className="mt-6 text-sm text-neutral-500">Search is temporarily unavailable. Please try again later.</p>}

        {results.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
