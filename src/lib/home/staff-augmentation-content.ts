/**
 * Copy for the "IT Staff Augmentation Services" landing page
 * (`/it-staff-augmentation-services`).
 *
 * Follows the live page's structure — why us, augmentation models, a five-step
 * process, hireable roles, technologies, industries, the "better than
 * traditional hiring" comparison, testimonials and FAQs. The live page's
 * ten-item industry list is trimmed to the six the rest of the site also
 * claims, and the comparison moves from five loose benefit cards into the
 * shared `Comparison` section, which states the alternative rather than
 * implying it.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { ComparisonContent } from "@/components/landing/comparison";
import type { FaqContent } from "@/components/landing/faq";
import { sharedHeroBadges } from "./delivery-shared";

export const staffMeta = {
  slug: "it-staff-augmentation-services",
  path: "/it-staff-augmentation-services",
  title: "IT Staff Augmentation Services",
  description:
    "Scale your team with vetted developers, QA engineers and cloud specialists. Onboarding in as little as 48 hours, with 40–60% savings against full-time hiring.",
} as const;

export const staffHero: HeroContent = {
  titleLines: ["IT Staff Augmentation", "Services"],
  body: [
    "Add proven engineers to your team without running a hiring cycle for each one. Soft Suave gives you access to a vetted global talent pool so you can scale capacity up or down as your roadmap moves, while your managers keep full day-to-day control.",
    "Augmented engineers report to you, work in your tools, and follow your process. You are adding people, not handing over a project.",
  ],
  points: [
    "Onboarding in as little as 48 hours",
    "Save 40–60% against full-time hiring",
    "Vetted engineering talent across every major stack",
    "You retain full control of day-to-day work",
    "No long-term commitment — scale up or down",
  ],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Business Enquiry",
    title: "Tell us which roles you need",
    note: "Share the roles, skills, and timeline and we come back with matched profiles and rates. Everything stays under NDA.",
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "Which roles do you need to fill?",
    requirementPlaceholder:
      "Roles and seniority, the tech stack, how many engineers, expected duration, and the time zone you need overlap with.",
    subject: "IT staff augmentation enquiry",
  },
  image: {
    src: "/images/four/svc-web.webp",
    width: 1200,
    height: 860,
    alt: "Augmented engineers working alongside an in-house product team",
  },
};

export const staffOverview: OverviewContent = {
  eyebrow: "The Short Answer",
  title: "What Is IT Staff Augmentation?",
  paragraphs: [
    "IT staff augmentation is a model for adding skilled engineers to your existing team on a flexible basis. Rather than hiring full-time employees or handing a project to a vendor, you bring in specific people, for a specific period, to work inside your team under your management.",
    "In practice that means the engineers join your stand-ups, use your repositories and tracking tools, follow your review process, and report to your leads. Responsibility for priorities, architecture decisions, and delivery stays with you. What changes is capacity and the range of skills available to you.",
    "It suits teams that have a clear roadmap but not enough engineers to execute it, teams that need a specialism for one phase of work, and teams that need to move before a permanent hiring cycle could realistically deliver someone.",
  ],
  pullQuote:
    "Augmentation adds people to your team. Outsourcing hands work to someone else's. Choosing wrongly is the most common reason either one disappoints.",
};
export const staffModels: CardGridContent = {
  eyebrow: "Engagement Models",
  title: "IT Staff Augmentation Models We Offer",
  body: "The right model depends on how much real-time overlap the work needs, how long you need the capacity, and what you are optimising for — speed, cost, or proximity.",
  items: [
    {
      name: "Offshore Augmentation",
      icon: "globe",
      body: "Scale your team from our India delivery centres with a 4–6 hour working-hour overlap. The most cost-effective model, and the one with the deepest available talent pool.",
    },
    {
      name: "Dedicated Remote Engineers",
      icon: "users",
      body: "Named engineers embedded in your team full time and working only on your product, so context accumulates with the same people rather than resetting each engagement.",
    },
    {
      name: "Onshore Augmentation",
      icon: "book",
      body: "Engineers aligned to your own time zone for work that genuinely needs same-hours collaboration. Available for select scenarios where overlap cannot be scheduled around.",
    },
    {
      name: "Hybrid Team Models",
      icon: "gauge",
      body: "Combine onshore coordination with offshore delivery capacity, balancing real-time availability against cost where neither alone is the right answer.",
    },
  ],
};

export const staffProcess: ProcessContent = {
  eyebrow: "How It Works",
  title: "Our IT Staff Augmentation Process",
  body: "From requirement to a contributing engineer, each stage has a defined output — so you know what happens next and what is expected of you at each point.",
  steps: [
    {
      n: "01",
      image: {
        src: "/images/four/staff-step-1.webp",
        width: 1200,
        height: 900,
        alt: "Requirement Analysis in a staff augmentation engagement",
      },
      name: "Requirement Analysis",
      body: "We review your tech stack, the experience level required, team structure, and project specifics to define what a genuine fit looks like before any sourcing starts.",
    },
    {
      n: "02",
      image: {
        src: "/images/four/staff-step-2.webp",
        width: 1200,
        height: 900,
        alt: "Candidate Shortlisting in a staff augmentation engagement",
      },
      name: "Candidate Shortlisting",
      body: "Our vetting and matching process filters for technical depth and project relevance, so you review a short list of qualified candidates rather than a long list of available ones.",
    },
    {
      n: "03",
      image: {
        src: "/images/four/staff-step-3.webp",
        width: 1200,
        height: 900,
        alt: "Interviews and Skill Assessment in a staff augmentation engagement",
      },
      name: "Interviews & Skill Assessment",
      body: "You run the interviews. We coordinate scheduling, coding assessments, and culture-fit evaluation, and you make the selection decision on every engineer who joins.",
    },
    {
      n: "04",
      image: {
        src: "/images/four/staff-step-4.webp",
        width: 1200,
        height: 900,
        alt: "Rapid Onboarding in a staff augmentation engagement",
      },
      name: "Rapid Onboarding",
      body: "Access provisioning, tool integration, environment setup, and team introductions are handled together — typically within 48 hours of selection — so ramp-up starts immediately.",
    },
    {
      n: "05",
      image: {
        src: "/images/four/staff-step-5.webp",
        width: 1200,
        height: 900,
        alt: "Continuous Support and Monitoring in a staff augmentation engagement",
      },
      name: "Continuous Support & Monitoring",
      body: "Ongoing account support, sprint reviews, and feedback loops keep performance visible, with replacement or rebalancing handled if the fit turns out to be wrong.",
    },
  ],
};

export const staffRoles: ServicesContent = {
  eyebrow: "Roles",
  title: "Roles You Can Hire Through Staff Augmentation",
  body: "From individual specialists to a full cross-functional pod, these are the roles we staff most often — each vetted against the stack and seniority your team actually needs.",
  items: [
    {
      name: "Frontend Developers",
      tag: "Frontend",
      body: "React, Angular, Vue, and Next.js engineers for single-page applications, design-system work, and UI development, delivering fast and accessible interfaces against your component standards.",
    },
    {
      name: "Backend Developers",
      tag: "Backend",
      body: "API development, system architecture, and server-side logic in Node.js, Python, Java, .NET, PHP, and Go, built for the scale and integration surface your platform actually carries.",
    },
    {
      name: "Full-Stack Developers",
      tag: "Full-Stack",
      body: "Engineers covering both frontend and backend with practical DevOps ability, useful where a feature needs owning end to end rather than passing across a team boundary.",
    },
    {
      name: "Mobile App Developers",
      tag: "Mobile",
      body: "Flutter, React Native, iOS, and Android specialists building native and cross-platform applications, including release management and store submission where you need it.",
    },
    {
      name: "DevOps & Cloud Engineers",
      tag: "DevOps & Cloud",
      body: "AWS, Azure, GCP, CI/CD, Docker, and Kubernetes engineers to optimise infrastructure, deployment pipelines, observability, and the cost profile of what you already run.",
    },
    {
      name: "QA Engineers",
      tag: "Quality",
      body: "Manual and automation testers working in Selenium, Cypress, Appium, and Jira, building regression coverage and release confidence rather than only reporting defects.",
    },
    {
      name: "UI/UX Designers",
      tag: "Design",
      body: "From wireframes and prototypes to maintained design systems, improving interface clarity and usability in step with the engineers building against the designs.",
    },
    {
      name: "AI & Data Engineers",
      tag: "AI & Data",
      body: "Specialists in machine learning, generative AI, data pipelines, and analytics, for teams adding AI capability without hiring a permanent data function first.",
    },
  ],
};

export const staffComparison: ComparisonContent = {
  eyebrow: "Decide With Clarity",
  title: "Staff Augmentation vs. Traditional Hiring",
  body: "Permanent hiring is the right answer for roles at the centre of your business. For capacity, specialisms, and anything time-boxed, the trade-offs look like this.",
  columns: ["Staff Augmentation", "Traditional Hiring"],
  /* The section argues for augmentation on these dimensions, so the table
     leads with it — but the closing note keeps the concession the standfirst
     already makes, that permanent hiring wins for roles at the centre of the
     business. */
  verdict: true,
  verdictNote:
    "Augmentation wins on speed, cost exposure, and access to specialists. Permanent hiring still wins for the roles that sit at the centre of your business and need to stay there.",
  rows: [
    {
      area: "Time to productive",
      values: [
        "Days to shortlist, onboarding in as little as 48 hours",
        "Weeks to months of sourcing, notice periods, and ramp-up",
      ],
    },
    {
      area: "Cost structure",
      values: [
        "A single rate, no recruitment fees, benefits load, or severance exposure",
        "Salary plus benefits, recruitment fees, equipment, and overhead",
      ],
    },
    {
      area: "Access to specialists",
      values: [
        "Hard-to-find skills available immediately from an existing bench",
        "Limited to who is available and willing to move in your local market",
      ],
    },
    {
      area: "Flexibility",
      values: [
        "Scale up or down as the roadmap changes, contract by contract",
        "Headcount changes are slow and costly in both directions",
      ],
    },
    {
      area: "Day-to-day control",
      values: [
        "You manage tasks, priorities, and standards directly",
        "You manage tasks, priorities, and standards directly",
      ],
    },
    {
      area: "Best suited for",
      values: [
        "Capacity gaps, specialist phases, and time-boxed initiatives",
        "Core long-term roles where institutional knowledge must stay in-house",
      ],
    },
  ],
};

