/**
 * Copy for `/ad/software-developer` — a clone of softsuave.com/ad/software-developer,
 * the paid-traffic landing page for hiring remote software developers on contract.
 *
 * Only what the live page RENDERS, word for word. Live order: masthead · hero
 * (+ form, + clients) · top talent · services (+ "Ready to discuss?") · technology
 * stack · why hire (+ "Try Now, Pay Later") · plans · process (4 steps) ·
 * testimonials. There is no closing form: every "Start 40 Hours Free Trial" and
 * "Hire Developers Now" button opens the trial popup (`sdTrialForm`). The trial
 * duration is 40 hours everywhere, as on this site's other /ad pages.
 *
 * The clients, plans, the four process steps' copy and the testimonials are word
 * for word the live /ad/app-developer page's, so they are reused from it.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { TechStackContent } from "@/components/home/tech-stack";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { EnquiryFormContent } from "@/components/common/enquiry-form";
import {
  AD_TRIAL_CTA,
  BOOK_MEETING,
  TRIAL_HREF,
  adClients,
  adHero,
  adPricing,
  adTestimonials,
  adTrialForm,
} from "@/lib/home/ad-app-developer-content";
import { CLIENTS_PLUS, FIGURES, SPECIALISTS_PLUS, YEARS_PLUS } from "@/lib/company-figures";

export const sdMeta = {
  path: "/ad/software-developer",
  // The live page's <title> and description, verbatim.
  title: "Hire Remote Software Developers on Contract",
  description: `Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $${FIGURES.hourlyRate}. Connect with us to get started!`,
} as const;

export { TRIAL_HREF };
export const sdClients = adClients;
export const sdPricing = adPricing;
export const sdTestimonials = adTestimonials;

export const sdHero: HeroContent = {
  ...adHero,
  titleLines: ["Hire Software Developers:", "Top Remote Experts"],
  accent: "Software Developers",
  body: [
    "Want to hire remote software developers on contract? Start your 40-hour free trial with our Indian experts and experience their expertise risk-free!",
    "*Satisfaction Guaranteed – Get 40-hour Free Trial",
  ],
  form: {
    ...adHero.form!,
    subject: "Ad landing: 40-Hour Free Trial (software developer)",
  },
};

export const sdTalent = {
  eyebrow: "Top Talent",
  title: "Hire Software Developers For All Your Tech Needs",
  body: "We can partner with you at any stage of your Software Development Lifecycle, offering flexible cooperation models that fit your goals, resources and timeline.",
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

/** A mark converted from the live page, under /public/brand/ad/software. */
const icon = (file: string, alt: string) => [{ src: `/brand/ad/software/${file}.webp`, alt }];

export const sdServices: CardGridContent = {
  eyebrow: "Our Services",
  title: "Hire Software Developers for All Your Technology Needs",
  body: "Enhance your tech initiatives with our dedicated software developers. We specialize in various technologies to help your projects achieve maximum potential.",
  items: [
    { name: "Hire Web App Developers", body: "Expand your team with expert web app developers delivering responsive, secure, and high-performance solutions.", images: icon("native_nodejs_app", "Hire Web App Developers"), link: false },
    { name: "Hire Mobile App Developers", body: "Hire iOS and Android developers to build smooth, high‑performance mobile apps that boost engagement and deliver seamless experiences.", images: icon("mobile-dev", "Hire Mobile App Developers"), link: false },
    { name: "Hire Frontend Developers", body: "Bring interfaces to life with frontend developers who craft dynamic, responsive, and visually appealing applications for a seamless user experience.", images: icon("web-app-dev", "Hire Frontend Developers"), link: false },
    { name: "Hire Backend Developers", body: "Boost your app with backend developers who build secure, scalable systems for smooth data flow and minimal downtime.", images: icon("software-12", "Hire Backend Developers"), link: false },
    { name: "Hire Fullstack Developers", body: "Get skilled full‑stack developers who handle front‑end and back‑end seamlessly, ensuring scalable, secure, and efficient solutions.", images: icon("full-stack", "Hire Fullstack Developers"), link: false },
    { name: "Hire DevOps Engineers", body: "Accelerate development with DevOps developers who streamline integration and delivery for faster, reliable, and stable deployments.", images: icon("devops-eng", "Hire DevOps Engineers"), link: false },
    { name: "Hire Blockchain Developers", body: "Unlock blockchain potential with developers who build secure, decentralized apps offering transparency, immutability, and efficiency.", images: icon("blockchain", "Hire DevOps Engineers"), link: false },
    { name: "Hire E-commerce Developer", body: "Scale your business with dedicated e-commerce developers who build secure, user-friendly, high-performing platforms to boost sales and conversions.", images: icon("ecommerce", "Hire QA Team"), link: false },
    { name: "Hire Game Developer", body: "Bring your game ideas to life with expert developers who create immersive, high‑performance games for all platforms.", images: icon("testing", "Hire QA Team"), link: false },
    { name: "Hire Saas Developer", body: "Transform your business with SaaS developers who build scalable, secure cloud apps that simplify operations and enhance customer experiences.", images: icon("saas", "Hire QA Team"), link: false },
    { name: "Hire Fintech Software Developers", body: "Build innovative financial solutions with fintech developers who create secure, high‑impact apps that streamline operations and enhance user experience.", images: icon("fintech", "Hire QA Team"), link: false },
  ],
};
export const sdServicesCta = { lead: "Ready to discuss?", label: "Hire Developers Now →", href: TRIAL_HREF } as const;

