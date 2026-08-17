import { BASE_PATH } from './flags';

// The app is mounted at BASE_PATH, so its /uploads route is only served prefixed.
// Stored media URLs are deliberately left root-relative ("/uploads/2026/08/x.webp")
// so the database stays deployment-agnostic — switching to a subdomain, or back to
// the domain root, then needs no data migration. The prefix is applied here, at the
// point of rendering.
//
// This matters most for next/image: it resolves local sources against the app's own
// served paths, so an unprefixed src is rejected outright (HTTP 400) rather than
// merely 404ing. Plain <img> tags in post HTML need the same treatment.
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
  return html.replace(
    /(\s(?:src|srcset)\s*=\s*["'])(\/uploads\/)/gi,
    (_m, attr: string, path: string) => `${attr}${BASE_PATH}${path}`,
  );
}
