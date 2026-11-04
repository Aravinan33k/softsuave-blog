/**
 * Copy for `/ad/remote-developer` — a clone of
 * softsuave.com/ad/remote-developer, the paid-traffic landing page for hiring
 * remote developers on contract.
 *
 * Only what the live page RENDERS is here. Live order: hero (+ form, + clients)
 * · why choose us · services · technology stack · code & practice · process ·
 * experts · testimonials. There is no closing form: every "Start 40 Hours Free
 * Trial" and "Hire Now" button opens the same two-column popup (`rdPopup`).
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { ProcessContent } from "@/components/landing/process";
import type { EnquiryFormContent } from "@/components/common/enquiry-form";
import { adClients, adHero, adTestimonials, TRIAL_HREF } from "@/lib/home/ad-app-developer-content";
import { FIGURES, SPECIALISTS_PLUS } from "@/lib/company-figures";

export const rdMeta = {
  path: "/ad/remote-developer",
  // The live page's <title> and description, verbatim.
  title: "Hire Remote Developers on Contract",
  description: `Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $${FIGURES.hourlyRate}. Connect with us to get started!`,
} as const;

export { TRIAL_HREF };
export const rdClients = adClients;
export const rdTestimonials = adTestimonials;

const TRIAL_CTA = { label: "Start 40 Hours Free Trial →", href: TRIAL_HREF } as const;

/** A mark converted from the live page, under /public/brand/ad/remote. */
const img = (file: string, alt: string, size?: readonly [number, number]) => ({
  src: `/brand/ad/remote/${file}.webp`,
  alt,
  ...(size ? { width: size[0], height: size[1] } : {}),
});

export const rdHero: HeroContent = {
  ...adHero,
  titleLines: ["Hire Remote Developers", "on Contract"],
  accent: "Remote Developers",
  body: [
    "Need top-rated remote developers on contract? Hire remote developers from india and enjoy the 40-hour free trial to experience their expertise!",
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
    subject: "Ad landing: 40-Hour Free Trial (remote developers)",
  },
};

export const rdWhy: CardGridContent = {
  eyebrow: "Why choose Us",
  noIcons: true,
  title: "Why Choose Soft Suave",
  body: "With proven expertise, rapid hiring, flexible models, and cost-effective solutions, we provide top-tier talent that seamlessly integrates, driving growth, innovation, and success for your business.",
  items: [
    { name: "Top 3% Tech Talent", body: "Handpicked professionals with proven experience" },
    { name: "Flexible Engagement Models", body: "On-demand, dedicated, or project-based" },
    { name: "Global Delivery Capability", body: "Across time zones & technologies" },
    { name: "Faster Time to Market", body: "Agile processes for rapid delivery" },
    { name: "Full Transparency", body: "No hidden costs or surprises" },
  ],
};
export const rdWhyClosing = "We’re not just a staffing partner — we’re your technology growth engine.";

export const rdServices: CardGridContent = {
  eyebrow: "Our Services",
  noIcons: true,
  title: "Hire Dedicated Developers for All Your Technology Needs",
  body: "Enhance your tech initiatives with dedicated developers. We specialize in various technologies to help your projects achieve maximum potential.",
  items: [
    { name: "Hire Web App Developers", body: "Skilled web app developers build fast, secure, and responsive apps. They add dynamic features and deliver solutions that bring your web ideas to life with accuracy.", link: false },
    { name: "Hire Mobile App Developers", body: "Hire mobile app developers for smooth, intuitive iOS and Android apps. We create high-performance mobile solutions that boost engagement on any device.", link: false },
    { name: "Hire Frontend Developers", body: "Frontend developers craft clean, responsive, and visually rich interfaces. They ensure smooth user experiences across devices with strong design and performance.", link: false },
    { name: "Hire Backend Developers", body: "Backend developers build secure, scalable systems that ensure smooth data flow and strong integrations. They keep your app stable, efficient, and reliable.", link: false },
    { name: "Hire Fullstack Developers", body: "Full-stack developers handle both front and back end with ease. They build secure, scalable, and efficient apps by connecting all layers for end-to-end results.", link: false },
    { name: "Hire DevOps Engineers", body: "DevOps developers streamline processes for faster delivery and stable systems. They enhance collaboration, improve reliability, and support smooth deployments.", link: false },
    { name: "Hire Blockchain Developers", body: "Blockchain developers build secure, decentralized apps. They deliver transparent and efficient solutions, from smart contracts to advanced crypto projects.", link: false },
    { name: "Hire eCommerce Developer", body: "E-commerce developers build secure, fast, and user-friendly stores. They boost conversions, enhance customer experience, and support your online business growth.", link: false },
    { name: "Hire Game Developer", body: "Game developers create immersive, high-performance games for mobile, desktop, and consoles. They turn ideas into engaging experiences using advanced tech.", link: false },
    { name: "Hire Saas Developer", body: "SaaS developers build secure, scalable cloud apps that simplify operations. They enhance user experience and support your goals with powerful SaaS solutions.", link: false },
    { name: "Hire Fintech Software Developers", body: "Fintech developers build secure, modern financial apps. They improve operations, enhance user experience, and use advanced tech to support the future of finance.", link: false },
  ],
};
export const rdServicesCta = { lead: "Ready to discuss?", ...TRIAL_CTA } as const;

