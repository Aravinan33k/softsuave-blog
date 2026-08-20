import type { Metadata } from 'next';
import { getSiteInfo, getPublishedPosts } from '@/lib/public/queries';
import { ARCHIVE_PAGE_SIZE } from '@/lib/pagination';
import { getActiveTheme } from '@/lib/public/theme';
import { buildMetadata } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/jsonld';
import { JsonLd } from '@/components/seo/json-ld';

export const revalidate = 300; // ISR fallback; on-demand revalidation on publish

// The blog archive. "/" belongs to the marketing homepage (app/(marketing)),
// so the post listing lives here; /category, /tag and /search still render the
// same theme ArchiveView with a filter applied.
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo();
  // path '/' — the app is mounted at /blog, so its root is the archive's canonical.
  return buildMetadata({ site, title: site.title, description: site.description, path: '/', home: true, type: 'website' });
}

export default async function BlogIndexPage() {
  const [site, theme, { posts, total }] = await Promise.all([
    getSiteInfo(),
    getActiveTheme(),
    getPublishedPosts({ perPage: ARCHIVE_PAGE_SIZE }),
  ]);
  const { Layout, ArchiveView } = theme;

  return (
    <>
      <JsonLd data={organizationLd(site)} />
      <Layout site={site}>
        <ArchiveView site={site} heading={site.tagline ?? 'Latest posts'} description={site.description} posts={posts} total={total} />
      </Layout>
    </>
  );
}
