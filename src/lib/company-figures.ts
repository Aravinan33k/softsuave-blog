/**
 * Soft Suave's headline figures — THE place to change them.
 *
 * Every page, page title, meta description and JSON-LD block that quotes one
 * of these reads it from here, so a new figure is one edit: change the number
 * below and the whole site follows. Do not type these figures into copy
 * directly; build the sentence around the constant instead:
 *
 *   `Backed by ${YEARS_PLUS} years of expertise and ${SPECIALISTS_PLUS} specialists`
 *   `Hire developers from ${HOURLY_RATE}`
 *
 * The `…_PLUS` strings are the figures as the copy prints them ("14+"); the raw
 * numbers are for places that count up to a figure (the homepage's stat
 * cards) or phrase it without the plus ("over 14 years").
 *
 * Kept free of `server-only`: client components read it too. The content
 * modules `next.config.ts` loads (through `lib/home/landing-pages.ts`) import
 * it by relative path, `../company-figures`: Next's config loader cannot
 * resolve the `@/` alias from inside `src/lib/home`, and fails the build.
 */
export const FIGURES = {
  /** Years Soft Suave has been delivering software. */
  years: 14,
  /** AI & engineering specialists on the team. */
  specialists: 400,
  /** Clients served worldwide. */
  clients: 150,
  /** Countries those clients are in. */
  countries: 20,
  /** Starting hourly rate for a developer, in US dollars. */
  hourlyRate: 14,
} as const;

/** "14+" — as in "14+ years of technology expertise". */
export const YEARS_PLUS = `${FIGURES.years}+` as const;

/** "400+" — as in "400+ AI & Engineering Specialists". */
export const SPECIALISTS_PLUS = `${FIGURES.specialists}+` as const;

/** "150+" — as in "150+ Clients". */
export const CLIENTS_PLUS = `${FIGURES.clients}+` as const;

/** "20+" — as in "20+ Countries Served". */
export const COUNTRIES_PLUS = `${FIGURES.countries}+` as const;

/** "$14/hour" — the starting rate, in the one form the site prints it. */
export const HOURLY_RATE = `$${FIGURES.hourlyRate}/hour` as const;
