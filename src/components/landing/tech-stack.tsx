"use client";

import { useRef } from "react";
import TechLogo from "@/components/home/tech-logo";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export interface TechStackContent {
  eyebrow: string;
  title: string;
  body: string;
  groups: readonly { readonly name: string; readonly items: readonly string[] }[];
}

/**
 * Technology stack as static bordered group panels.
 *
 * The homepage renders this as one auto-running marquee per group, alternating
 * direction and pausing on hover. On a landing page the stack is reference
 * information — a visitor scanning for "do they use Qdrant" should not have to
 * wait for a carousel to bring it round. `TechLogo` is kept: the marks are
 * brand assets, not a homepage layout.
 *
 * Entrance, as one timeline played once on scroll-in:
 *
 *   panels   the group cards lift in, staggered, and each card's accent rule
 *            draws across its top edge (the `--rule` custom property the CSS
 *            reads, so the pseudo-element can be tweened).
 *   chips    the tools spring in behind their panel, a fast stagger across
 *            the whole stack rather than per group, so the fill reads as one
 *            sweep down the section instead of thirteen separate bursts.
 *   colour   the marks arrive monochrome and dimmed, then resolve to full
 *            colour a beat later — a print coming up. It is the one moment
 *            of payoff in a reference section, and it uses the real asset
 *            (colourful brand marks) rather than decoration invented for it.
 *
 * The grey is applied by GSAP, never in CSS, so reduced motion (and any
 * failure to run) leaves every mark in full colour rather than grey. Nothing
 * here is scrubbed or pinned — this surface stays reveals-and-staggers only.
 */
export default function TechStack({
  content,
  id = "tech",
  logos = true,
}: {
  content: TechStackContent;
  id?: string;
  /**
   * Whether each tool carries its brand mark.
   *
   * Turn it off for a long stack whose tools mostly have no mark in
   * `TechLogo` yet: a grid where a third of the chips show a real logo and
   * the rest show the generic fallback reads as broken, where a clean
   * typographic list of the same names reads as deliberate. The chips then
   * take a small accent bullet instead, and the develop-into-colour movement
   * of the reveal simply has nothing to run on.
   */
  logos?: boolean;
}) {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const el = root.current;
      const groups = gsap.utils.toArray<HTMLElement>(`.${styles.stackGroup}`, el);
      const chips = gsap.utils.toArray<HTMLElement>(`.${styles.stackItem}`, el);
      const marks = gsap.utils.toArray<HTMLElement>(`.${styles.stackItemLogo}`, el);
      if (!groups.length) return;

      gsap.set(groups, { opacity: 0, y: 24, "--rule": 0 });
      gsap.set(chips, { opacity: 0, y: 12, scale: 0.96 });
      if (marks.length) gsap.set(marks, { filter: "grayscale(1) brightness(0.6)" });

      // A detached timeline played once by a bare trigger — NOT a timeline
      // owned by a ScrollTrigger, which a `ScrollTrigger.refresh()` landing
      // mid-play would restore at its interrupted progress, paused (see
      // why-us.tsx).
      const tl = gsap.timeline({ paused: true });

      tl.to(groups, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.06,
        clearProps: "transform,opacity",
      })
        .to(groups, { "--rule": 1, duration: 0.5, ease: "power2.out", stagger: 0.06 }, 0.1)
        .to(
          chips,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "back.out(1.6)",
            stagger: 0.02,
            clearProps: "transform,opacity",
          },
          0.2,
        );

      if (marks.length) {
        tl.to(
          marks,
          {
            filter: "grayscale(0) brightness(1)",
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.025,
            // Leave no inline filter behind, so the hover transition owns it.
            clearProps: "filter",
          },
          0.38,
        );
      }

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 82%",
        once: true,
        onEnter: () => tl.play(0),
      });

      return () => {
        st.kill();
        tl.kill();
      };
    },
    { scope: root },
  );

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div ref={root} className={styles.stackList}>
        {content.groups.map((group, i) => (
          <div key={group.name} className={styles.stackGroup}>
            <div className={styles.stackGroupHead}>
              <span className={styles.stackGroupIndex} aria-hidden>
                {pad(i + 1)}
              </span>
              <h3 className={styles.stackGroupName}>{group.name}</h3>
            </div>

            <ul className={styles.stackItems}>
              {group.items.map((item) => (
                <li key={item} className={styles.stackItem}>
                  {logos ? (
                    <span className={styles.stackItemLogo} aria-hidden>
                      <TechLogo name={item} />
                    </span>
                  ) : (
                    <span className={styles.stackItemBullet} aria-hidden />
                  )}
                  <span className={styles.stackItemName}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
