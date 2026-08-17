import { Node, mergeAttributes } from '@tiptap/core';

// Responsive Vimeo embed, mirroring the YouTube node. Stores the numeric id plus
// the optional privacy hash unlisted videos need (vimeo.com/123456/abcdef →
// player.vimeo.com/video/123456?h=abcdef). player.vimeo.com was already on the
// sanitizer's iframe host allowlist before this node existed.
export function parseVimeoId(input: string): { id: string; hash: string } | null {
  const s = input.trim();
  // Bare numeric id, optionally `id/hash`.
  const bare = s.match(/^(\d{6,12})(?:\/([A-Za-z0-9]+))?$/);
  if (bare) return { id: bare[1], hash: bare[2] ?? '' };

  const patterns = [
    // player.vimeo.com/video/123456?h=abcdef
    /player\.vimeo\.com\/video\/(\d{6,12})(?:\?[^#]*\bh=([A-Za-z0-9]+))?/,
    // vimeo.com/channels/name/123456, vimeo.com/groups/name/videos/123456
    /vimeo\.com\/(?:channels\/[^/]+|groups\/[^/]+\/videos)\/(\d{6,12})()/,
    // vimeo.com/123456/abcdef (unlisted) or vimeo.com/123456
    /vimeo\.com\/(\d{6,12})(?:\/([A-Za-z0-9]+))?/,
  ];
  for (const re of patterns) {
    const m = s.match(re);
    if (m) return { id: m[1], hash: m[2] ?? '' };
  }
  return null;
}

/** Embed URL for a Vimeo id, including the privacy hash when present. */
export function vimeoEmbedUrl(id: string, hash: string): string {
  return `https://player.vimeo.com/video/${id}${hash ? `?h=${hash}` : ''}`;
}

export const VimeoEmbed = Node.create({
  name: 'vimeoEmbed',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    // rendered:false — the iframe is built by hand in renderHTML, so none of
    // these may also leak onto the wrapper <div>. title/description/uploadDate
    // exist to feed VideoObject JSON-LD (see lib/seo/video-ld.ts).
    return {
      videoId: { default: '', rendered: false },
      videoHash: { default: '', rendered: false },
      title: { default: '', rendered: false },
      description: { default: '', rendered: false },
      uploadDate: { default: '', rendered: false },
      // Vimeo has no deterministic thumbnail URL (it needs an API call), so unlike
      // YouTube this must be supplied by hand for VideoObject to be emitted.
      thumbnailUrl: { default: '', rendered: false },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.embed-vimeo',
        getAttrs: (el) => {
          const iframe = (el as HTMLElement).querySelector('iframe');
          const parsed = parseVimeoId(iframe?.getAttribute('src') ?? '');
          return parsed ? { videoId: parsed.id, videoHash: parsed.hash } : false;
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const id = String(node.attrs.videoId ?? '');
    const hash = String(node.attrs.videoHash ?? '');
    const title = String(node.attrs.title ?? '') || 'Vimeo video';
    return [
      'div',
      mergeAttributes(HTMLAttributes, { class: 'embed embed-vimeo' }),
      [
        'iframe',
        {
          src: vimeoEmbedUrl(id, hash),
          title,
          loading: 'lazy',
          frameborder: '0',
          referrerpolicy: 'strict-origin-when-cross-origin',
          allow: 'autoplay; fullscreen; picture-in-picture; clipboard-write',
          allowfullscreen: 'true',
        },
      ],
    ];
  },
});
