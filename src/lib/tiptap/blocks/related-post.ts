import { Node, mergeAttributes } from '@tiptap/core';
import type { DOMOutputSpec } from '@tiptap/pm/model';

// Inline "related reading" card for mid-article internal linking. The theme
// already renders an automatic related-posts list at the foot of a post; this is
// the manual, in-body counterpart an author places next to the relevant paragraph.
//
// The card stores a plain slug and renders a root-relative href, so links keep
// working across environments (localhost / preview / production) and can't be
// pointed at an external host from the editor. The title is a styled <p>, not a
// heading, so these cards never enter the heading hierarchy or the TOC.
const s = (v: unknown) => String(v ?? '');

/** Normalise a picked slug to a root-relative path. */
export function relatedHref(slug: string): string {
  const clean = s(slug).trim().replace(/^\/+/, '');
  return clean ? `/${clean}` : '#';
}

export const RelatedPost = Node.create({
  name: 'relatedPost',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      slug: { default: '', rendered: false },
      title: { default: '', rendered: false },
      excerpt: { default: '', rendered: false },
      label: { default: 'Related reading', rendered: false },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'aside.related-card',
        getAttrs: (el) => {
          const e = el as HTMLElement;
          const href = e.querySelector('a')?.getAttribute('href') ?? '';
          return {
            slug: href.replace(/^\//, ''),
            title: e.querySelector('.related-card-title')?.textContent?.trim() || '',
            excerpt: e.querySelector('.related-card-excerpt')?.textContent?.trim() || '',
            label: e.querySelector('.related-card-label')?.textContent?.trim() || 'Related reading',
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const label = s(node.attrs.label) || 'Related reading';
    const title = s(node.attrs.title);
    const excerpt = s(node.attrs.excerpt);

    const inner: DOMOutputSpec[] = [['p', { class: 'related-card-label' }, label]];
    inner.push([
      'a',
      { class: 'related-card-title', href: relatedHref(s(node.attrs.slug)) },
      title || 'Untitled post',
    ]);
    if (excerpt) inner.push(['p', { class: 'related-card-excerpt' }, excerpt]);

    return [
      'aside',
      mergeAttributes(HTMLAttributes, { class: 'related-card' }),
      ...inner,
    ] as unknown as DOMOutputSpec;
  },
});
