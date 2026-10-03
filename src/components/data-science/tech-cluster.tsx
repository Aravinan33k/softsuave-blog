"use client";

import { useRef } from "react";
import TechLogo from "@/components/home/tech-logo";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "@/components/landing/section-head";
import type { TechStackContent } from "@/components/landing/tech-stack";
import styles from "@/components/landing/landing.module.css";

/**
 * Deterministic pseudo-random in [0, 1). Not `Math.random`: the scatter is
 * part of the design, and a value that changes between reloads makes a
 * reported layout impossible to reproduce.
 */
const rand = (i: number, s: number) => {
  const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return v - Math.floor(v);
};

/**
 * Technology stack as a set of clusters that resolve out of scatter.
 *
 * The other service pages render their stack as the homepage's marquee rows,
 * which is the right answer for sixty-odd tools: it is reference material and
 * the rows just have to hold it. This page's stack is twenty-two tools in nine
 * categories — small enough to show whole, on one plot, with room to move.
 *
 * So it moves. On scroll-in the tools are unlabelled points scattered across
 * the field, grey and small; then, category by category, each cluster
 * converges on its label — the points travel in from wherever they were,
 * settle into their group, and come up to full colour as they land, with the
 * category's centroid mark popping once the last one arrives. It is the
 * page's own subject drawn literally: a scatter that resolves into structure.
 *
 * The scatter is by `transform` only, from each chip's real resting place, so
 * nothing here reflows and no chip can move the page's width. The plot clips,
 * so a point starting outside simply arrives from off the field.
 *
 * Entrance is one detached timeline played once by a bare trigger — never a
 * timeline owned by a ScrollTrigger, which a mid-play `ScrollTrigger.refresh()`
 * would restore at its interrupted progress, paused (see why-us.tsx). Under
 * reduced motion none of it runs and the clusters are simply there, in colour.
 */
export default function TechCluster({
  content,
  id = "tech",
}: {
  content: TechStackContent;
  id?: string;
}) {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const el = root.current;
      const groups = gsap.utils.toArray<HTMLElement>(`.${styles.clusGroup}`, el);
      if (!groups.length) return;

      const tl = gsap.timeline({ paused: true });
      let k = 0; // running chip index, so no two points share a scatter

      groups.forEach((group, gi) => {
        const head = group.querySelector(`.${styles.clusHead}`);
        const dot = group.querySelector(`.${styles.clusDot}`);
        const rule = group.querySelector(`.${styles.clusRule}`);
        const chips = gsap.utils.toArray<HTMLElement>(`.${styles.clusChip}`, group);
        const marks = gsap.utils.toArray<HTMLElement>(`.${styles.clusChipLogo}`, group);

        gsap.set(head, { opacity: 0, y: 10 });
        gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(dot, { scale: 0, transformOrigin: "center center" });
        gsap.set(marks, { filter: "grayscale(1) brightness(0.55)" });

        // Each point starts somewhere out on the field. The vertical throw is
        // flattened against the horizontal so the scatter reads as a plot
        // rather than as an explosion.
        chips.forEach((chip) => {
          const angle = rand(k, 1) * Math.PI * 2;
          const dist = 150 + rand(k, 2) * 260;
          gsap.set(chip, {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist * 0.52,
            scale: 0.8,
            opacity: 0,
          });
          k += 1;
        });

        // Clusters resolve one after another, not all at once — the point is
        // that the structure is being found, and all nine at once is a fade.
        const at = gi * 0.17;

        tl.to(head, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, at)
          .to(rule, { scaleX: 1, duration: 0.55, ease: "power2.out" }, at + 0.05)
          .to(
            chips,
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: { each: 0.04, from: "random" },
              clearProps: "transform,opacity",
            },
            at + 0.1,
          )
          .to(
            marks,
            {
              filter: "grayscale(0) brightness(1)",
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.04,
              // Leave no inline filter behind, so the hover owns it after.
              clearProps: "filter",
            },
            at + 0.4,
          )
          // The centroid lands last: the group is only a group once its points
          // have arrived.
          .to(dot, { scale: 1, duration: 0.45, ease: "back.out(3)" }, at + 0.62);
      });

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
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

      <div ref={root} className={styles.clusPlot}>
        <div className={styles.clusGrid}>
          {content.groups.map((group) => (
            <div key={group.name} className={styles.clusGroup}>
              <div className={styles.clusHead}>
                <span className={styles.clusDot} aria-hidden />
                <span className={styles.clusName}>{group.name}</span>
              </div>
              <span className={styles.clusRule} aria-hidden />

              <ul className={styles.clusChips}>
                {group.items.map((item) => (
                  <li key={item} className={styles.clusChip}>
                    <span className={styles.clusChipLogo} aria-hidden>
                      <TechLogo name={item} />
                    </span>
                    <span className={styles.clusChipName}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
