import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { getPostDetail } from '@/lib/api/public';
import { postDetailDto } from '@/lib/api/schemas';

// GET /api/v1/posts/[slug] — a single published post with rendered HTML.
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const limited = await rateLimit(req, { id: 'public-read', limit: 120, windowMs: 60_000 });
    if (limited) return limited;

    const { slug } = await params;
    const post = await getPostDetail(slug);
    if (!post) return jsonError(404, 'not_found', 'Post not found.');

    return NextResponse.json(
      { data: postDetailDto.parse(post) },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
    );
  } catch (err) {
    return handleRouteError(err, 'api/posts/[slug]');
  }
}
