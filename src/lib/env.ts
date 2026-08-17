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
    NEXT_PUBLIC_SITE_URL: z.string().min(1).default('http://localhost:3000'),

    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    // Connection-pool ceiling per process. Unset lets lib/db.ts choose a default
    // per phase; set it explicitly when several app instances share one Postgres,
    // so the total stays under the server's max_connections.
    DATABASE_POOL_MAX: z.coerce.number().int().positive().optional(),

    JWT_ACCESS_SECRET: z.string().min(16, 'JWT_ACCESS_SECRET must be at least 16 chars'),
    JWT_REFRESH_SECRET: z.string().min(16, 'JWT_REFRESH_SECRET must be at least 16 chars'),
    ACCESS_TOKEN_TTL: z.coerce.number().int().positive().default(900),
    REFRESH_TOKEN_TTL: z.coerce.number().int().positive().default(2_592_000),
    PREVIEW_SECRET: z.string().min(16, 'PREVIEW_SECRET must be at least 16 chars'),
    REVALIDATE_SECRET: z.string().min(16, 'REVALIDATE_SECRET must be at least 16 chars'),

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
  const raw: Record<string, string | undefined> = { ...process.env };
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
