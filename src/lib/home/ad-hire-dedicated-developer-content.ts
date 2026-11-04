/**
 * Copy for `/ad/hire-dedicated-developer` — a clone of
 * softsuave.com/ad/hire-dedicated-developer, the paid-traffic landing page for
 * hiring dedicated developers in India on contract.
 *
 * Only what the live page RENDERS is here — its markup comments out a
 * testimonials block, a "Meet Soft Suave Dedicated Developers" profile band and
 * a "Start 40 hours Free Trial" button. Live order: hero (+ form, + clients) ·
 * technologies · why hire · rate-card banner · comparison · process · closing
 * form. The page has no "free trial" button: its one popup is the rate-card
 * form, opened by "Request Rate Card".
 *
 * Wording is the live page's, typos included ("Manaul Testing", "Jenkin",
 * "Anisible", "Kubernets") — this is a clone, not a rewrite.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { ComparisonContent } from "@/components/generative-ai/comparison";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { EnquiryFormContent } from "@/components/common/enquiry-form";
import type { ManagerEnquiryContent } from "@/components/ad/manager-enquiry";
import { aiEnquiry } from "@/lib/home/ad-hire-ai-developer-content";
import {
  CLIENTS_PLUS,
  FIGURES,
  SPECIALISTS_PLUS,
  YEARS_PLUS,
} from "@/lib/company-figures";

export const dedMeta = {
  path: "/ad/hire-dedicated-developer",
  // The live page's <title> and description, verbatim.
  title: `Hire Dedicated Developers in India On Contract from $${FIGURES.hourlyRate}/hr`,
  description: `Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $${FIGURES.hourlyRate}. Connect with us to get started!`,
} as const;

/** Opens the rate-card popup. */
export const RATECARD_HREF = "#ratecard";

export const dedHero: HeroContent = {
  titleLines: ["Hire Dedicated Developers", "In India On Contract"],
  body: [
    "Need skilled developers on Contract? Hire dedicated mobile app developers from Soft Suave, offering cost-effective solutions starting with a 40-hour free trial.",
    "Allow us to help you optimize your team productivity. Hire our app developers.",
  ],
  points: [
    "7 Days Trial Available, 100% Risk-Free",
    "Language/Time Zone Compatible Staff",
    `${SPECIALISTS_PLUS} In-house resources`,
  ],
  // The live hero's three spinning rings, as the surface's stat cards.
  stats: [
    {
      title: "1250+ Projects",
      body: "Projects Executed Successfully",
      icon: "experts",
    },
    {
      title: `${YEARS_PLUS} Year of Experience`,
      body: "Years of Experience in this Field",
      icon: "countries",
    },
    {
      title: `${CLIENTS_PLUS} Clients Globally`,
      body: "Total No. of Satisfied Customers",
      icon: "clients",
    },
  ],
  form: {
    title: "40-hour Trial, 100% Risk Free",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "Tell us about your requirements",
    subject: "Ad landing: 40-hour Trial (dedicated developers)",
  },
};

/**
 * "Trusted Partner for Startups and SMBs." — the live row's marks, in its order.
 * Its alt text is off again (the 5th, appinux, is labelled "AMD Telecom").
 */
export const dedClients = {
  title: "Trusted Partner for Startups and SMBs.",
  logos: [
    { name: "Clutch rating", src: "/brand/ad/client-clutch-rating.webp" },
    { name: "Decathlon", src: "/brand/clients/decathlon.webp" },
    { name: "Utiliko", src: "/brand/clients/ad-client-logo.webp" },
    { name: "Building Owl", src: "/brand/clients/buildingowl.webp" },
    { name: "Marriott", src: "/brand/ad/client-marriott.webp" },
    { name: "appinux", src: "/brand/ad/client-appinux.webp" },
    { name: "Yooba", src: "/brand/clients/yooba.webp" },
    { name: "Client Logo", src: "/brand/ad/client-logo-54.webp" },
    { name: "Doctoc", src: "/brand/clients/doctoc.webp" },
  ],
} as const;

/** "Choose Experts in Various Technologies" — the live tabs, as the site's stack panels. */
export const dedTech: TechStackContent = {
  eyebrow: "",
  title: "Choose Experts in Various Technologies",
  body: "Our Offshore app developers excel in various technologies and frameworks and are known to blend with the project and technology easily to get great outcomes.",
  groups: [
    {
      name: "Front-End",
      items: [
        "React Js",
        "Angular Js",
        "Bootstrap",
        "Vue Js",
        "Javascript",
        "HTML",
        "CSS",
      ],
    },
    {
      name: "Back-End",
      items: ["PHP", "Java", "Python", "Node JS", ".Net", "ROR"],
    },
    {
      name: "Mobile App",
      items: ["Swift", "Kotlin", "Java", "React", "Flutter", "Ionic"],
    },
    {
      name: "Quality Assurance",
      items: ["Selenium", "Cypress", "Manaul Testing"],
    },
    {
      name: "DevOps/Clouds",
      items: [
        "Aws",
        "Azure",
        "Cloud",
        "Docker",
        "Jenkin",
        "Anisible",
        "Kubernets",
      ],
    },
    {
      name: "Design",
      items: ["Photoshop", "Illustrator", "Adobe-XD", "Figma"],
    },
  ],
};

