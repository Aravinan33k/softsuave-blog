/**
 * Copy for `/ad/coffee-with-us` — "Have a Coffee With Us", the paid-traffic
 * page for US small and mid-sized businesses whose one goal is a meeting
 * request with the CEO, Ramesh Vayavuru.
 *
 * Built on the `/ad/remote-developer` kit, minus everything that sells the
 * developer trial: no 40-hour trial, no trial popup, no Tech Stack, no hiring
 * process, no developer carousel. Every CTA scrolls to the meeting form in the
 * hero (`#book`). Copy is the campaign brief's, verbatim; the reused sections
 * (clients, delivery-standard cards, testimonials) keep their existing text.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import { adClients, adTestimonials } from "@/lib/home/ad-app-developer-content";
import { rdPractice } from "@/lib/home/ad-remote-developer-content";
import { CLIENTS_PLUS, SPECIALISTS_PLUS, YEARS_PLUS } from "@/lib/company-figures";

export const cwMeta = {
  path: "/ad/coffee-with-us",
  title: "Have a Coffee With Us | Meet Soft Suave's CEO",
  description:
    "Book a 30-minute virtual meeting with Ramesh Vayavuru, CEO of Soft Suave. Talk through AI solutions, software development and engineering support for your business.",
} as const;

/** The id of the meeting form's card. Every CTA on the page scrolls here. */
export const BOOK_ID = "book";
export const BOOK_HREF = `#${BOOK_ID}`;
/**
 * The hero's own button (phones and tablets only). Points at the section that
 * wraps the form rather than the card, so the page CSS can hide just this
 * button from 1000px up, where the form already sits beside the copy.
 */
export const BOOK_HREF_HERO = "#meeting";

const CTA_LABEL = "Have a Coffee With Us";

export const cwHero: HeroContent = {
  eyebrow: "AI-Driven Technology. People-First Partnerships.",
  titleLines: ["Global Technology Expertise.", "A Different Approach to Partnership."],
  accent: "A Different Approach to Partnership.",
  body: [
    "Soft Suave brings AI solutions, software development and engineering expertise to small and mid-sized businesses through direct collaboration, flexible engagement and personalized attention.",
  ],
  points: ["Direct Access to Experts", "Flexible Engagement", "Faster Decisions"],
  pointsInline: true,
  ctas: [{ label: CTA_LABEL, href: BOOK_HREF_HERO }],
  // The masthead's one button, beside the logo (768px and up).
  logoCta: { label: CTA_LABEL, href: BOOK_HREF },
};

/**
 * Where the meeting form sends the visitor once the lead is accepted: this
 * campaign's own confirmation page, so its conversion can be told apart from
 * the site-wide /thank-you (`app/(marketing)/ad/thanks`). Its own route, not
 * nested under /ad/coffee-with-us (by request); no redirect from the old URL.
 */
export const CW_THANK_YOU_PATH = "/ad/thanks";

/** The confirmation page the form redirects to. */
export const cwThankYou = {
  meta: {
    path: CW_THANK_YOU_PATH,
    title: "Thank You | Have a Coffee With Us | Soft Suave",
    description: "Your meeting request with Soft Suave's CEO has been received. Our team will be in touch shortly.",
  },
  eyebrow: "Meeting Request Received",
  title: "Thank You for Connecting With Us.",
  body: [
    "We've received your meeting request and look forward to exploring how Soft Suave can support your business goals.",
    "Our team will be in touch shortly to arrange a convenient time for your conversation with our CEO, Ramesh Vayavuru.",
  ],
  next: {
    title: "What Happens Next?",
    items: [
      { icon: "mail", label: "Our team reviews your request" },
      { icon: "calendar", label: "We coordinate a convenient meeting time" },
      { icon: "coffee", label: "You connect directly with our CEO" },
    ],
  },
  signoff: "See You Over Coffee.",
  cta: { label: "Back to Homepage →", href: "/" },
  footerLine: "AI Solutions · Software Development · Engineering Expertise",
} as const;

/** The meeting-request card in the hero's right column. */
export const cwForm = {
  title: "Have a Coffee With Us",
  /** The host line beside the portrait at the top of the card. */
  hostLabel: "Ramesh Vayavuru · CEO",
  /** The meeting length — under the card's title, and on the CEO invitation's portrait tag. */
  meta: "30-minute virtual meeting",
  submit: "Request a Meeting →",
  sending: "Sending…",
  note: "We'll be in touch to arrange your meeting.",
  // Stored on the lead for triage, so these requests are told apart in the inbox.
  subject: "Ad landing: Have a Coffee With Us (CEO meeting request)",
  // Sent as the requirement when the visitor leaves the message box empty: the API needs one.
  fallbackRequirement: "Meeting request with the CEO (Have a Coffee With Us). No message added.",
} as const;

/** The proof row along the bottom of the hero. Specialists, clients and years are the site-wide figures. */
export const cwCredibility = [
  { figure: SPECIALISTS_PLUS, label: "AI-Enabled Developers" },
  { figure: "100%", label: "In-House Team" },
  { figure: "ISO/IEC", label: "27001:2022 Certified" },
  { figure: CLIENTS_PLUS, label: "Happy Clients Worldwide" },
  { figure: YEARS_PLUS, label: "Glorious Years of Service" },
] as const;


