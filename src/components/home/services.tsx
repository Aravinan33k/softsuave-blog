"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/home/content";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SplitReveal from "./split-reveal";
import { useDesktopScene } from "@/lib/home/use-desktop-scene";
import BrandImage from "./brand-image";
import { SiteLink } from "@/themes/softsuave/site-link";
import styles from "./home.module.css";

/**
 * Services — a free-scrolling, self-playing stacked-card carousel. No pin: the
 * page scrolls normally, and the carousel just auto-advances on a timer for as
 * long as the section is on screen (restarting each time it re-enters view).
 * Left/Right arrow keys step through the cards by hand and reset the
 * auto-advance clock so it doesn't immediately fire again. The left column
 * (name + body + Know More + counter) crossfades per slide, while the image
 * cards slide in from the right and leave a sliver of the previous card
 * peeking behind. Mobile falls back to a vertical stack. Reduced motion drops
 * the autoplay entirely and shows the first card static.
 */

// Dwell time per slide while the section is on screen — a bit longer than a
// snappy carousel so there's room to actually read the copy before it moves on.
const AUTOPLAY_MS = 6500;

// Placeholder images until the real Pexels service shots are generated
// (`npm run images` with PEXELS_API_KEY set) — then flip this to false.
const USE_PLACEHOLDER = false;
const PLACEHOLDER = ["work-1", "work-2", "work-3", "work-4", "work-5", "work-6", "work-1", "work-2"];
const imgId = (i: number, img: string) =>
  USE_PLACEHOLDER ? PLACEHOLDER[i % PLACEHOLDER.length] : `svc-${img}`;

const pad = (n: number) => String(n).padStart(2, "0");
const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/**
 * The per-service Know More button.
 *
 * `services.items[].href` mixes two kinds of destination and the element has to
 * follow, which is the whole reason this is a component rather than an inline
 * `<a>`:
 *
 *   a service page   nine of the ten. Goes through `SiteLink`, which picks
 *                    next/link or a plain anchor depending on whether this app
 *                    serves that path — a hand-written <a> would drop the
 *                    `/blog` basePath in production and 404.
 *   "#services"      MLOps only, which has no page. Must stay a plain <a> so
 *                    ScrollProvider's Lenis handler intercepts it and eases to
 *                    the section; routing an in-page hash through next/link
 *                    fights the smooth scroller.
 */
function KnowMoreLink({ href }: { href: string }) {
  const label = "Know More";
  return href.startsWith("#") ? (
    <a href={href} className={styles.carPill} data-cursor={label}>
      {label}
    </a>
  ) : (
    <SiteLink href={href} className={styles.carPill} data-cursor={label}>
      {label}
    </SiteLink>
  );
}

