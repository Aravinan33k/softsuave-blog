/**
 * Copy for the /life-at-softsuave page — the culture page.
 *
 * SOURCE: https://www.softsuave.com/life-at-softsuave, section for section:
 *
 *   H1 "Living it Up at Soft Suave" / "Where Work and Play Collide"  → `lifeHero`
 *   "Passionate Work, Playful Connections…" + its paragraph          → `lifeOverview`
 *   "Driven by Purpose" — Envision / Leverage / Infinite             → `lifePurpose`
 *   "Perks of being a Soft Suave" — eight perks                      → `lifePerks`
 *   "Imagination at Work…" — five cards                              → `lifePractice`
 *   "Awards & Certifications"                                        → the shared
 *                                                                      `Recognitions`
 *                                                                      band
 *
 * The awards row is NOT restated here. The live page shows eleven directory
 * badges; `content.ts`'s `recognitions` is the one list of accolades the whole
 * site reads, so this page renders that band rather than publishing a second,
 * driftable copy of what we have won.
 *
 * ONE ADDITION TO THE LIVE COPY: the eight perks are bare labels there — icon
 * plus a two- or three-word caption, no explanation. Eight unexplained labels
 * is not a section, so each carries one factual line here. They state only
 * what the perk is, never how good it is; nothing below claims a benefit the
 * company has not published elsewhere on the site or in this repo.
 */

import type { CardGridContent } from "@/components/landing/industries";
import type { OverviewContent } from "@/components/landing/overview";
import type { CtaBandContent } from "@/components/landing/cta-band";

export const lifeMeta = {
  slug: "life-at-softsuave",
  path: "/life-at-softsuave",
  /* Rendered as `${title} | Soft Suave` — the brand name must not repeat. */
  title: "Life at Soft Suave — Culture, Perks and People",
  shortTitle: "Life at Soft Suave",
  description:
    "What working at Soft Suave is actually like: a five-day week, onsite opportunities, a referral programme, and a team of 400+ engineers across Chennai and Bengaluru.",
} as const;

export const lifeHero = {
  eyebrow: "Life at Soft Suave",
  title: "Living it up at Soft Suave",
  intro: "Where work and play collide.",
} as const;

export const lifeOverview: OverviewContent = {
  eyebrow: "Our People",
  title: "Passionate work, playful connections",
  paragraphs: [
    "Soft Suave meticulously selects team members who share our values. We offer a freedom-oriented approach, empowering you to achieve results your way.",
    "Here you will find the tools, infrastructure and support you need to grow your career — and the company celebrates what it achieves rather than quietly moving on to the next thing.",
  ],
};

/**
 * "Driven by Purpose" — the live page's three-word value set, with its own
 * wording for each.
 */
export const lifePurpose: CardGridContent = {
  eyebrow: "Driven by Purpose",
  title: "Three things we ask of every team",
  body: "The values the hiring bar is set against, and the ones the work is reviewed against afterwards.",
  items: [
    {
      name: "Envision",
      icon: "compass",
      body: "We make it easy for teams to work together and design user interfaces that are smooth and effective.",
    },
    {
      name: "Leverage",
      icon: "spark",
      body: "We bring out your best, crafting cutting-edge digital experiences that win for our clients.",
    },
    {
      name: "Infinite",
      icon: "cycle",
      body: "We unleash your creativity, so you can design solutions that adapt and thrive in any situation.",
    },
  ],
};

/**
 * The eight perks the live page lists. Labels are its own; the supporting line
 * on each is written here — see the header note.
 */
export const lifePerks: CardGridContent = {
  eyebrow: "Perks@SoftSuave",
  title: "Perks of being a Soft Suave",
  body: "What the employment actually comes with, beyond the role itself.",
  items: [
    {
      name: "5 Days a Week",
      body: "Monday to Friday. Weekends are yours, and the delivery schedule is planned around that rather than into it.",
    },
    {
      name: "Employee First",
      body: "Decisions that affect how you work are made with the team they affect, not announced to it.",
    },
    {
      name: "Rewards & Benefits",
      body: "Performance is recognised formally, not only in an annual review cycle.",
    },
    {
      name: "Fun Connect",
      body: "Company celebrations, team outings and the workplace happy hours the culture is known for.",
    },
    {
      name: "Advanced Resources",
      body: "The tooling, licences and infrastructure to do the work properly, including on AI and cloud platforms.",
    },
    {
      name: "Onsite Opportunities",
      body: "Client-facing travel for engagements that need it, across the US, EU and MEA regions we deliver into.",
    },
    {
      name: "Referral Program",
      body: "Bring in someone good and you are paid for it. Much of the bench was hired this way.",
    },
    {
      name: "Positive Environment",
      body: "A workplace built so people stay — which is why the average tenure here is measured in years.",
    },
  ],
};

/**
 * "Imagination at Work. Robust Software Engineering in Practice." — five cards,
 * each the live page's own heading and sentence.
 */
export const lifePractice: CardGridContent = {
  eyebrow: "Connecting the Dots",
  title: "Imagination at work, software engineering in practice",
  body: "How the culture shows up in the delivery, rather than only in the office.",
  items: [
    {
      tag: "Craft",
      name: "Creative Coding",
      body: "A positive work environment fosters a thriving creative culture for our coders.",
    },
    {
      tag: "People",
      name: "Digital Diversity",
      body: "We champion a diverse workforce, united by a shared commitment to employee satisfaction and exceptional digital solutions.",
    },
    {
      tag: "Delivery",
      name: "Seamless Execution",
      body: "A positive work environment facilitates smooth collaboration and efficient project execution.",
    },
    {
      tag: "Process",
      name: "Proven Processes",
      body: "We maintain high employee satisfaction through established, effective work processes.",
    },
    {
      tag: "Growth",
      name: "Meta Morphism",
      body: "We support continuous professional growth and development — a team where work and play intertwine.",
    },
  ],
};

export const lifeMidCta: CtaBandContent = {
  eyebrow: "Join us",
  title: "Ready to work somewhere like this?",
  body: "Open roles across engineering, design, people and growth, at the Chennai and Bengaluru delivery centres.",
  cta: { label: "See open roles", href: "/career-overview" },
};
