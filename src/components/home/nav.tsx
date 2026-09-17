"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import { nav } from "@/lib/home/content";
import { navPanels, navHrefForPage } from "@/lib/home/nav-menu";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import Magnetic from "./magnetic";
import MegaPanel, { MenuLink } from "./mega-menu";
import { useSurfaceTone } from "./use-surface-tone";
import styles from "./home.module.css";

type NavLink = { label: string; href: string };

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

/**
 * Fixed top nav: sticky logo + the site's four divisions + rounded-full pill
 * CTA. On mount it drops in from above.
 *
 * The bar is hero-locked: fully transparent with the white lockup for the
 * hero's whole height, then it syncs to whatever band scrolls under it — light
 * bar + dark lockup over `.light`/`.cream`, ink glass + white lockup over the
 * dark canvas. Both lockups are rendered and cross-faded so the swap doesn't
 * pop (see `useSurfaceTone`).
 *
 * From 1000px up, a division with an entry in `navPanels` opens a full-bleed
 * `MegaPanel` on hover or focus. Below that the four collapse into the
 * full-screen burger overlay, where each expands into the same content as an
 * accordion.
 *
 * `links`, `cta` and `logoHref` default to the homepage's own content, and
 * every page in the (marketing) group renders that same bar: one set of
 * divisions and one set of panels across the surface, so the nav never changes
 * shape as the reader moves between pages. The defaults include same-page
 * anchors (#services, #why, …); off the homepage `navHrefForPage` resolves
 * those against it, so they lead to the section instead of nowhere. A page with
 * a genuine reason to differ can still pass its own set.
 *
 * `ownsAnchors` opts out of that resolution, for a page that has the bar's
 * anchor sections itself — `/ai-development-service` has both #services and
 * #why, and there the bar should scroll in-page as it always has. It is a prop
 * rather than a DOM probe because the server renders these links: a link that
 * points at the homepage's copy of a section is right for a crawler and right
 * without JS, and only the page itself knows better.
 */
export default function Nav({
  links = nav.links,
  cta = nav.cta,
  logoHref = "#top",
  ownsAnchors = false,
}: {
  links?: readonly NavLink[];
  cta?: NavLink;
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
    links
      .filter((l) => l.href.startsWith("#"))
      .map((l) => l.href.slice(1))
      .join(","),
  );

  // The default `links` are the homepage's, so its in-page anchors have to
  // become links back to it when this bar renders on a page that doesn't have
  // those sections. `ownsAnchors` is the exception, and the homepage is always
  // one.
  const pathname = usePathname();
  const keepAnchors = ownsAnchors || pathname === "/";
  const resolve = (href: string) => navHrefForPage(href, keepAnchors);

  // `id` keeps the original anchor for the active-section highlight — where the
  // page doesn't have the section, that id isn't in the DOM and nothing
  // highlights, which is correct.
  const items = links.map((l) => ({
    label: l.label,
    href: resolve(l.href),
    id: l.href.startsWith("#") ? l.href.slice(1) : null,
  }));
  const ctaHref = resolve(cta.href);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !bar.current) return;
      gsap.from(bar.current, {
        yPercent: -120,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: prefersReducedMotion() ? 0 : 0.3,
      });
    },
    { scope: bar },
  );

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
        className={`${styles.nav} ${
          tone === "light" ? styles.navLight : tone === "dark" ? styles.navDark : ""
        } ${panel ? styles.navPanelOpen : ""}`}
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
          <Magnetic>
            {ctaHref.startsWith("/") ? (
              <Link href={ctaHref} {...ctaShared}>
                {cta.label}
              </Link>
            ) : (
              <a href={ctaHref} {...ctaShared}>
                {cta.label}
              </a>
            )}
          </Magnetic>
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`} aria-hidden={!open}>
        <nav className={styles.overlayNav}>
          {items.map((l) => {
            const menuPanel = navPanels[l.label];
            // A division with a panel becomes an accordion rather than a link;
            // its own destination stays reachable as the panel's CTA.
            if (!menuPanel) {
              return l.href.startsWith("/") ? (
                <Link key={l.label} href={l.href} onClick={close}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} onClick={close}>
                  {l.label}
                </a>
              );
            }
            const isOpen = expanded === l.label;
            return (
              <div key={l.label} className={styles.mobDiv}>
                <button
                  type="button"
                  className={styles.mobDivHead}
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : l.label)}
                >
                  {l.label}
                  <span className={styles.mobChev} aria-hidden />
                </button>
                {isOpen && (
                  <div className={styles.mobPanel}>
                    {menuPanel.groups.map((g) => (
                      <div key={g.key} className={styles.mobGroup}>
                        <span className={styles.mobGroupName}>{g.name}</span>
                        {g.items.map((it) => (
                          <span key={it.name} className={styles.mobEntry}>
                            <MenuLink href={it.href} className={styles.mobItem} onNavigate={close}>
                              {it.name}
                            </MenuLink>
                            {it.items?.map((sub) => (
                              <MenuLink
                                key={sub.name}
                                href={sub.href}
                                className={styles.mobSubItem}
                                onNavigate={close}
                              >
                                {sub.name}
                              </MenuLink>
                            ))}
                          </span>
                        ))}
                      </div>
                    ))}
                    <MenuLink
                      href={menuPanel.cta.href}
                      className={`${styles.mobItem} ${styles.mobItemCta}`}
                      onNavigate={close}
                    >
                      {menuPanel.cta.label} &rarr;
                    </MenuLink>
                  </div>
                )}
              </div>
            );
          })}
          <MenuLink href={cta.href} className={styles.overlayCta} onNavigate={close}>
            {cta.label}
          </MenuLink>
        </nav>
      </div>
    </>
  );
}
