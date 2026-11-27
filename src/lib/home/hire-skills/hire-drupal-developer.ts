/**
 * The `hire-drupal-developer` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-drupal-developer/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { partnerTable } from "../hire-comparison";
import { HOURLY_RATE, SPECIALISTS_PLUS } from "../../company-figures";
import { PLATFORM_ORDER } from "./platform-shared";

export const skill: HireSkill = {
  closingCtaIcon: true,
  clientsWideTitle: "38ch",
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
      submitHover: 'black',
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
    wideHead: true,
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
    carousel: true,
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

  comparison: {
    ...partnerTable(
      "Choosing the Right Drupal Partner for Your Specific Needs",
      "Make a well-informed decision by comparing your options - freelancers, in-house teams, or our expertly vetted developers. Use our comparison guide for valuable insights.",
    ),
    wideHead: true,
  },

  exploreMore: { ...webExplore, wideHead: true },

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
