"use client";

import { useEffect, useState } from "react";
import styles from "./home.module.css";

/** Which surface currently sits under a fixed overlay element.
 *  `hero` — still over the hero, so the overlay stays fully transparent.
 *  `light` / `dark` — an inversion band or the default near-black canvas. */
export type SurfaceTone = "hero" | "light" | "dark";

/** The page-level inversion bands. `.light`/`.cream` are the two wrappers
 *  `(marketing)` pages use for the band rhythm; `data-nav-tone="light"` is the
 *  manual escape hatch for a light section that is styled some other way. */
const LIGHT_BANDS = [`.${styles.light}`, `.${styles.cream}`, '[data-nav-tone="light"]']
  .filter((s) => !s.startsWith(".undefined"))
  .join(",");

/**
 * Tracks the tone of whatever is scrolling under a fixed top overlay, so the
 * overlay can match it. Probes a single point `probeOffset` px below the
 * viewport top (≈ the nav's lower edge): the hero wins first — it keeps the
 * overlay transparent for its whole height — then any light band that covers
 * the probe, else dark.
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
        setTone("hero");
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
