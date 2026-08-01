import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getClientIp, getUserAgent, handleRouteError, jsonError } from '@/lib/http';
import { logAudit } from '@/lib/audit';
import { rotateRefreshToken } from '@/lib/auth/refresh-store';
import { signAccessToken, type Role } from '@/lib/auth/tokens';
import { setAuthCookies, clearAuthCookies } from '@/lib/auth/cookies';
import { REFRESH_COOKIE } from '@/lib/auth/constants';

// POST /api/v1/auth/refresh
// Rotates the refresh token and mints a fresh access token. Reuse of an old
// token revokes the whole family and clears cookies.
export async function POST(req: NextRequest) {
  try {
    const ipAddress = getClientIp(req);
    const userAgent = getUserAgent(req);

    const raw = req.cookies.get(REFRESH_COOKIE)?.value;
    if (!raw) return jsonError(401, 'no_refresh_token', 'Not authenticated.');

    const result = await rotateRefreshToken(raw, { ipAddress, userAgent });

    if (result.status === 'reuse') {
      await logAudit({ action: 'TOKEN_REUSE_DETECTED', userId: result.userId, ipAddress, userAgent, metadata: { family: result.family } });
      const res = jsonError(401, 'session_revoked', 'Session revoked. Please sign in again.');
      clearAuthCookies(res);
      return res;
    }

    if (result.status === 'invalid') {
      const res = jsonError(401, 'invalid_token', 'Not authenticated.');
      clearAuthCookies(res);
      return res;
    }

    const user = await prisma.user.findUnique({
      where: { id: result.userId },
      select: { id: true, email: true, role: true },
    });
    if (!user) {
      const res = jsonError(401, 'invalid_token', 'Not authenticated.');
      clearAuthCookies(res);
      return res;
    }

    const accessToken = await signAccessToken({ id: user.id, email: user.email, role: user.role as Role });
    await logAudit({ action: 'TOKEN_REFRESH', userId: user.id, ipAddress, userAgent });

    const res = NextResponse.json({ ok: true });
    setAuthCookies(res, { accessToken, refreshToken: result.issued.token });
    return res;
  } catch (err) {
    return handleRouteError(err, 'auth/refresh');
  }
}
