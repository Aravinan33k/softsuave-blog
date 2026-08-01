import type { NextRequest } from 'next/server';
import { CSRF_COOKIE, CSRF_HEADER } from './constants';

// Double-submit-cookie CSRF protection. A non-httpOnly `sb_csrf` cookie is set
// on login/refresh; the admin client echoes it in the `x-csrf-token` header on
// state-changing requests. A cross-site attacker cannot read the cookie (same-
// origin policy) to forge the header, so a matching pair proves same-origin.
// (SameSite=strict on the auth cookies is the primary defence; this is
// defence-in-depth.)

export function generateCsrfToken(): string {
  return crypto.randomUUID().replace(/-/g, '');
}

export const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export function verifyCsrf(req: NextRequest): boolean {
  const cookie = req.cookies.get(CSRF_COOKIE)?.value;
  const header = req.headers.get(CSRF_HEADER);
  return Boolean(cookie && header && cookie === header);
}
