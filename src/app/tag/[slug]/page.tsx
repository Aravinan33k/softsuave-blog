import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSiteInfo, getPublishedPosts, getTagBySlug, getTaxonomySlugs } from '@/lib/public/queries';
import { ARCHIVE_PAGE_SIZE } from '@/lib/pagination';
import { getActiveTheme } from '@/lib/public/theme';
import { buildMetadata } from '@/lib/seo/metadata';

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

  return (
    <Layout site={site}>
      <ArchiveView site={site} heading={`#${tag.name}`} description={tag.description} posts={posts} total={total} filter={{ tag: slug }} />
    </Layout>
  );
}
