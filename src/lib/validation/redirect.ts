import { z } from 'zod';

export const redirectSchema = z.object({
  fromPath: z
    .string()
    .trim()
    .min(1)
    .max(500)
    .refine((v) => v.startsWith('/'), 'From path must start with /'),
  toPath: z.string().trim().min(1).max(1000),
  // Optional (not .default): a default would be re-applied by .partial() on updates.
  statusCode: z.union([z.literal(301), z.literal(302), z.literal(307), z.literal(308)]).optional(),
});

export const redirectUpdateSchema = redirectSchema.partial();

/** Normalise a path for consistent matching: ensure leading slash, trim trailing. */
export function normalizePath(p: string): string {
  let out = p.trim();
  if (!out.startsWith('/')) out = `/${out}`;
  if (out.length > 1 && out.endsWith('/')) out = out.slice(0, -1);
  return out;
}
