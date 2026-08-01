import 'server-only';
import { redirect } from 'next/navigation';
import { getSession } from './session';
import type { AccessTokenClaims, Role } from './tokens';

// Server-Component / page guards. These redirect (they call next/navigation's
// `redirect`, which throws), so they must only be used inside Server Components,
// layouts, and pages — never in API route handlers (use requireApiRole there).

const LOGIN_PATH = '/admin/login';

/** Require any authenticated session, else redirect to the login page. */
export async function requireSession(): Promise<AccessTokenClaims> {
  const session = await getSession();
  if (!session) redirect(LOGIN_PATH);
  return session;
}

/**
 * Require one of the given roles. Redirects unauthenticated users to login and
 * authenticated-but-unauthorised users back to the dashboard home. This is the
 * server-side enforcement behind role-aware nav — never rely on hidden links.
 */
export async function requireRolePage(...roles: Role[]): Promise<AccessTokenClaims> {
  const session = await requireSession();
  if (roles.length > 0 && !roles.includes(session.role)) redirect('/admin');
  return session;
}
