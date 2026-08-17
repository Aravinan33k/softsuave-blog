import 'server-only';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from './env';

// Prisma 7 uses the query compiler + a driver adapter (no Rust engine binary).
// We pass the pg adapter built from DATABASE_URL to the client constructor.
//
// Pool sizing is explicit because node-postgres defaults to
// `connectionTimeoutMillis: 0` — an unbounded wait. Under a query pileup that
// turns pool exhaustion into every request hanging indefinitely instead of a
// fast, visible failure. `max` should stay under Postgres `max_connections`
// divided by the number of app instances.
//
// The build needs a far smaller ceiling than the server does. `next build` fans
// static generation out across one worker PROCESS per CPU, and every worker
// constructs its own pool — so a runtime-sized pool silently multiplies by the
// worker count. Here that was 11 workers × 20 = up to 220 connections against a
// max_connections of 100, which failed prerendering with TooManyConnections.
// Workers render their pages sequentially, so a couple of connections each is
// ample. DATABASE_POOL_MAX overrides both, for deployments that must divide
// max_connections across several instances.
const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
const poolMax = env.DATABASE_POOL_MAX ?? (isBuild ? 2 : 20);

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
  max: poolMax,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

// Reuse a single client across hot-reloads in dev to avoid exhausting connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
