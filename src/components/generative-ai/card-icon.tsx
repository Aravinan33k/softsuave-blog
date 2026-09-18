import TechLogo from "@/components/home/tech-logo";

/**
 * The glyph a card grid puts in its top-left badge.
 *
 * Two families, because the cards are two kinds of thing and one glyph style
 * cannot serve both honestly:
 *
 * - **Brand marks** for the cards that name a technology we have a real logo
 *   for. "Hire Java Developers" gets Java's cup; a generic `</>` told the
 *   reader nothing that the card's own title did not. These come from
 *   `components/home/tech-logo`, which already holds 188 of them, so this file
 *   routes to it rather than redrawing marks at a second, worse quality.
 * - **Drawn glyphs** for everything else — the industries, the disciplines, and
 *   the trust and process cards (ISO, NDA, the 40-hour trial, time zones) that
 *   no logo exists for. Stroked line art, 24×24, 1.6 weight, round caps, the
 *   same construction as `Process`'s `StepIcon`.
 *
 * The split is visible in the badge: a brand mark is full-colour and keeps its
 * own palette, so `.indBoldIcon[data-brand="true"]` drops the accent tint that
 * would fight it. Ask `isBrandIcon` for that, next to rendering `CardIcon`.
 *
 * **Why this file exists at all.** The vocabulary used to be a `switch` private
 * to `industries.tsx`, and 109 of the 129 cards across the thirteen hire-by-role
 * pages passed a key it did not have — `java`, `react`, `iso`, `nda`, `trial` —
 * so every one of them fell through to `default` and rendered the same clock.
 * On eight of those pages every card in the grid was that clock. Nothing caught
 * it: an unknown key is a valid string and the fallback is a valid glyph. The
 * vocabulary is a module now so `CARD_ICON_KEYS` can be asserted against the
 * content, which is what `hire-roles.test.ts` does.
 */

/**
 * Keys that resolve to a real brand mark in `TechLogo`.
 *
 * The key is passed through verbatim: `TechLogo` lowercases and strips
 * non-alphanumerics, so `react-native` finds `reactnative` on its own. Every
 * entry here is asserted to resolve by the test beside the hire-role content —
 * adding one that `TechLogo` does not carry fails there rather than silently
 * rendering its fallback.
 */
const BRAND_KEYS: ReadonlySet<string> = new Set([
  "java",
  "dotnet",
  "php",
  "angular",
  "node",
  "react",
  "django",
  "python",
  "rails",
  "flutter",
  "react-native",
  "ionic",
  "kotlin",
  "swift",
  "xamarin",
  "vue",
  "nextjs",
  "javascript",
  "typescript",
]);

/** Whether this key renders a full-colour brand mark rather than a drawn glyph. */
export function isBrandIcon(key?: string): boolean {
  return key !== undefined && BRAND_KEYS.has(key);
}

