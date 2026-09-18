/**
 * Copy blocks that several live hire-by-skill pages ship identically.
 *
 * Shared here only where the live pages genuinely are identical — the same
 * markup, the same words, in the same order. Anything that differs page to page
 * stays in that page's own entry, however similar it looks.
 *
 * Two of these blocks carry an evident authoring slip from the live site: the
 * `MERN_STEPS` / `MERN_WHY` pair talks about "MERN" on the React, Java, Python,
 * PHP, .NET and MEAN pages too, because softsuave.com ships that same markup on
 * all of them. It is reproduced rather than corrected — quietly rewriting a
 * client's published copy during a port is not this file's call — and defining
 * it once makes the duplication visible instead of hiding it behind six
 * near-identical hand transcriptions.
 */

import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import { clients } from "./content";

/**
 * The four hiring steps on the older "$14/hour" pages — React, Java, Python,
 * PHP, .NET, MERN and MEAN — verbatim, "MERN" wording and all.
 */
export const MERN_STEPS: ProcessContent["steps"] = [
  {
    n: "01",
    name: "Share the MERN Stack JD",
    body: "Send your MERN stack needs with project scope, skills, experience, and timeline.",
  },
  {
    n: "02",
    name: "Review Soft Suave's MERN Shortlist",
    body: "Review curated MERN profiles with skills, experience, availability, and project fit details.",
  },
  {
    n: "03",
    name: "Run the 40-Hour Free Trial",
    body: "Start a 40-hour trial to assess coding skills, communication, quality, and delivery approach.",
  },
  {
    n: "04",
    name: "Onboard the MERN Developer to Your Team",
    body: "Sign SLA and NDA, complete onboarding, and integrate the MERN developer into your workflow.",
  },
];

/** The six why-hire cards those same pages run, verbatim. */
export const MERN_WHY: CardGridContent["items"] = [
  {
    name: "Senior MERN Stack Talent",
    body: "Hire skilled MERN developers with expertise in MongoDB, Express, React, Node, APIs, and cloud.",
    icon: "users",
  },
  {
    name: "Daily Reports + Clear Communication",
    body: "Get daily updates and sprint reports to stay informed on progress, priorities, blockers, and delivery.",
    icon: "gauge",
  },
  {
    name: "Free Project Quote Within 24 Hours",
    body: "Receive a clear project quote within 24 hours based on your scope, timeline, and needs.",
    icon: "coins",
  },
  {
    name: "Dedicated Project Manager Support",
    body: "A dedicated manager ensures smooth coordination, tracking, and communication throughout the project.",
    icon: "shield",
  },
  {
    name: "Flexible MERN Engagement Models",
    body: "Choose fixed price, time and material, or dedicated team models to match your project needs.",
    icon: "globe",
  },
  {
    name: "Flexible Engagement Models",
    body: "Hire our experts from three custom engagement models as per your need - Full time, Part-time, and Milestone.",
    icon: "book",
  },
];

/**
 * The hiring steps on the Angular, Node, NestJS and Ionic pages — the same four
 * cards, under each page's own heading.
 */
export const CURATED_STEPS: ProcessContent["steps"] = [
  {
    n: "01",
    name: "Share Your Developer Requirement",
    body: "Share your project scope, required skills, timeline, and preferred hiring model with our team.",
  },
  {
    n: "02",
    name: "Review Curated Developer Profiles",
    body: "Get shortlisted developer profiles matched to your skills, goals, availability, and team needs.",
  },
  {
    n: "03",
    name: "Start the 40-Hour Risk-Free Trial",
    body: "Test the developer's coding skills, communication, quality, and workflow fit before onboarding.",
  },
  {
    n: "04",
    name: "Onboard the Developer to Your Team",
    body: "Finalize SLA and NDA, set up communication, and integrate the developer into your workflow.",
  },
];


/**
 * The client marks the hire pages' own band publishes — the homepage roster
 * without the three that band does not carry.
 *
 * The homepage strip opens with Phoenix Technologies, AMD Telecom and Perkypet,
 * added here from softsuave.com's /clients index because they are the three
 * clients its testimonials quote. The hire pages' live band runs the other
 * nineteen and not those three, so they are filtered out rather than left to
 * claim three clients the source page does not.
 */
const NOT_ON_HIRE_PAGES = new Set(["Phoenix Technologies", "AMD Telecom", "Perkypet"]);

export const HIRE_CLIENT_LOGOS = clients.logos.filter((l) => !NOT_ON_HIRE_PAGES.has(l.name));

/**
 * The enquiry band every one of these pages closes on, verbatim.
 *
 * Passed to the homepage's `Contact` component in place of its default copy.
 * That default is the homepage's own "Ready to Transform Your Business with
 * AI?" pitch, which is not what any hire page says here — the live band is a
 * consultation offer, and the component is borrowed for its layout, not for
 * the homepage's words.
 */
export const HIRE_CLOSING_BAND = {
  title: "Book Free Consultation",
  body: "Get a 30-minute free consultation from a field expert. Validate your idea for free and get a rough quote once you complete this form.",
  cta: { label: "Schedule a Call", href: "/contact" },
} as const;
