"use client";

import { useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import Image from "next/image";
import SectionHead from "@/components/landing/section-head";
import type { TechStackContent } from "@/components/landing/tech-stack";
import { publicMediaUrl } from "@/lib/media-url";
import styles from "../rdp.module.css";

const noopSubscribe = () => () => {};

/**
 * The technology stack as tabs (/ad/remote-developers-page), using the
 * existing marks. Every group is in the HTML: until this has hydrated, all four
 * panels show one after another under their own headings; then they become a
 * tablist (WAI-ARIA tabs: arrow keys, Home/End) with one panel visible, the
 * others `hidden` but still in the markup.
 */
export default function TechTabs({ content, id = "tech" }: { content: TechStackContent; id?: string }) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // False on the server and in the first client render, true once hydrated —
  // so the HTML always carries every panel and the tabs are added on the client.
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = content.groups.length;
    const next =
      e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      {ready && (
        <div className={styles.tabList} role="tablist" aria-label="Technology groups">
          {content.groups.map((g, i) => (
            <button
              key={g.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${uid}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              className={styles.tab}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {g.name}
            </button>
          ))}
        </div>
      )}

      <div className={styles.tabPanels}>
        {content.groups.map((g, i) => (
          <div
            key={g.name}
            id={`${uid}-panel-${i}`}
            {...(ready ? { role: "tabpanel", "aria-labelledby": `${uid}-tab-${i}`, hidden: active !== i, tabIndex: 0 } : {})}
            className={styles.tabPanel}
          >
            {!ready && <h3 className={styles.tabPanelTitle}>{g.name}</h3>}
            <ul className={styles.techList}>
              {g.items.map((name) => {
                const src = content.images?.[name];
                return (
                  <li key={name} className={styles.techItem}>
                    {src && (
                      <Image src={publicMediaUrl(src)} alt="" width={44} height={44} className={styles.techMark} unoptimized />
                    )}
                    <span>{name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
