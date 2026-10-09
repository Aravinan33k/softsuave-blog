/**
 * Column spans for the "bold" card layout, as a 12-column composition.
 *
 * Shared by the services grid and the card grids so both compose rows the same
 * way from one implementation.
 *
 * The 12-column track replaced a plain equal-width grid that put every card in
 * one narrow column; at five across each was about 230px wide. Breaking the
 * count into rows of two and three keeps every card wider than that while the
 * cards within a row stay the same width, so the boxes line up as a grid.
 *
 * The rule is "rows of three, or rows of two": the item count is decomposed
 * into 2s and 3s, then a row of two is laid out 6+6 and a row of three 4+4+4.
 * Both sum to 12, so every row fills the width exactly and no count leaves a
 * stranded card. Five items therefore give 6-6 / 4-4-4. (The rows were once
 * weighted 7+5 / 5+4+3; see `spansFor` for why that was dropped.)
 */

/** Decompose `n` into row sizes of 2 and 3. */
function rowSizes(n: number): number[] {
  if (n <= 1) return [n];
  if (n === 2) return [2];
  if (n === 3) return [3];
  const rows: number[] = [];
  const rem = n % 3;
  // A remainder of 1 would leave a single stranded card, so it is spent as two
  // rows of two instead (4 = 2 + 2).
  if (rem === 1) {
    for (let i = 0; i < (n - 4) / 3; i++) rows.push(3);
    rows.push(2, 2);
  } else {
    if (rem === 2) rows.push(2);
    for (let i = 0; i < (n - rem) / 3; i++) rows.push(3);
  }
  return rows;
}

/**
 * One span per card, in order, for `n` cards.
 *
 * Equal widths within a row — 6+6 for a pair, 4+4+4 for a trio. The rows used
 * to be weighted 7+5 and 5+4+3, which meant no two rows shared a column edge:
 * a 7+5 row over a 5+4+3 row put every box boundary in a different place, and
 * the services section read as misaligned rather than composed (review: "the
 * content alignment and service box alignment are missing"). Equal spans line
 * the boxes up into a clean grid; the row decomposition above still keeps any
 * count from stranding a lone card.
 */
export function spansFor(n: number): number[] {
  const out: number[] = [];
  for (const size of rowSizes(n)) {
    if (size === 1) out.push(12);
    else if (size === 2) out.push(6, 6);
    else out.push(4, 4, 4);
  }
  return out;
}

/**
 * Row sizes for the card grids: a leading row of two, then a row of three, then
 * the same rule again on whatever is left.
 *
 *   5 → 2,3      6 → 2,3,1      7 → 2,3,2
 *   8 → 2,3,3    9 → 2,3,2,2   10 → 2,3,2,3
 *
 * The tail cases are what stop the last row looking broken: four remaining
 * cards go 2+2 rather than 3+1, because a lone card beside two-thirds of empty
 * grid reads as a bug, whereas a single card on its OWN row is deliberate and
 * gets the full width (the `1 → 12` case in `gridSpansFor`).
 */
function gridRowSizes(n: number): number[] {
  if (n <= 0) return [];
  if (n <= 3) return [n];
  if (n === 4) return [2, 2];
  return [2, 3, ...gridRowSizes(n - 5)];
}

/**
 * One span per card for the card grids, in order, for `n` cards.
 *
 * Like `spansFor` (which the services grid uses), every card in a row is the
 * same width, and the two differ only in how they break a count into rows.
 * Spans are 12/2 for a pair, 12/3 for a trio, and the full 12 for a card that ends up
 * alone on the final row. Rows therefore always fill the width exactly, so no
 * count can leave a gap or a card of an odd size.
 */
export function gridSpansFor(n: number): number[] {
  const out: number[] = [];
  for (const size of gridRowSizes(n)) {
    if (size === 1) out.push(12);
    else if (size === 2) out.push(6, 6);
    else out.push(4, 4, 4);
  }
  return out;
}
