/**
 * Copy for the /faqs index — the company-wide FAQ.
 *
 * Every other page on this surface carries its own FAQ about its own subject;
 * this is the general one softsuave.com publishes, and the questions and
 * substance below are that page's, in its three groups (General, Project
 * Development, Hire Developer).
 *
 * THREE ANSWERS DEPART FROM THE LIVE PAGE ON PURPOSE, because the live page is
 * stale against facts this repo already states:
 *
 *   - Offices. Live says "two development centres (Chennai and Bangalore) and
 *     one sales office in Maryland". `content.ts` publishes Washington, DC and
 *     Chennai (Navalur), which is also what the footer renders on every page.
 *     Shipping the live wording would put two different office lists on one
 *     site. Both answers that name locations are rewritten against
 *     `content.ts`.
 *   - ISO. Live claims ISO 9001:2015. The certification this repo holds artwork
 *     for and the footer displays is ISO/IEC 27001:2022 (information security),
 *     with the 9001 seal a smaller, older asset. The answer names 27001.
 *
 * Answers are otherwise the live page's own, tightened to the house voice and
 * with its mangled apostrophes repaired.
 */

import type { FaqContent } from "@/components/landing/faq";

export const faqsPageMeta = {
  slug: "faqs",
  path: "/faqs",
  title: "Frequently Asked Questions",
  shortTitle: "FAQs",
  description:
    "How Soft Suave works — services, offices and hours, how projects are scoped and priced, NDAs and confidentiality, and what hiring dedicated developers involves.",
} as const;

export const faqsPageHero = {
  eyebrow: "FAQs",
  title: "Questions we are asked before every engagement",
  intro:
    "Grouped the way they tend to arrive: what we do, how a project runs, and what hiring a dedicated team actually involves. If yours is not here, the form at the foot of this page reaches a person.",
} as const;

/** What the company is, where it is, and how to reach it. */
export const faqsGeneral: FaqContent = {
  eyebrow: "General",
  title: "About Soft Suave",
  body: "The company, the team and the working arrangements.",
  items: [
    {
      q: "What services does Soft Suave provide?",
      a: "Custom software, web and mobile application development for startups, SMBs and enterprise teams, plus AI and data engineering. We also place dedicated developers directly into client teams.",
      link: { label: "See all services", href: "/ai-development-service" },
    },
    {
      q: "Where are Soft Suave's offices?",
      a: "Our development centre is in Chennai, India — 5th Floor, SSPDL Building, Alpha City, Gamma Block, Navalur 603103. Our US office is at 3030 K Street NW, Suite 102, Washington, DC 20007.",
    },
    {
      q: "What are your working hours?",
      a: "Five days a week, forty hours. In practice teams overlap with the client's working day rather than ours, and we stay reachable outside those hours when a release needs it.",
    },
    {
      q: "How can I get in touch?",
      a: "Email, phone or the enquiry form on any page. Enquiries reach a person rather than a queue, and we aim to reply within one business day.",
      link: { label: "Contact us", href: "/contact" },
    },
    {
      q: "How large is the team?",
      a: "Over 400 engineering specialists, with 13+ years of delivery behind them and work shipped for 150+ clients across 20+ countries.",
    },
    {
      q: "Will you work to our standards and methodology?",
      a: "Yes. Where a client has an established process — their sprint cadence, their review gates, their tooling — our team adopts it rather than imposing ours. Where there is no process yet, we bring one.",
    },
  ],
};

