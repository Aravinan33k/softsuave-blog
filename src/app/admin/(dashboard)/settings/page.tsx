import { requireRolePage } from '@/lib/auth/guards';
import { prisma } from '@/lib/db';
import { themeList } from '@/themes/registry';
import { toMediaItem } from '@/lib/content/editor-record';
import { PageHeader } from '@/components/admin/page-header';
import { SettingsForm, type SettingsInitial } from '@/components/admin/settings/settings-form';

export const metadata = { title: 'Settings' };

function parseSocial(json: unknown): { label: string; url: string }[] {
  if (!Array.isArray(json)) return [];
  return json
    .filter((x): x is { label?: unknown; url?: unknown } => !!x && typeof x === 'object' && typeof (x as { url?: unknown }).url === 'string')
    .map((x) => ({ label: String(x.label ?? x.url), url: String(x.url) }));
}

export default async function SettingsPage() {
  await requireRolePage('ADMIN');

  const settings = await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: { id: 'singleton' },
    include: { logo: true, favicon: true },
  });

  const initial: SettingsInitial = {
    siteTitle: settings.siteTitle,
    tagline: settings.tagline ?? '',
    siteDescription: settings.siteDescription ?? '',
    accentColor: settings.accentColor,
    fontChoice: (['inter', 'serif', 'mono'].includes(settings.fontChoice) ? settings.fontChoice : 'inter') as SettingsInitial['fontChoice'],
    activeTheme: settings.activeTheme,
    analyticsSnippet: settings.analyticsSnippet ?? '',
    socialLinks: parseSocial(settings.socialLinksJson),
    logo: toMediaItem(settings.logo),
    favicon: toMediaItem(settings.favicon),
  };

  return (
    <>
      <PageHeader title="Settings" description="Site identity, theme, branding, and analytics." />
      <SettingsForm initial={initial} themes={themeList} />
    </>
  );
}
