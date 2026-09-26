# Softsuave Blog CMS

A self-hosted, admin-only **blog publishing platform** — a focused WordPress replacement built
on Next.js. Fast, SEO-first, secure, and swappable-themed, with no public sign-up and none of the
CMS bloat.

## Features

- **Marketing homepage** — the Soft Suave landing page is served at `/` (GSAP + Lenis, statically
  prerendered, no database); the blog archive lives at `/blog`. See
  [docs/homepage/README.md](docs/homepage/README.md).
- **Admin-only auth** — Argon2id passwords, JWT sessions (rotating refresh tokens with reuse
  detection), account lockout, optional **TOTP 2FA**, full audit log. Roles: `ADMIN` / `EDITOR`.
- **Content** — Posts & pages with the free **TipTap** editor, autosave, revision history +
  rollback, scheduled publishing, signed draft preview links, categories & tags, and a media
  library (`sharp` → WebP variants, required alt text, usage-before-delete).
- **SEO out of the box** — per-page Metadata API, dynamic OG images, JSON-LD, `sitemap.xml`,
  `robots.txt`, RSS, canonical/no-index controls, auto table-of-contents, 301 redirects.
- **Swappable themes** — self-contained React theme packages behind a contract; ships with
  **Minimal** and **Magazine**; switch live from settings.
- **Documented REST API** — versioned public read API + admin API, Zod-validated, rate-limited
  (see [docs/API.md](docs/API.md)).
- **Import/Export** — WordPress WXR importer and JSON/Markdown export (no lock-in).
- **Fast** — SSG/ISR public pages with on-demand revalidation, `next/image`, `next/font`.

## Tech stack

Next.js 16 (App Router, TS strict) · Tailwind v4 + shadcn/ui · MySQL 8 + Prisma 7 · `jose`
JWT · `@node-rs/argon2` · TipTap · `sharp` · Zod · a storage adapter (local disk in dev,
S3/R2 in prod).

## Prerequisites

- Node.js 20+ (tested on 24)
- Docker (for local MySQL), or a native MySQL 8.0+

## Quick start

```bash
npm install
cp .env.example .env            # adjust secrets
docker compose up -d            # MySQL on host port 3307
npm run db:migrate              # apply schema
npm run db:seed                 # create the first ADMIN (from SEED_ADMIN_* in .env)
npm run dev                     # http://localhost:3100
```

Open **http://localhost:3100** for the marketing homepage, **/blog** for the post archive, and
**/admin** to sign in (redirects to the login page). Default seeded admin:
`admin@example.com` / `ChangeMe!2026` — change it.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server (port 3100) |
| `npm run build` / `start` | Production build / serve |
| `npm run typecheck` / `lint` / `test` | TS check / ESLint / Vitest |
| `npm run audit` | Fail on high/critical prod vulnerabilities |
| `npm run db:migrate` / `db:deploy` | Apply migrations (dev / prod) |
| `npm run db:seed` / `db:studio` | Seed first admin / open Prisma Studio |
| `npm run images:home` | Refill the homepage art from Pexels (needs `PEXELS_API_KEY`) |

## Project structure

```
prisma/                 schema, migrations (+ FTS trigger), seed
content/                image manifest for the homepage art pipeline
public/                 homepage art (images/, brand/, videos/)
src/
  app/                  routes: (marketing) homepage, /blog archive, /admin dashboard, /api/v1/*
  themes/               theme contract + registry + Minimal/Magazine/Soft Suave
  lib/                  env, db, auth, storage, content, seo, api, rate-limit, import/export
  lib/home/             homepage content data, GSAP setup, image manifest accessor
  components/           admin UI (shadcn) + seo helpers
  components/home/      homepage sections + its scoped CSS module
docs/API.md             REST API reference
docs/homepage/          homepage design specs + brand tokens
SECURITY.md             hardening summary
```

## First admin

`npm run db:seed` reads `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` / `SEED_ADMIN_NAME`.
Additional accounts are created from the dashboard (**Users**, ADMIN only) — never public
sign-up.

## Themes

Themes live in `src/themes/<id>/` and implement the contract in `src/themes/_contract.ts`
(`Layout`, `ArchiveView`, `PostView`, `PostCard`). Register a new theme in
`src/themes/registry.ts`; select the active theme (with a live preview) under **Settings**.

## Storage

Business logic depends only on `StorageAdapter` (`uploadFile`/`deleteFile`/`getUrl`).
- Dev: `STORAGE_DRIVER=local` writes under `.storage/`, served at `/uploads/*`.
- Prod: `STORAGE_DRIVER=s3` with `S3_*` (Cloudflare R2 / AWS S3 / MinIO). Complete
  `src/lib/storage/s3.ts` (upload/delete) with `@aws-sdk/client-s3` — `getUrl` is already done.

## Database (MySQL 8)

Prisma 7 talks to MySQL through the first-party `@prisma/adapter-mariadb` driver adapter
(`src/lib/db.ts`). Requires **MySQL 8.0+** — the app uses window functions and InnoDB
`FULLTEXT`.

### Server setup

The app must **not** connect as `root`. Create a database and a least-privilege user:

```sql
CREATE DATABASE softsuave_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'blog'@'%' IDENTIFIED BY '<strong-password>';
-- DML for the app, plus DDL because `prisma migrate deploy` runs as this user.
-- Drop CREATE/ALTER/INDEX/DROP/REFERENCES if migrations are applied by a separate
-- admin account, which is the safer arrangement.
GRANT SELECT, INSERT, UPDATE, DELETE,
      CREATE, ALTER, INDEX, DROP, REFERENCES
  ON softsuave_blog.* TO 'blog'@'%';
FLUSH PRIVILEGES;
```

