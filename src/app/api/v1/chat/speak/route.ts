import { type NextRequest } from 'next/server';
import { z } from 'zod';
import { handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { SessionId, chatUpstream } from '@/lib/chat/upstream';

/**
 * POST /api/v1/chat/speak — a reply read aloud for voice chat: the
 * assistant's `/speak` MP3, streamed back as it arrives. The widget speaks a
 * reply sentence by sentence (one request each, ≤300 characters), so this
 * route allows far more calls a minute than the chat routes do.
 */
export const dynamic = 'force-dynamic';

const Body = z.object({
  text: z.string().trim().min(1).max(1_000),
  sessionId: SessionId.optional(),
});

export async function POST(req: NextRequest) {
  try {
    const limited = await rateLimit(req, { id: 'public-chat-speak', limit: 120, windowMs: 60_000 });
    if (limited) return limited;

    const parsed = Body.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return jsonError(400, 'invalid_input', 'Text to speak is required.');

    const upstream = await chatUpstream('/speak', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text: parsed.data.text, session_id: parsed.data.sessionId ?? null }),
      timeoutMs: 60_000,
      signal: req.signal,
    });
    if (!upstream || !upstream.ok || !upstream.body) {
      return jsonError(502, 'upstream_unavailable', 'Speech is unavailable right now.');
    }

    return new Response(upstream.body, {
      headers: {
        'content-type': upstream.headers.get('content-type') ?? 'audio/mpeg',
        'cache-control': 'no-store, no-transform',
        'x-accel-buffering': 'no',
      },
    });
  } catch (err) {
    return handleRouteError(err, 'api/chat/speak');
  }
}
