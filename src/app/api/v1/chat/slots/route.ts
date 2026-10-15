import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { chatUpstream } from '@/lib/chat/upstream';

/**
 * GET /api/v1/chat/slots — the meeting slots the assistant offers when a
 * visitor asks to book a call: `{ slots: [{ date, slots: { "HH:MM-HH:MM": … } }] }`,
 * times in UTC. The widget converts them to the visitor's own time zone.
 */
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const limited = await rateLimit(req, { id: 'public-chat-slots', limit: 30, windowMs: 60_000 });
    if (limited) return limited;

    const upstream = await chatUpstream('/slots', { timeoutMs: 30_000 });
    const data = upstream?.ok ? ((await upstream.json().catch(() => null)) as { slots?: unknown } | null) : null;
    if (!data || !Array.isArray(data.slots)) {
      return jsonError(502, 'upstream_unavailable', 'Meeting slots are unavailable right now.');
    }
    return NextResponse.json({ slots: data.slots });
  } catch (err) {
    return handleRouteError(err, 'api/chat/slots');
  }
}
