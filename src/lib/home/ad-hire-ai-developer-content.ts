/**
 * Copy for `/ad/hire-ai-developer` — a clone of softsuave.com/ad/hire-ai-developer,
 * the paid-traffic landing page for hiring AI developers on contract.
 *
 * Same rule as `ad-app-developer-content.ts`: only what the live page RENDERS.
 * Its markup comments out a "Start 40 hours Free Trial" header button, the Vendor
 * Transition model, a testimonials block and a few buttons, so none of that is
 * here. Section order is the live order: hero · trusted clients · top talent ·
 * technology stack · why hire + trial band · plans · process · closing form.
 *
 * The trial buttons carry the live label, "Start 40 hours Free Trial", and open the
 * shared `TrialModal`, which shows the site's existing free-trial form.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { EnquiryFormContent } from "@/components/common/enquiry-form";
import type { HeroTestimonialContent } from "@/components/ad/hero-testimonial";
import type { ManagerEnquiryContent } from "@/components/ad/manager-enquiry";
import { partnerHeroBadges } from "@/lib/home/hero-badges";
import { TRIAL_HREF } from "@/lib/home/ad-app-developer-content";
import { freeTrialHero } from "@/lib/home/free-trial-content";
import {
  CLIENTS_PLUS,
  FIGURES,
  SPECIALISTS_PLUS,
  YEARS_PLUS,
} from "@/lib/company-figures";

export const aiMeta = {
  path: "/ad/hire-ai-developer",
  // The live page's <title> and description, verbatim.
  title: "Hire AI Developers on Contract",
  description:
    "Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $14. Connect with us to get started!",
} as const;

const TRIAL_CTA = {
  label: "Start 40 hours Free Trial →",
  href: TRIAL_HREF,
} as const;
const BOOK_APPOINTMENT = {
  label: "Book a appointment", // sic — the live label
  href: "https://calendly.com/soft_suave/dedicated-teams",
  external: true,
} as const;

const badge = (name: string) =>
  partnerHeroBadges.find((b) => b.alt.includes(name))!;

export const aiHero: HeroContent = {
  eyebrow: "Top-rated AI Development Company Since 2012",
  titleLines: ["Hire AI Developers", "on Contract"],
  // The live H1 sets only "Contract" in its highlight colour.
  accent: "Contract",
  body: [
    "Hire senior AI developers aligned with your time zone, culture, and technical needs — delivering results from day one.",
  ],
  points: ["Save up to 40% on Development, Maintenance and Support Costs"],
  ctas: [TRIAL_CTA, BOOK_APPOINTMENT],
  ctaSeparator: "OR",
};

export const aiHeroTestimonial: HeroTestimonialContent = {
  quote:
    "Soft Suave's 40-hour free trial helped me hand-pick top developers who exceeded expectations. A year of dedication, and my project was deployed on time – beyond expectations!",
  name: "Dara Huang MD",
  role: "Co-Founder - Perkypet",
  photo: {
    src: "/brand/testimonials/dara-huang.webp",
    alt: "Dara Huang MD, Co-Founder of Perkypet",
  },
  // The live hero's three marks, as its own files: the "13 Years of Success"
  // seal, Upwork Top Rated (with its stars) and Clutch 4.8. They are drawn for a
  // dark ground, so they sit bare — no white plaque (their alt text on the live
  // page says "Microsoft / Upwork / Clutch", which is not what the files show).
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
      src: "/brand/ad/clutch-4-8.webp",
      alt: "Clutch rated 4.8 based on Clutch reviews",
      width: 277,
      height: 220,
    },
  ],
};

/** "Trusted Partner for Startups and SMBs." — the five marks on the live band. */
export const aiClients = {
  title: "Trusted Partner for Startups and SMBs.",
  logos: [
    { name: "Decathlon", src: "/brand/clients/decathlon.webp" },
    { name: "Utiliko", src: "/brand/clients/ad-client-logo.webp" },
    { name: "Building Owl", src: "/brand/clients/buildingowl.webp" },
    { name: "Marriott", src: "/brand/ad/client-marriott.webp" },
    { name: "appinux", src: "/brand/ad/client-appinux.webp" },
  ],
} as const;

