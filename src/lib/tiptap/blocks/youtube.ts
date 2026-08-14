import { Node, mergeAttributes } from '@tiptap/core';

// Responsive YouTube embed. Stores only the video id; renders a privacy-friendly
// youtube-nocookie iframe wrapped in a 16:9 container. The iframe host is also
// enforced by the HTML sanitizer (defense in depth) — see lib/content/render.ts.
export function parseYouTubeId(input: string): string | null {
  const s = input.trim();
  // Already a bare id (11 chars, url-safe).
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  const patterns = [
    /(?:youtube\.com\/watch\?[^#]*\bv=)([A-Za-z0-9_-]{11})/,
    /(?:youtu\.be\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube(?:-nocookie)?\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = s.match(re);
    if (m) return m[1];
  }
  return null;
}

/** Thumbnail URL for a video id. hqdefault always exists; maxres often doesn't. */
export function youtubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export const YoutubeEmbed = Node.create({
  name: 'youtubeEmbed',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    // rendered:false — the iframe is built by hand in renderHTML, so these must
    // not also leak onto the wrapper <div>. description/uploadDate carry no
    // visible output at all; they exist purely to feed VideoObject JSON-LD
    // (see lib/seo/video-ld.ts), which Google requires them for.
    return {
      videoId: { default: '', rendered: false },
      title: { default: 'YouTube video', rendered: false },
      description: { default: '', rendered: false },
      uploadDate: { default: '', rendered: false },
      // Optional override; falls back to the derived i.ytimg.com URL.
      thumbnailUrl: { default: '', rendered: false },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.embed-youtube',
        getAttrs: (el) => {
          const iframe = (el as HTMLElement).querySelector('iframe');
          const src = iframe?.getAttribute('src') ?? '';
          const id = parseYouTubeId(src);
          return id ? { videoId: id } : false;
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const videoId = String(node.attrs.videoId ?? '');
    const title = String(node.attrs.title ?? 'YouTube video');
    return [
      'div',
      mergeAttributes(HTMLAttributes, { class: 'embed embed-youtube' }),
      [
        'iframe',
        {
          src: `https://www.youtube-nocookie.com/embed/${videoId}`,
          title,
          loading: 'lazy',
          frameborder: '0',
          referrerpolicy: 'strict-origin-when-cross-origin',
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
          allowfullscreen: 'true',
        },
      ],
    ];
  },
});
