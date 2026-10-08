/**
 * Copy for the Free Quote page (`/free-quote`).
 *
 * A clone of softsuave.com/free-quote: same sections, same order — Hero, Our
 * Clients, Built Around You, Awards, Testimonials, Book Free Consultation — on
 * the same components as its siblings `/free-7-days-trial` and
 * `/30-min-free-consultation`. Copy is the live page's, verbatim; the
 * clients, awards and testimonials bands render the homepage components' own
 * copy, which already matches it.
 *
 * Departures from the live page, noted rather than silently applied:
 *
 *  - "20+ Countries Served", not the live "21+", matching the sibling pages.
 *  - The live form card's "Save 60%" badge has no slot in the shared enquiry
 *    card, so it is not rendered.
 *  - The live source also carries a second clients band ("Preferred
 *    Technology Partner for Startups and SMBs Globally"), but it is commented
 *    out there and never shows, so it is not cloned.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { ProcessContent } from "@/components/landing/process";

export const freeQuoteMeta = {
  path: "/free-quote",
  // Live `<title>` verbatim — it already names Soft Suave, so no suffix.
  title: "Soft Suave Technologies Quote for Business Solutions",
  description: "Fill the form below to get a free app development quote for your business.",
} as const;

export const freeQuoteHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Free Quote.", "Fast. Simple."],
  body: [
    "Skip the wait – get a free, customized estimate within 24 hours. Whether starting fresh or scaling up, we'll help you move forward quickly.",
  ],
  points: [],
  stats: [
    {
      title: "150+ Clients",
      body: "World wide country-focused and industry-specific app solutions.",
      icon: "clients",
    },
    {
      title: "400+ Experts",
      body: "A power-packed team of experienced app developers.",
      icon: "experts",
    },
    {
      title: "20+ Countries Served",
      body: "Serving businesses worldwide with tailored app solutions.",
      icon: "countries",
    },
  ],
  // No background photo and no partner badges, as on the sibling pages.
  form: {
    title: "Share Your Project Needs",
    body: "Free rough quote delivered within 24 hours",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "Tell us about your requirements",
    subject: "Free Quote enquiry",
  },
};

/** "Built Around You" — the live page's copy, verbatim. */
export const freeQuoteProcess: ProcessContent = {
  eyebrow: "Built Around You",
  title: "We're Here to Help You Turn Every Idea Into Reality",
  body: "Your ideas and needs will be gathered, analyzed, and formed into a complete structure, ready for the development process right away.",
  steps: [
    {
      n: "01",
      name: "Share Your Requirement",
      body: "Based on your needs, we create an application that fulfills everything you wanted.",
    },
    {
      n: "02",
      name: "Non Disclosure Agreement (NDA)",
      body: "No worries! We follow rigid non-disclosure agreements here, so nothing will ever get out.",
    },
    {
      n: "03",
      name: "Understanding Your Requirement",
      body: "We examine and have a consultation with experts to give your project the right path through a suitable approach.",
    },
  ],
};

/** The live page's closing "Book Free Consultation" block, for `Contact`. */
export const freeQuoteClosingBand = {
  title: "Book Free Consultation",
  body: "Get a 30-minute free consultation from a field expert. Validate your idea for free and get a rough quote once you complete this form.",
  cta: { label: "Schedule a Call", href: "/30-min-free-consultation" },
} as const;
