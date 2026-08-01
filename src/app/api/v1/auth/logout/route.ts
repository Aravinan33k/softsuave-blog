import { NextResponse, type NextRequest } from 'next/server';
import { getClientIp, getUserAgent, handleRouteError } from '@/lib/http';
import { logAudit } from '@/lib/audit';
import { revokeByRawToken } from '@/lib/auth/refresh-store';
import { clearAuthCookies } from '@/lib/auth/cookies';
import { REFRESH_COOKIE } from '@/lib/auth/constants';

// POST /api/v1/auth/logout
// Revokes the current refresh-token family and clears the auth cookies.
export async function POST(req: NextRequest) {
  try {
    const raw = req.cookies.get(REFRESH_COOKIE)?.value;
    let userId: string | null = null;
    if (raw) {
      const revoked = await revokeByRawToken(raw);
      userId = revoked?.userId ?? null;
    }
    await logAudit({ action: 'LOGOUT', userId, ipAddress: getClientIp(req), userAgent: getUserAgent(req) });

    const res = NextResponse.json({ ok: true });
    clearAuthCookies(res);
    return res;
  } catch (err) {
    return handleRouteError(err, 'auth/logout');
  }
}
