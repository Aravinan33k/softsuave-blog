import { NextResponse, type NextRequest } from 'next/server';
import { handleRouteError, getClientIp } from '@/lib/http';
import { rateLimit } from '@/lib/rate-limit';
import { countryForIp } from '@/lib/geo/country';
import { DEFAULT_DIAL, dialForCountry } from '@/lib/forms/dial-codes';

/**
 * GET /api/v1/geo — the caller's country and phone calling code, from their IP.
 *
 * The sharpest of the three signals `PhoneField` uses to guess a calling code,
 * and the only one the browser cannot produce by itself. It sits in front of
 * that component's timezone and locale fallbacks rather than replacing them:
 * this route answers from a MaxMind database that a deployment may simply not
 * have installed (see lib/geo/country.ts), and a reader behind a VPN is better
 * served by their machine's own timezone than by the exit node's country.
 *
 * It is a route, and not something resolved while rendering, because every page
 * carrying the enquiry form is statically prerendered: reading the request IP
 * during render would turn all 77 of them dynamic to set one <select>'s default.
 *
 * Always 200. An unknown IP, an absent database or a private address in
 * development all return the default rather than an error — the caller needs a
 * value to preselect, not a diagnosis, and the reader can always override it.
 *
 * Nothing is stored, and nothing is echoed back beyond the country, so this
 * discloses strictly less than the caller already knows about itself.
 */

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Generous next to the enquiry POST's 5/min: this is a read, the browser
    // caches the answer for the session, and someone opening several landing
    // pages in tabs is ordinary behaviour rather than abuse.
    const limited = await rateLimit(req, { id: 'public-geo', limit: 30, windowMs: 60_000 });
    if (limited) return limited;

    const country = await countryForIp(getClientIp(req));
    // `dialForCountry` is null for a country the table does not carry, which is
    // the same situation as not knowing the country at all.
    const dial = (country && dialForCountry(country)) || DEFAULT_DIAL;

    return NextResponse.json(
      { country, dial },
      // Per-IP, so it must never be held in a shared cache in front of the app.
      { headers: { 'Cache-Control': 'private, no-store' } },
    );
  } catch (err) {
    return handleRouteError(err, 'api/geo');
  }
}
