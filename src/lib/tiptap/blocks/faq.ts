import { Node, mergeAttributes } from '@tiptap/core';

// FAQ block. `faq` is a container of `faqItem`s. Each item's question is an
// attribute (rendered into <summary>); the answer is editable block content.
// Published as native <details>/<summary> accordions — accessible, zero JS — and
// a FAQPage JSON-LD is emitted separately from the stored JSON (see lib/seo/faq-ld.ts).

export const FaqItem = Node.create({
  name: 'faqItem',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      question: {
        default: 'Question?',
        rendered: false,
        parseHTML: (el) => (el as HTMLElement).querySelector('summary')?.textContent?.trim() || 'Question?',
      },
    };
  },

  parseHTML() {
    return [{ tag: 'details.faq-item', contentElement: '.faq-answer' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const question = String(node.attrs.question ?? 'Question?');
    return [
      'details',
      mergeAttributes(HTMLAttributes, { class: 'faq-item' }),
      ['summary', {}, question],
      ['div', { class: 'faq-answer' }, 0],
    ];
  },
});

export const Faq = Node.create({
  name: 'faq',
  group: 'block',
  content: 'faqItem+',
  defining: true,

  parseHTML() {
    return [{ tag: 'section.faq' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['section', mergeAttributes(HTMLAttributes, { class: 'faq' }), 0];
  },
});
