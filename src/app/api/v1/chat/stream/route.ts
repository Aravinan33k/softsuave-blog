import { type NextRequest } from 'next/server';
import { z } from 'zod';
import { getClientIp, handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { SessionId, chatUpstream } from '@/lib/chat/upstream';

/**
 * POST /api/v1/chat/stream — the assistant's answer as Server-Sent Events,
 * passed through untouched: `start`, `delta {text}` while the model writes,
 * then `done` (the same fields `/chat` returns; its `answer` is authoritative)
 * or `error`. Booking-flow replies and `{markers}` arrive whole in `done`.
 *
 * A 404 here means the assistant has no streaming endpoint; nothing was
 * processed, so the widget safely retries the turn on `/api/v1/chat`.
 *
 * `no-transform` keeps the compression middleware from buffering the stream,
 * and `X-Accel-Buffering: no` does the same for nginx on the test server.
 */
export const dynamic = 'force-dynamic';

const Body = z.object({
  sessionId: SessionId,
  query: z.string().trim().min(1).max(12_000),
});

export async function POST(req: NextRequest) {
  try {
    const limited = await rateLimit(req, { id: 'public-chat', limit: 20, windowMs: 60_000 });
    if (limited) return limited;

    const parsed = Body.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return jsonError(400, 'invalid_input', 'A message is required.');

    const upstream = await chatUpstream('/chat/stream', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'text/event-stream' },
      body: JSON.stringify({
        session_id: parsed.data.sessionId,
        query: parsed.data.query,
        ip_address: getClientIp(req) ?? '',
      }),
      // The whole answer, not just its first byte: a long reply streams for a while.
      timeoutMs: 120_000,
      signal: req.signal,
    });

    if (upstream && (upstream.status === 404 || upstream.status === 405)) {
      return jsonError(404, 'not_found', 'Streaming is not available.');
    }
    if (!upstream || !upstream.ok || !upstream.body) {
      return jsonError(502, 'upstream_unavailable', 'The chat assistant is unavailable right now.');
    }

    return new Response(upstream.body, {
      headers: {
        'content-type': 'text/event-stream; charset=utf-8',
        'cache-control': 'no-cache, no-transform',
        'x-accel-buffering': 'no',
      },
    });
  } catch (err) {
    return handleRouteError(err, 'api/chat/stream');
  }
}
