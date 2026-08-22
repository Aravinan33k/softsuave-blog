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

Next.js 16 (App Router, TS strict) · Tailwind v4 + shadcn/ui · PostgreSQL + Prisma 7 · `jose`
JWT · `@node-rs/argon2` · TipTap · `sharp` · Zod · a storage adapter (local disk in dev,
S3/R2 in prod).

## Prerequisites

- Node.js 20+ (tested on 24)
- Docker (for local Postgres)

## Quick start

```bash
npm install
cp .env.example .env            # adjust secrets
docker compose up -d            # Postgres on host port 5433
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

## Testing

`npm run test` runs Vitest unit tests covering slug/TOC/sanitization, publish-state logic, JWT
sign/verify, CSRF, and Argon2id hashing. CI (`.github/workflows/ci.yml`) runs typecheck, lint,
build, and `npm audit`.

## Deployment

### Vercel

1. Set env vars (all in `.env.example`) in the project settings. Use **`STORAGE_DRIVER=s3`**
   (local disk does not persist on Vercel) and **`RATE_LIMIT_DRIVER=upstash`** (the in-memory
   limiter is per-instance).
2. Point `DATABASE_URL` at a managed Postgres (Neon, Supabase, RDS…). Run `npm run db:deploy`
   from CI or locally against it.
3. Deploy. Add a scheduled job (Vercel Cron) hitting
   `POST /api/v1/cron/publish-scheduled?secret=$REVALIDATE_SECRET` to publish scheduled content.

### Docker (self-host)

```bash
cp .env.example .env            # set real secrets + NEXT_PUBLIC_SITE_URL
docker compose --profile app up -d --build
```

This builds the app image, starts Postgres + the app (port 3000), runs `prisma migrate deploy`
on start, and persists local uploads in the `app_storage` volume. The `app` service reaches
Postgres over the compose network (its `DATABASE_URL` is overridden to use the `postgres` host).

> **Build note:** the production build emits one Turbopack file-tracing warning for the local
> `/uploads` route (it uses `process.cwd()`). It's harmless; on Vercel, use S3 storage and the
> route is unused.

## License / usage

Self-hosted, single-tenant blog platform. See [SECURITY.md](SECURITY.md) for the hardening
summary and [docs/API.md](docs/API.md) for the API.


// Test changes