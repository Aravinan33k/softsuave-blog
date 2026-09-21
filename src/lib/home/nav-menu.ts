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
 * site publishes no page for — in the Services panel that is now the FDE model
 * alone. Pointing one at a near-miss page would misdescribe it, so it goes to
 * the section that describes it properly. Swap in the real path as each page
 * ships.
 *
 * ## what the menu may list (11 Sep review)
 * The menu is scoped to the page list in the site-revamp sheet. An item earns a
 * place only if it is a page we serve, a page softsuave.com serves, a section of
 * this page, or a page the sheet has planned. Ten items met none of those and
 * were removed: Embedded Product Pods, Integration Engineering, Solution
 * Prototyping, QA & Test Automation, On-Demand Teams, Software Development
 * India, and the Data Engineer / Full-Stack / Solution Architect / Next.js hire
 * entries — every one of them a division's own `#section` or a path nothing
 * serves, standing in for a page that was never planned.
 *
 * Four `#anchor` items stayed because the sheet DOES plan their page, and they
 * take its path the day it ships. That day has now come for all of them: Data
 * Engineering and Data Science hold `/data-engineering-services` and
 * `/data-science-services` (sheet rows 8-9), and the three Custom AI children
 * have given up the near-miss `#services` anchor for `/rag-development-services`,
 * `/computer-vision-development-services` and `/predictive-intelligence-services`
 * (rows 5-7) — all five routes shipped on the custom-ai-sub-pages branch.
 * Forward Deployed Engineers (row 10) holds `/hire-forward-deployed-engineer`,
 * which runs the hire-by-role template (`lib/home/hire-roles/forward-deployed`)
 * even though this group, not "Hire By Role", is where the live menu files it.
 *
 * Two divisions are deliberately NOT mirrored, because they already have their
 * own "view all" navigation: the whole `Industries` panel, whose CTA is now our
 * own `/industries` sector index, and `Company`'s "Proof & recognition" group.
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

/**
 * Resolve a nav href for the page it is rendered on.
 *
 * The bar and its panels are the homepage's, and two dozen of their
 * destinations are bare `#section` anchors — the homepage owns those sections.
 * Rendered anywhere else, such an href scrolls nowhere and fails silently.
 * Prefixing it with "/" turns it into what the reader meant: go to the
 * homepage, land on that section. On the homepage nothing is rewritten, so its
 * own Lenis in-page scrolling is untouched.
 */
