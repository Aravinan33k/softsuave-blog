/**
 * Copy for the "AI Solutions for eCommerce" landing page
 * (`/ai-solutions-for-ecommerce`).
 *
 * The hero is this page's own and is kept as it was. Everything below it — and
 * the page's title, description and schema — follows the live softsuave.com
 * page, which was rebuilt with a new section set (review: "Need to update the
 * entire page, as the sections have been completely changed"). The mapping, in
 * live page order:
 *
 *   client logo strip                                → homepage `Clients`
 *   "E-commerce Challenges Solved by AI Solutions"   → `ecommerceChallenges` (5)
 *   "Why Choose Soft Suave Technologies for AI ..."   → `ecommerceWhyUs`
 *   "Custom AI Development Services for E-commerce"  → `ecommerceServices` (5)
 *   "Innovative AI Technologies & Approaches"        → `industryTechApproach`
 *   "E-commerce AI Implementation Process"           → `ecommerceProcess` (6)
 *   "Real E-commerce Success With AI Solutions"      → `ecommerceSuccessStories` (2)
 *   "FAQs About AI Solution for E-commerce"          → `ecommerceFaqs` (15)
 *   "Ready to Transform Your eCommerce Strategy ..." → `ecommerceCta`
 *
 * The copy is the live page's own, verbatim. The live page runs no testimonials
 * block, so this page has none.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { ProcessContent } from "@/components/landing/process";
import type { FaqContent } from "@/components/landing/faq";
import type { ProblemsContent } from "@/components/generative-ai/problems";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { WorkCarouselContent } from "@/components/home/work-grid";
import { industryHeroBadges, industryEnquiryForm } from "./industry-shared";

export const ecommerceMeta = {
  slug: "ai-solutions-for-ecommerce",
  path: "/ai-solutions-for-ecommerce",
  // The live page's <title> and meta description, verbatim.
  title: "AI Solution for E-commerce to Personalize Every Buying Journey",
  description:
    "Soft Suave’s AI Solution for Ecommerce enhances personalization, search, pricing, and forecasting to reduce cart abandonment & drive scalable growth.",
} as const;

export const ecommerceHero: HeroContent = {
  titleLines: ["AI Solutions for E-commerce", "to Boost Sales & Automate Growth"],
  // 13 Oct review: the industry name is the highlighted phrase in the H1
  // ("eg for Ecommerce page - ecommerce in H1 must be highlighted").
  accent: "E-commerce",
  body: [
    "Predict intent, personalise the journey, and automate the operations behind it. We build recommendation, pricing, search, and forecasting systems that run against your own catalogue and behavioural data, inside the platform you already sell on.",
    "E-commerce is the sector where AI is easiest to evaluate honestly: conversion, average order value, return rate, and stock position are all measured already, so a model either moves a number you track or it does not.",
  ],
  points: [
    "Recommendation and personalisation engines",
    "Dynamic pricing and demand forecasting",
    "Visual and natural-language product search",
    "Cart recovery and conversion optimisation",
    "Shopify, Magento, WooCommerce and custom platforms",
  ],
  badges: industryHeroBadges,
  form: industryEnquiryForm({
    title: "Plan your e-commerce AI build",
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The metric you want to move, your platform and catalogue size, order volumes, and the systems the solution would need to integrate with.",
    subject: "E-commerce AI solutions enquiry",
  }),
  // The live page's own hero artwork (13 Oct review: "use the existing images
  // from the respective pages for the hero"), under the strong veil ("increase
  // the black gradient in the hero section to make the text more readable").
  image: {
    src: "/images/industries/ecommerce/hero.webp",
    width: 1920,
    height: 988,
    alt: "A hand tapping a holographic shopping cart above a laptop",
    blurDataURL:
      "data:image/webp;base64,UklGRoAAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSBcAAAABF/D8/4iIgSDbpghDuD/pESL6n/4wAABWUDggQgAAAPABAJ0BKhAACAADgFollAJ0AQvPh9ilEAD+9CUvIvN33YyXr8LJAcwLPKO1zXuvsjnDsXTTjz4yXcZ1sqGBVoAAAA==",
    veil: "strong",
  },
};

/**
 * The live page's five challenge tabs: the challenge selects, its answer fills
 * the panel, which wears the live page's own image for that challenge.
 */
