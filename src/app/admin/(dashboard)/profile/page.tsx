import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/auth/guards';
import { toMediaItem } from '@/lib/content/editor-record';
import { PageHeader } from '@/components/admin/page-header';
import { ProfileForm, type ProfileInitial } from '@/components/admin/profile/profile-form';

export const metadata = { title: 'Profile' };

function parseSocial(json: unknown): { label: string; url: string }[] {
  if (!Array.isArray(json)) return [];
  return json
    .filter((x): x is { label?: unknown; url?: unknown } => !!x && typeof x === 'object' && typeof (x as { url?: unknown }).url === 'string')
    .map((x) => ({ label: String(x.label ?? x.url), url: String(x.url) }));
}

export default async function ProfilePage() {
  const session = await requireSession();
  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { name: true, title: true, bio: true, socialLinksJson: true, avatar: true },
  });

  const initial: ProfileInitial = {
    name: user?.name ?? '',
    title: user?.title ?? '',
    bio: user?.bio ?? '',
    socialLinks: parseSocial(user?.socialLinksJson),
    avatar: toMediaItem(user?.avatar ?? null),
  };

  return (
    <>
      <PageHeader title="Profile" description="Your public author profile — shown in the byline and bio box on posts." />
      <ProfileForm initial={initial} />
    </>
  );
}
