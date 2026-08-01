import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { listPosts } from '@/lib/api/public';
import { postListQuery, postListItemDto, paginationMeta } from '@/lib/api/schemas';

const CACHE = 'public, s-maxage=60, stale-while-revalidate=300';

// GET /api/v1/posts?page&perPage&category&tag — paginated list of published posts.
export async function GET(req: NextRequest) {
  try {
    const limited = await rateLimit(req, { id: 'public-read', limit: 120, windowMs: 60_000 });
    if (limited) return limited;

    const parsed = postListQuery.safeParse(Object.fromEntries(new URL(req.url).searchParams));
    if (!parsed.success) return jsonError(400, 'invalid_query', 'Invalid query parameters.');
    const { page, perPage, category, tag } = parsed.data;

    const { data, total } = await listPosts({ page, perPage, category, tag });
    return NextResponse.json(
      { data: postListItemDto.array().parse(data), pagination: paginationMeta(page, perPage, total) },
      { headers: { 'Cache-Control': CACHE } },
    );
  } catch (err) {
    return handleRouteError(err, 'api/posts');
  }
}
