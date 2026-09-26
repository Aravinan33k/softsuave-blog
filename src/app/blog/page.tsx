import type { Metadata } from 'next';
import { getSiteInfo, getPublishedPosts } from '@/lib/public/queries';
import { ARCHIVE_PAGE_SIZE } from '@/lib/pagination';
import { getActiveTheme } from '@/lib/public/theme';
import { buildMetadata } from '@/lib/seo/metadata';
import { blogArchiveLd } from '@/lib/seo/blog-graph';
import { MARKETING_SITE_GRAPH } from '@/lib/seo/page-graph';
import { JsonLd } from '@/components/seo/json-ld';

export const revalidate = 300; // ISR fallback; on-demand revalidation on publish

// The blog archive. "/" belongs to the marketing homepage (app/(marketing)),
// so the post listing lives here; /category, /tag and /search still render the
// same theme ArchiveView with a filter applied.
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteInfo();
  // `home: true` uses the bare site title rather than the "… | site" template:
  // this is the blog's own landing page, even though "/" is the site's.
  return buildMetadata({ site, title: site.title, description: site.description, path: '/blog', home: true, type: 'website' });
}

export default async function BlogIndexPage() {
  const [site, theme, { posts, total }] = await Promise.all([
    getSiteInfo(),
    getActiveTheme(),
    getPublishedPosts({ perPage: ARCHIVE_PAGE_SIZE }),
  ]);
  const { Layout, ArchiveView } = theme;

  // The archive used to emit one `Organization` and nothing else — no WebSite,
  // no node for the listing itself, no trail. It now carries the same site
  // graph every marketing page does, plus a `Blog` whose ItemList names the
  // posts on this page.
  const ld = [
    ...blogArchiveLd({
      path: '/blog',
      name: site.title,
      description: site.description,
      posts,
      total,
      type: 'Blog',
    }),
    ...MARKETING_SITE_GRAPH,
  ];

  return (
    <>
      <JsonLd data={ld} />
      <Layout site={site}>
        <ArchiveView site={site} heading={site.tagline ?? 'Latest posts'} description={site.description} posts={posts} total={total} />
      </Layout>
    </>
  );
}
