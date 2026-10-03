import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSiteInfo, getPublishedPosts, getTagBySlug, getTaxonomySlugs } from '@/lib/public/queries';
import { ARCHIVE_PAGE_SIZE } from '@/lib/pagination';
import { getActiveTheme } from '@/lib/public/theme';
import { buildMetadata } from '@/lib/seo/metadata';
import { blogArchiveLd } from '@/lib/seo/blog-graph';
import { MARKETING_SITE_GRAPH } from '@/lib/seo/page-graph';
import { JsonLd } from '@/components/seo/json-ld';

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getTaxonomySlugs('tag');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [site, tag] = await Promise.all([getSiteInfo(), getTagBySlug(slug)]);
  if (!tag) return {};
  return buildMetadata({
    site,
    title: `#${tag.name}`,
    description: tag.description,
    path: `/tag/${slug}`,
    type: 'website',
  });
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) notFound();

  const [site, theme, { posts, total }] = await Promise.all([
    getSiteInfo(),
    getActiveTheme(),
    getPublishedPosts({ tagSlug: slug, perPage: ARCHIVE_PAGE_SIZE }),
  ]);
  const { Layout, ArchiveView } = theme;

  // A filtered archive is a CollectionPage, not a Blog: typing it `Blog` would
  // claim one blog per tag. It hangs off /blog in the trail, and its
  // ItemList names the posts this page lists. These routes emitted no
  // structured data at all before.
  const ld = [
    ...blogArchiveLd({
      path: `/tag/${slug}`,
      name: `#${tag.name}`,
      description: tag.description,
      posts,
      total,
      type: 'CollectionPage',
      parents: [{ name: 'Blog', path: '/blog' }],
    }),
    ...MARKETING_SITE_GRAPH,
  ];

  return (
    <>
      <JsonLd data={ld} />
      <Layout site={site}>
        <ArchiveView site={site} heading={`#${tag.name}`} description={tag.description} posts={posts} total={total} filter={{ tag: slug }} />
      </Layout>
    </>
  );
}
