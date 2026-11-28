/**
 * Copy for `/404` and `/410` — clones of softsuave.com/404 and softsuave.com/410, the site's error pages.
 *
 * Only what the live page's own content renders: an illustration (a signpost reading
 * "404 · Page not found", with a hiker and a balloon) and a "Go back to home" link. The live page's
 * menu, contact list and footer are the site's chrome, which this app draws itself.
 *
 * The pages set only a <title> ("Soft Suave Technologies"); they have no description. Both use the one
 * illustration below. (The live /410 sign reads "410"; the supplied artwork reads "404".)
 */

export const notFoundMeta = {
  path: "/404",
  title: "Soft Suave Technologies",
} as const;

/** /410 is the same page under another address (and its own <title>, which is the same). */
export const goneMeta = {
  path: "/410",
  title: "Soft Suave Technologies",
} as const;

export const notFoundContent = {
  image: {
    src: "/images/not-found/404-error-signpost.png",
    width: 1327,
    height: 1185,
    alt: "404 error — page not found",
  },
  link: { label: "Go back to home", href: "/" },
} as const;