export const rdTech: TechStackContent = {
  eyebrow: "Technology Stack",
  title: "Transforming Ideas with Next-Gen Tech",
  body: `Our ${SPECIALISTS_PLUS} AI-enabled developers specialize in cutting-edge technologies and platforms. Our comprehensive tech stack covers everything from design to testing, ensuring seamless and efficient development.`,
  groups: [
    { name: "Front-End", items: ["React Js", "Angular Js", "UI UX", "Vue Js", "Javascript", "HTML", "CSS"] },
    { name: "Back-End", items: ["PHP", "Java", "Python", "Node JS", ".Net", "ROR", "Laravel", "Golang"] },
    { name: "AI/ML", items: ["Tensorflow", "Pytorch", "Deep Learning", "AI/ML", "Computer Vision", "RPA", "Business Intelligence"] },
    { name: "Cloud", items: ["Aws", "Azure", "Cloud"] },
  ],
};

export const rdPractice: CardGridContent = {
  eyebrow: "Code & Practice",
  title: "Our Coding Standards, Dev Practices - Your Success",
  body: "With clean code, smart workflows, and proven development practices, we build reliable products that drive your success from day one.",
  items: [
    { name: "Agile, Transparent Development", body: "We follow Agile methodology with sprint-based delivery and real-time updates.", images: [img("agile_development", "Agile, Transparent Development")] },
    { name: "ISO-Certified Company", body: "We're an ISO 27001 and 9001 certified software development company.", images: [img("certificate", "ISO-Certified Company")] },
    { name: "Pre-Vetted Developers", body: "Every developer goes through a rigorous vetting process, including technical assessments, portfolio reviews, and interviews.", images: [img("pre_vetted_developer", "Pre-Vetted Developers")] },
    { name: "100% In-House Team", body: `${SPECIALISTS_PLUS} developers working under one roof.`, images: [img("inhouse_team", "100% In-House Team")] },
    { name: "Flexible Hiring Models", body: "Full-time, part-time, or hourly contracts.", images: [img("hiring", "Flexible Hiring Models")] },
    { name: "Expertise in Latest Tech Stacks", body: "Flutter, React, Angular, AI/ML, and more.", images: [img("tech_stack", "Expertise in Latest Tech Stacks")] },
    { name: "Global Trust, Local Execution", body: "Serving USA, UK, Ireland & Europe.", images: [img("trust", "Global Trust, Local Execution")] },
  ],
};