export const ecommerceChallenges: ProblemsContent = {
  eyebrow: "Challenges",
  title: "E-commerce Challenges Solved by AI Solutions",
  body: "Transform scattered e-commerce operations into a connected, data-driven growth engine that predicts behavior, optimizes every interaction, and removes friction from first click to final checkout.",
  columns: ["Challenge", "How AI solves it"],
  rows: [
    {
      problem: "Cart abandonment reduction",
      solution:
        "Stop losing ready-to-buy customers with AI that predicts drop-offs, triggers timely nudges, and recovers abandoned carts before they disappear.",
      image: "/images/industries/ecommerce/challenge-1.webp",
    },
    {
      problem: "Personalized shopping experiences",
      solution:
        "Transform static catalogs into dynamic storefronts with AI that curates products, content, and offers based on intent and behavior.",
      image: "/images/industries/ecommerce/challenge-2.webp",
    },
    {
      problem: "Real‑time customer support",
      solution:
        "Deliver human-like support with AI agents that understand context, resolve queries instantly, and keep shoppers moving confidently toward checkout.",
      image: "/images/industries/ecommerce/challenge-3.webp",
    },
    {
      problem: "Intelligent product search",
      solution:
        "Help customers find exactly what they want faster with an AI search that understands natural language, intent, typos, and visuals.",
      image: "/images/industries/ecommerce/challenge-4.webp",
    },
    {
      problem: "Accurate sales forecasting",
      solution:
        "Stay ahead of demand with AI that analyzes trends, seasonality, and behavior to forecast sales and guide smarter decisions.",
      image: "/images/industries/ecommerce/challenge-5.webp",
    },
  ],
};

export const ecommerceWhyUs: OverviewContent = {
  eyebrow: "Why Soft Suave",
  title: "Why Choose Soft Suave Technologies for AI E-commerce Development",
  paragraphs: [
    "Soft Suave Technologies transforms your e-commerce business with cutting-edge AI solutions that enhance customer experiences, optimize operations, and drive growth. Our expert team delivers scalable, customized AI tools to ensure your online store stays competitive and efficient.",
  ],
  points: [
    "Tailored AI solutions for unique needs",
    "End-to-end expertise in AI integration",
    "Utilization of cutting-edge AI technologies",
    "Proven track record of successful projects",
  ],
  // The live section's "Get Free Consultation" button; /contact, as the
  // reviews ask of every consultation CTA.
  cta: { label: "Get Free Consultation", href: "/contact" },
  // The live page's own artwork for this section (13 Oct review: "use the
  // existing images from the respective pages ... wherever possible"): a
  // transparent cut-out collage, shown whole and centred against the copy.
  image: {
    src: "/images/industries/ecommerce/overview.webp",
    width: 735,
    height: 559,
    aspect: "735 / 559",
    fit: "cutout",
    align: "center",
    alt: "A collage of a shopper paying on a phone, a shopping cart with parcels, and a robot carrying a gift box",
    blurDataURL:
      "data:image/webp;base64,UklGRu4AAABXRUJQVlA4WAoAAAAQAAAADwAACwAAQUxQSFAAAAABYFNbW5tvTx17VRMb/8mMhIjKxvwrYAcBGGBOo1iIiAlw918hfHu1p4ywRETzfm0BrxiOLAFAnGFmKZnZ+LwAIOLaM6VuMBMR2UBYJymPA1ZQOCB4AAAAcAIAnQEqEAAMAAOAWiWwAnRH/4tZHKQRe1aVoAD+rFv/m77LszWTKZ+qOwZKYCF3PF4lh8Kt0nAPcTDDhLWcI5lHi6njcy4adB1fOyHExpYis4bcZBl3/pmx/R+AuTYoxZVH4bxA0jKuRngVkmAIDzoJCC5Gc54A",
  },
};

