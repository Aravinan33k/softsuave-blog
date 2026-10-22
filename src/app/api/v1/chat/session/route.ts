import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { SessionId, chatUpstream } from '@/lib/chat/upstream';

/**
 * DELETE /api/v1/chat/session?sessionId=… — ends a chat session at the
 * assistant (`/close-session`), as softsuave.com's widget does when the
 * visitor confirms "end the session", or after an hour without activity.
 */
export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
  try {
    const limited = await rateLimit(req, { id: 'public-chat-session', limit: 20, windowMs: 60_000 });
    if (limited) return limited;

    const sessionId = SessionId.safeParse(req.nextUrl.searchParams.get('sessionId'));
    if (!sessionId.success) return jsonError(400, 'invalid_input', 'A session id is required.');

    const upstream = await chatUpstream(
      `/close-session?session_id=${encodeURIComponent(sessionId.data)}`,
      { method: 'DELETE', timeoutMs: 15_000 },
    );
    if (!upstream || !upstream.ok) {
      return jsonError(502, 'upstream_unavailable', 'The session could not be closed.');
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleRouteError(err, 'api/chat/session');
  }
}
