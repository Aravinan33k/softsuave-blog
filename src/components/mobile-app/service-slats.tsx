"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import { publicMediaUrl } from "@/lib/media-url";
import CardIconBadge from "@/components/common/card-icon-badge";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

export interface ServiceSlatsContent {
  eyebrow: string;
  title: string;
  body: string;
  /** Optional button under the slats — the section's own CTA on the live page. */
  cta?: { readonly label: string; readonly href: string };
  items: readonly {
    readonly name: string;
    readonly body: string;
    /**
     * Artwork filling the slat. Root-relative `src` (hand-placed under
     * public/images/), resolved with `publicMediaUrl`. `alt` may be empty when
     * the image is decorative — the slat names the service in text.
     */
    readonly image?: { readonly src: string; readonly alt: string };
  }[];
}

/**
 * Services as slats that open — every one on screen at once, one of them open.
 *
 * A carousel shows one service and hides six, which is the wrong trade for a
 * section whose argument is "full-spectrum": the range IS the point, so the
 * whole range stays visible. Seven slats stand side by side with their names
 * running up their spines; the open one widens to about five times its
 * neighbours and shows its artwork and its copy. Point at another and the
 * width moves across.
 *
 * Every slat's name and body is in the DOM at all times, open or not — a
 * closed slat clips its copy visually but never withholds it from a crawler
 * or a screen reader, which is the trap the tab panels on this page originally
 * fell into.
 *
 * Below 1000px the accordion is dropped entirely and the slats become ordinary
 * stacked cards with everything showing: seven columns squeezed into a phone
 * is six unreadable spines and one cramped panel.
 *
 * Accessibility: each slat's heading holds a real button carrying
 * `aria-expanded` and `aria-controls`, so the set is a keyboard-operable
 * disclosure list — tabbing through opens each in turn, which is the same
 * thing pointing at them does. The width change is a CSS transition on
 * `flex-grow`, not a tween, so nothing can strand it half-open.
 */
export default function ServiceSlats({
  content,
  id = "services",
}: {
  content: ServiceSlatsContent;
  id?: string;
}) {
  const root = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const slats = gsap.utils.toArray<HTMLElement>(`.${styles.slat}`, root.current);
      if (!slats.length) return;

      gsap.set(slats, { opacity: 0, y: 30 });
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(slats, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.07,
            // Leave no inline transform behind — the slats' own transitions
            // own everything after the entrance.
            clearProps: "transform,opacity",
          });
        },
      });
      return () => st.kill();
    },
    { scope: root },
  );

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div ref={root} className={styles.slatRow}>
        {content.items.map((item, i) => {
          const open = active === i;
          return (
            <article key={item.name} className={styles.slat} data-open={open}>
              {item.image && (
                <span className={styles.slatFigure} aria-hidden={item.image.alt === ""}>
                  <Image
                    src={publicMediaUrl(item.image.src)}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 999px) 92vw, 46vw"
                  />
                </span>
              )}

              <h3 className={styles.slatHead}>
                <button
                  type="button"
                  className={styles.slatTrigger}
                  aria-expanded={open}
                  aria-controls={`${id}-slat-${i}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  {/* An icon, not a "01"–"07" ordinal: the Sep corrections review
                      asked for icons in place of numbers across the landing pages. */}
                  <CardIconBadge title={item.name} body={item.body} size="sm" className={styles.slatIndex} />
                  <span className={styles.slatName}>{item.name}</span>
                </button>
              </h3>

              <div id={`${id}-slat-${i}`} className={styles.slatPanel}>
                <p className={styles.slatText}>{item.body}</p>
              </div>
            </article>
          );
        })}
      </div>

      {content.cta && (
        <div className={styles.slatCta}>
          <a className={styles.slatCtaLink} href={content.cta.href}>
            {content.cta.label}
          </a>
        </div>
      )}
    </section>
  );
}
