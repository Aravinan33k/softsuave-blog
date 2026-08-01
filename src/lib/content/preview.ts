import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { env } from '../env';

// Signed, expiring links that let a draft be viewed before publishing without
// being public or indexable. Signed with PREVIEW_SECRET (separate from auth).

const key = new TextEncoder().encode(env.PREVIEW_SECRET);
export type PreviewType = 'post' | 'page';

export async function signPreviewToken(type: PreviewType, id: string, ttlSeconds = 86_400): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  return new SignJWT({ type, kind: 'preview' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(id)
    .setIssuedAt(iat)
    .setExpirationTime(iat + ttlSeconds)
    .sign(key);
}

export async function verifyPreviewToken(token: string): Promise<{ type: PreviewType; id: string } | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    if (payload.kind !== 'preview' || typeof payload.sub !== 'string') return null;
    if (payload.type !== 'post' && payload.type !== 'page') return null;
    return { type: payload.type, id: payload.sub };
  } catch {
    return null;
  }
}

export function previewUrl(type: PreviewType, id: string, token: string): string {
  return `${env.NEXT_PUBLIC_SITE_URL}/preview/${type}/${id}?token=${encodeURIComponent(token)}`;
}
