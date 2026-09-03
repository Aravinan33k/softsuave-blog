/**
 * Mega-menu content for the nav's four divisions.
 *
 * Kept out of `content.ts` because it is a different shape and would double that
 * file's length: `nav.links` there stays the single source of truth for the
 * division labels and their top-level hrefs, and this module is keyed by the
 * same labels. A division without an entry here simply renders as a plain link
 * (which is how a landing page passing its own `links` behaves).
 *
 * ## hrefs
 * Every item points at something that exists today, in one of three forms, and
 * `MenuLink` picks the right element for each (see `mega-menu.tsx`):
 *
 *   `/path` we serve     one of the marketing routes in this app.
 *   `/path` we don't     a page softsuave.com publishes. `SiteLink` turns it
 *                        into an absolute link to the live site, and moves it
 *                        to a local route the day we ship one — the switch is
 *                        `MARKETING_PATHS` in themes/softsuave/nav-data, not
 *                        anything here.
 *   `#anchor`            the section of THIS page that covers it.
 *
 * Nothing here is a speculative URL, so no menu item can 404.
 *
 * The panel below mirrors the live site's own menu: every page softsuave.com's
 * homepage reaches is reachable from ours. The exceptions are deliberate — the
 * items that hold an `#anchor` are practices this page argues for that the live
 * site publishes no page for (the FDE model, Data Engineering, Data Science,
 * QA & Test Automation, full-stack and architect roles, Next.js). Pointing them
 * at a near-miss page would misdescribe them, so they go to the section that
 * describes them properly. Swap in the real path as each page ships.
 *
 * Two divisions are deliberately NOT mirrored, because they already have their
 * own "view all" navigation into the live site: the whole `Industries` panel,
 * and `Company`'s "Proof & recognition" group.
 *
 * ## groups
 * `dense` groups (roles, skills) drop the blurb and lay out as a compact
 * three-column list — a one-line description per item would be noise when the
 * item name is already the whole meaning.
 */

export type NavMenuItem = {
  readonly name: string;
  readonly href: string;
  /** One-line supporting phrase. Omitted in `dense` groups. */
  readonly blurb?: string;
  /**
   * Children, one level deep. A group holding any item with children renders
   * as columns — each item a heading with its own list — instead of flat rows.
   */
  readonly items?: readonly NavMenuItem[];
};

export type NavMenuGroup = {
  readonly key: string;
  readonly name: string;
  /** Compact 3-up list without blurbs, for long name-only lists. */
  readonly dense?: boolean;
  readonly items: readonly NavMenuItem[];
};

export type NavMenuPanel = {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly cta: { readonly label: string; readonly href: string };
  readonly groups: readonly NavMenuGroup[];
};

