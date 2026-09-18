import 'server-only';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { env } from './env';

// Prisma 7 uses the query compiler + a driver adapter (no Rust engine binary).
// MySQL is served by Prisma's first-party `@prisma/adapter-mariadb`, which wraps
// the MariaDB Foundation's `mariadb` driver and speaks to MySQL 8 as well.
//
// Pool sizing is explicit because the defaults are wrong for us in both
// directions: `connectionLimit` defaults to 10, and `acquireTimeout` to 10s of
// waiting for a free connection. Under a query pileup a long acquire timeout
// turns pool exhaustion into slow-hanging requests instead of a fast, visible
// failure. `connectionLimit` should stay under MySQL's `max_connections`
// (default 151) divided by the number of app instances.
//
// The build needs a far smaller ceiling than the server does. `next build` fans
// static generation out across one worker PROCESS per CPU, and every worker
// constructs its own pool — so a runtime-sized pool silently multiplies by the
// worker count. An 11-worker machine at 20 each would ask for 220 connections
// against a max_connections of 151 and fail prerendering with ER_CON_COUNT_ERROR.
// Workers render their pages sequentially, so a couple of connections each is
// ample. DATABASE_POOL_MAX overrides both, for deployments that must divide
// max_connections across several instances.
const isBuild = process.env.NEXT_PHASE === 'phase-production-build';
const poolMax = env.DATABASE_POOL_MAX ?? (isBuild ? 2 : 20);

// TLS. MySQL is reached over the network in production, where an unencrypted
// connection would put credentials and content on the wire in plaintext, so
// DATABASE_SSL defaults to on for anything but a loopback host. `verify` is the
// only setting that actually authenticates the server: with `rejectUnauthorized:
// false` a MITM can present any certificate and the client accepts it, which
// buys encryption but no assurance about who is on the other end. Use `verify`
// with DATABASE_SSL_CA pointing at the server's CA for a self-signed cert.
function sslConfig() {
  if (env.DATABASE_SSL === 'disable') return undefined;
  if (env.DATABASE_SSL === 'no-verify') return { rejectUnauthorized: false };
  return env.DATABASE_SSL_CA ? { ca: env.DATABASE_SSL_CA, rejectUnauthorized: true } : true;
}

const adapter = new PrismaMariaDb({
  // The driver parses the mysql:// URL for host/user/password/database; the
  // options below are merged over whatever it contains.
  ...parseUrl(env.DATABASE_URL),
  connectionLimit: poolMax,
  // Seconds, unlike every other timeout here. Must stay below MySQL's
  // `wait_timeout` (default 28800s) or the server closes connections the pool
  // still believes are live.
  idleTimeout: 60,
  // Milliseconds. Bounded so a saturated pool fails fast instead of queueing.
  acquireTimeout: 5_000,
  connectTimeout: 5_000,
  // Load-bearing, not cosmetic. MySQL DATETIME carries no timezone, so the
  // driver decides how a JS Date becomes a stored value. Left unset it uses the
  // *Node process* timezone, which means the same row reads back shifted
  // whenever the app and the database disagree about local time — and every
  // publishedAt comparison against UTC_TIMESTAMP() silently drifts. 'Z' pins
  // both directions to UTC, matching how Postgres timestamptz behaved.
  timezone: 'Z',
  ssl: sslConfig(),
});

// The driver accepts a connection string, but only as a whole — passing one
// *and* option overrides is not supported, so the URL is decomposed here.
function parseUrl(url: string) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: u.port ? Number(u.port) : 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    // Leading slash trimmed; a mysql:// URL's path is the database name.
    database: decodeURIComponent(u.pathname.replace(/^\//, '')),
  };
}

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
