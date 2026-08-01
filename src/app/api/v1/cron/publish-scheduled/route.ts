import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { env } from '@/lib/env';
import { handleRouteError, jsonError } from '@/lib/http';
import { revalidateContent } from '@/lib/revalidate';

// Flips SCHEDULED content whose publishedAt has passed to PUBLISHED. Call on a
// schedule (cron / Vercel Cron). Protected by REVALIDATE_SECRET via
// `Authorization: Bearer <secret>` or `?secret=`.
function isAuthorized(req: NextRequest): boolean {
  const url = new URL(req.url);
  const bearer = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  const secret = bearer || url.searchParams.get('secret');
  return !!secret && secret === env.REVALIDATE_SECRET;
}

async function run() {
  const now = new Date();
  const [posts, pages] = await Promise.all([
    prisma.post.updateMany({ where: { status: 'SCHEDULED', publishedAt: { lte: now } }, data: { status: 'PUBLISHED' } }),
    prisma.page.updateMany({ where: { status: 'SCHEDULED', publishedAt: { lte: now } }, data: { status: 'PUBLISHED' } }),
  ]);
  if (posts.count + pages.count > 0) revalidateContent();
  return { published: { posts: posts.count, pages: pages.count } };
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthorized(req)) return jsonError(401, 'unauthorized', 'Invalid secret.');
    return NextResponse.json(await run());
  } catch (err) {
    return handleRouteError(err, 'cron/publish-scheduled');
  }
}

// Allow GET too, for cron services that only issue GET requests.
export async function GET(req: NextRequest) {
  return POST(req);
}
