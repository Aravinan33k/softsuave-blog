"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./home.module.css";

/* The Soft Suave mark (favicon geometry, viewBox 0 0 16 16) — the isometric
   S-cube, a single perimeter so it can be traced like a pen stroke. */
const LOGO_POINTS =
  "13.6,3.8 8,7 4.1,4.8 8,2.5 10.2,3.8 11.9,2.8 8,0.5 1.5,4.2 1.5,5.2 7.1,8.5 7.1,13 3.2,10.7 3.2,8.3 1.5,7.2 1.5,11.7 8,15.5 8.9,15 8.9,8.5 12.8,6.3 12.8,10.7 10.6,12 10.6,14 14.5,11.7 14.5,4.2";

/**
 * Intro overlay — a self-drawing logo crest. A dot pulses at the centre, the
 * cube then traces its outline and blooms into the brand gradient (with a faint
 * twin echo trailing a beat behind), wrapped in a heartbeat glow + radar rings.
 * Holds, then fades to reveal the page. Skipped under reduced motion.
 *
 * The whole sequence is CSS (PRELOADER in home.module.css), so it plays from
 * the first paint and clears at ~1s whether or not this bundle has loaded
 * (BUG-026). It used to be a GSAP timeline, which could only start after
 * hydration and kept a mid-range phone behind an opaque layer for seconds.
 * This component only locks scrolling for whatever is left of the intro when
 * it hydrates, then unmounts the overlay.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    let cancelled = false;
    const finish = () => {
      if (cancelled) return;
      document.body.classList.remove(styles.scrollLock);
      setDone(true);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    // The overlay's own fade (`preOut`) — not its subtree, whose glow and
    // rings loop forever and would never settle.
    const exit = el && !prefersReducedMotion() ? el.getAnimations() : [];
    if (!exit.length || exit.every((a) => a.playState === "finished")) {
      // Already gone (a slow load) or never played: just unmount.
      requestAnimationFrame(finish);
    } else {
      document.body.classList.add(styles.scrollLock);
      Promise.all(exit.map((a) => a.finished)).then(finish, finish);
    }
    return () => {
      cancelled = true;
      document.body.classList.remove(styles.scrollLock);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className={styles.preloader}>
      <div className={styles.preCrest}>
        <span className={styles.preGlow} aria-hidden />
        <span className={styles.preRing} aria-hidden />
        <span className={styles.preRing} aria-hidden style={{ animationDelay: "0.7s" }} />
        <span className={styles.preTrack} aria-hidden />

        <svg viewBox="0 0 16 16" className={styles.preLogoSvg} aria-label="Soft Suave">
          <defs>
            <linearGradient id="preLogoGrad" x1="8" y1="0.5" x2="8" y2="15.5" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FF6C3A" />
              <stop offset="1" stopColor="#FF0042" />
            </linearGradient>
          </defs>

          {/* twin echo — diagonally offset, lags a beat behind */}
          <polygon
            className={styles.preTwin}
            points={LOGO_POINTS}
            transform="translate(1.1 1.1)"
            fill="none"
            stroke="url(#preLogoGrad)"
            strokeWidth={0.45}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.4}
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />

          {/* starter dot — full size here; `.preDot` scales it in and out */}
          <circle className={styles.preDot} cx="8" cy="8" r="1" fill="url(#preLogoGrad)" />

          {/* main mark — traces, then fills */}
          <polygon
            className={styles.preMark}
            points={LOGO_POINTS}
            fill="url(#preLogoGrad)"
            stroke="url(#preLogoGrad)"
            strokeWidth={0.55}
            strokeLinejoin="round"
            strokeLinecap="round"
            pathLength={1}
            fillOpacity={0}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
        </svg>
      </div>
    </div>
  );
}
