import 'server-only';
import { createHash, randomUUID } from 'node:crypto';
import { prisma } from '../db';
import { env } from '../env';
import { signRefreshToken, verifyRefreshToken } from './tokens';

// Server-side refresh-token lifecycle: issue → rotate → revoke, with reuse
// detection. Only a SHA-256 hash of each token is persisted, so a DB leak does
// not yield usable tokens.

function hashToken(raw: string): string {
  return createHash('sha256').update(raw).digest('hex');
}

export interface IssuedRefresh {
  token: string;
  jti: string;
  family: string;
  expiresAt: Date;
}

interface Meta {
  ipAddress?: string | null;
  userAgent?: string | null;
}

async function createToken(userId: string, family: string, meta: Meta): Promise<IssuedRefresh> {
  const jti = randomUUID();
  const token = await signRefreshToken({ userId, jti, family });
  const expiresAt = new Date(Date.now() + env.REFRESH_TOKEN_TTL * 1000);
  await prisma.refreshToken.create({
    data: {
      id: jti,
      userId,
      familyId: family,
      tokenHash: hashToken(token),
      expiresAt,
      ipAddress: meta.ipAddress ?? null,
      userAgent: meta.userAgent ?? null,
    },
  });
  return { token, jti, family, expiresAt };
}

/** Begin a fresh token family (called on login). */
export function startRefreshFamily(userId: string, meta: Meta = {}): Promise<IssuedRefresh> {
  return createToken(userId, randomUUID(), meta);
}

export type RotateResult =
  | { status: 'ok'; userId: string; issued: IssuedRefresh }
  | { status: 'invalid' }
  | { status: 'reuse'; userId: string; family: string };

/**
 * Rotate a refresh token. Marks the presented token used and issues its
 * successor in the same family. If the presented token was already used or
 * revoked, the whole family is revoked (theft response).
 */
export async function rotateRefreshToken(rawToken: string, meta: Meta = {}): Promise<RotateResult> {
  const claims = await verifyRefreshToken(rawToken);
  if (!claims) return { status: 'invalid' };

  const record = await prisma.refreshToken.findUnique({ where: { id: claims.jti } });
  if (!record || record.userId !== claims.sub || record.tokenHash !== hashToken(rawToken)) {
    return { status: 'invalid' };
  }

  // Already used or revoked → reuse/theft. Kill the family.
  if (record.usedAt || record.revokedAt) {
    await revokeFamily(record.familyId);
    return { status: 'reuse', userId: record.userId, family: record.familyId };
  }
  if (record.expiresAt.getTime() < Date.now()) {
    return { status: 'invalid' };
  }

  // Sign the successor up front, then flip state in one transaction. The guarded
  // updateMany (usedAt IS NULL) makes concurrent double-use safe: only one wins.
  const jti = randomUUID();
  const token = await signRefreshToken({ userId: record.userId, jti, family: record.familyId });
  const expiresAt = new Date(Date.now() + env.REFRESH_TOKEN_TTL * 1000);

  const won = await prisma.$transaction(async (tx) => {
    const upd = await tx.refreshToken.updateMany({
      where: { id: record.id, usedAt: null, revokedAt: null },
      data: { usedAt: new Date() },
    });
    if (upd.count !== 1) return false;
    await tx.refreshToken.create({
      data: {
        id: jti,
        userId: record.userId,
        familyId: record.familyId,
        tokenHash: hashToken(token),
        expiresAt,
        ipAddress: meta.ipAddress ?? null,
        userAgent: meta.userAgent ?? null,
      },
    });
    return true;
  });

  if (!won) {
    // Lost the race → the token was concurrently used. Treat as reuse.
    await revokeFamily(record.familyId);
    return { status: 'reuse', userId: record.userId, family: record.familyId };
  }

  return { status: 'ok', userId: record.userId, issued: { token, jti, family: record.familyId, expiresAt } };
}

export async function revokeFamily(familyId: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: { familyId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}

/** Revoke the family that a raw refresh token belongs to (used on logout). */
export async function revokeByRawToken(rawToken: string): Promise<{ userId: string; family: string } | null> {
  const claims = await verifyRefreshToken(rawToken);
  if (!claims) return null;
  const record = await prisma.refreshToken.findUnique({ where: { id: claims.jti } });
  if (!record) return null;
  await revokeFamily(record.familyId);
  return { userId: record.userId, family: record.familyId };
}
