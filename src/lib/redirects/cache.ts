import 'server-only';
import { prisma } from '../db';
import { normalizePath } from '../validation/redirect';

// In-memory redirect lookup with a short TTL, so the proxy doesn't hit the DB on
// every request. Invalidated on write from the redirects admin API.

interface Entry {
  toPath: string;
  status: number;
}

let cache: { map: Map<string, Entry>; at: number } | null = null;
const TTL_MS = 30_000;

export async function lookupRedirect(path: string): Promise<Entry | null> {
  const now = Date.now();
  if (!cache || now - cache.at > TTL_MS) {
    const rows = await prisma.redirect.findMany({ select: { fromPath: true, toPath: true, statusCode: true } });
    cache = {
      at: now,
      map: new Map(rows.map((r) => [normalizePath(r.fromPath), { toPath: r.toPath, status: r.statusCode }])),
    };
  }
  return cache.map.get(normalizePath(path)) ?? null;
}

export function invalidateRedirectCache(): void {
  cache = null;
}
