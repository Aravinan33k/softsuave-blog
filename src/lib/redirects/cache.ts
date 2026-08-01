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
// Single-flight guard: without it, every request that arrives while the table is
// being loaded sees an empty/stale cache and fires its own findMany, so each TTL
// expiry produces a burst of identical full-table reads under real traffic.
let inflight: Promise<Map<string, Entry>> | null = null;
const TTL_MS = 30_000;

async function loadMap(): Promise<Map<string, Entry>> {
  const rows = await prisma.redirect.findMany({ select: { fromPath: true, toPath: true, statusCode: true } });
  return new Map(rows.map((r) => [normalizePath(r.fromPath), { toPath: r.toPath, status: r.statusCode }]));
}

function refresh(): Promise<Map<string, Entry>> {
  inflight ??= loadMap()
    .then((map) => {
      cache = { map, at: Date.now() };
      return map;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

export async function lookupRedirect(path: string): Promise<Entry | null> {
  const fresh = cache && Date.now() - cache.at <= TTL_MS;
  if (!fresh) {
    if (cache) {
      // Stale-while-revalidate: this request answers from the stale map rather
      // than blocking on the DB. Redirects tolerate up to one extra TTL of
      // staleness; a blocked response on the hot path is worse.
      void refresh().catch(() => {});
    } else {
      // Cold start — nothing to serve from, so this one waits.
      await refresh();
    }
  }
  return cache?.map.get(normalizePath(path)) ?? null;
}

export function invalidateRedirectCache(): void {
  cache = null;
}
