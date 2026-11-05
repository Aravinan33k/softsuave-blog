/**
 * Copy for `/ad/app-developer` — a clone of softsuave.com/ad/app-developer, the
 * paid-traffic landing page for hiring remote mobile app developers on contract.
 *
 * Only what the live page RENDERS is here. Its markup carries a lot of
 * commented-out HTML — the "Trusted Offshore Software Development Firm Since
 * 2012" kicker, "Save up to 40% on Development…", the form's "Take Our 7-day
 * Free Trial before Hire." line, the "Some of Our Expert Software Developers"
 * profiles, the Vendor Transition model, a "Start 40 hours Free Trial" header
 * button — and none of it is on the page, so none of it is here.
 *
 * Section order is the live order: hero (+ clients) · top talent · mobile
 * innovation · experts · why hire · free-trial band · plans · process ·
 * testimonials. Every "Start 40 Hours Free Trial" button opens the trial modal.
 *
 * No JSX here — every block is typed against the prop type of the section that
 * renders it.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/landing/industries";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { EnquiryFormContent } from "@/components/common/enquiry-form";
import { testimonials } from "@/lib/home/content";
import {
  CLIENTS_PLUS,
  FIGURES,
  SPECIALISTS_PLUS,
  YEARS_PLUS,
} from "@/lib/company-figures";

export const adMeta = {
  path: "/ad/app-developer",
  // The live page's <title> and meta description, verbatim.
  title: "Hire Remote App Developers on Contract",
  description: `Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $${FIGURES.hourlyRate}. Connect with us to get started!`,
} as const;

/** The in-page target every "Start 40 Hours Free Trial" button uses — `TrialModal` opens on it. */
export const TRIAL_HREF = "#trial";

const TRIAL_LABEL = "Start 40 Hours Free Trial →";
export const AD_TRIAL_CTA = { label: TRIAL_LABEL, href: TRIAL_HREF } as const;
const BOOK_MEETING = {
  label: "Book a Meeting",
  href: "https://calendly.com/soft_suave/dedicated-teams",
  external: true,
} as const;

/** The live form's dropdown, option for option. */
const TECH_STACK_OPTIONS = [
  "Front-End (React, Angular, Vue)",
  "Back-End (Node, PHP, .NET)",
  "Fullstack Developers",
  "Mobile Dev (Flutter, React Native)",
  "AI & ML Engineers",
  "DevOps/Cloud (AWS, Azure)",
  "Custom Requirements (Let’s discuss)",
] as const;

export const adHero: HeroContent = {
  titleLines: ["Hire Mobile App", "Developers for Your Project"],
  accent: "Mobile App Developers",
  body: [
    "Need top-rated remote app developers on contract? Hire remote app developers from india and enjoy the 40-hour free trial to experience their expertise!",
    "*Satisfaction Guaranteed – Get 40-hour Free Trial",
  ],
  points: [],
  // "RATED ★★★★★ ON" over the live hero's four marks, as its own files — in its
  // order: Clutch, Upwork, GoodFirms, AWS Partner Network. (Their alt text on the
  // live page reads "Microsoft / Upwork / Clutch / Clutch", which is not what the
  // artwork shows.) Dark wordmarks, so they sit on the hero's white plaques.
  badgesLabel: "Rated ★★★★★ on",
  badges: [
    {
      src: "/brand/ad/badge-clutch.webp",
      alt: "Clutch",
      width: 218,
      height: 64,
    },
    {
      src: "/brand/ad/badge-upwork.webp",
      alt: "Upwork",
      width: 215,
      height: 64,
    },
    {
      src: "/brand/ad/badge-goodfirms.webp",
      alt: "GoodFirms",
      width: 426,
      height: 64,
    },
    {
      src: "/brand/ad/badge-aws.webp",
      alt: "AWS Partner Network",
      width: 234,
      height: 64,
    },
  ],
  ctas: [AD_TRIAL_CTA, BOOK_MEETING],
  ctaSeparator: "OR",
  form: {
    title: "Get 40-hour Risk Free Trial",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Start My FREE Trial",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "Tell us about your requirements",
    subject: "Ad landing: 40-Hour Free Trial (app developer)",
  },
};

export const adClients = {
  title: "Preferred Technology Partner for Startups and SMBs Globally",
  body: "We use the latest technology and AI innovation to help startups transform digitally, guiding them through product development with unmatched experience and actionable results.",
} as const;

