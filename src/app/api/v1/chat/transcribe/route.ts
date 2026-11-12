import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { SessionId, chatUpstream, upstreamDetail } from '@/lib/chat/upstream';

/**
 * POST /api/v1/chat/transcribe — a voice recording (multipart `file`, plus an
 * optional `sessionId`) to text, via the assistant's `/transcribe`. The widget
 * records at most 60 seconds of Opus/AAC, well under the size cap here.
 *
 * The assistant answers silence with a 422 and a `detail` message; that comes
 * back as this API's own error shape with the same status, so the widget can
 * show it or quietly listen again.
 */
export const dynamic = 'force-dynamic';

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const limited = await rateLimit(req, { id: 'public-chat-voice', limit: 30, windowMs: 60_000 });
    if (limited) return limited;

    const form = await req.formData().catch(() => null);
    const file = form?.get('file');
    if (!(file instanceof Blob) || file.size === 0) {
      return jsonError(400, 'invalid_input', 'A recording is required.');
    }
    if (file.size > MAX_BYTES) return jsonError(413, 'too_large', 'That recording is too long.');
    if (file.type && !file.type.startsWith('audio/')) {
      return jsonError(400, 'invalid_input', 'The recording must be audio.');
    }

    const body = new FormData();
    body.append('file', file, file instanceof File && file.name ? file.name : 'voice.webm');
    const sessionId = SessionId.safeParse(form?.get('sessionId'));
    if (sessionId.success) body.append('session_id', sessionId.data);

    const upstream = await chatUpstream('/transcribe', { method: 'POST', body, timeoutMs: 60_000 });
    if (!upstream) {
      return jsonError(502, 'upstream_unavailable', "Couldn't transcribe that, please try again.");
    }
    if (!upstream.ok) {
      const detail = await upstreamDetail(upstream);
      const status = upstream.status === 422 ? 422 : 502;
      return jsonError(status, 'transcription_failed', detail ?? "Couldn't transcribe that, please try again.");
    }

    const data = (await upstream.json().catch(() => null)) as { text?: unknown } | null;
    return NextResponse.json({ text: typeof data?.text === 'string' ? data.text : '' });
  } catch (err) {
    return handleRouteError(err, 'api/chat/transcribe');
  }
}
