/**
 * The `hire-django-developer` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-django-developer/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { partnerTable } from "../hire-comparison";
import { HOURLY_RATE } from "../../company-figures";
import { MODERN_ORDER, vetting } from "./backend-shared";

export const skill: HireSkill = {
  slug: "hire-django-developer",
  key: "django",
  name: "Django",
  role: "Django Developers",
  // VERBATIM, INCLUDING THE TYPO: the live title runs "Risk-freeTrial"
  // together with no space.
  metaTitle: "Hire Django Developer India with 40 Hours Risk-freeTrial",
  metaDescription:
    "Hire Django Developer India for your custom projects and experience top-tier talent. Enjoy a risk-free 40-hour trial with our expert teams today!",
  serviceType: "Django development staffing",
  ctaLabel: "Hire Django developers",

  order: [...MODERN_ORDER],

  hero: {
    titleLines: ["Hire Django Developers", "On Contract"],
    accent: "Django Developers",
    body: [
      "Soft Suave helps businesses hire pre-vetted Django developers from India for faster backend delivery and lower hiring costs. Our developers specialize in Django, Django REST Framework, Python, PostgreSQL, APIs, SaaS platforms, and scalable web applications. Get contract-ready talent onboarded quickly with flexible engagement models.",
      "See why businesses choose Soft Suave for their Django developer hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Django Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Django requirement.",
      subject: "Django Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-django-hero.webp",
      width: 1800,
      height: 900,
      alt: "Developer typing code on a laptop in low light",
      blurDataURL:
        "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoQAAsAA4BaJYwCdACUharmZQAA/un95NvH6n9se7haclIklOm3SaZ5+0Mh9op3OsPdIR8AAAA=",
    },
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Hire Django Developers from Soft Suave",
    body: "Hire expert Django developers from Soft Suave for superior expertise and cost-effective innovation. Our dedicated developers deliver high-quality, customized solutions rapidly, driving impactful results and guaranteed project success.",
    items: [
      {
        name: "Pre-vetted Django Developers",
        body: "Our developers are meticulously vetted to guarantee top-level skills, reliable performance, and total dedication to your project.",
        icon: "users",
      },
      {
        name: "Flexible hiring models",
        body: "Hire dedicated Django developers on your terms and scale your team up or down as required with our adaptable hiring models that align perfectly with your project's demands.",
        icon: "gauge",
      },
      {
        name: "Global delivery standards",
        body: "We implement agile techniques and global best practices to ensure quality that consistently meets or exceeds your expectations.",
        icon: "globe",
      },
      {
        name: "Strict NDA & IP protection",
        body: "We keep your intellectual property safe. Our airtight NDA agreements and complete protection ensure confidentiality every step of the way.",
        icon: "shield",
      },
      {
        name: "Time Zone Flexibility",
        body: "Our developers overlap 4-6 hours within your time zone, ensuring effortless real-time communication.",
        icon: "book",
      },
      {
        name: "World-Class Developers at Budget-Friendly Rates",
        body: "Hire offshore Django developer talent from a leading offshore software development company at competitive rates with top-tier expertise.",
        icon: "coins",
      },
    ],
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Steps to Hire a Django Developer",
    body: "With our 4-step customized hiring process, you can hire expert Django developers swiftly and stress-free.",
    steps: [
      {
        n: "01",
        name: "Share the JD",
        body: "Provide us with the details of your Django project and the skills you're looking for.",
      },
      {
        n: "02",
        name: "Shortlist The Right Developers",
        body: "We handpick the top developers that perfectly match your project needs.",
      },
      {
        n: "03",
        name: "Free 40-hour Trial",
        body: "Test our developers' capabilities for 40 hours with no commitment or cost.",
      },
      {
        n: "04",
        name: "Onboard & Manage",
        body: "Complete the legal agreements and smoothly integrate the developer into your workflow.",
      },
    ],
  },

  techStack: {
    eyebrow: "Technology",
    title: "Technical Expertise of Our Django Developers",
    body: "Our Django developers excel in Python, REST APIs, PostgreSQL, and scalable architecture. Hire remote Django developers and gain powerful solutions backed by robust technical expertise to enhance your digital capabilities.",
    groups: [
      { name: "Frameworks", items: ["Django", "Flask", "Pyramid"] },
      { name: "Platforms", items: ["AWS", "Azure", "GoogleCloud"] },
      {
        name: "Database",
        items: [
          "Mysql",
          "MongoDB",
          "Postgresql",
          "AWS DynamoDB",
          "SQLite",
          "Cloud Firestore",
          "Oracle",
          "MS SQL Server",
        ],
      },
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Django Development Services We Offer",
    body: "Unlock your project's full potential - our tailored Django solutions empower your ideas with innovation and precision. Accelerate digital growth by partnering with Soft Suave's highly skilled Django development experts today!",
    items: [
      {
        name: "Django API development",
        body: "Power your apps with secure, scalable Django APIs. Hire dedicated Django developer to craft seamless integrations, enhance performance, and transform user experience - your data, delivered flawlessly across any platform.",
      },
      {
        name: "Django e-commerce development",
        body: "Accelerate online sales with dynamic Django-powered e-commerce solutions. Hire expert Django developer from Soft Suave for secure shopping experiences, smooth payments, and optimized user journeys driving profitable growth effortlessly.",
      },
      {
        name: "Django migration and upgrades",
        body: "Future-proof your legacy apps with seamless Django migration. Our developers ensure zero downtime, enhanced security, and improved functionality, transforming outdated systems into robust, modern digital experiences quickly.",
      },
      {
        name: "Django web application development",
        body: "Create dynamic, effective Django web applications that are suited to your company's objectives. Hire remote Django developers from Soft Suave, delivering customized, user-focused applications that boost your competitive advantage significantly.",
      },
      {
        name: "Django maintenance and support",
        body: "Keep your business thriving with comprehensive Django support and maintenance that never lets you down. Our dedicated Django experts proactively handle updates, security, and troubleshooting, maximizing app reliability while you focus on core growth.",
      },
      {
        name: "Django dedicated teams",
        body: "Hire dedicated Django developers who will only work on your project. Take advantage of immediate scalability, direct control, and individualized attention to effortlessly achieve superior project outcomes, greater quality, and faster delivery.",
      },
      {
        name: "Django offshore teams",
        body: "Extend your capabilities efficiently—hire offshore Django developer teams offering unmatched flexibility and cost advantages. Our offshore specialists deliver superior Django expertise, accelerating your project timelines without compromising quality standards.",
      },
    ],
  },

  vetting: {
    eyebrow: "Vetting",
    title: "How We Vet and Onboard Top Django Developers",
    body: "We handpick top-tier Django talent with a rigorous selection process. Hire remote Django developers from Soft Suave, ensuring exceptional quality, reliability, and rapid onboarding for your projects every time.",
    steps: vetting([
      "We directly reach out to top Django developers to ensure we find the best talent.",
      "Each developer undergoes a comprehensive assessment, including coding tests and live challenges.",
      "We hire developers who thrive on collaboration and are adept at solving complex challenges.",
      "We ensure our developers are a great fit for your team and can adapt to your work environment.",
    ]),
  },

  comparison: partnerTable(
    "Choosing the Right Django Partner for Your Specific Needs",
    "Explore different hiring models like freelancers, in-house teams, or our expert Django developers. Our comparison chart helps you make an informed decision.",
  ),

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "FAQs About Hiring Django Developers",
    body: "Learn more about our procedures & methods with the help of these FAQs.",
    items: [
      {
        q: "How much does it cost to hire Django developer?",
        a: `Hire dedicated Django developer starting at just ${HOURLY_RATE}. Pricing that is transparent and adaptable to your project's scope and budget.`,
      },
      {
        q: "Is there any free trial period available?",
        a: "Yes, we provide a 40-hour trial to assess our developers' abilities before committing.",
      },
      {
        q: "What are the hiring engagement options available at Soft Suave?",
        a: "We offer flexible options: fixed price, time-based, and fully managed services.",
      },
      {
        q: "Do you provide support and maintenance services after deployment?",
        a: "Yes, we offer dedicated support and maintenance once the project goes live.",
      },
      {
        q: "Where can you find a Django Engineer?",
        a: "Hire Django developers effortlessly from Soft Suave. Our talent pool offers skilled, pre-vetted Django engineers, readily available for immediate onboarding, providing unmatched flexibility and expertise instantly.",
      },
    ],
  },
};
