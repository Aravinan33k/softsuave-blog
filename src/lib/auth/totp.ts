import 'server-only';
import { generateSecret, generateURI, verify } from 'otplib';
import QRCode from 'qrcode';

// TOTP (RFC 6238) helpers using otplib v13's functional API. Phase 2 uses
// verifyTotp during login for accounts that already have 2FA enabled; the
// enrollment/enforcement flow lands in the Phase 8 hardening pass.

export async function verifyTotp(secret: string, token: string): Promise<boolean> {
  try {
    const result = await verify({ secret, token });
    return result.valid;
  } catch {
    return false;
  }
}

export function generateTotpSecret(): string {
  return generateSecret();
}

export function totpKeyUri(accountEmail: string, secret: string, issuer = 'Softsuave Blog'): string {
  return generateURI({ issuer, label: accountEmail, secret });
}

/** Render an otpauth:// URI as a PNG data URL for scanning. */
export function totpQrDataUrl(uri: string): Promise<string> {
  return QRCode.toDataURL(uri, { margin: 1, width: 220 });
}
