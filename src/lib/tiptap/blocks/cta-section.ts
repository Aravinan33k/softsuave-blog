import { Node, mergeAttributes } from '@tiptap/core';
import type { DOMOutputSpec } from '@tiptap/pm/model';

// A decorative call-to-action SECTION: a framed card with a title, supporting
// text, and a button. Attribute-driven (edited via a NodeView form) and rendered
// as semantic HTML. The title is a styled <p> (not a heading) so it never pollutes
// the document heading hierarchy / TOC — better for SEO.
export const CtaSection = Node.create({
  name: 'ctaSection',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      title: { default: 'Ready to build with us?', rendered: false },
      text: { default: 'Hire vetted developers & AI experts — evaluated before you commit.', rendered: false },
      buttonLabel: { default: 'Get Started', rendered: false },
      buttonHref: { default: '#', rendered: false },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'section.cta-section',
        getAttrs: (el) => {
          const e = el as HTMLElement;
          const a = e.querySelector('a');
          return {
            title: e.querySelector('.cta-section-title')?.textContent?.trim() || '',
            text: e.querySelector('.cta-section-text')?.textContent?.trim() || '',
            buttonLabel: a?.textContent?.trim() || 'Get Started',
            buttonHref: a?.getAttribute('href') || '#',
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const s = (v: unknown) => String(v ?? '');
    const inner: DOMOutputSpec[] = [['p', { class: 'cta-section-title' }, s(node.attrs.title)]];
    if (node.attrs.text) inner.push(['p', { class: 'cta-section-text' }, s(node.attrs.text)]);
    inner.push([
      'a',
      { class: 'cta-btn cta-primary', href: s(node.attrs.buttonHref) || '#', rel: 'noopener noreferrer' },
      s(node.attrs.buttonLabel) || 'Get Started',
    ]);
    return [
      'section',
      mergeAttributes(HTMLAttributes, { class: 'cta-section' }),
      ['div', { class: 'cta-section-inner' }, ...inner] as unknown as DOMOutputSpec,
    ] as unknown as DOMOutputSpec;
  },
});