/** Position each card by its distance from the active slide. */
function cardStyle(offset: number): React.CSSProperties {
  if (offset === 0) return { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 30 };
  if (offset === -1) return { transform: "translateX(-14%) scale(0.9)", opacity: 1, zIndex: 20 };
  if (offset === -2) return { transform: "translateX(-24%) scale(0.82)", opacity: 0.3, zIndex: 10 };
  if (offset < -2) return { transform: "translateX(-30%) scale(0.78)", opacity: 0, zIndex: 5 };
  return { transform: "translateX(66%) scale(0.9)", opacity: 0, zIndex: 1 }; // upcoming
}

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  // Heading tags go to whichever layout is on screen — see useDesktopScene.
  const desktop = useDesktopScene();
  const activeRef = useRef(0);
  const autoplayId = useRef<ReturnType<typeof setInterval> | null>(null);
  const inViewRef = useRef(false);

  const items = services.items;
  const N = items.length;

  const goTo = (i: number) => {
    const next = ((i % N) + N) % N;
    activeRef.current = next;
    setActive(next);
  };

  const stopAutoplay = () => {
    if (autoplayId.current) {
      clearInterval(autoplayId.current);
      autoplayId.current = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayId.current = setInterval(() => goTo(activeRef.current + 1), AUTOPLAY_MS);
  };

  // Manual step (arrow keys) resets the autoplay clock so it doesn't fire
  // again right on top of the interaction.
  const step = (dir: 1 | -1) => {
    goTo(activeRef.current + dir);
    if (inViewRef.current) startAutoplay();
  };

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1000px)", () => {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          onEnter: () => {
            inViewRef.current = true;
            startAutoplay();
          },
          onEnterBack: () => {
            inViewRef.current = true;
            startAutoplay();
          },
          onLeave: () => {
            inViewRef.current = false;
            stopAutoplay();
          },
          onLeaveBack: () => {
            inViewRef.current = false;
            stopAutoplay();
          },
        });
        return () => {
          st.kill();
          stopAutoplay();
        };
      });

      mm.add("(max-width: 999px)", () => {
        gsap.from(`.${styles.carMobRow}`, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  // Left/Right arrow keys step through the carousel while its section is on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inViewRef.current) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section ref={sectionRef} className={cx(styles.section, styles.servicesCarousel)} id="services">
      {/* ---------- Desktop: free-scrolling, self-playing carousel ---------- */}
      <div className={styles.carDesktop}>
        {/* Section header — the carousel used to open on a bare eyebrow, which
            left the desktop view with no heading or standfirst at all. Split
            across two columns so it stays short enough for the carousel to keep
            its full-viewport stage. */}
        <div className={styles.carHead}>
          <div>
            <span className={styles.eyebrow}>{services.eyebrow}</span>
            <SplitReveal as={desktop ? "h2" : "div"} className={styles.carHeadTitle} type="words">
              {services.title}
            </SplitReveal>
          </div>
          <p className={styles.carHeadLead}>{services.body}</p>
        </div>

        <div className={styles.carGrid}>
          <div key={active} className={styles.carText} aria-live="polite">
            <span className={styles.carNum}>/{pad(active + 1)}</span>
            {/* h3, not h2: the section's own heading is `.carHeadTitle` above,
                and a service NAME is subordinate to it. The mobile stack below
                already had this right — the desktop stage was emitting a second
                h2 inside the same section. */}
            {desktop ? (
              <h3 className={styles.carName}>{items[active].name}</h3>
            ) : (
              <div className={styles.carName}>{items[active].name}</div>
            )}
            <p className={styles.carBody}>{items[active].body}</p>
            {/* Follows the card on screen. This was a fixed "#contact", so
                every one of the ten services sent the reader to the same
                form — the button named a service and then did not take them
                to it. `KnowMoreLink` picks the element from the href, because
                the list mixes real pages with one in-page anchor. */}
            <KnowMoreLink href={items[active].href} />
          </div>

          <div className={styles.carStage}>
            {items.map((s, i) => (
              <div
                key={s.key}
                className={styles.carCard}
                style={cardStyle(i - active)}
                aria-hidden={i !== active}
              >
                <BrandImage page="four" id={imgId(i, s.img)} fill sizes="55vw" className="object-cover" />
                <span className={styles.carCardVeil} aria-hidden />
                <span className={styles.carCardTag}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.carControls}>
          <span className={styles.carCounter}>
            {pad(active + 1)} <i /> {pad(N)}
          </span>
          <div className={styles.carArrows}>
            <button
              type="button"
              className={styles.carArrowBtn}
              onClick={() => step(-1)}
              aria-label="Previous service"
              data-cursor="Prev"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.carArrowBtn}
              onClick={() => step(1)}
              aria-label="Next service"
              data-cursor="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Mobile: vertical stack ---------- */}
      <div className={styles.carMobile}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>{services.eyebrow}</span>
          <SplitReveal as={desktop ? "div" : "h2"} className={styles.h2} type="words">
            {services.title}
          </SplitReveal>
          <p className={styles.lead}>{services.body}</p>
        </div>

        {items.map((s, i) => (
          <article key={s.key} className={styles.carMobRow}>
            <div className={styles.carMobCard}>
              <BrandImage page="four" id={imgId(i, s.img)} fill sizes="100vw" className="object-cover" />
            </div>
            <div className={styles.carMobText}>
              <span className={styles.carNum}>/{pad(i + 1)}</span>
              {desktop ? (
                <div className={styles.carName}>{s.name}</div>
              ) : (
                <h3 className={styles.carName}>{s.name}</h3>
              )}
              <p className={styles.carBody}>{s.body}</p>
              {/* Same per-service destination as the desktop stage above —
                  the mobile stack renders every card at once, so each row's
                  button has to carry its own. */}
              <KnowMoreLink href={s.href} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
