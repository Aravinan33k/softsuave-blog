/**
 * Content shared by the 24 "Hire <skill> Developers" landing pages.
 *
 * Those pages differ in exactly one dimension — the technology — and are
 * identical in every other respect: the same engagement models, the same hiring
 * process, the same vetting standard, the same commercial terms. Writing that
 * out 24 times would guarantee the copies drift apart, and the first thing to go
 * stale would be the commercial detail, which is the part a buyer acts on.
 *
 * So the shared half lives here, the per-technology half lives in
 * `hire-skills.ts`, and `hire-content.ts` composes the two into the content
 * objects the landing components take. Nothing in this file names a technology.
 *
 * Company-level proof (testimonials, case studies, stats) is deliberately NOT
 * here: these pages render the homepage's own components for that, the same way
 * the delivery pages do — see the note at the top of `delivery-shared.ts`.
 */

import type { CardGridContent } from "@/components/landing/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqItem } from "@/components/landing/faq";
import type { ProcessContent } from "@/components/landing/process";
import { sharedHeroBadges } from "./delivery-shared";

/** Hero trust badges. The delivery pages' set, unchanged — same company facts. */
export const hireHeroBadges = sharedHeroBadges;

/**
 * How an engagement is structured. These are the three shapes Soft Suave
 * actually contracts in, so the page can be specific rather than inviting the
 * reader to "contact us to discuss models".
 */
export const hireEngagementModels: CardGridContent = {
  eyebrow: "Engagement Models",
  title: "Three Ways to Engage the Team",
  body: "Which one fits depends on how well-defined the work is and how long you need the capacity, not on the size of your company.",
  items: [
    {
      name: "Dedicated Developer",
      tag: "Monthly",
      body: "One or more engineers working only on your product, full-time, reporting into your leads and attending your ceremonies. Billed monthly per engineer. Suited to ongoing product work where the backlog outlives any single project.",
    },
    {
      name: "Team Extension",
      tag: "Monthly",
      body: "A squad added to your existing team — developers plus the QA, DevOps, and design capacity the work actually needs. You keep architectural ownership; we cover the delivery capacity you are short of.",
    },
    {
      name: "Fixed-Scope Project",
      tag: "Per project",
      body: "A defined deliverable with an agreed scope, milestone plan, and price. Appropriate when the requirement is genuinely stable — and we will say so when it is not, because a fixed price on a moving scope helps nobody.",
    },
  ],
};

/**
 * The hiring sequence, from first call to a developer working in your repo.
 *
 * Deliberately includes the trial period as a numbered step: it is the first
 * question every buyer asks, and burying it in the FAQ reads as evasive.
 */
export const hireProcess: ProcessContent = {
  eyebrow: "How Hiring Works",
  title: "From First Call to a Developer in Your Repo",
  body: "Five steps, typically two weeks end to end. You interview every candidate yourself, and nobody joins your team without your approval.",
  steps: [
    {
      n: "01",
      image: {
        src: "/images/four/hire-step-1.webp",
        width: 1200,
        height: 900,
        alt: "Share the Requirement — hiring a developer through Soft Suave",
      },
      name: "Share the Requirement",
      body: "A 30-minute call covering the product, the stack, the seniority you need, and how the engineer will work alongside your existing team. Covered by NDA before anything technical is discussed.",
    },
    {
      n: "02",
      image: {
        src: "/images/four/hire-step-2.webp",
        width: 1200,
        height: 900,
        alt: "Receive a Shortlist — hiring a developer through Soft Suave",
      },
      name: "Receive a Shortlist",
      body: "We come back within three to five business days with matched profiles — real availability, real project experience, and the reasoning behind each match rather than a stack of CVs for you to filter.",
    },
    {
      n: "03",
      image: {
        src: "/images/four/hire-step-3.webp",
        width: 1200,
        height: 900,
        alt: "Interview the Candidates — hiring a developer through Soft Suave",
      },
      name: "Interview the Candidates",
      body: "You run your own technical interviews, take-home exercises, and pairing sessions. We do not gate this or ask you to accept our assessment in place of your own.",
    },
    {
      n: "04",
      image: {
        src: "/images/four/hire-step-4.webp",
        width: 1200,
        height: 900,
        alt: "Trial Period — hiring a developer through Soft Suave",
      },
      name: "Trial Period",
      body: "The selected engineer starts on a two-week trial against real tickets. If the fit is wrong you are not billed for the trial, and we go back to step two.",
    },
    {
      n: "05",
      image: {
        src: "/images/four/hire-step-5.webp",
        width: 1200,
        height: 900,
        alt: "Onboard and Deliver — hiring a developer through Soft Suave",
      },
      name: "Onboard and Deliver",
      body: "Accounts, access, and environments set up in your systems, working to your branch strategy, your review process, and your definition of done. Invoicing starts once the engineer is delivering.",
    },
  ],
};

/**
 * Why this partner rather than another. Each item is a commitment that can be
 * verified or contracted — an adjective like "passionate" belongs nowhere near
 * a page a CTO is evaluating.
 */
