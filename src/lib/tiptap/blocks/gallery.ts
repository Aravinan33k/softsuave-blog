import { Node, mergeAttributes } from '@tiptap/core';
import type { DOMOutputSpec } from '@tiptap/pm/model';

// Image gallery / side-by-side screenshots. Data-driven like the other structured
// blocks: an `items` array edited through a NodeView, published as a grid of
// <figure>s. Column count rides on a class (`gallery-2/3/4`) because the
// sanitizer strips inline styles, so the grid template has to live in CSS.
export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export const GALLERY_COLUMNS = ['2', '3', '4'] as const;
export type GalleryColumns = (typeof GALLERY_COLUMNS)[number];

const s = (v: unknown) => String(v ?? '');

export const ImageGallery = Node.create({
  name: 'imageGallery',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      items: { default: [] as GalleryImage[], rendered: false },
      columns: { default: '2' as GalleryColumns, rendered: false },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.gallery',
        getAttrs: (el) => {
          const e = el as HTMLElement;
          const items: GalleryImage[] = Array.from(e.querySelectorAll('figure')).map((fig) => ({
            src: fig.querySelector('img')?.getAttribute('src') ?? '',
            alt: fig.querySelector('img')?.getAttribute('alt') ?? '',
            caption: fig.querySelector('figcaption')?.textContent?.trim() ?? '',
          }));
          const cols = (e.className.match(/gallery-([234])/)?.[1] ?? '2') as GalleryColumns;
          return items.length ? { items, columns: cols } : false;
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const items = (node.attrs.items as GalleryImage[]) ?? [];
    const columns = s(node.attrs.columns) || '2';
    const figures: DOMOutputSpec[] = items
      .filter((it) => it.src)
      .map((it) => {
        const inner: DOMOutputSpec[] = [
          // loading/decoding are also enforced by the sanitizer, but setting them
          // here keeps the editor preview and published markup identical.
          ['img', { src: s(it.src), alt: s(it.alt), loading: 'lazy', decoding: 'async' }],
        ];
        if (it.caption) inner.push(['figcaption', {}, s(it.caption)]);
        return ['figure', { class: 'gallery-item' }, ...inner] as unknown as DOMOutputSpec;
      });

    return [
      'div',
      mergeAttributes(HTMLAttributes, { class: `gallery gallery-${columns}` }),
      ...figures,
    ] as unknown as DOMOutputSpec;
  },
});
