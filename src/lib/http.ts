import { NextResponse } from 'next/server';
import { env } from './env';

// Response + request helpers. Error responses are deliberately generic — details
// are logged server-side, never leaked to the client.

export function jsonOk<T>(data: T, init?: ResponseInit): NextResponse {
  return NextResponse.json(data, init);
}

export function jsonError(status: number, code: string, message: string, extra?: Record<string, unknown>): NextResponse {
  return NextResponse.json({ error: { code, message, ...extra } }, { status });
}

/** Catch-all for unexpected route errors: log server-side, return opaque 500. */
export function handleRouteError(err: unknown, context: string): NextResponse {
  console.error(`[route error] ${context}:`, err);
  return jsonError(500, 'internal_error', 'Something went wrong.');
}

/** Best-effort client IP from proxy headers. */
export function getClientIp(req: Request): string | null {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() ?? null;
  return req.headers.get('x-real-ip');
}

export function getUserAgent(req: Request): string | null {
  return req.headers.get('user-agent');
}

/** Whether Secure cookies should be set (true in production/HTTPS). */
export const useSecureCookies = env.NODE_ENV === 'production';
