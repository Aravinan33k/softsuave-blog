/**
 * Registry of the marketing surface's landing pages — the single place a new
 * `app/(marketing)/<slug>/page.tsx` is announced.
 *
 * `MARKETING_ROUTES` below is derived from it and consumed by everything that
 * must know about all of them:
 *   - `next.config.ts`               — the release gate (307 → /blog while
 *                                      NEXT_PUBLIC_HOMEPAGE_ENABLED is off)
 *   - `src/lib/seo/entries.ts`       — the sitemap
 *   - `src/themes/softsuave/nav-data.ts` — local vs. live-site nav links
 *
 * Miss a page here and it goes live ahead of the homepage, never appears in
 * search, and the nav sends its links out to the external site.
 *
 * Deliberately dependency-free (like `lib/flags.ts`) so `next.config.ts`, server
 * code and client components can all import it.
 *
 * `path` is the app-internal route, i.e. what a `<Link href>` would use. It gets
 * the mount subpath applied where it is consumed (`absoluteUrl` for the
 * sitemap), so nothing here carries a prefix — see `lib/flags.ts`.
 *
 * Adding a page: create its content module and its
 * `app/(marketing)/<slug>/page.tsx`, then add one line below.
 */

export interface LandingPage {
  /** App-internal route, leading slash, no mount subpath. */
  readonly path: string;
  /** Page title, for any future index listing. */
  readonly title: string;
}

import { HIRE_SKILLS } from './hire-skills';
import { HIRE_ROLE_ROUTES } from './hire-roles/slugs';

/**
 * The 24 hire-by-skill pages, derived from their own registry rather than
 * listed again here. They are generated from one template
 * (`components/landing/hire-page.tsx`), so a hand-maintained copy of the list
 * would be a second place to forget when a skill is added.
 */
const HIRE_LANDING_PAGES: readonly LandingPage[] = HIRE_SKILLS.map((s) => ({
  path: `/${s.slug}`,
  title: s.metaTitle,
}));

