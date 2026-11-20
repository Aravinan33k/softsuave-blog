import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { searchPosts } from '@/lib/api/public';
import { searchQuery, postListItemDto, paginationMeta } from '@/lib/api/schemas';

// GET /api/v1/search?q=&page&perPage — MySQL FULLTEXT search over posts.
// The query structure is swappable for Meilisearch/Algolia later (see searchPosts).
export async function GET(req: NextRequest) {
  try {
    const limited = await rateLimit(req, { id: 'public-search', limit: 30, windowMs: 60_000 });
    if (limited) return limited;

    const parsed = searchQuery.safeParse(Object.fromEntries(new URL(req.url).searchParams));
    if (!parsed.success) return jsonError(400, 'invalid_query', 'A non-empty "q" parameter is required.');
    const { q, page, perPage } = parsed.data;

    const { data, total, ignoredTerms } = await searchPosts(q, { page, perPage });
    return NextResponse.json(
      // `ignoredTerms` tells a consumer why a term matched nothing — MySQL
      // FULLTEXT cannot index tokens below innodb_ft_min_token_size, so an empty
      // result for "AI" is a limitation, not an absence of content.
      { data: postListItemDto.array().parse(data), pagination: paginationMeta(page, perPage, total), query: q, ignoredTerms },
      { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120' } },
    );
  } catch (err) {
    return handleRouteError(err, 'api/search');
  }
}
