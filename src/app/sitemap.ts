import type { MetadataRoute } from 'next';
import { getSitemapEntries } from '@/lib/seo/entries';

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries();
  return entries.map((e) => ({ url: e.url, lastModified: e.lastModified, ...(e.images?.length ? { images: e.images } : {}) }));
}