export const LANDING_PAGES: readonly LandingPage[] = [
  // Listed here because the sitemap now derives from this registry: it was in
  // the old hand-written sitemap list and has a route in app/(marketing), so
  // leaving it out would quietly drop an already-indexed page.
  { path: '/ai-development-service', title: 'AI Development Services' },
  // `/custome-ai-developement` (two typos) was this page's path until the route
  // folder was renamed; next.config.ts 301s the misspelling and the intermediate
  // `/custom-ai-development` here. Registering the old spelling instead would
  // gate and sitemap a folder that no longer exists.
  { path: '/custom-ai-development-services', title: 'Custom AI Development Services' },
  { path: '/generative-ai-development-company', title: 'Generative AI Development Company' },
  { path: '/agentic-ai-development-services', title: 'Agentic AI Development Services' },

  // Custom-AI sub-pages.
  { path: '/rag-development-services', title: 'RAG & Document AI' },
  { path: '/computer-vision-development-services', title: 'Computer Vision Development Services' },
  { path: '/predictive-intelligence-services', title: 'Predictive Intelligence Services' },
  { path: '/data-engineering-services', title: 'Data Engineering Services' },
  { path: '/data-science-services', title: 'Data Science Services' },

  // Mobile & web engineering-service pages.
  { path: '/mobile-application-development-company', title: 'Mobile App Development Company' },
  { path: '/android-application-development-company', title: 'Android App Development Company' },
  { path: '/ios-application-development-company', title: 'iOS App Development Company' },
  { path: '/react-native-app-development-company', title: 'React Native Development Company India' },
  { path: '/flutter-application-development-company', title: 'Flutter App Development Company in India' },
  { path: '/ionic-app-development-company', title: 'Best Ionic App Development Company in India' },
  { path: '/xamarin-app-development-company', title: 'Xamarin Development Company In India' },
  { path: '/software-development-company', title: 'Software Development Company in India' },
  { path: '/dot-net-application-development-company', title: '.NET Development Company in India' },
  { path: '/web-application-development-company', title: 'Web Application Development Company In India' },
  { path: '/angularjs-development-company', title: 'Angular Development Company in India' },
  { path: '/nextjs-development-company', title: 'Next.js Development Company for Modern Web Apps' },
  { path: '/ruby-on-rails-development-company', title: 'Ruby on Rails Development Company India' },
  { path: '/typescript-development-company', title: 'TypeScript Development Company for Web Apps' },
  { path: '/graphql-development-company', title: 'GraphQL Development Company for Modern APIs' },
  { path: '/reactjs-app-development-company', title: 'ReactJS Development Company in India' },
  { path: '/nodejs-development-company', title: 'NodeJS Development Company in India' },
  { path: '/java-application-development-company', title: 'Top Java Development Company in India' },
  // The last two technology slugs the nav pointed at but this app did not
  // serve: both were rewritten to softsuave.com by `navHref`, from the header
  // mega menu (`lib/home/nav-menu.ts`), the nav data's technology list and —
  // for Python — the web-app page's Django tile.
  { path: '/python-application-development-company', title: 'Python Development Company in India' },
  { path: '/php-application-development-company', title: 'PHP Development Company in India' },

  // Delivery-model and engineering-service pages. Slugs match the pages these
  // replace on the live marketing site, so existing search equity and inbound
  // links resolve rather than 404.
  { path: '/global-capability-center', title: 'Global Capability Center Services' },
  { path: '/offshore-software-development-company', title: 'Offshore Software Development Company' },
  { path: '/it-staff-augmentation-services', title: 'IT Staff Augmentation Services' },
  { path: '/it-outsourcing-company-india', title: 'IT Outsourcing Company in India' },
  { path: '/legacy-modernization-services', title: 'Legacy Application Modernization Services' },
  { path: '/product-engineering-services', title: 'Product Engineering Services' },
  { path: '/cloud-computing', title: 'Cloud Computing Services' },

  // Industry AI pages. Slugs match the live marketing site's existing URLs, so
  // search equity and inbound links resolve to our routes rather than 404 once
  // `homepageEnabled` is on.
  { path: '/fintech-ai-solutions', title: 'Fintech AI Development Services' },
  { path: '/ai-solutions-in-healthtech', title: 'AI Solutions in HealthTech' },
  { path: '/ai-solutions-in-edutech', title: 'AI Solutions in EdTech' },
  { path: '/ai-solutions-for-ecommerce', title: 'AI Solutions for eCommerce' },
  { path: '/ai-in-logistics', title: 'AI in Logistics & Supply Chain' },
  { path: '/ai-solutions-for-telecom', title: 'AI Solutions for Telecom' },
  { path: '/ai-solutions-for-construction', title: 'AI Solutions for Construction' },

  // Hire-by-skill pages. Slugs match the live site's existing URLs, so the
  // nav's `hire-skill` group (see `nav-menu.ts`) starts resolving locally the
  // moment these paths are covered by MARKETING_ROUTES below.
  ...HIRE_LANDING_PAGES,

  // Company pages. Slugs match the live marketing site's existing URLs, so
  // search equity and inbound links resolve to our routes rather than 404.
  { path: '/about', title: 'About Us' },
  { path: '/contact', title: 'Contact Us' },
  { path: '/awards-recognition', title: 'Awards and Recognition' },
  { path: '/clients', title: 'Our Clients' },
  { path: '/faqs', title: 'Frequently Asked Questions' },
  { path: '/case-studies', title: 'Case Studies' },
  { path: '/success-stories', title: 'Success Stories' },
  // The three Company-menu routes that had no page until now. Every hero
  // enquiry form on the surface links to /career-overview (see
  // `delivery-shared.ts`'s `sharedHeroAlert`), so leaving it unregistered sent
  // seventeen "to apply for jobs, click here" links out to the live site.
  { path: '/career-overview', title: 'Careers' },
  { path: '/life-at-softsuave', title: 'Life at Soft Suave' },
  { path: '/free-cost-estimation', title: 'Free Cost Estimation' },

  // The sector index. The seven sector pages themselves are listed above with
  // the industry AI group.
  { path: '/industries', title: 'Industries We Serve' },

  // The fourteen hire-by-role pages, from their own slug list — adding a role
  // should put it in the sitemap without anyone remembering this file. Imported
  // from `hire-roles/slugs` rather than `hire-roles/index` on purpose: this
  // module is read by the nav-adjacent code, and the index pulls in all nine
  // content modules (and the section prop types they are written against).
  ...HIRE_ROLE_ROUTES,
];

/**
 * Every route in app/(marketing): the homepage plus each landing page. These
 * ship together behind the homepage release flag.
 */
export const MARKETING_ROUTES: readonly string[] = ['/', ...LANDING_PAGES.map((p) => p.path)];
