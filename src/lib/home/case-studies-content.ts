/**
 * Copy for the /case-studies index.
 *
 * Mirrors softsuave.com/case-studies: the same headline, the same studies in
 * the same order, the same industry tabs, and the same buttons — "View Case
 * Study" in the masthead and on every card, "Schedule a Call" at the close.
 * The studies come from `case-studies-data.ts`, generated from the live page.
 *
 * The detail pages are not rebuilt in this app. Each card's `href` is the
 * live `/case-study-*` path, which `SiteLink` resolves to softsuave.com.
 *
 * `content.ts`'s `caseStudies` is a different, shorter set — the outcome
 * shelf the homepage and service pages show — and is left as it is.
 */

import { caseStudyEntries, caseStudyFacets } from "./case-studies-data";
import type { ListingContent } from "@/components/landing/listing";

/** The live cards' platform icons, mirrored and resized to 96px. */
const PLATFORM_ICONS: Record<string, string> = {
  Android: "/images/case-studies/platforms/android.webp",
  iOS: "/images/case-studies/platforms/ios.webp",
  Web: "/images/case-studies/platforms/web.webp",
  Database: "/images/case-studies/platforms/database.webp",
};

export const caseStudiesPageMeta = {
  slug: "case-studies",
  path: "/case-studies",
  title: "Soft Suave Case Study: Proven IT Solutions for Business",
  description:
    "Explore Soft Suave case studies across healthcare, eCommerce, logistics, education, finance, telecom, oil & gas and on-demand platforms — AI, web and mobile solutions built and shipped for our clients.",
} as const;

export const caseStudiesListing: ListingContent = {
  eyebrow: "Case Studies",
  title: "Our happiness lies in the journey we travel with our customers",
  intro: "",
  allLabel: "All",
  facets: caseStudyFacets,
  headCta: { label: "View Case Study", href: "#work-items" },
  headImage: { id: "case-studies-hero" },
  itemCtaLabel: "View Case Study",
  items: caseStudyEntries.map((c) => ({
    key: c.key,
    tag: c.tag,
    filters: c.filters,
    title: c.title,
    body: c.body,
    image: c.image,
    platforms: c.platforms.map((name) => ({ name, icon: PLATFORM_ICONS[name] })),
    href: c.href,
  })),
};

/**
 * The live page's closing "Book Free Consultation" block, passed to the
 * homepage's `Contact` band in place of its default AI-strategy copy — the
 * same treatment /success-stories gives its identical live block.
 */
export const caseStudiesClosingBand = {
  title: "Book Free Consultation",
  body: "Get a 30-minute free consultation from a field expert. Validate your idea for free and get a rough quote once you complete this form.",
  cta: { label: "Schedule a Call", href: "/30-min-free-consultation" },
} as const;
