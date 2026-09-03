"use client";

import { useRef, useState } from "react";
import BrandImage from "./brand-image";
import { finalCta, brand } from "@/lib/home/content";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import HoldButton from "./hold-button";
import styles from "./home.module.css";

/**
 * Contact / business enquiry — a cinematic scroll-scrubbed FOCUS PULL. As you
 * scroll, the dark backdrop resolves from blur → sharp and the "Business
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
      //
      // The backdrop is scrubbed but the COPY is not, and that split matters:
      // this is the last section before the footer, so how far the page can
      // still scroll once it is in view depends on the section's own height. A
      // scrubbed reveal that only began part-way along the timeline left the
      // copy at `autoAlpha: 0` whenever the page ran out of scroll first — i.e.
      // the headline and CTA silently vanished. Decorative motion may be left
      // half-played; content may not.
      const bg = gsap.fromTo(
        `.${styles.contactBg} img`,
        { filter: "blur(26px)", scale: 1.3 },
        {
          filter: "blur(0px)",
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            id: "contactPin",
            trigger: root.current,
            start: "top 80%",
            end: "center 55%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );

      // Copy resolves in, then the underline draws itself — a plain once-through
      // reveal on enter, so it cannot be stranded mid-scrub.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
      tl.fromTo(
        `.${styles.contactInner}`,
        { autoAlpha: 0, y: 36, filter: "blur(10px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power2.out" },
      );
      tl.fromTo(
        `.${styles.contactUnderline} path`,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut" },
        "-=0.35",
      );

      return () => {
        bg.scrollTrigger?.kill();
        bg.kill();
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
