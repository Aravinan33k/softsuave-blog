"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./engagement-model.module.css";

export default function ModelTabs({
  sections,
}: {
  sections: readonly { readonly id: string; readonly label: string }[];
}) {
  const nav = useRef<HTMLElement | null>(null);
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const tabs = nav.current;
    const container = tabs?.parentElement;
    if (!tabs || !container) return;

    const header = document.querySelector('nav[aria-label="Main"]')?.closest("header");
    let frame = 0;

    const update = () => {
      frame = 0;
      const headerBottom = Math.max(0, header?.getBoundingClientRect().bottom ?? 0);
      const tabsHeight = tabs.getBoundingClientRect().height;
      const rootClearance = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      container.style.setProperty("--model-nav-top", `${headerBottom}px`);
      container.style.setProperty(
        "--model-anchor-offset",
        `${Math.max(0, headerBottom + tabsHeight + 16 - rootClearance)}px`,
      );

      const readingLine = headerBottom + tabsHeight + 24;
      let current = sections[0]?.id;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= readingLine) current = section.id;
      }
      setActiveId(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(scheduleUpdate);
    if (header) observer.observe(header);
    observer.observe(tabs);
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) cancelAnimationFrame(frame);
      container.style.removeProperty("--model-nav-top");
      container.style.removeProperty("--model-anchor-offset");
    };
  }, [sections]);

  return (
    <nav ref={nav} className={styles.tabs} aria-label="Engagement models">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={styles.tab}
          aria-current={activeId === section.id ? "location" : undefined}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
