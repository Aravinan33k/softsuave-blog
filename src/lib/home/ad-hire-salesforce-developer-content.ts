/**
 * Copy for `/ad/hire-salesforce-developer` — a clone of
 * softsuave.com/ad/hire-salesforce-developer, the paid-traffic landing page for
 * hiring Salesforce developers on contract.
 *
 * Only what the live page RENDERS, word for word — its markup comments out a
 * technology-stack block and a testimonials block. Live order: hero (+ client
 * card) · trusted logos · top talent + engagement models · certifications ·
 * services · why hire + trial band · plans · 4 steps · closing form.
 *
 * Every "Start 40 hours Free Trial" button opens the site's existing free-trial form,
 * as on the AI-developer page (the live page's three-way contact chooser is not
 * built, by the same earlier decision). The hero's marks, the clients, the closing
 * "Start Your 40 Hours Trial" block, the engagement models and the four steps are
 * word for word the live AI-developer page's, so they are reused from it.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { ProcessContent } from "@/components/landing/process";
import type { ManagerEnquiryContent } from "@/components/ad/manager-enquiry";
import type { HeroTestimonialContent } from "@/components/ad/hero-testimonial";
import { TRIAL_HREF } from "@/lib/home/ad-app-developer-content";
import {
  aiClients,
  aiEnquiry,
  aiHeroTestimonial,
  aiProcess,
  aiTrialForm,
} from "@/lib/home/ad-hire-ai-developer-content";
import { mbPricing, mbTalent, mbTrialBand, mbWhy } from "@/lib/home/ad-hire-mobile-app-developers-content";
import { CLIENTS_PLUS, FIGURES } from "@/lib/company-figures";

export const sfMeta = {
  path: "/ad/hire-salesforce-developer",
  // The live page's <title> and description, verbatim.
  title: "Hire Salesforce Developers on Contract",
  description: `Looking to hire dedicated developers in India On Contract? Soft Suave offers a 40-hour free trial and pricing beginning at $${FIGURES.hourlyRate}. Connect with us to get started!`,
} as const;

const TRIAL_CTA = { label: "Start 40 hours Free Trial →", href: TRIAL_HREF } as const;

export const sfHero: HeroContent = {
  eyebrow: `Leverage Our Dedicated, Certified Teams Trusted by ${CLIENTS_PLUS} Global Customers`,
  titleLines: ["Hire Salesforce Developers", "on Contract"],
  accent: "Contract",
  body: [
    "Hire skilled Salesforce developers to customize, integrate, and optimize your CRM for seamless business operations.",
  ],
  points: ["Improve Your CRM Solutions with Top 1% Salesforce Developers."],
  ctas: [
    TRIAL_CTA,
    {
      label: "Book a appointment", // sic — the live label
      href: "https://calendly.com/soft_suave/dedicated-teams",
      external: true,
    },
  ],
  ctaSeparator: "OR",
};

/** The hero's client card — this page's reviewer, with the same three marks as the AI-developer page. */
export const sfHeroTestimonial: HeroTestimonialContent = {
  ...aiHeroTestimonial,
  name: "Dimitris Rokos",
  role: "CCO at AMD Telecom",
  photo: { src: "/brand/ad/salesforce/rokos.webp", alt: "Dimitris Rokos, CCO at AMD Telecom" },
};

export const sfClients = aiClients;

// The models come from the mobile page's copy: here "Build a Team from Scratch" reads
// "Get the team of Developers, Designers, QA, DevOps & PM" (the AI page says "AI Developers").
export const sfTalent = {
  ...mbTalent,
  title: "Hire Salesforce Developers For Seamless CRM Solutions",
  body: "Our certified Salesforce developers help you customize, integrate, and optimize your CRM for automation, efficiency, and business growth.",
};

/** "Our Salesforce Certifications" — the live carousel's ten badges, in its order. */
export const sfCerts = {
  title: "Our Salesforce Certifications",
  body: "With industry-recognized certifications, we guarantee best practices, security, and efficiency in every project.",
  logos: Array.from({ length: 10 }, (_, i) => ({
    name: `Salesforce certification ${i + 1}`,
    src: `/brand/ad/salesforce/cert-${i + 1}.webp`,
  })),
} as const;

