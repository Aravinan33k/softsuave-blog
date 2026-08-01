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
const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
  max: 20,
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
