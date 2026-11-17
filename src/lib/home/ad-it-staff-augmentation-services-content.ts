/**
 * Copy for `/ad/it-staff-augmentation-services` — a clone of
 * softsuave.com/ad/it-staff-augmentation-services, the paid-traffic landing page
 * for IT staff augmentation.
 *
 * Only what the live page RENDERS, word for word. Live order: hero (+ form, + three
 * seals, + clients) · "IT Staff Augmentation Made Easy" (+ four figures, three
 * engagement models) · "We Have The Skills You're Looking For" · "Why to Choose Soft
 * Suave as Your IT Staff Augmentation Partner?" (+ a free-trial band) · pricing.
 * There is no closing form: every "Start 40-hours Free Trial" button opens the
 * popup (the hero's form). The trial length is 40 hours throughout (the live band's
 * "7-day" reads "40-hour" here).
 *
 * The clients, the experts' stack and the hero's three seals are word for word what
 * the /ad/hire-ai-developer, /ad/app-developer and /ad/hire-mobile-app-developers
 * pages already carry, so they are reused from them.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { EnquiryFormContent } from "@/components/common/enquiry-form";
import { TRIAL_HREF, adExperts, adPricing } from "@/lib/home/ad-app-developer-content";
import { aiClients } from "@/lib/home/ad-hire-ai-developer-content";
import { mbHero } from "@/lib/home/ad-hire-mobile-app-developers-content";
import { CLIENTS_PLUS, FIGURES, SPECIALISTS_PLUS, YEARS_PLUS } from "@/lib/company-figures";

export const saMeta = {
  path: "/ad/it-staff-augmentation-services",
  // The live page's <title> and description, verbatim.
  title: "IT Staff Augmentation Services",
  description: `Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $${FIGURES.hourlyRate}. Connect with us to get started!`,
} as const;

export { TRIAL_HREF };
export const saClients = aiClients;

const TRIAL = { label: "Start 40-hours Free Trial →", href: TRIAL_HREF } as const;
const BOOK_CALL = {
  label: "Book a Call",
  href: "https://calendly.com/soft_suave/dedicated-teams",
  external: true,
} as const;

const form: EnquiryFormContent = {
  title: "Scale Your Team in 48 Hours",
  body: "Take Our 40-hours Free Trial before Hire.",
  note: "Alert: This form is for business, not candidates. To apply for jobs,",
  noteLink: { label: "click here", href: "/career-overview" },
  submit: "Submit",
  sending: "Sending...",
  requirementLabel: "Requirements",
  requirementPlaceholder: "How Can We Help(Requirement)",
  subject: "Ad landing: Scale Your Team in 48 Hours (IT staff augmentation)",
};

export const saHero: HeroContent = {
  eyebrow: "Top Rated IT Staffing Company",
  titleLines: ["Scale Faster with Top-Tier IT Staff Augmentation Solutions"],
  accent: "IT Staff Augmentation Solutions",
  body: ["Augment your IT and software development teams with our senior tech talent. Highly responsive and in your time zone."],
  points: [],
  // The live hero's three seals — "13 Years of Success", Upwork Top Rated, Clutch — drawn for a dark ground.
  badgesBare: "large",
  badges: mbHero.badges,
  ctas: [],
  form,
};

export const saTalent = {
  eyebrow: "",
  title: "IT Staff Augmentation Made Easy",
  body: "Simplify your IT projects with seamless staff augmentation, providing skilled professionals to fill gaps and boost your team's capabilities effortlessly.",
  stats: [
    { figure: YEARS_PLUS, label: "Glorious Years of Service" },
    { figure: CLIENTS_PLUS, label: "Happy Clients Worldwide" },
    { figure: SPECIALISTS_PLUS, label: "AI-Powered Developers" },
    { figure: "97%", label: "Client Retention Rate" },
  ],
  cta: TRIAL,
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

export const saExperts: TechStackContent = { ...adExperts, eyebrow: "", groupsLabel: "Technologies" };
export const saExpertsCta = TRIAL;

export const saWhy = {
  title: "Why to Choose Soft Suave as Your IT Staff Augmentation Partner?",
  intro:
    "As a leading IT staff augmentation company, we provide highly skilled and reliable teams. Trusted by clients for over 13+ years, we ensure your projects are completed efficiently and effectively.",
} as const;

export const saTrialBand: CtaBandContent = {
  title: "No-Risk, Free Trial: Onboard Developers Today",
  body: "Start your 40-hour risk free trial and get perfect fit for your project or book a free consultation for your project planning, time & budget estimation.",
  cta: TRIAL,
  secondary: BOOK_CALL,
};

export const saPricing = {
  ...adPricing,
  eyebrow: "",
  plans: [
    { ...adPricing.plans[0], body: "On-Demand Software Developer with fully signed NDA" },
    { ...adPricing.plans[1], body: "100% dedicated Software Developer with fully signed NDA" },
  ],
  cta: TRIAL,
} as const;

/** What every "Start 40-hours Free Trial" button opens: the hero's own form. */
export const saPopup = form;
