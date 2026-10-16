import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { hash, type Options } from '@node-rs/argon2';
import { PrismaClient } from '../src/generated/prisma/client';

// Standalone seed script (run via `npm run db:seed`, and automatically by
// `prisma migrate dev`). Creates the singleton SiteSettings row and the first
// ADMIN user from SEED_ADMIN_* env vars. Password hashing uses Argon2id to match
// the auth layer built in Phase 2.

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set — cannot seed.');
}

// The URL is decomposed rather than handed over whole, because `timezone` has to
// be set alongside it and the driver takes either a connection string or an
// options object, not both. `timezone: 'Z'` matters for the same reason as in
// lib/db.ts: MySQL DATETIME carries no zone, so without it the driver writes rows
// using this machine's local clock and every createdAt/updatedAt lands offset
// from what the app later reads back.
const dbUrl = new URL(connectionString);
const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: dbUrl.port ? Number(dbUrl.port) : 3306,
  user: decodeURIComponent(dbUrl.username),
  password: decodeURIComponent(dbUrl.password),
  database: decodeURIComponent(dbUrl.pathname.replace(/^\//, '')),
  timezone: 'Z',
  connectionLimit: 2,
});
const prisma = new PrismaClient({ adapter });

// Argon2id parameters (also used by the Phase 2 auth lib — keep in sync).
// algorithm 2 = Argon2id (const enum value; passed numerically to stay
// compatible with TypeScript's isolatedModules).
const argon2Options: Options = {
  algorithm: 2,
  memoryCost: 19_456, // 19 MiB
  timeCost: 2,
  parallelism: 1,
};

async function main() {
  // Ensure the single site-settings row exists.
  await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: { id: 'singleton' },
  });
  console.log('✓ SiteSettings singleton ensured.');

  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME ?? 'Site Admin';

  if (!email || !password) {
    console.log('• SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set — skipping admin creation.');
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`• Admin user already exists: ${email}`);
    return;
  }

  const passwordHash = await hash(password, argon2Options);
  await prisma.user.create({
    data: { email, name, passwordHash, role: 'ADMIN' },
  });
  console.log(`✓ Created ADMIN user: ${email}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
