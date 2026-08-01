import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getClientIp, getUserAgent, handleRouteError, jsonError } from '@/lib/http';
import { logAudit } from '@/lib/audit';
import { verifyPassword, verifyDummyPassword } from '@/lib/auth/password';
import { verifyTotp } from '@/lib/auth/totp';
import { lockRemainingMs, recordFailedAttempt, markSuccessfulLogin } from '@/lib/auth/lockout';
import { signAccessToken, type Role } from '@/lib/auth/tokens';
import { startRefreshFamily } from '@/lib/auth/refresh-store';
import { setAuthCookies } from '@/lib/auth/cookies';
import { loginSchema } from '@/lib/validation/auth';
import { rateLimit } from '@/lib/rate-limit';

// POST /api/v1/auth/login
// email + password (+ optional TOTP) → sets access + refresh cookies.
export async function POST(req: NextRequest) {
  try {
    const limited = await rateLimit(req, { id: 'auth-login', limit: 10, windowMs: 60_000 });
    if (limited) return limited;

    const ipAddress = getClientIp(req);
    const userAgent = getUserAgent(req);

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return jsonError(400, 'invalid_request', 'Invalid request body.');
    }

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(400, 'invalid_request', 'Invalid email or password format.');
    }
    const { email, password, totp } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    // Unknown user: spend comparable time, log, and return a generic error.
    if (!user) {
      await verifyDummyPassword(password);
      await logAudit({ action: 'LOGIN_FAILURE', ipAddress, userAgent, metadata: { email, reason: 'unknown_user' } });
      return jsonError(401, 'invalid_credentials', 'Invalid credentials.');
    }

    // Locked account: reject without checking the password.
    const remaining = lockRemainingMs(user.lockedUntil);
    if (remaining > 0) {
      await logAudit({ action: 'LOGIN_LOCKED', userId: user.id, ipAddress, userAgent });
      return jsonError(429, 'account_locked', 'Too many attempts. Try again later.', {
        retryAfterSeconds: Math.ceil(remaining / 1000),
      });
    }

    const passwordOk = await verifyPassword(user.passwordHash, password);
    if (!passwordOk) {
      const result = await recordFailedAttempt(user.id);
      await logAudit({ action: 'LOGIN_FAILURE', userId: user.id, ipAddress, userAgent, metadata: { reason: 'bad_password', attempts: result.attempts } });
      if (result.locked) {
        await logAudit({ action: 'ACCOUNT_LOCKED', userId: user.id, ipAddress, userAgent, metadata: { until: result.lockedUntil } });
      }
      return jsonError(401, 'invalid_credentials', 'Invalid credentials.');
    }

    // Second factor (only for accounts that have it enabled).
    if (user.twoFactorEnabled) {
      if (!totp) {
        return jsonError(401, 'totp_required', 'A two-factor authentication code is required.');
      }
      const totpOk = user.twoFactorSecret ? await verifyTotp(user.twoFactorSecret, totp) : false;
      if (!totpOk) {
        const result = await recordFailedAttempt(user.id);
        await logAudit({ action: 'LOGIN_FAILURE', userId: user.id, ipAddress, userAgent, metadata: { reason: 'bad_totp', attempts: result.attempts } });
        return jsonError(401, 'invalid_credentials', 'Invalid credentials.');
      }
    }

    // Success.
    await markSuccessfulLogin(user.id);
    const [accessToken, refresh] = await Promise.all([
      signAccessToken({ id: user.id, email: user.email, role: user.role as Role }),
      startRefreshFamily(user.id, { ipAddress, userAgent }),
    ]);

    await logAudit({ action: 'LOGIN_SUCCESS', userId: user.id, ipAddress, userAgent });

    const res = NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
    setAuthCookies(res, { accessToken, refreshToken: refresh.token });
    return res;
  } catch (err) {
    return handleRouteError(err, 'auth/login');
  }
}
