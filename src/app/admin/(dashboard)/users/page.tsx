import { requireRolePage } from '@/lib/auth/guards';
import { prisma } from '@/lib/db';
import { PageHeader } from '@/components/admin/page-header';
import { TableSearch } from '@/components/admin/table-search';
import { UsersManager, type UserRow } from '@/components/admin/users/users-manager';

export const metadata = { title: 'Users' };

export default async function UsersPage() {
  const session = await requireRolePage('ADMIN');
  const rows = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: { id: true, email: true, name: true, role: true, twoFactorEnabled: true, lastLoginAt: true, createdAt: true },
  });
  const users: UserRow[] = rows.map((u) => ({
    ...u,
    lastLoginAt: u.lastLoginAt?.toISOString() ?? null,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <>
      <PageHeader title="Users" description="Invite, remove, and reset admin accounts." />
      <div data-searchable>
        <TableSearch placeholder="Search users…" />
        <UsersManager initialUsers={users} currentUserId={session.sub} />
      </div>
    </>
  );
}
