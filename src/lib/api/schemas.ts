import { z } from 'zod';

// Request query schemas ------------------------------------------------------

export const paginationQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().min(1).max(50).default(10),
});

export const postListQuery = paginationQuery.extend({
  category: z.string().trim().min(1).optional(),
  tag: z.string().trim().min(1).optional(),
});

export const searchQuery = paginationQuery.extend({
  q: z.string().trim().min(1).max(100),
});

// Response DTO schemas (used to guarantee response shape) ---------------------

export const taxRefDto = z.object({ name: z.string(), slug: z.string() });

export const postListItemDto = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().nullable(),
  coverImage: z.object({ url: z.string(), alt: z.string() }).nullable(),
  publishedAt: z.string().nullable(),
  readingTimeMinutes: z.number(),
  author: z.object({ name: z.string().nullable() }),
  categories: z.array(taxRefDto),
  tags: z.array(taxRefDto),
});

export const postDetailDto = postListItemDto.extend({
  contentHtml: z.string(),
});

export const taxonomyItemDto = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  postCount: z.number(),
});

export const paginationDto = z.object({
  page: z.number(),
  perPage: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export type PostListItem = z.infer<typeof postListItemDto>;
export type PostDetail = z.infer<typeof postDetailDto>;
export type TaxonomyItem = z.infer<typeof taxonomyItemDto>;

export function paginationMeta(page: number, perPage: number, total: number) {
  return { page, perPage, total, totalPages: Math.max(1, Math.ceil(total / perPage)) };
}
