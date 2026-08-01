import 'server-only';
import { absoluteUrl } from './metadata';
import type { SiteInfo } from '@/themes/_contract';
import type { FeedPost, SitemapEntry } from './entries';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function buildRss(site: SiteInfo, posts: FeedPost[]): string {
  const items = posts
    .map((p) => {
      const link = absoluteUrl(`/${p.slug}`);
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>${p.publishedAt ? `\n      <pubDate>${p.publishedAt.toUTCString()}</pubDate>` : ''}${p.excerpt ? `\n      <description>${esc(p.excerpt)}</description>` : ''}${p.authorName ? `\n      <dc:creator>${esc(p.authorName)}</dc:creator>` : ''}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.title)}</title>
    <link>${absoluteUrl('/')}</link>
    <description>${esc(site.description ?? site.tagline ?? site.title)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

export function buildSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((e) => {
      const images = (e.images ?? [])
        .map((img) => `<image:image><image:loc>${esc(img)}</image:loc></image:image>`)
        .join('');
      return `  <url><loc>${e.url}</loc><lastmod>${e.lastModified.toISOString()}</lastmod>${images}</url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;
}
