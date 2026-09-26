import { open, type CountryResponse, type Reader } from 'maxmind';
import { env } from '@/lib/env';

/**
 * IP → ISO 3166-1 alpha-2 country, from a local MaxMind GeoLite2-Country
 * database.
 *
 * Local on purpose. This deployment is self-hosted behind nginx, so there is no
 * platform country header (`x-vercel-ip-country`, `cf-ipcountry`) to read, and
 * the alternative — asking a third-party geo API per visitor — would send every
 * enquiring visitor's IP to someone else, add a network hop to a form that has
 * to feel instant, and put a shared free-tier rate limit in front of a lead
 * form. A ~9MB file answers the same question in microseconds and never leaves
 * the box.
 *
 * The database is NOT in the repository: it is licensed, binary and refreshed
 * weekly upstream. `npm run geo:update` downloads it (see scripts/update-geoip.mjs).
 * Everything here is written so that its absence is a non-event — a deployment
 * with no database file, a request from a private address in development, or a
 * malformed IP all fall through to the caller's default, which is +91.
 */

/**
 * Three states, so a missing file is diagnosed once rather than on every
 * request: `undefined` = not tried yet, `null` = tried and unavailable.
 */
let reader: Reader<CountryResponse> | null | undefined;
let opening: Promise<Reader<CountryResponse> | null> | undefined;

async function getReader(): Promise<Reader<CountryResponse> | null> {
  if (reader !== undefined) return reader;
  // Concurrent first requests must not each open the file.
  opening ??= open<CountryResponse>(env.GEOIP_DB_PATH)
    .then((r) => {
      reader = r;
      return r;
    })
    .catch((err: unknown) => {
      reader = null;
      console.warn(
        `[geo] GeoLite2 database unavailable at ${env.GEOIP_DB_PATH} — phone country codes will default. ` +
          `Run \`npm run geo:update\` to install it. (${err instanceof Error ? err.message : String(err)})`,
      );
      return null;
    });
  return opening;
}

/**
 * Loopback, link-local and RFC1918 addresses, which every development request
 * and any deployment whose proxy forwards an internal hop will present. They
 * have no country, and handing them to the reader only costs a lookup.
 */
function isPrivateAddress(ip: string): boolean {
  if (ip === '::1' || ip === '127.0.0.1' || ip.startsWith('127.')) return true;
  if (ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('169.254.')) return true;
  // 172.16.0.0 – 172.31.255.255
  const m = /^172\.(\d{1,2})\./.exec(ip);
  if (m && Number(m[1]) >= 16 && Number(m[1]) <= 31) return true;
  // IPv6 unique-local (fc00::/7) and link-local (fe80::/10).
  const lower = ip.toLowerCase();
  return lower.startsWith('fc') || lower.startsWith('fd') || lower.startsWith('fe80:');
}

/** ISO 3166-1 alpha-2 for an IP, or null when it cannot be determined. */
export async function countryForIp(ip: string | null): Promise<string | null> {
  if (!ip || isPrivateAddress(ip)) return null;
  const r = await getReader();
  if (!r) return null;
  try {
    // Throws on a malformed address rather than returning null.
    return r.get(ip)?.country?.iso_code ?? null;
  } catch {
    return null;
  }
}
