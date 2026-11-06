import { appPath } from './media-url';

// Minimal browser fetch helper for the admin UI. Auth is cookie-based (same
// origin), so no token handling here. Throws ApiError on non-2xx.

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string | undefined,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

const SAFE = new Set(['GET', 'HEAD', 'OPTIONS']);

/** Double-submit CSRF token for raw fetch() calls (api() attaches it automatically). */
export function csrfToken(): string | null {
  return readCookie('sb_csrf');
}

export async function api<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const isForm = init?.body instanceof FormData;
  const method = (init?.method ?? 'GET').toUpperCase();
  const csrf = SAFE.has(method) ? null : readCookie('sb_csrf');
  // fetch() is not basePath-aware, so every caller can keep writing '/api/v1/…'
  // and have any mount subpath resolved here (a no-op at the domain root).
  const res = await fetch(appPath(url), {
    ...init,
    headers: {
      ...(init?.body && !isForm ? { 'content-type': 'application/json' } : {}),
      ...(csrf ? { 'x-csrf-token': csrf } : {}),
      ...init?.headers,
    },
  });
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) {
    const err = (data as { error?: { code?: string; message?: string } } | null)?.error;
    throw new ApiError(res.status, err?.code, err?.message ?? 'Request failed', err);
  }
  return data as T;
}
