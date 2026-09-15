/**
 * Registry of the marketing surface's landing pages.
 *
 * Every page built from `components/landing/*` registers its route here. One
 * list, so the things that must know about all of them — the sitemap today, and
 * any future index or breadcrumb trail — stay correct when a page is added
 * without anyone remembering to update them.
 *
 * `path` is the app-internal route, i.e. what a `<Link href>` would use. It gets
 * the mount subpath applied where it is consumed (`absoluteUrl` for the
 * sitemap), so nothing here carries `/blog` — see `lib/flags.ts`.
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
  { path: '/custome-ai-developement', title: 'Custom AI Development Services' },
  { path: '/generative-ai-development-company', title: 'Generative AI Development Company' },
  { path: '/agentic-ai-development-services', title: 'Agentic AI Development Services' },

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
  // moment these paths are added to MARKETING_PATHS in themes/softsuave/nav-data.
  ...HIRE_LANDING_PAGES,

  // Company pages. Slugs match the live marketing site's existing URLs, so
  // search equity and inbound links resolve to our routes rather than 404.
  { path: '/about', title: 'About Us' },
  { path: '/contact', title: 'Contact Us' },
  { path: '/awards-recognition', title: 'Awards and Recognition' },
];