export const cwClients = {
  title: "Preferred Technology Partner for Startups and SMBs Globally",
  body: adClients.body,
} as const;

export const cwWhy: CardGridContent = {
  eyebrow: "The Soft Suave Difference",
  title: "Technical Expertise. A More Personalized Partnership.",
  body: "We combine strong engineering capabilities with the flexibility and accessibility that growing businesses need.",
  items: [
    {
      name: "Direct Access to Experts",
      body: "Work directly with experienced technology professionals and benefit from clearer communication.",
    },
    {
      name: "Flexible Engagement",
      body: "On-demand, dedicated or project-based engagement models aligned with business needs.",
    },
    {
      name: "Faster Decisions",
      body: "Agile collaboration and shorter feedback cycles to keep projects moving forward.",
    },
    {
      name: "Personalized Partnerships",
      body: "Technology partnerships tailored to small and mid-sized businesses.",
    },
  ],
  // No button in this section (removed by request).
};

export const cwCapabilities = {
  eyebrow: "Our Technology Expertise",
  title: "Technology Solutions Designed for Business Growth.",
  body: "From intelligent automation to custom software and dedicated engineering teams, we bring the expertise to support your next technology initiative.",
  items: [
    {
      name: "AI Solutions",
      body: "Intelligent automation and practical AI-powered business solutions.",
      points: ["AI Agents & Automation", "Generative AI", "Machine Learning", "Custom AI Applications"],
    },
    {
      name: "Software Development",
      body: "Reliable, scalable digital products and custom software.",
      points: ["Custom Software", "Web & Mobile Apps", "Enterprise Applications", "Digital Products"],
    },
    {
      name: "Engineering Expertise",
      body: "Experienced engineering professionals and flexible global delivery.",
      points: ["Dedicated Engineering Teams", "Cloud & DevOps", "IT Staff Augmentation", "Offshore Development"],
    },
  ],
} as const;

/** The four kept cards of `/ad/remote-developer`'s "Code & Practice", with their text and icons unchanged. */
const KEPT_PRACTICE = [
  "Agile, Transparent Development",
  "ISO-Certified Company",
  "100% In-House Team",
  "Global Trust, Local Execution",
];

export const cwStandards: CardGridContent = {
  ...rdPractice,
  eyebrow: "Our Delivery Standards",
  title: "Built on Expertise. Delivered With Confidence.",
  body: "Professional development practices, transparent communication and global delivery capabilities.",
  items: rdPractice.items
    .filter((item) => KEPT_PRACTICE.includes(item.name))
    // This page's own wording for the ISO card (by request); /ad/remote-developer keeps its own.
    .map((item) =>
      item.name === "ISO-Certified Company"
        ? { ...item, body: "We're an ISO/IEC 27001:2022 certified software development company." }
        : item,
    ),
  cta: undefined,
};

/**
 * Kept: Tim, Dimitris, Roland and Aaron. Dara Huang's review sells the free trial, so it goes.
 * Laid out as on the homepage (by request): its intro line fills the head's right half, so the
 * story slider runs full width beneath the head rather than being squeezed into that half.
 */
export const cwTestimonials = {
  eyebrow: "Client Experiences",
  title: "What Our Clients Say About Us.",
  body: adTestimonials.body,
  items: adTestimonials.items.filter((t) => !t.name.startsWith("Dara")),
};

/** The phrases running in the marquee above the CEO's invitation, each followed by a star. */
export const cwMarquee = ["Global Expertise", "Personalized Partnerships", "Shared Success"] as const;

export const cwInvite = {
  eyebrow: "Let's Start With a Conversation",
  /** The heading, with its last word set apart in the accent colour. */
  title: { lead: "Great Partnerships Begin With a", accent: "Conversation", end: "." },
  body: [
    "Get to know us, our capabilities and what we can achieve together.",
    "Whether you're exploring AI, planning a software initiative or looking for a reliable technology partner, we'd love to hear from you.",
  ],
  /** The three things the meeting covers (from the approved card design), each set in two lines beside its icon. */
  points: [
    { icon: "calendar", lines: ["30-Minute", "Discovery Call"] },
    { icon: "people", lines: ["Discuss Your", "Requirements"] },
    { icon: "target", lines: ["Get a Tailored", "Way Forward"] },
  ],
  cta: { label: "Book Your Meeting", href: BOOK_HREF },
  /** Set in exactly these two lines beside the button. */
  note: ["No obligation. Just a meaningful", "business conversation."],
  // The supplied cut-out portrait (transparent background), resized to 760px wide.
  photo: { src: "/images/landing/cw-ceo-ramesh-vayavuru.webp", width: 760, height: 913, alt: "Ramesh Vayavuru, CEO of Soft Suave Technologies" },
  caption: { name: "Ramesh Vayavuru", role: "CEO, Soft Suave Technologies" },
} as const;
