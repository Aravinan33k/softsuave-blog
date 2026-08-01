// Shared Prisma include shapes for returning fully-populated content records.

export const POST_INCLUDE = {
  author: { select: { id: true, email: true, name: true } },
  categories: { include: { category: { select: { id: true, name: true, slug: true } } } },
  tags: { include: { tag: { select: { id: true, name: true, slug: true } } } },
} as const;

export const PAGE_INCLUDE = {
  author: { select: { id: true, email: true, name: true } },
} as const;
