import { requireRolePage } from '@/lib/auth/guards';
import { prisma } from '@/lib/db';
import { PageHeader } from '@/components/admin/page-header';
import { RedirectsManager } from '@/components/admin/redirects/redirects-manager';

export const metadata = { title: 'Redirects' };

export default async function RedirectsPage() {
  await requireRolePage('ADMIN');
  const items = await prisma.redirect.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, fromPath: true, toPath: true, statusCode: true },
  });
  return (
    <>
      <PageHeader title="Redirects" description="301/302 redirects — essential when migrating URLs from WordPress." />
      <RedirectsManager initialItems={items} />
    </>
  );
}
