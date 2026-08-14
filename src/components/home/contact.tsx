"use client";

import { useRef, useState } from "react";
import BrandImage from "./brand-image";
import { finalCta, brand } from "@/lib/home/content";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import HoldButton from "./hold-button";
import Magnetic from "./magnetic";
import styles from "./home.module.css";

/* The Soft Suave mark (favicon geometry) — used here as the glossy coral
   "crystal" that focuses into view, echoing the preloader. */
const LOGO_POINTS =
  "13.6,3.8 8,7 4.1,4.8 8,2.5 10.2,3.8 11.9,2.8 8,0.5 1.5,4.2 1.5,5.2 7.1,8.5 7.1,13 3.2,10.7 3.2,8.3 1.5,7.2 1.5,11.7 8,15.5 8.9,15 8.9,8.5 12.8,6.3 12.8,10.7 10.6,12 10.6,14 14.5,11.7 14.5,4.2";

/**
 * Contact / business enquiry — a cinematic scroll-scrubbed FOCUS PULL. The
 * section pins and, as you scroll, the dark backdrop and a glossy coral brand
 * "crystal" resolve from blur → sharp; the crystal settles, then the "Business
 * Enquiry" copy resolves in with a self-drawing coral underline under the
 * keyword, and the CTA + email fade up. Reduced motion renders it static.
 */
export default function Contact() {
  const root = useRef<HTMLElement | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  // Split the headline so the last keyword can carry the drawn underline.
  const m = finalCta.title.match(/^([\s\S]*?)([A-Za-z0-9]+)(\W*)$/);
  const beforeKey = m ? m[1] : finalCta.title;
  const key = m ? m[2] : "";
  const afterKey = m ? m[3] : "";

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;

      // No pin — the focus-pull plays as the section scrolls into view, so there
      // is no empty viewport of dead scroll before the reveal begins.
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "contactPin",
          trigger: root.current,
          start: "top 40%",
          end: "center 50%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Focus pull: backdrop + crystal come into focus together.
      tl.fromTo(
        `.${styles.contactBg} img`,
        { filter: "blur(26px)", scale: 1.3 },
        { filter: "blur(0px)", scale: 1.08, ease: "none" },
        0,
      );
      tl.fromTo(
        `.${styles.contactCrystal}`,
        { autoAlpha: 0, filter: "blur(24px)", scale: 0.5, yPercent: 58, rotation: -22 },
        { autoAlpha: 1, filter: "blur(0px)", scale: 1, yPercent: 0, rotation: 0, ease: "power2.out" },
        0,
      );
      // Crystal settles down onto the "surface".
      tl.to(`.${styles.contactCrystal}`, { yPercent: 9, scale: 0.9, ease: "power2.inOut" }, 0.5);

      // Copy resolves in, then the underline draws itself.
      tl.fromTo(
        `.${styles.contactInner}`,
        { autoAlpha: 0, y: 36, filter: "blur(10px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", ease: "power2.out" },
        0.56,
      );
      tl.fromTo(
        `.${styles.contactUnderline} path`,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, ease: "power1.inOut" },
        0.74,
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: root },
  );

  const confirm = () => {
    setConfirmed(true);
    if (typeof window !== "undefined") {
      window.location.href = `mailto:${brand.email}?subject=AI%20Strategy%20Call`;
    }
  };

  return (
    <section ref={root} className={styles.contact} id="contact">
      <div className={styles.contactBg}>
        <BrandImage page="four" id="contact-bg" fill sizes="100vw" className="object-cover" />
        <div className={styles.contactVeil} />
      </div>

      <div className={styles.contactCrystal} aria-hidden>
        <svg viewBox="0 0 16 16" className={styles.contactCrystalSvg}>
          <defs>
            <linearGradient id="cxGrad" x1="4" y1="1" x2="12" y2="15.5" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FF9A6A" />
              <stop offset="0.52" stopColor="#FF4D3A" />
              <stop offset="1" stopColor="#D80F2E" />
            </linearGradient>
            <radialGradient id="cxSheen" cx="0.34" cy="0.26" r="0.55">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <polygon
            points={LOGO_POINTS}
            fill="url(#cxGrad)"
            stroke="#ffd9c8"
            strokeOpacity="0.45"
            strokeWidth="0.18"
            strokeLinejoin="round"
          />
          <polygon points={LOGO_POINTS} fill="url(#cxSheen)" style={{ mixBlendMode: "screen" }} />
        </svg>
      </div>

      <div className={styles.contactInner}>
        <span className={styles.eyebrow}>Business Enquiry</span>
        <h2 className={styles.contactH}>
          {beforeKey}
          <span className={styles.contactKey}>
            {key}
            <svg
              className={styles.contactUnderline}
              viewBox="0 0 200 14"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M3 9 C 45 3, 80 13, 120 7 S 180 4, 197 9"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
              />
            </svg>
          </span>
          {afterKey}
        </h2>
        <p className={styles.contactBody}>{finalCta.body}</p>

        <div className={styles.contactActions}>
          <HoldButton
            label={finalCta.cta.label}
            doneLabel="Opening your mail…"
            onConfirm={confirm}
          />
          <Magnetic>
            <a href={`mailto:${brand.email}`} className={styles.contactMail} data-cursor="Email">
              {brand.email}
            </a>
          </Magnetic>
        </div>

        {confirmed && (
          <p className={styles.contactConfirm} role="status">
            Thanks — a draft to {brand.email} is opening. We&apos;ll reply within one business day.
          </p>
        )}
      </div>
    </section>
  );
}
