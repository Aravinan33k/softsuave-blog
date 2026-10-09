"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import CardIconBadge from "@/components/common/card-icon-badge";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

export interface EngagementContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly { readonly name: string; readonly body: string }[];
}

/**
 * Engagement models as options to be picked.
 *
 * The paragraph and button that close this section on the live page are NOT
 * here: there they are their own dark band with their own title, so they are
 * a `CtaBand` after this section rather than a footnote inside it.
 *
 * The section opens "Choose the engagement model that aligns with your
 * project's stage, budget, and requirements", so each card is framed like
 * something selectable: a pair of coral corner brackets, viewfinder-style, at
 * opposite corners. At rest they are short ticks; pointing at a card runs them
 * out along its edges until the card is visibly framed. Brackets rather than a
 * traced outline on purpose — an outline that has to follow a rounded corner
 * needs the card measured in pixels to avoid distorting, and this says the
 * same thing with two pseudo-elements and no measurement.
 *
 * Entrance is a staggered rise played once by a bare trigger, so a mid-play
 * `ScrollTrigger.refresh()` cannot strand it (see why-us.tsx).
 */
export default function EngagementModels({
  content,
  id = "engagement",
}: {
  content: EngagementContent;
  id?: string;
}) {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.engCard}`, root.current);
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 28 });
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.1,
            // Leave no inline transform behind, so the CSS hover lift works.
            clearProps: "transform,opacity",
          });
        },
      });
      return () => st.kill();
    },
    { scope: root },
  );

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div ref={root} className={styles.engGrid}>
        {content.items.map((item) => (
          <article key={item.name} className={styles.engCard}>
            {/* An icon picked from the model's own words, not a "01" ordinal:
                the Sep corrections review asked for icons in place of numbers. */}
            <CardIconBadge
              title={item.name}
              body={item.body}
              size="sm"
              className={styles.engIndex}
            />
            <h3 className={styles.engName}>{item.name}</h3>
            <p className={styles.engBody}>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
