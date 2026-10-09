/**
 * Copy for the /free-cost-estimation page.
 *
 * SOURCE AND A DELIBERATE DEPARTURE — read this before editing.
 *
 * https://www.softsuave.com/free-cost-estimation is not a page in the sense
 * the rest of this surface uses the word. It is a two-card chooser: an H1
 * ("Get an Estimate of your Project") over two tiles, "Hire Developers" →
 * `/developer-estimation` and "Development" → `/mobile-app-estimation`. Both
 * targets are JavaScript-driven multi-step wizards that collect a project
 * brief one question at a time; neither wizard exists in this app, and
 * neither renders any content a crawler or a reader can see.
 *
 * Reproducing the chooser faithfully would ship a page whose entire body is
 * two links to routes we do not serve. So this page keeps the live page's JOB
 * — get me a costed plan before I commit — and states it the way every other
 * conversion page on this surface does: the shared hero enquiry form, plus the
 * content the wizard never gave a reader, which is what an estimate from us
 * actually contains and how it is produced.
 *
 * The two live paths are not dropped. They are the `estimatePaths` cards
 * below, which is honest about there being two different questions ("what
 * would a team cost" and "what would this product cost") without pretending a
 * wizard is behind them.
 *
 * WHEN THE WIZARDS ARE PORTED: give each `estimatePaths` item an `href` and
 * the cards start linking, with no other change to this file.
 *
 * Nothing here quotes a price. Soft Suave publishes indicative hourly rates on
 * the hire pages ($14/hour and up, per `hire-roles/*`), and those pages remain
 * the place that claim is made — a second, vaguer version of it here would be
 * the sort of number a reader holds us to.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { FaqContent } from "@/components/landing/faq";
import { partnerHeroBadges } from "./hero-badges";
import { sharedHeroAlert } from "./delivery-shared";

export const estimateMeta = {
  slug: "free-cost-estimation",
  path: "/free-cost-estimation",
  /* Rendered as `${title} | Soft Suave` — no brand name here. */
  title: "Free Cost Estimation — Get a Costed Plan for Your Project",
  shortTitle: "Free Cost Estimation",
  description:
    "Tell us what you are building and we come back with an approach, a timeline and an indicative estimate — at no cost, under NDA, within one business day.",
} as const;

export const estimateHero: HeroContent = {
  titleLines: ["Get an estimate", "of your project"],
  body: [
    "Share the outcome you are after and we come back with how we would build it, how long it would take, and what it would cost — before you commit to anything.",
    "The estimate is free, it is prepared by the engineers who would do the work rather than by a sales desk, and everything you send stays under NDA.",
  ],
  points: [
    "An approach, a timeline and an indicative cost",
    "Prepared by engineers, not a sales desk",
    "Reply within one business day",
    "Everything under NDA, on request before you share",
    "No obligation to proceed",
  ],
  badges: partnerHeroBadges,
  form: {
    eyebrow: "Free Estimate",
    title: "Get a rough quote in 24 hrs",
    note: sharedHeroAlert.text,
    noteLink: { label: sharedHeroAlert.linkLabel, href: sharedHeroAlert.href },
    submit: "Get my estimate",
    sending: "Sending...",
    requirementLabel: "What do you want to cost?",
    requirementPlaceholder:
      "What you want built or who you want to hire, what it has to run on, roughly when you need it, and anything already in place that it has to work with.",
    subject: "Free cost estimation enquiry",
  },
};

/**
 * The two questions the live site splits its wizards across. No `href` until
 * the wizards exist here — see the header note.
 */
export const estimatePaths: CardGridContent = {
  eyebrow: "Two ways to ask",
  title: "What are you trying to cost?",
  body: "The two questions need different answers, so tell us which one you are asking and the estimate comes back shaped for it.",
  items: [
    {
      tag: "Team",
      name: "Hire developers",
      body: "You know what you are building and need the people. Tell us the roles, the seniority and the overlap hours you need, and the estimate is a monthly run rate per role with a start date against each one.",
      icon: "users",
    },
    {
      tag: "Product",
      name: "Build a product",
      body: "You have an outcome and need it built. Tell us what it has to do and who for, and the estimate is a phased build — scope per phase, the team shape behind it, and a cost and duration for each.",
      icon: "rocket",
    },
  ],
};

export const estimateProcess: ProcessContent = {
  eyebrow: "How it works",
  title: "From your brief to a costed plan",
  body: "Four steps, and the longest of them is the one where we are reading rather than writing.",
  steps: [
    {
      n: "01",
      name: "You send the brief",
      body: "The form above, or an email. However rough it is — a paragraph is enough to start, and an NDA goes out first if you would rather it did.",
    },
    {
      n: "02",
      name: "We read it properly",
      body: "An engineer who would work on it reads the brief, and comes back with the questions that actually change the number rather than a generic discovery call.",
    },
    {
      n: "03",
      name: "We scope and cost it",
      body: "Approach, architecture, the team shape it needs, and the phases it breaks into — with a duration and an indicative cost against each phase.",
    },
    {
      n: "04",
      name: "You decide",
      body: "The plan is yours whether or not you engage us. There is no obligation, and nothing you sent is retained if you ask us to delete it.",
    },
  ],
};

export const estimateFaq: FaqContent = {
  eyebrow: "Before you ask",
  title: "Questions about the estimate itself",
  body: "What the estimate covers, how long it takes, and what happens to your brief if you decide not to go ahead.",
  items: [
    {
      q: "Is the estimate really free?",
      a: "Yes, and there is no obligation attached to it. The plan we send is yours to take elsewhere if you would rather build it with someone else, or in-house.",
    },
    {
      q: "How accurate is an indicative estimate?",
      a: "It is as accurate as the brief allows, which is why the second step is questions rather than a quote. A well-specified phase is usually costed within a narrow band; a phase that depends on integrating a system we have not seen carries a range, and we say which is which rather than averaging them into one confident-looking number.",
    },
    {
      q: "How long does it take?",
      a: "We reply within one business day. A full costed plan follows once the questions are answered — typically two to four working days for a product build, and same-day for a team-hire estimate where the roles are clear.",
    },
    {
      q: "Will you sign an NDA before I share anything?",
      a: "Yes. Ask in the form and the NDA goes out before you send a brief, rather than after. Commercial information is handled under our ISO/IEC 27001:2022-certified management system either way.",
    },
    {
      q: "Do you publish rates?",
      a: "Dedicated hire rates start at $14/hour and vary by role and seniority; the hire pages state the range per skill. A product build is not costed hourly, so it is estimated per phase instead.",
      link: {
        label: "See hire rates by role",
        href: "/hire-dedicated-developers",
        tail: "for the per-skill breakdown.",
      },
    },
    {
      q: "What happens to my brief if I do not proceed?",
      a: "It stays confidential under the NDA, and it is deleted on request. We do not reuse a brief as a case study or a template without written permission.",
    },
  ],
};
