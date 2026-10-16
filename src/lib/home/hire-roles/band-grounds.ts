/**
 * Which ground — warm white or dark — each band of a role page sits on.
 *
 * Pure data work, kept out of the component so the rhythm it produces can be
 * asserted directly: these pages each run their own `order`, and the pattern
 * has to hold for every one of them.
 */

import type { HireBand } from './types';

export type Ground = 'light' | 'dark';

/**
 * The bands that keep their own ground wherever a page happens to place them.
 *
 * Every section here is token-driven and renders correctly on either ground —
 * the AI pages already run the same components both ways — so these are chosen
 * for meaning, not necessity. The client strip, the stories and the FAQ open
 * and close the page on warm white against the dark hero and the dark closing
 * band, the way the homepage and every AI page bookend themselves. The mid-page
 * CTA and the technology bands stay dark because both are meant to interrupt.
 *
 * Everything else is free, and `assignGrounds` places it.
 */
const ANCHORED: Readonly<Record<string, Ground>> = {
  clients: 'light',
  testimonials: 'light',
  faq: 'light',
  midCta: 'dark',
  techStack: 'dark',
};

/** A `list:` band is the technology treatment, so it takes its ground too. */
function anchorOf(band: HireBand): Ground | undefined {
  return band.startsWith('list:') ? 'dark' : ANCHORED[band];
}

/**
 * What a chapter of n bands costs. Two is the rhythm these pages are built on
 * (the AI pages pair their sections the same way), three still reads as one
 * chapter, and a lone band between two of the other ground is a stripe — so it
 * is allowed, but only where the anchors leave no alternative.
 */
const CHAPTER_COST = [0, 3, 0, 1];
const MAX_CHAPTER = CHAPTER_COST.length - 1;
/** Opening or closing on the wrong ground costs more than any arrangement. */
const BOOKEND_COST = 50;

/**
 * Choose a ground per band so the page alternates in even chapters.
 *
 * Doing this per band — "overview is light, comparison is dark" — is what made
 * the pages look arbitrary: each one runs its own `order`, so a fixed mapping
 * landed five dark sections in a row on one page and single-band stripes on
 * another. The pattern is a property of the sequence, not of any one section,
 * so it is computed from the sequence.
 *
 * A shortest-path walk over (ground, chapter length) with the costs above: it
 * returns the cheapest arrangement, which is the one that opens light under the
 * dark hero, closes light above the dark enquiry band, keeps every chapter to
 * two or three bands, and honours every anchor. Thirteen bands at two choices
 * each, so the search is trivial and the result is deterministic.
 */
export function assignGrounds(bands: readonly HireBand[]): Ground[] {
  if (bands.length === 0) return [];
  const GROUNDS: readonly Ground[] = ['light', 'dark'];
  const other = (g: Ground): Ground => (g === 'light' ? 'dark' : 'light');
  const fits = (i: number, g: Ground) => {
    const a = anchorOf(bands[i]);
    return a === undefined || a === g;
  };

  type State = { cost: number; path: Ground[] };
  let paths = new Map<string, State>();
  const keep = (map: Map<string, State>, key: string, state: State) => {
    const held = map.get(key);
    if (!held || held.cost > state.cost) map.set(key, state);
  };

  for (const g of GROUNDS) {
    if (fits(0, g)) keep(paths, `${g}:1`, { cost: g === 'light' ? 0 : BOOKEND_COST, path: [g] });
  }

  for (let i = 1; i < bands.length; i += 1) {
    const next = new Map<string, State>();
    for (const [key, state] of paths) {
      const [ground, length] = key.split(':') as [Ground, string];
      const run = Number(length);
      // Carry the chapter on, while it is still short enough to read as one.
      if (run < MAX_CHAPTER && fits(i, ground)) {
        keep(next, `${ground}:${run + 1}`, { cost: state.cost, path: [...state.path, ground] });
      }
      // Or close it here and start the next one on the other ground.
      const flipped = other(ground);
      if (fits(i, flipped)) {
        keep(next, `${flipped}:1`, {
          cost: state.cost + CHAPTER_COST[run],
          path: [...state.path, flipped],
        });
      }
    }
    paths = next;
  }

  let best: State | undefined;
  for (const [key, state] of paths) {
    const [ground, length] = key.split(':') as [Ground, string];
    const cost =
      state.cost + CHAPTER_COST[Number(length)] + (ground === 'light' ? 0 : BOOKEND_COST);
    if (!best || cost < best.cost) best = { cost, path: state.path };
  }
  // Every band accepts at least one ground, so a path always exists.
  return best!.path;
}
