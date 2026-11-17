/**
 * Copy for `/ad/on-demand-app-development-company` — a clone of
 * softsuave.com/ad/on-demand-app-development-company, the paid-traffic landing page for
 * on-demand app development.
 *
 * Only what the live page RENDERS, word for word (typos included). Live order: masthead
 * (logo only) · hero (+ form, + four badges) · clients · "Solutions" (sixteen photo
 * cards) · technology stack · "On-Demand Tech Talent for Enterprise Innovation" band ·
 * "Which Growth path fits your Business Best ?" (four steps) · "From Idea to Launch…"
 * (three cards) · "Select Your Path" band · testimonials. No closing form. Every "Get …"
 * and "Launch …" button opens the enquiry popup.
 *
 * "From Idea to Launch: … in Just 7 Days" reads "in Just 40 Hours" here, as on this
 * site's other /ad pages.
 *
 * The hero form and badges, the clients, the technology stack and the testimonials are
 * word for word what /ad/app-development-company-india carries, so they are reused.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { CardGridContent } from "@/components/generative-ai/industries";
import type { CtaBandContent as GenAiCtaBandContent } from "@/components/generative-ai/cta-band";
import type { ProblemsContent } from "@/components/generative-ai/problems";
import type { AudienceCardsContent } from "@/components/ad/audience-cards";
import {
  TRIAL_HREF,
  apClients,
  apHero,
  apPopup,
  apTech,
  apTestimonials,
} from "@/lib/home/ad-app-development-company-india-content";

export const odMeta = {
  path: "/ad/on-demand-app-development-company",
  // The live page's <title>; it sets no description, so one is written from its hero.
  title: "Top Mobile App Development Company in India",
  description:
    "We are a leading AI-powered on-demand app development company creating smart, scalable, and user-centric solutions. Leverage AI to automate, optimize, and grow your on-demand business faster than ever.",
} as const;

export { TRIAL_HREF };
export const odClients = apClients;
export const odTech = apTech;
export const odTestimonials = apTestimonials;
export const odPopup = apPopup;

export const odHero: HeroContent = {
  ...apHero,
  eyebrow: "AI-Powered",
  titleLines: ["On-Demand App Development Company", "Delivery Scalable Service"],
  titleSubLast: true,
  accent: "On-Demand App",
  body: [
    "We are a leading AI-powered on-demand app development company creating smart, scalable, and user-centric solutions. Leverage AI to automate, optimize, and grow your on-demand business faster than ever",
  ],
  points: [],
  // No masthead button (the live "Get Quote" is left out, as asked) and no mail button.
  logoCta: undefined,
  logoMail: undefined,
};

const photo = (name: string, body: string, file: string) => ({
  name,
  body,
  image: `/brand/ad/ondemand/sol-${file}.webp`,
  link: false as const,
});

export const odSolutions: CardGridContent = {
  eyebrow: "Solutions",
  title: "On-Demand Solutions Built for Real-World Business Models",
  body: "From cab booking and food delivery to hyperlocal and lifestyle platforms — we build apps users rely on daily. Popular On-Demand Apps We Build:",
  items: [
    photo("Food Delivery", "Build Seamless Delivery Platforms with AI Driven Recomendations,Order tracking and Inventory Automation", "food"),
    photo("Healthcare & Telemedicine", "Enable Virtual Consultations and Appointment Booking and AI powered Symptom and Checking for improved patient care", "health"),
    photo("Beauty & Wellness", "FOffer on-demand salon or spa bookings with personalized suggestions, scheduling, and mobile payments.", "beauty"),
    photo("E-Learning & Tutoring", "Connect learners with tutors via live sessions, personalized content, and AI-powered progress tracking.", "elearning"),
    photo("Flower Delivery", "Delight customers with same-day flower delivery through a beautifully branded, feature-rich app experience.", "flower"),
    photo("Laundry App", "Transform your laundry business through tailored laundry app development, delivering convenience, live tracking, & higher ROI.", "laundry"),
    photo("Logistics App", "Optimize your logistics operations with real-time tracking, route planning, and seamless dispatch management.", "logistics"),
    photo("Fuel & Gas Delivery", "ensure on-time delivery and 5-star service with a smart fuel & gas app that handles scheduling, routing, and payments.", "fuel"),
    photo("Courier Delivery", "Power your courier service with a robust tech suite for real-time tracking, proof of delivery, and customer updates.", "courier"),
    photo("Home Service", "Connect users with trusted professionals for plumbing, cleaning, repairs, and more — all within one app.", "home"),
    photo("Tools Delivery", "Deliver essential tools right to worksites with a fast, efficient app tailored for contractors and businesses.", "tools"),
    photo("Taxi & Ride-Hailing", "Accelerate mobility success through uber like clone app development, offering live navigation & seamless driver management.", "taxi"),
    photo("Pizza Delivery", "Serve hot pizza faster with an app that handles orders, delivery status, and customer preferences with ease.", "pizza"),
    photo("Ice Cream Delivery", "Deliver frozen treats without delay using a smart delivery app designed for temperature-sensitive items.", "icecream"),
    photo("Pickup & Drop", "Simplify logistics for customers and businesses with real-time pickups, drop-offs, and optimized routing.", "pickup"),
    photo("Grocery Delivery", "Grow revenue with feature-packed on demand grocery delivery app development, enabling real-time inventory & smooth orders.", "grocery"),
  ],
};

/** The band the generative-ai page closes its sections on ("Have a Generative AI Use Case in Mind?"). */
export const odTalentBand: GenAiCtaBandContent = {
  title: "On-Demand Tech Talent for Enterprise Innovation",
  body: "From building custom platforms to integrating legacy systems, our expert developers deliver solutions designed for performance and longevity.",
  cta: { label: "Get Top Developers On Board ›", href: TRIAL_HREF },
};

