/**
 * Copy for `/ad/hire-forward-deployed-engineer` — a clone of
 * softsuave.com/ad/hire-forward-deployed-engineer, the paid-traffic landing
 * page for hiring forward deployed engineers on contract.
 *
 * Only what the live page RENDERS is here. Its markup comments out a "Top
 * Talent" figures block, the Vendor Transition model, a "Meet our developers"
 * profile band, the pricing plans, a testimonials stack and a tech-stack
 * dropdown, so none of that is here. Live order: hero (+ form, + clients) ·
 * why choose us · services · technology stack · code & practice · process ·
 * experts. There is no closing form: the live page ends on its experts block.
 *
 * Every "Start 40 Hours Free Trial" and "Hire Now" button opens the same
 * two-column popup (`fdePopup`). Wording is the live page's, odd bits included
 * ("Forward Deploy Engineer", the "Technical Account Engineers" card carrying
 * SaaS copy) — this is a clone, not a rewrite.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/landing/industries";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { ProcessContent } from "@/components/landing/process";
import type { EnquiryFormContent } from "@/components/common/enquiry-form";
import { adClients, adHero, TRIAL_HREF } from "@/lib/home/ad-app-developer-content";
import { FIGURES, SPECIALISTS_PLUS } from "@/lib/company-figures";
import { rdPopup } from "@/lib/home/ad-remote-developer-content";

export const fdeMeta = {
  path: "/ad/hire-forward-deployed-engineer",
  // The live page's <title> and description, verbatim.
  title: "Hire Forward Deployed Engineers on Contract",
  description: `Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $${FIGURES.hourlyRate}. Connect with us to get started!`,
} as const;

export { TRIAL_HREF };
export const fdeClients = adClients;

const TRIAL_CTA = { label: "Start 40 Hours Free Trial →", href: TRIAL_HREF } as const;

export const fdeHero: HeroContent = {
  ...adHero,
  titleLines: ["Hire Forward Deployed", "Engineers on Contract"],
  accent: "Forward Deployed Engineers",
  body: [
    "Embed expert forward deployed engineers directly into your team to implement, customize, and scale your product at the client's edge — with flexible hiring models and cost-effective, on-site delivery.",
    "*Satisfaction Guaranteed – Get 40-hour Free Trial",
  ],
  form: {
    title: "Start 40-Hour Free Trial",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "Tell us about your requirements",
    subject: "Ad landing: 40-Hour Free Trial (forward deployed engineer)",
  },
};

export const fdeWhy: CardGridContent = {
  eyebrow: "Why choose Us",
  title: "Why Choose Soft Suave",
  body: "With proven field expertise, rapid deployment, flexible models, and cost-effective delivery, we provide forward-deployed engineers who embed with your team on-site or remotely, driving adoption, integration, and success for your business.",
  items: [
    { name: "Top 3% Tech Talent", body: "Handpicked engineers with proven client-facing delivery experience", icon: "spark" },
    { name: "Flexible Engagement Models", body: "On-demand, dedicated, or project-based", icon: "cycle" },
    { name: "Global Delivery Capability", body: "Across time zones, technologies & client environments", icon: "globe" },
    { name: "Faster Time to Market", body: "Rapid implementation and iteration cycles", icon: "rocket" },
    { name: "Full Transparency", body: "No hidden costs or surprises", icon: "eye" },
  ],
};
export const fdeWhyClosing = "We’re not just a staffing partner — we’re your technology growth engine.";

export const fdeServices: CardGridContent = {
  eyebrow: "Our Services",
  title: "Hire Dedicated Forward Deployed Engineers for All Your Implementation Needs",
  body: "Enhance your product rollout and customer onboarding with dedicated forward deployed engineers. We specialize in embedding technical talent directly into client workflows to help your deployments achieve maximum impact.",
  items: [
    { name: "Hire AI/LLM Integration Engineers", body: "Embed AI and LLM capabilities directly into client workflows, tuning models and pipelines to real-world usage.", icon: "cpu" },
    { name: "Hire Solutions Engineers", body: "Translate customer requirements into technical designs and working implementations on the ground.", icon: "compass" },
    { name: "Hire Implementation Engineers", body: "Configure, customize, and deploy your product inside customer environments for fast time-to-value.", icon: "upgrade" },
    { name: "Hire Integration Engineers", body: "Connect your platform to client systems via APIs, data pipelines, and third-party tools.", icon: "plug" },
    { name: "Hire Automation Engineers", body: "Build workflows and scripts that remove manual effort from client operations.", icon: "flow" },
    { name: "Hire Data Engineers", body: "Design and deploy data pipelines that keep client environments running on accurate, real-time data.", icon: "database" },
    { name: "Hire Platform/DevOps Engineers", body: "Stand up and maintain infrastructure inside client environments, on-prem or cloud.", icon: "layers" },
    { name: "Hire Customer-Facing Technical Engineers", body: "Sit alongside customer teams, troubleshoot live, and turn feedback into product improvements.", icon: "users" },
    { name: "Hire Onboarding Engineers", body: "Own technical onboarding end-to-end so new clients go live faster.", icon: "book" },
    { name: "Hire Technical Account Engineers", body: "SaaS developers build secure, scalable cloud apps that simplify operations. They enhance user experience and support your goals with powerful SaaS solutions.", icon: "gauge" },
    { name: "Hire Security & Compliance Engineers", body: "Embed to review and harden deployments against client security, data privacy, and compliance requirements before and after go-live.", icon: "shield" },
  ],
};
export const fdeServicesCta = { lead: "Ready to discuss?", ...TRIAL_CTA } as const;

export const fdeTech: TechStackContent = {
  eyebrow: "Technology Stack",
  title: "Deploying Solutions with Next-Gen Tech",
  body: `Our ${SPECIALISTS_PLUS} AI-enabled engineers specialize in cutting-edge integration, automation, and deployment technologies. Our stack covers everything from client-side implementation to production monitoring.`,
  groups: [
    { name: "Integration & APIs", items: ["REST API", "GraphQL", "Webhooks", "middleware", "ETL Tools"] },
    { name: "AI/ML", items: ["LLMs", "RAG", "Agent Frameworks", "Vector DBs", "MLOps"] },
    { name: "Cloud", items: ["Aws", "Azure", "Cloud", "Kubernetes", "Docker", "CI/CD"] },
    { name: "Automation & Scripting", items: ["Python", "Node.js", "Bash", "Workflow Orchestration"] },
  ],
};

export const fdePractice: CardGridContent = {
  eyebrow: "Code & Practice",
  title: "Our Deployment Standards, Field Practices - Your Success",
  body: "With clean implementation, embedded collaboration, and proven field practices, we deliver reliable rollouts that drive your success from day one.",
  items: [
    { name: "Agile, Transparent Delivery", body: "Sprint-based deployment with real-time client updates." },
    { name: "ISO-Certified Company", body: "We're an ISO 27001 and 9001 certified software development company." },
    { name: "Pre-Vetted Engineers", body: "Every engineer goes through technical assessments, client-simulation interviews, and portfolio reviews." },
    { name: "100% In-House Team", body: `${SPECIALISTS_PLUS} engineers working under one roof.` },
    { name: "Flexible Hiring Models", body: "Full-time, part-time, or hourly, on-site or remote." },
    { name: "Expertise in Latest Tech Stacks", body: "AI/ML, integrations, automation, and cloud." },
    { name: "Global Trust, Local Execution", body: "Serving USA, UK, Ireland & Europe." },
  ],
};

/** The live steps carry the tab labels Define / Select / Evaluate / Onboard, shown here as each card's label. */
export const fdeProcess: ProcessContent = {
  eyebrow: "Process",
  title: "Hire a Dedicated Forward Deployed Engineer in 4 Steps",
  body: "Onboarding a forward deployed engineer gets easier with our simple 4-step process!",
  cta: TRIAL_CTA,
  steps: [
    {
      n: "Define",
      name: "Step 1: Share the JD",
      body: "Start by sharing your detailed Job Description (JD) with us. Briefly explain your project goals, technical and integration requirements, and the type of forward deploy engineer you need for your deployment. The more clarity you provide, the better we can understand your vision and match you with the right talent.",
    },
    {
      n: "Select",
      name: "Step 2: Shortlist The Right Engineers",
      body: "Based on your requirements, we present a curated list of top forward deploy engineers who best align with your project's technical stack, experience level, and domain expertise. You can review their profiles, skill sets, and past work to shortlist the ideal candidates.",
    },
    {
      n: "Evaluate",
      name: "Step 3: Free 40-hour Trial",
      body: "Experience our engineers' capabilities firsthand by taking advantage of a free 40-hour trial. This allows you to assess their technical proficiency, client-facing communication style, and overall fit for your deployment before making any commitment.",
    },
    {
      n: "Onboard",
      name: "Step 4: Onboard & Manage",
      body: "Once you've chosen your forward deploy engineer, we help you seamlessly onboard them. You'll sign the necessary SLA and NDA documents to ensure complete confidentiality and transparency. After onboarding, you can directly manage the engineer as an extended, embedded part of your own team.",
    },
  ],
};

