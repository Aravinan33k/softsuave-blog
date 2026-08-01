import { getSiteInfo, getPublishedPosts } from '@/lib/public/queries';
import { getActiveTheme } from '@/lib/public/theme';

// Admin-only (proxy-protected) live preview of any theme, used by the settings
// page iframe. Dynamic so ?theme= is honoured; renders no admin chrome.
export const dynamic = 'force-dynamic';

export default async function ThemePreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ theme?: string }>;
}) {
  const { theme } = await searchParams;
  const [site, activeTheme, { posts }] = await Promise.all([
    getSiteInfo(),
    getActiveTheme(theme),
    getPublishedPosts({ perPage: 8 }),
  ]);
  const { Layout, ArchiveView } = activeTheme;

  return (
    <Layout site={site}>
      <ArchiveView site={site} heading={site.tagline ?? 'Latest posts'} description={site.description} posts={posts} />
    </Layout>
  );
}
