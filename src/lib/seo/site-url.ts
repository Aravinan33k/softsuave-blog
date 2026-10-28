import { BASE_PATH } from '../flags';

/**
 * `absoluteUrl` for code that ships to the browser.
 *
 * The same rule as `metadata.ts`'s helper, which is `server-only` (it also builds
 * `Metadata` and reads the validated `env`), so it cannot be imported from a client
 * module. This reads `NEXT_PUBLIC_SITE_URL` directly, which Next bakes into the
 * browser bundle at build time and defaults to the production origin exactly as
 * `env.ts` does — so a page's JSON-LD built here matches the one the server builds.
 * `site-url.test.ts` pins the two together.
 */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.softsuave.com').replace(/\/+$/, '');

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path; // already absolute (e.g. S3/R2 URL)
  let p = path.startsWith('/') ? path : `/${path}`;
  if (BASE_PATH) {
    if (p === BASE_PATH) return SITE_URL;
    if (p.startsWith(`${BASE_PATH}/`)) p = p.slice(BASE_PATH.length);
  }
  return p === '/' ? SITE_URL : `${SITE_URL}${p}`;
}
