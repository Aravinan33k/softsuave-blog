"use client";

import Image from "next/image";
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
}: {
  content?: CardGridContent;
  id?: string;
} = {}) {
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
                <a className={styles.indCardLink} href="#enquiry">
                  Know More
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
                </a>
              </div>
            </article>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
