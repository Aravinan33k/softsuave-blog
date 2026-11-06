"use client";

import { useRef } from "react";
import styles from "./home.module.css";
import { useNearViewport } from "./use-deferred-media";

/**
 * The generated light-field backdrop, as a drop-in layer.
 *
 * The closing enquiry band (`contact.tsx`) established this treatment: a
 * procedurally generated loop of coral light blooming through dark haze, graded
 * under a veil so display copy stays readable over it. The mid-page CTA bands
 * now take the same backdrop, so the two conversion moments on a page read as
 * the same surface rather than as a video band and a tinted rectangle.
 *
 * It is one component rather than three copies because there are three separate
 * CtaBand implementations (landing, services, generative-ai) with their own CSS
 * modules. Styles come from `home.module.css`, which works wherever this is
 * rendered — CSS modules scope by class name, not by tree position.
 *
 * The host section must set `position: relative`, `overflow: hidden` and
 * `isolation: isolate`, and give its own content a stacking context above this
 * one. See `.ctaBand` in each module.
 *
 * The <video> mounts only as the band nears the viewport (`useNearViewport`),
 * as the closing band's does; the poster underneath is a frame of the same
 * loop, so there is nothing to see happen when it swaps in.
 *
 * UNGATED, TEMPORARILY — same as the closing band, and the same caveat applies:
 * the `prefers-reduced-motion` check and the lazy mount both need restoring
 * before this ships, and doing it here now fixes every band at once.
 */
export default function LightFieldBackdrop() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mounted = useNearViewport(ref);

  return (
    <div ref={ref} className={styles.lfBackdrop} aria-hidden>
      <div className={styles.lfPoster} data-near={mounted || undefined} />
      {mounted && (
        <video className={styles.lfVideo} autoPlay muted loop playsInline preload="auto">
          <source src="/videos/contact-light.webm" type="video/webm" />
          <source src="/videos/contact-light.mp4" type="video/mp4" />
        </video>
      )}
      <div className={styles.lfVeil} />
    </div>
  );
}