/**
 * The live stack is three marquee rows of marks, in this order and with these
 * repeats (each row scrolls as one loop; the rows alternate direction).
 */
const ROW_1 = [
  "React", "Vue.js", "Javascript", "Bootstrap", "HTML", "CSS", "IOS", "Ember", "Next", "Node Js", ".Net", "ROR",
  "Swift", "Kotlin", "Java", "Go", "Flutter", "Ionic", "AWS", "Azure", "Google Cloud", "Docker", "Jenkins",
  "Ansible", "Kubernetes", "Photoshop", "Illustrator", "Adobe XD", "Figma", "Selenium",
];
const ROW_2 = [
  "Bootstrap", "Html", "CSS", "PHP", "Java", "Python", "Node Js", ".Net", "React", "Vue.js", "Cordova", "Bootstrap",
  "SQL Server", "CSS", "PHP", "Java", "Python", "Node.js", ".Net", "ROR", "Swift", "Kotlin", "Mongodb", "React",
  "Flutter", "Ionic", "AWS", "Azure", "Google Cloud", "Docker", "Jenkins", "Ansible", "Kubernetes", "Photoshop",
  "Illustrator", "Adobe XD", "Figma", "Selenium",
];
const ROW_3 = [
  "React", "Flutter", "Ionic", "AWS", "Azure", "Google Cloud", "Docker", "Jenkins", "Ansible", "Xamarin",
  "Photoshop", "Illustrator", "Adobe XD", "Figma", "Selenium", "React", "Vue.js", "Javascript", "Bootstrap", "Html",
  "CSS", "PHP", "Java", "Python", "Node Js", ".Net", "ROR", "Swift", "Kotlin", "Java",
];

export const sdTech: TechStackContent = {
  eyebrow: "Technology Stack",
  title: "Transforming Ideas with Next-Gen Tech",
  body: `Our ${SPECIALISTS_PLUS} AI-enabled developers specialize in cutting-edge technologies and platforms. Our comprehensive tech stack covers everything from design to testing, ensuring seamless and efficient development.`,
  groups: [
    { name: "", items: ROW_1 },
    { name: "", items: ROW_2 },
    { name: "", items: ROW_3 },
  ],
  images: Object.fromEntries(
    Object.entries({
      React: "react", "Vue.js": "vue-9-1", Javascript: "javascript-1", Bootstrap: "bootstrap", HTML: "html-5", Html: "html-5", CSS: "css3",
      IOS: "ios-svgrepo-com", Ember: "ember-logo", "Node Js": "nodejs", ".Net": "dotnet-1",
      ROR: "ror-2", Swift: "swift", Kotlin: "kotlinlang-icon", Java: "java", Go: "Go-Logo_Aqua", Flutter: "flutter",
      Ionic: "ionic", AWS: "aws", Azure: "azure", "Google Cloud": "google-cloud", Docker: "docker", Jenkins: "jenkins-new",
      Ansible: "anisible", Kubernetes: "kubernets", Photoshop: "adobe-photoshop-2", Illustrator: "adobe-illustrator-cc-icon",
      "Adobe XD": "adobe-xd-2", Figma: "figma-1", Selenium: "selenium-2", PHP: "php-logo-1", Python: "python",
      Cordova: "cordova-seeklogo", "SQL Server": "microsoft-sql-server", "Node.js": "nodejs", Mongodb: "mongodb-svgrepo",
      Xamarin: "xamarin-seeklogo",
    }).map(([name, file]) => [name, `/brand/ad/tech/${file}.webp`]),
  ),
};

/** The live "Why Hire…" block: a heading over a plain list. */
export const sdWhy = {
  title: "Why Hire Software Developers from Soft Suave",
  items: [
    "Dedicated Remote Developers",
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

export const sdTrialBand: CtaBandContent = {
  title: "Try Now, Pay Later",
  body: "Start your 40 Hours risk free trial and get perfect fit for your project or book a free consultation for your project planning, time & budget estimation.",
  cta: AD_TRIAL_CTA,
  secondary: BOOK_MEETING,
};

export const sdProcess: ProcessContent = {
  eyebrow: "Process",
  title: "Hire Dedicated Software Developer in 4 Steps",
  body: "Brief us about your project, & what kind of remote software developers you are looking to hire",
  cta: AD_TRIAL_CTA,
  steps: [
    { n: "1", name: "Share Your Developer Requirement", body: "Share your project scope, required skills, timeline, and preferred hiring model with our team." },
    { n: "2", name: "Review Curated Developer Profiles", body: "Get shortlisted developer profiles matched to your skills, goals, availability, and team needs." },
    { n: "3", name: "Start the 40-Hour Risk-Free Trial", body: "Test the developer’s coding skills, communication, quality, and workflow fit before onboarding." },
    { n: "4", name: "Onboard the Developer to Your Team", body: "Finalize SLA and NDA, set up communication, and integrate the developer into your workflow." },
  ],
};

/** The popup every trial button opens: the live form with no heading, a "Submit" button and the privacy line. */
export const sdTrialForm: EnquiryFormContent = {
  ...adTrialForm,
  title: "",
  body: undefined,
  subject: "Ad landing: 40-Hour Free Trial modal (software developer)",
};
