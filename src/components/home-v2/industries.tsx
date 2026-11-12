"use client";

import { useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  GraduationCap,
  HeartPulse,
  Landmark,
  RadioTower,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { industries } from "@/lib/home/content";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SplitReveal from "@/components/home/split-reveal";
import BrandImage from "@/components/home/brand-image";
import { useNearViewport } from "@/components/home/use-deferred-media";
import { SiteLink } from "@/themes/softsuave/site-link";
import home from "@/components/home/home.module.css";
import styles from "./home-v2.module.css";

/** One glyph per sector, by its `key` in content.ts. */
const ICONS: Record<string, LucideIcon> = {
  fintech: Landmark,
  healthtech: HeartPulse,
  edtech: GraduationCap,
  ecommerce: ShoppingCart,
  logistics: Truck,
  telecom: RadioTower,
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Homepage Industries (`/`): expanding image panels in place of the fan.
 *
 * Laptops and up: the six sectors stand side by side as tall photo panels; the
 * open one widens to show its description and link, the rest narrow to an
 * icon and a name running up the panel. Hover or keyboard focus opens a
 * panel, and the open panel is one big link to its sector page.
 *
 * Phones and portrait tablets: the same panels stack as an accordion — a tap
 * on a sector's row opens it onto its photograph, description and link.
 *
 * Each sector's name is an H3 wrapping the button that opens it (the
 * accordion pattern), so the outline and the keyboard path match the homepage.
 */
export default function Industries() {
  const root = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const total = pad(industries.items.length);
  // The six photographs mount as the section nears the viewport. On a phone
  // it sits just under the hero, inside the browser's lazy-load distance, so
  // all six (~180 KB) loaded with the first screen and competed with what it
  // needs (PageSpeed, 15 Oct). Until then each panel shows its dark ground.
  const near = useNearViewport(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(`.${styles.panel}`, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: `.${styles.panels}`, start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`${home.section} ${styles.ind}`} id="industries">
      <div className={styles.head}>
        <div>
          <span className={home.eyebrow}>{industries.eyebrow}</span>
          <SplitReveal as="h2" className={home.h2} type="words">
            {industries.title}
          </SplitReveal>
        </div>
        <p className={home.lead}>{industries.body}</p>
      </div>

      <div className={styles.panels}>
        {industries.items.map((it, i) => {
          const Icon = ICONS[it.key] ?? Landmark;
          const open = i === active;
          const bodyId = `industry-${it.key}`;
          return (
            <article
              key={it.key}
              className={styles.panel}
              data-active={open}
              onMouseEnter={() => setActive(i)}
            >
              <div className={styles.panelImg}>
                {near && (
                  <BrandImage
                    page="four"
                    id={it.img}
                    fill
                    sizes="(min-width: 1000px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className={styles.panelShade} aria-hidden />

              {/* The open panel, laptops up: the whole panel opens the sector
                  page. A duplicate of the CTA, so it stays out of the tab
                  order and the accessibility tree. */}
              {open && (
                <SiteLink href={it.href} className={styles.panelHit} tabIndex={-1} aria-hidden="true" />
              )}

              <h3 className={styles.panelHeading}>
                <button
                  type="button"
                  className={styles.panelToggle}
                  aria-expanded={open}
                  aria-controls={bodyId}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className={styles.panelIcon} aria-hidden>
                    <Icon strokeWidth={1.7} />
                  </span>
                  <span className={styles.panelLabel}>{it.name}</span>
                  <span className={styles.panelIndex} aria-hidden>
                    {pad(i + 1)}
                  </span>
                  <ChevronDown className={styles.panelChevron} aria-hidden />
                </button>
              </h3>

              <div className={styles.panelCollapse}>
                <div className={styles.panelCollapseInner}>
                  <div id={bodyId} className={styles.panelBody} aria-hidden={!open}>
                    <div className={styles.panelBodyTop} aria-hidden>
                      <span className={styles.panelIcon}>
                        <Icon strokeWidth={1.7} />
                      </span>
                      <span className={styles.panelIndex}>
                        {pad(i + 1)} / {total}
                      </span>
                    </div>
                    <p className={styles.panelTitle} aria-hidden>
                      {it.name}
                    </p>
                    <p className={styles.panelText}>{it.body}</p>
                    <SiteLink href={it.href} className={styles.panelCta} tabIndex={open ? 0 : -1}>
                      Explore {it.name}
                      <ArrowUpRight strokeWidth={2.2} aria-hidden />
                    </SiteLink>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
