import { Node, mergeAttributes } from '@tiptap/core';

// A call-to-action button: a block-level anchor styled as a button. The label is
// editable inline content; href + variant are attributes edited from the toolbar.
// Renders (and round-trips) as <a class="cta-btn cta-{variant}" href>…label…</a>.
export const CTA_VARIANTS = ['primary', 'secondary', 'outline'] as const;
export type CtaVariant = (typeof CTA_VARIANTS)[number];

function variantFromClass(className: string | null): CtaVariant {
  const m = (className ?? '').match(/cta-(primary|secondary|outline)/);
  return (m?.[1] as CtaVariant) ?? 'primary';
}

export const CtaButton = Node.create({
  name: 'ctaButton',
  group: 'block',
  content: 'inline*',
  marks: '',
  defining: true,

  addAttributes() {
    return {
      href: {
        default: '#',
        parseHTML: (el) => (el as HTMLElement).getAttribute('href') ?? '#',
        renderHTML: (attrs) => ({ href: attrs.href || '#' }),
      },
      variant: {
        default: 'primary' as CtaVariant,
        rendered: false,
        parseHTML: (el) => variantFromClass((el as HTMLElement).getAttribute('class')),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'a.cta-btn' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const variant = (node.attrs.variant as CtaVariant) ?? 'primary';
    return [
      'a',
      mergeAttributes(HTMLAttributes, { class: `cta-btn cta-${variant}`, rel: 'noopener noreferrer' }),
      0,
    ];
  },
});
