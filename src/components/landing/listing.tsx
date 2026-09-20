"use client";

import { useMemo, useState } from "react";
import { SiteLink } from "@/themes/softsuave/site-link";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

export interface ListingItem {
  readonly key: string;
  /** The facet this item filters under — industry, sector or discipline. */
  readonly tag: string;
  readonly title: string;
  /** The engagement in a sentence. Optional, but a card without one is thin. */
  readonly body?: string;
  /** Headline number. Optional: a story without a published figure still lists. */
  readonly metricValue?: string;
  readonly metricLabel?: string;
  readonly year?: string;
  /**
   * The detail page, when one exists. Omitted renders a non-interactive card
   * rather than a link to a route that is not built yet — an index that 404s
   * on every card is worse than an index that does not pretend to link.
   */
  readonly href?: string;
}

export interface ListingContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly items: readonly ListingItem[];
  /** Label for the chip that clears the filter. */
  readonly allLabel?: string;
}

/**
 * Index page body for a collection — /case-studies, /success-stories,
 * /portfolio.
 *
 * The landing surface already renders case studies as a static shelf of
 * outcome cards (`case-studies.tsx`), which is right for a *section* of a
 * service page: a fixed handful, chosen for that page, read at a glance. An
 * index is a different job — every story, on one page, findable by industry —
 * so this adds the two things that shelf deliberately lacks: the page's own H1
 * masthead, and a filter.
 *
 * It reuses that shelf's card styling rather than inventing a second card, so
 * a study looks the same wherever a reader meets it.
 *
 * Filtering is client-side over a list that is already in the payload. These
 * collections are tens of items, not thousands, so a round trip per facet
 * would be slower and would break the back button for nothing. The chips are
 * real `<button>`s with `aria-pressed`, so the filter is operable by keyboard
 * and announced; the grid carries `aria-live="polite"` so a change in what is
 * listed is spoken rather than silently swapping under a screen reader.
 */
export default function Listing({
  content,
  id = "index",
}: {
  content: ListingContent;
  id?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  /** Facets in first-appearance order — not alphabetical, so the author's
   *  ordering of the collection survives into the filter. */
  const tags = useMemo(() => {
    const seen: string[] = [];
    for (const it of content.items) if (!seen.includes(it.tag)) seen.push(it.tag);
    return seen;
  }, [content.items]);

  const shown = active ? content.items.filter((it) => it.tag === active) : content.items;
  const allLabel = content.allLabel ?? "All";

  return (
    <section className={styles.indexHead} id={id}>
      <SectionHead level={1} kicker={content.eyebrow} title={content.title} intro={content.intro} />

      {tags.length > 1 && (
        <FadeUp>
          <div className={styles.listFilters} role="group" aria-label="Filter by industry">
            <button
              type="button"
              className={`${styles.listChip}${active === null ? ` ${styles.listChipOn}` : ""}`}
              aria-pressed={active === null}
              onClick={() => setActive(null)}
            >
              {allLabel}
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`${styles.listChip}${active === tag ? ` ${styles.listChipOn}` : ""}`}
                aria-pressed={active === tag}
                onClick={() => setActive(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </FadeUp>
      )}

      <FadeUp>
        <div className={styles.caseGrid} aria-live="polite">
          {shown.map((item) => {
            const inner = (
              <>
                <span className={styles.caseTag}>{item.tag}</span>
                {item.metricValue && <span className={styles.caseMetric}>{item.metricValue}</span>}
                {item.metricLabel && (
                  <span className={styles.caseMetricLabel}>{item.metricLabel}</span>
                )}
                <h2 className={styles.caseTitle}>{item.title}</h2>
                {item.body && <p className={styles.caseBody}>{item.body}</p>}
                {item.year && <span className={styles.caseYear}>{item.year}</span>}
              </>
            );

            /* A linked card is an anchor wrapping the whole tile, so the target
               is the tile rather than a "read more" the pointer has to find. */
            return item.href ? (
              <SiteLink
                key={item.key}
                href={item.href}
                className={`${styles.caseCard} ${styles.caseCardLink}`}
              >
                {inner}
              </SiteLink>
            ) : (
              <article key={item.key} className={styles.caseCard}>
                {inner}
              </article>
            );
          })}
        </div>
      </FadeUp>
    </section>
  );
}
