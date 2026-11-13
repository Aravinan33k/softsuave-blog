/**
 * Platform hire pages: Magento and Drupal.
 *
 * Both run the newer softsuave.com layout — a client band, why-hire cards, the
 * hiring steps second, then technical expertise, services, a vetting sequence
 * and a comparison table. Where they differ from their Django/Laravel/Rails
 * siblings is the expertise band: those pages list grouped tool names, while
 * these two publish ten described capabilities, so it renders through
 * `expertise` rather than `techStack`.
 *
 * Every string is the live page's own copy.
 */

import type { HireSkill } from "./hire-skill";
import { sharedHeroAlert } from "./delivery-shared";
import { webExplore } from "./hire-explore";
import { partnerTable } from "./hire-comparison";
import { staffCostTestimonials } from "./staff-cost-calculator-content";
import { FIGURES, HOURLY_RATE, SPECIALISTS_PLUS } from "../company-figures";

/** The newer pages' running order, with the prose expertise band. */
const PLATFORM_ORDER = [
  "clients",
  "whyUs",
  "process",
  "expertise",
  "services",
  "vetting",
  "comparison",
  "exploreMore",
  "testimonials",
  "faq",
] as const;

const magento: HireSkill = {
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

const drupal: HireSkill = {
  slug: "hire-drupal-developer",
  key: "drupal",
  name: "Drupal",
  role: "Drupal Developers",
  metaTitle: "Hire Dedicated Drupal Developer India with 40 Hours Trial",
  metaDescription:
    `Hire expert Drupal developers from India with 40 hours of free trial. Get access to top-tier developers and leverage ${SPECIALISTS_PLUS} in-house resources.`,
  serviceType: "Drupal development staffing",
  ctaLabel: "Hire Drupal developers",

  order: [...PLATFORM_ORDER],

  hero: {
    titleLines: ["Hire Drupal Developers", "in India on Contract"],
    accent: "Drupal Developers",
    body: [
      "Soft Suave helps businesses hire dedicated Drupal developers from India who build secure, scalable, and content-rich digital platforms. Access pre-vetted experts in Drupal CMS, custom module development, migrations, API integrations, multisite setups, and enterprise web solutions with fast onboarding.",
      "See why businesses choose Soft Suave for their Drupal developer hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Drupal Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Drupal requirement.",
      subject: "Drupal Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-drupal-hero.webp",
      width: 1800,
      height: 900,
      alt: "Person building a website on a laptop in a blue-lit room",
      blurDataURL:
        "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAQAgCdASoQAAsAA4BaJbACdAEURwEW2IOAAP70fgohl+v0CQws01FCtqsiMTT6Xe6A5t5DFMzsHyXW/IDhDa8hSVc/h0yZvStXyYAA",
    },
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Hire Drupal Developers from Soft Suave",
    body: "Increase your online presence by working with Soft Suave's talented Drupal developers. We offer a strategic partnership ensuring project success. Discover the distinct advantages that set our pre-vetted, high-performing developers apart.",
    items: [
      {
        name: "Pre-vetted Drupal developers",
        body: "Only the best can join our team. We carefully vet each developer for their exceptional skills, reliability, and dedication to success.",
        icon: "users",
      },
      {
        name: "Flexible hiring models",
        body: "From rapid scaling to adjusting your team, our flexible hiring models allow you to adjust according to your project's rhythm.",
        icon: "gauge",
      },
      {
        name: "Global delivery standards",
        body: "Using agile methodologies and global best practices, we ensure top-quality deliverables every time.",
        icon: "globe",
      },
      {
        name: "Strict NDA & IP protection",
        body: "We guarantee your confidentiality. Strict NDA agreements and comprehensive intellectual property protection keep your ideas secure.",
        icon: "shield",
      },
      {
        name: "Time Zone Flexibility",
        body: "Our developers work 4-6 hours within your time zone, ensuring seamless real-time collaboration, no matter where you are.",
        icon: "book",
      },
      {
        name: "World-Class Developers at Budget-Friendly Rates",
        body: "Leverage Soft Suave's offshore software development services to hire skilled Drupal developers and gain access to top-tier talent at competitive rates.",
        icon: "coins",
      },
    ],
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Steps to Hire a Drupal Developer",
    body: "Hire expert Drupal developers fast with our easy 4-step approach: Efficient, straightforward, and customized.",
    steps: [
      {
        n: "01",
        name: "Share the JD",
        body: "Provide details about your project and the ideal skill set for your Drupal developer.",
      },
      {
        n: "02",
        name: "Shortlist The Right Developers",
        body: "We present the top developers who match your project requirements and goals.",
      },
      {
        n: "03",
        name: "Free 40-hour Trial",
        body: "Experience our developer's abilities firsthand with a 40-hour free trial, no strings attached.",
      },
      {
        n: "04",
        name: "Onboard & Manage",
        body: "Complete the required paperwork (SLA & NDA), & smoothly onboard the developer into your team.",
      },
    ],
  },

  expertise: {
    eyebrow: "Technical Expertise",
    title: "Technical Expertise of Our Drupal Developers",
    body: "Our Drupal developers are more than just coders; they are architects of robust, scalable, and secure web solutions. They possess deep expertise across the entire Drupal ecosystem and more.",
    items: [
      {
        name: "Drupal Theme Development",
        body: "Our team builds visually stunning, responsive Drupal themes from scratch—ensuring lightning-fast performance, brand consistency, and a memorable user experience on every screen.",
      },
      {
        name: "Headless Drupal Architecture",
        body: "Embrace modern front-end freedom with decoupled Drupal solutions. We connect Drupal to React, Vue, or your preferred framework for fast, interactive digital experiences.",
      },
      {
        name: "Drupal Security Hardening",
        body: "Your Drupal site deserves fortress-level protection. We implement best-in-class security protocols, patch vulnerabilities fast, and proactively monitor to keep your data safe.",
      },
      {
        name: "Multilingual & Localization Setup",
        body: "Reach global audiences with a flawlessly localized Drupal experience. From RTL support to translation workflows, we make your content speak every language natively.",
      },
      {
        name: "Advanced Views & Entity Management",
        body: "We craft dynamic content displays using Views and Entities, enabling fast, flexible, and relational data layouts tailored to your business's unique content structure.",
      },
      {
        name: "Configuration Management & Deployment",
        body: "Our team uses Drupal's Configuration Management for consistent, version-controlled deployments, ensuring changes move cleanly across environments with zero guesswork or manual rework.",
      },
      {
        name: "Custom Form API & Workflows",
        body: "We build smart, multi-step forms with Drupal's Form API and automated workflows for content approvals, notifications, and structured data collection that suit enterprise needs.",
      },
      {
        name: "Twig Templating & Theming Expertise",
        body: "Our developers write clean Twig templates and preprocess logic to create flexible, pixel-perfect themes that are fast, maintainable, and built to Drupal standards.",
      },
      {
        name: "Search Customization & Solr Integration",
        body: "We configure powerful search experiences using Apache Solr, enabling blazing-fast results, faceted filtering, multilingual indexing, and relevance tuning for complex content structures.",
      },
      {
        name: "Drupal Caching & Scalability Architecture",
        body: "We architect high-performance Drupal setups using caching layers, Varnish, CDNs, and database tuning, ensuring your site scales effortlessly under heavy traffic.",
      },
    ],
  },

  services: {
    // Live closes this band on "Talk to Our Experts" (review: "missing a CTA button").
    cta: { label: "Talk to Our Experts", href: "/contact" },
    eyebrow: "Services",
    title: "Drupal Development Services We Offer",
    body: "Whatever your Drupal needs, Soft Suave has you covered. From concept to deployment and beyond, our comprehensive suite of services ensures your project thrives, delivering innovation and reliability.",
    items: [
      {
        name: "API Integration",
        body: "Connect your Drupal site to the world. We implement seamless API integrations with CRMs, ERPs, payment processors, and third-party tools, automating workflows and supercharging your digital ecosystem with secure, real-time data exchange.",
      },
      {
        name: "Migration & Upgrades",
        body: "Ready to level up? We handle migrations from older Drupal versions or other platforms with zero data loss, full SEO retention, and minimal downtime, keeping your site fast, secure, and future-ready.",
      },
      {
        name: "Maintenance & Support",
        body: "We don't disappear after launch. Our proactive maintenance plans cover updates, backups, monitoring, and bug fixes, keeping your Drupal site running smoothly 24/7 with guaranteed peace of mind.",
      },
      {
        name: "Module Development",
        body: "Have a unique feature in mind? We build powerful, custom Drupal modules that extend core functionality and integrate perfectly into your workflows, built to scale, secure, and tailored to your business.",
      },
      {
        name: "Website Redesign",
        body: "Time for a refresh? We revamp outdated Drupal sites into stunning, high-converting experiences with intuitive UX, modern visuals, and lightning-fast performance, turning your digital presence into a growth engine.",
      },
      {
        name: "Drupal E-commerce Development",
        body: "Sell smarter with custom Drupal Commerce setups. We build online stores with frictionless checkouts, mobile optimization, and robust inventory integration, designed to convert clicks into customers effortlessly.",
      },
      {
        name: "Enterprise Drupal Web Apps",
        body: "We architect enterprise-grade Drupal solutions that power portals, intranets, knowledge bases, and SaaS apps, backed by robust security, API connectivity, and custom workflows tailored to your enterprise needs.",
      },
      {
        name: "Custom Drupal Solutions",
        body: "When off-the-shelf won't cut it, we build powerful, tailor-made Drupal websites and applications from the ground up—aligned with your goals. From sleek, branded designs to advanced functionality, we deliver end-to-end solutions built to grow with your business.",
      },
      {
        name: "Drupal Performance Optimization",
        body: "Speed matters. We optimize every layer of your Drupal stack, caching, database queries, assets, and server tuning, for faster load times, higher engagement, and better SEO rankings.",
      },
    ],
  },

  vetting: {
    eyebrow: "Vetting",
    title: "How We Vet and Onboard Top Drupal Developers",
    body: "Our rigorous process ensures that only elite Drupal talent joins your team. From deep technical assessments to seamless integration, we deliver pre-vetted experts ready to excel from day one.",
    steps: [
      {
        n: "01",
        name: "Rigorous talent sourcing",
        body: "We don't wait for talent to come to us; we go directly to the best Drupal developers available",
      },
      {
        n: "02",
        name: "In-depth skill assessment",
        body: "Every developer completes rigorous coding challenges and technical assessments to prove their skills.",
      },
      {
        n: "03",
        name: "Thinkers & Innovators",
        body: "We seek developers who excel in teamwork, problem-solving, and finding creative solutions in fast-paced projects.",
      },
      {
        n: "04",
        name: "Cultural fit & adaptability",
        body: "We select Drupal experts who integrate smoothly into your existing team culture, ensuring smooth collaboration from day one.",
      },
    ],
  },

  comparison: partnerTable(
    "Choosing the Right Drupal Partner for Your Specific Needs",
    "Make a well-informed decision by comparing your options - freelancers, in-house teams, or our expertly vetted developers. Use our comparison guide for valuable insights.",
  ),

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "FAQs About Hiring Drupal Developers",
    body: "Learn more about our procedures & methods with the help of these FAQs.",
    items: [
      {
        q: "How much does it cost to hire Drupal developer?",
        a: `Our transparent pricing starts from just ${HOURLY_RATE}, varying by experience and engagement model. Request a custom quote today and discover the exceptional value we offer.`,
      },
      {
        q: "Is there any free trial period available?",
        a: "Yes, we provide a free 40-hour trial. With this, you can assess our developers before committing.",
      },
      {
        q: "What are the hiring engagement options available at Soft Suave?",
        a: "We provide flexible models—fixed price, time-based, or fully managed services.",
      },
      {
        q: "Do you provide support and maintenance services after deployment?",
        a: "Yes, after the project goes live, we provide continuing support, optimization, and maintenance.",
      },
      {
        q: "Where can you find a Drupal Engineer?",
        a: "At Soft Suave. By providing pre-screened, highly skilled Drupal experts who are available for immediate engagement, we save you time.",
      },
    ],
  },
};