const SERVICES: NavMenuPanel = {
  eyebrow: "Services",
  title: "AI and software services, end to end",
  body: "Startup, SMB or enterprise — build AI solutions, ship software, automate workflows and scale delivery with one partner.",
  cta: { label: "All services", href: "#services" },
  groups: [
    {
      key: "ai-data",
      name: "AI & Data Services",
      items: [
        {
          name: "Custom AI Development",
          href: "/custome-ai-developement",
          blurb: "Generative, agentic and RAG systems built to fit",
          items: [
            { name: "Generative AI", href: "/generative-ai-development-company" },
            { name: "Agentic AI", href: "/agentic-ai-development-services" },
            { name: "RAG & Document AI", href: "/custome-ai-developement#services" },
            { name: "Computer Vision", href: "/custome-ai-developement#services" },
            { name: "Predictive Intelligence", href: "/custome-ai-developement#services" },
          ],
        },
        {
          name: "AI Development Services",
          href: "/ai-development-service",
          blurb: "The whole AI practice, assessment through production",
        },
        { name: "Data Engineering", href: "#services", blurb: "ETL/ELT pipelines, streaming, data quality" },
        { name: "Data Science", href: "#services", blurb: "Modelling, experimentation and MLOps" },
      ],
    },
    {
      key: "fdes",
      name: "FDEs",
      items: [
        {
          name: "Forward Deployed Engineers",
          href: "#services",
          blurb: "Engineers embedded with your team, shipping",
        },
        { name: "Embedded Product Pods", href: "#services", blurb: "A standing squad owning an outcome" },
        { name: "Integration Engineering", href: "#services", blurb: "AI wired into the systems you already run" },
        { name: "Solution Prototyping", href: "#journey", blurb: "A working prototype before the big spend" },
      ],
    },
    {
      key: "software",
      name: "Software & Application Development",
      items: [
        { name: "Software Development", href: "/software-development-company", blurb: "Custom builds, start to release" },
        { name: "Web App Development", href: "/web-application-development-company", blurb: "Product-grade web platforms" },
        { name: "Mobile App Development", href: "/mobile-application-development-company", blurb: "Native and cross-platform apps" },
        { name: "Product Engineering", href: "/product-engineering-services", blurb: "Roadmap to release, end to end" },
        { name: "Legacy Modernization", href: "/legacy-modernization-services", blurb: "Re-platform without stopping the business" },
        { name: "Cloud & DevOps", href: "/cloud-computing", blurb: "Scalable infrastructure and delivery pipelines" },
        { name: "QA & Test Automation", href: "#services", blurb: "Coverage that keeps releases safe" },
      ],
    },
    {
      key: "global-delivery",
      name: "Global Delivery & Engineering Services",
      items: [
        { name: "Global Capability Center", href: "/global-capability-center", blurb: "Your own offshore engineering centre" },
        { name: "Offshore Development", href: "/offshore-software-development-company", blurb: "Cost-effective delivery at scale" },
        { name: "IT Outsourcing", href: "/it-outsourcing-services", blurb: "Whole functions, managed for you" },
        { name: "IT Staff Augmentation", href: "/it-staff-augmentation-services", blurb: "Add proven engineers to your team" },
        { name: "Dedicated Development Teams", href: "/hire-dedicated-developers", blurb: "A long-running team that learns your domain" },
        { name: "On-Demand Teams", href: "/on-demand-teams", blurb: "Scale a squad up and down as the work moves" },
        { name: "Software Development India", href: "/software-development-company-india", blurb: "Our Chennai delivery centre" },
      ],
    },
    {
      key: "tech-mobile",
      name: "Mobile Technologies",
      dense: true,
      items: [
        { name: "Mobile Apps", href: "/mobile-application-development-company" },
        { name: "Android", href: "/android-application-development-company" },
        { name: "iOS", href: "/ios-application-development-company" },
        { name: "React Native", href: "/react-native-app-development-company" },
        { name: "Flutter", href: "/flutter-application-development-company" },
        { name: "Ionic", href: "/ionic-app-development-company" },
        { name: "Xamarin", href: "/xamarin-app-development-company" },
      ],
    },
    {
      key: "tech-web",
      name: "Web Technologies",
      dense: true,
      items: [
        { name: "Web Apps", href: "/web-application-development-company" },
        { name: "React.js", href: "/reactjs-app-development-company" },
        { name: "Angular", href: "/angularjs-development-company" },
        { name: "Node.js", href: "/nodejs-development-company" },
        { name: "Java", href: "/java-application-development-company" },
        { name: "Python", href: "/python-application-development-company" },
        { name: "PHP", href: "/php-application-development-company" },
        { name: ".NET", href: "/dot-net-application-development-company" },
        { name: "Ruby on Rails", href: "/ruby-on-rails-development-company" },
      ],
    },
    {
      key: "hire-role",
      name: "Hire Developers by Role",
      dense: true,
      items: [
        { name: "AI/ML Engineers", href: "/hire-ai-developer" },
        { name: "Software Developers", href: "/hire-software-developers" },
        { name: "Web App Developers", href: "/hire-web-app-developers" },
        { name: "Mobile Developers", href: "/hire-mobile-app-developers" },
        { name: "Front-End Developers", href: "/hire-frontend-application-developer" },
        { name: "Back-End Developers", href: "/hire-backend-application-developer" },
        { name: "DevOps Engineers", href: "/hire-devops-developers" },
        { name: "QA Engineers", href: "/hire-qa-testers-india" },
        { name: "Dedicated Developers", href: "/hire-dedicated-developers" },
        { name: "Data Engineers", href: "#contact" },
        { name: "Full-Stack Developers", href: "#contact" },
        { name: "Solution Architects", href: "#contact" },
      ],
    },
    {
      key: "hire-skill",
      name: "Hire Developers by Skill",
      dense: true,
      items: [
        { name: "Python", href: "/hire-python-developers" },
        { name: "Node.js", href: "/hire-nodejs-developers" },
        { name: "React", href: "/hire-reactjs-developers" },
        { name: "Angular", href: "/hire-angularjs-developers" },
        { name: "Java", href: "/hire-java-developers" },
        { name: ".NET", href: "/hire-dot-net-developers" },
        { name: "PHP", href: "/hire-php-developers" },
        { name: "Ruby on Rails", href: "/hire-ruby-on-rails-developer" },
        { name: "Django", href: "/hire-django-developer" },
        { name: "Laravel", href: "/hire-laravel-developer" },
        { name: "NestJS", href: "/hire-nestjs-developers" },
        { name: "MEAN Stack", href: "/hire-mean-stack-developers-india" },
        { name: "MERN Stack", href: "/hire-mern-stack-developers-india" },
        { name: "Android", href: "/hire-android-developers" },
        { name: "iOS", href: "/hire-ios-developers" },
        { name: "Swift", href: "/hire-swift-developers" },
        { name: "Kotlin", href: "/hire-kotlin-developer" },
        { name: "Flutter", href: "/hire-flutter-developers" },
        { name: "React Native", href: "/hire-react-native-developers" },
        { name: "Ionic", href: "/hire-ionic-developers" },
        { name: "Blockchain", href: "/hire-blockchain-developer" },
        { name: "Salesforce", href: "/hire-salesforce-developer" },
        { name: "Magento", href: "/hire-magento-developer" },
        { name: "Drupal", href: "/hire-drupal-developer" },
        { name: "Next.js", href: "#tech" },
      ],
    },
  ],
};