export const ecommerceServices: ServicesContent = {
  eyebrow: "What We Build",
  title: "Custom AI Development Services for E-commerce Businesses",
  body: "Build precisely what your e-commerce brand needs with tailored AI solutions that integrate with your system, scale with demand, and keep you ahead of competitors.",
  items: [
    {
      name: "AI‑Powered Recommendation Systems",
      body: "Unlock Amazon-grade recommendations with AI engines that learn from every click, view, and purchase to keep customers discovering more.",
    },
    {
      name: "Chatbots & Virtual Assistants",
      body: "Deploy smart conversational agents that guide purchases, handle FAQs, and upsell in real time across web, mobile, and messaging channels.",
    },
    {
      name: "Predictive Analytics & Demand Forecasting",
      body: "Turn historical data into forward-looking insight with AI models that predict demand, customer value, and campaign performance before you spend.",
    },
    {
      name: "Smart Pricing & Dynamic Pricing Algorithms",
      body: "Stay profitable and competitive with AI that optimizes prices dynamically based on demand, inventory, and competitor signals in real time.",
    },
    {
      name: "Visual Search & Computer Vision",
      body: "Let shoppers search with images, not just words, using computer vision that recognizes products instantly and surfaces the closest matches.",
    },
  ],
};

export const ecommerceProcess: ProcessContent = {
  eyebrow: "Our Process",
  title: "E-commerce AI Implementation Process",
  body: "Move from idea to impact through a structured AI delivery framework that validates use cases, proves ROI quickly, and scales safely across your business.",
  steps: [
    { n: "01", name: "Goal Definition", body: "Define goals and AI use cases aligned with e-commerce growth priorities." },
    { n: "02", name: "Readiness Assessment", body: "Audit data, platforms, and integrations to confirm AI-readiness and gaps." },
    { n: "03", name: "Solution Design", body: "Design AI architecture, select tools, and finalize implementation roadmap collaboratively." },
    { n: "04", name: "Model Development", body: "Develop, train, and integrate AI models into core e-commerce workflows." },
    { n: "05", name: "Testing & Validation", body: "Test performance, validate KPIs, and refine models using real behavior." },
    { n: "06", name: "Optimization & Scale", body: "Launch your system, track performance, and improve experiences using valuable insights." },
  ],
};

/**
 * The live page's two success stories. Each leads on its first published
 * result; the rest of its results list follows as the card's body.
 */
export const ecommerceSuccessStories: WorkCarouselContent = {
  eyebrow: "Success Stories",
  title: "Real E-commerce Success With AI Solutions",
  body: "Discover how leading e-commerce brands achieved measurable results through our AI solutions, driving growth, improving efficiency, and delivering lasting customer success.",
  // The live page's two stories as the image-led lane the other industry
  // pages run (13 Oct review: "need to redesign the success stories
  // section"), each with the live page's own artwork and its results list as
  // the line under the title, as the FinTech lane carries them.
  items: [
    {
      tag: "Retail",
      title: "Optimizing Retail Operations With A Comprehensive E-commerce Solution",
      body: "+85% Improvement In Inventory Precision · +70% Onboarding & Product Approval · +60% Offer & Coupon Management · -50% Reduction In Workload · +40% Boost In Sales & Customer Retention",
      image: {
        src: "/images/industries/ecommerce/case-1.webp",
        alt: "A shopper on a laptop surrounded by floating e-commerce icons",
      },
    },
    {
      tag: "Marketplace",
      title: "Redefining Online Shopping with an Intuitive Platform for Effortless Transactions",
      body: "50% Enhanced Product Visibility and Sales · 55% Higher Transaction Security and Trust · 45% Increased User Engagement · 45% Improved Seller Approval and Product Quality · 35% Faster Order Fulfillment and Processing Time",
      image: {
        src: "/images/industries/ecommerce/case-2.webp",
        alt: "A shopper paying by card on a laptop while browsing on a phone",
      },
    },
  ],
};

/**
 * The mid-page call to action (13 Oct review: "CTA section is missing - must
 * be updated"), the band the Telecom and Construction pages already run. The
 * live page's closing band, verbatim. Its "Request a Consultation" goes to
 * /contact, as every consultation CTA here does.
 */
export const ecommerceCta: CtaBandContent = {
  title: "Ready to Transform Your E-commerce Strategy with AI?",
  body: "Let Soft Suave power your growth with intelligent, scalable solutions tailored for tomorrow’s digital marketplace.",
  cta: { label: "Request a Consultation", href: "/contact" },
};

