import { requireSession } from '@/lib/auth/guards';
import { PageHeader } from '@/components/admin/page-header';
import { MediaLibrary } from '@/components/admin/media/media-library';

export const metadata = { title: 'Media' };

export default async function MediaPage() {
  await requireSession();
  return (
    <>
      <PageHeader title="Media" description="Upload and manage images. Alt text is required." />
      <MediaLibrary />
    </>
  );
}
