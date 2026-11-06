import Image from "next/image";
import { brand } from "@/lib/home/content";
import { publicMediaUrl } from "@/lib/media-url";

/** Full logo lockup assets (cube + wordmark + tagline). The light variant is for
 *  dark backgrounds; the dark variant is for light backgrounds.
 *
 *  Paths are root-relative and get the mount subpath applied at render time via
 *  `publicMediaUrl`: `basePath` prefixes framework assets but not next/image
 *  sources, and the optimizer fetches the `url` param verbatim — so under
 *  `basePath: '/blog'` an unprefixed src 400s instead of resolving. */
/* The `_trim` files are the same artwork with the 100px transparent margin
   the originals carried on every side cut away (BUG-024). That margin was
   inside the image box, so a 48px-tall logo drew a 38px lockup — about a
   quarter smaller than softsuave.com's header logo, with the "A KiwiTech
   Affiliate Company" line too small to read. New file names, so the dev image
   optimizer cannot serve its cached copy of the old ones. */
const LOCKUP = {
  light: "/brand/softsuave_logo_light_trim.webp",
  dark: "/brand/softsuave_logo_dark_trim.webp",
} as const;
/** Cube-only mark, served from /public (see next.config.ts localPatterns). */
const MARK = "/brand/mark.png";
/** The trimmed lockup's own proportions (2992×777). */
const LOCKUP_W = 2992;
const LOCKUP_H = 777;

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
        src={publicMediaUrl(LOCKUP[tone])}
        alt={brand.name}
        width={w}
        height={h}
        priority
        className={className}
        // `--logo-h` lets a stylesheet resize the lockup per breakpoint (the
        // nav's is smaller on phones) without fighting an inline height.
        style={{ height: `var(--logo-h, ${h}px)`, width: "auto", display: "block" }}
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
        src={publicMediaUrl(MARK)}
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
