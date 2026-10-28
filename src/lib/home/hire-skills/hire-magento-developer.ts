/**
 * The `hire-magento-developer` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-magento-developer/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { partnerTable } from "../hire-comparison";
import { FIGURES, HOURLY_RATE } from "../../company-figures";
import { PLATFORM_ORDER } from "./platform-shared";

export const skill: HireSkill = {
  slug: "hire-magento-developer",
  key: "magento",
  name: "Magento",
  role: "Magento Developers",
  metaTitle: "Hire Magento Developer in India with Soft Suave",
  metaDescription:
    "Want to hire Magento developers in India quickly? Onboard them in just 48 hours & create feature-packed e-commerce site for your business.",
  serviceType: "Magento development staffing",
  ctaLabel: "Hire Magento developers",

  order: [...PLATFORM_ORDER],

  hero: {
    titleLines: ["Hire Magento Developers", "in India on Contract"],
    accent: "Magento Developers",
    body: [
      "Soft Suave helps companies hire Magento developers from India for custom e-commerce growth. Our experts work in Magento 2, Adobe Commerce, payment gateway integration, custom modules, migrations, and high-performance online stores. Scale teams quickly with flexible hiring models.",
      "See why businesses choose Soft Suave for their Magento developer hiring.",
    ],
    /* Four points, not five — the Magento hero omits the delivery-governance one. */
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Magento Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
    ],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Magento requirement.",
      subject: "Magento Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-magento-hero.webp",
      width: 1800,
      height: 900,
      alt: "Miniature shopping cart in front of sales charts",
      blurDataURL:
        "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAwAgCdASoQAAsAA4BaJbACdAYvDqvP6MgUAAD+6hAcni9sRuGAXAEzOyJTfvceBO6TIpIK8pqdt6d0wvtXNqSOApwG5ukRulN2jsWdmCulqAHrX9WKvXvidmPHrOdvzKKTgAAA",
    },
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Hire Magento Developers from Soft Suave",
    body: "At Soft Suave, we don't just offer developers - we deliver Magento masters. When you hire from us, you get flexibility, quality, and dedication. These are the additional characteristics that distinguish our professionals.",
    items: [
      {
        name: "Pre-vetted Magento developers",
        body: "Every developer is handpicked through a stringent screening process to ensure exceptional technical abilities, consistent performance, and complete commitment.",
        icon: "users",
      },
      {
        name: "Flexible hiring models",
        body: "Our flexible hiring options make it easy for you to hire dedicated Magento developers and scale up or down according to your project's evolving needs and pace.",
        icon: "gauge",
      },
      {
        name: "Global delivery standards",
        body: "We embrace global best practices and agile methodologies to ensure high-quality delivery, meeting all your requirements with precision.",
        icon: "globe",
      },
      {
        name: "Strict NDA & IP protection",
        body: "Protect your intellectual property. We offer robust NDA agreements to guarantee complete confidentiality for your project.",
        icon: "shield",
      },
      {
        name: "Time Zone Flexibility",
        body: "Our developers overlap 4-6 hours in your time zone, ensuring seamless communication and collaboration, regardless of your location.",
        icon: "book",
      },
      {
        name: "World-Class Developers at Budget-Friendly Rates",
        body: "Hire offshore Magento developer talent at competitive rates, maximizing your project's value without compromising on quality.",
        icon: "coins",
      },
    ],
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Steps to Hire a Magento Developer",
    body: "Hire expert Magento developers and onboard them quickly with our proven, fast, straightforward, and customized process.",
    steps: [
      {
        n: "01",
        name: "Share the JD",
        body: "Brief us about your requirements and the type of Magento developers you are looking for.",
      },
      {
        n: "02",
        name: "Shortlist The Right Developers",
        body: "Choose top developers aligned to your project requirements from a curated list.",
      },
      {
        n: "03",
        name: "Free 40-hour Trial",
        body: "Test our developer's expertise at no cost for 40 hours before making a final decision.",
      },
      {
        n: "04",
        name: "Onboard & Manage",
        body: "Complete the SLA & NDA, then smoothly integrate the developer into your team.",
      },
    ],
  },

  expertise: {
    eyebrow: "Technical Expertise",
    title: "Technical Expertise of Our Magento Developers",
    body: "When you hire remote Magento developers from Soft Suave, you get deep technical skills, proven e-commerce expertise, reliable delivery, and a partner ready to help your store thrive and scale fast.",
    items: [
      {
        name: "Magento Custom Extension Development",
        body: "Our developers craft robust, reusable Magento extensions tailored to unique business needs, enhancing store functionality, streamlining workflows, and integrating cleanly into your existing Magento architecture without disrupting core code.",
      },
      {
        name: "Magento Backend Architecture",
        body: "We specialize in building scalable, maintainable Magento backends using modular code, EAV modeling, dependency injection, and optimized database strategies, ensuring speed, flexibility, and clean business logic handling.",
      },
      {
        name: "Magento Frontend Development (Luma & Hyvä)",
        body: "From customizing Luma to building lightning-fast Hyvä storefronts, our developers create mobile-first, pixel-perfect experiences with smooth checkout flows and responsive design that elevates both performance and UX.",
      },
      {
        name: "Magento API Mastery (REST & GraphQL)",
        body: "Whether integrating with third-party tools or building headless commerce, our Magento experts use REST and GraphQL APIs to deliver flexible, real-time data exchange with robust authentication and efficient query design.",
      },
      {
        name: "Magento Performance Optimization",
        body: "We fine-tune every layer, codebase, caching, indexing, and server configuration to eliminate bottlenecks, reduce page load times, and boost Google Core Web Vitals for a snappy, high-converting store experience.",
      },
      {
        name: "Magento Multi-store Architecture",
        body: "Our developers design Magento setups that power multiple storefronts from one backend, perfect for global brands managing multiple languages, currencies, or regional catalogs under a unified admin.",
      },
      {
        name: "Magento Security Expertise",
        body: "We apply deep technical know-how to secure your Magento store, patching vulnerabilities, writing secure code, and implementing best practices like two-factor authentication, HTTPS enforcement, and role-based permissions.",
      },
      {
        name: "Magento Checkout Customization",
        body: "We optimize and customize Magento's complex checkout process, whether through one-step solutions, integrating custom payment gateways, or refining the flow to minimize cart abandonment and boost conversion rates.",
      },
      {
        name: "Magento PWA Development",
        body: "Our developers build Progressive Web Apps with Magento PWA Studio, delivering app-like speed, offline capabilities, and seamless mobile UX, ideal for future-proofing your e-commerce presence.",
      },
      {
        name: "Magento Data Modeling & EAV Mastery",
        body: "We master Magento's Entity-Attribute-Value model to structure data efficiently, enabling flexible product catalogs, custom attributes, and dynamic content without sacrificing performance or searchability.",
      },
    ],
  },

  services: {
    // Live closes this band on "Talk to Our Experts" (review: "missing a CTA button").
    cta: { label: "Talk to Our Experts", href: "/contact" },
    eyebrow: "Services",
    title: "Magento Development Services We Offer",
    body: "We craft, optimize, and scale powerful Magento stores - delivering seamless user experiences, lightning-fast performance, secure integrations, and flexible solutions tailored to your business needs, so your e-commerce thrives globally.",
    items: [
      {
        name: "Customized Magento Web Development",
        body: `Soft Suave crafts powerful Magento web apps with custom extensions, smart design, and flawless performance, delivering engaging, scalable B2B and B2C solutions trusted by clients for over ${FIGURES.years} years.`,
      },
      {
        name: "Dedicated Magento Developers Team",
        body: "Our expert Magento team builds responsive, customer-focused stores with smart customization and seamless integration, transforming ideas into success through an efficient, flexible process trusted by businesses of all sizes.",
      },
      {
        name: "Magento E-commerce Development",
        body: "Hire remote Magento developers who can develop powerful, feature-rich Magento platforms - from mobile optimization to AI and chatbots - delivering custom, high-performance e-commerce solutions that drive engagement, efficiency, and a seamless shopping experience.",
      },
      {
        name: "Front-End Magento Development",
        body: "Our Magento front-end developers craft fast, SEO-friendly e-commerce stores with stunning design, custom themes, smooth UI, and interactive features, ensuring an engaging user experience that drives retention and growth",
      },
      {
        name: "Magento Migration & Upgradation",
        body: "Upgrade seamlessly with Soft Suave's Magento team — we migrate your store to Magento 2 securely, preserving data while boosting performance, adding one-click checkout, touch-friendly design, and modern features.",
      },
      {
        name: "Magento Consulting Service",
        body: "Our Magento experts guide you in building scalable, secure, high-performing stores with smooth navigation, third-party integrations, fast payments, and a seamless user experience, ensuring you make the right decisions.",
      },
      {
        name: "Magento Support & Maintenance",
        body: "Keep your Magento store fast, fresh, and flawless with 24/7 support, regular updates, audits, and optimization — all designed to boost performance, fix issues, and enhance customer experience.",
      },
      {
        name: "Offshore Magento development",
        body: "Our offshore software development service for Magento delivers complete solutions — from design and development to optimization and maintenance — combining skilled expertise, flexible engagement, and cost-effective delivery for fast, scalable, global e-commerce success.",
      },
    ],
  },

  vetting: {
    eyebrow: "Vetting",
    title: "How We Vet and Onboard Top Magento Developers",
    body: "We rigorously vet every Magento developer - from technical skills to cultural fit - so you get experts you can trust, ready to jump in and get things done fast.",
    steps: [
      {
        n: "01",
        name: "Rigorous talent sourcing",
        body: "We do not just post ads and wait for results. We actively search for top-tier Magento talent.",
      },
      {
        n: "02",
        name: "In-depth skill assessment",
        body: "Our rigorous selection process includes technical assessments and live coding challenges.",
      },
      {
        n: "03",
        name: "Thinkers & Innovators",
        body: "We give preference to engineers who are excellent at addressing problems and work well in team settings.",
      },
      {
        n: "04",
        name: "Cultural fit & adaptability",
        body: "We focus on finding developers who adapt quickly and fit seamlessly into your team culture.",
      },
    ],
  },

  comparison: partnerTable(
    "Choosing the Right Magento Partner for Your Specific Needs",
    "Our comparison guide will help you decide the right fit for your business by comparing an in-house team, freelancers, & our experts.",
  ),

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "FAQs About Hiring Magento Developers",
    body: "Learn more about our procedures & methods with the help of these FAQs.",
    items: [
      {
        q: "How much does it cost to hire Magento developers?",
        a: `The price of Magento developers depends on the experience, project complexity, and work engagement model. At Soft Suave, we provide cost-efficient pricing solutions that start from ${HOURLY_RATE}.`,
      },
      {
        q: "Is there any free trial period available?",
        a: "Yes, we offer a risk-free 40-hour trial to evaluate our developers' skills before committing.",
      },
      {
        q: "What are the hiring engagement options available at Soft Suave?",
        a: "Fixed price, time and material, or managed services model are the engagement options available at Soft Suave.",
      },
      {
        q: "Do you provide support and maintenance services after deployment?",
        a: "Indeed, we provide post-deployment support and maintenance services.",
      },
      {
        q: "Where can you find a Magento Engineer?",
        a: "You can hire experienced Magento developers from reliable development firms such as Soft Suave, where we offer you pre-screened and experienced experts for your e-commerce store.",
      },
    ],
  },
};
