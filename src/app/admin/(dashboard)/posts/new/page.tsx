import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/auth/guards';
import { PageHeader } from '@/components/admin/page-header';
import { ContentForm } from '@/components/admin/editor/content-form';

export const metadata = { title: 'New post' };

export default async function NewPostPage() {
  await requireSession();
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    prisma.tag.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ]);

  return (
    <>
      <PageHeader title="New post" description="Draft a new blog post." />
      <ContentForm kind="post" initial={null} categories={categories} tags={tags} />
    </>
  );
}
