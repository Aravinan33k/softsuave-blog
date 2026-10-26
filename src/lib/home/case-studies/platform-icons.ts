import { caseStudyEntries } from "../case-studies-data";

/**
 * The case-study hero's platform marks, for a "Platform" fact's `icons`
 * (`components/landing/hero.tsx`). 96px WebP, shown at 22px. These are the
 * hero's own set — distinct from the listing cards' icons in
 * `case-studies-content.ts`.
 */
export const HERO_PLATFORM_ICONS = {
  Android: { src: "/images/case-studies/platforms/hero-android.webp", alt: "Android" },
  iOS: { src: "/images/case-studies/platforms/hero-ios.webp", alt: "iOS" },
  Web: { src: "/images/case-studies/platforms/hero-web.webp", alt: "Web" },
} as const;

type PlatformIcon = (typeof HERO_PLATFORM_ICONS)[keyof typeof HERO_PLATFORM_ICONS];

/**
 * A hero "Platform" fact from its icons: labelled "Platform" for one,
 * "Platforms" for two or more (review: "Platform : Web", "Platforms : Android,
 * iOS"). Every case-study hero builds its platform fact here, so the label
 * always follows the count.
 */
export function platformFact(icons: readonly PlatformIcon[]) {
  return {
    label: icons.length > 1 ? "Platforms : " : "Platform : ",
    value: icons.map((i) => i.alt).join(", "),
    icons,
  };
}

/**
 * The hero's "Platform" fact for a study whose live page shows no platforms —
 * live's short-form case studies — taken from the case-study listing
 * (`case-studies-data.ts`), which records each study's platforms. Set the same
 * way as the Vehicle Intelligence hero's, so a page and its listing card can't
 * disagree. Throws for a path the listing doesn't have, so a typo fails the
 * build rather than shipping a hero without the fact.
 */
export function listingPlatformFact(href: string) {
  const entry = caseStudyEntries.find((e) => e.href === href);
  if (!entry) throw new Error(`listingPlatformFact: no case-study listing entry for ${href}`);
  const platforms = entry.platforms.filter((p): p is keyof typeof HERO_PLATFORM_ICONS => p in HERO_PLATFORM_ICONS);
  return platformFact(platforms.map((p) => HERO_PLATFORM_ICONS[p]));
}