const step = (label: string, name: string, file: string) => ({
  problem: `${label} ${name}`,
  solution: "",
  image: `/brand/ad/ondemand/step-${file}.webp`,
});

/** The generative-ai page's "Business Problems…" selector: a list on the left, a photograph on the right. */
export const odGrowth: ProblemsContent = {
  eyebrow: "Accelerate",
  title: "Which Growth path fits your Business Best ?",
  body: "No matter the stage, we have the tools, technology, and expertise to move you forward. Select your business type and start building your success today.",
  columns: ["", ""],
  rows: [
    step("Step 1", "Discovery & Consultation", "consult"),
    step("Step 2", "UI/UX Design", "uiux"),
    step("Step 3", "Development & Integration", "dev"),
    step("Step 4", "Testing, Launch & Optimization", "opt"),
  ],
};

const aud = (file: string, size: [number, number]) => ({ src: `/brand/ad/ondemand/aud-${file}.webp`, width: size[0], height: size[1] });

export const odAudience: AudienceCardsContent = {
  eyebrow: "Accelerate",
  title: "From Idea to Launch: Build Your On-Demand App Solution in Just 40 Hours",
  body: "Experience the power of AI in on-demand app development with our detailed, efficient process that transforms your concept into a smart, user-friendly solution",
  cards: [
    {
      name: "Startup",
      lead: "You’ve got the vision — now let’s bring it to life with tech that grows with you.",
      points: ["Launch fast without heavy upfront investment", "Test your MVP with minimal risk", "Build a scalable foundation from day one"],
      image: aud("startups", [140, 140]),
    },
    {
      name: "SMBs",
      lead: "Scale smarter with flexible, cost-effective solutions tailored for your evolving needs.",
      points: ["Streamline operations and reduce manual work", "Customize features as your business grows", "Get tools without enterprise pricing"],
      image: aud("smb", [156, 140]),
    },
    {
      name: "Enterprise",
      lead: "Take innovation to the next level with robust enterprise-grade technology.",
      points: ["Integrate seamlessly with existing systems", "Handle high-volume operations", "Customize deeply for complex workflows"],
      image: aud("enterprise", [140, 140]),
    },
  ],
};

/** The closing band, as the generative-ai page's "Business Enquiry" one: copy and a button, centred. */
export const odPathBand = {
  title: "Select Your Path — We’ll Handle the Rest!",
  body: "Wherever your business stands, we’ve got the tech to move it forward. Pick your stage, and let’s get started.",
  cta: { label: "Launch Your App Today ›", href: TRIAL_HREF },
} as const;
