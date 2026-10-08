/**
 * Copy for the Free Consultation page (`/30-min-free-consultation`).
 *
 * A clone of softsuave.com/30-min-free-consultation: same sections, same
 * order — Hero, Our Clients, Built Around You, Awards, Testimonials, Book Free
 * Consultation — on the same components as `/free-7-days-trial`, its sibling.
 * Copy is the live page's, verbatim; the clients, awards and testimonials
 * bands render the homepage components' own copy, which already matches it.
 *
 * Departures from the live page, noted rather than silently applied:
 *
 *  - The live page has no meta description; `consultationMeta.description`
 *    is drawn from its own hero paragraph.
 *  - The live form card's "Save 60%" badge has no slot in the shared enquiry
 *    card, so it is not rendered.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { ProcessContent } from "@/components/landing/process";

export const consultationMeta = {
  path: "/30-min-free-consultation",
  title: "Book a 30 Minute FREE Consultation For Your Business Needs | Soft Suave",
  description:
    "Skip the guesswork – get a free expert consultation within 24 hours. Whether you're building a new app or enhancing an existing one, our specialists will guide you every step of the way.",
} as const;

export const consultationHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Free Consultation.", "Fast. Simple."],
  body: [
    "Skip the guesswork – get a free expert consultation within 24 hours. Whether you're building a new app or enhancing an existing one, our specialists will guide you every step of the way.",
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
  // No background photo and no partner badges, as on /free-7-days-trial.
  form: {
    title: "Start Your Dream Project!",
    body: "Book a free consultation call within 24 hours",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Schedule Now",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "Tell us about your requirements",
    subject: "Free Consultation enquiry",
  },
};

/** "Built Around You" — the live page's copy, verbatim. */
export const consultationProcess: ProcessContent = {
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

/**
 * The closing "Book Free Consultation" band, for `Contact`. Its button points
 * back up to the hero form: this page IS the consultation booking, so linking
 * to /30-min-free-consultation from here would just reload it.
 */
export const consultationClosingBand = {
  title: "Book Free Consultation",
  body: "Get a 30-minute free consultation from a field expert. Validate your idea for free and get a rough quote once you complete this form.",
  cta: { label: "Schedule a Call", href: "#top" },
} as const;
