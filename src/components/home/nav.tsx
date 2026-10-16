"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { footer, nav } from "@/lib/home/content";
import { navPanels, navHrefForPage, type NavMenuItem } from "@/lib/home/nav-menu";
import MegaPanel, { MenuLink } from "./mega-menu";
import { useSurfaceTone, type SurfaceTone } from "./use-surface-tone";
import styles from "./home.module.css";

/**
 * Which of the nav's own anchor targets the reader is currently in, so the bar
 * doubles as section navigation (`.navLinkActive`). Takes the ids as a joined
 * string to keep the effect dep stable for callers that pass an inline `links`
 * array. Picks the section closest above the 42% line rather than the last one
 * in the list, since nav order and DOM order differ.
 */
function useActiveAnchor(ids: string): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const list = ids ? ids.split(",") : [];
    if (!list.length) return;
    let raf = 0;

    const read = () => {
      raf = 0;
      const line = window.innerHeight * 0.42;
      let best: { id: string; top: number } | null = null;
      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= line && (!best || top > best.top)) best = { id, top };
      }
      setActive(best?.id ?? null);
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

  return active;
}

/** The bar's paint per surface tone. `hero` is the only state with no class:
 *  at rest over the hero it paints nothing at all. */
const TONE_CLASS: Record<SurfaceTone, string> = {
  hero: "",
  "hero-scrolled": styles.navHeroScrolled,
  light: styles.navLight,
  dark: styles.navDark,
};

/**
 * Fixed top nav: sticky logo + the site's four divisions + rounded-full pill
 * CTA. On mount it drops in from above.
 *
 * The bar is fully transparent with the white lockup only while the hero is at
 * rest. The first pixel of scroll gives it a semi-transparent ink ground, so
 * the hero's headline stops reading through the links as it travels up behind
 * them, and past the hero it syncs to whatever band scrolls under it — light
 * bar + dark lockup over `.light`/`.cream`, flat ink + white lockup over the
 * dark canvas. Both lockups are rendered and cross-faded so the swap doesn't
 * pop (see `useSurfaceTone`).
 *
 * From 1000px up, a division with an entry in `navPanels` opens a full-bleed
 * `MegaPanel` on hover or focus. Below that the four collapse into the
 * full-screen burger overlay, where each expands into the same content as an
 * accordion.
 *
 * The bar's content is fixed. It always renders the homepage's own divisions
 * and CTA from `nav`, on every page in the (marketing) group, and there is
 * deliberately no prop to override them — one set of divisions and one set of
 * panels across the whole surface, so the nav never changes shape or wording as
 * the reader moves between pages. Pages used to pass their own `links`/`cta`
 * built from their own section anchors, which is exactly the drift this
 * removes. Those links include same-page anchors (#services, #why, …); off the
 * homepage `navHrefForPage` resolves them against it, so they lead to the
 * section instead of nowhere.
 *
 * `ownsAnchors` opts out of that resolution, for a page that has the bar's
 * anchor sections itself — `/ai-development-service` has both #services and
 * #why, and there the bar should scroll in-page as it always has. It is a prop
 * rather than a DOM probe because the server renders these links: a link that
 * points at the homepage's copy of a section is right for a crawler and right
 * without JS, and only the page itself knows better.
 */
