import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth/session';
import { LoginForm } from '@/components/admin/login-form';

export const metadata = { title: 'Sign in' };

// Only allow same-app redirect targets to avoid open-redirect abuse via ?next=.
function sanitizeNext(next: string | undefined): string {
  if (next && next.startsWith('/admin') && !next.startsWith('//')) return next;
  return '/admin';
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath = sanitizeNext(next);

  const session = await getSession();
  if (session) redirect(nextPath);

  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'singleton' },
    select: { siteTitle: true },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <LoginForm nextPath={nextPath} siteTitle={settings?.siteTitle ?? 'Softsuave Blog'} />
    </div>
  );
}
