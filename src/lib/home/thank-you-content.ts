/**
 * Copy for `/thank-you`, where every lead form lands once the lead is accepted
 * (lib/forms/thank-you.ts). Verbatim from softsuave.com/thank-you: the heading,
 * the CTO's consult-call card, "We'll Help You:" and the job-enquiry note.
 *
 * One addition: the live page's note asks visitors to "block my calendar", but
 * its own "Book My Calendar" button is commented out, so the note points at
 * nothing. Here the button is present, opening the live page's own Calendly
 * link (`calendly.com/soft_suave/initial_discussion`).
 */

import { THANK_YOU_PATH } from "@/lib/forms/thank-you";

export const thankYouMeta = {
  path: THANK_YOU_PATH,
  title: "Thank You – Soft Suave",
  description: "Thank you for contacting Soft Suave. Our team will review your requirements and get back to you within 24 hours.",
} as const;

export const thankYou = {
  /** The H1, with `accent` taking the coral as on the live page. */
  title: "Thanks for contacting",
  accent: "Soft Suave",
  person: {
    image: "/images/landing/thank-you-madhu-k.webp",
    alt: "Madhu K, Chief Technology Officer at Soft Suave",
    caption: "Free 30-Minute Consult Call with",
    name: "Madhu K, Chief Technology Officer",
  },
  helpTitle: "We'll Help You:",
  help: ["Slice and dice data", "Make informed decision", "Seal the cracks quickly"],
  cta: {
    label: "Book My Calendar",
    href: "https://calendly.com/soft_suave/initial_discussion",
  },
  note: {
    title: "Note:",
    before: "Please block my calendar only if you have any business enquiries. Contact",
    email: "ss.hr@softsuave.com",
    after: "for enquiries on job opportunities.",
  },
} as const;
