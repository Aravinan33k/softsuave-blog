"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./logo";
import { nav } from "@/lib/home/content";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import Magnetic from "./magnetic";
import styles from "./home.module.css";

/**
 * Fixed top nav: sticky logo + inline links + rounded-full pill CTA. On mount
 * it drops in from above. Below the lg breakpoint the links collapse into a
 * full-screen overlay menu toggled by a burger. Adds a "scrolled" background
 * once the hero is passed.
 */
export default function Nav() {
  const bar = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header ref={bar} className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
        <a href="#top" className={styles.navLogo} data-cursor="Home">
          <Logo tone="light" size={40} />
        </a>

        <div className={styles.navRight}>
          <Magnetic>
            <a
              href={nav.cta.href}
              className={`${styles.pill} ${styles.pillFilled} ${styles.navCta}`}
              data-cursor="Let's talk"
            >
              {nav.cta.label}
            </a>
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
          {nav.links.map((l) =>
            // In-page anchors stay plain <a> so the Lenis smooth-scroll handler
            // in ScrollProvider picks them up; real routes (e.g. /blog) use
            // next/link for client navigation + prefetch.
            l.href.startsWith("/") ? (
              <Link key={l.label} href={l.href} onClick={close}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} onClick={close}>
                {l.label}
              </a>
            ),
          )}
          <a href={nav.cta.href} onClick={close} className={styles.overlayCta}>
            {nav.cta.label}
          </a>
        </nav>
      </div>
    </>
  );
}
