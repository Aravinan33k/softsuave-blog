"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { problems as generativeAiProblems } from "@/lib/home/generative-ai";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** How long each problem holds before the selector advances, in ms. */
const DWELL_MS = 5200;

export interface ProblemsContent {
  eyebrow: string;
  title: string;
  body: string;
  /** `[row-header column, solution column]` — the second is the panel's label. */
  columns: readonly string[];
  rows: readonly {
    readonly problem: string;
    readonly solution: string;
    /** Decorative backdrop for this row's panel; rows without one show none. */
    readonly image?: string;
  }[];
}

/**
 * Problems & solutions, as an interactive selector rather than a static table.
 *
 * The problems are a vertical tablist; picking one animates its solution into
 * the panel alongside. It also advances on its own while the section is on
 * screen, so the section demonstrates itself without being touched.
 *
 * Why not a table: the content is five loosely-related pairs, not tabular data
 * to be scanned column-against-column, and a two-column table of long prose
 * needed a separate stacked-card rendering below 800px to stay legible. One
 * selector serves every width.
 *
 * Layout: `.psGrid` is a stretch grid, so the panel takes the list's height and
 * switching between solutions of different lengths moves nothing on the page.
 *
 * Accessibility — this is the ARIA tabs pattern, not a set of loose buttons:
 *  - `role="tablist"` / `role="tab"` / `role="tabpanel"`, wired with
 *    `aria-controls` / `aria-labelledby`, so the panel is announced as the
 *    selected tab's content.
 *  - roving tabindex: only the selected tab is in the tab order, and
 *    Arrow/Home/End move between them, which is what the pattern expects.
 *  - hovering a problem selects it, so the panel follows the pointer without a
 *    click; that is a preview, not a commitment, so autoplay may still resume
 *    once the pointer leaves. Clicking, focusing or arrowing is the deliberate
 *    act that stops autoplay permanently, so content never moves under someone
 *    reading or operating it.
 *
 * Each panel wears its row's artwork as a backdrop. All of them are mounted at
 * once and crossfaded in CSS rather than swapped on selection: swapping the src
 * would blank the panel for a frame on every hover, and hover fires far more
 * often than a click. They sit behind a scrim that carries the panel's dark
 * inversion, so the text contrast never depends on which photograph is showing.
 *  - under `prefers-reduced-motion` there is no autoplay and no tweening; the
 *    selector still works, it just cuts between panels.
 */
export default function Problems({
  content = generativeAiProblems,
  id = "problems",
}: {
  content?: ProblemsContent;
  id?: string;
} = {}) {
  const root = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const tickerRef = useRef<HTMLSpanElement | null>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  /** Set once the visitor drives the selector themselves; autoplay never resumes. */
  const takenOver = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const rows = content.rows;
  const panelLabel = content.columns[1] ?? "";

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    if (tickerRef.current) gsap.killTweensOf(tickerRef.current);
  }, []);

  const go = useCallback((i: number) => {
    const next = ((i % rows.length) + rows.length) % rows.length;
    activeRef.current = next;
    setActive(next);
  }, [rows.length]);

  /** Advance on a timer; the ticker hairline shows the time remaining. */
  const play = useCallback(() => {
    stop();
    if (takenOver.current || prefersReducedMotion()) return;
    timer.current = setInterval(() => go(activeRef.current + 1), DWELL_MS);
    if (tickerRef.current) {
      gsap.fromTo(
        tickerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: DWELL_MS / 1000, ease: "none", repeat: -1 },
      );
    }
  }, [go, stop]);

  /** Any deliberate interaction hands control over for good. */
  const takeOver = useCallback((i: number) => {
    takenOver.current = true;
    stop();
    go(i);
  }, [go, stop]);

  /**
   * Hover previews a row. Autoplay is already halted by the grid's
   * `onMouseEnter`, so this only moves the selection — it deliberately does not
   * set `takenOver`, leaving autoplay free to resume when the pointer leaves.
   */
  const preview = useCallback((i: number) => {
    if (i !== activeRef.current) go(i);
  }, [go]);

  // Autoplay only while the section is actually on screen, and only where the
  // two-column layout applies — content shifting under a phone reader is worse
  // than a static first panel.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: play,
          onEnterBack: play,
          onLeave: stop,
          onLeaveBack: stop,
        });
        return () => {
          st.kill();
          stop();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Crossfade the panel whenever the selection changes.
  useEffect(() => {
    if (prefersReducedMotion() || !panelRef.current) return;
    const tween = gsap.fromTo(
      panelRef.current.children,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.05, overwrite: "auto" },
    );
    return () => {
      tween.kill();
    };
  }, [active]);

  useEffect(() => stop, [stop]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = rows.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    takeOver(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <section ref={root} className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div
        className={styles.psGrid}
        onMouseEnter={stop}
        onMouseLeave={() => {
          if (!takenOver.current) play();
        }}
      >
        <div
          className={styles.psList}
          role="tablist"
          aria-orientation="vertical"
          aria-label={content.columns[0]}
          onKeyDown={onKeyDown}
        >
          {rows.map((row, i) => (
            <button
              key={row.problem}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-controls={`${id}-panel`}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              className={styles.psTab}
              onClick={() => takeOver(i)}
              onMouseEnter={() => preview(i)}
              onFocus={() => {
                takenOver.current = true;
                stop();
              }}
            >
              <span className={styles.psTabNum} aria-hidden>
                {pad(i + 1)}
              </span>
              <span className={styles.psTabLabel}>{row.problem}</span>
              {active === i && <span ref={tickerRef} className={styles.psTicker} aria-hidden />}
            </button>
          ))}
        </div>

        <div
          className={styles.psPanel}
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
          tabIndex={0}
        >
          {rows.map((row, i) =>
            row.image ? (
              <div
                key={row.problem}
                className={`${styles.psPanelMedia}${active === i ? ` ${styles.psPanelMediaOn}` : ""}`}
                aria-hidden
              >
                <Image
                  src={publicMediaUrl(row.image)}
                  alt=""
                  fill
                  sizes="(max-width: 899px) 92vw, 46vw"
                />
              </div>
            ) : null,
          )}
          <div className={styles.psPanelScrim} aria-hidden />

          <div ref={panelRef} className={styles.psPanelBody}>
            <span className={styles.psPanelLabel}>{panelLabel}</span>
            <p className={styles.psPanelTitle}>{rows[active].problem}</p>
            <p className={styles.psPanelText}>{rows[active].solution}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
