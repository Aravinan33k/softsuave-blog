"use client";

import { useEffect, useRef, useState } from "react";
import { finalCta } from "@/lib/home/content";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import HoldButton from "./hold-button";
import styles from "./home.module.css";

/**
 * Contact / business enquiry — a cinematic scroll-scrubbed FOCUS PULL. As you
 * scroll, the dark backdrop resolves from blur → sharp and the "Business
 * Enquiry" copy resolves in with a self-drawing coral underline under the
 * keyword, and the CTA + email fade up. Reduced motion renders it static.
 */
export default function Contact({
  ctaHref = finalCta.cta.href,
  content = finalCta,
  eyebrow = "Business Enquiry",
}: {
  /** Where the primary CTA goes. Defaults to the content's own href — the
   *  dedicated `/contact` route. The `/contact` page itself overrides this
   *  with `#contact`, because this band is the destination there and a CTA
   *  that reloads the page you are already on is a dead control. */
  ctaHref?: string;
  /**
   * The band's own copy. Defaults to the homepage's `finalCta`, which is what
   * the homepage and the delivery pages say here.
   *
   * The hire-by-skill pages override it: their live closing band is a "Book
   * Free Consultation" invitation, not the homepage's AI-strategy pitch, and
   * leaving the default in place put homepage copy at the foot of twenty pages
   * whose source says something else.
   */
  content?: {
    readonly title: string;
    readonly body: string;
    readonly cta: { readonly label: string; readonly href: string };
  };
  /** Kicker above the headline. Overridden where the live band names itself. */
  eyebrow?: string;
} = {}) {
  const root = useRef<HTMLElement | null>(null);

  /**
   * The moving backdrop mounts on the client, unconditionally.
   *
   * UNGATED ON PURPOSE, AND TEMPORARILY. This started behind three gates — an
   * IntersectionObserver so the file only downloaded for the minority who
   * scroll this far, a `prefers-reduced-motion` check, and a >=1000px check —
   * and the result was that the band showed its still frame and the video was
   * never seen. Any one of those gates can hide it, and from the outside a
   * still frame of the loop is indistinguishable from a flat background.
   *
   * Before this ships, restore at least the reduced-motion gate: an autoplaying
   * loop behind a headline is exactly what that setting exists to suppress. The
   * lazy mount is worth restoring too — this is the LAST section on 53 pages,
   * so most visits never reach it.
   *
   * `mounted` only defers to the client, matching how `hero.tsx` mounts its own
   * video; it is not a capability gate.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    let active = true;
    requestAnimationFrame(() => {
      if (active) setMounted(true);
    });
    return () => {
      active = false;
    };
  }, []);

  // Split the headline so the last keyword can carry the drawn underline.
  const m = content.title.match(/^([\s\S]*?)([A-Za-z0-9]+)(\W*)$/);
  const beforeKey = m ? m[1] : content.title;
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
        `.${styles.contactPoster}, .${styles.contactVideo}`,
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
      //
      // The timeline is PAUSED and played by a trigger of its own rather than
      // handed to `scrollTrigger:`, because this band is the last thing above
      // the footer and its reveal had still been reported missing. A start that
      // resolves past the document's maximum scroll — which is what happens when
      // positions are measured before the pinned scenes above settle, or on a
      // short viewport — never fires, and the copy stays at `autoAlpha: 0`
      // forever. `onRefresh` below is the failsafe: every refresh re-asks
      // whether the section is on screen, and if it is the reveal plays whether
      // or not the start line was ever crossed.
      const tl = gsap.timeline({ paused: true });
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

      const play = () => {
        if (!tl.isActive() && tl.progress() === 0) tl.play();
      };

      const revealTrigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top 78%",
        once: true,
        onEnter: play,
        // The rescue asks the one question that still has an answer when the
        // start line is unreachable: is any of the section actually on screen?
        // `play` is idempotent, so this can only ever un-hide copy that the
        // trigger alone would have left at zero opacity.
        onRefresh: () => {
          if (root.current && ScrollTrigger.isInViewport(root.current, 0.15)) play();
        },
      });

      return () => {
        bg.scrollTrigger?.kill();
        bg.kill();
        revealTrigger.kill();
        tl.kill();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.contact} id="contact">
      <div className={styles.contactBg}>
        {/* The still is the base layer in every case — it is a frame of the
            video, so the switch between the two is invisible. */}
        <div className={styles.contactPoster} />
        {mounted && (
          <video
            className={styles.contactVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            onLoadedData={() => ScrollTrigger.refresh()}
          >
            <source src="/videos/contact-light.webm" type="video/webm" />
            <source src="/videos/contact-light.mp4" type="video/mp4" />
          </video>
        )}
        <div className={styles.contactVeil} />
      </div>

      <div className={styles.contactInner}>
        {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
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
        <p className={styles.contactBody}>{content.body}</p>

        <div className={styles.contactActions}>
          {/* A real link, not a button firing `location.href` — see
              HoldButton, which renders a genuine <a> so middle-click,
              cmd-click and link semantics all survive. */}
          <HoldButton label={content.cta.label} href={ctaHref} />
        </div>

      </div>
    </section>
  );
}