/** The live steps carry the tab labels Define / Select / Evaluate / Onboard, shown here as each card's label. */
export const rdProcess: ProcessContent = {
  eyebrow: "Process",
  title: "Hire Dedicated Remote Developer in 4 Steps",
  body: "Onboarding dedicated remote developers gets easier with our simple 4-step hiring process!",
  cta: TRIAL_CTA,
  steps: [
    {
      n: "Define",
      name: "Step 1: Share the JD",
      body: "Start by sharing your detailed Job Description (JD) with us. Briefly explain your project goals, technical requirements, and the type of developers you need for your app development. The more clarity you provide, the better we can understand your vision and match you with the right talent.",
    },
    {
      n: "Select",
      name: "Step 2: Shortlist The Right Developers",
      body: "Based on your requirements, we present a curated list of top developers who best align with your project’s technical stack, experience level, and domain expertise. You can review their profiles, skill sets, and past work to shortlist the ideal candidates.",
    },
    {
      n: "Evaluate",
      name: "Step 3: Free 40-hour Trial",
      body: "Experience our developers’ capabilities firsthand by taking advantage of a free 40-hour trial. This allows you to assess their technical proficiency, communication style, and overall fit for your project before making any commitment.",
    },
    {
      n: "Onboard",
      name: "Step 4: Onboard & Manage",
      body: "Once you’ve chosen your developer, we help you seamlessly onboard the resource. You’ll sign the necessary SLA and NDA documents to ensure complete confidentiality and transparency. After onboarding, you can directly manage the developer as an extended part of your own team.",
    },
  ],
};

/**
 * "Experts" — twenty role cards, each a technology mark, a title and a "Hire
 * Now" button that opens the popup. Rendered as the engagement-model cards
 * (`Integration`, bold).
 */
export const rdExperts = {
  eyebrow: "Experts",
  title: "We Have The Skills You're Looking For",
  body: "Soft Suave is committed to delivering optimal technology solutions for global clients, with expertise in diverse areas such as mobility, web development, Blockchain, AI, and more. Our experienced software programmers cater to all your development needs.",
  blocks: [
    ["Hire PHP Developer", "t_php"],
    ["Hire Python Developer", "t_python"],
    ["Hire React Developer", "t_react"],
    ["Hire Laravel Developer", "t_laravel"],
    ["Hire Node.js Developer", "t_nodejs"],
    ["Hire Django Developer", "t_django"],
    ["Hire Angular Developer", "t_angular"],
    ["Hire Flutter Developer", "t_flutter"],
    ["Hire Java Developer", "t_java"],
    ["Hire ROR Developer", "t_ror"],
    ["Hire .Net Developer", "t_dot-net"],
    ["Hire NestJS Developer", "t_nestjs"],
    ["Hire React Native Developer", "t_react"],
    ["Hire Ionic Developer", "t_ionic"],
    ["Hire Kotlin Developer", "t_kotlin"],
    ["Hire Magento Developer", "t_magento"],
    ["Hire Swift Developer", "t_swift"],
    ["Hire Drupal Developer", "t_drupal"],
    ["Hire MERN Developer", "t_mern"],
    ["Hire MEAN Developer", "t_mean"],
  ].map(([label, file]) => ({ label, body: "", image: img(file, label) })),
  cta: { label: "Hire Now", href: TRIAL_HREF },
} as const;

/**
 * What every "Start 40 Hours Free Trial" and "Hire Now" button opens — the live
 * page's two-column popup. Left, from 1000px up: a heading, a line and a
 * scrolling row of seven client logos. Right: the "Staffing gaps?" form.
 */
export const rdPopup = {
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
    /** The live popup's four cards, word for word (they are shorter than the page's testimonials). */
    testimonials: [
      {
        text: "Their 40-hour free trial truly proves their skill—I was very impressed with the results.",
        name: "Tim Maliyil",
        title: "COO - Phoenix Technologies",
        photo: "/brand/testimonials/tim-maliyil.webp",
      },
      {
        text: "Soft Suave has been a great 3-year partner, helping us cut costs and speed delivery.",
        name: "Dara Huang MD",
        title: "Co-Founder- Perkypet",
        photo: "/brand/testimonials/dara-huang.webp",
      },
      {
        text: "Soft Suave has been a solid partner, helping us cut costs and speed up delivery.",
        name: "Dimitris Rokos",
        title: "Founder, CEO - AMD telecom",
        photo: "/brand/testimonials/dimitris-rokos.webp",
      },
      {
        text: "Exceptional service and great results. Highly satisfied and happy to recommend Soft Suave.",
        name: "Aaron. G",
        title: " ",
        photo: "/brand/testimonials/aaron-g.webp",
      },
    ],
  },
  form: {
    title: "Staffing gaps? We fix. Let's discuss!",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "Requirements",
    requirementPlaceholder: "Tell us about your requirements",
    subject: "Ad landing: Staffing gaps enquiry (remote developers)",
  } satisfies EnquiryFormContent,
} as const;
