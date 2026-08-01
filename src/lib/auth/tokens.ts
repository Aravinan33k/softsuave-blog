import 'server-only';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { env } from '../env';

// JWT signing/verification with jose (HS256). Used by route handlers and by
// proxy.ts. Access tokens are short-lived and self-contained; refresh tokens
// carry a jti + family id and are additionally tracked server-side (see
// refresh-store.ts) for rotation and reuse detection.

const encoder = new TextEncoder();
const accessKey = encoder.encode(env.JWT_ACCESS_SECRET);
const refreshKey = encoder.encode(env.JWT_REFRESH_SECRET);

export type Role = 'ADMIN' | 'EDITOR';

export interface AccessTokenClaims extends JWTPayload {
  sub: string;
  email: string;
  role: Role;
  type: 'access';
}

export interface RefreshTokenClaims extends JWTPayload {
  sub: string;
  jti: string;
  family: string;
  type: 'refresh';
}

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

export function signAccessToken(user: { id: string; email: string; role: Role }): Promise<string> {
  const iat = nowSeconds();
  return new SignJWT({ email: user.email, role: user.role, type: 'access' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt(iat)
    .setExpirationTime(iat + env.ACCESS_TOKEN_TTL)
    .sign(accessKey);
}

export function signRefreshToken(params: { userId: string; jti: string; family: string }): Promise<string> {
  const iat = nowSeconds();
  return new SignJWT({ family: params.family, type: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(params.userId)
    .setJti(params.jti)
    .setIssuedAt(iat)
    .setExpirationTime(iat + env.REFRESH_TOKEN_TTL)
    .sign(refreshKey);
}

export async function verifyAccessToken(token: string): Promise<AccessTokenClaims | null> {
  try {
    const { payload } = await jwtVerify(token, accessKey);
    if (payload.type !== 'access' || typeof payload.sub !== 'string') return null;
    return payload as AccessTokenClaims;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(token: string): Promise<RefreshTokenClaims | null> {
  try {
    const { payload } = await jwtVerify(token, refreshKey);
    if (payload.type !== 'refresh' || typeof payload.sub !== 'string' || typeof payload.jti !== 'string') {
      return null;
    }
    return payload as RefreshTokenClaims;
  } catch {
    return null;
  }
}
