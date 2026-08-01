import { notFound } from 'next/navigation';
import type { JSONContent } from '@tiptap/core';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/auth/guards';
import { PageHeader } from '@/components/admin/page-header';
import { ContentForm, type ContentRecord } from '@/components/admin/editor/content-form';
import { toMediaItem } from '@/lib/content/editor-record';

export const metadata = { title: 'Edit post' };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSession();
  const { id } = await params;

  const [post, categories, tags] = await Promise.all([
    prisma.post.findUnique({
      where: { id },
      include: {
        coverImage: true,
        ogImage: true,
        categories: { select: { categoryId: true } },
        tags: { select: { tagId: true } },
      },
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.tag.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ]);
  if (!post) notFound();

  const record: ContentRecord = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    contentJson: post.contentJson as unknown as JSONContent,
    excerpt: post.excerpt,
    status: post.status,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    coverImage: toMediaItem(post.coverImage),
    ogImage: toMediaItem(post.ogImage),
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    canonicalUrl: post.canonicalUrl,
    noIndex: post.noIndex,
    categoryIds: post.categories.map((c) => c.categoryId),
    tagIds: post.tags.map((t) => t.tagId),
  };

  return (
    <>
      <PageHeader title="Edit post" description={`/${post.slug}`} />
      <ContentForm kind="post" initial={record} categories={categories} tags={tags} />
    </>
  );
}
