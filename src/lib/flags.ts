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
 * Google Tag Manager container, which is how softsuave.com loads Analytics —
 * the live site has no standalone `gtag.js`, only container `GTM-TWMFSDC`, and
 * everything else is configured inside it. The 11 Sep review asked for the
 * tracking codes to be present on these pages too.
 *
 * Empty by default, and that is deliberate: this is the variable that turns
 * third-party tracking ON, so it is set per deployment rather than compiled in.
 * An unset value means no GTM script, no `dataLayer`, and — because
 * `next.config.ts` reads this same constant — a CSP that still admits no
 * third-party script origin at all. Setting it is the whole switch:
 *
 *   NEXT_PUBLIC_GTM_ID=GTM-TWMFSDC
 *
 * Being a `NEXT_PUBLIC_*` value it is baked in at build time, so turning it on
 * needs a rebuild. Note that GTM will fire for every visitor the moment it is
 * set — if this deployment owes anyone a consent gate, that belongs in the
 * container (or in front of this) before the variable goes into production.
 */
export const gtmContainerId: string = process.env.NEXT_PUBLIC_GTM_ID ?? '';

/**
 * Subpath this app is mounted at, mirroring `basePath` in `next.config.ts`.
 *
 * Empty: the app owns the domain root, so `/` is the marketing homepage, `/blog`
 * the archive and `/uploads/…` media — every URL is served exactly where it is
 * written, and the helpers in `lib/media-url.ts` pass paths through untouched.
 *
 * It is kept as a named constant rather than deleted because it is the single
 * seam for mounting the app under a subpath again (it was briefly at `/blog`).
 * `basePath` prefixes routes and framework assets automatically, but it does NOT
 * touch URLs we store or build ourselves — media URLs in the database and in post
 * HTML are root-relative ("/uploads/…"), and `fetch()` is not basePath-aware — so
 * those go through `lib/media-url.ts`, which applies this. Setting it here and in
 * `next.config.ts` is all a re-mount takes.
 */
// Typed as `string` rather than the literal `''`: the helpers compare paths
// against it, and a literal type would narrow those comparisons into type errors
// here and dead branches the moment the value changes.
export const BASE_PATH: string = '';
