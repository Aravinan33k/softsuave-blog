import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/auth/guards';
import { PageHeader } from '@/components/admin/page-header';
import { TaxonomyManager } from '@/components/admin/taxonomy/taxonomy-manager';

export const metadata = { title: 'Categories' };

export default async function CategoriesPage() {
  await requireSession();
  const items = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { posts: true } } },
  });
  return (
    <>
      <PageHeader title="Categories" description="Organise posts into categories." />
      <TaxonomyManager endpoint="/api/v1/admin/categories" itemKey="category" initialItems={items} />
    </>
  );
}
