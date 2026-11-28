/**
 * Content a role page's band derives from its module rather than states in it.
 *
 * Kept apart from the component because two sides of the server/client boundary
 * need the same answer: `HireRoleBands` (client) renders the grid, and
 * `HireRolePage` (server) draws the badge for each of its cards, so the two must
 * agree on the cards' number and order. Types only from the components — no
 * import here reaches a heavy module.
 */

import type { CardGridContent } from '@/components/generative-ai/industries';
import type { HireListBand } from './types';

/**
 * The card grid a `display: 'tiles'` list renders as: each label becomes one
 * tile — a badge and a name, no description — in the order the list gives them.
 */
export function tilesGrid(list: HireListBand): CardGridContent {
  return {
    eyebrow: list.eyebrow,
    title: list.title,
    body: list.body,
    wideHead: list.wideHead,
    cta: list.cta,
    oneRow: list.oneRow,
    items: list.groups.flatMap((g) =>
      g.items.map((name) => ({ name, body: '', key: list.tileIcons?.[name] })),
    ),
  };
}
