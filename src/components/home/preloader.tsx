"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./home.module.css";

/* The Soft Suave mark (favicon geometry, viewBox 0 0 16 16) — the isometric
   S-cube, a single perimeter so it can be traced like a pen stroke. */
const LOGO_POINTS =
  "13.6,3.8 8,7 4.1,4.8 8,2.5 10.2,3.8 11.9,2.8 8,0.5 1.5,4.2 1.5,5.2 7.1,8.5 7.1,13 3.2,10.7 3.2,8.3 1.5,7.2 1.5,11.7 8,15.5 8.9,15 8.9,8.5 12.8,6.3 12.8,10.7 10.6,12 10.6,14 14.5,11.7 14.5,4.2";

/**
 * Intro overlay — a self-drawing logo crest. A dot pulses at the centre, the
 * cube then traces its outline and blooms into the brand gradient (with a faint
 * twin echo trailing a beat behind), wrapped in a heartbeat glow + radar rings,
 * and a shining SOFT SUAVE wordmark. Holds, then fades to reveal the page.
 * Ported from the framer-motion LogoDraw to GSAP. Skipped under reduced motion.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement | null>(null);
  const dot = useRef<SVGCircleElement | null>(null);
  const mark = useRef<SVGPolygonElement | null>(null);
  const twin = useRef<SVGPolygonElement | null>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) {
        setDone(true);
        return;
      }
      document.body.classList.add(styles.scrollLock);

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove(styles.scrollLock);
          setDone(true);
          requestAnimationFrame(() => ScrollTrigger.refresh());
        },
      });

      // Kept intentionally brief (~1s) so it never blocks the page's first paint:
      // the crest draws, blooms, and clears fast for EVERY visitor — real LCP win,
      // no user-agent bypass. starter dot pulses, then the trace unspools from it.
      tl.fromTo(
        dot.current,
        { attr: { r: 0 }, opacity: 0 },
        { attr: { r: 1 }, opacity: 1, duration: 0.12, ease: "power2.out" },
      ).to(dot.current, { attr: { r: 0 }, opacity: 0, duration: 0.12, ease: "power2.in" });

      // twin echo traces alongside, a beat behind and faint
      tl.to(twin.current, { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut" }, 0.14);
      // main mark traces its outline, then the gradient fill blooms in
      tl.to(mark.current, { strokeDashoffset: 0, duration: 0.45, ease: "power1.inOut" }, 0.12);
      tl.to(mark.current, { fillOpacity: 1, duration: 0.22, ease: "power2.out" }, "-=0.15");

      // brief hold, then exit
      tl.to(`.${styles.preCrest}`, { opacity: 0, scale: 0.92, duration: 0.2, ease: "power2.inOut" }, "+=0.04")
        .to(root.current, { opacity: 0, duration: 0.24, ease: "power2.out" }, "-=0.08");
    },
    { scope: root },
  );

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
            ref={twin}
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

          {/* starter dot */}
          <circle ref={dot} cx="8" cy="8" r="0" fill="url(#preLogoGrad)" opacity={0} />

          {/* main mark — traces, then fills */}
          <polygon
            ref={mark}
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
