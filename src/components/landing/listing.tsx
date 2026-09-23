"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { SiteLink } from "@/themes/softsuave/site-link";
import FadeUp from "@/components/home/fade-up";
import BrandImage from "@/components/home/brand-image";
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
  /**
   * Every facet the item lists under, when it is more than `tag` — the live
   * case-study index files one study under two tabs. Omitted, `tag` is the
   * item's only facet.
   */
  readonly filters?: readonly string[];
  /** Card art — beside the copy on a rich (`itemCtaLabel`) card. */
  readonly image?: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
  /** Delivery platforms (Web, Android, iOS) — an icon row when `icon` is set. */
  readonly platforms?: readonly {
    readonly name: string;
    readonly icon?: string;
  }[];
}

export interface ListingContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly items: readonly ListingItem[];
  /** Label for the chip that clears the filter. */
  readonly allLabel?: string;
  /**
   * What the chips filter BY, lowercase and singular, for the filter group's
   * accessible name ("Filter by industry"). Defaults to "industry", which is
   * what the case-study and success-story indexes facet on. The careers index
   * facets on office location, and a screen reader announcing that group as
   * "filter by industry" would be describing a control that does not exist.
   */
  readonly filterLabel?: string;
  /**
   * Chip order, when the collection's own first-appearance order is not the
   * one to show — the case-study index mirrors the live site's tab order.
   */
  readonly facets?: readonly string[];
  /**
   * With an `href`, a card renders this as an explicit button below its copy
   * and links its image and title too, instead of making the whole tile the
   * link. Mirrors the live index's per-card "View Case Study".
   */
  readonly itemCtaLabel?: string;
  /** A button under the masthead — in-page (`#…`) or a route. */
  readonly headCta?: { readonly label: string; readonly href: string };
  /**
   * A photo behind the masthead, by its `page: "four"` manifest id. Veiled so
   * the H1 keeps its contrast; decorative, so it carries no alt text.
   */
  readonly headImage?: { readonly id: string };
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
  listClassName,
}: {
  content: ListingContent;
  id?: string;
  /**
   * Puts the filters and grid in their own full-bleed band under the
   * masthead — pass `home.light` for a warm-white list on a dark page.
   */
  listClassName?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  /** Facets in first-appearance order — not alphabetical, so the author's
   *  ordering of the collection survives into the filter. */
  const tags = useMemo(() => {
    if (content.facets) return [...content.facets];
    const seen: string[] = [];
    for (const it of content.items) if (!seen.includes(it.tag)) seen.push(it.tag);
    return seen;
  }, [content.items, content.facets]);

  const shown = active
    ? content.items.filter((it) => (it.filters ?? [it.tag]).includes(active))
    : content.items;
  const allLabel = content.allLabel ?? "All";

  return (
    <section className={styles.indexHead} id={id}>
      <div className={content.headImage ? styles.listMast : undefined}>
        {content.headImage && (
          <div className={styles.listMastBg} aria-hidden="true">
            <BrandImage
              page="four"
              id={content.headImage.id}
              alt=""
              fill
              priority
              sizes="100vw"
              className={styles.heroBg}
            />
            <div className={styles.listMastVeil} />
          </div>
        )}
        <SectionHead level={1} kicker={content.eyebrow} title={content.title} intro={content.intro} />

        {content.headCta && (
          <FadeUp>
            <div className={styles.listHeadCta}>
              {/* In-page anchors stay plain so ScrollProvider's Lenis handler
                  intercepts them; routes go through SiteLink. */}
              {content.headCta.href.startsWith("#") ? (
                <a href={content.headCta.href} className={`${styles.btn} ${styles.btnPrimary}`}>
                  {content.headCta.label} <span aria-hidden="true">↓</span>
                </a>
              ) : (
                <SiteLink
                  href={content.headCta.href}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  {content.headCta.label} <span aria-hidden="true">→</span>
                </SiteLink>
              )}
            </div>
          </FadeUp>
        )}
      </div>

      <div className={listClassName ? `${styles.listBand} ${listClassName}` : undefined}>
        {/* Target for `headCta`'s in-page jump: the filters and the grid. */}
        <span id={`${id}-items`} className={styles.listAnchor} aria-hidden="true" />

        {tags.length > 1 && (
          <FadeUp>
            <div
              className={styles.listFilters}
              role="group"
              aria-label={`Filter by ${content.filterLabel ?? "industry"}`}
            >
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
          <div
            className={`${styles.caseGrid}${content.itemCtaLabel ? ` ${styles.caseGridRows}` : ""}`}
            aria-live="polite"
          >
            {shown.map((item) => {
              if (item.href && content.itemCtaLabel) {
                return (
                  <article key={item.key} className={`${styles.caseCard} ${styles.caseCardRich}`}>
                    {item.image && (
                      /* Same destination as the title and button; kept out of the
                       tab order and the accessibility tree so a keyboard or
                       screen-reader user meets each study's link once, not thrice. */
                      <SiteLink
                        href={item.href}
                        className={styles.caseMedia}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <Image
                          src={item.image.src}
                          alt=""
                          width={item.image.width}
                          height={item.image.height}
                          sizes="(min-width: 1000px) 40vw, 92vw"
                          className={styles.caseMediaImg}
                        />
                      </SiteLink>
                    )}
                    <div className={styles.caseContent}>
                      <h2 className={styles.caseTitleRich}>
                        <SiteLink href={item.href} className={styles.caseTitleLink}>
                          {item.title}
                        </SiteLink>
                      </h2>
                      {item.body && <p className={styles.caseBody}>{item.body}</p>}
                      {item.platforms && item.platforms.length > 0 && (
                        <div className={styles.caseMeta}>
                          <span className={styles.caseMetaLabel}>Platform :</span>
                          <ul className={styles.casePlatforms}>
                            {item.platforms.map((p) => (
                              <li key={p.name} className={styles.casePlatform}>
                                {p.icon ? (
                                  <Image
                                    src={p.icon}
                                    alt={p.name}
                                    title={p.name}
                                    width={48}
                                    height={48}
                                  />
                                ) : (
                                  p.name
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className={styles.caseMeta}>
                        <span className={styles.caseMetaLabel}>Category :</span>
                        <span className={styles.caseMetaValue}>{item.tag}</span>
                      </div>
                      <div className={styles.caseCta}>
                        <SiteLink href={item.href} className={`${styles.btn} ${styles.btnPrimary}`}>
                          {content.itemCtaLabel} <span aria-hidden="true">→</span>
                        </SiteLink>
                      </div>
                    </div>
                  </article>
                );
              }

              const inner = (
                <>
                  <span className={styles.caseTag}>{item.tag}</span>
                  {item.metricValue && (
                    <span className={styles.caseMetric}>{item.metricValue}</span>
                  )}
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
      </div>
    </section>
  );
}
