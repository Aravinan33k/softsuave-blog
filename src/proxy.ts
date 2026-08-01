import { NextResponse, type NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/auth/tokens';
import { ACCESS_COOKIE, CSRF_COOKIE } from '@/lib/auth/constants';
import { verifyCsrf, generateCsrfToken, SAFE_METHODS } from '@/lib/auth/csrf';
import { useSecureCookies } from '@/lib/http';
import { lookupRedirect } from '@/lib/redirects/cache';
import { rateLimit } from '@/lib/rate-limit';

// Next 16's `proxy` convention (Node.js runtime). Two responsibilities:
//   1. Gate the admin dashboard + admin API (verify the access-token JWT).
//   2. Serve 301/302 redirects from the Redirect table on public paths.
// Route handlers still re-verify auth (this is the outer gate, not the only one).

const LOGIN_PATH = '/admin/login';

async function guardAdmin(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

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
