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
 * May search engines index this deployment?
 *
 * **Off by default — the site is noindex, nofollow for now.** While off, every
 * response carries `X-Robots-Tag: noindex, nofollow` (`next.config.ts`) and
 * every page's robots meta agrees (`pageRobots` below), so nothing here is
 * indexed and no link is followed. `robots.txt` still ALLOWS crawling on
 * purpose: a crawler blocked there never fetches a page, never sees its
 * noindex, and can keep the bare URL in results.
 *
 * Set `NEXT_PUBLIC_ALLOW_INDEXING=true` at build time to open the site to
 * search engines (a rebuild, like every `NEXT_PUBLIC_*` flag).
 */
export const siteIndexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';

/**
 * The robots directive for an ordinary, indexable page. Pages use this rather
 * than a literal `{ index: true, follow: true }` so the `siteIndexable` switch
 * above reaches all of them. Pages that are never indexable (search results,
 * previews) keep their own stricter value.
 */
export const pageRobots = siteIndexable
  ? { index: true, follow: true }
  : { index: false, follow: false };

/**
 * Google Tag Manager container, which is how softsuave.com loads Analytics —
 * the live site has no standalone `gtag.js`, only container `GTM-TWMFSDC`, and
 * everything else is configured inside it. The 11 Sep review asked for the
 * tracking codes to be present on these pages too.
 *
 * On by default: the container is compiled in, so every page the root layout
 * renders — which is every page — loads it, with no per-page code and no
 * per-deployment variable to forget. `next.config.ts` reads this same constant
 * to admit googletagmanager.com in the CSP, so the two cannot drift apart.
 *
 * `NEXT_PUBLIC_GTM_ID` still overrides it: another container ID points the
 * deployment at that container, and `off` disables GTM entirely (no script,
 * no `dataLayer`, no third-party origin in the CSP) — e.g. locally, to keep
 * dev traffic out of the reports. An empty value is treated as unset, so the
 * blank line in `.env.example` does not switch tracking off by accident.
 *
 * Being a `NEXT_PUBLIC_*` value it is baked in at build time; changing it
 * needs a rebuild. GTM fires for every visitor — any consent gate belongs in
 * the container.
 */
const GTM_DEFAULT = 'GTM-TWMFSDC';
const gtmEnv = (process.env.NEXT_PUBLIC_GTM_ID ?? '').trim();
export const gtmContainerId: string = gtmEnv === 'off' ? '' : gtmEnv || GTM_DEFAULT;

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
