/**
 * Copy for `/ad/hire-mobile-app-developers` — a clone of
 * softsuave.com/ad/hire-mobile-app-developers, the paid-traffic landing page for
 * hiring mobile app developers on contract.
 *
 * Only what the live page RENDERS, word for word — its markup comments out the
 * "Take Our 7-day Free Trial before Hire." line, the Vendor Transition model, a
 * developer-profiles block and a testimonials block. Live order: hero (+ form) ·
 * trusted logos · top talent + engagement models · skills · why hire + trial
 * band · plans · 4 steps · closing form.
 *
 * Every "Start 40 hours Free Trial" button opens one popup (the live page's first
 * `#modalDownload`): an untitled form, "How can we help?", with a "100% Privacy
 * Guaranteed" line. The live page's rate-card form shares that id and so can
 * never be opened; it is not built. The clients, steps and closing "Start Your 40
 * Hours Trial" block are word for word the live AI-developer page's, so they are
 * reused from it.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { ProcessContent } from "@/components/landing/process";
import type { EnquiryFormContent } from "@/components/common/enquiry-form";
import type { ManagerEnquiryContent } from "@/components/ad/manager-enquiry";
import { TRIAL_HREF, adExperts } from "@/lib/home/ad-app-developer-content";
import {
  aiClients,
  aiEnquiry,
  aiProcess,
} from "@/lib/home/ad-hire-ai-developer-content";
import {
  CLIENTS_PLUS,
  FIGURES,
  SPECIALISTS_PLUS,
  YEARS_PLUS,
} from "@/lib/company-figures";

export const mbMeta = {
  path: "/ad/hire-mobile-app-developers",
  // The live page's <title> and description, verbatim.
  title: "Hire App Developers on Contract",
  description: `Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $${FIGURES.hourlyRate}. Connect with us to get started!`,
} as const;

export { TRIAL_HREF as MB_TRIAL_HREF };

const TRIAL_CTA = {
  label: "Start 40 hours Free Trial →",
  href: TRIAL_HREF,
} as const;

export const mbHero: HeroContent = {
  eyebrow: "Get Access to Pre-Vetted Developers FREE for 40 Hours",
  titleLines: ["Hire Mobile App Developers", "on Contract"],
  accent: "Contract",
  body: [
    "Need dedicated app developers on contract? Hire mobile app developers from india from Soft Suave, and enjoy the 40-hour free trial to experience their expertise!",
  ],
  points: ["Save up to 40% on Development, Maintenance and Support Costs"],
  // The live hero's three marks, as its own files: the "13 Years of Success" seal,
  // Upwork Top Rated and Clutch. Drawn for a dark ground, so they sit bare.
  badgesBare: "large",
  badges: [
    {
      src: "/brand/ad/seal-14-years.webp",
      alt: "13 years of success",
      width: 220,
      height: 220,
    },
    {
      src: "/brand/ad/upwork-top-rated.webp",
      alt: "Upwork Top Rated",
      width: 220,
      height: 220,
    },
    {
      src: "/brand/ad/clutch-new.webp",
      alt: "Clutch",
      width: 401,
      height: 300,
    },
  ],
  form: {
    title: "Share Your Requirements",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "Tell us about your requirements",
    subject: "Ad landing: Share Your Requirements (mobile app developers)",
  },
};

export const mbClients = aiClients;

export const mbTalent = {
  eyebrow: "",
  title: "Hire Mobile App Developers For All Your Tech Needs",
  body: "We can partner with you at any stage of your Software Development Lifecycle, offering flexible cooperation models that fit your goals, resources and timeline.",
  stats: [
    { figure: YEARS_PLUS, label: "Glorious Years of Service" },
    { figure: CLIENTS_PLUS, label: "Happy Clients Worldwide" },
    { figure: SPECIALISTS_PLUS, label: "AI-Powered Developers" },
    { figure: "97%", label: "Client Retention Rate" },
  ],
  cta: { label: "Start 40 hours Free Trial", href: TRIAL_HREF },
  models: [
    {
      name: "Add Resources in Your Existing Team",
      points: [
        "Bridge the skill gap in your in-house team",
        "Scale-up team as per your requirement",
        "Suitable for short and long term projects",
      ],
    },
    {
      name: "Build a Team from Scratch",
      points: [
        "Get the team of Developers, Designers, QA, DevOps & PM",
        "You have complete control of your project",
        "Suitable for short and long term projects",
      ],
    },
    {
      name: "Fixed Cost Project",
      points: [
        "Get custom solution built as per your requirement",
        "Complete your project within assigned budget",
        "Suitable for short and long term projects",
      ],
    },
  ],
} as const;

/** "We Have The Skills You're Looking For" — with its "Technologies" sub-heading shown as the label above it. */
export const mbSkills: TechStackContent = {
  ...adExperts,
  eyebrow: "Technologies",
  title: "We Have The Skills You're Looking For",
  body: "Soft Suave is committed to delivering optimal technology solutions for global clients, with expertise in diverse areas such as mobility, web development, Blockchain, AI, and more. Our experienced offshore developers cater to all your development needs.",
};
export const mbSkillsCta = {
  label: "Start 40 hours Free Trial →",
  href: TRIAL_HREF,
} as const;

