"use client";

import { useEffect, useState } from "react";
import { DownloadButton } from "./case-study-download";
import home from "@/components/home/home.module.css";
import styles from "./case-study.module.css";

/**
 * The case study's contents list — softsuave.com's left-hand "CASE STUDY"
 * column: one link per section, the current one marked, and the Download
 * button under them. Sticky beside the article from 1000px; above it, a
 * horizontally scrolling row of the same links.
 *
 * The links are plain `<a href="#…">` so the marketing layout's Lenis handler
 * takes them (smooth scroll, focus moved to the section, the fixed header
 * cleared by the root scroll-padding).
 */
export default function CaseStudyToc({
  title,
  items,
  downloadLabel,
}: {
  title: string;
  items: readonly { readonly id: string; readonly label: string }[];
  downloadLabel: string;
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const ids = items.map((i) => i.id).join(",");

  // The current section is the last one whose top has passed a line 40% down
  // the viewport — the first until the article is reached. Read from the
  // layout on scroll rather than from intersection events, which kept the
  // last section marked after scrolling back up to the hero.
  useEffect(() => {
    const sections = ids
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    let raf = 0;
    const read = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current = sections[0].id;
      for (const el of sections) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids]);

  return (
    <nav className={styles.toc} aria-label={`${title} sections`}>
      <p className={styles.tocTitle}>{title}</p>
      <ol className={styles.tocList}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={styles.tocLink}
              aria-current={active === item.id ? "location" : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
      <DownloadButton
        label={downloadLabel}
        className={`${home.pill} ${home.pillFilled} ${styles.tocDownload}`}
      />
    </nav>
  );
}
