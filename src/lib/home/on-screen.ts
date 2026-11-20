/**
 * Is the element on screen right now — as an entrance animation arms, i.e. at
 * hydration for anything above the fold?
 *
 * `FadeUp` and `SplitReveal` skip their entrance for such an element and leave
 * it as the server painted it. Hiding copy the reader can already see (and
 * that Chrome may already have drawn) only to fade it back in made the page's
 * main content count as appearing after every script had loaded — PageSpeed's
 * mobile LCP of ~7 s (15 Oct). Everything below the fold still animates in as
 * it scrolls into view.
 */
export function isOnScreen(el: Element): boolean {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
}
