import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { prisma } from '@/lib/db';
import { importWordpressRest, fetchWpTotal } from '@/lib/import/wordpress-rest';
import { revalidateContent } from '@/lib/revalidate';

// Pull content straight from the live WordPress REST API, one batch at a time.
// Long-running, so the batch streams NDJSON progress instead of buffering.
export const maxDuration = 800;
export const dynamic = 'force-dynamic';

const DEFAULT_BASE = 'https://www.softsuave.com/blog';

/** GET — progress counters for the admin panel. */
export async function GET(req: NextRequest) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;
    const baseUrl = new URL(req.url).searchParams.get('baseUrl') || DEFAULT_BASE;
    const [wpTotal, dbPosts] = await Promise.all([
      fetchWpTotal(baseUrl).catch(() => 0),
      prisma.post.count(),
    ]);
    return NextResponse.json({ wpTotal, dbPosts, baseUrl });
  } catch (err) {
    return handleRouteError(err, 'admin/import/wordpress-rest');
  }
}

/**
 * POST — import ONE batch of up to `limit` NEW posts (already-imported slugs are
 * skipped and don't count), streaming progress lines. Call repeatedly until a
 * batch reports 0 imported, which means the archive is fully migrated.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;

    const body = await req.json().catch(() => ({}));
    const baseUrl = typeof body?.baseUrl === 'string' && body.baseUrl.trim() ? body.baseUrl.trim() : DEFAULT_BASE;
    const limit = Math.min(Math.max(Number(body?.limit) || 50, 1), 200);
    const uploaderId = session.sub;

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const enc = new TextEncoder();
        const send = (obj: unknown) => {
          try {
            controller.enqueue(enc.encode(`${JSON.stringify(obj)}\n`));
          } catch {
            /* client disconnected */
          }
        };
        try {
          const summary = await importWordpressRest({
            baseUrl,
            uploaderId,
            limit,
            onProgress: (message) => send({ type: 'progress', message }),
          });
          // Refresh the public pages for everything just imported.
          revalidateContent(summary.slugs.map((s) => `/${s}`));
          await logAudit({
            action: 'CREATE',
            userId: uploaderId,
            targetType: 'import',
            targetId: 'wordpress-rest',
            req,
            metadata: { imported: summary.posts, media: summary.media, skipped: summary.skipped },
          });
          const dbPosts = await prisma.post.count();
          send({ type: 'done', summary: { ...summary, errors: summary.errors.slice(0, 20) }, dbPosts });
        } catch (e) {
          send({ type: 'error', message: (e as Error).message });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'content-type': 'application/x-ndjson; charset=utf-8',
        'cache-control': 'no-store',
        'x-accel-buffering': 'no',
      },
    });
  } catch (err) {
    return handleRouteError(err, 'admin/import/wordpress-rest');
  }
}
