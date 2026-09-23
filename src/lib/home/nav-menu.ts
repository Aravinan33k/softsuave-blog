/**
 * Mega-menu content for the nav's four divisions.
 *
 * Kept out of `content.ts` because it is a different shape and would double that
 * file's length: `nav.links` there stays the single source of truth for the
 * division labels and their top-level hrefs, and this module is keyed by the
 * same labels. A division without an entry here simply renders as a plain link
 * (which is how a landing page passing its own `links` behaves).
 *
 * ## source
 * The items, their labels, their order and their nesting are the navigation
 * tab of the site-revamp sheet (spreadsheet 1Li7uBu5…, gid 363415531), item
 * for item. Its columns map onto this file as:
 *
 *   Main Title        the division (a key of `navPanels`)
 *   Service Category  a group — the Services rail. Industries, Company and
 *                     Resources have no categories in the sheet, so each is a
 *                     single group and the panel shows no rail.
 *   Main Page         a group item
 *   Subpage           its `items`
 *   Level 3 Page      their `items`
 *
 * Labels are the sheet's own wording, minus its "1." / "a." numbering. There
 * are no blurbs: the sheet gives names only.
 *
 * ## what is left out
 * Only pages that exist are linked. A sheet row with no page of its own is
 * dropped — MLOps and its ten tool rows under Data Science, Vue.js and
 * PostgreSQL under Web App Development, and the Level 4 rows (Java/Kotlin,
 * Jetpack Compose, Swift/Swift UI) — and joins the day its page ships.
 *
 * The one exception is Native App Development and Hybrid App Development:
 * neither has a page, but their children do, so they stay as unlinked
 * headings (no `href`) and the sheet's nesting survives.
 *
 * Nothing outside the sheet is listed either. That retired the extras the menu
 * used to carry (AI Development Services, Dedicated Development Teams,
 * Construction, the Industries case-study group, the homepage-section links in
 * Company, FAQs, Free Cost Estimation…). Their pages still exist; only the menu
 * stopped pointing at them.
 *
 * ## hrefs
 * `MenuLink` picks the right element for each (see `mega-menu.tsx`):
 *
 *   `/path` we serve     one of the marketing routes in this app.
 *   `/path` we don't     a page softsuave.com publishes (Life at Soft Suave,
 *                        Careers). `SiteLink` turns it into an absolute link to
 *                        the live site — the switch is `MARKETING_PATHS` in
 *                        themes/softsuave/nav-data, not anything here.
 *   `#anchor`            a homepage section (panel CTAs only).
 *
 * ## groups
 * `dense` groups (roles, skills) are long name-only lists. The panel lays
 * every flat list out the same way; the flag keeps their terse names out of
 * page breadcrumbs (see `breadcrumb.tsx`).
 */

export type NavMenuItem = {
  readonly name: string;
  /**
   * Omitted for a heading with no page of its own — it renders as plain text
   * over its `items`, and must have some.
   */
  readonly href?: string;
  /**
   * Children, up to two levels deep. A group holding any item with children
   * renders as columns — each item a heading with its own list — instead of
   * flat rows.
   */
  readonly items?: readonly NavMenuItem[];
  /**
   * Its children are bare technology names ("React", "ROR", "Android") — fine
   * in the menu, too thin for a page's breadcrumb, which falls back to the
   * page registry's title for them instead (see `breadcrumb.tsx`).
   */
  readonly terse?: boolean;
};

