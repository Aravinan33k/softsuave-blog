import 'server-only';
import { z } from 'zod';

/**
 * The Soft Suave chat assistant — the service softsuave.com's own "Soft Suave -
 * Live Chat" widget calls straight from the browser (aichat.zapptor.com). Its
 * OpenAPI lists everything the widget uses: `/chat`, `/chat/stream` (SSE),
 * `/transcribe`, `/speak` (MP3), `/slots` and `/close-session`.
 *
 * The browser never calls it directly here. The site's CSP allows
 * `connect-src 'self'` only, so app/api/v1/chat/* proxies each endpoint, which
 * also lets the server attach the visitor's IP (the live widget asks
 * api.ipify.org for it) and rate-limit every route.
 *
 * `CHAT_API_BASE` points the proxies at another deployment (a local backend on
 * :7000, say). The older `CHAT_API_URL` — the full `/chat` URL — still works.
 */
export const CHAT_API_BASE = (
  process.env.CHAT_API_BASE ||
  process.env.CHAT_API_URL?.replace(/\/chat\/?$/, '') ||
  'https://aichat.zapptor.com'
).replace(/\/+$/, '');

/** The widget's session ids are v4 UUIDs; accept any short opaque id. */
export const SessionId = z.string().trim().min(8).max(64).regex(/^[A-Za-z0-9-]+$/);

/**
 * One request to the assistant. Resolves to `null` when it cannot be reached
 * (network error or timeout), so every route answers that the same way.
 * `signal` lets a route abort upstream when its own caller disconnects.
 */
export function chatUpstream(
  path: string,
  { timeoutMs = 30_000, signal, ...init }: RequestInit & { timeoutMs?: number } = {},
): Promise<Response | null> {
  const timeout = AbortSignal.timeout(timeoutMs);
  return fetch(`${CHAT_API_BASE}${path}`, {
    ...init,
    cache: 'no-store',
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  }).catch(() => null);
}

/** FastAPI's error body is `{ detail }` — a string, or a list of validation errors. */
export async function upstreamDetail(res: Response): Promise<string | null> {
  const body = (await res.json().catch(() => null)) as { detail?: unknown } | null;
  return typeof body?.detail === 'string' ? body.detail : null;
}