export const staffMidCta: CtaBandContent = {
  eyebrow: "Move Faster",
  title: "Need Engineers on Your Team This Month?",
  body: "Tell us the roles, the stack, and the timeline. We come back with matched profiles and rates, and eligible engagements can start with a 40-hour risk-free trial.",
  cta: { label: "Request matched profiles", href: "#enquiry" },
};
export const staffFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "FAQs About IT Staff Augmentation Services",
  body: "A quick guide for CTOs and founders weighing up augmentation against hiring or outsourcing.",
  items: [
    {
      q: "What are IT staff augmentation services, and how do they work in practice?",
      a: "Staff augmentation lets you add skilled engineers to your existing team for a defined period. In practice: you describe the roles and stack, we shortlist matched candidates, you interview and select, and the engineers onboard into your tools and process. From that point they work in your sprints and report to your leads — the day-to-day looks like your own team, because operationally it is.",
    },
    {
      q: "How fast can I onboard developers through your staff augmentation model?",
      a: "Onboarding typically completes within 48 hours of selection, covering access provisioning, tool integration, and environment setup. Getting to selection depends on how specialised the role is — a common stack shortlists in days, a scarce specialism takes longer. We tell you which situation you are in at the first conversation rather than after you have committed.",
    },
    {
      q: "How much does IT staff augmentation cost per developer per month?",
      a: "Rates vary with seniority, specialism, and engagement model, so a single figure would be misleading. What is consistent is the comparison: augmentation typically saves 40–60% against full-time hiring in US and Western European markets, once recruitment fees, benefits, equipment, and overhead are counted rather than just salary. We quote per role against your actual requirement.",
      link: {
        label: "Get a rough quote in 24 hours",
        href: "https://www.softsuave.com/free-quote",
      },
    },
    {
      q: "What is the difference between staff augmentation, IT outsourcing, and a dedicated team?",
      a: [
        "Staff augmentation adds individual specialists to your team; you keep responsibility for priorities, architecture, and delivery. IT outsourcing assigns a defined scope to an external partner who takes responsibility for delivering it. A dedicated team sits between the two — a standing team working only on your roadmap, with more autonomy than augmented individuals but still directed by you.",
        "The practical test is who you want making day-to-day delivery decisions. If the answer is your own leads, you want augmentation. If you would rather hand over an outcome and review it, you want outsourcing.",
      ],
    },
    {
      q: "Do I retain full control over augmented developers and their day-to-day work?",
      a: "Yes. Augmented engineers take direction from your managers, work to your priorities and deadlines, and follow your development standards and review process. They integrate into your existing workflows rather than running a parallel one. Our account team handles the employment relationship, performance escalation, and replacement if needed — not your technical direction.",
    },
    {
      q: "What types of roles and tech stacks can I hire?",
      a: "Frontend, backend, full-stack, mobile, DevOps and cloud, QA, UI/UX, and AI and data engineers, across React, Angular, Vue, Node.js, Python, Java, .NET, PHP, Go, Swift, Kotlin, Flutter, React Native, AWS, Azure, GCP, and the common testing toolchains. If a requirement falls outside what our bench covers, we say so rather than stretching a near-match into a fit.",
    },
    {
      q: "What happens if an engineer is not the right fit?",
      a: "You raise it with your account contact and we replace them. Because you run the interviews and make the selection, mismatches are uncommon, but they do happen — usually on team fit rather than technical ability. The replacement process and any notice terms are set out in the engagement agreement before anyone starts, so it is a defined path rather than a negotiation.",
    },
    {
      q: "Can we try before committing to a longer engagement?",
      a: "Eligible engagements can start with a 40-hour risk-free trial, which is enough to see real code, real communication, and how the engineer works inside your process. Suitability for the trial is confirmed during the initial discussion, since it makes sense for some role types and scopes more than others.",
    },
    {
      q: "How do you handle security, NDAs, and access to our systems?",
      a: "NDAs are signed before any information is shared. Access to your repositories and environments is provisioned under your own policies — we do not require blanket access — and revoked on a defined offboarding process when an engagement ends. Soft Suave operates an ISO/IEC 27001:2022-certified information security management system covering device management, data handling, and access control.",
    },
  ],
};
