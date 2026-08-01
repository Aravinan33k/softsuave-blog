import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { handleRouteError, jsonError } from '@/lib/http';
import { getSessionFromRequest } from '@/lib/auth/session';
import { verifyCsrf } from '@/lib/auth/csrf';
import { verifyTotp } from '@/lib/auth/totp';
import { logAudit } from '@/lib/audit';

const schema = z.object({ code: z.string().trim().min(6).max(8) });

// POST /api/v1/auth/2fa/disable — turn off 2FA after verifying a current code.
export async function POST(req: NextRequest) {
  try {
    const claims = await getSessionFromRequest(req);
    if (!claims) return jsonError(401, 'unauthenticated', 'Authentication required.');
    if (!verifyCsrf(req)) return jsonError(403, 'csrf_failed', 'Invalid or missing CSRF token.');

    const parsed = schema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return jsonError(400, 'invalid_request', 'A valid code is required.');

    const user = await prisma.user.findUnique({ where: { id: claims.sub }, select: { twoFactorSecret: true, twoFactorEnabled: true } });
    if (!user?.twoFactorEnabled || !user.twoFactorSecret) return jsonError(400, 'not_enabled', '2FA is not enabled.');
    if (!(await verifyTotp(user.twoFactorSecret, parsed.data.code))) {
      return jsonError(400, 'invalid_code', 'Incorrect code.');
    }

    await prisma.user.update({ where: { id: claims.sub }, data: { twoFactorEnabled: false, twoFactorSecret: null } });
    await logAudit({ action: 'UPDATE', userId: claims.sub, targetType: 'user', targetId: claims.sub, req, metadata: { twoFactor: 'disabled' } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleRouteError(err, 'auth/2fa/disable');
  }
}
