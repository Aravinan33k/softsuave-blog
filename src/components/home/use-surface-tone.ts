"use client";

import { useEffect, useState } from "react";
import styles from "./home.module.css";

/** Which surface currently sits under a fixed overlay element.
 *  `hero` — over the hero AND at rest, so the overlay stays fully transparent.
 *  `hero-scrolled` — over the hero but scrolled, so the overlay takes a
 *  semi-transparent ground: the hero's own copy is moving up under the bar and
 *  the scrim alone was not keeping the links off it.
 *  `light` / `dark` — an inversion band or the default near-black canvas. */
export type SurfaceTone = "hero" | "hero-scrolled" | "light" | "dark";

/** The page-level inversion bands. `.light`/`.cream` are the two wrappers
 *  `(marketing)` pages use for the band rhythm; `data-nav-tone="light"` is the
 *  manual escape hatch for a light section that is styled some other way. */
const LIGHT_BANDS = [`.${styles.light}`, `.${styles.cream}`, '[data-nav-tone="light"]']
  .filter((s) => !s.startsWith(".undefined"))
  .join(",");

/**
 * Tracks the tone of whatever is scrolling under a fixed top overlay, so the
 * overlay can match it. Probes a single point `probeOffset` px below the
 * viewport top (≈ the nav's lower edge): the hero wins first, then any light
 * band that covers the probe, else dark.
 *
 * The hero used to keep the overlay fully transparent for its whole height,
 * which read correctly only at rest: scroll a pixel and the hero's headline
 * began sliding up behind the links. So the transparent state is now the
 * resting state alone — the first pixel of scroll hands the hero over to
 * `hero-scrolled`, and the bar picks up a ground of its own while the hero is
 * still the thing underneath it.
 *
 * Position-based rather than IntersectionObserver so the tone flips exactly
 * when a band's top edge crosses the bar, not at an arbitrary ratio.
 */
export function useSurfaceTone(probeOffset = 72): SurfaceTone {
  const [tone, setTone] = useState<SurfaceTone>("hero");

  useEffect(() => {
    let raf = 0;

    const covers = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.top <= probeOffset && r.bottom > probeOffset;
    };

    const read = () => {
      raf = 0;
      const hero = document.getElementById("top");
      if (hero && covers(hero)) {
        // `scrollY` and not the hero's own offset: the bar takes its ground on
        // the first pixel the reader moves, whatever the hero's height. Lenis
        // drives the native window scroll, so this is the smoothed value the
        // reader is actually seeing.
        setTone(window.scrollY > 0 ? "hero-scrolled" : "hero");
        return;
      }
      const bands = LIGHT_BANDS ? document.querySelectorAll(LIGHT_BANDS) : [];
      for (const band of Array.from(bands)) {
        if (covers(band)) {
          setTone("light");
          return;
        }
      }
      setTone("dark");
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [probeOffset]);

  return tone;
}
