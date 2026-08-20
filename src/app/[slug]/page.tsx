import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSiteInfo, getPostBySlug, getPageBySlug, getPublishedPostSlugs, getPublishedPageSlugs, getContentMeta, getRelatedPosts } from '@/lib/public/queries';
import { getActiveTheme } from '@/lib/public/theme';
import { homepageEnabled } from '@/lib/flags';
import { buildMetadata, absoluteUrl } from '@/lib/seo/metadata';
import { blogPostingLd, breadcrumbLd, organizationLd, websiteLd } from '@/lib/seo/jsonld';
import { faqLd } from '@/lib/seo/faq-ld';
import { videoLd } from '@/lib/seo/video-ld';
import { JsonLd } from '@/components/seo/json-ld';

export const revalidate = 300;

export async function generateStaticParams() {
  // This route serves standalone pages as well as posts; prerender both, or the
  // first visitor to /about pays full SSR latency after every deploy.
  const [postSlugs, pageSlugs] = await Promise.all([getPublishedPostSlugs(), getPublishedPageSlugs()]);
  return [...new Set([...postSlugs, ...pageSlugs])].map((slug) => ({ slug }));
}

async function load(slug: string) {
  const post = await getPostBySlug(slug);
  if (post) return { content: post, kind: 'post' as const };
  const page = await getPageBySlug(slug);
  if (page) return { content: page, kind: 'page' as const };
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [site, meta] = await Promise.all([getSiteInfo(), getContentMeta(slug)]);
  if (!meta) return {};

  const images = meta.ogImageUrl
    ? [absoluteUrl(meta.ogImageUrl)]
    : meta.coverImageUrl
      ? [absoluteUrl(meta.coverImageUrl)]
      : undefined;

  return buildMetadata({
    site,
    title: meta.seoTitle || meta.title,
    rawTitle: meta.seoTitle,
    description: meta.seoDescription || meta.excerpt,
    path: `/${slug}`,
    type: meta.kind === 'post' ? 'article' : 'website',
    images,
    noIndex: meta.noIndex,
    canonicalOverride: meta.canonicalUrl,
    publishedTime: meta.publishedAt,
    modifiedTime: meta.updatedAt,
    section: meta.section,
    tags: meta.tags,
    authorName: meta.authorName,
  });
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loaded = await load(slug);
  if (!loaded) notFound();
  const { content, kind } = loaded;

  const [site, theme, relatedPosts] = await Promise.all([
    getSiteInfo(),
    getActiveTheme(),
    kind === 'post' ? getRelatedPosts(content) : Promise.resolve([]),
  ]);
  const { Layout, PostView } = theme;

  const breadcrumb = breadcrumbLd([
    // "/" is a real page only once the marketing homepage ships; until then the
    // trail starts at the archive rather than pointing Google at a redirect.
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: 'Blog', path: '/' },
    ...(content.categories[0] ? [{ name: content.categories[0].name, path: `/category/${content.categories[0].slug}` }] : []),
    { name: content.title, path: `/${slug}` },
  ]);
  const faq = faqLd(content.contentJson);
  // Videos inherit the post's excerpt/publish date when the embed leaves those
  // blank, so a VideoObject still qualifies without re-typing them per video.
  const videos = videoLd(content.contentJson, {
    description: content.excerpt,
    uploadDate: content.publishedAt,
  });
  const ld = [
    ...(kind === 'post' ? [blogPostingLd(site, content)] : []),
    breadcrumb,
    ...(faq ? [faq] : []),
    ...videos,
    organizationLd(site),
    websiteLd(site),
  ];

  return (
    <>
      <JsonLd data={ld} />
      <Layout site={site}>
        <PostView site={site} post={content} relatedPosts={relatedPosts} />
      </Layout>
    </>
  );
}