/** "Top Talent": masthead, four figures, the trial CTA, then the three engagement models. */
export const adTalent = {
  eyebrow: "Top Talent",
  title: "Hire Remote App Developers For All Your Tech Needs",
  body: "Access top-tier remote app developers on contract to seamlessly scale your team and meet all your technology requirements with flexibility and expertise.",
  stats: [
    { figure: YEARS_PLUS, label: "Glorious Years of Service" },
    { figure: CLIENTS_PLUS, label: "Happy Clients Worldwide" },
    { figure: SPECIALISTS_PLUS, label: "AI-Powered Developers" },
    { figure: "97%", label: "Client Retention Rate" },
  ],
  cta: AD_TRIAL_CTA,
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
      body: "Get a custom solution tailored to your requirements, delivered within your budget, and ideal for both short-term tasks and long-term projects.",
    },
  ],
} as const;

export const adMobile: CardGridContent = {
  eyebrow: "Mobile Innovation",
  title: "Hire Mobile App Developers For Your Evolving Project Needs",
  body: "Be it developing native Android and iOS mobile apps or cross-platform apps, our expert mobile app developers for hire can assist you every step of the way in your dream app development.",
  items: [
    {
      name: "Android",
      body: "Android is one of the most dominant operating systems. Our on-demand Android developers are proficient in developing top-tier Android Apps at an affordable cost that fits your business needs.",
      icon: "code",
    },
    {
      name: "iOS",
      body: "Soft Suave is the home for the top skilled iOS developers in India, and we excel in developing premium and feature-rich iOS Apps with innovative designs for startups and SMBs.",
      icon: "spark",
    },
    {
      name: "React-Native",
      body: "React Native is a powerful open-source framework. Mobile developers from Soft Suave are highly experienced in React-native to develop Apps that feel and perform like native Apps.",
      icon: "layers",
    },
    {
      name: "Flutter",
      body: "Our dedicated mobile App developer's extensive knowledge in flutter assists us to craft premium and feature-rich iOS and Android Apps that deliver a great user experience and excellent performance.",
      icon: "rocket",
    },
    {
      name: "Ionic",
      body: "Ionic is an HTML5 SDK that can create native-feeling mobile Apps. Our dedicated mobile App experts build custom, cost-effective, and easy-to-handle cross-platform Apps using Ionic.",
      icon: "plug",
    },
    {
      name: "Xamarin",
      body: "Our experienced mobile App programmer's extensive knowledge of Xamarin helps us to craft custom, interactive, and robust native applications for multiple platforms at your budget.",
      icon: "cpu",
    },
  ],
};

/** "Ready to discuss?" — the line the live page puts above its Hire Developers Now button. */
export const adMobileCta = {
  lead: "Ready to discuss?",
  label: "Hire Developers Now →",
  href: TRIAL_HREF,
} as const;

export const adExperts: TechStackContent = {
  eyebrow: "Experts",
  title: "We Have The Skills You're Looking For",
  body: "Soft Suave is committed to delivering optimal technology solutions for global clients, with expertise in diverse areas such as mobility, web development, Blockchain, AI, and more. Our experienced software programmers cater to all your development needs.",
  groups: [
    {
      name: "Front End",
      items: [
        "Angular",
        "Vue",
        "React",
        "UI/UX",
        "HTML 5",
        "CSS3",
        "Javascript",
      ],
    },
    {
      name: "Back End",
      items: [
        "Node",
        ".NET",
        "PHP",
        "Laravel",
        "Java",
        "Python",
        "Golang",
        "Ruby On Rails",
      ],
    },
    {
      name: "AI/ML",
      items: [
        "Tensorflow",
        "Pytorch",
        "Deep Learning",
        "AI/ML",
        "Computer Vision",
        "RPA",
        "Business Intelligence",
      ],
    },
    { name: "Cloud", items: ["Google Cloud", "AWS", "Microsoft Azure"] },
  ],
};

