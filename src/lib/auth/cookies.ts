import 'server-only';
import type { NextResponse } from 'next/server';
import { env } from '../env';
import { useSecureCookies } from '../http';
import { ACCESS_COOKIE, REFRESH_COOKIE, REFRESH_COOKIE_PATH, CSRF_COOKIE } from './constants';
import { generateCsrfToken } from './csrf';

// Auth cookies: httpOnly, Secure (in prod), SameSite=strict (per spec). The
// access cookie is site-wide; the refresh cookie is scoped to the auth path.

export function setAuthCookies(
  res: NextResponse,
  tokens: { accessToken: string; refreshToken: string },
): void {
  res.cookies.set(ACCESS_COOKIE, tokens.accessToken, {
    httpOnly: true,
    secure: useSecureCookies,
    sameSite: 'strict',
    path: '/',
    maxAge: env.ACCESS_TOKEN_TTL,
  });
  res.cookies.set(REFRESH_COOKIE, tokens.refreshToken, {
    httpOnly: true,
    secure: useSecureCookies,
    sameSite: 'strict',
    path: REFRESH_COOKIE_PATH,
    maxAge: env.REFRESH_TOKEN_TTL,
  });
  // CSRF token: readable by JS (not httpOnly) so the admin client can echo it.
  res.cookies.set(CSRF_COOKIE, generateCsrfToken(), {
    httpOnly: false,
    secure: useSecureCookies,
    sameSite: 'strict',
    path: '/',
    maxAge: env.REFRESH_TOKEN_TTL,
  });
}

export function clearAuthCookies(res: NextResponse): void {
  res.cookies.set(ACCESS_COOKIE, '', {
    httpOnly: true,
    secure: useSecureCookies,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  res.cookies.set(REFRESH_COOKIE, '', {
    httpOnly: true,
    secure: useSecureCookies,
    sameSite: 'strict',
    path: REFRESH_COOKIE_PATH,
    maxAge: 0,
  });
  res.cookies.set(CSRF_COOKIE, '', {
    httpOnly: false,
    secure: useSecureCookies,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
}