export const mbWhy = {
  title: "Why Hire Mobile App Developers from Soft Suave",
  items: [
    "Dedicated Developers",
    "160 Working Hours/Month with Flexible Hiring Models",
    "Simple & Transparent Pricing",
    "Agile Methodology",
    "7 Days Risk-Free Trial",
    "Strict NDA Signed for Complete Privacy",
    "Faster Resource Accessibility",
    "Focus on Your Core Business",
    "Large Technical Pool with wider Technology Stack",
    "Client Satisfaction is Our Highest Priority",
  ],
} as const;

export const mbTrialBand: CtaBandContent = {
  title: "Try Now, Pay Later",
  body: "Start your 40 Hours risk free trial and get perfect fit for your project or book a free consultation for your project planning, time & budget estimation.",
  cta: TRIAL_CTA,
  secondary: {
    label: "Book a Call",
    href: "https://calendly.com/soft_suave/dedicated-teams",
    external: true,
  },
};

export const mbPricing = {
  eyebrow: "",
  title: "Choose the Right Pricing Plan for Your Custom Need",
  body: "Simple & Transparent Pricing | Fully Signed NDA | Code Security | Easy Exit Policy",
  plans: [
    {
      price: `$${FIGURES.hourlyRate}`,
      unit: "Hourly (USD)",
      body: "On-Demand Software Developer with fully signed NDA",
    },
    {
      price: "$2240",
      unit: "Monthly (USD)",
      body: "100% dedicated Software Developer with fully signed NDA",
    },
  ],
  fixed: { title: "Looking For a Fixed Price?", body: "On Time Delivery" },
  cta: TRIAL_CTA,
} as const;

export const mbProcess: ProcessContent = {
  ...aiProcess,
  title: "Hire Dedicated App Developer in 4 Steps",
  body: "Onboarding remote software developers gets easier with our simple 4-step hiring process!",
  cta: TRIAL_CTA,
};

/** The closing "Start Your 40 Hours Trial" block — the live AI-developer page's, with this page's lead subject. */
export const mbEnquiry: ManagerEnquiryContent = {
  ...aiEnquiry,
  // The hero form owns `#enquiry` on this page, so the closing form has its own id.
  manager: {
    ...aiEnquiry.manager,
    cta: { ...aiEnquiry.manager.cta, href: "#ad-contact-form" },
  },
  form: {
    ...aiEnquiry.form,
    subject: "Ad landing: Start Your 40 Hours Trial (mobile app developers)",
  },
};

/** What every "Start 40 hours Free Trial" button opens: the live untitled form, "How can we help?". */
export const mbTrialForm: EnquiryFormContent = {
  title: "",
  note: "100% Privacy Guaranteed",
  submit: "Submit",
  sending: "Sending...",
  requirementLabel: "Requirements",
  requirementPlaceholder: "Tell us about your requirements",
  subject: "Ad landing: Free Trial popup (mobile app developers)",
};
