import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { env } from '@/lib/env';
import { requireSession } from '@/lib/auth/guards';
import { AdminShell } from '@/components/admin/shell';
import { SecurityPanel } from '@/components/admin/security/security-panel';
import { ThemeToaster } from '@/components/admin/theme-toaster';

export const metadata = {
  title: { default: 'Admin', template: '%s · Admin' },
};

// Server-side auth gate for the whole dashboard (in addition to proxy.ts).
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await requireSession();
  // Admin dark mode is cookie-backed so the `dark` class is server-rendered
  // (no inline script, no flash, correct on client-side navigation).
  const theme = (await cookies()).get('admin-theme')?.value;

  const [user, settings] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.sub },
      select: { email: true, name: true, role: true, twoFactorEnabled: true },
    }),
    prisma.siteSettings.findUnique({ where: { id: 'singleton' }, select: { siteTitle: true } }),
  ]);

  // Session valid but the user record is gone (e.g. deleted mid-session).
  if (!user) redirect('/admin/login');

  // Enforce 2FA for admins when enabled: gate the whole dashboard behind setup.
  if (env.ENFORCE_ADMIN_2FA && user.role === 'ADMIN' && !user.twoFactorEnabled) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <h1 className="mb-4 text-2xl font-semibold">Set up two-factor authentication</h1>
        <SecurityPanel initialEnabled={false} gate />
        <ThemeToaster />
      </div>
    );
  }

  return (
    <div id="admin-shell" className={`flex min-h-screen bg-background text-foreground${theme === 'dark' ? ' dark' : ''}`}>
      <AdminShell role={user.role} siteTitle={settings?.siteTitle ?? 'Softsuave Blog'} user={user}>
        {children}
      </AdminShell>
      <ThemeToaster />
    </div>
  );
}
