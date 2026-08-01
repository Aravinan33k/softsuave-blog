import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { listTaxonomy } from '@/lib/api/public';
import { taxonomyItemDto } from '@/lib/api/schemas';

// GET /api/v1/tags — tags that have published posts.
export async function GET(req: NextRequest) {
  try {
    const limited = await rateLimit(req, { id: 'public-read', limit: 120, windowMs: 60_000 });
    if (limited) return limited;
    const data = await listTaxonomy('tag');
    return NextResponse.json(
      { data: taxonomyItemDto.array().parse(data) },
      { headers: { 'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600' } },
    );
  } catch (err) {
    return handleRouteError(err, 'api/tags');
  }
}
