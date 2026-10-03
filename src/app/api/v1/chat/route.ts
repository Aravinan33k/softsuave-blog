import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { getClientIp, handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';

/**
 * POST /api/v1/chat — the /contact "Live Chat" panel's backend.
 *
 * softsuave.com's Live Chat is its own AI assistant: the page POSTs
 * `{ session_id, query, ip_address }` to `aichat.zapptor.com/chat` and renders
 * the `answer` it returns. This route forwards to that same service, so the
 * visitor gets the same assistant, with three differences from calling it
 * from the browser the way the live page does:
 *
 *   - the visitor's IP is read here, from the request, rather than by a
 *     browser round trip to a third-party IP lookup (the live page asks
 *     api.ipify.org);
 *   - no new origin has to be admitted to the site's CSP `connect-src`;
 *   - it is rate-limited like every other public write on this API.
 *
 * `CHAT_API_URL` overrides the endpoint; unset uses the live page's own.
 */
export const dynamic = 'force-dynamic';

const CHAT_API_URL = process.env.CHAT_API_URL || 'https://aichat.zapptor.com/chat';

const Body = z.object({
  // The live page's session ids are v4 UUIDs; accept any short opaque id.
  sessionId: z.string().trim().min(8).max(64).regex(/^[A-Za-z0-9-]+$/),
  query: z.string().trim().min(1).max(1000),
});

export async function POST(req: NextRequest) {
  try {
    const limited = await rateLimit(req, { id: 'public-chat', limit: 20, windowMs: 60_000 });
    if (limited) return limited;

    const parsed = Body.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return jsonError(400, 'invalid_input', 'A message is required.');

    const upstream = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        session_id: parsed.data.sessionId,
        query: parsed.data.query,
        ip_address: getClientIp(req) ?? '',
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(30_000),
    }).catch(() => null);

    if (!upstream || !upstream.ok) {
      return jsonError(502, 'upstream_unavailable', 'The chat assistant is unavailable right now.');
    }
    const data = (await upstream.json().catch(() => null)) as { answer?: unknown } | null;
    const answer = typeof data?.answer === 'string' ? data.answer.trim() : '';
    if (!answer) return jsonError(502, 'upstream_unavailable', 'The chat assistant did not reply.');

    return NextResponse.json({ answer });
  } catch (err) {
    return handleRouteError(err, 'api/chat');
  }
}
