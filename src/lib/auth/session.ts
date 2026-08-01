import 'server-only';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { jsonError } from '../http';
import { ACCESS_COOKIE } from './constants';
import { verifyAccessToken, type AccessTokenClaims, type Role } from './tokens';

// Reading the current session. Two entry points: one for route handlers /
// proxy (from a NextRequest) and one for Server Components (async cookies()).
// The access token is authoritative and re-verified here — never trust
// proxy-injected headers alone.

export async function getSessionFromRequest(req: NextRequest): Promise<AccessTokenClaims | null> {
  const token = req.cookies.get(ACCESS_COOKIE)?.value;
  return token ? verifyAccessToken(token) : null;
}

export async function getSession(): Promise<AccessTokenClaims | null> {
  const store = await cookies();
  const token = store.get(ACCESS_COOKIE)?.value;
  return token ? verifyAccessToken(token) : null;
}

export function hasRole(claims: AccessTokenClaims | null, ...roles: Role[]): boolean {
  return claims != null && roles.includes(claims.role);
}

/**
 * Guard for API route handlers. Returns the verified claims, or a ready-to-return
 * NextResponse (401/403). Callers: `const s = await requireApiRole(req, 'ADMIN');
 * if (s instanceof NextResponse) return s;`. With no roles, any authenticated
 * user passes.
 */
export async function requireApiRole(
  req: NextRequest,
  ...roles: Role[]
): Promise<AccessTokenClaims | NextResponse> {
  const claims = await getSessionFromRequest(req);
  if (!claims) return jsonError(401, 'unauthenticated', 'Authentication required.');
  if (roles.length > 0 && !roles.includes(claims.role)) {
    return jsonError(403, 'forbidden', 'Insufficient permissions.');
  }
  return claims;
}