/**
 * /hire-saas-developer — softsuave.com's page, word for word. It runs the same
 * layout as the Kotlin page (clients, why-hire cards, steps, technical expertise,
 * services, vetting, comparison, testimonials, FAQs) without that page's
 * "Explore More Technologies" band, which this live page does not have.
 */
const saas: HireSkill = {
  slug: "hire-saas-developer",
  key: "saas",
  name: "SaaS",
  role: "SaaS Developers",
  metaTitle: "Hire SaaS Developers | Fast, Affordable Cloud Talent On-Demand",
  metaDescription:
    "Hire SaaS developers from Soft Suave and get flexible engagement models, pre‑vetted talent, 40‑hour free trial & top-tier support to scale faster.",
  serviceType: "SaaS development staffing",
  ctaLabel: "Hire SaaS developers",

  order: [
    "clients",
    "whyUs",
    "process",
    "techStack",
    "services",
    "vetting",
    "comparison",
    "testimonials",
    "faq",
  ],

  hero: {
    titleLines: ["Hire SaaS Developers", "in India on Contract"],
    accent: "SaaS Developers",
    titleScale: "home",
    accentGradient: true,
    body: [
      "Soft Suave provides SaaS developers from India experienced in multi-tenant platforms, subscription systems, APIs, cloud architecture, product scaling, and secure SaaS development. Hire pre-vetted experts quickly to accelerate your SaaS product roadmap.",
      "See why businesses choose Soft Suave for their SaaS developer hiring.",
      "*Satisfaction Guaranteed – Get 40-hour Free Trial",
    ],
    points: ["40-Hour Risk-Free Trial", "Hire Top SaaS Developers in India", "Time-Zone & Language Aligned Teams", "Airtight NDA & IP Protection"],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your SaaS requirement.",
      subject: "SaaS Developers enquiry",
      alert: sharedHeroAlert,
    },
  },

  whyUs: {
    eyebrow: "Expert Developers",
    title: "Why Hire Saas Developers from Soft Suave",
    body: "With years of experience and unparalleled technical depth, our team elevates your platform’s performance. When you hire SaaS developers here, you gain a partner committed to the success of your project.",
    links: [{ text: "offshore software development services", href: "/offshore-software-development-company" }],
    items: [
      { name: "Pre-vetted SaaS developers", body: "Our pre-vetted SaaS developers undergo rigorous screening, ensuring your team gets proven experts with guaranteed technical and project excellence.", icon: "users" },
      { name: "Flexible hiring models", body: "Choose flexible hiring models that match your goals: fixed price, time & material, or dedicated team. Scale your SaaS development efficiently and stress-free.", icon: "gauge" },
      { name: "Global delivery standards", body: "We maintain global delivery standards, guaranteeing quality, consistency, and seamless communication for all SaaS projects, regardless of your business location.", icon: "globe" },
      { name: "Strict NDA & IP protection", body: "Enjoy complete peace of mind with strict NDA agreements and rock-solid IP protection, safeguarding your ideas and proprietary business assets.", icon: "shield" },
      { name: "Time Zone Flexibility", body: "Benefit from time zone flexibility. Our SaaS developers align with your business hours for real-time collaboration and fast project turnaround.", icon: "book" },
      { name: "World-Class Developers at Budget-Friendly Rates", body: "Experience world-class talent at affordable rates. Explore our offshore software development services for premium SaaS expertise without overspending.", icon: "coins" },
    ],
  },

  process: {
    eyebrow: "Hiring Processs",
    title: "Steps to Hire a SaaS Developer",
    body: "Start a seamless journey. Discover how effortless it is to hire SaaS developers who fit your culture.",
    steps: [
      { n: "01", name: "Share the JD", body: "Send us your detailed job description to match with the perfect SaaS developer quickly." },
      { n: "02", name: "Shortlist The Right Developers", body: "Receive handpicked, skilled candidates perfectly aligned to your project and technology requirements for review." },
      { n: "03", name: "Free 40-hour Trial", body: "Evaluate your chosen SaaS developer risk-free with our commitment-free 40-hour trial period." },
      { n: "04", name: "Onboard & Manage", body: "Easily onboard your developer and manage progress seamlessly, while we handle all administrative tasks." },
    ],
  },

  techStackStyle: "rows",
  techStackCollapsedRows: 4,
  hideHeroBreadcrumb: true,
  servicesPhotoCards: true,
  closingEnquiry: true,
  techStack: {
    eyebrow: "Expertise",
    title: "Technical Expertise of Our SaaS Developers",
    body: "From robust back-end logic to intuitive user interfaces, our developers bring leading tech stacks and frameworks. If your priority is innovation, hiring our SaaS developers ensures you stay ahead of the curve.",
    groups: [
      { name: "Front End", items: ["React.js", "Vue.js", "Angular", "HTML5", "CSS3", "Bootstrap", "JavaScript", "TypeScript"] },
      { name: "Back End", items: ["Node.js", "Python (Django, Flask)", "Ruby on Rails", "Java (Spring Boot)", "PHP", ".NET Core", "Golang"] },
      { name: "Cloud Platforms", items: ["AWS", "Azure", "Google Cloud Platform", "Heroku", "DigitalOcean"] },
      { name: "DatDatabasesa", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase", "DynamoDB"] },
      { name: "APIs & Integrations", items: ["REST", "GraphQL", "SOAP", "OAuth2", "Webhooks", "Payment Gateways"] },
      { name: "Testing Tools", items: ["Jest", "Mocha", "Selenium", "Cypress", "Postman", "JUnit", "RSpec"] },
      { name: "DevOps & CI/CD", items: ["Docker", "Kubernetes", "Jenkins", "GitLab CI", "GitHub Actions", "Terraform"] },
      { name: "SaaS Modules", items: ["Multi-tenant Architecture", "Billing Systems", "User Management", "Subscription Management", "Analytics Dashboards"] },
      { name: "Libraries & Packages", items: ["Redux", "Lodash", "Moment.js", "Axios", "Express.js", "Passport.js", "Socket.io"] },
      { name: "Security", items: ["JWT", "OAuth2", "SSO", "Data Encryption", "OWASP", "SSL/TLS", "Vulnerability Scanning"] },
      { name: "Project Management", items: ["JIRA", "Trello", "Asana", "Slack", "Agile methodologies"] },
    ],
  },

  services: {
    eyebrow: "What We Do",
    title: "Saas Development Services We Offer",
    body: "Experience a full suite of cloud-powered possibilities, built for innovation, scalability, and long-term success. Hire SaaS developers to turn your software vision into a market-leading solution.",
    cta: { label: "Talk to Our Experts", href: "/free-quote" },
    items: [
      { name: "Custom SaaS Application Development", body: "Create fully customized SaaS applications designed around your business needs, ensuring seamless workflows, unique features, and scalable cloud performance.", image: { src: "/images/hire-saas/service-1.webp", width: 1958, height: 1107, alt: "" } },
      { name: "SaaS Product Modernization & Migration", body: "Seamlessly upgrade legacy software or migrate your application to modern SaaS platforms with secure, future-ready, and robust cloud infrastructure.", image: { src: "/images/hire-saas/service-2.webp", width: 490, height: 277, alt: "" } },
      { name: "API Development & Third-Party Integrations", body: "Implement reliable APIs and integrate with payment systems, CRMs, ERPs, and more, enabling efficient data exchange and improved automation.", image: { src: "/images/hire-saas/service-3.webp", width: 490, height: 277, alt: "" } },
      { name: "Multi-Tenant Architecture Implementation", body: "Design scalable multi-tenant SaaS platforms, managing multiple customers securely on one instance for cost savings and easy resource allocation.", image: { src: "/images/hire-saas/service-4.webp", width: 490, height: 277, alt: "" } },
      { name: "SaaS UI/UX Design Services", body: "Deliver intuitive, engaging, and device-optimized experiences through expert interface and UX design tailored for high-performing SaaS products.", image: { src: "/images/hire-saas/service-5.webp", width: 490, height: 277, alt: "" } },
      { name: "Subscription & Billing System Integration", body: "Embed automated subscription management and billing processes, supporting multiple plans, pricing models, and secure payment gateway integration.", image: { src: "/images/hire-saas/service-6.webp", width: 1958, height: 1107, alt: "" } },
      { name: "Data Analytics & Reporting Dashboards", body: "Gain actionable insights with custom analytics modules and real-time reporting dashboards to visualize, monitor, and drive business growth.", image: { src: "/images/hire-saas/service-7.webp", width: 490, height: 277, alt: "" } },
      { name: "SaaS Security & Compliance Solutions", body: "Safeguard your SaaS platform with advanced security, encryption, and regulatory compliance measures, protecting sensitive data and user privacy.", image: { src: "/images/hire-saas/service-8.webp", width: 490, height: 277, alt: "" } },
      { name: "Mobile-Friendly SaaS Development", body: "Develop responsive SaaS applications for seamless mobile access, empowering users to work efficiently anywhere, anytime, on any device.", image: { src: "/images/hire-saas/service-9.webp", width: 490, height: 277, alt: "" } },
      { name: "Ongoing Support & Maintenance", body: "Receive continuous support, timely updates, and proactive maintenance to ensure optimal performance and uninterrupted service for your SaaS solution.", image: { src: "/images/hire-saas/service-10.webp", width: 490, height: 277, alt: "" } },
    ],
  },

  vetting: {
    eyebrow: "Skill Check",
    title: "How We Vet and Onboard Top Saas Developers",
    body: "Our multi-layer screening process guarantees only proven, reliable candidates. Choose to hire SaaS developers with total confidence; our experts easily align with your workflow, culture, and speed requirements.",
    steps: [
      { n: "01", name: "Rigorous talent sourcing", body: "Our team finds top SaaS talent, ensuring expertise through a meticulous and targeted search process." },
      { n: "02", name: "In-depth skill assessment", body: "Each candidate undergoes a thorough technical evaluation to guarantee strong problem-solving and domain proficiency." },
      { n: "03", name: "Thinkers & Innovators", body: "We select SaaS developers who demonstrate creativity, strategic thinking, and proactive innovation in every project." },
      { n: "04", name: "Cultural fit & adaptability", body: "Engineers are matched for personality, collaboration, and adaptability, perfectly integrating into your unique company culture." },
    ],
  },

  comparison: {
    ...partnerTable(
    "Choosing the Right Saas Partner for Your Specific Needs",
    "Finding the right SaaS collaboration is essential. Hiring developers who understand your business accelerates transformation, delivering tailored solutions aligned with your goals. Explore this comprehensive comparison table for deeper insights.",
  ),
    eyebrow: "Hiring Guide",
  },

  testimonials: {
    ...staffCostTestimonials,
    title: "What Our Clients Say",
    body:
      "Industry leaders hire SaaS developers from us again and again, impressed by technical rigor, timely results, and the ability to navigate even the most complex cloud challenges without hassle.",
    // Live's order: Tim, Dara, Dimitris, Roland, Aaron.
    items: [1, 2, 3, 4, 0].map((i) => staffCostTestimonials.items[i]),
  },

  faq: {
    eyebrow: "Ask Us",
    title: "FAQs About Hiring Saas Developers",
    body: "Have questions before moving forward? Learn what sets us apart.",
    items: [
      { q: "How much does it cost to hire a Saas developer?", a: "Costs depend on skills, project duration, and other variables. Before hiring SaaS developers, consult with experts to gain accurate estimates and ensure the right fit for your business needs." },
      { q: "Is there any free trial period available?", a: "Yes. When you hire SaaS developers, take advantage of our 40-hour risk-free trial to assess performance and culture fit before making your final decision." },
      { q: "What are the hiring engagement options available at Soft Suave?", a: "Choose how you work. Hire SaaS developers through fixed price, time & material, or dedicated team models, giving you full flexibility to scale talent and budget." },
      { q: "Do you provide support and maintenance services after deployment?", a: "Absolutely. Our commitment doesn’t end with deployment. Hire SaaS developers and receive comprehensive post-launch support, ongoing maintenance, and regular updates for worry-free performance." },
      { q: "Where can you find a Saas Engineer?", a: "Look no further - Soft Suave’s talent network makes it easy to hire developers and onboard seasoned engineers ready for your next big project, starting immediately." },
    ],
  },
};


