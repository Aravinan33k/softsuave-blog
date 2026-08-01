import { Node, mergeAttributes } from '@tiptap/core';

// An image with an editable caption, rendered as a semantic <figure>. The image
// src/alt are attributes (set via the media picker); the caption is editable
// inline content. Round-trips as <figure class="fig"><img><figcaption>…</figcaption></figure>.
export const FigureImage = Node.create({
  name: 'figureImage',
  group: 'block',
  content: 'inline*',
  draggable: true,
  isolating: true,

  addAttributes() {
    // rendered:false — the <img> is built by hand in renderHTML, so these must
    // not also leak onto the <figure>.
    return {
      src: { default: '', rendered: false },
      alt: { default: '', rendered: false },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'figure.fig',
        contentElement: 'figcaption',
        getAttrs: (el) => {
          const img = (el as HTMLElement).querySelector('img');
          if (!img) return false;
          return { src: img.getAttribute('src') ?? '', alt: img.getAttribute('alt') ?? '' };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const src = String(node.attrs.src ?? '');
    const alt = String(node.attrs.alt ?? '');
    return [
      'figure',
      mergeAttributes(HTMLAttributes, { class: 'fig' }),
      ['img', { src, alt, loading: 'lazy', decoding: 'async' }],
      ['figcaption', {}, 0],
    ];
  },
});
