import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { handleRouteError, jsonError } from '@/lib/http';
import { getSessionFromRequest } from '@/lib/auth/session';
import { verifyCsrf } from '@/lib/auth/csrf';
import { verifyTotp } from '@/lib/auth/totp';
import { logAudit } from '@/lib/audit';

const schema = z.object({ code: z.string().trim().min(6).max(8) });

// POST /api/v1/auth/2fa/verify — confirm enrollment by validating a code against
// the pending secret, then activate 2FA for the account.
export async function POST(req: NextRequest) {
  try {
    const claims = await getSessionFromRequest(req);
    if (!claims) return jsonError(401, 'unauthenticated', 'Authentication required.');
    if (!verifyCsrf(req)) return jsonError(403, 'csrf_failed', 'Invalid or missing CSRF token.');

    const parsed = schema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return jsonError(400, 'invalid_request', 'A valid code is required.');

    const user = await prisma.user.findUnique({ where: { id: claims.sub }, select: { twoFactorSecret: true } });
    if (!user?.twoFactorSecret) return jsonError(400, 'no_pending_setup', 'Start 2FA setup first.');

    if (!(await verifyTotp(user.twoFactorSecret, parsed.data.code))) {
      return jsonError(400, 'invalid_code', 'Incorrect code. Try again.');
    }

    await prisma.user.update({ where: { id: claims.sub }, data: { twoFactorEnabled: true } });
    await logAudit({ action: 'UPDATE', userId: claims.sub, targetType: 'user', targetId: claims.sub, req, metadata: { twoFactor: 'enabled' } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleRouteError(err, 'auth/2fa/verify');
  }
}
