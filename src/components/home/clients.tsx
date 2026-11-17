"use client";

import Image from "next/image";
import { clients } from "@/lib/home/content";
import SplitReveal from "./split-reveal";
import FadeUp from "./fade-up";
import Marquee from "./marquee";
import styles from "./home.module.css";

/**
 * Client proof band — the partner statement plus the logo strip, sitting
 * directly under "Why Soft Suave" so the numbers are immediately backed by who
 * they were earned with.
 *
 * The strip is `Marquee` (the same infinite-scroll primitive as Awards and the
 * footer), not a static wrapped grid: with two dozen marks a wrap reads as a
 * dense wall, while a slow, hover-pausing carousel keeps every mark legible
 * and scales to any list length without a layout change. Reduced motion
 * renders `Marquee`'s static fallback row, so nothing here depends on motion
 * to be readable.
 *
 * Each mark renders as its real logo when `clients.logos[].src` points at a
 * file, and as a typographic wordmark until then, so the strip reads as
 * finished either way.
 */
export default function Clients({
  logos = clients.logos,
  title = clients.title,
  body = clients.body,
  loopShortRows = false,
  noFade = false,
  eyebrow = clients.eyebrow,
  badges = false,
  id = "clients",
}: {
  /** Drops the soft fade on the strip's left and right ends; logos keep their usual look. */
  noFade?: boolean;
  /** The small label above the heading; `""` drops it (a page whose live band has none). */
  eyebrow?: string;
  /**
   * Draw the marks as full-colour badges, larger — for certifications rather than client
   * logos, which the strip otherwise shows small and in grey.
   */
  badges?: boolean;
  /** The section id; give a second strip on one page its own. */
  id?: string;
  /**
   * Keep the strip scrolling when its marks are too few to overflow the row —
   * `Marquee`'s `fill` repeats them until they do. Omitted, the strip is
   * unchanged.
   */
  loopShortRows?: boolean;
  /**
   * Heading and standfirst. Default to the homepage's "Preferred AI-Enabled
   * Technology Partner…" pair, which most pages' live band repeats word for
   * word; a page whose live band has its own (the offshore page's "Our
   * Clients") passes it here.
   */
  title?: string;
  body?: string;
  /**
   * The marks to run. Defaults to the homepage's full roster.
   *
   * The hire-by-skill pages override it: their live band publishes nineteen
   * marks, and the homepage roster opens with three more (Phoenix Technologies,
   * AMD Telecom, Perkypet) that were added here from softsuave.com's /clients
   * index. Those three are not on the hire pages' own band, so rendering them
   * there would put three clients on the page that its source does not claim.
   */
  logos?: typeof clients.logos;
} = {}) {
  return (
    <section className={`${styles.section} ${styles.clients}${title || body || eyebrow ? "" : ` ${styles.clientsHeadless}`}`} id={id}>
      {(title || body || eyebrow) && (
        <div className={styles.clientsHead}>
          <div className={styles.clientsHeadMain}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            <SplitReveal as="h2" className={styles.h2} type="words">
              {title}
            </SplitReveal>
          </div>
          {/* No text, no column: an empty aside still drew its divider line. */}
          {body && (
            <FadeUp className={styles.clientsHeadAside}>
              <p className={styles.clientsBody}>{body}</p>
            </FadeUp>
          )}
        </div>
      )}

      <FadeUp className={styles.clientsRow} delay={0.08}>
        <Marquee
          speed={30}
          className={`${styles.clientsMarquee}${noFade ? ` ${styles.clientsMarqueeNoFade}` : ""}${badges ? ` ${styles.clientsMarqueeBadges}` : ""}`}
          separator={<span aria-hidden />}
          fill={loopShortRows}
        >
          {logos.map((logo) => (
            <span key={logo.name} className={styles.clientsItem}>
              {logo.src ? (
                <span className={styles.clientLogo}>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="170px"
                    className="object-contain"
                  />
                </span>
              ) : (
                <span className={styles.clientWordmark}>{logo.name}</span>
              )}
            </span>
          ))}
        </Marquee>
      </FadeUp>
    </section>
  );
}
