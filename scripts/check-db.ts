import 'dotenv/config';
import mariadb from 'mariadb';
import { env } from '../src/lib/env';

/**
 * MySQL preflight: `npm run db:check`
 *
 * Exists because the connection pool hides the one fact you need. When the app
 * cannot reach MySQL, every query fails with
 * `ER_GET_CONNECTION_TIMEOUT: pool timeout ... after 5000ms` — the pool retries
 * connection creation internally and reports its own acquire timeout, discarding
 * the underlying cause. A wrong password, a missing database, a firewalled port
 * and a TLS handshake failure are indistinguishable, and all of them look like a
 * pool-sizing problem, which is the wrong thing to go and debug.
 *
 * This connects directly (no pool), so the real driver error surfaces, and then
 * checks the handful of server settings this app actually depends on.
 */

const u = new URL(env.DATABASE_URL);
const database = decodeURIComponent(u.pathname.replace(/^\//, ''));

function ssl() {
  if (env.DATABASE_SSL === 'disable') return undefined;
  if (env.DATABASE_SSL === 'no-verify') return { rejectUnauthorized: false };
  return env.DATABASE_SSL_CA ? { ca: env.DATABASE_SSL_CA, rejectUnauthorized: true } : true;
}

const base = {
  host: u.hostname,
  port: u.port ? Number(u.port) : 3306,
  user: decodeURIComponent(u.username),
  password: decodeURIComponent(u.password),
  timezone: 'Z',
  connectTimeout: 5_000,
  ssl: ssl(),
};

const problems: string[] = [];
const ok = (m: string) => console.log(`  ✓ ${m}`);
const bad = (m: string) => {
  console.log(`  ✗ ${m}`);
  problems.push(m);
};
const warn = (m: string) => console.log(`  ! ${m}`);

function describe(e: unknown): string {
  const err = e as { code?: string; errno?: number; message?: string };
  return `[${err.code ?? err.errno ?? 'unknown'}] ${String(err.message ?? e).split('\n')[0]}`;
}

async function main() {
  // Password deliberately not printed.
  console.log(`Checking ${base.user}@${base.host}:${base.port}/${database} (TLS: ${env.DATABASE_SSL})\n`);

  // 1. Reach the server and authenticate, with no database selected — separates
  //    "cannot log in" from "database missing or not granted".
  let conn: mariadb.Connection;
  try {
    conn = await mariadb.createConnection(base);
    ok('server reachable, credentials accepted');
  } catch (e) {
    bad(`cannot connect: ${describe(e)}`);
    const code = (e as { code?: string }).code;
    if (code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n    The user does not exist or the password is wrong. As root:');
      console.log(`      CREATE USER '${base.user}'@'${base.host === 'localhost' ? 'localhost' : '%'}' IDENTIFIED BY '<the password in .env>';`);
    } else if (code === 'ECONNREFUSED') {
      console.log('\n    Nothing is listening there. Check the MySQL service and the port.');
    } else if (code === 'ETIMEDOUT') {
      console.log('\n    No response — usually a firewall or security-group rule.');
    } else if (String((e as Error).message).includes('SSL')) {
      console.log('\n    TLS handshake failed. With a self-signed server certificate, set');
      console.log('    DATABASE_SSL_CA to the CA PEM, or DATABASE_SSL=disable for loopback dev.');
    }
    process.exitCode = 1;
    return;
  }

  try {
    const [srv] = await conn.query(
      'SELECT VERSION() v, @@innodb_ft_min_token_size ftmin, @@lower_case_table_names lctn',
    );

    const major = Number(String(srv.v).split('.')[0]);
    if (major >= 8) ok(`MySQL ${srv.v}`);
    else bad(`MySQL ${srv.v} — 8.0+ required (window functions, InnoDB FULLTEXT)`);

    // The single easiest thing to forget on a new server, and it fails silently:
    // short terms just stop matching, with no error anywhere.
    const ftmin = Number(srv.ftmin);
    if (ftmin === env.SEARCH_MIN_TOKEN_SIZE) {
      ok(`innodb_ft_min_token_size=${ftmin}, matches SEARCH_MIN_TOKEN_SIZE`);
    } else {
      bad(
        `innodb_ft_min_token_size=${ftmin} but SEARCH_MIN_TOKEN_SIZE=${env.SEARCH_MIN_TOKEN_SIZE} — ` +
          `terms of ${Math.min(ftmin, env.SEARCH_MIN_TOKEN_SIZE)}–${Math.max(ftmin, env.SEARCH_MIN_TOKEN_SIZE) - 1} chars will silently match nothing`,
      );
    }
    if (Number(srv.lctn) === 2) {
      warn('lower_case_table_names=2 — mixed-case table names resolve inconsistently');
    }

    // 2. TLS actually in effect? `DATABASE_SSL=verify` with a server that does not
    //    offer TLS can still connect unencrypted, which is worth knowing.
    const [cipher] = await conn.query("SHOW STATUS LIKE 'Ssl_cipher'");
    const encrypted = Boolean(cipher?.Value);
    if (env.DATABASE_SSL === 'disable') warn('connection is NOT encrypted (DATABASE_SSL=disable)');
    else if (encrypted) ok(`connection encrypted (${cipher.Value})`);
    else bad(`DATABASE_SSL=${env.DATABASE_SSL} but the connection is not encrypted`);

    // 3. The database itself.
    const dbRows = await conn.query(
      'SELECT DEFAULT_CHARACTER_SET_NAME cs, DEFAULT_COLLATION_NAME co FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = ?',
      [database],
    );
    if (dbRows.length === 0) {
      bad(`database \`${database}\` does not exist (or is not visible to this user)`);
      console.log(`\n    As root:  CREATE DATABASE ${database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
      return;
    }
    if (dbRows[0].cs === 'utf8mb4') ok(`database charset ${dbRows[0].cs}/${dbRows[0].co}`);
    else bad(`database charset is ${dbRows[0].cs}, expected utf8mb4 (emoji and many scripts will not store)`);

    await conn.query(`USE \`${database}\``);

    // 4. Schema state: migrations applied, and the FULLTEXT indexes search needs.
    const tables = await conn.query(
      'SELECT TABLE_NAME t FROM information_schema.TABLES WHERE TABLE_SCHEMA = ?',
      [database],
    );
    const names = new Set(tables.map((r: { t: string }) => r.t));
    if (!names.has('_prisma_migrations')) {
      bad('no migrations applied yet — run `npm run db:migrate` (dev) or `npm run db:deploy` (prod)');
      return;
    }
    ok(`${names.size - 1} table(s) present`);

    const applied = await conn.query(
      'SELECT migration_name n, finished_at f FROM _prisma_migrations ORDER BY started_at',
    );
    const pending = applied.filter((r: { f: Date | null }) => r.f === null);
    if (pending.length === 0) ok(`${applied.length} migration(s) applied, none failed`);
    else bad(`${pending.length} migration(s) did not finish: ${pending.map((r: { n: string }) => r.n).join(', ')}`);

    const fts = await conn.query(
      `SELECT TABLE_NAME t, INDEX_NAME i FROM information_schema.STATISTICS
       WHERE TABLE_SCHEMA = ? AND INDEX_TYPE = 'FULLTEXT' GROUP BY t, i`,
      [database],
    );
    // Two per table: the combined title+excerpt+searchText index and the
    // title-only index used to weight a title hit above a body hit.
    if (fts.length === 4) ok('4 FULLTEXT indexes present on Post and Page');
    else bad(`expected 4 FULLTEXT indexes, found ${fts.length} — search will fail or rank badly`);

    // 5. Rows invisible to search. searchText is written by the application, so
    //    anything loaded outside it (a restored dump, a manual UPDATE) is empty.
    for (const t of ['Post', 'Page']) {
      if (!names.has(t)) continue;
      const [row] = await conn.query(
        `SELECT COUNT(*) total, SUM(searchText = '' AND contentHtml <> '') stale FROM \`${t}\``,
      );
      const stale = Number(row.stale ?? 0);
      if (stale === 0) ok(`${t}: ${row.total} row(s), all indexed for search`);
      else bad(`${t}: ${stale} of ${row.total} row(s) have empty searchText — run \`npm run search:backfill\``);
    }
  } finally {
    await conn.end();
  }
}

main()
  .then(() => {
    if (problems.length === 0) console.log('\n✓ All checks passed.');
    else {
      console.log(`\n✗ ${problems.length} problem(s) found.`);
      process.exitCode = 1;
    }
  })
  .catch((err) => {
    console.error(`\nUnexpected failure: ${describe(err)}`);
    process.exitCode = 1;
  });
