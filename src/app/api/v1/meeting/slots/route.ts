import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError, jsonError } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { fetchSlots, isValidTimeZone, neetocalEnabled } from '@/lib/neetocal';

/**
 * GET /api/v1/meeting/slots?tz=Asia/Kolkata — open meeting slots for the
 * /contact "Schedule Meeting" card, proxied from NeetoCal (see lib/neetocal)
 * so the API key stays on the server. Slots come back already in `tz`.
 */
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const limited = await rateLimit(req, { id: 'public-meeting-slots', limit: 30, windowMs: 60_000 });
    if (limited) return limited;
    if (!neetocalEnabled) return jsonError(503, 'unavailable', 'Scheduling is not configured.');

    const tz = req.nextUrl.searchParams.get('tz') ?? 'UTC';
    if (tz.length > 64 || !isValidTimeZone(tz)) return jsonError(400, 'invalid_input', 'Unknown time zone.');

    const days = await fetchSlots(tz);
    return NextResponse.json({ timeZone: tz, days });
  } catch (err) {
    return handleRouteError(err, 'api/meeting/slots');
  }
}
