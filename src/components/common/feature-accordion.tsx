"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "@/components/landing/section-head";
import CardIconBadge from "@/components/common/card-icon-badge";
import type { IconKey } from "@/lib/home/icon-for";
import landing from "@/components/landing/landing.module.css";
import styles from "./feature-accordion.module.css";

export interface FeatureAccordionContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly name: string;
    readonly paragraphs: readonly string[];
    /** The badge's glyph, from the site's icon set; omitted, it is picked from the feature's words. */
    readonly icon?: IconKey;
    /** The feature's screenshot, shown beside the list (inside the open item below 1000px). */
    readonly image?: {
      readonly src: string;
      readonly alt: string;
      readonly width?: number;
      readonly height?: number;
    };
  }[];
}

/**
 * Features as an accordion beside a picture: the section's standard head,
 * then a list of features on the left — an icon badge, the name and a +/×
 * toggle, the open one showing its copy — and the open feature's screenshot
 * on the right. Exactly one feature is open at all times, the first on load:
 * picking another opens it and closes the last, and the open one cannot be
 * closed (its button is `aria-disabled`).
 *
 * Below 1000px the picture column goes and each feature carries its own
 * screenshot under its copy, so the list reads top to bottom on a tablet or
 * phone with the picture next to the words it illustrates.
 *
 * Every feature's copy is in the markup, the closed ones collapsed (and
 * `inert`, so their contents leave the tab order), so a crawler reads all of
 * it. Each name is an <h3> wrapping its toggle button (the WAI-ARIA
 * accordion pattern): `aria-expanded` on the button, the panel a labelled
 * region. The glyph in each badge is picked from the feature's own words
 * (`CardIconBadge`), the site's icon set.
 */
export default function FeatureAccordion({
  content,
  id,
}: {
  content: FeatureAccordionContent;
  id: string;
}) {
  const uid = useId();
  // Always one feature open (by request): picking another moves it; the open
  // one cannot be closed. Its picture is the one on show.
  const [open, setOpen] = useState(0);
  const shown = open;
  const listRef = useRef<HTMLUListElement>(null);
  const figRef = useRef<HTMLDivElement>(null);

  /**
   * The picture frame follows the list's height as features open and close,
   * but the screenshots inside it are sized ONCE, to the tallest the list can
   * be (whichever feature is open), and pinned to its top. So while a card
   * opens the frame reveals more or less of a picture that never rescales;
   * stretched to the frame, it was re-cropped on every frame of the opening
   * and visibly shook (review). Measured when settled — on load and when the
   * list's width changes — never mid-animation.
   */
  const sizePictures = useCallback(() => {
    const list = listRef.current;
    const fig = figRef.current;
    if (!list || !fig) return;
    const inners = [
      ...list.querySelectorAll<HTMLElement>(`.${styles.panelInner}`),
    ];
    // The open feature, read from the markup (`data-open` on its item).
    const current = list.querySelector<HTMLElement>(
      `li[data-open] .${styles.panelInner}`,
    );
    if (!current) return;
    const pad = parseFloat(getComputedStyle(current).paddingBottom) || 0;
    // The list without the open panel, plus the tallest panel opened.
    const base =
      list.getBoundingClientRect().height -
      current.getBoundingClientRect().height;
    const tallest = Math.max(
      ...inners.map((el) => el.scrollHeight - (el === current ? pad : 0) + pad),
    );
    fig.style.setProperty("--fig-max", `${Math.ceil(base + tallest)}px`);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    sizePictures();
    let width = list.getBoundingClientRect().width;
    const ro = new ResizeObserver(([entry]) => {
      // Width only: the height changes on every opening, which is the animation itself.
      if (Math.abs(entry.contentRect.width - width) < 1) return;
      width = entry.contentRect.width;
      sizePictures();
    });
    ro.observe(list);
    return () => ro.disconnect();
  }, [sizePictures]);

  return (
    <section className={landing.sectionShell} id={id}>
      <SectionHead
        kicker={content.eyebrow}
        title={content.title}
        intro={content.body}
      />

      <div className={styles.layout}>
        <ul ref={listRef} className={styles.list}>
          {content.items.map((item, i) => {
            const isOpen = open === i;
            const btnId = `${uid}-btn-${i}`;
            const panelId = `${uid}-panel-${i}`;
            return (
              <li
                key={item.name}
                className={styles.item}
                data-open={isOpen || undefined}
              >
                <h3 className={styles.heading}>
                  <button
                    type="button"
                    id={btnId}
                    className={styles.toggle}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    // The open feature stays open: its button does nothing.
                    aria-disabled={isOpen || undefined}
                    onClick={() => setOpen(i)}
                  >
                    <CardIconBadge
                      title={item.name}
                      body={item.paragraphs.join(" ")}
                      iconKey={item.icon}
                      size="sm"
                      className={styles.badge}
                    />
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.sign} aria-hidden />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={styles.panel}
                  inert={!isOpen}
                >
                  <div className={styles.panelInner}>
                    <div className={styles.panelBody}>
                      {item.paragraphs.map((p) => (
                        <p key={p.slice(0, 24)} className={styles.copy}>
                          {p}
                        </p>
                      ))}
                      {item.image ? (
                        <div className={styles.inlineFigure}>
                          <Image
                            src={publicMediaUrl(item.image.src)}
                            alt={item.image.alt}
                            width={item.image.width ?? 550}
                            height={item.image.height ?? 370}
                            sizes="(min-width: 1000px) 1px, 92vw"
                            className={styles.img}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Desktop: every screenshot stacked in one frame, the shown one faded in. */}
        <div ref={figRef} className={styles.figure} aria-hidden>
          {content.items.map((item, i) =>
            item.image ? (
              <Image
                key={item.name}
                src={publicMediaUrl(item.image.src)}
                alt=""
                width={item.image.width ?? 550}
                height={item.image.height ?? 370}
                sizes="(min-width: 1000px) 46vw, 1px"
                className={styles.figureImg}
                data-shown={shown === i || undefined}
              />
            ) : null,
          )}
        </div>
      </div>
    </section>
  );
}
