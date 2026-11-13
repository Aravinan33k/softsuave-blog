"use client";

import { useEffect, useState, type ReactNode } from "react";
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
  action,
  activeLine = 0.4,
}: {
  /** The column's heading; omitted where the live page's list has none (the Magento page). */
  title?: string;
  items: readonly { readonly id: string; readonly label: string }[];
  /** The case study's PDF download button, under the links. */
  downloadLabel?: string;
  /** Any other element for under the links (the enterprise page's "GET IN TOUCH"), in place of the download button. */
  action?: ReactNode;
  /**
   * How far down the viewport (0–1) a section's top must have passed to count as the current one. The case
   * studies' long sections suit the default; a list of short sections wants a line nearer the top, so
   * arriving at one marks that one, not the next.
   */
  activeLine?: number;
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
      const line = window.innerHeight * activeLine;
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
  }, [ids, activeLine]);

  return (
    <nav className={styles.toc} aria-label={title ? `${title} sections` : "Sections"}>
      {title && <p className={styles.tocTitle}>{title}</p>}
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
      {action ?? (
        downloadLabel && (
          <DownloadButton
            label={downloadLabel}
            className={`${home.pill} ${home.pillFilled} ${styles.tocDownload}`}
          />
        )
      )}
    </nav>
  );
}
