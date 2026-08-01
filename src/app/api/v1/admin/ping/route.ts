import { NextResponse, type NextRequest } from 'next/server';
import { requireApiRole } from '@/lib/auth/session';
import { handleRouteError } from '@/lib/http';

// GET /api/v1/admin/ping — authenticated health/whoami check for the admin API.
// Demonstrates server-side authorization: the proxy gates access, and the
// handler independently re-verifies the session via requireApiRole.
export async function GET(req: NextRequest) {
  try {
    const session = await requireApiRole(req); // any authenticated role
    if (session instanceof NextResponse) return session;
    return NextResponse.json({ ok: true, user: { id: session.sub, email: session.email, role: session.role } });
  } catch (err) {
    return handleRouteError(err, 'admin/ping');
  }
}
