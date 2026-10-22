import 'server-only';
import { env } from '../env';

/**
 * Where a lead came from — city, region and country for the visitor's IP —
 * for the team's lead email, which carries them as softsuave.com's own lead
 * email does.
 *
 * The live site looks these up in the visitor's browser through ipinfo.io.
 * Here the same service is asked from the server, once per stored lead and
 * after the visitor already has their response, so it adds nothing to the
 * form's speed and needs no new origin in the page's CSP. The answer is
 * about the VISITOR's connection (the IP their request arrived from), not
 * this server's.
 *
 * Platform headers win when present (Vercel sets them for free); a timeout or
 * an ipinfo error gives empty fields rather than a failure — the lead email
 * still goes out.
 *
 * A loopback or private address is handled by environment:
 *  - development: the visitor IS this machine (the browser and the dev server
 *    share a computer, so the request arrives from ::1). ipinfo is asked about
 *    the caller instead, which answers with this machine's public IP and
 *    location — the visitor's — and that IP replaces ::1 in the email.
 *  - production: it means the proxy in front of the app is not passing the
 *    visitor's IP on (nginx needs X-Forwarded-For). Asking about "the caller"
 *    there would report this SERVER's location, so the fields stay empty and a
 *    warning says what to fix.
 */

export type IpLocation = {
  city: string;
  region: string;
  country: string;
  /** Set only when the lookup found the visitor's public IP itself (development). */
  ipAddress?: string;
};

const EMPTY: IpLocation = { city: '', region: '', country: '' };

/** Loopback, private and link-local addresses — no location to find. */
function isPrivate(ip: string): boolean {
  if (ip === '::1' || ip.startsWith('127.') || ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('169.254.')) return true;
  const m = /^172\.(\d{1,2})\./.exec(ip);
  if (m && Number(m[1]) >= 16 && Number(m[1]) <= 31) return true;
  const lower = ip.toLowerCase();
  return lower.startsWith('fc') || lower.startsWith('fd') || lower.startsWith('fe80:');
}

/** "::ffff:203.0.113.7" (IPv4 seen through an IPv6 socket) → "203.0.113.7". */
export function normalizeIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  const trimmed = ip.trim();
  return trimmed.toLowerCase().startsWith('::ffff:') ? trimmed.slice(7) : trimmed;
}

function decode(v: string | null): string {
  if (!v) return '';
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

/**
 * The platform's own geo headers, read while the request is in hand (the
 * lookup itself runs later, in `after()`). Empty off Vercel.
 */
export function platformLocation(headers: Headers): IpLocation {
  return {
    city: decode(headers.get('x-vercel-ip-city')),
    region: decode(headers.get('x-vercel-ip-country-region')),
    country: decode(headers.get('x-vercel-ip-country') ?? headers.get('cf-ipcountry')),
  };
}

/** City, region and country for the visitor's IP. Never throws. */
export async function lookupIpLocation(ip: string | null, platform: IpLocation = EMPTY): Promise<IpLocation> {
  if (platform.country) return platform;
  if (!env.LEAD_GEO_LOOKUP) return EMPTY;
  const addr = normalizeIp(ip);
  const local = !addr || isPrivate(addr);

  if (local && env.NODE_ENV === 'production') {
    console.warn(
      `[lead geo] visitor IP is ${addr ?? 'missing'} — the proxy is not forwarding it. ` +
        'Add `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;` to nginx (deploy/nginx.example.conf).',
    );
    return EMPTY;
  }

  try {
    // Development with a local address: no IP in the path, so ipinfo answers
    // for the caller — this machine's public address, which is the visitor's.
    const target = local ? '' : `${encodeURIComponent(addr)}/`;
    const url = `https://ipinfo.io/${target}json${env.IPINFO_TOKEN ? `?token=${encodeURIComponent(env.IPINFO_TOKEN)}` : ''}`;
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(5_000),
    });
    if (!res.ok) {
      console.warn(`[lead geo] ipinfo answered ${res.status}`);
      return EMPTY;
    }
    const data = (await res.json()) as Partial<Record<'ip' | 'city' | 'region' | 'country', string>> & { bogon?: boolean };
    if (data.bogon) return EMPTY;
    return {
      city: data.city ?? '',
      region: data.region ?? '',
      country: data.country ?? '',
      ...(local && data.ip ? { ipAddress: data.ip } : {}),
    };
  } catch (err) {
    console.warn('[lead geo] lookup failed:', (err as Error).message);
    return EMPTY;
  }
}