export function navHrefForPage(href: string, onHome: boolean): string {
  return !onHome && href.startsWith("#") ? `/${href}` : href;
}

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
          href: "/custom-ai-development-services",
          blurb: "Generative, agentic and RAG systems built to fit",
          items: [
            { name: "Generative AI", href: "/generative-ai-development-company" },
            { name: "Agentic AI", href: "/agentic-ai-development-services" },
            { name: "RAG & Document AI", href: "/rag-development-services" },
            { name: "Computer Vision", href: "/computer-vision-development-services" },
            { name: "Predictive Intelligence", href: "/predictive-intelligence-services" },
          ],
        },
        {
          name: "AI Development Services",
          href: "/ai-development-service",
          blurb: "The whole AI practice, assessment through production",
        },
        { name: "Data Engineering", href: "/data-engineering-services", blurb: "ETL/ELT pipelines, streaming, data quality" },
        { name: "Data Science", href: "/data-science-services", blurb: "Modelling, experimentation and MLOps" },
      ],
    },
    {
      key: "fdes",
      name: "FDEs",
      items: [
        {
          name: "Forward Deployed Engineers",
          href: "/hire-forward-deployed-engineer",
          blurb: "Engineers embedded with your team, shipping",
        },
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
      ],
    },
    {
      key: "global-delivery",
      name: "Global Delivery & Engineering Services",
      items: [
        { name: "Global Capability Center", href: "/global-capability-center", blurb: "Your own offshore engineering centre" },
        { name: "Offshore Development", href: "/offshore-software-development-company", blurb: "Cost-effective delivery at scale" },
        // Slug matches the live page this replaces (`/it-outsourcing-company-india`)
        // and the route now serving it; `/it-outsourcing-services` was never a page.
        { name: "IT Outsourcing", href: "/it-outsourcing-company-india", blurb: "Whole functions, managed for you" },
        { name: "IT Staff Augmentation", href: "/it-staff-augmentation-services", blurb: "Add proven engineers to your team" },
        { name: "Dedicated Development Teams", href: "/hire-dedicated-developers", blurb: "A long-running team that learns your domain" },
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
      /**
       * softsuave.com's own "Hire By Role" panel, item for item and in its
       * order — the labels, the thirteen roles, and which of the two hire
       * groups each one belongs to all come from the live menu rather than
       * being re-worded here. The names keep their "Hire " prefix because
       * that is how the live panel reads; the group heading repeating it is
       * the live design, not an accident.
       *
       * Four of these used to sit under "Hire By Skill" below — Android, iOS,
       * Salesforce and Blockchain. The live site files them as roles, so they
       * moved here and left the skill list to the languages and frameworks.
       */
      name: "Hire By Role",
      dense: true,
      items: [
        { name: "Hire Software Developer", href: "/hire-software-developers" },
        { name: "Hire Web App Developer", href: "/hire-web-app-developers" },
        { name: "Hire Mobile App Developer", href: "/hire-mobile-app-developers" },
        { name: "Hire Frontend Developer", href: "/hire-frontend-application-developer" },
        { name: "Hire Backend Developer", href: "/hire-backend-application-developer" },
        { name: "Hire Dedicated Developer", href: "/hire-dedicated-developers" },
        { name: "Hire AI Developer", href: "/hire-ai-developer" },
        { name: "Hire QA Engineer", href: "/hire-qa-testers-india" },
        { name: "Hire Android Developer", href: "/hire-android-developers" },
        { name: "Hire iOS Developer", href: "/hire-ios-developers" },
        { name: "Hire DevOps Developer", href: "/hire-devops-developers" },
        { name: "Hire Salesforce Developer", href: "/hire-salesforce-developer" },
        { name: "Hire Blockchain Developer", href: "/hire-blockchain-developer" },
      ],
    },
    {
      key: "hire-skill",
      /**
       * softsuave.com's own "Hire By Skill" panel, same rule as the roles
       * above: its twenty entries, its labels ("ROR", ".Net", "MERN" — the
       * live site's spellings, not expanded ones) and its order.
       *
       * Android, iOS, Salesforce and Blockchain are deliberately absent —
       * the live menu files those as roles, and they are in the role group.
       * Next.js is absent for a different reason: it is a sheet row with no
       * page yet, and the live menu has no entry for it either.
       */
      name: "Hire By Skill",
      dense: true,
      items: [
        { name: "React", href: "/hire-reactjs-developers" },
        { name: "Angular", href: "/hire-angularjs-developers" },
        { name: "ROR", href: "/hire-ruby-on-rails-developer" },
        { name: "Node.js", href: "/hire-nodejs-developers" },
        { name: "Java", href: "/hire-java-developers" },
        { name: "Python", href: "/hire-python-developers" },
        { name: "PHP", href: "/hire-php-developers" },
        { name: ".Net", href: "/hire-dot-net-developers" },
        { name: "Flutter", href: "/hire-flutter-developers" },
        { name: "Laravel", href: "/hire-laravel-developer" },
        { name: "React Native", href: "/hire-react-native-developers" },
        { name: "NestJS", href: "/hire-nestjs-developers" },
        { name: "Django", href: "/hire-django-developer" },
        { name: "Ionic", href: "/hire-ionic-developers" },
        { name: "Kotlin", href: "/hire-kotlin-developer" },
        { name: "Magento", href: "/hire-magento-developer" },
        { name: "Swift", href: "/hire-swift-developers" },
        { name: "MERN", href: "/hire-mern-stack-developers-india" },
        { name: "Drupal", href: "/hire-drupal-developer" },
        { name: "MEAN", href: "/hire-mean-stack-developers-india" },
      ],
    },
  ],
};

const INDUSTRIES: NavMenuPanel = {
  eyebrow: "Industries",
  title: "AI-driven efficiency across industries",
  body: "We make business systems smarter and more connected, so organisations modernise faster in a digital-first market.",
  // Our own sector index, which is also the path softsuave.com publishes its
  // industries page at. The whole panel now leads there: the items to their own
  // card, this to all eight — including the two no homepage band covers.
  cta: { label: "All industries", href: "/industries" },
  groups: [
    {
      key: "sectors",
      name: "Sectors we serve",
      items: [
        // These pointed at the in-page `#industries` anchor until each sector
        // had a page of its own. Now that they do, the group links to the real
        // routes — `navHref` sends them to the live site until `homepageEnabled`
        // is on, and to ours once it is (see MARKETING_PATHS in
        // themes/softsuave/nav-data.ts). Construction is the one sector with no
        // homepage band of its own, so the panel is the only way to reach it.
        { name: "FinTech", href: "/fintech-ai-solutions", blurb: "Fraud detection and personalised banking" },
        { name: "HealthTech", href: "/ai-solutions-in-healthtech", blurb: "Patient outcomes and clinical workflows" },
        { name: "EdTech", href: "/ai-solutions-in-edutech", blurb: "Personalised learning and analytics" },
        { name: "Ecommerce", href: "/ai-solutions-for-ecommerce", blurb: "Recommendations and inventory automation" },
        { name: "Logistics", href: "/ai-in-logistics", blurb: "Forecasting and route optimisation" },
        { name: "Telecom", href: "/ai-solutions-for-telecom", blurb: "Predictive maintenance and network AI" },
        { name: "Construction", href: "/ai-solutions-for-construction", blurb: "Site safety and delay forecasting" },
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
        /* Not "/how-to-hire": that path 301s on the live site to
           /hire-software-developers, which we already serve. Pointing the menu
           at the redirect target rather than building a duplicate page keeps
           one canonical URL for the engagement models. */
        {
          name: "How to Hire",
          href: "/hire-software-developers",
          blurb: "The engagement models, step by step",
        },
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
