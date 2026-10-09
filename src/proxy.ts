import { NextResponse, type NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/auth/tokens';
import { ACCESS_COOKIE, CSRF_COOKIE } from '@/lib/auth/constants';
import { verifyCsrf, generateCsrfToken, SAFE_METHODS } from '@/lib/auth/csrf';
import { useSecureCookies } from '@/lib/http';
import { lookupRedirect } from '@/lib/redirects/cache';
import { rateLimit } from '@/lib/rate-limit';
import { databaseConfigured } from '@/lib/env';

// Next 16's `proxy` convention (Node.js runtime). Two responsibilities:
//   1. Gate the admin dashboard + admin API (verify the access-token JWT).
//   2. Serve 301/302 redirects from the Redirect table on public paths.
// Route handlers still re-verify auth (this is the outer gate, not the only one).

const LOGIN_PATH = '/admin/login';

// Shown for every /admin page when no database is configured (lib/env.ts):
// without one there are no users, posts or settings to manage. Answered here,
// before any page code runs, because the login page and dashboard layout both
// query the database directly.
const NO_DATABASE_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Admin unavailable</title></head><body style="font-family:system-ui,sans-serif;max-width:32rem;margin:15vh auto;padding:0 1rem;color:#1a1a1a"><h1 style="font-size:1.5rem">Admin is unavailable</h1><p>This deployment has no database configured, so the admin dashboard is turned off. Set <code>DATABASE_URL</code> (and the auth secrets) to enable it.</p></body></html>`;

async function guardAdmin(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  if (!databaseConfigured) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: { code: 'database_unavailable', message: 'This feature is not available right now.' } },
        { status: 503 },
      );
    }
    return new NextResponse(NO_DATABASE_HTML, {
      status: 503,
      headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
    });
  }

  if (pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`)) {
    return NextResponse.next();
  }

  // Rate-limit the admin API surface.
  if (pathname.startsWith('/api/')) {
    const limited = await rateLimit(req, { id: 'admin-api', limit: 300, windowMs: 60_000 });
    if (limited) return limited;
  }

  const token = req.cookies.get(ACCESS_COOKIE)?.value;
  const claims = token ? await verifyAccessToken(token) : null;

  if (!claims) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: { code: 'unauthenticated', message: 'Authentication required.' } }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.search = '';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // CSRF: enforce double-submit token on state-changing admin API requests.
  if (pathname.startsWith('/api/') && !SAFE_METHODS.has(req.method)) {
    if (!verifyCsrf(req)) {
      return NextResponse.json({ error: { code: 'csrf_failed', message: 'Invalid or missing CSRF token.' } }, { status: 403 });
    }
  }

  const headers = new Headers(req.headers);
  headers.set('x-user-id', claims.sub);
  headers.set('x-user-role', claims.role);
  const res = NextResponse.next({ request: { headers } });

  // Ensure a CSRF cookie exists for this authenticated session.
  if (!req.cookies.get(CSRF_COOKIE)?.value) {
    res.cookies.set(CSRF_COOKIE, generateCsrfToken(), {
      httpOnly: false,
      secure: useSecureCookies,
      sameSite: 'strict',
      path: '/',
    });
  }
  return res;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/api/v1/admin')) {
    return guardAdmin(req);
  }

  // Public paths: consult the redirect table (GET/HEAD only).
  if (req.method === 'GET' || req.method === 'HEAD') {
    const hit = await lookupRedirect(pathname);
    if (hit) {
      const destination = /^https?:\/\//.test(hit.toPath)
        ? hit.toPath
        : new URL(hit.toPath, req.nextUrl.origin);
      return NextResponse.redirect(destination, hit.status);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/v1/admin/:path*',
    // Public content paths for redirect handling; excludes internal + asset routes.
    '/((?!api|_next|admin|uploads|og|preview|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|css|js|woff2?)$).*)',
  ],
};
