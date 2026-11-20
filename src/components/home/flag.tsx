import styles from "./home.module.css";

/**
 * Country flags as inline SVG, for the footer's phone list.
 *
 * NOT emoji. `🇺🇸` and friends are regional-indicator pairs, and Chrome/Edge on
 * Windows ship no glyph for them — they fall back to rendering the two letters
 * ("US"), which is exactly the label this component replaced. Inline SVG is the
 * only form that looks the same on every platform, and it follows the pattern
 * `tech-logo.tsx` already uses for brand marks.
 *
 * Deliberately id-free: no `<clipPath>`, no gradients. The round crop is CSS on
 * the wrapper (`overflow: hidden` + `border-radius`), because the footer renders
 * on every page of the marketing surface and duplicate SVG ids across a
 * document are invalid — the same trap `journey.tsx` documents, where
 * `url(#glow)` silently resolves to whichever copy came first.
 *
 * Drawn at 3:2 and cropped to the circle with `slice`. Details that would land
 * under one pixel at this size are left out rather than drawn as mush: the US
 * canton carries no stars, and the Ashoka chakra is a ring and a hub with no
 * spokes. Both still read correctly at 22px, which is the only size that ships.
 */

const FLAGS = {
  us: {
    name: "United States",
    art: (
      <>
        <rect width="24" height="16" fill="#fff" />
        {/* 13 stripes; the seven red ones are drawn over the white ground */}
        {[0, 2, 4, 6, 8, 10, 12].map((i) => (
          <rect key={i} y={(i * 16) / 13} width="24" height={16 / 13} fill="#b31942" />
        ))}
        {/* the union covers the top seven stripes, as on the real flag */}
        <rect width="9.6" height={(7 * 16) / 13} fill="#0a3161" />
      </>
    ),
  },

  gb: {
    name: "United Kingdom",
    art: (
      <>
        <rect width="24" height="16" fill="#012169" />
        {/* saltire, then the cross over it — each a wide white stroke with a
            narrower red one on top, which is what gives the fimbriation */}
        <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3.2" />
        <path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" strokeWidth="1.7" />
        <path d="M12 0V16M0 8H24" stroke="#fff" strokeWidth="5.4" />
        <path d="M12 0V16M0 8H24" stroke="#c8102e" strokeWidth="3.2" />
      </>
    ),
  },

  in: {
    name: "India",
    art: (
      <>
        <rect width="24" height="16" fill="#ff9933" />
        <rect y={16 / 3} width="24" height={16 / 3} fill="#fff" />
        <rect y={32 / 3} width="24" height={16 / 3} fill="#138808" />
        <circle cx="12" cy="8" r="2.1" fill="none" stroke="#000080" strokeWidth="0.7" />
        <circle cx="12" cy="8" r="0.55" fill="#000080" />
      </>
    ),
  },
} as const;

export type FlagCode = keyof typeof FLAGS;

export default function Flag({ code, className }: { code: FlagCode; className?: string }) {
  const flag = FLAGS[code];
  if (!flag) return null;

  return (
    <span className={`${styles.flag} ${className ?? ""}`}>
      {/* `role="img"` + the country name is the accessible name the removed text
          label used to provide — without it the number would be read out with
          no country at all. */}
      <svg
        viewBox="0 0 24 16"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={flag.name}
      >
        {flag.art}
      </svg>
    </span>
  );
}
