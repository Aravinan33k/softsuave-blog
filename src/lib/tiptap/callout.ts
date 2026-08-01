import { Node, mergeAttributes } from '@tiptap/core';

// A "callout" / "Key Takeaways" box: a block container rendered as
// <div class="callout callout-{variant}">. Having it as a first-class node means
// it survives the HTML → TipTap JSON → HTML round-trip (plain <div>s do not).
// The variant drives colour + a leading emoji (added purely via CSS ::before, so
// the editable content stays clean). Imported "Key Takeaways" columns map here.
export const CALLOUT_VARIANTS = ['tldr', 'note', 'tip', 'warning', 'success', 'error'] as const;
export type CalloutVariant = (typeof CALLOUT_VARIANTS)[number];

function variantFromClass(className: string | null): CalloutVariant {
  const m = (className ?? '').match(/callout-(tldr|note|tip|warning|success|error)/);
  return (m?.[1] as CalloutVariant) ?? 'note';
}

export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      variant: {
        default: 'note' as CalloutVariant,
        // Stored in contentJson; serialised into the class by renderHTML below,
        // so we don't emit a separate HTML attribute for it.
        rendered: false,
        parseHTML: (el) => variantFromClass((el as HTMLElement).getAttribute('class')),
      },
    };
  },

  parseHTML() {
    return [
      { tag: 'div.callout' },
      { tag: 'div.key-takeaways' },
      { tag: 'div.wp-block-group.is-style-callout' },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const variant = (node.attrs.variant as CalloutVariant) ?? 'note';
    return ['div', mergeAttributes(HTMLAttributes, { class: `callout callout-${variant}` }), 0];
  },
});
