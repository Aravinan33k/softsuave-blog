/**
 * Copy for the /case-studies index.
 *
 * The studies themselves are NOT redefined here. They come from
 * `content.ts`'s `caseStudies`, the same source the homepage shelf and the
 * service pages read, so the index cannot list an outcome the rest of the site
 * does not claim.
 *
 * Only the masthead and the closing band are this page's own copy.
 *
 * Scope note: softsuave.com publishes 64 individual `case-study-*` pages. This
 * index lists the four written up in `content.ts` and links no detail pages,
 * because none are built here yet — see `PAGE-TEMPLATES.md`. When a
 * case-study detail template lands, give each item an `href` and the cards
 * start linking with no change to this file's shape.
 */

import { caseStudies } from "./content";
import type { ListingContent } from "@/components/landing/listing";

export const caseStudiesPageMeta = {
  slug: "case-studies",
  path: "/case-studies",
  title: "Case Studies",
  description:
    "Engineering work Soft Suave has shipped, with the measured outcome in each: vision AI for logistics, subscription commerce, healthcare records and classroom platforms.",
} as const;

export const caseStudiesListing: ListingContent = {
  eyebrow: "Case Studies",
  title: "The work, and what it measurably changed",
  intro:
    "Each of these is a system that went to production and a number that moved because of it. Filter by industry, or read them all.",
  allLabel: "All industries",
  items: caseStudies.items.map((c) => ({
    key: c.key,
    tag: c.tag,
    title: c.title,
    body: c.body,
    metricValue: c.metricValue,
    metricLabel: c.metricLabel,
    year: c.year,
  })),
};

export const caseStudiesPageCta = {
  eyebrow: "Your Project",
  title: "The next one of these could be yours",
  body: "Tell us the outcome you need rather than the feature list, and we will come back with how we would get there, what it takes and how long.",
  cta: { label: "Start a conversation", href: "#contact" },
} as const;
