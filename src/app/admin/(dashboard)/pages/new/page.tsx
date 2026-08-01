import { requireSession } from '@/lib/auth/guards';
import { PageHeader } from '@/components/admin/page-header';
import { ContentForm } from '@/components/admin/editor/content-form';

export const metadata = { title: 'New page' };

export default async function NewPage() {
  await requireSession();
  return (
    <>
      <PageHeader title="New page" description="Create a standalone page." />
      <ContentForm kind="page" initial={null} />
    </>
  );
}
