/**
 * The partner / certification lockups that run under a page hero.
 *
 * These used to be four strings ("Upwork Top Rated", "Clutch verified", …)
 * rendered as dot-and-label tags. softsuave.com states the same four as the
 * issuers' own artwork, which is the point of a trust mark: a reader
 * recognises the Clutch wordmark instantly and has to *read* "Clutch
 * verified". The art is the issuers' — bundled under `public/brand/awards`,
 * traceable to source in that folder's MANIFEST.md — so it is reproduced
 * as-issued rather than recoloured to the surface.
 *
 * Every file has a transparent ground and a dark logo, so a hero renders each
 * on a white plaque (`.badgeLogo`). That is also how the legacy site shows
 * them: white cards over the hero photograph.
 */

export type HeroBadge = {
  /**
   * Path under `public/`. Route it through `publicMediaUrl()` at render —
   * a hand-written src does not pick up the `/blog` basePath on its own.
   */
  readonly src: string;
  /**
   * The mark's spoken name. The artwork carries no accessible text, and
   * unlike the awards strip there is no adjacent copy naming the issuer, so
   * this is the only thing a screen reader gets — it must not be empty.
   */
  readonly alt: string;
  /**
   * Intrinsic size of the source file, for `next/image`. Kept per-badge
   * because the four differ widely in aspect (2.15 → 3.66); the hero pins
   * height and lets width follow, so a shared box would squash two of them.
   */
  readonly width: number;
  readonly height: number;
};

/**
 * Partner and marketplace standing, in the order softsuave.com shows them.
 */
export const partnerHeroBadges: readonly HeroBadge[] = [
  { src: "/brand/awards/upwork-badge-new.webp", alt: "Upwork Top Rated Plus", width: 659, height: 279 },
  { src: "/brand/awards/clutch-color.webp", alt: "Clutch rated 4.9 out of 5", width: 603, height: 281 },
  { src: "/brand/awards/microsoft-silver.webp", alt: "Microsoft Silver Partner", width: 1028, height: 281 },
  { src: "/brand/awards/aws-color.webp", alt: "AWS Partner Network", width: 1025, height: 281 },
] as const;

/** Narrowing helper for heroes that accept both forms in one list. */
export function isHeroBadge(badge: string | HeroBadge): badge is HeroBadge {
  return typeof badge !== "string";
}
