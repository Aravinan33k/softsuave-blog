import Image from "next/image";
import { brand } from "@/lib/home/content";

/** Full logo lockup assets (cube + wordmark + tagline). The light variant is for
 *  dark backgrounds; the dark variant is for light backgrounds. */
const LOCKUP = {
  light: "/brand/softsuave_logo_light.webp",
  dark: "/brand/softsuave_logo_dark.webp",
} as const;
/** Cube-only mark, served from /public (see next.config.ts localPatterns). */
const MARK = "/brand/mark.png";
const LOCKUP_W = 741;
const LOCKUP_H = 193;

type Props = {
  /** height of the mark (legacy) or the whole lockup (tone mode) in px */
  size?: number;
  /** render the real logo lockup image; pick the variant for the surface it sits on */
  tone?: "light" | "dark";
  showWordmark?: boolean;
  showTagline?: boolean;
  className?: string;
};

/**
 * Soft Suave logo. With `tone` set, renders the real logo lockup image (light
 * for dark surfaces, dark for light surfaces). Without `tone`, falls back to the
 * legacy cube mark + live-text wordmark that inherits the current color.
 */
export default function Logo({
  size = 28,
  tone,
  showWordmark = true,
  showTagline = false,
  className = "",
}: Props) {
  if (tone) {
    const h = size;
    const w = Math.round(h * (LOCKUP_W / LOCKUP_H));
    return (
      <Image
        src={LOCKUP[tone]}
        alt={brand.name}
        width={w}
        height={h}
        priority
        className={className}
        style={{ height: h, width: "auto", display: "block" }}
      />
    );
  }

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: showWordmark ? 10 : 0 }}
      aria-label={brand.name}
    >
      <Image
        src={MARK}
        alt=""
        height={size}
        width={Math.round((165 / 192) * size)}
        priority
        style={{ height: size, width: "auto" }}
      />
      {showWordmark && (
        <span style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1 }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: size * 0.72,
              letterSpacing: "-0.01em",
              color: "currentColor",
            }}
          >
            Soft Suave
          </span>
          {showTagline && (
            <span
              style={{
                fontSize: size * 0.3,
                opacity: 0.6,
                marginTop: 2,
                letterSpacing: "0.02em",
              }}
            >
              {brand.tagline}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
