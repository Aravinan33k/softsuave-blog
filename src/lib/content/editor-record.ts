import type { MediaItem } from '@/components/admin/media/media-picker';

interface MediaLike {
  id: string;
  url: string;
  filename: string;
  altText: string;
  width: number | null;
  height: number | null;
  mimeType: string | null;
}

/** Map a Prisma Media record to the client MediaItem shape (or null). */
export function toMediaItem(m: MediaLike | null): MediaItem | null {
  if (!m) return null;
  return {
    id: m.id,
    url: m.url,
    filename: m.filename,
    altText: m.altText,
    width: m.width,
    height: m.height,
    mimeType: m.mimeType,
  };
}
