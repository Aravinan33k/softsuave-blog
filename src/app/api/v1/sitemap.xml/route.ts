import { getSitemapEntries } from '@/lib/seo/entries';
import { buildSitemapXml } from '@/lib/seo/feed';

// Documented API alias of /sitemap.xml.
export const revalidate = 300;

export async function GET() {
  const entries = await getSitemapEntries();
  return new Response(buildSitemapXml(entries), {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
}
