import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { getTaxonomyBySlug, listPosts } from '@/lib/api/public';
import { paginationQuery, postListItemDto, paginationMeta } from '@/lib/api/schemas';

// GET /api/v1/categories/[slug] — category info + its published posts (paginated).
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const limited = await rateLimit(req, { id: 'public-read', limit: 120, windowMs: 60_000 });
    if (limited) return limited;

    const { slug } = await params;
    const parsed = paginationQuery.safeParse(Object.fromEntries(new URL(req.url).searchParams));
    if (!parsed.success) return jsonError(400, 'invalid_query', 'Invalid query parameters.');
    const { page, perPage } = parsed.data;

    const category = await getTaxonomyBySlug('category', slug);
    if (!category) return jsonError(404, 'not_found', 'Category not found.');

    const { data, total } = await listPosts({ page, perPage, category: slug });
    return NextResponse.json(
      { data: { ...category, posts: postListItemDto.array().parse(data), pagination: paginationMeta(page, perPage, total) } },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
    );
  } catch (err) {
    return handleRouteError(err, 'api/categories/[slug]');
  }
}
