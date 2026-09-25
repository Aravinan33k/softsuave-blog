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
    "Hire Magento developers from India for custom eCommerce growth. Experts in Magento 2, Adobe Commerce, payment gateway integration, custom modules and migrations.",
  serviceType: "Magento development staffing",
  ctaLabel: "Hire Magento developers",

  order: [...PLATFORM_ORDER],

  hero: {
    titleLines: ["Hire Magento Developers", "in India on Contract"],
    body: [
      "Soft Suave helps companies hire Magento developers from India for custom eCommerce growth. Our experts work in Magento 2, Adobe Commerce, payment gateway integration, custom modules, migrations, and high-performance online stores. Scale teams quickly with flexible hiring models.",
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
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Magento requirement.",
      subject: "Magento Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/svc-web.webp",
      width: 1200,
      height: 860,
      alt: "A Magento commerce storefront with catalogue, checkout, and admin views",
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
    body: "When you hire remote Magento developers from Soft Suave, you get deep technical skills, proven eCommerce expertise, reliable delivery, and a partner ready to help your store thrive and scale fast.",
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
        body: "Our developers build Progressive Web Apps with Magento PWA Studio, delivering app-like speed, offline capabilities, and seamless mobile UX, ideal for future-proofing your eCommerce presence.",
      },
      {
        name: "Magento Data Modeling & EAV Mastery",
        body: "We master Magento's Entity-Attribute-Value model to structure data efficiently, enabling flexible product catalogs, custom attributes, and dynamic content without sacrificing performance or searchability.",
      },
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Magento Development Services We Offer",
    body: "We craft, optimize, and scale powerful Magento stores - delivering seamless user experiences, lightning-fast performance, secure integrations, and flexible solutions tailored to your business needs, so your eCommerce thrives globally.",
    items: [
      {
        name: "Customized Magento Web Development",
        body: "Soft Suave crafts powerful Magento web apps with custom extensions, smart design, and flawless performance, delivering engaging, scalable B2B and B2C solutions trusted by clients for over 12 years.",
      },
      {
        name: "Dedicated Magento Developers Team",
        body: "Our expert Magento team builds responsive, customer-focused stores with smart customization and seamless integration, transforming ideas into success through an efficient, flexible process trusted by businesses of all sizes.",
      },
      {
        name: "Magento eCommerce Development",
        body: "Hire remote Magento developers who can develop powerful, feature-rich Magento platforms - from mobile optimization to AI and chatbots - delivering custom, high-performance eCommerce solutions that drive engagement, efficiency, and a seamless shopping experience.",
      },
      {
        name: "Front-End Magento Development",
        body: "Our Magento front-end developers craft fast, SEO-friendly eCommerce stores with stunning design, custom themes, smooth UI, and interactive features, ensuring an engaging user experience that drives retention and growth",
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
        body: "Our offshore software development service for Magento delivers complete solutions — from design and development to optimization and maintenance — combining skilled expertise, flexible engagement, and cost-effective delivery for fast, scalable, global eCommerce success.",
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
        a: "The price of Magento developers depends on the experience, project complexity, and work engagement model. At Soft Suave, we provide cost-efficient pricing solutions that start from $14/hour.",
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
    "Hire dedicated Drupal developers from India who build secure, scalable, content-rich platforms. Experts in Drupal CMS, custom modules, migrations and multisite.",
  serviceType: "Drupal development staffing",
  ctaLabel: "Hire Drupal developers",

  order: [...PLATFORM_ORDER],

  hero: {
    titleLines: ["Hire Drupal Developers", "in India on Contract"],
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
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Drupal requirement.",
      subject: "Drupal Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/work-3.webp",
      width: 1200,
      height: 860,
      alt: "A Drupal content platform showing structured content types and editorial workflow",
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
        a: "Our transparent pricing starts from just $14/hour, varying by experience and engagement model. Request a custom quote today and discover the exceptional value we offer.",
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

export const platformHireSkills: readonly HireSkill[] = [magento, drupal];
