"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./multi-vendor.module.css";

interface Shot {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

/** Dwell on each screen, ms — the live carousel advances every two seconds. */
const DWELL = 2000;

/**
 * The live "Other Features" carousel: the phone outline stays put in the middle while the app screens slide
 * past it, one centred in the outline and its neighbours either side (three across from 1000px, one below),
 * advancing every two seconds and looping. Arrows from 1000px, dots below it, as on the live page. It does not
 * pause on hover. Reduced motion switches the advance off; the arrows and dots stay as the control.
 *
 * Each screen sits at a signed offset from the centred one, wrapped into -3…2, and slides by that many slide
 * widths. The two slots beyond the visible three jump without a transition, so a screen wrapping round the
 * loop never travels across the view.
 */
export default function PhoneSlider({ phone, screens }: { phone: Shot; screens: readonly Shot[] }) {
  const n = screens.length;
  const [index, setIndex] = useState(0);

  const go = useCallback((by: number) => setIndex((i) => (i + by + n) % n), [n]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % n), DWELL);
    return () => window.clearInterval(id);
  }, [n, index]);

  const offsetOf = (i: number) => {
    let o = (i - index + n) % n;
    if (o > n / 2 - 1) o -= n;
    return o;
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.stage}>
        <Image src={phone.src} alt={phone.alt} width={phone.width} height={phone.height} unoptimized className={styles.phoneFrame} />
        <div className={styles.track}>
          {screens.map((s, i) => {
            const o = offsetOf(i);
            const hidden = Math.abs(o) > 1;
            return (
              <div
                key={s.src}
                className={styles.slide}
                style={{ ["--off" as string]: o }}
                data-edge={o === -3 || o === 2 || undefined}
                aria-hidden={o === 0 ? undefined : true}
              >
                <Image src={s.src} alt={s.alt} width={s.width} height={s.height} unoptimized className={styles.shot} data-far={hidden || undefined} />
              </div>
            );
          })}
        </div>
        <button type="button" className={`${styles.arrow} ${styles.arrowPrev}`} aria-label="Previous screen" onClick={() => go(-1)} />
        <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} aria-label="Next screen" onClick={() => go(1)} />
      </div>
      <div className={styles.dots}>
        {screens.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={styles.dot}
            aria-label={`Show screen ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
