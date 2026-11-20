"use client";

import { useSyncExternalStore } from "react";

/**
 * True while a section's DESKTOP scene is the one on screen.
 *
 * Services and Journey render two layouts — the pinned desktop scene and the
 * mobile stack — and CSS shows one. Both carried real h2/h3s, so every crawl
 * of the homepage counted each section's heading twice and its item headings
 * twice (13 H2s, 32 H3s). Sections use this to give heading tags only to the
 * layout that is showing; the hidden one renders the same classes on divs.
 *
 * The query is the CSS's own switch, verbatim: the desktop containers show at
 * `min-width: 1000px` and are forced off under `prefers-reduced-motion`.
 *
 * The server snapshot is the desktop layout, so server HTML carries one set
 * of headings; a mobile client re-renders the swap straight after hydration.
 */
const QUERY = "(min-width: 1000px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function useDesktopScene(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => true,
  );
}
