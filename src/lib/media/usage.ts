import 'server-only';
import { prisma } from '../db';
import type { ImageVariant } from './process';

export interface MediaReference {
  type: 'post' | 'page' | 'settings';
  id: string;
  title: string;
  via: string;
}

export interface MediaUsage {
  references: MediaReference[];
  total: number;
}

/**
 * Where a media item is referenced: as a cover/OG image (FK relations), as the
 * site logo/favicon, or embedded by URL inside rendered post/page HTML.
 */
export async function getMediaUsage(mediaId: string, mediaUrl: string): Promise<MediaUsage> {
  const [coverPosts, ogPosts, coverPages, ogPages, settings, htmlPosts, htmlPages] = await Promise.all([
    prisma.post.findMany({ where: { coverImageId: mediaId }, select: { id: true, title: true } }),
    prisma.post.findMany({ where: { ogImageId: mediaId }, select: { id: true, title: true } }),
    prisma.page.findMany({ where: { coverImageId: mediaId }, select: { id: true, title: true } }),
    prisma.page.findMany({ where: { ogImageId: mediaId }, select: { id: true, title: true } }),
    prisma.siteSettings.findFirst({
      where: { OR: [{ logoMediaId: mediaId }, { faviconMediaId: mediaId }] },
      select: { id: true, logoMediaId: true, faviconMediaId: true },
    }),
    prisma.post.findMany({ where: { contentHtml: { contains: mediaUrl } }, select: { id: true, title: true } }),
    prisma.page.findMany({ where: { contentHtml: { contains: mediaUrl } }, select: { id: true, title: true } }),
  ]);

  const refs: MediaReference[] = [];
  const seen = new Set<string>();
  const add = (type: MediaReference['type'], id: string, title: string, via: string) => {
    const key = `${type}:${id}:${via}`;
    if (seen.has(key)) return;
    seen.add(key);
    refs.push({ type, id, title, via });
  };

  coverPosts.forEach((p) => add('post', p.id, p.title, 'cover image'));
  ogPosts.forEach((p) => add('post', p.id, p.title, 'OG image'));
  htmlPosts.forEach((p) => add('post', p.id, p.title, 'in content'));
  coverPages.forEach((p) => add('page', p.id, p.title, 'cover image'));
  ogPages.forEach((p) => add('page', p.id, p.title, 'OG image'));
  htmlPages.forEach((p) => add('page', p.id, p.title, 'in content'));
  if (settings?.logoMediaId === mediaId) add('settings', settings.id, 'Site settings', 'logo');
  if (settings?.faviconMediaId === mediaId) add('settings', settings!.id, 'Site settings', 'favicon');

  return { references: refs, total: refs.length };
}

/** Delete all stored files (primary + variants) for a media record. */
export async function mediaStorageKeys(variantsJson: unknown): Promise<string[]> {
  if (!Array.isArray(variantsJson)) return [];
  return (variantsJson as ImageVariant[]).map((v) => v.key).filter((k): k is string => typeof k === 'string');
}
