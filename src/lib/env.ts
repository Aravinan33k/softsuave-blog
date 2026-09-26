import { z } from 'zod';

/**
 * Centralised, validated environment access. Import `env` everywhere instead of
 * reading `process.env` directly, so a misconfigured deployment fails fast at
 * boot with a clear message rather than surfacing `undefined` deep in a request.
 *
 * Edge-safe: depends only on `zod`, so it can be imported from middleware.
 */
const schema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    // Canonical origin for every canonical tag, JSON-LD `@id`/`url`, OG image,
    // sitemap and feed URL. The default is the live origin, not localhost: a
    // deployment that forgets this variable should publish correct canonicals
    // pointing at the real site, not ship a page telling crawlers its canonical
    // is a loopback address. Local dev overrides it in `.env`.
    NEXT_PUBLIC_SITE_URL: z.string().min(1).default('https://www.softsuave.com'),

    // Must be a mysql:// URL. The protocol is checked rather than accepted as any
    // non-empty string because this app was ported from Postgres: a leftover
    // postgresql:// URL is the single most likely misconfiguration, and without
    // this it would boot fine and then fail on the first query inside a request.
    // A stale `?schema=public` query param (Postgres-only) is harmless — the
    // driver ignores it — so it is not rejected.
    //
    // OPTIONAL. Unset, the app builds and runs without a database: marketing
    // pages are unaffected, public blog/search queries fall back to empty
    // results, the API answers 503, /admin shows a notice, and the enquiry and
    // meeting forms forward leads to softsuave.com instead of storing them (see
    // `databaseConfigured` below and lib/db.ts).
    DATABASE_URL: z
      .string()
      .refine((v) => /^mysql:\/\//i.test(v), 'DATABASE_URL must be a mysql:// connection string')
      .optional(),
    // Connection-pool ceiling per process. Unset lets lib/db.ts choose a default
    // per phase; set it explicitly when several app instances share one MySQL, so
    // the total stays under the server's max_connections (default 151).
    DATABASE_POOL_MAX: z.coerce.number().int().positive().optional(),
    // TLS to MySQL. `verify` (default) encrypts AND authenticates the server;
    // `no-verify` encrypts only, accepting any certificate, so it does not stop a
    // MITM; `disable` sends credentials in plaintext and is for a loopback socket
    // in local development only. See sslConfig() in lib/db.ts.
    DATABASE_SSL: z.enum(['verify', 'no-verify', 'disable']).default('verify'),
    // PEM contents (not a path) of the CA that signed the MySQL server
    // certificate. Needed with DATABASE_SSL=verify against a self-signed cert,
    // which is the norm for a self-hosted server.
    DATABASE_SSL_CA: z.string().optional(),

    // The four secrets are optional so a deployment without a database (and so
    // without admin users) still builds. Where one is unset its user signs with
    // a random per-process key instead (`secretKey` below) — unguessable, just
    // not stable across restarts — and REVALIDATE_SECRET's routes reject every
    // request. Set all four wherever DATABASE_URL is set.
    JWT_ACCESS_SECRET: z.string().min(16, 'JWT_ACCESS_SECRET must be at least 16 chars').optional(),
    JWT_REFRESH_SECRET: z.string().min(16, 'JWT_REFRESH_SECRET must be at least 16 chars').optional(),
    ACCESS_TOKEN_TTL: z.coerce.number().int().positive().default(900),
    REFRESH_TOKEN_TTL: z.coerce.number().int().positive().default(2_592_000),
    PREVIEW_SECRET: z.string().min(16, 'PREVIEW_SECRET must be at least 16 chars').optional(),
    REVALIDATE_SECRET: z.string().min(16, 'REVALIDATE_SECRET must be at least 16 chars').optional(),

    STORAGE_DRIVER: z.enum(['local', 's3', 'cloudinary']).default('local'),
    LOCAL_STORAGE_DIR: z.string().default('.storage'),
    LOCAL_STORAGE_PUBLIC_PATH: z.string().default('/uploads'),
    S3_ENDPOINT: z.string().default(''),
    S3_REGION: z.string().default('auto'),
    S3_BUCKET: z.string().default(''),
    S3_ACCESS_KEY_ID: z.string().default(''),
    S3_SECRET_ACCESS_KEY: z.string().default(''),
    S3_PUBLIC_URL: z.string().default(''),

    // Either the single console-style CLOUDINARY_URL, or the discrete triple
    // below (parsed out of the URL when it is the only thing set).
    CLOUDINARY_URL: z.string().default(''),
    CLOUDINARY_CLOUD_NAME: z.string().default(''),
    CLOUDINARY_API_KEY: z.string().default(''),
    CLOUDINARY_API_SECRET: z.string().default(''),
    // Optional key prefix for all uploaded objects, e.g. "blog". No slashes.
    CLOUDINARY_FOLDER: z.string().default(''),

    // Must match MySQL's `innodb_ft_min_token_size`. InnoDB never indexes tokens
    // below it, so lib/search/fulltext.ts drops shorter terms rather than sending
    // a query that silently matches nothing. Lowering it here without also
    // lowering it on the server (and rebuilding the FULLTEXT indexes) just moves
    // the empty results one layer down.
    SEARCH_MIN_TOKEN_SIZE: z.coerce.number().int().min(1).max(10).default(3),

    // MaxMind GeoLite2-Country database, used to preselect the enquiry form's
    // phone country code. Licensed and refreshed weekly upstream, so it is not
    // committed — `npm run geo:update` downloads it. Optional: with no file
    // present every form simply defaults to +91 (see lib/geo/country.ts).
    GEOIP_DB_PATH: z.string().default('./data/GeoLite2-Country.mmdb'),
    // Free MaxMind account → Manage License Keys. Read only by the download
    // script; the running app never contacts MaxMind.
    MAXMIND_LICENSE_KEY: z.string().default(''),

    // NeetoCal meeting scheduler behind /contact's "Schedule Meeting" card.
    // Server-side only: /api/v1/meeting/* proxies NeetoCal so the key never
    // reaches the browser. Empty disables the card's live calendar (it falls
    // back to linking the NeetoCal booking page).
    NEETOCAL_API_KEY: z.string().default(''),

    // Where enquiry/meeting leads go when no database is configured: the live
    // softsuave.com lead endpoint its own contact forms post to (see
    // lib/leads/forward.ts). Override only to point at a different collector.
    LEAD_FORWARD_URL: z.string().url().default('https://www.softsuave.com/forms/enquires/developer'),
    NEETOCAL_BASE_URL: z.string().default('https://softsuave.neetocal.com'),
    NEETOCAL_MEETING_SLUG: z.string().default('meeting-with-softsuave'),

    RATE_LIMIT_DRIVER: z.enum(['memory', 'upstash']).default('memory'),
    UPSTASH_REDIS_REST_URL: z.string().default(''),
    UPSTASH_REDIS_REST_TOKEN: z.string().default(''),

    SEED_ADMIN_EMAIL: z.string().optional(),
    SEED_ADMIN_PASSWORD: z.string().optional(),
    SEED_ADMIN_NAME: z.string().optional(),

    // Require ADMINs to have TOTP 2FA enabled (redirects them to /admin/security).
    ENFORCE_ADMIN_2FA: z
      .string()
      .optional()
      .transform((v) => v === 'true' || v === '1'),
  })
  .superRefine((val, ctx) => {
    if (val.STORAGE_DRIVER === 's3') {
      for (const key of ['S3_ENDPOINT', 'S3_BUCKET', 'S3_ACCESS_KEY_ID', 'S3_SECRET_ACCESS_KEY', 'S3_PUBLIC_URL'] as const) {
        if (!val[key]) {
          ctx.addIssue({ code: 'custom', path: [key], message: `${key} is required when STORAGE_DRIVER=s3` });
        }
      }
    }
    if (val.STORAGE_DRIVER === 'cloudinary') {
      for (const key of ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'] as const) {
        if (!val[key]) {
          ctx.addIssue({ code: 'custom', path: [key], message: `${key} is required when STORAGE_DRIVER=cloudinary (or set CLOUDINARY_URL)` });
        }
      }
    }
    if (val.RATE_LIMIT_DRIVER === 'upstash' && (!val.UPSTASH_REDIS_REST_URL || !val.UPSTASH_REDIS_REST_TOKEN)) {
      ctx.addIssue({ code: 'custom', path: ['UPSTASH_REDIS_REST_URL'], message: 'Upstash URL and token are required when RATE_LIMIT_DRIVER=upstash' });
    }
  });

