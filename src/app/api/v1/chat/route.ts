import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { getClientIp, handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { SessionId, chatUpstream } from '@/lib/chat/upstream';

/**
 * POST /api/v1/chat — one answer from the Soft Suave assistant (see
 * lib/chat/upstream), whole. The chat widget asks `/api/v1/chat/stream` first
 * and only falls back here when the assistant has no streaming endpoint, the
 * same fallback softsuave.com's widget makes.
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

    const upstream = await chatUpstream('/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        session_id: parsed.data.sessionId,
        query: parsed.data.query,
        ip_address: getClientIp(req) ?? '',
      }),
      timeoutMs: 60_000,
    });

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