/**
 * /hire-cms-developer — softsuave.com's page, word for word. It runs the saas page's layout (clients, why-hire cards,
 * steps, the grouped technical expertise with "View More", services, vetting, comparison) and closes, as the live page
 * does, on the web technologies it links to, the testimonials, the FAQs and the full consultation band. The page's
 * trial is already the 40-hour one, so there is no duration to correct. Live's typos ("TopCMS", "CCompare", "CI/CDP")
 * are kept as written.
 */
const cms: HireSkill = {
  slug: "hire-cms-developer",
  key: "cms",
  name: "CMS",
  role: "CMS Developers",
  metaTitle: "Hire CMS Developers with a 40 Hour Risk-Free Trial",
  metaDescription:
    "Hire CMS Developers from Soft Suave for remote, on-demand, affordable experts with a 40-hour free trial and secure, scalable, high-performing CMS solutions.",
  serviceType: "CMS development staffing",
  ctaLabel: "Hire CMS developers",

  order: [...PLATFORM_ORDER].map((b) => (b === "expertise" ? "techStack" : b)),

  hero: {
    titleLines: ["Hire CMS Developer", "in India"],
    accent: "CMS Developer",
    titleScale: "home",
    accentGradient: true,
    body: [
      "Soft Suave helps businesses hire CMS developers from India for flexible website management and content-driven platforms. Our experts work in WordPress, Drupal, Joomla, headless CMS, custom themes, integrations, and scalable digital experiences.",
      "See why businesses choose Soft Suave for their CMS developer hiring.",
    ],
    afterPoints: "*Satisfaction Guaranteed – Get 40-hour Free Trial",
    // The live CMS hero carries no partner lockups, and its two buttons are joined by "OR".
    badges: [],
    ctaSeparator: "OR",
    points: ["40-Hour Risk-Free Trial", "Hire Top CMS Developers in India", "Time-Zone & Language Aligned Teams", "Airtight NDA & IP Protection"],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "How Can We Help(Requirement)",
      requirementPlaceholder: "How Can We Help(Requirement)",
      subject: "CMS Developers enquiry",
      alert: sharedHeroAlert,
    },
  },

  // The live band: "Our Clients" over these nineteen marks, in its order.
  clientsBand: {
    eyebrow: "Our Clients",
    logos: [
      { name: "Atomise", src: "/brand/clients/atomise.webp" },
      { name: "CloudBankin", src: "/brand/clients/cloudbankin.webp" },
      { name: "Enigma", src: "/brand/clients/enigma.webp" },
      { name: "Waymore", src: "/brand/clients/waymore.webp" },
      { name: "Who is up", src: "/brand/clients/whos-up.webp" },
      { name: "Warmpoint", src: "/brand/clients/warmpoint.webp" },
      { name: "Utiliko", src: "/brand/clients/utiliko.webp" },
      { name: "Trafficspy", src: "/brand/clients/trafficspy.webp" },
      { name: "diet", src: "/brand/clients/the-2020-diet.webp" },
      { name: "Teamicate", src: "/brand/clients/teamicate.webp" },
      { name: "Sulekha", src: "/brand/clients/sulekha.webp" },
      { name: "Promostv", src: "/brand/clients/promostv.webp" },
      { name: "Poorvika", src: "/brand/clients/poorvika.webp" },
      { name: "Pacewisdom", src: "/brand/clients/pacewisdom.webp" },
      { name: "Outsource", src: "/brand/clients/outsource.webp" },
      { name: "Omri", src: "/brand/clients/omri.webp" },
      { name: "Officespace", src: "/brand/clients/officespace.webp" },
      { name: "Oasisdigital", src: "/brand/clients/oasis-digital.webp" },
      { name: "Netsmartz", src: "/brand/clients/netsmartz.webp" },
    ],
  },

  whyUs: {
    eyebrow: "Why Hire",
    title: "Why Hire CMS Developers from Soft Suave",
    body: "Soft Suave’s experienced CMS experts craft secure, high-performing websites, streamline content workflows, and boost organic traffic. Confidently hire CMS Developers who understand growth-focused digital experiences.",
    links: [{ text: "offshore software service", href: "/offshore-software-development-company" }],
    items: [
      { name: "Pre-vetted CMS Developers", body: "Work with rigorously screened CMS specialists, ensuring faster onboarding, consistent code quality, and reduced hiring risk for every critical release.", icon: "users" },
      { name: "Global delivery standards", body: "Leverage mature global delivery practices, with documented processes, SLAs, and quality benchmarks that keep distributed CMS projects transparent and on schedule.", icon: "globe" },
      { name: "Flexible hiring models", body: "Choose T&M, full-time, or dedicated CMS teams, scaling resources up or down quickly based on roadmap priorities and budget realities.", icon: "gauge" },
      { name: "Time zone flexibility", body: "Collaborate smoothly through overlapping working hours, enabling real-time standups, quick reviews, and near 24/7 progress across continents.", icon: "book" },
      { name: "Strict NDA & IP protection", body: "Every engagement includes strong NDAs and clear IP assignment, safeguarding your codebase, business logic, and sensitive customer data.", icon: "shield" },
      { name: "World-Class Developers at Budget-Friendly Rates", body: "Access CMS talent with enterprise experience while optimizing costs with our offshore software service, without compromising on standards or quality.", icon: "coins" },
    ],
  },

  processLabel: "number",
  process: {
    eyebrow: "Hiring Process",
    title: "Steps to Hire a CMS Developer",
    body: "Move from idea to execution in days with a simple discovery, shortlist, and interview process, then hire Developers who match your tech stack, budget, and launch timelines.",
    steps: [
      { n: "01", name: "Share the JD", body: "Send a detailed JD so our team understands your goals and ideal developer profile." },
      { n: "02", name: "Shortlist The Right Developers", body: "Receive curated, pre-vetted profiles that match your requirements, then quickly choose who to interview." },
      { n: "03", name: "Free 40-hour Trial", body: "Collaborate with your chosen developer, testing skills, communication, and culture fit at zero risk." },
      { n: "04", name: "Onboard & Manage", body: "Seamlessly integrate the developer into your processes while retaining control over tasks, priorities, and communication." },
    ],
  },

  techStackStyle: "rows",
  techStackCollapsedRows: 4,
  hideHeroBreadcrumb: true,
  closingEnquiry: true,
  techStack: {
    eyebrow: "Expertise",
    title: "Technical Expertise of Our CMS Developers",
    body: "From WordPress and Drupal to Magento and headless stacks, our specialists unite backend, frontend, and DevOps expertise to build, scale, and secure complex digital ecosystems that never slow your growth",
    groups: [
      { name: "CMS platforms", items: ["WordPress", "Drupal", "Joomla", "Magento/Adobe Commerce", "Shopify", "WooCommerce", "Strapi", "Contentful", "Hygraph", "dotCMS"] },
      { name: "Backend languages", items: ["PHP", "Node.js", "Python", ".NET", "Java"] },
      { name: "Frontend fundamentals", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "responsive design", "accessibility", "cross-browser compatibility"] },
      { name: "Frontend frameworks", items: ["React", "Vue.js", "Angular", "Next.js", "Nuxt.js"] },
      { name: "Themes & templates", items: ["Custom themes", "child themes", "Twig", "Blade", "Gutenberg", "page builders (Elementor, Divi, WPBakery)"] },
      { name: "Plugins/modules /extensions", items: ["WordPress plugins", "Drupal modules", "Magento extension", "Shopify apps", "WooCommerce extensions"] },
      { name: "Databases", items: ["MySQL", "MariaDB", "PostgreSQL", "SQL Server"] },
      { name: "APIs & integrations", items: ["REST", "GraphQL", "webhooks", "OAuth", "third‑party integrations (CRM, ERP, payments, marketing tools)"] },
      { name: "Headless & JAMstack", items: ["Headless CMS", "API-first CMS", "Gatsby", "static site generators"] },
      { name: "Performance optimization", items: ["Caching", "CDNs", "asset minification", "image optimization", "lazy loading", "Core Web Vitals tuning."] },
      { name: "Security", items: ["SSL/TLS", "OWASP practices", "backups", "role-based access", "security plugins/modules"] },
      { name: "DevOps & deployment", items: ["Git", "CI/CDP", "Docker; Kubernetes", "AWS", "Azure", "GCP", "staging/production workflows"] },
      { name: "SEO & analytics", items: ["On-page SEO", "schema markup", "sitemaps", "Google Analytics", "Google Tag Manager", "Search Console"] },
      { name: "Collaboration & workflow", items: ["Jira", "Trello", "Asana", "agile/scrum", "code reviews", "documentation"] },
    ],
  },

  services: {
    eyebrow: "What We Do",
    title: "CMS Development Services We Offer",
    body: "Power your website lifecycle with end-to-end CMS services, from greenfield builds to migrations, integrations, and continuous optimization that keep content operations lean, secure, and effortlessly scalable.",
    cta: { label: "Talk to Our Experts", href: "/free-quote" },
    items: [
      { name: "Custom CMS Website Development", body: "Design and build fully customized CMS websites tailored to your brand, workflows, and performance goals across devices and channels." },
      { name: "CMS Theme & Template Development", body: "Create pixel-perfect, responsive themes and templates that reflect your brand identity while keeping editing simple for non-technical content teams." },
      { name: "Plugin, Module & Extension Development", body: "Develop custom plugins, modules, and extensions to add advanced features, integrations, and automations without bloating your CMS installation." },
      { name: "CMS Migration & Replatforming", body: "Move from legacy or underperforming platforms to modern CMS solutions with zero data loss, minimal downtime, and preserved SEO quality." },
      { name: "Headless & Composable CMS Implementation", body: "Implement headless CMS architectures powering websites, apps, and devices through APIs, enabling omnichannel content delivery and future-ready digital experiences." },
      { name: "E-commerce CMS Development", body: "Launch and scale e-commerce stores with robust product management, checkout flows, and integrations using leading CMS-based commerce platforms." },
      { name: "CMS Performance Optimization", body: "Optimize speed, caching, databases, and front-end assets so content-heavy sites load fast, rank better, and deliver smoother user experiences." },
      { name: "CMS Security Hardening & Compliance", body: "Harden your CMS with security best practices, monitoring, and updates to reduce vulnerabilities and support compliance requirements." },
      { name: "CMS Integration Services", body: "Connect your CMS with CRMs, ERPs, analytics, marketing automation, and payment gateways for unified data and streamlined operations." },
      { name: "Ongoing CMS Maintenance & Support", body: "Handle updates, bug fixes, backups, minor enhancements, and monitoring so your CMS stays secure, stable, and feature-ready over time." },
    ],
  },

  vettingLabel: "none",
  vetting: {
    eyebrow: "Skill Check",
    title: "How We Vet and Onboard TopCMS Developers",
    body: "Every engineer passes rigorous technical screening, portfolio checks, and culture-fit interviews, so when you hire CMS developers, they integrate quickly into your tools, workflows, and delivery pipelines.",
    steps: [
      { n: "01", name: "Rigorous talent sourcing", body: "Continuously map talent pools and proactively source niche CMS specialists for every critical role." },
      { n: "02", name: "In-depth skill assessment", body: "Validate CMS expertise with coding tasks, architecture reviews, and scenario-based evaluations beyond surface-level resumes." },
      { n: "03", name: "Thinkers & Innovators", body: "Select developers who challenge assumptions, suggest smarter approaches, and bring product-thinking to complex problems." },
      { n: "04", name: "Cultural fit & adaptability", body: "Evaluate communication, collaboration, and cross-cultural awareness to ensure seamless integration with your existing teams." },
    ],
  },

  comparison: {
    ...partnerTable(
      "Choosing the Right CMS Partner for Your Specific Needs",
      "CCompare how each hiring model stacks up: an in-house team, freelancers, and Soft Suave’s experts, using this side-by-side chart to pinpoint the best fit for your business.",
    ),
    eyebrow: "Hiring Guide",
  },

  exploreMore: {
    eyebrow: "Web Innovation",
    title: "Explore More Web Technologies for Your Project",
    body: "Discover related web technologies and find experts in frameworks, tools, and languages to bring your vision to life.",
    items: [
      { name: "React.js Developer", href: "/hire-reactjs-developers" },
      { name: "Angular Developer", href: "/hire-angularjs-developers" },
      { name: "ROR Developer", href: "/hire-ruby-on-rails-developer" },
      { name: "Node.js Developer", href: "/hire-nodejs-developers" },
      { name: "PHP Developer", href: "/hire-php-developers" },
      { name: "Java Developer", href: "/hire-java-developers" },
      { name: "Python Developer", href: "/hire-python-developers" },
      { name: ".Net Developer", href: "/hire-dot-net-developers" },
      { name: "Nest.js Developer", href: "/hire-nestjs-developers" },
      { name: "Django Developer", href: "/hire-django-developer" },
      { name: "Magento Developer", href: "/hire-magento-developer" },
      { name: "MERN Developer", href: "/hire-mern-stack-developers-india" },
      { name: "MEAN Developer", href: "/hire-mean-stack-developers-india" },
      { name: "Drupal Developer", href: "/hire-drupal-developer" },
    ],
  },

  // The live band's two tabs: fourteen web links, then three quality-assurance ones.
  exploreTabs: [
    {
      label: "Web",
      items: [
        { name: "React.js Developer", href: "/hire-reactjs-developers" },
        { name: "Angular Developer", href: "/hire-angularjs-developers" },
        { name: "ROR Developer", href: "/hire-ruby-on-rails-developer" },
        { name: "Node.js Developer", href: "/hire-nodejs-developers" },
        { name: "PHP Developer", href: "/hire-php-developers" },
        { name: "Java Developer", href: "/hire-java-developers" },
        { name: "Python Developer", href: "/hire-python-developers" },
        { name: ".Net Developer", href: "/hire-dot-net-developers" },
        { name: "Nest.js Developer", href: "/hire-nestjs-developers" },
        { name: "Django Developer", href: "/hire-django-developer" },
        { name: "Magento Developer", href: "/hire-magento-developer" },
        { name: "MERN Developer", href: "/hire-mern-stack-developers-india" },
        { name: "MEAN Developer", href: "/hire-mean-stack-developers-india" },
        { name: "Drupal Developer", href: "/hire-drupal-developer" },
      ],
    },
    {
      label: "Quality Assurance",
      items: [
        { name: "Selenium Developer", href: "/hire-selenium-tester" },
        { name: "Cypress Tester", href: "/hire-qa-testers-india" },
        { name: "Manual Testers", href: "/hire-qa-testers-india" },
      ],
    },
  ],

  testimonials: {
    ...staffCostTestimonials,
    eyebrow: "Testimonials",
    title: "What Our Clients Say About Us",
    body: "We've empowered hundreds of clients globally to achieve theirs business goals. Hear firsthand how our expertise and AI-driven solutions have made a difference",
    // Live's order: Tim, Dara, Dimitris, Roland, Aaron.
    items: [1, 2, 3, 4, 0].map((i) => staffCostTestimonials.items[i]),
  },

  faq: {
    eyebrow: "Ask Us",
    title: "FAQs About Hiring CMS Developers",
    body: "Get clear answers on costs, engagement models, tech stacks, and other vital details, so you hire CMS developers with full clarity.",
    items: [
      { q: "How much does it cost to hire a CMS developer?", a: "Costs vary widely by region, experience, engagement model, and project scope, so sharing requirements is essential for an accurate estimate." },
      { q: "Where can you find a CMS Engineer?", a: "Look at vetted talent networks, specialized agencies, freelance marketplaces, LinkedIn, and developer communities focused on WordPress, Drupal, Magento, and headless platforms. You can also partner with Soft Suave to access pre-vetted experts at truly affordable, transparent rates." },
      { q: "What is the hourly rate for a CMS developer in India?", a: "Rates in India are generally lower than in Western markets and depend heavily on seniority, specialization, and engagement structure. Typically, the developers' rates start from $15/hour." },
      { q: "What are the benefits of using vetted talent networks for CMS developers?", a: "You get faster hiring, pre-validated skills, reduced screening overhead, better quality control, and easier scaling or replacement when project needs change." },
      { q: "What are the key steps to defining your needs before hiring a CMS developer?", a: "Clarify business goals, choose a platform, define scope, integrations, budget, timeline, performance targets, and internal responsibilities before starting conversations." },
      { q: "What factors should be evaluated when selecting CMS developer candidates?", a: "Assess platform expertise, portfolio relevance, problem-solving, communication, security, and performance knowledge, plus the ability to collaborate with non-technical stakeholders." },
      { q: "Which technical skills are essential for a qualified CMS developer?", a: "Key skills include major CMS platforms, PHP/JavaScript, HTML/CSS, databases, APIs, theme/plugin development, optimization, security, and SEO/analytics." },
    ],
  },
};

export const platformHireSkills: readonly HireSkill[] = [magento, drupal, saas, cms];
