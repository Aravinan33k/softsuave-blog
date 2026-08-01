import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { handleRouteError, jsonError } from '@/lib/http';
import { getSessionFromRequest } from '@/lib/auth/session';

// GET /api/v1/auth/me — the currently authenticated user, or 401.
export async function GET(req: NextRequest) {
  try {
    const claims = await getSessionFromRequest(req);
    if (!claims) return jsonError(401, 'unauthenticated', 'Authentication required.');

    const user = await prisma.user.findUnique({
      where: { id: claims.sub },
      select: { id: true, email: true, name: true, role: true, twoFactorEnabled: true },
    });
    if (!user) return jsonError(401, 'unauthenticated', 'Authentication required.');

    return NextResponse.json({ user });
  } catch (err) {
    return handleRouteError(err, 'auth/me');
  }
}
