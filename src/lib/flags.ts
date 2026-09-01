/**
 * Build-time feature flags.
 *
 * Deliberately dependency-free (no `zod`, no `server-only`) so it can be
 * imported from client components, the theme layer, and `next.config.ts` alike.
 * `env.ts` can't do that job: it requires `DATABASE_URL`, so importing it from a
 * client component would throw and drag the whole schema into the browser bundle.
 *
 * `NEXT_PUBLIC_*` values are inlined by the compiler, so the read below must
 * stay a literal `process.env.NEXT_PUBLIC_HOMEPAGE_ENABLED` expression —
 * `process.env[key]` would not be substituted. Flipping a flag therefore needs a
 * rebuild, not just a restart.
 */

/**
 * Is the marketing homepage part of this deployment?
 *
 * The blog and the homepage live in one application, but they ship on different
 * dates: the blog goes out first, the homepage a release later. While this is
 * false the homepage code is still built and still passes CI — it is simply not
 * reachable: `/` redirects to `/blog` (see `next.config.ts`), `/` drops out of
 * the sitemap and breadcrumbs, and "home" links resolve to the live marketing
 * site instead of a local route that isn't there yet.
 *
 * Defaults to **off**, so a deployment that forgets the variable hides an
 * unreleased homepage rather than publishing it early. Set
 * `NEXT_PUBLIC_HOMEPAGE_ENABLED=true` at build time to serve it.
 */
export const homepageEnabled = process.env.NEXT_PUBLIC_HOMEPAGE_ENABLED === 'true';

/**
 * Subpath this app is mounted at, mirroring `basePath` in `next.config.ts`.
 *
 * Lives here so next.config, server code and client components share one source
 * of truth. `basePath` prefixes routes and framework assets automatically, but it
 * does NOT touch URLs we store or build ourselves — media URLs in the database and
 * in post HTML are root-relative ("/uploads/…"), so they need this applied
 * explicitly. See `lib/media-url.ts`.
 *
 * Empty outside production: there's no reverse proxy in local dev, so the app
 * serves from the true root there. MUST track `next.config.ts`'s `basePath` —
 * `media-url.ts`'s prefixing and `seo/metadata.ts`'s canonical URLs both degrade
 * to a no-op when this is '', which only holds if the two stay in sync.
 */
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/blog' : '';
