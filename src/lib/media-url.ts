import { BASE_PATH } from './flags';

// Stored media URLs are deliberately root-relative ("/uploads/2026/08/x.webp") so
// the database stays deployment-agnostic — moving the app to a subdomain, or under
// a subpath, then needs no data migration. Any mount prefix is applied here, at the
// point of rendering.
//
// With BASE_PATH empty (the app owns the domain root) every function below is a
// pass-through. They are still the single place that knows about the mount, so a
// future subpath deployment is one constant away: the app was briefly served at
// /blog, where an unprefixed URL broke next/image outright — it resolves local
// sources against the app's own served paths, so a bad src is rejected with an
// HTTP 400 rather than merely 404ing. Plain <img> tags in post HTML and every
// hand-written fetch() need the same treatment.
//
// Absolute URLs (Cloudinary, S3/R2) are returned untouched — they are already
// complete and must never be prefixed.

/**
 * Prefix a site-absolute app path with the mount subpath.
 *
 * `basePath` only rewrites URLs Next itself generates — <Link> hrefs, router
 * navigation, next/image sources, framework assets. A hand-written `fetch('/api/…')`
 * is left exactly as typed, so under a subpath mount it resolves above the app and
 * 404s. Every browser-side request to our own routes must go through here.
 */
export function appPath(path: string): string {
  if (!BASE_PATH) return path; // mounted at the root — nothing to prefix
  if (/^(https?:)?\/\//.test(path)) return path; // absolute — not ours to prefix
  if (!path.startsWith('/')) return path;
  if (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`)) return path; // idempotent
  return `${BASE_PATH}${path}`;
}

/** Prefix a stored media URL with the mount subpath. Absolute URLs pass through. */
export function publicMediaUrl(url: string): string;
export function publicMediaUrl(url: null | undefined): null;
export function publicMediaUrl(url: string | null | undefined): string | null;
export function publicMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (!BASE_PATH) return url;
  if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) return url;
  if (!url.startsWith('/')) return url; // not a site-absolute path; leave alone
  if (url === BASE_PATH || url.startsWith(`${BASE_PATH}/`)) return url; // already prefixed
  return `${BASE_PATH}${url}`;
}

/**
 * Apply the same prefix to media referenced inside stored post HTML.
 *
 * Only src/srcset attributes pointing at /uploads are touched: rewriting every
 * root-relative URL would also mangle in-content links, and rewriting an
 * already-prefixed path would double it.
 */
export function withMediaBasePath(html: string): string {
  if (!BASE_PATH) return html;
  return html.replace(
    /(\s(?:src|srcset)\s*=\s*["'])(\/uploads\/)/gi,
    (_m, attr: string, path: string) => `${attr}${BASE_PATH}${path}`,
  );
}
