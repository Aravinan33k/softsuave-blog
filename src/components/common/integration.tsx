"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import TechLogo from "@/components/home/tech-logo";
import { SiteLink } from "@/themes/softsuave/site-link";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

export interface IntegrationContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly name: string;
    readonly body: string;
    /**
     * The technologies this block is built on, shown as a grid of brand
     * marks under its paragraph. `href` is a Soft Suave path;
     * `SiteLink` decides per link whether this app serves it yet or the
     * live site still does, so a tool whose page ships later starts routing
     * locally without an edit here. Omit `href` for a tool the site has
     * no page for — it renders as a plain tile, which is what the live page
     * does for those.
     */
    readonly tools?: readonly { readonly name: string; readonly href?: string }[];
  }[];
}

/**
 * Integration and deployment options — plainer panels than the indexed
 * `.card` grid, so a short run of three sits next to a card grid without
 * the two reading as the same section twice. Each panel is a mono label
 * over a paragraph, using the `.integration*` classes this stylesheet
 * already carries.
 *
 * A block may also carry the technologies it is built on. Those render as a
 * two-up grid of brand marks under the paragraph, each linking to that
 * technology's own page where the site has one.
 *
 * Entrance is a staggered fade and lift, played once by a bare trigger so a
 * `ScrollTrigger.refresh()` landing mid-play cannot strand it (see
 * why-us.tsx).
 */
export default function Integration({
  content,
  id = "integration",
}: {
  content: IntegrationContent;
  id?: string;
}) {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.integrationCard}`, root.current);
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 26 });
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.12,
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

      <div ref={root} className={styles.integrationGrid}>
        {content.items.map((item) => (
          <article key={item.name} className={styles.integrationCard}>
            <h3 className={styles.integrationLabel}>{item.name}</h3>
            <p className={styles.integrationBody}>{item.body}</p>

            {item.tools && item.tools.length > 0 && (
              <ul className={styles.integrationTools}>
                {item.tools.map((tool) => {
                  const face = (
                    <>
                      <span className={styles.integrationToolMark} aria-hidden>
                        <TechLogo name={tool.name} />
                      </span>
                      {tool.name}
                    </>
                  );
                  return (
                    <li key={tool.name} className={styles.integrationTool}>
                      {tool.href ? (
                        <SiteLink href={tool.href} className={styles.integrationToolLink}>
                          {face}
                        </SiteLink>
                      ) : (
                        <span className={styles.integrationToolLink} data-static>
                          {face}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
