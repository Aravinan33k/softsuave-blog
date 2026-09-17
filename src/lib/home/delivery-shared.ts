/**
 * Content shared by the delivery-model and engineering-service landing pages
 * (GCC, offshore development, staff augmentation, IT outsourcing, legacy
 * modernization, product engineering, cloud computing).
 *
 * This file used to also carry the client testimonials and the case-study
 * shelf. Those are now rendered by the homepage's own `Testimonials` and
 * `WorkGrid` components, reading the homepage's `content.ts` — company-level
 * proof belongs in one place, and duplicating it here meant the marketing site
 * could disagree with itself about what a client said. What is left is the
 * hero trust badges, which are the only company-level copy these pages still
 * state in their own markup.
 */

/**
 * Trust badges reused across the delivery-page heroes. Each is a published
 * company fact (certification, scale, or a stated response commitment) rather
 * than a claim invented for a page.
 */
export const sharedHeroBadges = [
  "ISO/IEC 27001:2022 certified",
  "NDA before anything is shared",
  "400+ AI & engineering specialists",
  "Reply in 1 business day",
] as const;

/**
 * Notice under every hero enquiry form. The form composes a mailto to the
 * sales inbox, so job applicants are pointed at the careers route instead —
 * `href` goes through next/link, which applies the basePath.
 */
export const sharedHeroAlert = {
  label: "Alert:",
  text: "This form is for business, not candidates. To apply for jobs,",
  linkLabel: "click here.",
  href: "/career-overview",
} as const;