/** One glyph per card key, drawn in the same stroked-line style as `Process`'s `StepIcon`. */
function DrawnGlyph({ iconKey }: { iconKey?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (iconKey) {
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

    /* ---- engagement, hiring and commercial terms ---- */
    case "models":
      // Three sliders: the engagement model is the thing you set, not a fixed offer.
      return (
        <svg {...common} aria-hidden>
          <path d="M3.5 7H20.5" />
          <path d="M3.5 12H20.5" />
          <path d="M3.5 17H20.5" />
          <circle cx="8.5" cy="7" r="2.1" fill="var(--surface)" />
          <circle cx="15" cy="12" r="2.1" fill="var(--surface)" />
          <circle cx="7" cy="17" r="2.1" fill="var(--surface)" />
        </svg>
      );
    case "hiring":
      // Briefcase with a plus — adding a person to the engagement.
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="7.5" width="18" height="12" rx="2" />
          <path d="M9 7.5V5.8A1.6 1.6 0 0 1 10.6 4.2H13.4A1.6 1.6 0 0 1 15 5.8V7.5" />
          <path d="M12 11.3V15.7" />
          <path d="M9.8 13.5H14.2" />
        </svg>
      );
    case "rates":
      // Price tag: the card is about what it costs per hour.
      return (
        <svg {...common} aria-hidden>
          <path d="M11.3 3.5H19.2A1.3 1.3 0 0 1 20.5 4.8V12.7L11.6 21.6A1.4 1.4 0 0 1 9.6 21.6L2.9 14.9A1.4 1.4 0 0 1 2.9 12.9L11.3 3.5Z" />
          <circle cx="16.6" cy="7.4" r="1.5" />
        </svg>
      );
    case "quote":
      // A figure quoted back to you, in a bubble — not another sheet of paper.
      return (
        <svg {...common} aria-hidden>
          <path d="M20.5 15.2A2.3 2.3 0 0 1 18.2 17.5H8.5L4 21V6.3A2.3 2.3 0 0 1 6.3 4H18.2A2.3 2.3 0 0 1 20.5 6.3V15.2Z" />
          <path d="M12.3 8.2V13.3" />
          <path d="M13.9 9.4H11.5A1.3 1.3 0 0 0 11.5 12H13.1A1.3 1.3 0 0 1 13.1 14.6H10.6" />
        </svg>
      );

    /* ---- proof, assurance and governance ---- */
    case "experience":
      // Award medal with a star: years behind the work.
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="8.8" r="5.3" />
          <path d="M12 6.1L13.05 8.25L15.4 8.6L13.7 10.25L14.1 12.6L12 11.5L9.9 12.6L10.3 10.25L8.6 8.6L10.95 8.25Z" />
          <path d="M8.5 13.3L7.3 21.2L12 19L16.7 21.2L15.5 13.3" />
        </svg>
      );
    case "specialists":
      // Three figures: a bench, not a pair.
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="7.4" r="2.7" />
          <circle cx="5.6" cy="9.2" r="2.1" />
          <circle cx="18.4" cy="9.2" r="2.1" />
          <path d="M7.4 19.3C7.4 16.2 9.5 13.9 12 13.9C14.5 13.9 16.6 16.2 16.6 19.3" />
          <path d="M2.3 18.1C2.3 15.7 3.8 14 5.8 14" />
          <path d="M18.2 14C20.2 14 21.7 15.7 21.7 18.1" />
        </svg>
      );
    case "trial":
      // Stopwatch with a tick: a timed evaluation you can walk away from.
      // Deliberately not the bare clock — that was the old fallback glyph.
      return (
        <svg {...common} aria-hidden>
          <path d="M9.6 2.6H14.4" />
          <path d="M12 2.6V5.2" />
          <path d="M19 6.6L20.4 5.2" />
          <circle cx="12" cy="13.4" r="7.6" />
          <path d="M8.9 13.6L11.1 15.8L15.3 11.2" />
        </svg>
      );
    case "iso":
      // Certificate with a wax seal — the audited kind of assurance, distinct
      // from `qa`'s shield-and-tick and `security`'s shield.
      return (
        <svg {...common} aria-hidden>
          <path d="M19 12.4V4.4A1.5 1.5 0 0 0 17.5 2.9H6.5A1.5 1.5 0 0 0 5 4.4V19.6A1.5 1.5 0 0 0 6.5 21.1H11" />
          <path d="M8.2 7.1H15.8" />
          <path d="M8.2 10.6H13.4" />
          <circle cx="17.1" cy="16.6" r="3.4" />
          <path d="M15.2 19.5L14.6 22.4L17.1 21.2L19.6 22.4L19 19.5" />
        </svg>
      );
    case "vetted":
      // A person carrying a tick — screened, rather than a shield of security.
      return (
        <svg {...common} aria-hidden>
          <circle cx="10.2" cy="8" r="3.2" />
          <path d="M3.8 19.8C3.8 16.2 6.6 13.6 10.2 13.6C11.1 13.6 11.9 13.7 12.7 14" />
          <circle cx="17.4" cy="17.2" r="4.1" />
          <path d="M15.6 17.3L16.9 18.6L19.2 15.9" />
        </svg>
      );
    case "standards":
      // Clipboard of ticked items: the delivery standard as a checklist.
      return (
        <svg {...common} aria-hidden>
          <path d="M8.6 4.2H6.4A1.5 1.5 0 0 0 4.9 5.7V19.8A1.5 1.5 0 0 0 6.4 21.3H17.6A1.5 1.5 0 0 0 19.1 19.8V5.7A1.5 1.5 0 0 0 17.6 4.2H15.4" />
          <rect x="8.6" y="2.6" width="6.8" height="3.2" rx="1.1" />
          <path d="M8.3 11.4L9.5 12.6L11.8 10.3" />
          <path d="M8.3 16.4L9.5 17.6L11.8 15.3" />
          <path d="M13.8 11.6H16.4" />
          <path d="M13.8 16.6H16.4" />
        </svg>
      );
    case "nda":
      // Document under a padlock: the confidentiality card, not the contract one.
      return (
        <svg {...common} aria-hidden>
          <path d="M18.6 10.4V5.1L14.4 2.7H6.9A1.5 1.5 0 0 0 5.4 4.2V19.8A1.5 1.5 0 0 0 6.9 21.3H10.4" />
          <path d="M14.2 2.8V5.3A1.2 1.2 0 0 0 15.4 6.5H18.4" />
          <rect x="13.2" y="15.4" width="8" height="5.9" rx="1.3" />
          <path d="M15 15.4V13.9A2.2 2.2 0 0 1 19.4 13.9V15.4" />
        </svg>
      );
    case "contracts":
      // Document being signed: SLAs and defined terms, distinct from the NDA lock.
      return (
        <svg {...common} aria-hidden>
          <path d="M18.6 9.9V5.1L14.4 2.7H6.9A1.5 1.5 0 0 0 5.4 4.2V19.8A1.5 1.5 0 0 0 6.9 21.3H11.1" />
          <path d="M14.2 2.8V5.3A1.2 1.2 0 0 0 15.4 6.5H18.4" />
          <path d="M8.6 9.4H12.8" />
          <path d="M8.6 12.9H11.4" />
          <path d="M13.4 20.1C15 17.2 16.2 15.8 17 15.8C18.2 15.8 17.2 19.4 18.3 19.4C19 19.4 19.5 18.6 20.6 16.9" />
        </svg>
      );
    case "accountability":
      // Target with the arrow in it: someone owns the outcome.
      return (
        <svg {...common} aria-hidden>
          <circle cx="11.4" cy="12.6" r="8.1" />
          <circle cx="11.4" cy="12.6" r="4" />
          <circle cx="11.4" cy="12.6" r="0.95" fill="currentColor" stroke="none" />
          <path d="M14.3 9.7L20.4 3.6" />
          <path d="M17.6 3.3L20.7 3.3L20.7 6.4" />
        </svg>
      );

    /* ---- people, working relationship and location ---- */
    case "talent":
      // Senior person: a figure with a star, one rank above `team`.
      return (
        <svg {...common} aria-hidden>
          <circle cx="10.4" cy="7.8" r="3.3" />
          <path d="M3.9 19.9C3.9 16.2 6.8 13.5 10.4 13.5C12.1 13.5 13.6 14.1 14.8 15.1" />
          <path d="M18 12.6L19.05 14.75L21.4 15.1L19.7 16.75L20.1 19.1L18 18L15.9 19.1L16.3 16.75L14.6 15.1L16.95 14.75Z" />
        </svg>
      );
    case "manager":
      // A figure with a headset: the dedicated point of contact.
      return (
        <svg {...common} aria-hidden>
          <path d="M5.9 12.4V11.2A6.1 6.1 0 0 1 18.1 11.2V12.4" />
          <rect x="3.4" y="12.2" width="3.6" height="5.2" rx="1.5" />
          <rect x="17" y="12.2" width="3.6" height="5.2" rx="1.5" />
          <path d="M18.8 17.4V18.4A2.2 2.2 0 0 1 16.6 20.6H13.3" />
          <circle cx="11.7" cy="20.6" r="1.4" />
        </svg>
      );
    case "collaboration":
      // A handshake: working directly with the developer.
      return (
        <svg {...common} aria-hidden>
          <path d="M2.6 12.6L6.2 9.3A2 2 0 0 1 8.9 9.3L11.4 11.6" />
          <path d="M21.4 12.6L17.8 9.3A2 2 0 0 0 15.1 9.3L10.9 13.2" />
          <path d="M11.4 11.6L13.9 13.9" />
          <path d="M10.2 14.6L12.4 16.6" />
          <path d="M8.9 17.3L10.4 18.7" />
          <path d="M2.6 12.6L5.4 15.2" />
          <path d="M21.4 12.6L18.6 15.2" />
        </svg>
      );
    case "communication":
      // Two bubbles in exchange — the gap the card is about closing.
      return (
        <svg {...common} aria-hidden>
          <path d="M14.6 12.7A1.9 1.9 0 0 1 12.7 14.6H7.4L3.6 17.4V5.6A1.9 1.9 0 0 1 5.5 3.7H12.7A1.9 1.9 0 0 1 14.6 5.6V12.7Z" />
          <path d="M17.7 8.2H18.5A1.9 1.9 0 0 1 20.4 10.1V20.3L17.4 18.1H12.3A1.9 1.9 0 0 1 10.4 16.2V15.6" />
        </svg>
      );
    case "retention":
      // A figure held inside a cycle: the developer stays on the team.
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="11.4" r="2.8" />
          <path d="M7.7 18.2C7.7 15.4 9.6 13.6 12 13.6C14.4 13.6 16.3 15.4 16.3 18.2" />
          <path d="M20.6 8.4A9.2 9.2 0 0 0 4.6 6.6" />
          <path d="M3.4 15.6A9.2 9.2 0 0 0 19.4 17.4" />
          <path d="M4.1 3.2L4.4 6.9L8.1 6.5" />
          <path d="M19.9 20.8L19.6 17.1L15.9 17.5" />
        </svg>
      );
    case "skills":
      // Rising skill bars with a tick: verification, not a report.
      return (
        <svg {...common} aria-hidden>
          <path d="M4.2 19.4V14.2" />
          <path d="M9.4 19.4V10.3" />
          <path d="M14.6 19.4V6.4" />
          <path d="M2.8 21.4H21.2" />
          <circle cx="18.6" cy="8.4" r="3.6" />
          <path d="M16.9 8.5L18.1 9.7L20.3 7.2" />
        </svg>
      );
    case "evaluation":
      // A person under the lens: you assess the developer before committing.
      return (
        <svg {...common} aria-hidden>
          <circle cx="10.6" cy="10.6" r="7.1" />
          <path d="M15.8 15.8L21 21" />
          <circle cx="10.6" cy="8.9" r="2.1" />
          <path d="M7.1 14.6C7.1 12.7 8.7 11.4 10.6 11.4C12.5 11.4 14.1 12.7 14.1 14.6" />
        </svg>
      );
    case "timezone":
    case "timezones":
      // Globe with the hours marked: the overlap question, not plain reach.
      return (
        <svg {...common} aria-hidden>
          <path d="M20.9 10.6A9.1 9.1 0 1 0 12.6 20.9" />
          <path d="M3.4 9.4H19.6" />
          <path d="M4.6 15.4H12.1" />
          <path d="M11.6 2.9C9 6.3 8.6 12.8 10.4 17.2" />
          <path d="M13.4 2.9C14.8 4.7 15.6 7.1 15.8 9.5" />
          <circle cx="17.4" cy="17.4" r="4.2" />
          <path d="M17.4 15.3V17.4L18.9 18.6" />
        </svg>
      );
    case "global":
    case "delivery":
      // Globe inside a delivery orbit: reach, without the clock the zones carry.
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="8.6" />
          <path d="M3.4 12H20.6" />
          <path d="M12 3.4C14.4 6.1 15.6 9 15.6 12C15.6 15 14.4 17.9 12 20.6C9.6 17.9 8.4 15 8.4 12C8.4 9 9.6 6.1 12 3.4Z" />
          <path d="M5.4 7.2C7.2 8.4 9.5 9.1 12 9.1C14.5 9.1 16.8 8.4 18.6 7.2" />
        </svg>
      );

    /* ---- reporting ---- */
    case "reporting":
      // A document carrying a chart: the daily report, not a bare bar chart.
      return (
        <svg {...common} aria-hidden>
          <path d="M18.6 8.9V5.1L14.4 2.7H6.9A1.5 1.5 0 0 0 5.4 4.2V19.8A1.5 1.5 0 0 0 6.9 21.3H17.1A1.5 1.5 0 0 0 18.6 19.8V8.9Z" />
          <path d="M14.2 2.8V5.3A1.2 1.2 0 0 0 15.4 6.5H18.4" />
          <path d="M9 17.4V13.6" />
          <path d="M12 17.4V10.6" />
          <path d="M15 17.4V15.1" />
        </svg>
      );

    /* ---- technologies with no brand mark in `TechLogo` ----
       Category-true line glyphs rather than hand-drawn imitations of a logo:
       a poor copy of a brand mark is worse than an honest generic one, and
       each of these still reads as a different thing from its neighbours. */
    case "laravel":
      // The framework's angular V monogram, reduced to two chevrons.
      return (
        <svg {...common} aria-hidden>
          <path d="M2.8 7.4L7.3 15.2L11.8 7.4" />
          <path d="M11.8 7.4L16.3 15.2L20.8 7.4" />
          <path d="M7.3 15.2L9.6 19.2H14L16.3 15.2" />
        </svg>
      );
    case "csharp":
      // A C arc beside the sharp — the language's name, drawn.
      return (
        <svg {...common} aria-hidden>
          <path d="M11.3 8.2A5 5 0 1 0 11.3 15.8" />
          <path d="M16.1 7.4L15.1 16.6" />
          <path d="M19.4 7.4L18.4 16.6" />
          <path d="M14.2 10.4H20.4" />
          <path d="M13.9 13.6H20.1" />
        </svg>
      );
    case "go":
      // A chevron under speed lines: the language's whole pitch is throughput.
      return (
        <svg {...common} aria-hidden>
          <path d="M2.6 8.6H8.2" />
          <path d="M1.9 12H6.6" />
          <path d="M2.6 15.4H8.2" />
          <path d="M11.4 6.6L16.9 12L11.4 17.4" />
          <circle cx="19.8" cy="12" r="1.5" />
        </svg>
      );
    case "blockchain":
      // Three linked blocks: the chain, not a generic network.
      return (
        <svg {...common} aria-hidden>
          <rect x="2.6" y="9.2" width="5.6" height="5.6" rx="1.3" />
          <rect x="15.8" y="9.2" width="5.6" height="5.6" rx="1.3" />
          <rect x="9.2" y="2.6" width="5.6" height="5.6" rx="1.3" />
          <rect x="9.2" y="15.8" width="5.6" height="5.6" rx="1.3" />
          <path d="M8.2 12H9.2" />
          <path d="M14.8 12H15.8" />
          <path d="M12 8.2V9.2" />
          <path d="M12 14.8V15.8" />
        </svg>
      );
    case "game":
      // Gamepad.
      return (
        <svg {...common} aria-hidden>
          <path d="M7.4 7.4H16.6A5.4 5.4 0 0 1 22 12.8V14.2A2.9 2.9 0 0 1 16.9 16.1L15.4 14.4H8.6L7.1 16.1A2.9 2.9 0 0 1 2 14.2V12.8A5.4 5.4 0 0 1 7.4 7.4Z" />
          <path d="M7.4 10.6V12.6" />
          <path d="M6.4 11.6H8.4" />
          <circle cx="16.1" cy="11" r="0.95" fill="currentColor" stroke="none" />
          <circle cx="18.1" cy="12.8" r="0.95" fill="currentColor" stroke="none" />
        </svg>
      );
    case "saas":
      // Cloud on a renewing cycle: software delivered as a subscription.
      return (
        <svg {...common} aria-hidden>
          <path d="M7.2 14.6A3.4 3.4 0 0 1 7.5 7.9A4.5 4.5 0 0 1 16.2 8.3A3.2 3.2 0 0 1 16 14.6H7.2Z" />
          <path d="M6.4 18.6A6.6 6.6 0 0 0 17.6 20" />
          <path d="M18.2 16.4L17.8 20.2L14.2 19.6" />
        </svg>
      );
    case "mern":
      // A four-layer stack with a round core — the React end of the pair.
      return (
        <svg {...common} aria-hidden>
          <path d="M12 2.8L21 7L12 11.2L3 7L12 2.8Z" />
          <path d="M3 12L12 16.2L21 12" />
          <path d="M3 16.6L12 20.8L21 16.6" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "mean":
      // The same stack with an angular core — the Angular end of the pair.
      return (
        <svg {...common} aria-hidden>
          <path d="M12 2.8L21 7L12 11.2L3 7L12 2.8Z" />
          <path d="M3 12L12 16.2L21 12" />
          <path d="M3 16.6L12 20.8L21 16.6" />
          <path d="M10.4 8L12 5.2L13.6 8Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "cordova":
      // A phone wrapped by a globe: one web build, shipped as a native app.
      return (
        <svg {...common} aria-hidden>
          <rect x="8.4" y="2.9" width="7.2" height="18.2" rx="2.2" />
          <circle cx="12" cy="11.4" r="3.6" />
          <path d="M8.4 11.4H15.6" />
          <path d="M12 7.8C13.2 9.1 13.2 13.7 12 15" />
        </svg>
      );
    case "software":
      // An application window of panels — the generic build, not a browser.
      return (
        <svg {...common} aria-hidden>
          <rect x="2.9" y="3.9" width="18.2" height="16.2" rx="2.1" />
          <path d="M2.9 8.4H21.1" />
          <path d="M11 8.4V20.1" />
          <path d="M5.4 6.2H6.3" />
          <path d="M8.1 6.2H9" />
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
 * Every key that resolves to a real glyph — a brand mark or a drawn one.
 *
 * Kept beside the switch it describes, and asserted against the hire-role card
 * content by that module's test: a card whose key is absent here renders the
 * clock, which is the bug this file was written to end.
 */
export const CARD_ICON_KEYS: ReadonlySet<string> = new Set([
  ...BRAND_KEYS,
  // industries
  "fintech",
  "healthtech",
  "edtech",
  "ecommerce",
  "logistics",
  "telecom",
  "realestate",
  "manufacturing",
  // disciplines
  "code",
  "web",
  "mobile",
  "android",
  "ios",
  "frontend",
  "backend",
  "fullstack",
  "devops",
  "ai",
  "qa",
  "cloud",
  "data",
  "api",
  "security",
  "automation",
  "performance",
  "design",
  "integration",
  "team",
  // engagement, hiring and commercial terms
  "models",
  "hiring",
  "rates",
  "quote",
  // proof, assurance and governance
  "experience",
  "specialists",
  "trial",
  "iso",
  "vetted",
  "standards",
  "nda",
  "contracts",
  "accountability",
  // people, working relationship and location
  "talent",
  "manager",
  "collaboration",
  "communication",
  "retention",
  "skills",
  "evaluation",
  "timezone",
  "timezones",
  "global",
  "delivery",
  // reporting
  "reporting",
  // technologies with no brand mark
  "laravel",
  "csharp",
  "go",
  "blockchain",
  "game",
  "saas",
  "mern",
  "mean",
  "cordova",
  "software",
]);

/**
 * The card badge's glyph: a brand mark where one exists, a drawn glyph otherwise.
 *
 * The caller decides how to dress the badge — see `isBrandIcon`, which the bold
 * card asks so it can drop the accent tint behind a full-colour logo.
 */
export default function CardIcon({ iconKey }: { iconKey?: string }) {
  if (iconKey !== undefined && BRAND_KEYS.has(iconKey)) return <TechLogo name={iconKey} />;
  return <DrawnGlyph iconKey={iconKey} />;
}
