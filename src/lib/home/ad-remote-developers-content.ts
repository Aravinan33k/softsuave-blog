/**
 * Copy for `/ad/remote-developers` — a clone of softsuave.com/ad/remote-developers,
 * the paid-traffic landing page for hiring remote developers.
 *
 * Only what the live page RENDERS, word for word. Live order: masthead (a trial
 * button beside the logo) · hero (no form) · clients · top talent + four figures ·
 * why choose us + closing line · services + "Ready to discuss?" · "Scale Your
 * Developer Team On-Demand" · technology stack · code & practice · process (4
 * steps) · experts (twenty "Hire Now" cards) · testimonials. The popup behind
 * every trial and "Hire Now" button is the live "Trusted by Startups &
 * Enterprises Worldwide" two-column popup with its "Staffing gaps?" form.
 *
 * The clients, the why-choose-us and services cards, the technology stack, the
 * code & practice cards, the four steps, the experts, the testimonials and the
 * popup are word for word the live /ad/remote-developer page's, so they are
 * reused from it. The trial duration is 40 hours everywhere, as on this site's
 * other /ad pages.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { TopTalentContent } from "@/components/ad/top-talent";
import type { FeatureAccordionContent } from "@/components/common/feature-accordion";
import type { ProcessContent } from "@/components/landing/process";
import type { PracticeShowcaseContent } from "@/components/ad/practice-showcase";
import type { IconKey } from "@/lib/home/icon-for";
import { AD_TRIAL_CTA, BOOK_MEETING, TRIAL_HREF } from "@/lib/home/ad-app-developer-content";
import {
  rdClients,
  rdExperts,
  rdPopup,
  rdPractice,
  rdProcess,
  rdServices,
  rdServicesCta,
  rdTech,
  rdTestimonials,
  rdWhy,
  rdWhyClosing,
} from "@/lib/home/ad-remote-developer-content";
import { CLIENTS_PLUS, FIGURES, SPECIALISTS_PLUS, YEARS_PLUS } from "@/lib/company-figures";

export const rsMeta = {
  path: "/ad/remote-developers",
  // The live page's <title> and description, verbatim.
  title: "Hire Remote Developers on Contract",
  description: `Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $${FIGURES.hourlyRate}. Connect with us to get started!`,
} as const;

export { TRIAL_HREF };
export const rsClients = rdClients;
export const rsWhy = rdWhy;

/**
 * Why Choose Us as an accordion beside a photo (review: the field-tracking
 * page's "Features That Redefine Field Performance" structure). Same head
 * and the same five points, word for word; each point's line is its copy
 * and each carries its own photo and badge glyph.
 */
const WHY_MEDIA: readonly { icon: IconKey; src: string; alt: string; width: number; height: number }[] = [
  { icon: "award", src: "/images/landing/ov-hire-web-app-developers-v2.webp", alt: "A developer writing code on a laptop", width: 1448, height: 1086 },
  { icon: "handshake", src: "/images/landing/ov-global-capability-center.webp", alt: "A team working together around a table with laptops", width: 1400, height: 1050 },
  { icon: "globe", src: "/images/landing/why-ad-remote-developers-global-delivery.webp", alt: "A developer on a video call with a remote team, clocks for U.S., U.K. and India time zones on the wall", width: 640, height: 480 },
  { icon: "rocket", src: "/images/landing/why-ad-remote-developers-faster-time-to-market.webp", alt: "A development team reviewing a sprint board together around a laptop", width: 640, height: 480 },
  { icon: "eye", src: "/images/landing/why-ad-remote-developers-full-transparency.webp", alt: "Two people reviewing a project cost breakdown on a laptop and a printed summary", width: 640, height: 480 },
];
export const rsWhyFeatures: FeatureAccordionContent = {
  eyebrow: rdWhy.eyebrow,
  title: rdWhy.title,
  body: rdWhy.body,
  items: rdWhy.items.map((it, i) => {
    const { icon, ...image } = WHY_MEDIA[i % WHY_MEDIA.length];
    return { name: it.name, paragraphs: [it.body], icon, image };
  }),
};
export const rsWhyClosing = rdWhyClosing;
export const rsServices = rdServices;
export const rsServicesCta = rdServicesCta;
export const rsTech = rdTech;
export const rsPractice = rdPractice;

/**
 * "Code & Practice" as photo-backed cards closing on a CTA card (review,
 * from a reference). The same head and the same seven points, word for word,
 * each with a line icon and a darkened site photo. The closer books a
 * meeting.
 */
const PRACTICE_VISUALS = [
  ["code", "ov-hire-reactjs-developers"],
  ["shield", "practice-iso-27001-crop"],
  ["users", "ov-offshore-software-development-company"],
  ["house", "ov-product-engineering-services"],
  ["layers", "ov-hire-dot-net-developers"],
  ["settings", "ov-hire-python-developers"],
  ["globe", "ov-hire-mern-stack-developers-india"],
] as const;
/** Lines reworded for these cards only (review); the coffee page keeps the originals. */
const PRACTICE_BODY: Readonly<Record<string, string>> = {
  "ISO-Certified Company": "We're an ISO/IEC 27001:2022 certified software development company.",
};
export const rsPracticeShowcase: PracticeShowcaseContent = {
  eyebrow: rdPractice.eyebrow,
  title: rdPractice.title,
  body: rdPractice.body,
  items: rdPractice.items.map((it, i) => {
    const [icon, file] = PRACTICE_VISUALS[i % PRACTICE_VISUALS.length];
    return { name: it.name, body: PRACTICE_BODY[it.name] ?? it.body, icon, image: "/images/landing/" + file + ".webp" };
  }),
  closer: {
    eyebrow: "Ready to build together?",
    lines: ["Your Vision.", "Our Development."],
    body: "Let’s turn your ideas into scalable, high-performing solutions.",
    cta: { label: "Book a Strategy Call", href: BOOK_MEETING.href, external: true },
  },
};
export const rsProcess = rdProcess;
export const rsExperts = rdExperts;
export const rsTestimonials = rdTestimonials;