/** The live "Why Hire…" block: a heading over eight plain reasons. */
export const dedWhy = {
  title: "Why Hire Dedicated App Developers from Soft Suave?",
  items: [
    "Experienced App Developers",
    "100% Quality Assurance",
    "Flexible Engagement Options",
    "Competitive Pricing Models",
    "Complete peace of mind with 0 overheads",
    "160 Man Hours Guaranteed",
    "Transparent & Smooth Communication",
    "Hassle-free & quick on-boarding",
  ],
  // The live block also has a side photo (`/brand/ad/why-office.webp`, 520x525, alt "Soft Suave office and team").
  // Left out for now: add `image: { src, width, height, alt }` here and the list moves beside it.
  cta: { lead: "Talk to our consultants", label: "Contact Us", href: "#top" },
} as const;

export const dedRateBand: CtaBandContent = {
  title: "Seeking AI-empowered Dedicated developers for hire?",
  body: "Get in touch with Soft Suave to connect with industry-leading developers and scale your project!",
  cta: { label: "Request Rate Card →", href: RATECARD_HREF },
};

export const dedComparison: ComparisonContent = {
  eyebrow: "",
  title: "Choosing the Right App Development Partner for your Specific Needs",
  body: "Know how to choose between an in-house team, freelancers, and Soft Suave’s developers by browsing this comparison chart.",
  // `[row-header column, ...option columns]` — the same table /hire-dedicated-developers renders.
  columns: ["Factor", "Soft Suave", "In-house", "Freelancer"],
  rows: [
    {
      criterion: "Time to get right developers",
      values: ["Within 48 hours", "4 - 8 Weeks", "2 - 4 Weeks"],
    },
    {
      criterion: "Time to start a project",
      values: ["Within 48 hours", "4 - 8 Weeks", "2 - 4 Weeks"],
    },
    { criterion: "Recurring cost", values: ["0", "$2000 to $3000", "0"] },
    {
      criterion: "Project failure risk",
      values: ["Extremely Low", "Low", "High"],
    },
    { criterion: "Dedicated resources", values: ["Yes", "Yes", "No"] },
    {
      criterion: "Communications",
      values: ["Seamless", "Seamless", "Uncertain"],
    },
  ],
};

export const dedProcess: ProcessContent = {
  eyebrow: "",
  title: "The 4-step Dedicated Developer Hiring Process",
  body: "Onboarding App Developers gets easier with our simple 4-step hiring process!",
  steps: [
    {
      n: "01",
      name: "Share Your Developer Requirement",
      body: "Share your project scope, required skills, timeline, and preferred hiring model with our team.",
    },
    {
      n: "02",
      name: "Review Curated Developer Profiles",
      body: "Get shortlisted developer profiles matched to your skills, goals, availability, and team needs.",
    },
    {
      n: "03",
      name: "Start the 40-Hour Risk-Free Trial",
      body: "Test the developer’s coding skills, communication, quality, and workflow fit before onboarding.",
    },
    {
      n: "04",
      name: "Onboard the Developer to Your Team",
      body: "Finalize SLA and NDA, set up communication, and integrate the developer into your workflow.",
    },
  ],
};

/** The closing "Start Your 40 Hours Trial" band — the same block as the AI page. */
export const dedEnquiry: ManagerEnquiryContent = {
  ...aiEnquiry,
  manager: {
    ...aiEnquiry.manager,
    cta: { ...aiEnquiry.manager.cta, href: "#ad-contact-form" },
  },
  form: {
    ...aiEnquiry.form,
    subject: "Ad landing: Start Your 40 Hours Trial (dedicated developers)",
  },
};

/** What "Request Rate Card" opens: name, email and phone only. */
export const dedRateCardForm: EnquiryFormContent = {
  title: "Get Developer's Ratecard Here!",
  body: "Choose the right developer to start your 1-week Free Trial.",
  submit: "Download Now",
  sending: "Sending...",
  requirementLabel: "Requirements",
  requirementPlaceholder: "Tell us about your requirements",
  subject: "Ad landing: Developer ratecard request (dedicated developers)",
};
export const DED_RATECARD_REQUIREMENT =
  "Requested the developers' ratecard (dedicated developers ad landing page).";
