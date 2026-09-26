import { z } from 'zod';
import {
  NAME_MESSAGE,
  PHONE_MESSAGE,
  isValidName,
  isValidPhone,
} from '@/lib/forms/enquiry-rules';

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

// Enquiry (marketing hero form) ----------------------------------------------

/**
 * A lead from the landing pages' hero form (`landing/hero.tsx`).
 *
 * The maximums are the column widths in `prisma/schema.prisma`, not arbitrary
 * limits: exceeding a VARCHAR on MySQL in strict mode REJECTS the insert, so a
 * field that is validated short here can never fail at the database instead,
 * where the reader would see an opaque 500 after filling the whole form.
 *
 * `website` is a honeypot, not a real field — see the route.
 */
export const enquiryInput = z.object({
  // `isValidName` / `isValidPhone` are the SAME predicates the form applies
  // before it sends (`lib/forms/enquiry-rules.ts`). The client half is the
  // fast feedback; this is the half that decides, since the form is not the
  // only way to reach this route. Without it a name of `12345` and a phone of
  // `abcdef` both stored cleanly — QA BUG-008.
  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name.')
    .max(191)
    .refine(isValidName, NAME_MESSAGE),
  email: z.email('Please enter a valid email address.').trim().max(191),
  // Optional. Not a country-specific shape — the form takes international
  // numbers in whatever form the reader writes them — but it does have to be a
  // number: digits and the punctuation people write them with, nothing else.
  phone: z
    .string()
    .trim()
    .max(64)
    .refine(isValidPhone, PHONE_MESSAGE)
    .optional()
    .or(z.literal('')),
  requirement: z.string().trim().min(1, 'Please tell us what you need.').max(5000),
  /** The page's own subject line, for triage. Not reader-supplied. */
  subject: z.string().trim().max(255).optional(),
  /** Route the form was submitted from, for per-page lead attribution. */
  sourcePath: z.string().trim().max(512).optional(),
  /** The page's own key, as the form's `idPrefix` carries it. */
  sourceKey: z.string().trim().max(191).optional(),
  /**
   * Honeypot. Deliberately permissive: rejecting a filled value HERE would
   * answer a bot with a 400 naming the field, which teaches the next attempt
   * exactly which input to leave alone. The schema accepts it and the route
   * decides — silently, with the same 202 a real submission gets.
   */
  website: z.string().max(255).optional(),
});

export type EnquiryInput = z.infer<typeof enquiryInput>;
