import type { Metadata } from 'next';
import { getSiteInfo, getPublishedPosts } from '@/lib/public/queries';
import { getActiveTheme } from '@/lib/public/theme';
import { buildMetadata } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/jsonld';
import { JsonLd } from '@/components/seo/json-ld';

export const revalidate = 300; // ISR fallback; on-demand revalidation on publish

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo();
  return buildMetadata({ site, title: site.title, description: site.description, path: '/', home: true, type: 'website' });
}

export default async function HomePage() {
  const [site, theme, { posts, total }] = await Promise.all([
    getSiteInfo(),
    getActiveTheme(),
    getPublishedPosts({ perPage: 10 }),
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
