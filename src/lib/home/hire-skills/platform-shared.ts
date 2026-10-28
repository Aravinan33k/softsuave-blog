/**
 * Running orders and helpers shared by the platform hire pages.
 *
 * Split out of `hire-skills-platform.ts` so each skill can live in its own module
 * (and so a route's client bundle carries one skill's copy, not the whole
 * category's) while the pieces more than one of them uses stay in one place.
 */

/** The newer pages' running order, with the prose expertise band. */
export const PLATFORM_ORDER = [
  "clients",
  "whyUs",
  "process",
  "expertise",
  "services",
  "vetting",
  "comparison",
  "exploreMore",
  "testimonials",
  "faq",
] as const;
