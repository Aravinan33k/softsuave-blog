/**
 * The `hire-laravel-developer` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-laravel-developer/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { partnerTable } from "../hire-comparison";
import { HOURLY_RATE } from "../../company-figures";
import { MODERN_ORDER, vetting } from "./backend-shared";

export const skill: HireSkill = {
  slug: "hire-laravel-developer",
  key: "laravel",
  name: "Laravel",
  role: "Laravel Developers",
  metaTitle: "Hire Laravel Developer India - Top 1% Programmers",
  metaDescription:
    "Looking to hire laravel developer india? Get vetted experts on-demand for custom web apps. Flexible hiring, 40 hrs free trial & cost-effective pricing.",
  serviceType: "Laravel development staffing",
  ctaLabel: "Hire Laravel developers",

  order: [...MODERN_ORDER],

  hero: {
    titleLines: ["Hire Laravel Developers", "in India within 48 hours"],
    accent: "Laravel Developers",
    body: [
      "Soft Suave provides experienced Laravel developers from India for rapid hiring needs. Hire experts in Laravel, PHP, MySQL, REST APIs, SaaS platforms, e-commerce systems, and custom web applications – contract-ready and onboarded fast.",
      "See why businesses choose Soft Suave for Laravel hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Laravel Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Laravel requirement.",
      subject: "Laravel Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-laravel-hero.webp",
      width: 1800,
      height: 900,
      alt: "Developer coding on a laptop by lamplight at night",
      blurDataURL:
        "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAQAgCdASoQAAsAA4BaJZACdADxAEr7uZCAAP7hc6ZDvCwinQZ700j7TJfq6fAyKoWTGD9b7LgFWdHI/SlIwGRVSKoAAA==",
    },
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Hire Laravel Developers from Soft Suave",
    body: "At Soft Suave, we don't just provide developers - we deliver Laravel experts who think like partners, not just coders. Here's why businesses worldwide hire remote Laravel developers from us.",
    items: [
      {
        name: "Pre-vetted Laravel developers",
        body: "Every developer is rigorously screened to ensure top-tier skills, reliable performance, and a strong commitment to your project.",
        icon: "users",
      },
      {
        name: "Flexible hiring models",
        body: "Scale up or down easily — hire dedicated Laravel developers on your terms with flexible models that adapt to your project's pace.",
        icon: "gauge",
      },
      {
        name: "Global delivery standards",
        body: "Our teams work with agile precision and global best practices to deliver quality that speaks for itself.",
        icon: "globe",
      },
      {
        name: "Strict NDA & IP protection",
        body: "Your ideas stay yours. We ensure confidentiality with airtight NDAs and complete intellectual property protection.",
        icon: "shield",
      },
      {
        name: "Time Zone Flexibility",
        body: "We overlap with your time zone for 4 - 6 hours, ensuring seamless collaboration and real-time communication no matter where you are.",
        icon: "book",
      },
      {
        name: "World-Class Developers at Budget-Friendly Rates",
        body: "As a leading offshore software development company, Soft Suave lets you hire offshore Laravel developer talent at budget-friendly rates without compromising on quality.",
        icon: "coins",
      },
    ],
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Steps to Hire a Laravel Developer",
    body: "Fast, easy, and tailored: Our 4-step hiring process lets you hire expert Laravel developers & onboard them in no time",
    steps: [
      {
        n: "01",
        name: "Share the JD",
        body: "Tell us about your project and the type of Laravel developers you are looking for.",
      },
      {
        n: "02",
        name: "Shortlist The Right Developers",
        body: "Select leading developers from a carefully chosen list that matches your project needs.",
      },
      {
        n: "03",
        name: "Free 40-hour Trial",
        body: "Evaluate our developers' skills at no cost by utilizing a 40-hour trial.",
      },
      {
        n: "04",
        name: "Onboard & Manage",
        body: "Sign the SLA & NDA agreements and integrate the resource into your team.",
      },
    ],
  },

  /**
   * Carried across exactly as the live page publishes it — including the first
   * four groups, which list a mobile stack (Flutter, Swift, Xcode, Swift Data)
   * on a Laravel page. That is a content error on softsuave.com, not a porting
   * one; correcting it is the site owners' call.
   */
  techStack: {
    eyebrow: "Technology",
    title: "Technical Expertise of Our Laravel Developers",
    body: "Soft Suave makes it easy to hire Laravel developers with expertise in modern frameworks, API integrations, and building robust digital solutions.",
    groups: [
      { name: "Frameworks", items: ["Flutter", "Swift", "Ionic", "NativeScript", "jQuery Mobile"] },
      { name: "Programming Languages", items: ["Java", "Kotlin", "JavaScript", "TypeScript"] },
      { name: "Databases", items: ["SQLite", "Swift Data", "PostgreSQL"] },
      { name: "IDE", items: ["Android Studio", "Eclipse, Xcode", "Visual Studio Code"] },
      { name: "Technologies", items: ["PHP", "Javascript", "Typescript", "DBMS"] },
      {
        name: "Packages & Libraries",
        items: ["Composer", "GuzzleHTTP", "PHP Mailer", "Tinker", "PHP Unit", "Swift Mailer", "Telescopet"],
      },
      { name: "Version Control", items: ["Git", "Github", "Gitlab", "Bitbucket", "AWS CodeCommit"] },
      { name: "Testing Tools", items: ["PEST", "Selenium", "Cypress"] },
      {
        name: "Startup Kit/ CMS",
        items: ["Filament", "Breez", "Nova", "Voyager", "Statamic", "October CMS", "Backpack"],
      },
      { name: "Cloud", items: ["AWS", "Azure", "GCP"] },
      { name: "API", items: ["REST", "SOAP", "OpenAPI"] },
      {
        name: "Development Tools",
        items: ["PHP Storm", "VS Code", "Sublime", "Postman", "Laragon", "Docker", "SQLyog", "Herd"],
      },
      {
        name: "UI/UX Support",
        items: ["Laravel Blade", "Twig", "Livewire", "Vue JS", "React JS", "Angular JS", "Tailwind CSS"],
      },
      { name: "Project Management Tools", items: ["Jira", "Asana", "Trello", "Basecamp"] },
      {
        name: "Deployment Tools",
        items: ["Github Actions", "Jenkins", "Circle CI", "Laravel Forge", "Envoyer", "Vapor"],
      },
      { name: "Communication Tools", items: ["Slack", "MS Teams", "Zoom", "Google Meet and Chat"] },
      { name: "AI Tools", items: ["Github CoPilot", "Tabnine", "Chat GPT"] },
      {
        name: "Authentication & Authorisations",
        items: ["Laravel Passport", "Sanctum", "JWT", "Spatie Permissions", "Gates", "Policies"],
      },
      { name: "Real-time data communication", items: ["Pusher", "Socket.io"] },
      {
        name: "Design Patterns",
        items: ["Simple MVC pattern", "Service pattern", "Repository pattern", "Factory pattern"],
      },
      {
        name: "Other Services/Integrations",
        items: ["Stripe", "Paypal", "Authorize.net", "Twilio", "Mailchimp", "Firebase", "GCP Services"],
      },
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Laravel Development Services We Offer",
    body: "From strategy to deployment, we deliver high-quality, tailored applications for diverse business needs. Our end-to-end Laravel development services empower businesses to build robust digital solutions",
    items: [
      {
        name: "Custom Laravel Web Development",
        body: "Bespoke Laravel websites tailored to your business goals — fast, scalable, secure, and ready to impress your users.",
      },
      {
        name: "Laravel Application Development",
        body: "We build robust Laravel applications that power digital transformation and deliver superior user experiences across platforms and industries.",
      },
      {
        name: "Laravel Enterprise Application Development",
        body: "Enterprise-grade Laravel apps built for performance, security, scalability, and seamless integration into your complex business ecosystems.",
      },
      {
        name: "API & Module Development",
        body: "Custom APIs and reusable Laravel modules that connect, extend, and supercharge your web or mobile application.",
      },
      {
        name: "Support and Maintenance Services",
        body: "We take care of your Laravel app with proactive updates and security patches, performance tuning, and 24/7 support.",
      },
      {
        name: "Laravel Migration & Upgradation",
        body: "Hire dedicated Laravel developers & future-proof your projects with smooth migrations & updates, ensuring peak performance and enhanced features.",
      },
      {
        name: "Laravel Testing & QA",
        body: "Hire expert Laravel developers and ensure flawless performance with thorough Laravel testing and QA to catch bugs before launch.",
      },
      {
        name: "Laravel Cloud Deployment and Hosting",
        body: "Launch seamlessly on the cloud with secure, scalable Laravel hosting. Hire dedicated Laravel developers for a smooth cloud setup!",
      },
      {
        name: "Laravel Security Services",
        body: "Fortify your app with top-tier Laravel security and protect your data, apps, and users. Hire expert Laravel developers for impenetrable security.",
      },
      {
        name: "Laravel CMS Development",
        body: "Create a CMS that adapts to your needs and scales with your business. Build something powerful, flexible, and effortless.",
      },
      {
        name: "Laravel Consulting & Strategy",
        body: "Unlock your business's potential with strategic Laravel consulting. We turn bold ideas into efficient, high-impact solutions that deliver results.",
      },
    ],
  },

  vetting: {
    eyebrow: "Vetting",
    title: "How We Vet and Onboard Top Laravel Developers",
    body: "Our process ensures only the best Laravel developers join your project – skilled, adaptable, and reliable, with proven experience in delivering high-performance, maintainable code across complex, deadline-driven development environments.",
    steps: vetting([
      "We actively hunt for top-tier Laravel talent, not just post ads and wait.",
      "Every developer proves their expertise through tough technical tests and live coding challenges.",
      "We hire developers who think, collaborate, and innovate — perfect for complex, fast-moving projects.",
      "We select Laravel experts who communicate well, adapt quickly, and thrive in your team culture.",
    ]),
  },

  comparison: partnerTable(
    "Choosing the Right Laravel Partner for Your Specific Needs",
    "Explore how to choose the right fit for your business by comparing an in-house team, freelancers, & Soft Suave’s experts. Check out this detailed comparison chart for valuable insights.",
  ),

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "FAQs About Hiring Laravel Developers",
    body: "Learn more about our procedures & methods with the help of these FAQs.",
    items: [
      {
        q: "How much does it cost to hire a Laravel developer?",
        a: `Our prices begin at ${HOURLY_RATE}, and based on the level of experience of the developer, it may increase.`,
      },
      {
        q: "Is there any free trial period available?",
        a: "Yes, we provide a risk-free 40-hour trial so you can assess our developers' abilities before committing.",
      },
      {
        q: "What are the hiring engagement options available at Soft Suave?",
        a: "We offer flexible hiring models: fixed price, time and material, or managed services model.",
      },
      {
        q: "Do you provide support and maintenance services after deployment?",
        a: [
          "Yes, we offer dedicated support, maintenance, and performance enhancement services once the project goes live.",
        ],
        points: [
          "Full-time Basis",
          "Part-time Basis",
          "Milestone Basis",
        ],
      },
      {
        q: "Where can you find a Laravel Engineer?",
        a: "At Soft Suave, you can hire expert Laravel developers quickly and easily.",
      },
    ],
  },
};
