import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { handleRouteError, jsonError } from '@/lib/http';
import { getSessionFromRequest } from '@/lib/auth/session';
import { verifyCsrf } from '@/lib/auth/csrf';
import { generateTotpSecret, totpKeyUri, totpQrDataUrl } from '@/lib/auth/totp';

// POST /api/v1/auth/2fa/setup — begin enrollment: store a pending secret and
// return the otpauth URI + QR. Confirmed via /2fa/verify.
export async function POST(req: NextRequest) {
  try {
    const claims = await getSessionFromRequest(req);
    if (!claims) return jsonError(401, 'unauthenticated', 'Authentication required.');
    if (!verifyCsrf(req)) return jsonError(403, 'csrf_failed', 'Invalid or missing CSRF token.');

    const user = await prisma.user.findUnique({ where: { id: claims.sub }, select: { email: true, twoFactorEnabled: true } });
    if (!user) return jsonError(401, 'unauthenticated', 'Authentication required.');
    if (user.twoFactorEnabled) return jsonError(400, 'already_enabled', 'Two-factor auth is already enabled.');

    const secret = generateTotpSecret();
    await prisma.user.update({ where: { id: claims.sub }, data: { twoFactorSecret: secret } });

    const uri = totpKeyUri(user.email, secret);
    const qrDataUrl = await totpQrDataUrl(uri);
    return NextResponse.json({ secret, otpauthUri: uri, qrDataUrl });
  } catch (err) {
    return handleRouteError(err, 'auth/2fa/setup');
  }
}
