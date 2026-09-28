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
 *
 * These four are partner standing, so they render as the issuers' own
 * lockups rather than as our paraphrase of them — see `hero-badges.ts`.
 */
export { partnerHeroBadges as sharedHeroBadges } from "./hero-badges";

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

/**
 * The hero CTA pair every "Hire <skill> Developers" page runs beside its
 * enquiry form — "Start 40 Hours Free Trial" and "Book a Meeting" — missing
 * from this surface's hero entirely before (review: "CTA button is missing
 * in the hero section"). Company-level standing, not per-role copy, so it is
 * injected once by the page renderer rather than repeated in twenty content
 * modules — the same treatment `sharedHeroBadges` gets.
 *
 * `/free-7-days-trial` is a page softsuave.com has and this app does not;
 * `SiteLink` resolves it to the live site rather than 404ing. The Calendly
 * link is the live page's own booking link, unchanged.
 */
export const sharedHeroCtas = [
  { label: "Start 40 Hours Free Trial", href: "/free-7-days-trial" },
  {
    label: "Book a Meeting",
    href: "https://calendly.com/soft_suave/dedicated-teams",
    external: true,
  },
] as const;
