import { NextResponse, type NextRequest } from 'next/server';
import { env } from '@/lib/env';
import { handleRouteError, jsonError } from '@/lib/http';
import { revalidateContent } from '@/lib/revalidate';

// POST /api/v1/revalidate — on-demand ISR revalidation webhook.
// Auth: `Authorization: Bearer <REVALIDATE_SECRET>` or `?secret=`.
// Body: { paths?: string[] } — extra paths to revalidate (home + feeds always).
function authorized(req: NextRequest): boolean {
  const bearer = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  const secret = bearer || new URL(req.url).searchParams.get('secret');
  return !!secret && secret === env.REVALIDATE_SECRET;
}

export async function POST(req: NextRequest) {
  try {
    if (!authorized(req)) return jsonError(401, 'unauthorized', 'Invalid secret.');
    const body = await req.json().catch(() => ({}));
    const paths = Array.isArray(body?.paths) ? body.paths.filter((p: unknown): p is string => typeof p === 'string') : [];
    revalidateContent(paths);
    return NextResponse.json({ revalidated: true, paths: ['/', '/sitemap.xml', '/rss.xml', ...paths] });
  } catch (err) {
    return handleRouteError(err, 'revalidate');
  }
}
