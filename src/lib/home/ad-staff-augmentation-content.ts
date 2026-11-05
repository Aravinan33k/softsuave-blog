/**
 * Copy for `/ad/staff-augmentation` — a clone of softsuave.com/ad/staff-augmentation,
 * the paid-traffic landing page for staff augmentation and software services.
 *
 * Only what the live page RENDERS, word for word. Live order: masthead ("Start 40
 * Hours Free Trial") · hero (no form: a button, a note and an illustration) · clients
 * · "Our Core Services" (seven cards) · "Hire Developers On-Demand" (six "Hire Now"
 * cards) · "Why Choose Soft Suave" (five cards + a closing line) · testimonials ·
 * "Let's Build the Future Together". No closing form: every trial, "Talk to Our
 * Experts" and "Hire Now" button opens the same popup. The trial length is 40 hours
 * throughout.
 *
 * It is /ad/remote-developers' sibling: the clients, the "Why Choose" cards and
 * closing line, the testimonials and the popup are word for word what that page
 * carries, so they are reused from it.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { IntegrationContent } from "@/components/generative-ai/integration";
import type { CtaBandContent } from "@/components/landing/cta-band";
import { AD_TRIAL_CTA, TRIAL_HREF } from "@/lib/home/ad-app-developer-content";
import {
  rsClients,
  rsMeta,
  rsPopup,
  rsTestimonials,
  rsWhy,
  rsWhyClosing,
} from "@/lib/home/ad-remote-developers-content";

export const saugMeta = {
  path: "/ad/staff-augmentation",
  // The live page's <title> and description, verbatim (the same as /ad/remote-developers').
  title: rsMeta.title,
  description: rsMeta.description,
} as const;

export { TRIAL_HREF };
export const saugClients = rsClients;
export const saugWhyClosing = rsWhyClosing;
export const saugTestimonials = rsTestimonials;

export const saugHero: HeroContent = {
  titleLines: ["Build, Scale, and Innovate with Soft Suave"],
  accent: "Build, Scale, and Innovate",
  body: [
    "Your trusted technology partner for IT Staff Augmentation, Custom Software Development, AI & Automation Consulting, and Cloud & DevOps Solutions.",
    "* Get Free 40-hour Trial * No credit card required.",
  ],
  points: [],
  ctas: [{ label: "Talk to Our Experts →", href: TRIAL_HREF }],
  logoCta: AD_TRIAL_CTA,
  aside: { src: "/brand/ad/staffaug/hero.webp", width: 1000, height: 875, alt: "Soft Suave illustration" },
};

const icon = (file: string, alt: string) => [{ src: `/brand/ad/staffaug/${file}.webp`, alt, width: 112, height: 112 }];

export const saugServices: CardGridContent = {
  eyebrow: "Our Services",
  title: "Our Core Services",
  body: "Enhance your tech initiatives with dedicated developers. We specialize in various technologies to help your projects achieve maximum potential.",
  items: [
    { name: "IT Staff Augmentation", body: "Build flexible remote teams with skilled developers, engineers, and IT specialists on demand. Empower decisions with data intelligence.", images: icon("ad_staff", "IT Staff Augmentation"), link: false },
    { name: "Software Development", body: "Custom web, mobile, and enterprise software development tailored to your business goals. From MVP to full-scale products.", images: icon("ad_software", "Software Development"), link: false },
    { name: "Quality Assurance & Testing", body: "Ensure flawless performance with manual and automated testing across all platforms. Deliver quality with confidence.", images: icon("ad_quality", "Quality Assurance & Testing"), link: false },
    { name: "Software Consulting & Maintenance", body: "Optimize, upgrade, and maintain your existing systems for better performance and scalability. Legacy modernization made simple.", images: icon("ad_maintenance", "Software Consulting & Maintenance"), link: false },
    { name: "AI & Automation Consulting", body: "Integrate AI and automation to enhance productivity and decision-making. Smarter workflows, higher efficiency.", images: icon("ad_ai", "AI & Automation Consulting"), link: false },
    { name: "Cloud & DevOps Services", body: "Streamline deployment, monitoring, and scalability with modern cloud infrastructure and CI/CD. Faster releases, zero downtime.", images: icon("ad_cloud", "Cloud & DevOps Services"), link: false },
    { name: "Data Engineering & Analytics", body: "Transform raw data into powerful insights using data pipelines, analytics, and BI dashboards. Empower decisions with data intelligence.", images: icon("ad_data", "Data Engineering & Analytics"), link: false },
  ],
};

const blk = (label: string, body: string, file: string) => ({
  label,
  body,
  image: { src: `/brand/ad/staffaug/${file}.webp`, alt: label },
});

export const saugHire: IntegrationContent & { cta: { label: string; href: string } } = {
  eyebrow: "Hire",
  title: "Hire Developers On-Demand",
  body: "With proven expertise, rapid hiring, flexible models, and cost-effective solutions, we provide top-tier talent that seamlessly integrates, driving growth, innovation, and success for your business.",
  blocks: [
    blk("Frontend Developers", "React | Angular | Vue.js", "ad_frontend"),
    blk("Backend Developers", "Node.js | Java | Python", "ad_backend"),
    blk("Mobile App Developers", "Flutter | iOS | Android", "ad_mobile"),
    blk("Cloud Engineers", "AWS | Azure | GCP", "ad_cloud_computing"),
    blk("Data & AI Experts", "TensorFlow | Power BI", "ad_data_expert"),
    blk("QA Testers", "Selenium | Cypress", "ad_qa"),
  ],
  cta: { label: "Hire Now", href: TRIAL_HREF },
};

/** The five "Why Choose" cards, as /ad/remote-developers has them, each with the live page's own icon. */
export const saugWhy: CardGridContent = {
  ...rsWhy,
  eyebrow: "Why choose Us",
  noIcons: false,
  items: rsWhy.items.map((it, i) => ({
    ...it,
    images: icon(`adwcui${i + 1}`, it.name),
    link: false as const,
  })),
};

export const saugClosingBand: CtaBandContent = {
  title: "Let's Build the Future Together",
  body: "Ready to hire the best developers or accelerate your digital transformation? Partner with Soft Suave today.",
  cta: AD_TRIAL_CTA,
};

/** What every trial, "Talk to Our Experts" and "Hire Now" button opens: the remote-developers popup, with this page's lead subject. */
export const saugPopup = {
  side: rsPopup.side,
  form: { ...rsPopup.form, subject: "Ad landing: Staffing gaps enquiry (staff augmentation page)" },
};