export const ecommerceFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "FAQs About AI Solution for E-commerce",
  body:
    "Find clear answers to common questions to help you make informed decisions and accelerate business growth.",
  items: [
    {
      q: "Which company develops custom AI solutions for e-commerce?",
      a: "Many top companies like Soft Suave specialize in developing custom AI solutions for e-commerce, offering personalized recommendations, predictive analytics, and automation to improve customer experience, sales, and operational efficiency.",
    },
    {
      q: "How much does it cost to develop custom AI solutions for an e-commerce platform?",
      a: "The cost of developing custom AI solutions for e-commerce varies based on complexity, features, and integration requirements. For an accurate estimate, please contact our experts, as costs can differ widely.",
    },
    {
      q: "What AI solutions are most commonly used in e-commerce?",
      a: "Common AI solutions in e-commerce include product recommendations, advanced search functionality, dynamic pricing, demand forecasting, and customer behavior analysis to enhance user experience and drive sales.",
    },
    {
      q: "How does AI improve product recommendations on an e-commerce website?",
      a: "AI improves product recommendations by analyzing customer data, browsing history, and purchase patterns to suggest personalized products, increasing engagement and conversion rates through tailored shopping experiences.",
    },
    {
      q: "Can AI reduce product return rates for e-commerce businesses?",
      a: "Yes, AI can reduce product return rates by providing accurate size recommendations, predicting preferences, and offering virtual try-ons, which help customers make more informed purchase decisions.",
    },
    {
      q: "How does dynamic pricing AI work for online stores?",
      a: "Dynamic pricing AI uses real-time data, competitor prices, and demand trends to adjust product pricing automatically, maximizing revenue, optimizing inventory, and staying competitive in the market.",
    },
    // The live page's other nine questions, verbatim and in its order (13 Oct
    // review: "few faqs missing").
    {
      q: "Can AI help predict demand and improve inventory forecasting accuracy?",
      a: "Yes, AI can analyze historical sales data, market trends, and external factors to predict demand, improving inventory forecasting accuracy and ensuring optimal stock levels to meet customer needs.",
    },
    {
      q: "What is an AI-powered visual search, and how does it help customers find products faster?",
      a: "AI-powered visual search allows customers to upload images to search for similar products, enhancing the shopping experience by enabling faster, more intuitive product discovery based on visual features.",
    },
    {
      q: "How does AI automate product tagging and catalog management?",
      a: "AI automates product tagging and catalog management by analyzing product attributes, categorizing items, and generating relevant tags based on images, descriptions, and historical data, reducing manual effort and errors",
    },
    {
      q: "Can AI integrate with Shopify, Magento, WooCommerce, BigCommerce, or custom e-commerce platforms?",
      a: "Yes, AI solutions can integrate with platforms like Shopify, Magento, WooCommerce, BigCommerce, and custom e-commerce platforms through APIs and plugins, enhancing functionalities like recommendations, search, and pricing.",
    },
    {
      q: "How do you ensure data security and privacy when implementing AI in e-commerce?",
      a: "Data security and privacy are ensured by implementing strong encryption, adhering to GDPR and other regulatory standards, and using secure data storage and transfer protocols to protect customer information.",
    },
    {
      q: "What role does AI play in detecting fraud in online transactions?",
      a: "AI helps detect fraud by analyzing transaction patterns, identifying anomalies, and flagging suspicious activities in real-time, minimizing fraud risk and protecting both customers and businesses from financial loss.",
    },
    {
      q: "How does AI improve customer support for e-commerce brands through chatbots and virtual assistants?",
      a: "AI-powered chatbots and virtual assistants improve customer support by providing instant responses, handling routine inquiries, assisting with product recommendations, and resolving issues, enhancing customer satisfaction and reducing response time.",
    },
    {
      q: "How does AI help with abandoned cart recovery and conversion rate optimization?",
      a: "AI helps recover abandoned carts by analyzing customer behavior, sending personalized reminders or offers, and optimizing conversion rates by offering dynamic discounts or incentives based on customer activity and preferences.",
    },
    {
      q: "Can small or mid-size e-commerce stores benefit from AI solutions, or is AI only for enterprise brands?",
      a: "Small and mid-size e-commerce stores can also benefit from AI solutions, including personalized recommendations, customer support chatbots, and inventory forecasting, which are available at affordable price points and scalable to their needs.",
    },
  ],
};