const INDUSTRIES: NavMenuPanel = {
  eyebrow: "Industries",
  title: "AI-driven efficiency across industries",
  body: "We make business systems smarter and more connected, so organisations modernise faster in a digital-first market.",
  cta: { label: "All industries", href: "#industries" },
  groups: [
    {
      key: "sectors",
      name: "Sectors we serve",
      items: [
        { name: "FinTech", href: "#industries", blurb: "Fraud detection and personalised banking" },
        { name: "HealthTech", href: "#industries", blurb: "Patient outcomes and clinical workflows" },
        { name: "EdTech", href: "#industries", blurb: "Personalised learning and analytics" },
        { name: "Ecommerce", href: "#industries", blurb: "Recommendations and inventory automation" },
        { name: "Logistics", href: "#industries", blurb: "Forecasting and route optimisation" },
        { name: "Telecom", href: "#industries", blurb: "Predictive maintenance and network AI" },
      ],
    },
    {
      key: "proof",
      name: "Case studies",
      items: [
        { name: "Vision AI for tolling", href: "#work", blurb: "95%+ detection accuracy, Logistics" },
        { name: "Subscription commerce", href: "#work", blurb: "$10M+ ARR growth, E-commerce" },
        { name: "Pet-care health platform", href: "#work", blurb: "90% less manual record work, HealthTech" },
        { name: "AI learning platform", href: "#work", blurb: "Real-time feedback, EdTech" },
      ],
    },
  ],
};

const COMPANY: NavMenuPanel = {
  eyebrow: "Company",
  title: "Practical AI, built by a team that ships",
  body: "13+ years of product development, an AI-first engineering bench, and the recognition to back it up.",
  cta: { label: "Talk to us", href: "#contact" },
  groups: [
    {
      key: "about",
      name: "About Soft Suave",
      items: [
        { name: "About Us", href: "/about", blurb: "Who we are and how we got here" },
        { name: "Why Soft Suave", href: "#why", blurb: "What we do differently, in numbers" },
        { name: "AI Transformation Journey", href: "#journey", blurb: "How an engagement actually runs" },
        { name: "Tech Stack", href: "#tech", blurb: "The tools we build production AI on" },
        { name: "Life at Soft Suave", href: "/life-at-softsuave", blurb: "The team behind the delivery" },
        { name: "Careers", href: "/career-overview", blurb: "Open roles across engineering and AI" },
        { name: "Contact", href: "/contact", blurb: "Book an AI strategy call" },
      ],
    },
    {
      key: "engage",
      name: "Working with us",
      items: [
        { name: "How to Hire", href: "/how-to-hire", blurb: "The engagement models, step by step" },
        { name: "Free Cost Estimation", href: "/free-cost-estimation", blurb: "A costed plan before you commit" },
        { name: "FAQs", href: "/faqs", blurb: "Contracts, IP, notice periods, overlap hours" },
      ],
    },
    {
      /* Untouched by the mirroring pass: this group already has its own "view
         all" route into the live site from the Recognitions section, so its
         items stay pointed at the sections of this page. */
      key: "recognition",
      name: "Proof & recognition",
      items: [
        { name: "Awards", href: "#awards", blurb: "Clutch, UpFirms, SoftwareWorld and more" },
        { name: "Recognitions", href: "#awards", blurb: "Independent industry rankings" },
        { name: "Client Testimonials", href: "#testimonials", blurb: "What partners say after shipping" },
        { name: "Clients", href: "#clients", blurb: "The names behind the numbers" },
      ],
    },
  ],
};

const RESOURCES: NavMenuPanel = {
  eyebrow: "Resources",
  title: "Field notes from building AI systems",
  body: "Engineering write-ups, delivery playbooks and the case studies behind them.",
  cta: { label: "Read the blog", href: "/blog" },
  groups: [
    {
      key: "insights",
      name: "Insights",
      items: [
        { name: "Blog", href: "/blog", blurb: "Long-form engineering and delivery writing" },
        { name: "Case Studies", href: "/case-studies", blurb: "Problem, system, measured outcome" },
        { name: "Success Stories", href: "/success-stories", blurb: "The client's account of the same work" },
        { name: "Our Clients", href: "/clients", blurb: "Who we have shipped for" },
        { name: "Search Articles", href: "/search", blurb: "Find a topic across the archive" },
      ],
    },
  ],
};

/** Keyed by the division label in `content.ts`'s `nav.links`. */
export const navPanels: Readonly<Record<string, NavMenuPanel>> = {
  Services: SERVICES,
  Industries: INDUSTRIES,
  Company: COMPANY,
  Resources: RESOURCES,
};
