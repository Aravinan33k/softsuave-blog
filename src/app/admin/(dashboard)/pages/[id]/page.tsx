import { notFound } from 'next/navigation';
import type { JSONContent } from '@tiptap/core';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/auth/guards';
import { PageHeader } from '@/components/admin/page-header';
import { ContentForm, type ContentRecord } from '@/components/admin/editor/content-form';
import { toMediaItem } from '@/lib/content/editor-record';

export const metadata = { title: 'Edit page' };

export default async function EditPageRoute({ params }: { params: Promise<{ id: string }> }) {
  await requireSession();
  const { id } = await params;

  const page = await prisma.page.findUnique({
    where: { id },
    include: { coverImage: true, ogImage: true },
  });
  if (!page) notFound();

  const record: ContentRecord = {
    id: page.id,
    title: page.title,
    slug: page.slug,
    contentJson: page.contentJson as unknown as JSONContent,
    excerpt: page.excerpt,
    status: page.status,
    publishedAt: page.publishedAt?.toISOString() ?? null,
    coverImage: toMediaItem(page.coverImage),
    ogImage: toMediaItem(page.ogImage),
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    canonicalUrl: page.canonicalUrl,
    noIndex: page.noIndex,
    categoryIds: [],
    tagIds: [],
  };

  return (
    <>
      <PageHeader title="Edit page" description={`/${page.slug}`} />
      <ContentForm kind="page" initial={record} />
    </>
  );
}
