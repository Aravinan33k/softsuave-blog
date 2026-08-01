import 'server-only';
import { prisma } from '../db';

// Account lockout: 5 failed attempts within a 15-minute window lock the account,
// with exponential backoff on continued failures (15m, 30m, 1h, … capped 24h).

const FAILURE_WINDOW_MS = 15 * 60 * 1000;
const LOCK_THRESHOLD = 5;
const BASE_LOCK_MS = 15 * 60 * 1000;
const MAX_LOCK_MS = 24 * 60 * 60 * 1000;

/** Milliseconds remaining on a lock, or 0 if not locked. */
export function lockRemainingMs(lockedUntil: Date | null | undefined): number {
  if (!lockedUntil) return 0;
  const ms = lockedUntil.getTime() - Date.now();
  return ms > 0 ? ms : 0;
}

export interface FailureResult {
  locked: boolean;
  lockedUntil: Date | null;
  attempts: number;
}

/** Record a failed login, applying the sliding window + escalating lock. */
export async function recordFailedAttempt(userId: string): Promise<FailureResult> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { failedLoginAttempts: true, lastFailedLoginAt: true },
  });
  if (!user) return { locked: false, lockedUntil: null, attempts: 0 };

  const now = Date.now();
  const windowExpired =
    !user.lastFailedLoginAt || now - user.lastFailedLoginAt.getTime() > FAILURE_WINDOW_MS;
  const attempts = (windowExpired ? 0 : user.failedLoginAttempts) + 1;

  let lockedUntil: Date | null = null;
  if (attempts >= LOCK_THRESHOLD) {
    const over = attempts - LOCK_THRESHOLD; // 0 at the 5th failure, then grows
    const duration = Math.min(MAX_LOCK_MS, BASE_LOCK_MS * 2 ** over);
    lockedUntil = new Date(now + duration);
  }

  await prisma.user.update({
    where: { id: userId },
    data: { failedLoginAttempts: attempts, lastFailedLoginAt: new Date(now), lockedUntil },
  });

  return { locked: lockedUntil != null, lockedUntil, attempts };
}

/** Clear failure state and stamp lastLoginAt on a successful login. */
export async function markSuccessfulLogin(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      failedLoginAttempts: 0,
      lastFailedLoginAt: null,
      lockedUntil: null,
      lastLoginAt: new Date(),
    },
  });
}
