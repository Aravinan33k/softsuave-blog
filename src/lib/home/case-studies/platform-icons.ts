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