export default function Nav({
  logoHref = "#top",
  ownsAnchors = false,
}: {
  logoHref?: string;
  ownsAnchors?: boolean;
} = {}) {
  const bar = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  /** Division whose mega panel is open (desktop, pointer/focus driven). */
  const [menu, setMenu] = useState<string | null>(null);
  /** Division expanded inside the burger overlay (mobile). */
  const [expanded, setExpanded] = useState<string | null>(null);
  const tone = useSurfaceTone();
  const activeId = useActiveAnchor(
    nav.links
      .flatMap((l) => (l.href?.startsWith("#") ? [l.href.slice(1)] : []))
      .join(","),
  );

  // The bar's links are the homepage's, so its in-page anchors have to become
  // links back to it when this bar renders on a page that doesn't have those
  // sections. `ownsAnchors` is the exception, and the homepage is always one.
  const pathname = usePathname();
  const keepAnchors = ownsAnchors || pathname === "/";
  const resolve = (href: string) => navHrefForPage(href, keepAnchors);

  // `id` keeps the original anchor for the active-section highlight — where the
  // page doesn't have the section, that id isn't in the DOM and nothing
  // highlights, which is correct.
  // A null `href` is a division with no page of its own (Resources): its label
  // only opens its panel, and it never navigates.
  const items = nav.links.map((l) => ({
    label: l.label,
    href: l.href === null ? null : resolve(l.href),
    id: l.href?.startsWith("#") ? l.href.slice(1) : null,
  }));
  const ctaHref = resolve(nav.cta.href);

  // The bar's slide-in is CSS (`.nav` in home.module.css), from the first
  // paint. As a GSAP tween at hydration it re-hid the already-painted bar, so
  // the logo — often the page's largest image — only counted as painted once
  // every script had loaded (PageSpeed LCP, 15 Oct).

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // A mega panel is a hover surface, so any scroll or Escape dismisses it — it
  // must never be left hanging over content the reader has moved on from.
  useEffect(() => {
    if (!menu) return;
    const shut = () => setMenu(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") shut();
    };
    window.addEventListener("scroll", shut, { passive: true, once: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", shut);
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const close = () => {
    setOpen(false);
    setExpanded(null);
    setMenu(null);
  };

  // Escape closes the mobile menu, as it does the desktop panels.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setExpanded(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const panel = menu ? navPanels[menu] : undefined;

  const ctaShared = {
    className: `${styles.pill} ${styles.pillFilled} ${styles.navCta}`,
    "data-cursor": "Book a call",
    onMouseEnter: () => setMenu(null),
  };

  return (
    <>
      <header
        ref={bar}
        // While the mobile menu is open the bar sits on the menu's own dark
        // ground, so it takes the dark paint whatever band is under it — a
        // light bar over the dark menu read as two different surfaces.
        className={`${styles.nav} ${open && tone !== "hero" ? styles.navDark : TONE_CLASS[tone]} ${panel ? styles.navPanelOpen : ""}`}
        data-tone={tone}
        onMouseLeave={() => setMenu(null)}
        // focus leaving the header entirely (Tab past the last item) closes it
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMenu(null);
        }}
      >
        <a href={resolve(logoHref)} className={styles.navLogo} data-cursor="Home">
          <Logo tone="light" size={48} className={styles.navLogoOnDark} />
          {/* the second lockup is the same brand name — hidden from AT so the
              link keeps a single accessible name */}
          <span aria-hidden>
            <Logo tone="dark" size={48} className={styles.navLogoOnLight} />
          </span>
        </a>

        {/* The four top-level divisions. Inline from 1000px up; below that they
            live in the burger overlay instead (same `links` array). */}
        <nav className={styles.navLinks} aria-label="Main">
          {items.map((l) => {
            const id = l.id;
            const hasPanel = Boolean(navPanels[l.label]);
            const shared = {
              onMouseEnter: () => setMenu(hasPanel ? l.label : null),
              onFocus: () => setMenu(hasPanel ? l.label : null),
              ...(hasPanel ? { "aria-haspopup": true, "aria-expanded": menu === l.label } : {}),
            };
            // Clicking opens rather than toggles: hover/focus has already
            // opened it by the time the click lands.
            if (l.href === null) {
              return (
                <button key={l.label} type="button" onClick={() => setMenu(l.label)} {...shared}>
                  {l.label}
                  {hasPanel && <span className={styles.navChev} aria-hidden />}
                </button>
              );
            }
            return l.href.startsWith("/") ? (
              <Link key={l.label} href={l.href} onClick={close} {...shared}>
                {l.label}
                {hasPanel && <span className={styles.navChev} aria-hidden />}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className={id === activeId ? styles.navLinkActive : ""}
                aria-current={id === activeId ? "true" : undefined}
                data-cursor={l.label}
                onClick={close}
                {...shared}
              >
                {l.label}
                {hasPanel && <span className={styles.navChev} aria-hidden />}
              </a>
            );
          })}
        </nav>

        {panel && <MegaPanel panel={panel} onNavigate={close} />}

        <div className={styles.navRight}>
          {ctaHref.startsWith("/") ? (
            <Link href={ctaHref} {...ctaShared}>
              {nav.cta.label}
            </Link>
          ) : (
            <a href={ctaHref} {...ctaShared}>
              {nav.cta.label}
            </a>
          )}
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* The mobile menu (below 1000px). A full-height sheet under the bar:
          the four divisions as full-width rows, each opening in place into its
          panel's groups, with the CTA pinned at the
          foot so it never scrolls away. `inert` while closed keeps its links
          out of the tab order and the accessibility tree. */}
      <div
        id="mobile-menu"
        className={`${styles.mnav} ${open ? styles.mnavOpen : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        {/* `data-lenis-prevent`: the page's smooth scroll would otherwise take
            the wheel, and this list must scroll on its own. */}
        <div className={styles.mnavScroll} data-lenis-prevent>
          <nav className={styles.mnavList} aria-label="Mobile">
            {items.map((l, i) => {
              const menuPanel = navPanels[l.label];
              const style = { ["--i" as string]: i } as React.CSSProperties;
              // A division with no panel is a plain row link.
              if (!menuPanel) {
                if (l.href === null) return null;
                return (
                  <div key={l.label} className={styles.mnavRow} style={style}>
                    <MenuLink href={l.href} className={styles.mnavHead} onNavigate={close}>
                      <span className={styles.mnavLabel}>{l.label}</span>
                      <span className={styles.mnavGo} aria-hidden />
                    </MenuLink>
                  </div>
                );
              }
              const isOpen = expanded === l.label;
              const panelId = `mnav-${l.label.toLowerCase()}`;
              return (
                <div key={l.label} className={styles.mnavRow} style={style} data-open={isOpen}>
                  <button
                    type="button"
                    className={styles.mnavHead}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setExpanded(isOpen ? null : l.label)}
                  >
                    <span className={styles.mnavLabel}>{l.label}</span>
                    <span className={styles.mnavToggle} aria-hidden />
                  </button>
                  {/* Always rendered, so it can open and close with a height
                      transition; `inert` while shut. */}
                  <div id={panelId} className={styles.mnavPanel} inert={!isOpen}>
                    <div className={styles.mnavPanelInner}>
                      {menuPanel.groups.map((g) => (
                        <div key={g.key} className={styles.mnavGroup}>
                          {/* A one-group panel's name only repeats the division. */}
                          {menuPanel.groups.length > 1 && <p className={styles.mnavGroupName}>{g.name}</p>}
                          {g.items.map((it) => (
                            <MobileItem key={it.name} item={it} onNavigate={close} />
                          ))}
                        </div>
                      ))}
                      <MenuLink href={menuPanel.cta.href} className={styles.mnavPanelCta} onNavigate={close}>
                        {menuPanel.cta.label}
                        <span aria-hidden>&rarr;</span>
                      </MenuLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
          {/* The published lines, as the footer lists them (the HR line is for
              candidates, not a sales enquiry). At the end of the list rather
              than pinned: wrapped onto three lines on a small phone they took
              the room the menu itself needs. */}
          <div className={styles.mnavContact}>
            <a href={`mailto:${footer.contact.email}`}>{footer.contact.email}</a>
            {footer.contact.phones
              .filter((p) => !("note" in p))
              .map((p) => (
                <a key={p.href} href={p.href}>
                  {p.display}
                </a>
              ))}
          </div>
        </div>

        <div className={styles.mnavFoot}>
          {/* `ctaHref`, not `MenuLink`: this is the PAGE's own CTA, and
              `MenuLink` resolves anchors against the homepage on purpose —
              right for the menu items, wrong here, where `#enquiry` is a
              section of the page the reader is on. */}
          {ctaHref.startsWith("/") ? (
            <Link href={ctaHref} className={`${styles.pill} ${styles.pillFilled} ${styles.mnavCta}`} onClick={close}>
              {nav.cta.label}
            </Link>
          ) : (
            <a href={ctaHref} className={`${styles.pill} ${styles.pillFilled} ${styles.mnavCta}`} onClick={close}>
              {nav.cta.label}
            </a>
          )}
        </div>
      </div>
    </>
  );
}

/**
 * One entry of an open mobile division. A plain item is a full-width row; an
 * item with children is its own row followed by them — a short-named list
 * (`terse`: the web and mobile technologies) as a two-column grid of chips,
 * anything else as indented rows. A child with children of its own (Native /
 * Hybrid App Development) is a small heading over its chips.
 */
function MobileItem({ item, onNavigate }: { item: NavMenuItem; onNavigate: () => void }) {
  const head = item.href ? (
    <MenuLink href={item.href} className={styles.mnavItem} onNavigate={onNavigate}>
      {item.name}
      <span className={styles.mnavGo} aria-hidden />
    </MenuLink>
  ) : (
    <p className={styles.mnavSubHead}>{item.name}</p>
  );
  if (!item.items?.length) return head;

  const children = item.items;
  const nested = children.some((c) => c.items?.length);
  const chip = (c: NavMenuItem) =>
    c.href ? (
      <MenuLink key={c.name} href={c.href} className={styles.mnavChip} onNavigate={onNavigate}>
        {c.name}
      </MenuLink>
    ) : null;

  return (
    <div className={styles.mnavEntry}>
      {head}
      {nested ? (
        children.map((c) => (
          <div key={c.name} className={styles.mnavNested}>
            {c.href ? (
              <MenuLink href={c.href} className={styles.mnavSubHead} onNavigate={onNavigate}>
                {c.name}
              </MenuLink>
            ) : (
              <p className={styles.mnavSubHead}>{c.name}</p>
            )}
            <div className={styles.mnavChips}>{c.items?.map(chip)}</div>
          </div>
        ))
      ) : item.terse ? (
        <div className={styles.mnavChips}>{children.map(chip)}</div>
      ) : (
        <div className={styles.mnavSubs}>
          {children.map((c) =>
            c.href ? (
              <MenuLink key={c.name} href={c.href} className={styles.mnavSub} onNavigate={onNavigate}>
                {c.name}
              </MenuLink>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
