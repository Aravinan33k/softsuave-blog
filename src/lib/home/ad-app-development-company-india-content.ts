/**
 * Copy for `/ad/app-development-company-india` — a clone of
 * softsuave.com/ad/app-development-company-india, the paid-traffic landing page
 * for mobile app development.
 *
 * Only what the live page RENDERS, word for word. Live order: masthead ("Get
 * Quote") · hero (+ form, + four badges) · clients · "Your Partner for Next-Gen
 * Mobile Applications" · "Why Trust Soft Suave" (three tabs) · technology stack ·
 * industries · "Success Proven App Screens" · testimonials · "Get in Touch with
 * us!". Every "Get …" button opens the enquiry popup. The page names no trial
 * length of its own, so there is no duration to correct (its testimonial already
 * says "40-hour").
 *
 * This is the /ad/android-development-company page's sibling, so the tabs'
 * illustrations, the industries' icons, the app screens and the closing band
 * are reused from it, and the technology stack from /ad/software-developer —
 * the same marquee rows, word for word.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { EnquiryFormContent } from "@/components/common/enquiry-form";
import type { StepTabsContent } from "@/components/ad/step-tabs";
import type { ContactBandContent } from "@/components/ad/contact-band";
import { testimonials } from "@/lib/home/content";
import { partnerHeroBadges } from "@/lib/home/hero-badges";
import { TRIAL_HREF, adClients, adTestimonials } from "@/lib/home/ad-app-developer-content";
import { sdTech } from "@/lib/home/ad-software-developer-content";
import { anIndustries, anIndustriesCta, anScreens, anWhy } from "@/lib/home/ad-android-development-company-content";

export const apMeta = {
  path: "/ad/app-development-company-india",
  // The live page's <title>; it sets no description, so one is written from its hero.
  title: "Top Mobile App Development Company in India",
  description:
    "Partner with top-rated mobile app developers to design, build, and scale innovative apps. We help startups and SMEs speed up time-to-market, reduce costs, and deliver secure, high-performing solutions.",
} as const;

export { TRIAL_HREF };
export const apClients = adClients;
export const apTech = sdTech;
export const apScreens = { ...anScreens, eyebrow: "Our Work", title: "Success Proven App Screens" };

const GET = (label: string) => ({ label, href: TRIAL_HREF });

const form: EnquiryFormContent = {
  eyebrow: "Save 60%",
  title: "Start Your Dream Project!",
  body: "Fast response. Free guidance. Zero obligation",
  note: "Alert: This form is for business, not candidates. To apply for jobs,",
  noteLink: { label: "click here", href: "/career-overview" },
  submit: "Get My Free Quote",
  sending: "Sending...",
  requirementLabel: "Your Requirements",
  requirementPlaceholder: "Your Requirements",
  subject: "Ad landing: Free quote (app development company India)",
};

export const apHero: HeroContent = {
  titleLines: ["Build Mobile Apps", "10X FASTER"],
  accent: "10X FASTER",
  body: [
    "Partner with top-rated mobile app developers to design, build, and scale innovative apps. We help startups and SMEs speed up time-to-market, reduce costs, and deliver secure, high-performing solutions.",
  ],
  points: [
    "Save Upto 60% Development Cost",
    "Flexible Engagement Models",
    "Non-disclosure Agreement",
    "Agile/DevOps Process Enablement",
  ],
  // Upwork, Clutch, Microsoft, AWS — the live hero's four marks, in its order.
  badges: partnerHeroBadges,
  ctas: [],
  logoCta: GET("Get Quote"),
  // The live masthead's mail button.
  logoMail: "contact@softsuave.com",
  form,
};

const svc = (file: string) => [{ src: `/brand/ad/app/svc-${file}.webp`, alt: "", width: 112, height: 112 }];
export const apServices: CardGridContent = {
  eyebrow: "",
  title: "Your Partner for Next-Gen Mobile Applications",
  body: "We craft scalable, secure, and high-performing mobile applications tailored to your business goals. From startups to enterprises, our team ensures your app delivers seamless user experiences and drives measurable growth.",
  items: [
    { name: "iOS Development", body: "Deliver sleek, secure, and user-friendly iOS applications built on the latest Apple technologies. Our iOS experts design apps that meet your business needs while providing exceptional user experiences.", images: svc("ios"), link: false },
    { name: "Android Development", body: "Reach a global audience with Android apps that are fast, intuitive, and feature-rich. We develop customized solutions that scale easily and align perfectly with your business objectives.", images: svc("android"), link: false },
    { name: "Cross-Platform Development", body: "Save time and costs with hybrid apps that run smoothly across iOS and Android. Our cross-platform solutions maximize code reusability without compromising performance or design.", images: svc("cross"), link: false },
  ],
};
export const apServicesCta = GET("Get Your Free App Quote");

export const apWhy: StepTabsContent = {
  eyebrow: "Why Us?",
  title: "Why Trust Soft Suave for Your App Development?",
  intro: "We Ensure Zero Risk, High Performance & 100% Confidentiality.",
  steps: [
    {
      ...anWhy.steps[0],
      title: "Turn Your Ideas into Powerful Wireframes",
      accent: "Wireframes",
      body: "We shape your raw concepts into wireframes that define flow, structure, and functionality — ensuring clarity from day one.",
    },
    {
      ...anWhy.steps[1],
      body: "From iOS & Android to cross-platform, our developers craft secure, high-performing apps with clean code and seamless integration.",
    },
    {
      ...anWhy.steps[2],
      body: "We handle app store submission, updates, and post-launch support so your app is future-ready from day one.",
    },
  ],
};

export const apIndustries: CardGridContent = {
  ...anIndustries,
  eyebrow: "Industries",
  title: "Introducing AI in Industries for Efficiency and Growth",
  body: "AI is revolutionizing industries by enhancing efficiency, enabling scalability, and driving innovation. From intelligent automation to data-driven solutions, we help industries innovate and stay ahead in a digital world.",
};
export const apIndustriesCta = anIndustriesCta;

/** The five reviews the live carousel shows, in its order; Roland White and Aaron G. carry no role there. */
const byName = (name: string) => adTestimonials.items.find((t) => t.name.includes(name))!;
export const apTestimonials = {
  eyebrow: "Testimonials",
  title: "What Our Clients Say About Us",
  body: testimonials.body,
  items: [byName("Aaron"), byName("Tim"), byName("Dara"), byName("Dimitris"), byName("Roland")].map((t) => ({
    ...t,
  })),
};

export const apContact: ContactBandContent = {
  title: "Get in Touch with us!",
  body: "Let Us Become Your Partner In Developing A Memorable Digital Experience!",
  email: "contact@softsuave.com",
  form: {
    title: "Get Your App Development Plan",
    submit: "Submit Now",
    sending: "Sending...",
    requirementLabel: "Your Requirements",
    requirementPlaceholder: "Your Requirements",
    subject: "Ad landing: Get Your App Development Plan (app development company India)",
  },
};

/** What every "Get …" button opens: the hero's own form. */
export const apPopup = form;
