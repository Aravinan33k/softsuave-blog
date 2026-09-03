"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import type { NavMenuPanel } from "@/lib/home/nav-menu";
import { SiteLink } from "@/themes/softsuave/site-link";
import styles from "./home.module.css";

const pad = (n: number) => String(n + 1).padStart(2, "0");
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/**
 * Three kinds of destination live in this menu, and each needs a different
 * element:
 *
 *   #anchor   a section of the page we're on. Must stay a plain <a> so the
 *             Lenis handler in ScrollProvider intercepts it.
 *   /route    a path THIS app serves. `next/link`, for client navigation and
 *             prefetch — which is what `SiteLink` picks.
 *   /page     a path only softsuave.com serves. An absolute anchor out to the
 *             live site — also `SiteLink`, which is the whole reason this
 *             delegates rather than testing `startsWith("/")` itself. It used
 *             to do exactly that, which was fine while every item pointed at
 *             one of our four routes; now that the menu mirrors the live
 *             site's ~80 pages, a bare `next/link` would client-navigate
 *             straight into a 404 for most of them.
 */
export function MenuLink({
  href,
  className,
  onNavigate,
  children,
}: {
  href: string;
  className?: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return href.startsWith("/") ? (
    <SiteLink href={href} className={className} onClick={onNavigate}>
      {children}
    </SiteLink>
  ) : (
    <a href={href} className={className} onClick={onNavigate}>
      {children}
    </a>
  );
}

/**
 * The nav's mega-menu panel: a full-bleed drawer under the bar, in three
 * columns — the division's lede, a category rail, and the items in the selected
 * category. Hovering or focusing a rail entry switches the item grid, so the
 * whole menu is one pointer move deep.
 *
 * It renders inside <header>, which is what makes it tone-aware for free: the
 * `.navLight` vars cascade into it, so the panel inverts with the bar over a
 * light band instead of needing its own scroll listener.
 */
export default function MegaPanel({
  panel,
  onNavigate,
}: {
  panel: NavMenuPanel;
  onNavigate: () => void;
}) {
  const root = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(panel.groups[0].key);
  const group = panel.groups.find((g) => g.key === active) ?? panel.groups[0];
  // one item with children turns the whole group into columns, so the grid
  // stays a single rhythm instead of mixing tall cards with one-line rows
  const nested = group.items.some((i) => i.items?.length);

  const base = slug(panel.eyebrow);
  const tabId = (key: string) => `${base}-tab-${key}`;
  const gridId = `${base}-items`;

  // Panel entrance. Mounted only while open, so this runs once per opening.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const cols = root.current.querySelectorAll(`.${styles.megaCol}`);
      const tl = gsap.timeline();
      tl.fromTo(root.current, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" });
      tl.fromTo(cols, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.42, ease: "power2.out", stagger: 0.06 }, 0.04);
      return () => {
        tl.kill();
      };
    },
    { scope: root },
  );

  // Re-stagger just the items when the category changes.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const items = root.current.querySelectorAll(`.${styles.megaItem}, .${styles.megaBlock}`);
      const tw = gsap.fromTo(
        items,
        { opacity: 0, x: 8 },
        { opacity: 1, x: 0, duration: 0.34, ease: "power2.out", stagger: 0.02 },
      );
      return () => {
        tw.kill();
      };
    },
    { scope: root, dependencies: [active], revertOnUpdate: true },
  );

  return (
    <div ref={root} className={styles.megaPanel}>
      <div className={styles.megaInner}>
        <div className={`${styles.megaCol} ${styles.megaLede}`}>
          <span className={styles.eyebrow}>{panel.eyebrow}</span>
          <p className={styles.megaTitle}>{panel.title}</p>
          <p className={styles.megaBody}>{panel.body}</p>
          <MenuLink href={panel.cta.href} className={styles.megaLedeCta} onNavigate={onNavigate}>
            {panel.cta.label}
            <span aria-hidden>&rarr;</span>
          </MenuLink>
        </div>

        <div
          className={`${styles.megaCol} ${styles.megaRail}`}
          role="tablist"
          aria-label={`${panel.eyebrow} categories`}
        >
          {panel.groups.map((g, i) => (
            <button
              key={g.key}
              type="button"
              id={tabId(g.key)}
              role="tab"
              aria-selected={g.key === group.key}
              aria-controls={gridId}
              className={`${styles.megaRailItem} ${g.key === group.key ? styles.megaRailItemOn : ""}`}
              onMouseEnter={() => setActive(g.key)}
              onFocus={() => setActive(g.key)}
              onClick={() => setActive(g.key)}
            >
              <span className={styles.megaRailNum} aria-hidden>
                {pad(i)}
              </span>
              <span>{g.name}</span>
            </button>
          ))}
        </div>

        <div
          className={`${styles.megaCol} ${styles.megaItems} ${group.dense ? styles.megaItemsDense : ""} ${nested ? styles.megaItemsNested : ""}`}
          id={gridId}
          role="tabpanel"
          aria-labelledby={tabId(group.key)}
        >
          {group.items.map((it, i) =>
            nested ? (
              <div key={it.name} className={styles.megaBlock}>
                <MenuLink href={it.href} className={styles.megaBlockHead} onNavigate={onNavigate}>
                  <span className={styles.megaItemNum} aria-hidden>
                    {pad(i)}
                  </span>
                  <span className={styles.megaItemName}>{it.name}</span>
                </MenuLink>
                {it.blurb && <span className={styles.megaBlockBlurb}>{it.blurb}</span>}
                {it.items && (
                  <div className={styles.megaSubList}>
                    {it.items.map((sub) => (
                      <MenuLink
                        key={sub.name}
                        href={sub.href}
                        className={styles.megaSubItem}
                        onNavigate={onNavigate}
                      >
                        {sub.name}
                      </MenuLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <MenuLink key={it.name} href={it.href} className={styles.megaItem} onNavigate={onNavigate}>
                <span className={styles.megaItemNum} aria-hidden>
                  {pad(i)}
                </span>
                <span className={styles.megaItemText}>
                  <span className={styles.megaItemName}>{it.name}</span>
                  {it.blurb && <span className={styles.megaItemBlurb}>{it.blurb}</span>}
                </span>
              </MenuLink>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
