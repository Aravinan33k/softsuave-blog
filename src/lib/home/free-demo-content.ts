/**
 * Copy for the Free Demo App page (`/free-demo-app`).
 *
 * A clone of softsuave.com/free-demo-app on the Free Consultation page's
 * structure (`/30-min-free-consultation`, `consultation-content.ts`): the same
 * sections in the same order — Hero (with its three stat cards and the
 * enquiry form), Our Clients, Built Around You, Awards, Testimonials — on the
 * same components. Copy is the live page's, verbatim; the clients, awards and
 * testimonials bands render the homepage components' own copy, as the
 * consultation page does.
 *
 * Departures from the live page, noted rather than silently applied:
 *
 *  - The stat figures come from `lib/company-figures.ts`, the one place the
 *    company's figures are written (a test enforces it): 150+ clients and
 *    400+ experts match the live page; countries reads 20+ where the live
 *    page says 21+.
 *  - The live form card's "Save 60%" badge has no slot in the shared enquiry
 *    card, so it is not rendered (as on the consultation page).
 *  - The live page ends on its testimonials — it has no closing "Book Free
 *    Consultation" band, so this page has none either.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { ProcessContent } from "@/components/landing/process";
import { CLIENTS_PLUS, COUNTRIES_PLUS, SPECIALISTS_PLUS } from "@/lib/company-figures";

export const freeDemoMeta = {
  path: "/free-demo-app",
  // The live page's <title>, description and canonical, verbatim. It has no
  // Open Graph or Twitter tags and no structured data.
  title: "Get a FREE Demo App For Your Business - Soft Suave",
  description: "Fill the form below to get a free Demo App For Your Business",
  canonical: "https://www.softsuave.com/free-demo-app",
} as const;

export const freeDemoHero: HeroContent = {
  // The H1, split so the last line takes the coral accent (as on the
  // consultation page's "Free Consultation." / "Fast. Simple.").
  titleLines: ["Live Demo.", "Fast. Simple."],
  body: [
    "See our app development process in action – get a personalized demo of our solutions before you commit. Understand features, workflows, and capabilities tailored to your project needs.",
  ],
  points: [],
  // The live stat titles are H3s.
  statTitleAs: "h3",
  stats: [
    {
      title: `${CLIENTS_PLUS} CLIENTS`,
      body: "World wide country-focused and Industry specific App solutions.",
      icon: "clients",
    },
    {
      title: `${SPECIALISTS_PLUS} EXPERTS`,
      body: "A power-packed team of experienced app developers.",
      icon: "experts",
    },
    {
      title: `${COUNTRIES_PLUS} COUNTRIES SERVED`,
      body: "Serving businesses worldwide with tailored app solutions.",
      icon: "countries",
    },
  ],
  form: {
    title: "Book Your Free Demo",
    body: "Experience our solutions live – scheduled within 24 hours",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "Requirements",
    subject: "Free Demo App enquiry",
  },
};

/** "Built Around You" — the live page's copy, verbatim. */
export const freeDemoProcess: ProcessContent = {
  eyebrow: "Built Around You",
  title: "We’re Here to Help You Turn Every Idea Into Reality",
  body: "Your ideas and needs will be gathered, Analyzed, and formed into a complete structure, ready for the development process right away.",
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
