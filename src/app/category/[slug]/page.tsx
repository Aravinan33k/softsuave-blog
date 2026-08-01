import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSiteInfo, getPublishedPosts, getCategoryBySlug, getTaxonomySlugs } from '@/lib/public/queries';
import { getActiveTheme } from '@/lib/public/theme';
import { buildMetadata } from '@/lib/seo/metadata';

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getTaxonomySlugs('category');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [site, category] = await Promise.all([getSiteInfo(), getCategoryBySlug(slug)]);
  if (!category) return {};
  return buildMetadata({
    site,
    title: `${category.name}`,
    description: category.description,
    path: `/category/${slug}`,
    type: 'website',
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [site, theme, { posts, total }] = await Promise.all([
    getSiteInfo(),
    getActiveTheme(),
    getPublishedPosts({ categorySlug: slug, perPage: 10 }),
  ]);
  const { Layout, ArchiveView } = theme;

  return (
    <Layout site={site}>
      <ArchiveView site={site} heading={category.name} description={category.description} posts={posts} total={total} filter={{ category: slug }} />
    </Layout>
  );
}
