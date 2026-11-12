"use client";

import { useState, type ReactNode } from "react";
import styles from "./home.module.css";

/**
 * Shows the first `limit` children and the rest (kept in the page, hidden) behind a "View More" / "View Less" button,
 * as the live Technical Expertise band does (four rows, the others toggled).
 */
export default function ExpandList({
  children,
  limit,
  more = "View More",
  less = "View Less",
  className,
}: {
  children: ReactNode[];
  limit: number;
  more?: string;
  less?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={className}>
        {children.slice(0, limit)}
        {/* The rest stay in the page, hidden, as on the live page, and `display: contents`
            keeps their rows in the list's own grid once opened. */}
        <div style={{ display: open ? "contents" : "none" }}>{children.slice(limit)}</div>
      </div>
      {children.length > limit && (
        <div className={styles.expandRow}>
          <button type="button" className={styles.expandBtn} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? less : more}
          </button>
        </div>
      )}
    </>
  );
}
