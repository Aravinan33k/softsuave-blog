"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import CardIconBadge from "@/components/common/card-icon-badge";
import SectionHead from "./section-head";
import styles from "./landing.module.css";
import type { TechStackContent } from "./tech-stack";

/**
 * The animated half of `./tech-stack` — see there. `logoMarks` are the brand
 * marks, rendered on the server and keyed by tool name; without them the chips
 * take an accent bullet instead.
 */
export default function TechStackClient({
  content,
  id,
  logoMarks,
  largeLogos,
}: {
  content: TechStackContent;
  id: string;
  logoMarks?: Readonly<Record<string, ReactNode>>;
  largeLogos: boolean;
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

      // The start state is CSS (`.stackList[data-armed]` in
      // landing.module.css) — see there for why not `gsap.set`.
      el.setAttribute("data-armed", "");

      // A detached timeline played once by a bare trigger — NOT a timeline
      // owned by a ScrollTrigger, which a `ScrollTrigger.refresh()` landing
      // mid-play would restore at its interrupted progress, paused (see
      // why-us.tsx).
      const tl = gsap.timeline({
        paused: true,
        // Everything goes back to the stylesheet together — the armed state
        // and GSAP's inline values in one step, so no element can drop back to
        // hidden in between. No inline filter is left on the marks, so the
        // hover transition owns it.
        onComplete: () => {
          el.removeAttribute("data-armed");
          gsap.set([...groups, ...chips, ...marks], { clearProps: "transform,opacity,filter,--rule" });
        },
      });

      tl.to(groups, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.06 })
        .to(groups, { "--rule": 1, duration: 0.5, ease: "power2.out", stagger: 0.06 }, 0.1)
        .to(chips, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.6)", stagger: 0.02 }, 0.2);

      if (marks.length) {
        tl.to(
          marks,
          { filter: "grayscale(0) brightness(1)", duration: 0.55, ease: "power2.out", stagger: 0.025 },
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
        el.removeAttribute("data-armed");
      };
    },
    { scope: root },
  );

  return (
    <section
      className={largeLogos ? `${styles.sectionShell} ${styles.stackLargeLogos}` : styles.sectionShell}
      id={id}
    >
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div ref={root} className={styles.stackList}>
        {content.groups.map((group) => (
          <div key={group.name || "list"} className={styles.stackGroup}>
            {/* A nameless group is one flat list under the section heading (the
                QA page's label-only bands) — no head row to invent. */}
            {group.name && (
              <div className={styles.stackGroupHead}>
                {/* An icon picked from the group's name, not a "01" ordinal: the
                    Sep corrections review asked for icons in place of numbers. */}
                <CardIconBadge title={group.name} size="sm" className={styles.stackGroupIndex} />
                <h3 className={styles.stackGroupName}>{group.name}</h3>
              </div>
            )}

            <ul className={styles.stackItems}>
              {group.items.map((item) => (
                <li key={item} className={styles.stackItem}>
                  {logoMarks ? (
                    <span className={styles.stackItemLogo} aria-hidden>
                      {logoMarks[item]}
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
