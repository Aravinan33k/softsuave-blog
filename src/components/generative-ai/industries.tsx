"use client";

import Image from "next/image";
import Link from "next/link";
import { industries as generativeAiIndustries } from "@/lib/home/generative-ai";
import { publicMediaUrl } from "@/lib/media-url";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** Shared by every card-grid section on the AI landing pages. */
export interface CardGridContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly key?: string;
    readonly name: string;
    readonly body: string;
    /** Decorative backdrop shown at rest with the icon and name. */
    readonly image?: string;
    /**
     * Where the card's "Know More" goes. Defaults to `#enquiry`, the hero form
     * — right for a card that describes something we would scope with you.
     * Cards that name a page we actually publish give that page's path instead,
     * which is what turns the hire-by-role specialisation grids into real
     * navigation between the nine role pages rather than nine dead ends.
     */
    readonly href?: string;
  }[];
}

/** One glyph per industry, drawn in the same stroked-line style as `Process`'s `StepIcon`. */
function IndustryIcon({ industryKey }: { industryKey?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (industryKey) {
    case "fintech":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 10L12 4L21 10" />
          <path d="M5 10V19H19V10" />
          <path d="M9.5 14H14.5" />
          <path d="M9.5 17H14.5" />
        </svg>
      );
    case "healthtech":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 20.5C12 20.5 4 15.8 4 9.9C4 7.2 6.1 5 8.7 5C10.1 5 11.3 5.7 12 6.7C12.7 5.7 13.9 5 15.3 5C17.9 5 20 7.2 20 9.9C20 15.8 12 20.5 12 20.5Z" />
          <path d="M8 11.5H10.2L11.3 9L13 14L14.1 11.5H16.2" />
        </svg>
      );
    case "edtech":
      return (
        <svg {...common} aria-hidden>
          <path d="M2 8.5L12 4L22 8.5L12 13L2 8.5Z" />
          <path d="M6 10.7V15.5C6 15.5 8.5 17.5 12 17.5C15.5 17.5 18 15.5 18 15.5V10.7" />
          <path d="M22 8.5V14.5" />
        </svg>
      );
    case "ecommerce":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 4H5L6.2 14.6C6.3 15.6 7.1 16.3 8.1 16.3H17.2C18.2 16.3 19 15.6 19.1 14.6L20 8H6" />
          <circle cx="9" cy="20" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="16.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "logistics":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 16V6H14V16" />
          <path d="M14 9.5H17.5L20 12.5V16H14" />
          <circle cx="7" cy="18" r="1.8" />
          <circle cx="17" cy="18" r="1.8" />
        </svg>
      );
    case "telecom":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3V13" />
          <path d="M7 6.5C7 6.5 5 8.3 5 11" />
          <path d="M17 6.5C17 6.5 19 8.3 19 11" />
          <path d="M9.3 9C9.3 9 8.2 9.9 8.2 11.4" />
          <path d="M14.7 9C14.7 9 15.8 9.9 15.8 11.4" />
          <path d="M9 21L12 13L15 21" />
          <path d="M10 18.3H14" />
        </svg>
      );
    case "realestate":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 20V10.5L12 4L20 10.5V20" />
          <path d="M9 20V14H15V20" />
        </svg>
      );
    case "manufacturing":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 20V11L8 14.5V11L13 14.5V9L20 13.5V20H3Z" />
          <path d="M3 20H21" />
        </svg>
      );

    /* ----------------------------------------------------------------
       Engineering disciplines. The hire-by-role pages put their
       specialisations through this same grid, and a discipline is as much
       a named thing as a sector is — without a glyph of its own every card
       in a nine-card grid would wear the identical fallback mark. Drawn in
       the same 24-square stroked style as the sectors above.
       ---------------------------------------------------------------- */
    case "code":
      return (
        <svg {...common} aria-hidden>
          <path d="M8.5 7L3.5 12L8.5 17" />
          <path d="M15.5 7L20.5 12L15.5 17" />
          <path d="M13 4.5L11 19.5" />
        </svg>
      );
    case "web":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="4.5" width="18" height="15" rx="2" />
          <path d="M3 9H21" />
          <path d="M6.5 6.7H7.5" />
          <path d="M9.5 6.7H10.5" />
        </svg>
      );
    case "mobile":
      return (
        <svg {...common} aria-hidden>
          <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
          <path d="M10.5 5.5H13.5" />
          <path d="M10.8 18.5H13.2" />
        </svg>
      );
    case "android":
      return (
        <svg {...common} aria-hidden>
          <path d="M5 12.5A7 7 0 0 1 19 12.5" />
          <path d="M5 12.5H19" />
          <path d="M7.2 8.4L6 6.6" />
          <path d="M16.8 8.4L18 6.6" />
          <path d="M6 15H18V19A1.5 1.5 0 0 1 16.5 20.5H7.5A1.5 1.5 0 0 1 6 19V15Z" />
        </svg>
      );
    case "ios":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 7.5C10.6 6.2 8.2 6.3 7 7.9C5.4 10 6.2 14.2 8.1 17.1C8.9 18.3 10 19.3 11.1 18.7C11.7 18.4 12.3 18.4 12.9 18.7C14 19.3 15.1 18.3 15.9 17.1C17.8 14.2 18.6 10 17 7.9C15.8 6.3 13.4 6.2 12 7.5Z" />
          <path d="M12 7.5C12 5.9 13.1 4.3 14.7 4" />
        </svg>
      );
    case "frontend":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="4.5" width="18" height="15" rx="2" />
          <path d="M9.5 4.5V19.5" />
          <path d="M12.5 9H18" />
          <path d="M12.5 12.5H18" />
          <path d="M12.5 16H15.5" />
        </svg>
      );
    case "backend":
      return (
        <svg {...common} aria-hidden>
          <rect x="3.5" y="4" width="17" height="5.5" rx="1.6" />
          <rect x="3.5" y="14.5" width="17" height="5.5" rx="1.6" />
          <path d="M7 6.7H7.8" />
          <path d="M7 17.2H7.8" />
          <path d="M12 9.5V14.5" />
        </svg>
      );
    case "fullstack":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3L21 7.5L12 12L3 7.5L12 3Z" />
          <path d="M3 12L12 16.5L21 12" />
          <path d="M3 16.5L12 21L21 16.5" />
        </svg>
      );
    case "devops":
      return (
        <svg {...common} aria-hidden>
          <path d="M7.5 8.5A3.5 3.5 0 1 0 7.5 15.5C10.5 15.5 13.5 8.5 16.5 8.5A3.5 3.5 0 1 1 16.5 15.5C13.5 15.5 10.5 8.5 7.5 8.5Z" />
        </svg>
      );
    case "ai":
      return (
        <svg {...common} aria-hidden>
          <rect x="7" y="7" width="10" height="10" rx="2.5" />
          <path d="M10 3.5V7" />
          <path d="M14 3.5V7" />
          <path d="M10 17V20.5" />
          <path d="M14 17V20.5" />
          <path d="M3.5 10H7" />
          <path d="M3.5 14H7" />
          <path d="M17 10H20.5" />
          <path d="M17 14H20.5" />
        </svg>
      );
    case "qa":
      return (
        <svg {...common} aria-hidden>
          <path d="M5.5 4.5H18.5V21L12 17.8L5.5 21V4.5Z" />
          <path d="M9 10.2L11.3 12.5L15.4 8.4" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common} aria-hidden>
          <path d="M7 17.5A3.8 3.8 0 0 1 7.3 10A5 5 0 0 1 17 10.4A3.6 3.6 0 0 1 16.8 17.5H7Z" />
        </svg>
      );
    case "data":
      return (
        <svg {...common} aria-hidden>
          <ellipse cx="12" cy="6.5" rx="7" ry="3" />
          <path d="M5 6.5V17.5C5 19.2 8.1 20.5 12 20.5C15.9 20.5 19 19.2 19 17.5V6.5" />
          <path d="M5 12C5 13.7 8.1 15 12 15C15.9 15 19 13.7 19 12" />
        </svg>
      );
    case "api":
      return (
        <svg {...common} aria-hidden>
          <path d="M9 5.5L4.5 12L9 18.5" />
          <path d="M15 5.5L19.5 12L15 18.5" />
          <path d="M13.2 7.5L10.8 16.5" />
        </svg>
      );
    case "security":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3.2L19.5 6V12C19.5 16.3 16.3 19.6 12 20.8C7.7 19.6 4.5 16.3 4.5 12V6L12 3.2Z" />
          <path d="M12 9.8V13.4" />
          <circle cx="12" cy="15.9" r="0.85" fill="currentColor" stroke="none" />
        </svg>
      );
    case "automation":
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="3.1" />
          <path d="M12 3.5V6" />
          <path d="M12 18V20.5" />
          <path d="M3.5 12H6" />
          <path d="M18 12H20.5" />
          <path d="M6 6L7.8 7.8" />
          <path d="M16.2 16.2L18 18" />
          <path d="M18 6L16.2 7.8" />
          <path d="M7.8 16.2L6 18" />
        </svg>
      );
    case "performance":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 17.5A8.6 8.6 0 1 1 20 17.5" />
          <path d="M12 17L15.8 10.5" />
          <circle cx="12" cy="17.5" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "design":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 20L7.5 19L20 6.5A2.1 2.1 0 0 0 17 3.5L4.5 16L4 20Z" />
          <path d="M15.8 5.4L18.1 7.7" />
        </svg>
      );
    case "integration":
      return (
        <svg {...common} aria-hidden>
          <circle cx="6.5" cy="6.5" r="2.6" />
          <circle cx="17.5" cy="17.5" r="2.6" />
          <path d="M6.5 9.1V15A2.5 2.5 0 0 0 9 17.5H14.9" />
        </svg>
      );
    case "team":
      return (
        <svg {...common} aria-hidden>
          <circle cx="9" cy="8.5" r="3" />
          <path d="M3.5 19.5C3.5 16.5 6 14.5 9 14.5C12 14.5 14.5 16.5 14.5 19.5" />
          <path d="M16 6.2A3 3 0 0 1 16 14" />
          <path d="M17.2 15.2C19.1 16 20.5 17.6 20.5 19.5" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 8V12L14.5 14.5" />
        </svg>
      );
  }
}

