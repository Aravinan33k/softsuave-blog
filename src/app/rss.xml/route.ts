import { getSiteInfo } from '@/lib/public/queries';
import { getFeedPosts } from '@/lib/seo/entries';
import { buildRss } from '@/lib/seo/feed';

export const revalidate = 300;

export async function GET() {
  const [site, posts] = await Promise.all([getSiteInfo(), getFeedPosts()]);
  return new Response(buildRss(site, posts), {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
}