/** The live masthead and hero: no form, a "Start … OR Book a Meeting" pair and three chips. */
export const rsHero: HeroContent = {
  titleLines: ["Hire Remote Developers"],
  accent: "Remote",
  body: [
    "Hire dedicated remote developers to boost your project with expert skills, flexible hiring models, and cost-effective, scalable software development solutions",
  ],
  // Review: the hero centred, its points in one row with a rule between them.
  centered: true,
  pointsInline: true,
  points: ["Flexible Engagement Models", "Strict NDA", "40 Hours Risk Free Trial"],
  // A full-bleed backdrop, set up like the frontend page's hero (review).
  // The black veil rather than "strong": this photo is already dark and the
  // copy is centred, so the left-weighted strong veil buried it. Held still,
  // as the frontend hero does not drift.
  image: {
    src: "/images/landing/ad-remote-developers-hero.webp",
    width: 2400,
    height: 1200,
    alt: "A developer at a desk with four monitors of code, a city skyline at night through the window",
    blurDataURL:
      "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAAAQAgCdASoQAAgAA4BaJQBOgCPsw2dZqVlAAP7ytRTqzJFW70bCWk8ycIim3yLg1sNIIMlXyfmcyeEVk2EAAA==",
    veil: "dark",
    still: true,
  },
  ctas: [AD_TRIAL_CTA, BOOK_MEETING],
  ctaSeparator: "OR",
  logoCta: AD_TRIAL_CTA,
};

export const rsTalent: TopTalentContent = {
  eyebrow: "Top Talent",
  title: "Hire Remote Developers For All Your Tech Needs",
  body: "Access top-tier remote developers on contract to seamlessly scale your team and meet all your technology requirements with flexibility and expertise.",
  models: [
    { name: "Engagement Models Aligned With Your Requirements" },
    { name: "Trusted By Businesses Across The World Since 2012" },
    { name: "Real Time Collaboration With Your Preferred Tools" },
    { name: "Replacement Guarantee For Developers’ Performance Concerns" },
    { name: "Dedicated Account Manager for Streamlined Communication" },
  ],
  // A photo beside the models, as a two-column band (review: "better variation with add the image").
  image: {
    src: "/images/landing/ov-hire-dedicated-developers.webp",
    alt: "A team of developers collaborating around a laptop in front of a large screen",
    width: 1400,
    height: 1050,
    blurDataURL:
      "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAADwAQCdASoQAAwAAsBMJYwC7AYtKwXp2jAA/vBxwfB6hApJdcbqjd8bVrd8+iUXN96X+F30aQtUirTlFg/6+Okhp6maYt7Z0Vfsc4dKnoXvXkSK5UYEHv0Syc+A/DRT0FWYZtzgHSYq/AAA",
    // Not a figure the stats strip under it already shows.
    badge: { figure: "40 hrs", label: "Risk-Free Trial" },
  },
  cta: AD_TRIAL_CTA,
  statsLast: true,
  stats: [
    { figure: YEARS_PLUS, label: "Glorious Years of Service" },
    { figure: CLIENTS_PLUS, label: "Happy Clients Worldwide" },
    { figure: SPECIALISTS_PLUS, label: "AI-Powered Developers" },
    { figure: "97%", label: "Client Retention Rate" },
  ],
};

export const rsScaleBand: CtaBandContent = {
  title: "Scale Your Developer Team On-Demand",
  body: "With SoftSuave, you can add remote developers as needed, ensuring faster iteration and predictable growth at reduced costs.",
  cta: AD_TRIAL_CTA,
};

/*
 * Image visuals (review: "make the page creative, add image visuals").
 * Every photo is one the site already serves; none repeats a photo used
 * elsewhere on this page.
 */

/** The four hiring steps, each with a photo of that stage. */
const PROCESS_PHOTOS = [
  { src: "/images/landing/process-step-share-jd.webp", alt: "Two people reviewing project wireframes on a tablet and noting requirements" },
  { src: "/images/landing/process-step-shortlist.webp", alt: "A team reviewing and comparing shortlisted developer profiles on a laptop and a tablet" },
  { src: "/images/landing/dl-hire-backend-application-developer.webp", alt: "A developer writing code at a desk with two screens" },
  { src: "/images/landing/process-step-onboard.webp", alt: "Two people in suits shaking hands to close an agreement" },
];
export const rsProcessPhotos: ProcessContent = {
  ...rdProcess,
  steps: rdProcess.steps.map((step, i) => ({
    ...step,
    image: { ...PROCESS_PHOTOS[i % PROCESS_PHOTOS.length], width: 1400, height: 1050 },
  })),
};

/**
 * What every "Start 40 Hours Free Trial" and "Hire Now" button opens — the live
 * page's two-column popup, the same as the remote-developer page's with this
 * page's lead subject.
 */
export const rsPopup = {
  side: rdPopup.side,
  form: { ...rdPopup.form, subject: "Ad landing: Staffing gaps enquiry (remote developers, masthead page)" },
};
