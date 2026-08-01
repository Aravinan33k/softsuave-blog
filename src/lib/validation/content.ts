import { z } from 'zod';

// Validation for content mutations. Kept permissive where the value is opaque
// (TipTap JSON) and strict where it drives routing/SEO (slug, status).

export const contentStatusSchema = z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED']);

const slugField = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug may contain only lowercase letters, numbers, and hyphens')
  .optional();

// A TipTap document: `{ type: 'doc', content: [...] }`. Stored verbatim as JSON.
const contentJsonSchema = z.object({ type: z.string() }).catchall(z.unknown());

const nullableStr = (max: number) => z.string().max(max).nullish();

export const postCreateSchema = z.object({
  title: z.string().trim().min(1).max(300),
  slug: slugField,
  contentJson: contentJsonSchema,
  excerpt: nullableStr(500),
  // Optional (not .default): a default would be re-applied by .partial() on
  // updates, silently resetting status. Create routes fall back to 'DRAFT'.
  status: contentStatusSchema.optional(),
  publishedAt: z.string().nullish(), // ISO string; parsed + validated in the route
  coverImageId: z.string().nullish(),
  seoTitle: nullableStr(300),
  seoDescription: nullableStr(500),
  ogImageId: z.string().nullish(),
  canonicalUrl: nullableStr(500),
  noIndex: z.boolean().optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});

// Update allows partial payloads (e.g. autosave sends title + contentJson only).
export const postUpdateSchema = postCreateSchema.partial();

export const pageCreateSchema = postCreateSchema.omit({ categoryIds: true, tagIds: true });
export const pageUpdateSchema = pageCreateSchema.partial();

export const categorySchema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: slugField,
  description: nullableStr(500),
});
export const categoryUpdateSchema = categorySchema.partial();

export const tagSchema = categorySchema;
export const tagUpdateSchema = categoryUpdateSchema;

export const mediaUpdateSchema = z.object({
  altText: z.string().trim().min(1, 'Alt text is required').max(300),
});

export type PostCreateInput = z.infer<typeof postCreateSchema>;
export type PostUpdateInput = z.infer<typeof postUpdateSchema>;
export type PageCreateInput = z.infer<typeof pageCreateSchema>;