/**
 * The card's "Know More".
 *
 * An in-page `#anchor` has to stay a plain `<a>` so the Lenis handler in
 * `ScrollProvider` intercepts it; a real route goes through `next/link` for
 * client-side navigation. The accessible name carries the card's own title,
 * because a grid of nine identically-labelled "Know More" links tells a screen
 * reader nothing about where any of them lead.
 */
function CardLink({ href, label }: { href: string; label: string }) {
  const inner = (
    <>
      Know More
      <span className={styles.srOnly}> about {label}</span>
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden>
        <path
          d="M5 12H19M19 12L13 6M19 12L13 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  return href.startsWith("/") ? (
    <Link className={styles.indCardLink} href={href}>
      {inner}
    </Link>
  ) : (
    <a className={styles.indCardLink} href={href}>
      {inner}
    </a>
  );
}

/**
 * A reveal-on-hover image grid — the sectors this page builds for.
 *
 * Matches the production softsuave.com Industries section: each card shows
 * only its photographic backdrop, an icon, and the industry name at rest.
 * Hovering or focusing cross-fades in `.indCardOverlay`, an inverted
 * (dark-on-photo) rectangle sized to the card's own bounds carrying the name
 * again, the description, and a "Know More" link — not a strip that grows
 * from the bottom edge, which could out-grow a short 4-up card and overflow
 * it. `:focus-within` drives the same reveal as `:hover` so the link is
 * reachable without a pointer, and both the rest face and the overlay stay
 * mounted throughout so the transition is a plain opacity/transform tween.
 */
