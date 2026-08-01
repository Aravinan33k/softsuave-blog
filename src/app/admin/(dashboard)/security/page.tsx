import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/auth/guards';
import { PageHeader } from '@/components/admin/page-header';
import { SecurityPanel } from '@/components/admin/security/security-panel';

export const metadata = { title: 'Security' };

export default async function SecurityPage() {
  const session = await requireSession();
  const user = await prisma.user.findUnique({ where: { id: session.sub }, select: { twoFactorEnabled: true } });

  return (
    <>
      <PageHeader title="Security" description="Manage two-factor authentication for your account." />
      <SecurityPanel initialEnabled={user?.twoFactorEnabled ?? false} />
    </>
  );
}