/** The live "Why Hire…" block is a plain list under a heading — no intro, no card copy. */
export const adWhy = {
  title: "Why Hire Remote App Developers on Contract from Soft Suave",
  items: [
    "Dedicated Remote App Developers",
    "160 Working Hours/Month with Flexible Hiring Models",
    "Simple & Transparent Pricing",
    "Agile Methodology",
    "40 Hours Risk-Free Trial",
    "Strict NDA Signed for Complete Privacy",
    "Faster Resource Accessibility",
    "Focus on Your Core Business",
    "Large Technical Pool with wider Technology Stack",
    "Client Satisfaction is Our Highest Priority",
  ],
} as const;

/** "Try Developers Free for 40 Hrs" band: trial button OR Book a Meeting. */
export const adTrialBand: CtaBandContent = {
  title: "Try Developers Free for 40 Hrs – Pay Only If Satisfied",
  body: "Start your 40-hours risk free trial and get perfect fit for your project or book a free consultation for your project planning, time & budget estimation.",
  cta: AD_TRIAL_CTA,
  secondary: BOOK_MEETING,
};

export const adPricing = {
  eyebrow: "Plans",
  title: "Choose the Right Pricing Plan for Your Custom Need",
  body: "Simple & Transparent Pricing | Fully Signed NDA | Code Security | Easy Exit Policy",
  plans: [
    {
      price: `$${FIGURES.hourlyRate}`,
      unit: "Hourly (USD)",
      body: "On-Demand Dedicated Developer with fully signed NDA",
    },
    {
      price: "$2240",
      unit: "Monthly (USD)",
      body: "100% dedicated Remote Developer with fully signed NDA",
    },
  ],
  fixed: { title: "Looking For a Fixed Price?", body: "On Time Delivery" },
  cta: AD_TRIAL_CTA,
} as const;

export const adProcess: ProcessContent = {
  eyebrow: "Process",
  title: "Hire Dedicated Remote App Developer in 4 Steps",
  body: "Onboarding dedicated remote app developers gets easier with our simple 4-step hiring process!",
  cta: AD_TRIAL_CTA,
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

/**
 * The five reviews the live page shows, in its order and its words. Portraits
 * and video links come from the homepage's records of the same people; the live
 * page gives Roland White and Aaron G. no role, so none is shown.
 */
const byName = (name: string) =>
  testimonials.items.find((t) => t.name.includes(name))!;

export const adTestimonials = {
  eyebrow: "Testimonials",
  title: "What Our Clients Say About Us",
  body: testimonials.body,
  items: [
    {
      ...byName("Tim"),
      quote:
        "Soft Suave's commitment to meeting deadlines, flexibility in working hours, and ability to seamlessly integrate with our U.S. team make them a reliable and invaluable technology partner.",
      role: "Chief Operating Officer - Phoenix Technologies",
    },
    {
      ...byName("Dara"),
      quote:
        "Their 40-hour free trial isn't just a marketing promise-it's a genuine opportunity to experience top-notch developer skills. I was beyond impressed with what they delivered during the trial period!",
      name: "Dara Huang MD",
      role: "Co-Founder - Perkypet",
    },
    {
      ...byName("Dimitris"),
      quote:
        "I have been working with Soft Suave for past 3 years and the experience was quite unique. Soft Suave helped us overcome the barriers that we had from software development point of view. Partnering with Soft Suave reduced our costs by 40% and increased our delivery speed by 20%.",
      role: "Founder, CEO - AMD telecom",
    },
    {
      ...byName("Roland"),
      quote:
        "I've been asking Soft Suave to help me develop a mobile app. The team is available right from the start. They're nice guys to work with and highly recommend them. Thanks.",
      role: "",
    },
    {
      ...byName("Aaron"),
      quote:
        "Soft Suave provides amazing service. I am completely satisfied with the projects and look forward to continuing my relationship. I will also recommend their services without question.",
      role: "",
    },
  ],
} as const;

/**
 * The modal every trial button opens ("40-hour Trial, 100% Risk Free"). On the
 * live page it is a second copy of the hero form with a "Submit" button.
 */
export const adTrialForm: EnquiryFormContent = {
  title: "40-hour Trial, 100% Risk Free",
  body: "Choose the right developer to start your 1-week Free Trial.",
  note: "Alert: This form is for business, not candidates. To apply for jobs,",
  noteLink: { label: "click here", href: "/career-overview" },
  submit: "Submit",
  sending: "Sending...",
  requirementLabel: "Requirements",
  requirementPlaceholder: "Tell us about your requirements",
  subject: "Ad landing: 40-Hour Free Trial modal (app developer)",
};
