/**
 * Running orders and helpers shared by the backend hire pages.
 *
 * Split out of `hire-skills-backend.ts` so each skill can live in its own module
 * (and so a route's client bundle carries one skill's copy, not the whole
 * category's) while the pieces more than one of them uses stay in one place.
 */

/** The older pages' shared running order, oldest layout first. */
export const CLASSIC_ORDER = [
  "overview",
  "services",
  "midCta",
  "process",
  "whyUs",
  "exploreMore",
  "testimonials",
  "faq",
] as const;

/** The newer pages' running order — client band first, steps second. */
export const MODERN_ORDER = [
  "clients",
  "whyUs",
  "process",
  "techStack",
  "services",
  "vetting",
  "comparison",
  "exploreMore",
  "testimonials",
  "faq",
] as const;

/** The vetting band's four stages, as each newer page words them. */
const VETTING_NAMES = [
  "Rigorous talent sourcing",
  "In-depth skill assessment",
  "Thinkers & Innovators",
  "Cultural fit & adaptability",
] as const;

export const vetting = (bodies: readonly [string, string, string, string]) =>
  VETTING_NAMES.map((name, i) => ({ n: `0${i + 1}`, name, body: bodies[i] }));
