import 'server-only';
import { NextResponse } from 'next/server';
import { env } from './env';
import { getClientIp } from './http';

// Pluggable rate limiter: in-memory fixed-window for dev/single-instance, or
// Upstash Redis (via REST) for serverless/multi-instance production. The memory
// store is per-process, so it does NOT rate-limit correctly across serverless
// instances — use RATE_LIMIT_DRIVER=upstash in production.

interface Bucket {
  count: number;
  resetAt: number;
}

const memory = new Map<string, Bucket>();

function consumeMemory(key: string, windowMs: number): Bucket {
  const now = Date.now();
  const existing = memory.get(key);
  if (!existing || existing.resetAt <= now) {
    const bucket: Bucket = { count: 1, resetAt: now + windowMs };
    memory.set(key, bucket);
    // Opportunistic cleanup to bound memory.
    if (memory.size > 10_000) {
      for (const [k, b] of memory) if (b.resetAt <= now) memory.delete(k);
    }
    return bucket;
  }
  existing.count += 1;
  return existing;
}

async function consumeUpstash(key: string, windowMs: number): Promise<Bucket> {
  try {
    const res = await fetch(`${env.UPSTASH_REDIS_REST_URL}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['PEXPIRE', key, String(windowMs), 'NX'],
      ]),
    });
    const data = (await res.json()) as Array<{ result?: number }>;
    const count = Number(data?.[0]?.result ?? 1);
    return { count, resetAt: Date.now() + windowMs };
  } catch {
    // Fail open: never block traffic because the limiter backend is down.
    return { count: 1, resetAt: Date.now() + windowMs };
  }
}

async function consume(key: string, windowMs: number): Promise<Bucket> {
  return env.RATE_LIMIT_DRIVER === 'upstash' ? consumeUpstash(key, windowMs) : consumeMemory(key, windowMs);
}

export interface RateLimitConfig {
  /** Namespace for this limit, e.g. "auth-login". */
  id: string;
  limit: number;
  windowMs: number;
}

/**
 * Enforce a rate limit keyed by (id, client IP). Returns a ready-to-return 429
 * NextResponse when exceeded, or null when the request may proceed.
 */
export async function rateLimit(req: Request, cfg: RateLimitConfig): Promise<NextResponse | null> {
  const ip = getClientIp(req) ?? 'unknown';
  const key = `rl:${cfg.id}:${ip}`;
  const { count, resetAt } = await consume(key, cfg.windowMs);
  const resetSeconds = Math.ceil(resetAt / 1000);

  if (count > cfg.limit) {
    return NextResponse.json(
      { error: { code: 'rate_limited', message: 'Too many requests. Please slow down.' } },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.max(1, Math.ceil((resetAt - Date.now()) / 1000))),
          'X-RateLimit-Limit': String(cfg.limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(resetSeconds),
        },
      },
    );
  }

  return null;
}
