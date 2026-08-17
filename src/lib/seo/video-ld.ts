import type { JSONContent } from '@tiptap/core';
import { youtubeThumbnail } from '@/lib/tiptap/blocks/youtube';
import { vimeoEmbedUrl } from '@/lib/tiptap/blocks/vimeo';

// Build VideoObject JSON-LD from a post's TipTap document by walking its video
// embed nodes. Unlike FAQ rich results (which Google restricted to authoritative
// government/health sites in 2023), video rich results are still generally
// available, so this is worth emitting.
//
// Google treats name, description, thumbnailUrl and uploadDate as REQUIRED. A
// VideoObject missing any of them earns a Search Console error rather than a rich
// result, so an incomplete video is skipped entirely instead of half-described.
// Post-level values are accepted as fallbacks for description/uploadDate, but
// never for the name — an untitled embed is skipped.

const PLACEHOLDER_TITLES = new Set(['', 'youtube video', 'vimeo video']);

export interface VideoLdFallbacks {
  description?: string | null;
  uploadDate?: string | Date | null;
}

function isoDate(value: unknown): string {
  if (!value) return '';
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? '' : value.toISOString();
  const s = String(value).trim();
  // Accept what <input type="date"> produces (YYYY-MM-DD) and full ISO stamps.
  return /^\d{4}-\d{2}-\d{2}(T.*)?$/.test(s) ? s : '';
}

export function videoLd(doc: unknown, fallbacks: VideoLdFallbacks = {}): Record<string, unknown>[] {
  const root = doc as JSONContent | null;
  if (!root || !Array.isArray(root.content)) return [];

  const fallbackDescription = String(fallbacks.description ?? '').trim();
  const fallbackDate = isoDate(fallbacks.uploadDate);

  const out: Record<string, unknown>[] = [];

  const walk = (node: JSONContent) => {
    const a = node.attrs ?? {};
    let embedUrl = '';
    let thumbnailUrl = String(a.thumbnailUrl ?? '').trim();

    if (node.type === 'youtubeEmbed' && a.videoId) {
      embedUrl = `https://www.youtube-nocookie.com/embed/${String(a.videoId)}`;
      if (!thumbnailUrl) thumbnailUrl = youtubeThumbnail(String(a.videoId));
    } else if (node.type === 'vimeoEmbed' && a.videoId) {
      embedUrl = vimeoEmbedUrl(String(a.videoId), String(a.videoHash ?? ''));
    }

    if (embedUrl) {
      const name = String(a.title ?? '').trim();
      const description = String(a.description ?? '').trim() || fallbackDescription;
      const uploadDate = isoDate(a.uploadDate) || fallbackDate;

      // All four are required by Google; skip rather than emit a partial object.
      if (!PLACEHOLDER_TITLES.has(name.toLowerCase()) && description && thumbnailUrl && uploadDate) {
        out.push({
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name,
          description,
          thumbnailUrl,
          uploadDate,
          embedUrl,
        });
      }
    }

    if (node.content) node.content.forEach(walk);
  };
  walk(root);

  return out;
}
