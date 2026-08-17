import { Node, mergeAttributes } from '@tiptap/core';

// Generic collapsible section — same native <details>/<summary> mechanics as the
// FAQ block, but deliberately a SEPARATE node type.
//
// faqLd() builds FAQPage JSON-LD by walking nodes of type `faqItem`, so authors
// currently have to abuse the FAQ block for any collapsible content, which
// silently injects non-Q&A text into the structured data. These nodes are invisible
// to that walk, so collapsing "optional detail" no longer pollutes the schema.
// Distinct classes (.accordion / .ac-item) also keep parseHTML unambiguous.

export const AccordionItem = Node.create({
  name: 'accordionItem',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      title: {
        default: 'Section title',
        rendered: false,
        parseHTML: (el) => (el as HTMLElement).querySelector('summary')?.textContent?.trim() || 'Section title',
      },
    };
  },

  parseHTML() {
    return [{ tag: 'details.ac-item', contentElement: '.ac-body' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const title = String(node.attrs.title ?? 'Section title');
    return [
      'details',
      mergeAttributes(HTMLAttributes, { class: 'ac-item' }),
      ['summary', {}, title],
      ['div', { class: 'ac-body' }, 0],
    ];
  },
});

export const Accordion = Node.create({
  name: 'accordion',
  group: 'block',
  content: 'accordionItem+',
  defining: true,

  parseHTML() {
    return [{ tag: 'div.accordion' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'accordion' }), 0];
  },
});