/** "Expertise of Our Salesforce Developers" — six cards, each with its own icon. */
export const sfServices: CardGridContent = {
  eyebrow: "",
  title: "Expertise of Our Salesforce Developers",
  body: "From Salesforce implementation to customization and ongoing support, our developers ensure your CRM is optimized for automation, data security, and enhanced customer experiences.",
  items: [
    {
      images: [{ src: "/brand/ad/salesforce/svc-consultation.webp", width: 192, height: 192, alt: "Salesforce Consultation" }],
      link: false,
      name: "Salesforce Consultation",
      body: "Maximize your business efficiency and drive growth with our expert Salesforce consultants, offering tailored strategies to fully optimize your CRM system.",
    },
    {
      images: [{ src: "/brand/ad/salesforce/svc-customization.webp", width: 192, height: 192, alt: "Salesforce Customization" }],
      link: false,
      name: "Salesforce Customization",
      body: "Enhance CRM functionality with tailored solutions. Hire certified Salesforce developers to streamline workflows and offer unparalleled flexibility in customer management.",
    },
    {
      images: [{ src: "/brand/ad/salesforce/svc-implementation.webp", width: 192, height: 192, alt: "Implementation & Integration" }],
      link: false,
      name: "Implementation & Integration",
      body: "Seamlessly integrate Salesforce with existing systems. Utilize our expertise for smooth implementation, ensuring consistent data management and operational efficiency.",
    },
    {
      images: [{ src: "/brand/ad/salesforce/svc-migration.webp", width: 192, height: 192, alt: "Salesforce Migration" }],
      link: false,
      name: "Salesforce Migration",
      body: "Effortlessly transition to Salesforce with a structured migration strategy. Embrace a smooth shift from legacy systems to modern Salesforce solutions with minimal disruption.",
    },
    {
      images: [{ src: "/brand/ad/salesforce/svc-support.webp", width: 192, height: 192, alt: "Salesforce Support & Maintenance" }],
      link: false,
      name: "Salesforce Support & Maintenance",
      body: "Ensure continuous performance with dedicated support. Hire remote Salesforce developers for expert maintenance to keep your CRM running smoothly and efficiently.",
    },
    {
      images: [{ src: "/brand/ad/salesforce/svc-cloud.webp", width: 192, height: 192, alt: "Salesforce Cloud Services" }],
      link: false,
      name: "Salesforce Cloud Services",
      body: "Enhance scalability with Salesforce cloud solutions. Access cutting-edge capabilities that meet business needs and drive growth through advanced cloud-based CRM.",
    },
  ],
};

export const sfWhy = { ...mbWhy, title: "Why Hire Salesforce Developers from Soft Suave" };

export const sfTrialBand: CtaBandContent = mbTrialBand;

export const sfPricing = {
  ...mbPricing,
  plans: [
    { ...mbPricing.plans[0], body: "On-Demand Salesforce Developer with fully signed NDA" },
    { ...mbPricing.plans[1], body: "100% dedicated Salesforce Developer with fully signed NDA" },
  ],
};

export const sfProcess: ProcessContent = {
  ...aiProcess,
  title: "Hire Dedicated Salesforce Developer in 4 Steps",
  body: "Onboarding remote Salesforce developers gets easier with our simple 4-step hiring process!",
  cta: TRIAL_CTA,
};

/** The closing "Start Your 40 Hours Trial" block — the AI-developer page's, with this page's lead subject. */
export const sfEnquiry: ManagerEnquiryContent = {
  ...aiEnquiry,
  form: { ...aiEnquiry.form, subject: "Ad landing: Start Your 40 Hours Trial (Salesforce developers)" },
};

/** What every "Start 40 hours Free Trial" button opens — the site's existing free-trial form. */
export const sfTrialForm = aiTrialForm;