export default function Industries({
  content = generativeAiIndustries,
  id = "industries",
  variant = "photo",
}: {
  content?: CardGridContent;
  id?: string;
  /**
   * `photo` (default) is the reveal-on-hover picture card above. `compact` is
   * the text card: content-height, bordered, everything legible at rest. Use it
   * when the items have no artwork — in the picture card an imageless item
   * leaves two-thirds of a square empty and hides its description behind a
   * hover the reader has no cue to try.
   */
  variant?: "photo" | "compact";
} = {}) {
  if (variant === "compact") {
    return (
      <section className={styles.sectionShell} id={id}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

        <FadeUp>
          <div className={styles.indGridCompact}>
            {content.items.map((item, i) => (
              <article key={item.name} className={styles.compactCard}>
                <span className={styles.compactIndex} aria-hidden>
                  {pad(i + 1)}
                </span>
                <span className={styles.compactIcon} aria-hidden>
                  <IndustryIcon industryKey={item.key} />
                </span>
                <h3 className={styles.compactName}>{item.name}</h3>
                <p className={styles.compactBody}>{item.body}</p>
                {/* Only where the card names a page of ours. On a text card
                    that already says everything, a link back to the enquiry
                    form is noise — the section's own CTAs cover that. */}
                {item.href && (
                  <Link className={styles.compactLink} href={item.href}>
                    Know More
                    <span className={styles.srOnly}> about {item.name}</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
                      <path
                        d="M5 12H19M19 12L13 6M19 12L13 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                )}
              </article>
            ))}
          </div>
        </FadeUp>
      </section>
    );
  }

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        <div className={styles.indGrid}>
          {content.items.map((item, i) => (
            <article key={item.name} className={styles.indCard}>
              {item.image && (
                <Image
                  src={publicMediaUrl(item.image)}
                  alt=""
                  fill
                  sizes="(max-width: 699px) 92vw, (max-width: 999px) 46vw, 23vw"
                  className={styles.indCardImg}
                />
              )}
              <span className={styles.indCardIndex} aria-hidden>
                {pad(i + 1)}
              </span>
              <div className={styles.indCardScrim} aria-hidden />

              <div className={styles.indCardFace}>
                <span className={styles.indCardIcon} aria-hidden>
                  <IndustryIcon industryKey={item.key} />
                </span>
                <h3 className={styles.indCardName}>{item.name}</h3>
              </div>

              {/* The hover/focus reveal: a full inverted rectangle over the photo
                  (not a strip growing from the bottom), so it's bounded by the
                  card's own box at every grid size instead of risking overflow
                  when the description runs long on a short 4-up card. */}
              <div className={styles.indCardOverlay}>
                <span className={styles.indCardIcon} aria-hidden>
                  <IndustryIcon industryKey={item.key} />
                </span>
                <h3 className={styles.indCardName}>{item.name}</h3>
                <p className={styles.indCardBody}>{item.body}</p>
                <CardLink href={item.href ?? "#enquiry"} label={item.name} />
              </div>
            </article>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