/**
 * The Cloudinary console hands out a single CLOUDINARY_URL
 * ("cloudinary://<api_key>:<api_secret>@<cloud_name>"). Split it into the
 * discrete vars the storage driver reads. Returns null for anything that
 * isn't a well-formed Cloudinary URL.
 */
export function parseCloudinaryUrl(url: string): { cloudName: string; apiKey: string; apiSecret: string } | null {
  try {
    const u = new URL(url);
    if (u.protocol !== 'cloudinary:') return null;
    const cloudName = u.hostname;
    const apiKey = decodeURIComponent(u.username);
    const apiSecret = decodeURIComponent(u.password);
    if (!cloudName || !apiKey || !apiSecret) return null;
    return { cloudName, apiKey, apiSecret };
  } catch {
    return null;
  }
}

function loadEnv() {
  // Vercel (and some CI runners) inject a declared-but-unset variable as an
  // empty string rather than omitting it. `''` is not `undefined`, so it skips
  // every `.default()` below it and then fails that field's own constraint —
  // STORAGE_DRIVER='' reports "expected one of local|s3|cloudinary" instead of
  // quietly falling back to 'local'. Treat empty as absent so defaults apply.
  //
  // NODE_ENV is deliberately exempt: letting it default to 'development' would
  // disable Secure cookies (see lib/http.ts) on a production deployment, so an
  // empty NODE_ENV has to stay a hard error rather than a silent downgrade.
  const raw: Record<string, string | undefined> = Object.fromEntries(
    Object.entries(process.env).filter(([k, v]) => v !== '' || k === 'NODE_ENV'),
  );
  // Accept CLOUDINARY_URL (what the console copies out) as an alternative to
  // the discrete CLOUDINARY_* vars; explicitly set vars always win.
  if (raw.CLOUDINARY_URL) {
    const c = parseCloudinaryUrl(raw.CLOUDINARY_URL);
    if (c) {
      raw.CLOUDINARY_CLOUD_NAME ||= c.cloudName;
      raw.CLOUDINARY_API_KEY ||= c.apiKey;
      raw.CLOUDINARY_API_SECRET ||= c.apiSecret;
    }
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`).join('\n');
    throw new Error(`Invalid environment variables:\n${issues}`);
  }
  return parsed.data;
}

export const env = loadEnv();
export type Env = typeof env;

/** Whether a database is configured. False is the no-database mode described on DATABASE_URL. */
export const databaseConfigured = Boolean(env.DATABASE_URL);

/**
 * A secret's bytes, or — when it is unset — 32 random bytes generated once per
 * call site at module load. Never a fixed fallback: `encode(undefined)` would
 * sign with the literal string "undefined", which anyone could forge.
 */
export function secretKey(value: string | undefined): Uint8Array {
  if (value) return new TextEncoder().encode(value);
  return crypto.getRandomValues(new Uint8Array(32));
}