export const aiTalent = {
  eyebrow: "",
  title: "Hire AI Developers For All Your Development Needs",
  body: "Our expert AI developers can help you stay ahead of the curve by providing innovative integration, automated orchestration, and autonomous capabilities at the system level.",
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
        "Get the team of AI Developers, Designers, QA, DevOps & PM",
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

/**
 * "Our Technology Stack" — the live band is two scrolling rows of sixteen logos
 * and no other copy, so the groups are unnamed and the heading is all there is.
 */
export const aiTech = {
  eyebrow: "",
  title: "Our Technology Stack",
  body: "",
  groups: [
    {
      name: "",
      items: [
        "Python",
        "spaCy",
        "PyTorch",
        "PySpark",
        "pandas",
        "MediaPipe",
        "Keras",
        "Google Cloud Vision",
      ],
    },
    {
      name: "",
      items: [
        "Azure ML",
        "OpenCV",
        "TensorFlow",
        "OpenPose",
        "NLTK",
        "scikit-learn",
        "Google BERT",
        "ChatGPT",
      ],
    },
  ],
} as const;

export const aiWhy = {
  title: "Why Hire AI Developers from Soft Suave",
  items: [
    "Dedicated AI Developers",
    "160 Working Hours/Month with Flexible Hiring Models",
    "Simple & Transparent Pricing",
    "Agile Methodology",
    "14 Days Risk-Free Trial",
    "Strict NDA Signed for Complete Privacy",
    "Faster Resource Accessibility",
    "Focus on Your Core Business",
    "Large Technical Pool with wider Technology Stack",
    "Client Satisfaction is Our Highest Priority",
  ],
} as const;

export const aiTrialBand: CtaBandContent = {
  title: "Try Now, Pay Later",
  body: "Start your 40 Hours risk free trial and get perfect fit for your project or book a free consultation for your project planning, time & budget estimation.",
  cta: { label: "Start 40 hours Free Trial →", href: TRIAL_HREF },
  secondary: { ...BOOK_APPOINTMENT, label: "Book a Call" },
};

export const aiPricing = {
  eyebrow: "",
  title: "Choose the Right Pricing Plan for Your Custom Need",
  body: "Simple & Transparent Pricing | Fully Signed NDA | Code Security | Easy Exit Policy",
  plans: [
    {
      price: `$${FIGURES.hourlyRate}`,
      unit: "Hourly (USD)",
      body: "On-Demand AI Developer with fully signed NDA",
    },
    {
      price: "$2240",
      unit: "Monthly (USD)",
      body: "100% dedicated AI Developer with fully signed NDA",
    },
  ],
  fixed: { title: "Looking For a Fixed Price?", body: "On Time Delivery" },
  cta: { label: "Start 40 hours Free Trial →", href: TRIAL_HREF },
} as const;

export const aiProcess: ProcessContent = {
  eyebrow: "",
  title: "Hire Dedicated AI Developer in 4 Steps",
  body: "Onboarding remote AI developers gets easier with our simple 4-step hiring process!",
  cta: { label: "Start 40 hours Free Trial →", href: TRIAL_HREF },
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

/** The closing band: the live "Start Your 40 Hours Trial" block, with its form. */
export const aiEnquiry: ManagerEnquiryContent = {
  title: "Start Your 40 Hours Trial",
  body: "Choose our offshore developers from our extensive talent tool and begin your 40 Hours risk-free trial today!",
  steps: [
    {
      title: "Fill up your details",
      body: "Let us know your developer requirement.",
    },
    {
      title: "What's next?",
      body: "One of our Account Managers will contact you shortly.",
    },
  ],
  manager: {
    name: "Madhu Kadiyala",
    role: "Technology Consultant",
    photo: "/brand/ad/madhu-manager.webp",
    cta: { label: "Schedule a Call", href: "#enquiry" },
  },
  // Upwork, Clutch, Microsoft, AWS — the four lockups, in the live order.
  badges: [badge("Upwork"), badge("Clutch"), badge("Microsoft"), badge("AWS")],
  form: {
    title: "",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "Tell us about your requirements",
    subject: "Ad landing: Start Your 40 Hours Trial (AI developer)",
  },
};

/**
 * What every "Start 40 hours Free Trial" button opens: the form this site already
 * has on /free-7-days-trial ("Start Your 40-Hour Trial" — name, email, phone,
 * requirements), reused as-is rather than written again. The live page's own
 * "how would you prefer to talk to us?" step is not carried over.
 */
export const aiTrialForm: EnquiryFormContent = freeTrialHero.form!;