export type NavMenuGroup = {
  readonly key: string;
  readonly name: string;
  /** A long name-only list (roles, skills); its names stay out of breadcrumbs. */
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
 * The bar and its panels are the homepage's, and some of their destinations
 * are bare `#section` anchors — the homepage owns those sections. Rendered
 * anywhere else, such an href scrolls nowhere and fails silently. Prefixing it
 * with "/" turns it into what the reader meant: go to the homepage, land on
 * that section. On the homepage nothing is rewritten, so its own Lenis in-page
 * scrolling is untouched.
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
          items: [
            { name: "Generative AI", href: "/generative-ai-development-company" },
            { name: "Agentic AI", href: "/agentic-ai-development-services" },
            { name: "RAG & Document AI", href: "/rag-development-services" },
            { name: "Computer Vision", href: "/computer-vision-development-services" },
            { name: "Predictive Intelligence", href: "/predictive-intelligence-services" },
          ],
        },
        { name: "Data Engineering", href: "/data-engineering-services" },
        { name: "Data Science", href: "/data-science-services" },
      ],
    },
    {
      key: "fdes",
      name: "FDEs",
      items: [{ name: "Hire Forward Deployed Engineer", href: "/hire-forward-deployed-engineer" }],
    },
    {
      key: "software",
      name: "Software & Application Development",
      items: [
        { name: "Custom Software Development", href: "/software-development-company" },
        {
          name: "Web App Development",
          href: "/web-application-development-company",
          terse: true,
          items: [
            { name: "Next.js", href: "/nextjs-development-company" },
            { name: ".NET", href: "/dot-net-application-development-company" },
            { name: "Angular", href: "/angularjs-development-company" },
            { name: "ROR", href: "/ruby-on-rails-development-company" },
            { name: "TypeScript", href: "/typescript-development-company" },
            { name: "GraphQL", href: "/graphql-development-company" },
            { name: "React", href: "/reactjs-app-development-company" },
            { name: "Node.js", href: "/nodejs-development-company" },
            { name: "Java", href: "/java-application-development-company" },
            { name: "PHP", href: "/php-application-development-company" },
            { name: "Python", href: "/python-application-development-company" },
          ],
        },
        {
          name: "Mobile App Development",
          href: "/mobile-application-development-company",
          terse: true,
          items: [
            {
              name: "Native App Development",
              items: [
                { name: "Android", href: "/android-application-development-company" },
                { name: "iOS", href: "/ios-application-development-company" },
              ],
            },
            {
              name: "Hybrid App Development",
              items: [
                { name: "React Native", href: "/react-native-app-development-company" },
                { name: "Flutter", href: "/flutter-application-development-company" },
                { name: "Ionic", href: "/ionic-app-development-company" },
                { name: "Xamarin", href: "/xamarin-app-development-company" },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "global-delivery",
      name: "Global Delivery & Engineering Services",
      items: [
        { name: "Global Capability Center", href: "/global-capability-center" },
        { name: "Offshore Development", href: "/offshore-software-development-company" },
        { name: "IT Staff Augmentation", href: "/it-staff-augmentation-services" },
        { name: "IT Outsourcing", href: "/it-outsourcing-company-india" },
        { name: "Legacy Modernization", href: "/legacy-modernization-services" },
        { name: "Product Engineering", href: "/product-engineering-services" },
        { name: "Cloud Computing", href: "/cloud-computing" },
      ],
    },
    {
      key: "hire-role",
      name: "Hire Developers by Role",
      dense: true,
      items: [
        { name: "Hire Software Developers", href: "/hire-software-developers" },
        { name: "Hire Web App Developers", href: "/hire-web-app-developers" },
        { name: "Hire Mobile App Developers", href: "/hire-mobile-app-developers" },
        { name: "Hire Frontend Developers", href: "/hire-frontend-application-developer" },
        { name: "Hire Backend Developers", href: "/hire-backend-application-developer" },
        { name: "Hire AI Developers", href: "/hire-ai-developer" },
        { name: "Hire QA Engineers", href: "/hire-qa-testers-india" },
        { name: "Hire DevOps Engineers", href: "/hire-devops-developers" },
        { name: "Hire Dedicated Developers", href: "/hire-dedicated-developers" },
      ],
    },
    {
      key: "hire-skill",
      name: "Hire Developers by Skill",
      dense: true,
      items: [
        { name: "Hire React Developers", href: "/hire-reactjs-developers" },
        { name: "Hire Angular Developers", href: "/hire-angularjs-developers" },
        { name: "Hire Ruby on Rails Developers", href: "/hire-ruby-on-rails-developer" },
        { name: "Hire Node.js Developers", href: "/hire-nodejs-developers" },
        { name: "Hire Java Developers", href: "/hire-java-developers" },
        { name: "Hire Python Developers", href: "/hire-python-developers" },
        { name: "Hire PHP Developers", href: "/hire-php-developers" },
        { name: "Hire .NET Developers", href: "/hire-dot-net-developers" },
        { name: "Hire Flutter Developers", href: "/hire-flutter-developers" },
        { name: "Hire Laravel Developers", href: "/hire-laravel-developer" },
        { name: "Hire React Native Developers", href: "/hire-react-native-developers" },
        { name: "Hire NestJS Developers", href: "/hire-nestjs-developers" },
        { name: "Hire Django Developers", href: "/hire-django-developer" },
        { name: "Hire Ionic Developers", href: "/hire-ionic-developers" },
        { name: "Hire Kotlin Developers", href: "/hire-kotlin-developer" },
        { name: "Hire Magento Developers", href: "/hire-magento-developer" },
        { name: "Hire Swift Developers", href: "/hire-swift-developers" },
        { name: "Hire MERN Stack Developers", href: "/hire-mern-stack-developers-india" },
        { name: "Hire Drupal Developers", href: "/hire-drupal-developer" },
        { name: "Hire MEAN Stack Developers", href: "/hire-mean-stack-developers-india" },
        { name: "Hire Android Developers", href: "/hire-android-developers" },
        { name: "Hire iOS Developers", href: "/hire-ios-developers" },
        { name: "Hire Salesforce Developers", href: "/hire-salesforce-developer" },
        { name: "Hire Blockchain Developers", href: "/hire-blockchain-developer" },
      ],
    },
  ],
};

const INDUSTRIES: NavMenuPanel = {
  eyebrow: "Industries",
  title: "AI-driven efficiency across industries",
  body: "We make business systems smarter and more connected, so organisations modernise faster in a digital-first market.",
  cta: { label: "All industries", href: "/industries" },
  groups: [
    {
      key: "industries",
      name: "Industries",
      items: [
        { name: "FinTech", href: "/fintech-ai-solutions" },
        { name: "HealthTech", href: "/ai-solutions-in-healthtech" },
        { name: "EdTech", href: "/ai-solutions-in-edutech" },
        { name: "eCommerce", href: "/ai-solutions-for-ecommerce" },
        { name: "Logistics", href: "/ai-in-logistics" },
        { name: "Telecom", href: "/ai-solutions-for-telecom" },
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
      key: "company",
      name: "Company",
      items: [
        { name: "About Us", href: "/about" },
        { name: "Awards & Recognition", href: "/awards-recognition" },
        { name: "Our Clients", href: "/clients" },
        { name: "Success Stories", href: "/success-stories" },
        { name: "Contact Us", href: "/contact" },
        { name: "Life at Soft Suave", href: "/life-at-softsuave" },
        { name: "Careers", href: "/career-overview" },
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
      key: "resources",
      name: "Resources",
      items: [
        { name: "Blog", href: "/blog" },
        { name: "Case Studies", href: "/case-studies" },
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
