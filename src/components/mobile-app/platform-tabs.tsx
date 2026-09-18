"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import TechLogo from "@/components/home/tech-logo";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export interface PlatformTabsContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    /** Full stack name — the panel's heading. */
    readonly name: string;
    /** Short label for the tab itself, so the rail stays scannable. */
    readonly short: string;
    readonly body: string;
    /**
     * The technologies this stack's own sentence already names, surfaced as
     * chips. Nothing here may be a tool the prose beside it does not mention.
     */
    readonly tools: readonly string[];
  }[];
}

/**
 * Platforms as a chooser.
 *
 * The section opens "Choose the right technology based on your product goals",
 * so it is built as a choice rather than as four equal panels stacked down the
 * page: a rail of stacks on one side, the chosen one open beside it. A coral
 * pill travels between the tabs — measured from their real boxes, so it is
 * right in the vertical rail on desktop and the horizontal strip on mobile,
 * and stays right through a resize or a font swap.
 *
 * Selecting a stack cross-fades the panel in from the rail's side and staggers
 * its chips in behind it. The chips are the tools the panel's own sentence
 * names, carrying their real brand marks — they surface what the prose says
 * rather than adding to it.
 *
 * Accessibility: a real `tablist`/`tab`/`tabpanel` set with roving tabindex —
 * arrows move between stacks, Home/End jump to the ends, and only the active
 * tab is in the tab order, which is what the pattern expects. The panel is
 * labelled by its tab.
 */
export default function PlatformTabs({
  content,
  id = "platforms",
}: {
  content: PlatformTabsContent;
  id?: string;
}) {
  const items = content.items;
  const [active, setActive] = useState(0);

  const root = useRef<HTMLDivElement | null>(null);
  const rail = useRef<HTMLDivElement | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ x: 0, y: 0, w: 0, h: 0 });

  // The pill is sized and placed from the active tab's real box, so one
  // implementation serves both the vertical rail and the horizontal strip.
  const place = useCallback(() => {
    const r = rail.current;
    const t = tabs.current[active];
    if (!r || !t) return;
    setPill({ x: t.offsetLeft, y: t.offsetTop, w: t.offsetWidth, h: t.offsetHeight });
  }, [active]);

  useLayoutEffect(() => {
    place();
    const r = rail.current;
    if (!r || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(place);
    ro.observe(r);
    return () => ro.disconnect();
  }, [place]);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      // Only the shown panel animates — the others are `hidden`, so tweening
      // them would be work nobody sees.
      const shown = root.current.querySelector(`.${styles.ptPanel}[data-active="true"]`);
      const panel = shown?.querySelector(`.${styles.ptPanelBody}`);
      const chips = shown ? gsap.utils.toArray<HTMLElement>(`.${styles.ptChip}`, shown) : [];
      if (!panel) return;

      gsap.fromTo(
        panel,
        { opacity: 0, x: 18 },
        { opacity: 1, x: 0, duration: 0.45, ease: "power2.out", overwrite: true, clearProps: "transform,opacity" },
      );
      if (chips.length) {
        gsap.fromTo(
          chips,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.045,
            delay: 0.1,
            overwrite: true,
            clearProps: "transform,opacity",
          },
        );
      }
    },
    { scope: root, dependencies: [active] },
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div ref={root} className={styles.ptWrap}>
        <div
          ref={rail}
          className={styles.ptRail}
          role="tablist"
          aria-label={content.title}
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
        >
          <span
            className={styles.ptPill}
            aria-hidden
            style={{
              transform: `translate3d(${pill.x}px, ${pill.y}px, 0)`,
              width: pill.w || undefined,
              height: pill.h || undefined,
            }}
          />

          {items.map((item, i) => (
            <button
              key={item.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              className={styles.ptTab}
              onClick={() => setActive(i)}
            >
              <span className={styles.ptTabIndex} aria-hidden>
                {pad(i + 1)}
              </span>
              <span className={styles.ptTabName}>{item.short}</span>
            </button>
          ))}
        </div>

        {/*
         * EVERY panel is rendered, with the inactive ones `hidden`, rather
         * than only the chosen one. Three quarters of this section's copy —
         * and every technology name in it — would otherwise never reach the
         * served HTML, which is the whole SEO surface of the page it
         * replaces. `hidden` is also what the tabs pattern expects: one
         * tabpanel per tab, each labelled by it.
         */}
        {items.map((item, i) => (
          <div
            key={item.name}
            className={styles.ptPanel}
            role="tabpanel"
            id={`${id}-panel-${i}`}
            aria-labelledby={`${id}-tab-${i}`}
            tabIndex={0}
            hidden={i !== active}
            data-active={i === active}
          >
            <div className={styles.ptPanelBody}>
              <h3 className={styles.ptPanelName}>{item.name}</h3>
              <p className={styles.ptPanelText}>{item.body}</p>

              <ul className={styles.ptChips}>
                {item.tools.map((tool) => (
                  <li key={tool} className={styles.ptChip}>
                    <span className={styles.ptChipLogo} aria-hidden>
                      <TechLogo name={tool} />
                    </span>
                    <span className={styles.ptChipName}>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
