"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import SectionHead from "@/components/landing/section-head";
import landing from "@/components/landing/landing.module.css";
import styles from "./tech-tabs.module.css";
import type { TechTabsContent } from "./tech-tabs";

/**
 * The interactive half of `./tech-tabs` — see there. `marks` are the brand
 * marks, drawn on the server and keyed by tool name.
 *
 * WAI-ARIA tabs: arrow keys move between tabs (Home/End jump to the ends) and
 * select as they go; only the selected tab is in the tab order. Every panel is
 * in the document, the inactive ones `hidden`, so the full stack is in the
 * server HTML for crawlers and no-JS readers.
 */
export default function TechTabsClient({
  content,
  id,
  marks,
}: {
  content: TechTabsContent;
  id: string;
  marks: Readonly<Record<string, ReactNode>>;
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId().replace(/:/g, "");
  const count = content.groups.length;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    let next: number | undefined;
    if (e.key in step) next = (active + step[e.key] + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className={landing.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} wide={content.wideHead} />

      <div className={styles.tabs} role="tablist" aria-label={content.title} onKeyDown={onKeyDown}>
        {content.groups.map((group, i) => (
          <button
            key={group.name}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
          >
            {group.name}
          </button>
        ))}
      </div>

      {content.groups.map((group, i) => (
        <div
          key={group.name}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={i !== active}
          className={styles.panel}
        >
          <ul className={styles.grid}>
            {group.items.map((item) => (
              <li key={item} className={styles.card}>
                <span className={styles.mark} aria-hidden>
                  {marks[item]}
                </span>
                <span className={styles.name}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
