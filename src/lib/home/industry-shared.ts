/**
 * Content shared by the seven industry AI landing pages (FinTech, HealthTech,
 * EdTech, eCommerce, Logistics, Telecom, Construction).
 *
 * These pages mirror the live softsuave.com industry pages, which all carry the
 * same company-level framing — the same trust badges, the same enquiry form
 * chrome, the same "13+ years of product development" positioning. Keeping that
 * in one place means the seven pages cannot drift apart on facts that are
 * company-wide rather than sector-specific.
 *
 * Sector-specific copy stays in each page's own `<sector>-ai-content.ts`.
 */

import type { HeroContent } from "@/components/landing/hero";
import { sharedHeroBadges } from "./delivery-shared";

/**
 * The delivery pages' trust badges, reused verbatim. Each is a published
 * company fact rather than a claim written for these pages, so the industry
 * heroes state exactly what the GCC and offshore heroes already state.
 */
export const industryHeroBadges = sharedHeroBadges;

/**
 * Builds a hero enquiry form from the parts that actually differ per sector.
 *
 * The submit/sending labels and the "Business Enquiry" eyebrow are identical on
 * every page — written out seven times they would be seven places to forget.
 * Everything a reader would notice as sector-specific is a parameter.
 */
export function industryEnquiryForm(opts: {
  /** Form heading, e.g. "Plan your FinTech AI build". */
  readonly title: string;
  readonly note: string;
  readonly requirementLabel: string;
  readonly requirementPlaceholder: string;
  /** Subject line of the composed mailto. */
  readonly subject: string;
}): HeroContent["form"] {
  return {
    eyebrow: "Business Enquiry",
    title: opts.title,
    note: opts.note,
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: opts.requirementLabel,
    requirementPlaceholder: opts.requirementPlaceholder,
    subject: opts.subject,
  };
}

/**
 * The confidentiality line every industry enquiry form closes on. The delivery
 * pages state the same commitment, so it is one string rather than seven.
 */
export const NDA_NOTE =
  "Tell us where you are today and what you want the system to do, and we come back with an approach, a delivery shape, and an indicative cost. Everything stays under NDA.";
