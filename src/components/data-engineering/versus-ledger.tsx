"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";
import type { ComparisonContent } from "@/components/common/comparison";

/**
 * Two options as a ledger with a shared spine.
 *
 * The considerations run down the middle as mono labels, with each option's
 * answer set either side, right-aligned on the left and left-aligned on the
 * right, so both columns read inward toward the thing being compared. The
 * two option names sit at the head of their own columns rather than being
 * repeated on every row.
 *
 * Why not the row cards `comparison.tsx` renders: those repeat both option
 * labels in every row, which is the right call when the page has picked a
 * side and wants to mark it. A genuinely even comparison reads better as a
 * true ledger, where the eye runs down one column to take in one option
 * whole, then crosses to the other.
 *
 * Motion, as one detached timeline played once on entry: the two column
 * heads settle in from their own sides, then for each row a hairline draws
 * outward from the centre in both directions and the two answers arrive as
 * their line reaches them. The connection is drawn before the content it
 * connects, so the ledger assembles rather than appears.
 *
 * Reads the same `ComparisonContent` as `comparison.tsx`. Below 900px the
 * three columns stack: label, then the two answers as a labelled pair.
 */
export default function VersusLedger({
  content,
  id = "comparison",
}: {
  content: ComparisonContent;
  id?: string;
}) {
  const { columns, rows, notes } = content;
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const el = root.current;
      const items = gsap.utils.toArray<HTMLElement>(`.${styles.ledRow}`, el);
      if (!items.length) return;

      const heads = gsap.utils.toArray<HTMLElement>(`.${styles.ledHeadCell}`, el);
      const labels = items.map((r) => r.querySelector<HTMLElement>(`.${styles.ledLabel}`));
      const lines = gsap.utils.toArray<HTMLElement>(`.${styles.ledLine}`, el);
      const lefts = items.map((r) => r.querySelector<HTMLElement>(`.${styles.ledLeft}`));
      const rights = items.map((r) => r.querySelector<HTMLElement>(`.${styles.ledRight}`));
      const ok = (n: (HTMLElement | null)[]) => n.filter(Boolean) as HTMLElement[];

      gsap.set(heads, { opacity: 0, y: 14 });
      gsap.set(ok(labels), { opacity: 0, y: 8 });
      gsap.set(lines, { scaleX: 0, transformOrigin: "center center" });
      gsap.set(ok(lefts), { opacity: 0, x: 18 });
      gsap.set(ok(rights), { opacity: 0, x: -18 });

      const tl = gsap.timeline({ paused: true });
      tl.to(heads, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1, clearProps: "transform,opacity" }, 0);

      items.forEach((_, i) => {
        const at = 0.25 + i * 0.11;
        if (labels[i]) tl.to(labels[i], { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", clearProps: "transform,opacity" }, at);
        tl.to(lines.slice(i * 2, i * 2 + 2), { scaleX: 1, duration: 0.45, ease: "power2.out" }, at + 0.05);
        if (lefts[i]) tl.to(lefts[i], { opacity: 1, x: 0, duration: 0.45, ease: "power2.out", clearProps: "transform,opacity" }, at + 0.2);
        if (rights[i]) tl.to(rights[i], { opacity: 1, x: 0, duration: 0.45, ease: "power2.out", clearProps: "transform,opacity" }, at + 0.2);
      });

      // Detached timeline played once by a bare trigger, so a mid-play
      // `ScrollTrigger.refresh()` cannot strand it (see why-us.tsx).
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

      <div ref={root} className={styles.ledger}>
        <div className={styles.ledHead}>
          <span className={`${styles.ledHeadCell} ${styles.ledHeadLeft}`}>{columns.lead}</span>
          <span className={styles.ledHeadMid}>{columns.area}</span>
          <span className={`${styles.ledHeadCell} ${styles.ledHeadRight}`}>{columns.other}</span>
        </div>

        <dl className={styles.ledRows}>
          {rows.map((r) => (
            <div key={r.area} className={styles.ledRow}>
              <dd className={`${styles.ledCell} ${styles.ledLeft}`}>
                <span className={styles.ledCellTag}>{columns.lead}</span>
                {r.lead}
              </dd>

              <dt className={styles.ledSpine}>
                <span className={`${styles.ledLine} ${styles.ledLineL}`} aria-hidden />
                <span className={styles.ledLabel}>{r.area}</span>
                <span className={`${styles.ledLine} ${styles.ledLineR}`} aria-hidden />
              </dt>

              <dd className={`${styles.ledCell} ${styles.ledRight}`}>
                <span className={styles.ledCellTag}>{columns.other}</span>
                {r.other}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {notes && notes.length > 0 && (
        <div className={styles.cmpNotes}>
          {notes.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      )}
    </section>
  );
}
