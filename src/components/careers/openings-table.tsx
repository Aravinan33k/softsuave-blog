"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { SiteLink } from "@/themes/softsuave/site-link";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/landing/section-head";
import type { OpeningsContent } from "@/lib/home/careers-content";
import landing from "@/components/landing/landing.module.css";
import styles from "./openings-table.module.css";

/**
 * The careers page's "Join Us" section: location tabs over a Role | Location |
 * Apply table, as the live page renders it.
 *
 * `landing/listing` renders a collection as cards; the live careers page is a
 * plain table of three short fields per row, so this is its own component.
 *
 * The tabs follow the WAI-ARIA tabs pattern (roving tabindex, arrow / Home /
 * End keys). There is one panel whose rows change with the selected tab —
 * filtering a list already in the payload, no round trip. A location with no
 * openings (live lists Bangalore with an empty table) shows `emptyText` rather
 * than a bare header row.
 *
 * Below 640px the rows restack as role over location with the button beside
 * them, so the table never scrolls sideways at phone width.
 */
export default function OpeningsTable({
  content,
  id = "openings",
}: Readonly<{ content: OpeningsContent; id?: string }>) {
  const uid = useId();
  const tabs = [content.allLabel, ...content.locations];
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const shown =
    active === 0
      ? content.items
      : content.items.filter((o) => o.location === content.locations[active - 1]);

  const tabId = (i: number) => `${uid}-tab-${i}`;
  const panelId = `${uid}-panel`;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight"
        ? active === last ? 0 : active + 1
        : e.key === "ArrowLeft"
          ? active === 0 ? last : active - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className={landing.sectionShell} id={id}>
      <div className={styles.inner}>
        <SectionHead title={content.title} />

        <FadeUp>
          <div className={styles.tabs} role="tablist" aria-label="Filter openings by location">
            {tabs.map((label, i) => (
              <button
                key={label}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={tabId(i)}
                aria-selected={active === i}
                aria-controls={panelId}
                tabIndex={active === i ? 0 : -1}
                className={`${styles.tab}${active === i ? ` ${styles.tabOn}` : ""}`}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            className={styles.panel}
            role="tabpanel"
            id={panelId}
            aria-labelledby={tabId(active)}
            tabIndex={shown.length === 0 ? 0 : undefined}
          >
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">{content.columns.role}</th>
                  <th scope="col">{content.columns.location}</th>
                  <th scope="col">
                    <span className={landing.srOnly}>{content.columns.apply}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {shown.length === 0 ? (
                  <tr className={styles.emptyRow}>
                    <td colSpan={3}>{content.emptyText}</td>
                  </tr>
                ) : (
                  shown.map((o) => (
                    <tr key={o.key}>
                      <td className={styles.role}>{o.role}</td>
                      <td className={styles.location}>{o.location}</td>
                      <td className={styles.apply}>
                        {/* Opens the live applicant form in a new tab, as the
                            live page does. The hidden role name makes each of
                            the five "Apply Now" links distinct to a screen
                            reader while keeping the visible label in the name. */}
                        <SiteLink
                          href={o.applyHref}
                          target="_blank"
                          rel="noopener"
                          className={`${landing.btn} ${landing.btnPrimary} ${styles.applyBtn}`}
                        >
                          {content.applyLabel}
                          <span className={landing.srOnly}>: {o.role}</span>
                        </SiteLink>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
