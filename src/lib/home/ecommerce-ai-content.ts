/**
 * Copy for the "AI Solutions for eCommerce" landing page
 * (`/ai-solutions-for-ecommerce`).
 *
 * Follows the live softsuave.com page: its H1, its five solution cards, its six
 * process steps, its five benefits and its FAQ set are all carried over.
 *
 * The live page lists no sub-sectors — it treats eCommerce as a single vertical
 * — and carries no testimonials block, so this page has neither. An earlier
 * draft added a "retail models" grid; it was removed for the same reason.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";
import { industryHeroBadges, industryEnquiryForm, NDA_NOTE } from "./industry-shared";
import { overviewImage } from "./overview-images";

export const ecommerceMeta = {
  slug: "ai-solutions-for-ecommerce",
  path: "/ai-solutions-for-ecommerce",
  title: "AI Solutions for eCommerce",
  description:
    "Custom eCommerce AI from Soft Suave — recommendation engines, dynamic pricing, demand forecasting, visual search and conversational commerce.",
} as const;

export const ecommerceHero: HeroContent = {
  titleLines: ["AI Solutions for eCommerce", "to Boost Sales & Automate Growth"],
  body: [
    "Predict intent, personalise the journey, and automate the operations behind it. We build recommendation, pricing, search, and forecasting systems that run against your own catalogue and behavioural data, inside the platform you already sell on.",
    "eCommerce is the sector where AI is easiest to evaluate honestly: conversion, average order value, return rate, and stock position are all measured already, so a model either moves a number you track or it does not.",
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
    title: "Plan your eCommerce AI build",
    note: NDA_NOTE,
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The metric you want to move, your platform and catalogue size, order volumes, and the systems the solution would need to integrate with.",
    subject: "eCommerce AI solutions enquiry",
  }),
  image: {
    src: "/images/four/ind-ecommerce-hero.webp",
    width: 1200,
    height: 860,
    alt: "Online retail operations team reviewing AI-driven personalisation and order data",
  },
};

export const ecommerceOverview: OverviewContent = {
  image: overviewImage("ai-solutions-for-ecommerce"),
  eyebrow: "The Short Answer",
  title: "Where AI Moves the Numbers in Retail",
  paragraphs: [
    "Online retail generates more behavioural data per customer than almost any other sector, and most of it goes unused. Every click, search, hesitation, and abandoned basket is a signal about intent, and the gap between collecting those signals and acting on them is where AI earns its return.",
    "The highest-value applications are unglamorous: showing the right product, at a price that is competitive without being unnecessarily cheap, with stock actually available to ship. Recommendation, pricing, and forecasting are the three that move revenue and margin most reliably, and they compound — better forecasting makes pricing safer, and better recommendation makes forecasting easier.",
    "The discipline this sector demands is measurement. Almost any personalisation change looks good against a naive baseline, so we hold out control groups and measure incrementally, because a recommendation engine that takes credit for purchases customers would have made anyway is a very expensive way to feel successful.",
  ],
  pullQuote:
    "A recommendation engine taking credit for purchases the customer would have made anyway is the most common way retail AI overstates itself.",
};

export const ecommerceServices: ServicesContent = {
  eyebrow: "What We Build",
  title: "eCommerce AI Solutions Soft Suave Delivers",
  body: "Five solution areas covering discovery, conversion, pricing and planning. Most engagements begin with whichever one sits closest to the metric you are currently missing.",
  items: [
    {
      name: "AI-Powered Recommendation Engines",
      tag: "Discovery",
      body: "Recommendations that learn from every click, view, and purchase to keep customers discovering, tuned to the objective you actually want — basket size, repeat rate, or margin — rather than to click-through alone.",
    },
    {
      name: "Chatbots & Conversational Commerce",
      tag: "Support",
      body: "Conversational agents that guide purchases, answer product questions, and handle post-order queries across web, mobile, and messaging, with clean handover to a human when the conversation stops being routine.",
    },
    {
      name: "Predictive Analytics & Demand Forecasting",
      tag: "Planning",
      body: "Models that forecast demand, customer lifetime value, and campaign performance before the spend is committed, so buying and marketing decisions are made against a projection rather than last season.",
    },
    {
      name: "Dynamic Pricing Algorithms",
      tag: "Pricing",
      body: "Pricing that responds to demand, inventory position, and competitor movement in real time, inside the floors and guardrails you set — because unconstrained price optimisation finds margin and loses customers.",
    },
    {
      name: "Visual Search & Computer Vision",
      tag: "Search",
      body: "Let shoppers search with an image rather than a description, plus automated product tagging and attribute extraction that keep a large catalogue searchable without manual merchandising effort.",
    },
  ],
};

export const ecommerceBenefits: CardGridContent = {
  eyebrow: "Benefits",
  title: "What eCommerce AI Changes",
  body: "Each of these maps to a number your platform already reports, which is what makes this sector straightforward to build a business case in.",
  items: [
    {
      name: "Fewer Abandoned Carts",
      icon: "coins",
      body: "Models that predict drop-off and trigger the right intervention at the right moment recover baskets that would otherwise be lost, without discounting customers who were going to convert anyway.",
    },
    {
      name: "Personalised Storefronts",
      icon: "users",
      body: "Static catalogues become dynamic storefronts where products, content, and offers respond to demonstrated intent, which raises both conversion and average order value.",
    },
    {
      name: "Support That Scales With Volume",
      icon: "gauge",
      body: "Conversational agents resolve routine queries instantly at any hour, so peak trading does not require a proportional increase in support headcount.",
    },
    {
      name: "Search That Finds the Product",
      icon: "globe",
      body: "Search that understands natural language, intent, typos, and images converts far better than keyword matching, particularly on large or poorly-tagged catalogues.",
    },
    {
      name: "Stock Matched to Demand",
      icon: "book",
      body: "Accurate forecasting reduces both stockouts on the lines that sell and markdown on the lines that do not — usually the single largest margin swing available.",
    },
  ],
};

export const ecommerceProcess: ProcessContent = {
  eyebrow: "How We Deliver",
  title: "Our eCommerce AI Implementation Process",
  body: "Six stages, structured so the measurement design is agreed before the build rather than argued about after the results come in.",
  steps: [
    {
      n: "01",
      image: {
        src: "/images/four/ecommerce-step-1.webp",
        width: 1200,
        height: 900,
        alt: "Goal Definition in an eCommerce AI project",
      },
      name: "Goal Definition",
      body: "We agree which commercial metric the build is meant to move and what a meaningful improvement would be. A use case without a target number cannot be evaluated, only admired.",
    },
    {
      n: "02",
      image: {
        src: "/images/four/ecommerce-step-2.webp",
        width: 1200,
        height: 900,
        alt: "Readiness Assessment in an eCommerce AI project",
      },
      name: "Readiness Assessment",
      body: "We audit your catalogue data, behavioural tracking, platform integrations, and order history to confirm what is usable. Poor product data defeats a recommendation engine faster than a poor model does.",
    },
    {
      n: "03",
      image: {
        src: "/images/four/ecommerce-step-3.webp",
        width: 1200,
        height: 900,
        alt: "Solution Design and Measurement Plan in an eCommerce AI project",
      },
      name: "Solution Design & Measurement Plan",
      body: "We design the architecture and — at the same time — the holdout and experiment design, so incremental impact can actually be measured rather than inferred from a before-and-after that a seasonal trend would also explain.",
    },
    {
      n: "04",
      image: {
        src: "/images/four/ecommerce-step-4.webp",
        width: 1200,
        height: 900,
        alt: "Model Development and Integration in an eCommerce AI project",
      },
      name: "Model Development & Integration",
      body: "Models are built, trained on your data, and integrated into the storefront and back-office workflows through your platform's APIs, whether that is Shopify, Magento, WooCommerce, or a custom stack.",
    },
    {
      n: "05",
      image: {
        src: "/images/four/ecommerce-step-5.webp",
        width: 1200,
        height: 900,
        alt: "Testing and Validation in an eCommerce AI project",
      },
      name: "Testing & Validation",
      body: "Live testing against the holdout, validating the target metric and watching for the second-order effects — margin erosion, return rates, support volume — that a conversion-only view would miss.",
    },
    {
      n: "06",
      image: {
        src: "/images/four/ecommerce-step-6.webp",
        width: 1200,
        height: 900,
        alt: "Optimisation and Scale in an eCommerce AI project",
      },
      name: "Optimisation & Scale",
      body: "Roll out to full traffic, monitor for drift as catalogue and customer mix change, and retrain on a cadence matched to how fast your assortment turns over.",
    },
  ],
};

export const ecommerceMidCta: CtaBandContent = {
  eyebrow: "Talk It Through",
  title: "Not Sure Whether to Start With Search, Recommendation or Forecasting?",
  body: "It depends on where you are losing customers. A short conversation about your funnel and your stock position will usually make the first build obvious.",
  cta: { label: "Book a free consultation", href: "#enquiry" },
};

export const ecommerceFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "FAQs About AI in eCommerce",
  body: "Common questions from retail, product, and engineering leaders evaluating AI for an online store or marketplace.",
  items: [
    {
      q: "Can AI integrate with Shopify, Magento, WooCommerce or a custom platform?",
      a: "Yes. These platforms expose APIs and app or plugin interfaces that let recommendation, search, and pricing services run against live catalogue and order data without modifying the platform core. On a custom stack the integration is usually simpler still. What varies is not whether integration is possible but how much of your behavioural data the platform actually captures, which is assessed during readiness.",
    },
    {
      q: "How does AI improve product recommendations over a rules-based approach?",
      a: "Rules encode what a merchandiser already believes — customers who buy this also like that. A model learns relationships across the whole catalogue and the whole customer base, including ones nobody would have thought to write down, and it updates as behaviour shifts. The practical difference is largest on big catalogues, where the number of useful rules exceeds what anyone can maintain.",
    },
    {
      q: "Can AI reduce product return rates?",
      a: "In categories where returns are driven by fit or expectation mismatch — apparel especially — yes. Size and fit recommendation, richer visual detail, and return-likelihood scoring at the point of purchase all reduce the returns that were predictable. They do nothing for returns caused by damage or delivery failure, so the achievable gain depends on why your returns actually happen, which is worth measuring before building.",
    },
    {
      q: "How does dynamic pricing work without damaging customer trust?",
      a: "With constraints. Prices move inside floors, ceilings, and rate-of-change limits you set, and we generally exclude personalised pricing to individual shoppers, which is where the reputational risk sits. The model optimises against demand, inventory, and competitor position rather than against an individual's willingness to pay — a distinction that matters commercially as well as ethically.",
    },
    {
      q: "Can AI improve demand forecasting and inventory accuracy?",
      a: "Yes, and this is often the highest-return use case despite being the least visible. Models that incorporate seasonality, promotion calendars, trend, and external factors typically outperform the moving averages most planning still runs on. The gain shows up as less markdown and fewer stockouts rather than as a conversion improvement, which makes it easy to under-value and expensive to skip.",
    },
    {
      q: "What is visual search and how much does it help?",
      a: "Visual search lets a shopper upload or capture an image and find matching or similar products, using computer vision over your catalogue imagery. It helps most where customers know what they want but cannot describe it in the terms your catalogue uses — fashion, homeware, parts and fittings. On catalogues where text search already works well, the incremental gain is modest.",
    },
    {
      q: "How do you ensure data security and privacy in eCommerce AI?",
      a: "Behavioural and transactional data is handled under GDPR and equivalent regimes, with consent state respected in what is collected and used for modelling. Payment data is kept out of model features entirely, so PCI-DSS scope does not expand. Encryption in transit and at rest, role-based access, and audit logging are standard, and Soft Suave's delivery operates under an ISO/IEC 27001:2022-certified management system.",
    },
    {
      q: "Can smaller stores benefit, or is this only worthwhile at enterprise scale?",
      a: "Smaller stores benefit, with one caveat: models learn from behaviour, so a store with very low traffic has less signal to learn from and gains more from a well-configured off-the-shelf engine than from a custom-trained one. The threshold is lower than most people expect, but it is not zero, and we will say so during readiness rather than build something your data cannot support.",
      link: {
        label: "Book a free consultation",
        href: "https://www.softsuave.com/30-min-free-consultation",
        tail: "and we will assess it against your traffic and catalogue.",
      },
    },
  ],
};
