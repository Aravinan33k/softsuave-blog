"use client";

import { useEffect, useRef } from "react";
import { FileText, Handshake, ListChecks, Timer, type LucideIcon } from "lucide-react";
import SectionHead from "@/components/landing/section-head";
import landing from "@/components/landing/landing.module.css";
import styles from "../rdp.module.css";

/** A line illustration per step: the JD, the shortlist, the trial, onboarding. */
const MARKS: readonly LucideIcon[] = [FileText, ListChecks, Timer, Handshake];

/**
 * The four hiring steps as a connected timeline (/ad/remote-developers-page):
 * a numbered node with a line illustration per step, joined by a track that
 * fills in the accent as the list scrolls through the viewport. Across on
 * desktop, down the left on phones.
 *
 * The fill is `--fill` (0–1) on the list. It is 1 as rendered, so with no
 * JavaScript or under `prefers-reduced-motion` the line is simply complete;
 * this sets it from the list's scroll position otherwise.
 */
export default function ProcessTimeline({
  content,
  id = "journey",
}: {
  content: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly steps: readonly { readonly n: string; readonly name: string; readonly body: string }[];
    readonly cta: { readonly label: string; readonly href: string };
  };
  id?: string;
}) {
  const list = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const el = list.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the list's top reaches 85% of the viewport, 1 when its bottom reaches 55%.
      const start = vh * 0.85;
      const end = vh * 0.55;
      const p = (start - r.top) / (start - end + r.height);
      el.style.setProperty("--fill", String(Math.min(1, Math.max(0, p))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <ol ref={list} className={styles.timeline}>
        {content.steps.map((step, i) => {
          const Mark = MARKS[i % MARKS.length];
          return (
            <li key={step.name} className={styles.timelineStep} style={{ ["--at" as string]: (i + 0.5) / content.steps.length }}>
              <span className={styles.timelineNode} aria-hidden>
                <Mark size={26} strokeWidth={1.5} />
              </span>
              <span className={styles.timelineLabel}>
                {String(i + 1).padStart(2, "0")} {step.n}
              </span>
              <h3 className={styles.cardName}>{step.name}</h3>
              <p className={styles.cardBody}>{step.body}</p>
            </li>
          );
        })}
      </ol>
      <div className={styles.centerCta}>
        <a className={`${landing.btn} ${landing.btnPrimary} ${landing.btnLg}`} href={content.cta.href}>
          {content.cta.label}
        </a>
      </div>
    </section>
  );
}
