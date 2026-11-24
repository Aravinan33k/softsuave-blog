/**
 * The `hire-ruby-on-rails-developer` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-ruby-on-rails-developer/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { partnerTable } from "../hire-comparison";
import { HOURLY_RATE } from "../../company-figures";
import { MODERN_ORDER, vetting } from "./backend-shared";

export const skill: HireSkill = {
  closingCtaIcon: true,
  clientsWideTitle: true,
  slug: "hire-ruby-on-rails-developer",
  key: "rails",
  name: "Ruby on Rails",
  role: "Ruby on Rails Developers",
  metaTitle: "Hire Ruby on Rails Developers | Dedicated Devs on Demand",
  metaDescription:
    "Hire Ruby on Rails developers and onboard in 48 hours. Start building secure, fast, & scalable web apps with the flexibility of a remote team.",
  serviceType: "Ruby on Rails development staffing",
  ctaLabel: "Hire Rails developers",

  order: [...MODERN_ORDER],

  hero: {
    titleLines: ["Hire Ruby on Rails Developers", "in India On Contract"],
    accent: "Ruby on Rails Developers",
    body: [
      "Faster builds. Cleaner code. Quicker launches. Hire Ruby on Rails developers through Soft Suave, a specialized staffing agency offering dedicated teams or individual developers - vetted, contract-ready, and built to deliver scalable web applications that move as fast as your business does.",
      "Great Rails apps start with the right developer - find yours here.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Ruby on Rails in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      submitHover: 'black',
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Ruby on Rails requirement.",
      subject: "Ruby on Rails Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-ror-hero.webp",
      width: 1800,
      height: 900,
      alt: "Ruby test configuration code on a dark screen",
      blurDataURL:
        "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAQCdASoQAAsAA4BaJZACdADRX8B2AAD+8t8XPptbdpovW9Fu0vJkPi49a7TKcmABFmSiCc6v8bXNiAApUG4zdwAAAA==",
    },
  },

  /**
   * The last card and the first hiring step both say "Drupal" on the live
   * Rails page. Reproduced as published — see this file's header.
   */
  whyUs: {
    wideHead: true,
    eyebrow: "Why Soft Suave",
    title: "Why Hire Ruby on Rails Developers from Soft Suave",
    body: "Why settle for average? Hire dedicated Ruby on Rails developers who thrive under pressure, adapt quickly, deliver exceptional results every time, and give your projects the expertise they truly deserve",
    items: [
      {
        name: "Pre-vetted Ruby on Rails Developers",
        body: "Our Ruby on Rails developers undergo strict screening to ensure they possess top-notch skills, reliability, and an unwavering commitment to your project's success.",
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
        body: "Hire offshore Drupal developers or use our offshore software development service to access top-tier talent at competitive rates with Soft Suave.",
        icon: "coins",
      },
    ],
  },

  process: {
    wideHead: true,
    eyebrow: "Hiring Process",
    title: "Steps to Hire a Ruby on Rails Developer",
    body: "Hire expert Ruby on Rails developers in just 4 easy steps & onboard them in no time!",
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

  techStack: {
    wideHead: true,
    eyebrow: "Technology",
    title: "Technical Expertise of Our Ruby on Rails Developers",
    body: "Unlock the power of your project with our Ruby on Rails experts, from stunning front-end designs to robust database solutions. Hire experts who craft modular architecture, boost performance, and engineer every line for stability, speed, and scale.",
    groups: [
      { name: "Frameworks", items: ["Rails", "Sinatra", "Hanami", "Cuba"] },
      { name: "Programming Languages", items: ["Ruby"] },
      { name: "Databases", items: ["AWS RDS", "Heroku Postgres", "Maria DB"] },
      {
        name: "IDE",
        items: ["RubyMine", "Sublime", "VIM", "Visual Studio Code", "Atom Editor", "Aptana Studio"],
      },
      { name: "Web Server", items: ["Nginx", "Apache"] },
      { name: "App Server", items: ["Puma", "Unicorn", "Passenger", "Thin", "Webrick"] },
      { name: "Version Control", items: ["Git", "Github", "Gitlab", "Bitbucket"] },
      {
        name: "Testing Tools",
        items: ["Rspec", "Capybara", "FactoryBot", "Faker", "Minitest", "Simplecov", "Database Cleaner"],
      },
      {
        name: "Frontend",
        items: ["ReactJS", "VueJS", "Angular", "Webpacker", "Hotwire", "Bootstrap", "Jquery"],
      },
      { name: "Cloud", items: ["AWS", "Azure", "Digital Ocean"] },
      { name: "API Integration", items: ["Grape", "Rails API", "Swagger", "Apipie-rails"] },
      { name: "Monitoring and Performance", items: ["New Relic", "Datadog", "PaperTrail"] },
      { name: "CI/CD", items: ["CircleCI", "GitHub Actions", "Jenkins"] },
      { name: "Code Quality", items: ["Rubocop", "Reek"] },
      { name: "Deployment Tools", items: ["Heroku", "Capistrano", "Mina", "Docker"] },
      { name: "Communication Tools", items: ["Slack", "MS Teams", "Google Meet and Chat"] },
      { name: "AI Tools", items: ["Github CoPilot", "Google Gemini", "Chat GPT"] },
      {
        name: "Authentication & Authorizations",
        items: ["Devise", "Omniauth", "Pundit", "CanCanCan"],
      },
      { name: "Background Jobs", items: ["Sidekiq", "Resque", "Delayed Jobs"] },
      { name: "Caching", items: ["Redis"] },
      { name: "Error Tracking and Logging", items: ["Sentry", "Rollbar", "Honeybadger"] },
      { name: "Search", items: ["Elasticsearch", "Solr"] },
      { name: "Localization", items: ["I18n"] },
      { name: "Admin Interfaces", items: ["ActiveAdmin", "RailsAdmin"] },
      { name: "Configuration Management", items: ["Figaro", "dotenv"] },
      { name: "File Uploads", items: ["CarrierWave", "Active Storage"] },
      { name: "Meeting", items: ["Microsoft Team", "Google Meet", "Zoom"] },
      { name: "PMS", items: ["JIRA", "Trello"] },
    ],
  },

  services: {
    wideHead: true,
    // Live closes this band on "Talk to Our Experts" (review: "CTA button missing").
    cta: { label: "Talk to Our Experts", href: "/contact" },
    eyebrow: "Services",
    title: "Ruby on Rails Development Services We Offer",
    body: "From app development to performance tuning and long-term maintenance, we offer full-stack Ruby on Rails services that launch quickly, scale effortlessly, and address real-world business challenges with precision. All of this comes at affordable rates. Our offshore software development service connects you with expert Ruby on Rails developers, delivering high-quality solutions without compromising on cost.",
    items: [
      {
        name: "ROR Application Development",
        body: "Soft Suave delivers custom, cost-effective Ruby on Rails apps that are fast, secure, and tailored to outshine competitors. With expert developers and industry-specific solutions, they turn complex challenges into long-term business wins.",
      },
      {
        name: "ROR Integration & Migration",
        body: "Soft Suave simplifies RoR integration and migration with flawless execution and zero disruption. Our developers deliver flexible, scalable solutions and seamless third-party API integration, earning trust as a top RoR company globally.",
      },
      {
        name: "Dedicated ROR Developer Team",
        body: "Soft Suave empowers businesses to scale with dedicated RoR developers who blend seamlessly into your in-house team. Get full control, on-time delivery, and collaborative solutions tailored to your unique goals, regardless of time zone.",
      },
      {
        name: "ROR Support & Maintenance",
        body: "Soft Suave ensures peak RoR performance with 24/7 support and tailored maintenance, covering upgrades, bug fixes, security patches, and backups. A dedicated team handles client needs seamlessly, keeping applications efficient, reliable, and aligned with evolving business goals.",
      },
      {
        name: "ROR E-commerce Solutions",
        body: "Use Ruby on Rails to turn your e-commerce idea into a reality. We design and build feature-rich, secure, and scalable online stores that offer seamless user experiences, robust payment gateways, and effortless product management, driving business growth.",
      },
      {
        name: "ROR Cloud Solutions & Deployment",
        body: "Take your app to the cloud with confidence. Our ROR cloud deployment services provide secure, scalable solutions tailored to your infrastructure, ensuring smooth migrations, optimal performance, and full cloud integration for flexibility and growth.",
      },
      {
        name: "ROR Custom Web App Development",
        body: "Use Ruby on Rails to create dynamic, user-friendly web apps. Our custom development services are designed to turn complex business requirements into intuitive, scalable, and high-performing web solutions that engage users and drive results.",
      },
    ],
  },

  vetting: {
    wideHead: true,
    eyebrow: "Vetting",
    title: "How We Vet and Onboard Top Ruby on Rails Developers",
    body: "Each Ruby on Rails engineer is vetted for technical brilliance, communication, and reliability. Hire expert Ruby on Rails developers who deliver from day one.",
    steps: vetting([
      "We proactively source top Ruby on Rails developers, going beyond just posting ads.",
      "We subject all developers to tough technical assessments and coding challenges.",
      "We look for developers who excel in collaborative environments and solving complex problems.",
      "We ensure our developers are adaptable and can integrate seamlessly with your team.",
    ]),
  },

  comparison: {
    ...partnerTable(
      "Choosing the Right Ruby on Rails Partner for Your Specific Needs",
      "Explore different hiring models: freelancers, in-house teams, or our expert Ruby on Rails developers. Our comparison chart helps you make an informed decision.",
    ),
    wideHead: true,
  },

  exploreMore: {
    ...webExplore,
    wideHead: true,
  },

  faq: {
    wideHead: true,
    eyebrow: "FAQs",
    title: "FAQs About Hiring Ruby on Rails Developers",
    body: "Learn more about our procedures & methods with the help of these FAQs.",
    items: [
      {
        q: "How much does it cost to hire Ruby on Rails developer?",
        a: `Costs depend on skills and the engagement model. We offer affordable rates starting from ${HOURLY_RATE} when you hire expert Ruby on Rails developer talent.`,
      },
      {
        q: "Is there any free trial period available?",
        a: "Yes, we offer a 40-hour trial period to help you evaluate our developers' skills before committing.",
      },
      {
        q: "What are the hiring engagement options available at Soft Suave?",
        a: "We provide flexible engagement options, including fixed price, time-based, and fully managed services.",
      },
      {
        q: "Do you provide support and maintenance services after deployment?",
        a: "Yes, we provide ongoing support and maintenance services after your project is live.",
      },
      {
        q: "Where can you find a Ruby on Rails Engineer?",
        a: "Find top-tier talent right here. Hire Ruby on Rails developers from Soft Suave to build your next solution.",
      },
    ],
  },
};
