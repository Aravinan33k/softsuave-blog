import { Node, mergeAttributes } from '@tiptap/core';
import type { DOMOutputSpec } from '@tiptap/pm/model';

// Visual rating/score block — for vendor listicles where the score currently sits
// in a table cell as plain text ("5.0/5").
//
// The star row is rendered as discrete ★/☆ characters rather than a partial-width
// overlay on purpose: the sanitizer strips `style` and data attributes, so there
// is no way to publish a percentage width. Stars are therefore rounded to the
// nearest whole star for the visual, while the exact numeric score is always
// printed alongside — the precise value is never lost to the rounding.
const STARS = 5;

export interface RatingAttrs {
  score: string;
  max: string;
  label: string;
  count: string;
}

/** Filled star count for a score, clamped to 0..STARS. NaN scores yield 0. */
export function filledStars(score: number, max: number): number {
  if (!Number.isFinite(score) || !Number.isFinite(max) || max <= 0) return 0;
  return Math.max(0, Math.min(STARS, Math.round((score / max) * STARS)));
}

export const RatingBlock = Node.create({
  name: 'ratingBlock',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      score: { default: '4.8', rendered: false },
      max: { default: '5', rendered: false },
      label: { default: 'Clutch rating', rendered: false },
      count: { default: '', rendered: false },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.rating',
        getAttrs: (el) => {
          const e = el as HTMLElement;
          return {
            score: e.querySelector('.rating-score')?.textContent?.split('/')[0]?.trim() || '0',
            max: e.querySelector('.rating-score')?.textContent?.split('/')[1]?.trim() || '5',
            label: e.querySelector('.rating-label')?.textContent?.trim() || '',
            count: e.querySelector('.rating-count')?.textContent?.trim() || '',
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const score = String(node.attrs.score ?? '');
    const max = String(node.attrs.max ?? '5');
    const label = String(node.attrs.label ?? '');
    const count = String(node.attrs.count ?? '');
    const filled = filledStars(Number.parseFloat(score), Number.parseFloat(max));

    const parts: DOMOutputSpec[] = [
      // The stars duplicate the adjacent numeric score, so hide them from
      // assistive tech rather than announcing "black star" five times.
      ['span', { class: 'rating-stars', 'aria-hidden': 'true' }, '★'.repeat(filled) + '☆'.repeat(STARS - filled)],
      ['span', { class: 'rating-score' }, `${score}/${max}`],
    ];
    if (label) parts.push(['span', { class: 'rating-label' }, label]);
    if (count) parts.push(['span', { class: 'rating-count' }, count]);

    return [
      'div',
      mergeAttributes(HTMLAttributes, { class: 'rating' }),
      ...parts,
    ] as unknown as DOMOutputSpec;
  },
});
