import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/auth/guards';
import { PageHeader } from '@/components/admin/page-header';
import { TaxonomyManager } from '@/components/admin/taxonomy/taxonomy-manager';

export const metadata = { title: 'Tags' };

export default async function TagsPage() {
  await requireSession();
  const items = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { posts: true } } },
  });
  return (
    <>
      <PageHeader title="Tags" description="Tag posts for cross-cutting topics." />
      <TaxonomyManager endpoint="/api/v1/admin/tags" itemKey="tag" initialItems={items} />
    </>
  );
}
