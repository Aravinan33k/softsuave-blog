/**
 * Copy for the 40-Hour Free Trial page (`/free-7-days-trial`), adapted for
 * hiring Anthropic (Claude) developers.
 *
 * A clone of softsuave.com/free-7-days-trial: same sections, same order —
 * Hero, Our Clients, Built Around You, Awards, Testimonials, Book Free
 * Consultation. The page is being reworded one section at a time; until a
 * section's turn comes, its copy below is the live page's, verbatim, and the
 * clients, awards and testimonials bands render the homepage components'
 * own copy (which already matches the live page).
 *
 * The hero's enquiry card copy was taken from the Anthropic page's form and is
 * written out in full below (that page is not on this branch).
 */

import type { HeroContent } from "@/components/landing/hero";
import type { ProcessContent } from "@/components/landing/process";

export const freeTrialMeta = {
  path: "/free-7-days-trial",
  title: "Book a Risk-free 40 Hours Trail to Test Our Developers | Soft Suave",
  description:
    "Fill the form below to book a Risk-free 7 Days Trial to test our developers.",
} as const;

export const freeTrialHero: HeroContent = {
  // eyebrow: "Free 7-Day Trial",
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Start Your", "40-Hour Trial!"],
  body: [
    "Test our developers before you commit – get 40 hours of development free to evaluate skills, speed, and quality. Perfect for app development projects or enhancing your existing team.",
  ],
  points: [],
  stats: [
    {
      title: "150+ Clients",
      body: "World wide country-focused and industry-specific AI solutions.",
      icon: "clients",
    },
    {
      title: "400+ Experts",
      body: "A power-packed team of experienced AI and app developers.",
      icon: "experts",
    },
    {
      title: "20+ Countries Served",
      body: "Serving businesses worldwide with tailored AI solutions.",
      icon: "countries",
    },
  ],
  // No background photo and no partner badges on this hero (1 Oct request).
  // The Anthropic page's form, less its "Business Enquiry" eyebrow (7 Oct
  // request) — dropped here only, so /hire-anthropic-developers keeps it.
  form: {
    title: "Start Your 40-Hour Trial",
    body: "Experience our developers’ skills before hiring",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Get My Free Trial",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "Tell us about your requirements",
    // Stored on the lead so the team can tell trial requests from
    // consultation ones (it was "Free Consultation enquiry", the same as
    // /30-min-free-consultation's).
    subject: "40-Hour Free Trial enquiry",
  },
};

/** "Built Around You" — the live page's copy, not yet reworded. */
export const freeTrialProcess: ProcessContent = {
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
export const freeTrialClosingBand = {
  title: "Book Free Consultation",
  body: "Get a 30-minute free consultation from a field expert. Validate your idea for free and get a rough quote once you complete this form.",
  cta: { label: "Schedule a Call", href: "/30-min-free-consultation" },
} as const;
