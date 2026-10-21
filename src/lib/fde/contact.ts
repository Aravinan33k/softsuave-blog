/**
 * Contact details, kept in one place so the visible CTAs, the JSON-LD
 * `contactPoint` and the metadata can never disagree about how to reach us.
 *
 * Deliberately free of imports: both the content modules and `seo.ts` pull
 * from here, and `seo.ts` already reads the content modules.
 */

export const contactEmail = "contact@softsuave.com";

export const contactEmailHref = `mailto:${contactEmail}`;

/** In-page anchor/route for the "Talk to us" primary action. */
export const contactPageHref = "/contact";