export const hireWhyUs: CardGridContent = {
  eyebrow: "Why Soft Suave",
  title: "What You Are Actually Buying",
  body: "Contracted developers are easy to find and hard to keep productive. These are the things that decide which of the two you end up with.",
  items: [
    {
      name: "You Own the IP",
      icon: "book",
      tag: "Contract",
      body: "All source code, designs, and documentation are yours from the moment they are written — assigned in the contract rather than on final payment. An NDA is in place before the first technical conversation.",
    },
    {
      name: "You Interview and Approve",
      icon: "users",
      tag: "Control",
      body: "No engineer joins your team without passing your own technical bar. If someone is not working out we replace them, and the trial period exists so that decision costs you nothing.",
    },
    {
      name: "Real Timezone Overlap",
      icon: "globe",
      tag: "Working hours",
      body: "Teams work a shift with a guaranteed four-hour overlap with US, UK, or Australian business hours, so code review, standups, and escalation happen the same day rather than the next one.",
    },
    {
      name: "Engineers, Not Placements",
      icon: "gauge",
      tag: "Retention",
      body: "Our developers are salaried employees on a bench we maintain, not contractors sourced per requirement. That is why they can start in days, and why they stay on your project once they have.",
    },
    {
      name: "ISO 27001 Security",
      icon: "shield",
      tag: "Compliance",
      body: "An ISO/IEC 27001:2022-certified information security management system, with access control, device management, and code-handling practice audited against it rather than described in a slide.",
    },
    {
      name: "No Lock-In",
      icon: "coins",
      tag: "Commercial",
      body: "Monthly engagements with a 30-day notice period. Documentation and handover are part of the engagement rather than a paid extra at the end — leaving should be as clean as arriving.",
    },
  ],
};

/**
 * Commercial comparison of the three engagement models.
 *
 * The first column takes the coral accent (see `ComparisonContent.columns`), so
 * "Dedicated Developer" leads — it is the model these pages are selling.
 */
/** Mid-page conversion band. Generic by design — it sits between two sections. */
export const hireMidCta: CtaBandContent = {
  eyebrow: "Start With a Shortlist",
  title: "See Who Is Available This Week",
  body: "Tell us the role and the stack, and we will come back within three to five business days with matched profiles, real availability, and indicative rates. No obligation, and everything under NDA.",
  cta: { label: "Request a shortlist", href: "#enquiry" },
};

/**
 * FAQs about the engagement itself, appended after each page's own
 * technology-specific questions. These are the commercial and contractual
 * questions, which do not change with the stack.
 */
export const hireSharedFaqs: readonly FaqItem[] = [
  {
    q: "How quickly can a developer start?",
    a: "Typically two weeks from the first call: three to five business days to produce a shortlist, then your interviews and onboarding. Where we already have a matching engineer on the bench it can be under a week. The constraint is usually your own interview scheduling rather than our availability, so stating the seniority and the stack precisely on the first call is the single thing that shortens it most.",
  },
  {
    q: "What if the developer is not a good fit?",
    a: "The engagement starts with a two-week trial against real tickets. If the fit is wrong within that window you are not billed for it and we return to the shortlist. After the trial, replacement is still available on 30 days' notice with a handover period — the alternative, a mismatched engineer nobody wants to raise, costs far more than the replacement does.",
  },
  {
    q: "Who owns the code and the intellectual property?",
    a: "You do, from the moment it is written. IP assignment sits in the master services agreement rather than being conditional on final payment, and it covers source code, designs, documentation, and derivative work. An NDA is signed before the first technical conversation, so your architecture and roadmap are protected before you describe them.",
  },
  {
    q: "How do you handle timezone differences?",
    a: "Teams work a shift with a guaranteed four-hour overlap with your business hours, whether that is US, UK, European, or Australian time. That window is used deliberately for standups, code review, and anything needing a decision; asynchronous work fills the rest. The practical test is whether a blocked ticket waits hours or a full day — the overlap is what keeps it to hours.",
    link: {
      label: "Book a free consultation",
      href: "https://www.softsuave.com/30-min-free-consultation",
      tail: "to confirm the overlap against your team's hours.",
    },
  },
  {
    q: "What does it cost?",
    a: "Rates depend on seniority, the engagement model, and the length of the commitment, so a single published number would be misleading. We give indicative rates alongside the first shortlist, once the role is known — and they are all-in, covering salary, infrastructure, management, and benefits, with no separate recruitment fee and no charge for the trial period.",
  },
  {
    q: "Can we scale the team up or down later?",
    a: "Yes, and most engagements do. Adding capacity follows the same shortlist-and-interview route, usually faster because we already know your codebase and standards. Reducing it takes 30 days' notice per engineer. The one thing we will push back on is scaling down mid-delivery on a fixed-scope project, where the lost context costs more than the saving.",
  },
  {
    q: "How do you keep quality consistent?",
    a: "Through the same practice on every engagement rather than each individual's own habits: code review on every pull request, an agreed definition of done, automated tests running in CI, and a technical lead accountable for the output. You see the same repository, board, and pipeline we do — there is no separate internal view of progress that gets summarised for you.",
  },
];