Two server settings are load-bearing, both in `my.cnf` (`/etc/mysql/mysql.conf.d/`):

```ini
[mysqld]
# InnoDB will not index tokens shorter than this, so at the default of 3 a search
# for "AI", "UI", "QA" or "Go" returns nothing at all. Must equal
# SEARCH_MIN_TOKEN_SIZE in .env.
innodb_ft_min_token_size = 2
# Keeps anything reading these tables outside the app (mysql CLI, dumps, BI tools)
# in the same UTC frame the app writes in. The app pins its own session to UTC
# regardless, via the driver's `timezone` option.
default_time_zone = '+00:00'
```

Changing `innodb_ft_min_token_size` needs a restart **and** an index rebuild — existing
FULLTEXT indexes keep the old tokenisation until then:

```sql
SET GLOBAL innodb_optimize_fulltext_only = ON;
OPTIMIZE TABLE Post, Page;
SET GLOBAL innodb_optimize_fulltext_only = OFF;
```

### Diagnosing connection problems

```bash
npm run db:check
```

Run this first, always. The connection pool reports its own acquire timeout
(`ER_GET_CONNECTION_TIMEOUT: pool timeout ... after 5000ms`) and **discards the
underlying cause**, so a wrong password, a missing database, a closed port and a
failed TLS handshake all look identical — and all look like a pool-sizing problem,
which is the wrong thing to investigate. `db:check` connects without a pool so the
real driver error surfaces, then verifies the things that fail *silently*:

- server reachable, credentials accepted (distinguishes auth from missing database)
- MySQL 8.0+, and whether the connection is actually encrypted
- **`innodb_ft_min_token_size` matches `SEARCH_MIN_TOKEN_SIZE`** — the easiest thing
  to forget on a new server, and a mismatch produces no error, just short search
  terms that quietly match nothing
- database charset is `utf8mb4`
- migrations applied, none left unfinished, 4 FULLTEXT indexes present
- rows with an empty `searchText` (invisible to search until `search:backfill`)

### Connection security

`DATABASE_SSL` defaults to `verify`, which both encrypts and authenticates the server. Use
`disable` only for a loopback connection in local development. `no-verify` encrypts but accepts
any certificate, so it does **not** protect against a man-in-the-middle — with a self-signed
server certificate, prefer `verify` plus `DATABASE_SSL_CA` (the CA's PEM contents).

### Full-text search

Search is MySQL `FULLTEXT` over a `searchText` column that holds the post body with HTML
stripped. That column is written by the **application** (`renderContent` in
`src/lib/content/service.ts`), not by a database trigger, so any row written outside the normal
write paths — a restored dump, a manual `UPDATE` — is invisible to search until you run:

```bash
npm run search:backfill          # fill rows with an empty searchText
npm run search:backfill -- --all # recompute every row
```

`src/lib/search/fulltext.ts` translates the search box into a BOOLEAN MODE query. Known
differences from the previous Postgres `tsvector` implementation:

| | Postgres (before) | MySQL (now) |
|---|---|---|
| Stemming | yes (`english`) | **none** — approximated with a `term*` prefix wildcard |
| Short terms | indexed | **not indexed** below `innodb_ft_min_token_size` |
| Column weighting | `setweight(A/B/C)` | title-only second `MATCH`, `TITLE_BOOST` in `api/public.ts` |
| `or` | true disjunction | all terms become optional |

Dropped short terms are returned as `ignoredTerms` from `searchPosts` and shown on `/search`, so
an unindexable query reads as "too short to search" rather than "no results".

## Testing

`npm run test` runs Vitest unit tests covering slug/TOC/sanitization, publish-state logic, JWT
sign/verify, CSRF, Argon2id hashing, and the MySQL full-text query builder. CI
(`.github/workflows/ci.yml`) runs typecheck, lint, build, and `npm audit`.

## Deployment

### Vercel

1. Set env vars (all in `.env.example`) in the project settings. Use **`STORAGE_DRIVER=s3`**
   (local disk does not persist on Vercel) and **`RATE_LIMIT_DRIVER=upstash`** (the in-memory
   limiter is per-instance).
2. Point `DATABASE_URL` at a managed MySQL 8 (RDS, Aurora MySQL, Azure Database for MySQL,
   PlanetScale…). Run `npm run db:deploy` from CI or locally against it. Set
   `SEARCH_MIN_TOKEN_SIZE` to match that server’s `innodb_ft_min_token_size`.
3. Deploy. Add a scheduled job (Vercel Cron) hitting
   `POST /api/v1/cron/publish-scheduled?secret=$REVALIDATE_SECRET` to publish scheduled content.

### Docker (self-host)

```bash
cp .env.example .env            # set real secrets + NEXT_PUBLIC_SITE_URL
docker compose --profile app up -d --build
```

This builds the app image, starts MySQL + the app (port 3000), runs `prisma migrate deploy`
on start, and persists local uploads in the `app_storage` volume. The `app` service reaches
MySQL over the compose network (its `DATABASE_URL` is overridden to use the `mysql` host).

> **Build note:** the production build emits one Turbopack file-tracing warning for the local
> `/uploads` route (it uses `process.cwd()`). It's harmless; on Vercel, use S3 storage and the
> route is unused.

## License / usage

Self-hosted, single-tenant blog platform. See [SECURITY.md](SECURITY.md) for the hardening
summary and [docs/API.md](docs/API.md) for the API.


// Test changes