/** How an engagement is scoped, priced, protected and supported. */
export const faqsProject: FaqContent = {
  eyebrow: "Project Development",
  title: "How a project runs",
  body: "Scoping, pricing, confidentiality and what happens after launch.",
  items: [
    {
      q: "Can I get a rough idea of cost before committing?",
      a: "Yes. Send the requirement and we will come back with an estimate — a range on cost and duration — before any contract exists.",
    },
    {
      q: "What is the difference between an estimate and a proposal?",
      a: "An estimate is a range on cost and time, enough to decide whether to proceed. A proposal is the full document: specifications, methodology, schedule, deliverables and milestones.",
    },
    {
      q: "What do you need from me to prepare a proposal?",
      a: "Whatever you already have — technical documents, specifications, designs, or just a written description of the problem. We would rather read an incomplete brief than send you away to write a perfect one.",
    },
    {
      q: "Can I trial your work before committing to a large project?",
      a: "Yes. Most clients start with a pilot — a small, bounded piece of the work at minimal or no cost — and scale up once they have seen how the team performs.",
    },
    {
      q: "How do you protect confidentiality?",
      a: "An NDA is signed before requirements are discussed, not after. Every member of the delivery team is under a separate confidentiality agreement, so the protection follows the individuals doing the work.",
    },
    {
      q: "What are the risks of developing offshore?",
      a: "The two that matter are communication and confidentiality. Both are addressed structurally: a named project manager you can reach directly, working hours that overlap yours, and the NDA arrangement above.",
    },
    {
      q: "How do I know the work is progressing?",
      a: "A named project manager, an agreed cadence of demos, and direct access to the team. If something is off track you should hear it from us before you notice it yourself.",
    },
    {
      q: "What do you expect from us during the project?",
      a: "Availability to answer questions, and honest feedback at each review rather than saved up for the end. Projects go wrong most often because a concern went unspoken for a month.",
    },
    {
      q: "Do you provide support after launch?",
      a: "Yes. A support period is included in the project contract. Beyond that, monthly or quarterly support contracts are available.",
    },
    {
      q: "How do you assure quality?",
      a: "ISO/IEC 27001:2022 certified processes, code review and QA built into the delivery cadence rather than bolted on at the end.",
      link: { label: "See our certifications", href: "/awards-recognition" },
    },
    {
      q: "Can you provide client references?",
      a: "Yes. We can put you in touch with clients working in a similar domain or at a similar stage.",
      link: { label: "See our clients", href: "/clients" },
    },
    {
      q: "Can we outsource work our own clients gave us?",
      a: "Yes. We work as a white-label delivery partner for agencies and consultancies, and treat their clients' confidentiality exactly as we treat theirs.",
    },
  ],
};

/** What hiring a dedicated developer or team involves. */
export const faqsHire: FaqContent = {
  eyebrow: "Hire Developer",
  title: "Hiring dedicated developers",
  body: "How placement works, what it costs and how quickly a team can start.",
  items: [
    {
      q: "What is the process for hiring dedicated developers?",
      a: "Share the requirement, and we send profiles of pre-screened developers who match it. You interview them yourself and onboard the ones you want. You are choosing individuals, not accepting an allocation.",
      link: { label: "Hire developers", href: "/hire-dedicated-developers" },
    },
    {
      q: "Is there a trial period?",
      a: "Yes — a 40-hour free trial. You see the developer working on your actual codebase before any commitment.",
    },
    {
      q: "How soon can a developer start?",
      a: "Usually within days of the paperwork completing, depending on the stack and how specialised the requirement is.",
    },
    {
      q: "Do you subcontract the work?",
      a: "No. Everyone works from our own development centre and is our own employee, which is what makes the confidentiality agreements above meaningful.",
    },
    {
      q: "Can I change or scale the team later?",
      a: "Yes. Teams scale up and down through the engagement; that flexibility is most of the reason clients choose this model over a fixed-scope contract.",
    },
    {
      q: "Who manages the developers day to day?",
      a: "You do, if you want to — most clients run them as part of their own team. Where a client would rather not, we supply a project manager to run delivery and report to you.",
    },
  ],
};

/** Closing band, pointing at the enquiry form the Contact section renders. */
export const faqsPageCta = {
  eyebrow: "Still Deciding",
  title: "Ask us the one that is not here",
  body: "Most questions worth asking are specific to the project. Describe yours and we will answer it directly — usually within one business day.",
  cta: { label: "Ask a question", href: "#contact" },
} as const;
