"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "@/components/landing/section-head";
import CardIconBadge from "@/components/common/card-icon-badge";
import ServiceLink, { useServiceHref } from "@/components/common/service-link";
import { SiteLink } from "@/themes/softsuave/site-link";
import { linkify, type InlineLink } from "@/components/common/linkify";
import styles from "@/components/landing/landing.module.css";

export interface ServiceBoardContent {
  eyebrow: string;
  title: string;
  body: string;
  /**
   * Internal links to weave into the services' prose, matched on their own
   * words — see `components/common/linkify`. The live page links phrases
   * inside these descriptions ("eCommerce web app", "WordPress") and those
   * were missing here (review: "give the page links for Our Services
   * section"). Each phrase is linked on its first appearance across the board.
   */
  links?: readonly InlineLink[];
  /** Optional button under the board — the section's own CTA on the live page. */
  cta?: { readonly label: string; readonly href: string };
  items: readonly {
    readonly name: string;
    /** Two or more paragraphs; they live on the stage, not on the cards. */
    readonly paragraphs: readonly string[];
    readonly image?: { readonly src: string; readonly alt: string };
    /**
     * Optional destination page. Omitted, the stage links to the page the
     * service's name matches (see `lib/home/service-href.ts`), never the page
     * it is on.
     */
    readonly href?: string;
  }[];
}

/**
 * Services as a board: pick one from the grid, read it on the stage below.
 *
 * Six services carrying two full paragraphs each is about four thousand
 * characters of body copy. Laid out as a row per service that is a three-
 * thousand-pixel wall nobody scrolls to the end of; as a card grid it is six
 * walls of grey side by side. So the copy is taken off the cards entirely:
 * the grid holds only an icon and a name, which makes the whole set
 * scannable in two rows, and the chosen service opens on one stage beneath it.
 * The section goes from roughly 3000px to under 700.
 *
 * Every service's copy is rendered, with the unchosen ones `hidden` — in the
 * HTML for a crawler, out of the layout for a reader. Hiding it from the
 * markup instead would throw away most of the page's text, which is the trap
 * the tab panels on the mobile page originally fell into.
 *
 * Picking a service slides the stage in from the side the card sits on
 * relative to the last one: choose something to the right and it enters from
 * the right. That spatial link is the whole reason the stage sits under the
 * grid rather than beside it.
 *
 * Each card and the stage lead with an icon badge picked from the service's
 * own words — they used to carry "01" / "01 / 06" ordinals, which the review
 * asked to be icons — and the stage ends in a "Learn more" link when the
 * service has a page of its own.
 *
 * Accessibility: a real `tablist`/`tab`/`tabpanel` set with roving tabindex —
 * arrows move between services, Home/End jump to the ends, and only the
 * active tab is in the tab order. The service name is the panel's `<h3>`, not
 * the card's, so the document outline keeps one heading per service exactly
 * as the live page has it.
 */
export default function ServiceBoard({
  content,
  id = "services",
}: {
  content: ServiceBoardContent;
  id?: string;
}) {
  const root = useRef<HTMLDivElement | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  /** The index the stage last showed, so a change knows which way it moved. */
  const prev = useRef(0);
  const [active, setActive] = useState(0);

  const items = content.items;
  const hrefFor = useServiceHref();
  /**
   * Which inline-link phrases have already been placed. One set for the whole
   * board, so a phrase appearing in two services links in the first only.
   */
  const usedLinks = new Set<string>();

  // Entrance: the cards deal in, then the stage arrives under them.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const el = root.current;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.sbCard}`, el);
      const stage = el.querySelector(`.${styles.sbStage}`);
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 22 });
      if (stage) gsap.set(stage, { opacity: 0, y: 28 });

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.06,
            clearProps: "transform,opacity",
          });
          if (stage) {
            gsap.to(stage, {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
              delay: 0.24,
              clearProps: "transform,opacity",
            });
          }
        },
      });
      return () => st.kill();
    },
    { scope: root },
  );

  // Change: the stage comes in from the side the new card sits on.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const dir = active >= prev.current ? 1 : -1;
      prev.current = active;

      const shown = root.current.querySelector(`.${styles.sbPanel}[data-active="true"]`);
      if (!shown) return;
      const fig = shown.querySelector(`.${styles.sbFigure}`);
      const copy = gsap.utils.toArray<HTMLElement>(`.${styles.sbCopy} > *`, shown);

      if (fig) {
        gsap.fromTo(
          fig,
          { opacity: 0, x: dir * 44 },
          { opacity: 1, x: 0, duration: 0.55, ease: "power3.out", overwrite: true, clearProps: "transform,opacity" },
        );
      }
      if (copy.length) {
        gsap.fromTo(
          copy,
          { opacity: 0, x: dir * 26 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.07,
            overwrite: true,
            clearProps: "transform,opacity",
          },
        );
      }
    },
    { scope: root, dependencies: [active] },
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div ref={root} className={styles.sbWrap}>
        <div
          className={styles.sbGrid}
          role="tablist"
          aria-label={content.title}
          onKeyDown={onKeyDown}
        >
          {items.map((item, i) => (
            <button
              key={item.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              className={styles.sbCard}
              onClick={() => setActive(i)}
            >
              <CardIconBadge title={item.name} body={item.paragraphs[0]} size="sm" />
              <span className={styles.sbCardName}>{item.name}</span>
              <span className={styles.sbCardMark} aria-hidden>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h11" />
                  <path d="M11 6l4 4-4 4" />
                </svg>
              </span>
            </button>
          ))}
        </div>

        {/*
         * Every panel is rendered; only the chosen one is laid out. The
         * unchosen ones stay in the HTML so this section's copy — most of
         * the page's text — is never withheld from a crawler.
         */}
        <div className={styles.sbStage}>
          {items.map((item, i) => {
            const href = hrefFor(item.name, item.href);
            return (
            <div
              key={item.name}
              className={styles.sbPanel}
              role="tabpanel"
              id={`${id}-panel-${i}`}
              aria-labelledby={`${id}-tab-${i}`}
              tabIndex={0}
              hidden={i !== active}
              data-active={i === active}
            >
              {item.image && (
                <div className={styles.sbFigure}>
                  <Image
                    src={publicMediaUrl(item.image.src)}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 999px) 92vw, 42vw"
                  />
                </div>
              )}

              <div className={styles.sbCopy}>
                <CardIconBadge title={item.name} body={item.paragraphs[0]} />
                <h3 className={styles.sbPanelName}>{item.name}</h3>
                {item.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)} className={styles.sbText}>
                    {linkify(p, content.links, usedLinks, styles.proseLink)}
                  </p>
                ))}
                {href && <ServiceLink href={href} label={item.name} />}
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {content.cta && (
        <div className={styles.slatCta}>
          {/* Same branch as `landing/cta-band`: an in-page target stays a plain
              <a> so ScrollProvider's Lenis handler intercepts it, while a site
              path goes through SiteLink, which picks <Link> or an anchor
              depending on whether this app serves that route yet. Every board
              but React Native's still points at `#enquiry`, so they are
              unaffected. */}
          {content.cta.href.startsWith("#") ? (
            <a className={styles.slatCtaLink} href={content.cta.href}>
              {content.cta.label}
            </a>
          ) : (
            <SiteLink className={styles.slatCtaLink} href={content.cta.href}>
              {content.cta.label}
            </SiteLink>
          )}
        </div>
      )}
    </section>
  );
}