/**
 * "Experts" — twelve role cards, each with a "Hire Now" button that opens the
 * popup. Rendered as the engagement-model cards (`Integration`, bold), the
 * style /hire-* pages use; the live cards carry a title and a button only.
 */
export const fdeExperts = {
  eyebrow: "Experts",
  title: "We Have The Skills You're Looking For",
  body: "Soft Suave is committed to delivering embedded technical talent for global clients, with expertise across AI integration, solutions engineering, and deployment automation. Our forward deployed engineers cater to all your implementation needs.",
  blocks: [
    "Hire AI Integration Engineer",
    "Hire LLM Engineer",
    "Hire RAG Engineer",
    "Hire Agent/Automation Engineer",
    "Hire Solutions Engineer",
    "Hire Implementation Engineer",
    "Hire Data Engineer",
    "Hire API Integration Engineer",
    "Hire DevOps/Platform Engineer",
    "Hire Customer Success Engineer",
    "Hire Technical Account Engineer",
    "Hire Onboarding Engineer",
  ].map((label) => ({ label, body: "" })),
  cta: { label: "Hire Now", href: TRIAL_HREF },
} as const;

/**
 * What every "Start 40 Hours Free Trial" and "Hire Now" button opens — the live
 * page's two-column popup (all of them target one Bootstrap modal). Left, from
 * 1000px up: a heading, a line and a scrolling row of seven client logos. Right:
 * the "Staffing gaps?" form. The page has no closing form of its own; this
 * popup is where "Trusted by Startups & Enterprises Worldwide" lives.
 */
export const fdePopup = {
  side: {
    title: "Trusted by Startups & Enterprises Worldwide",
    body: "Let’s make it easy for you. Soft Suave developers onboard your project in less than 48 hours.",
    logos: [
      { name: "Atomise", src: "/brand/clients/atomise.webp" },
      { name: "CloudBankin", src: "/brand/clients/cloudbankin.webp" },
      { name: "Enigma", src: "/brand/clients/enigma.webp" },
      { name: "WayMore", src: "/brand/clients/waymore.webp" },
      { name: "Who's Up", src: "/brand/clients/whos-up.webp" },
      { name: "Warm Point", src: "/brand/clients/warmpoint.webp" },
      { name: "Utiliko", src: "/brand/clients/utiliko.webp" },
    ],
    /** The live popup shows the same four-card carousel as the remote-developer popup. */
    testimonials: rdPopup.side.testimonials,
  },
  form: {
    title: "Staffing gaps? We fix. Let's discuss!",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "Tell us about your requirements",
    subject: "Ad landing: Staffing gaps enquiry (forward deployed engineer)",
  } satisfies EnquiryFormContent,
} as const;
