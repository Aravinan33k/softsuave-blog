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
  /**
   * The index page this one sits under, for its breadcrumb trail
   * ("Home › Industries › FinTech"). Only for a parent the mega menu does not
   * already express by nesting — see `breadcrumbTrail` in breadcrumb.tsx.
   * An array is the full chain, nearest last, for a page whose trail runs
   * through more than one parent ("Home › Software Development › Web App
   * Development › Python Development").
   */
  readonly parent?: string | readonly string[];
  /**
   * The page's name in breadcrumb trails, when neither the mega menu label
   * nor the tail-cut title reads right ("Python Development", not the
   * `<title>`'s "Python Development Company in India"). Wins over both.
   */
  readonly breadcrumbLabel?: string;
  /**
   * The page's name only as the LAST crumb, on its own page, when that
   * differs from how it reads as another page's parent: the web-app page
   * ends its own trail "Web App Development Service" but sits in Python's as
   * "Web App Development".
   */
  readonly breadcrumbCurrentLabel?: string;
}

import { HIRE_SKILL_ROUTES } from './hire-skill-routes';
import { HIRE_ROLE_ROUTES } from './hire-roles/slugs';

/**
 * The hire-by-skill pages, from their route list (`hire-skill-routes.ts`) —
 * not from `HIRE_SKILLS`, whose page copy would ride into every page's
 * client bundle with this module. A test keeps the two in step.
 */
const HIRE_LANDING_PAGES: readonly LandingPage[] = HIRE_SKILL_ROUTES.map(({ path, title }) => ({ path, title }));

export const LANDING_PAGES: readonly LandingPage[] = [
  // Listed here because the sitemap now derives from this registry: it was in
  // the old hand-written sitemap list and has a route in app/(marketing), so
  // leaving it out would quietly drop an already-indexed page.
  // Breadcrumb trails below follow softsuave.com's own, crumb for crumb (29 Sep
  // request): "Home › Software Development › [Mobile|Web App Development ›]
  // <the live page's last crumb, verbatim>". Pages the live site gives no
  // visible trail keep theirs.
  {
    path: '/ai-development-service',
    title: 'AI Development Services',
    breadcrumbLabel: 'AI Development Service',
    parent: '/software-development-company',
  },
  // `/custome-ai-developement` (two typos) was this page's path until the route
  // folder was renamed; next.config.ts 301s the misspelling and the intermediate
  // `/custom-ai-development` here. Registering the old spelling instead would
  // gate and sitemap a folder that no longer exists.
  { path: '/custom-ai-development-services', title: 'Custom AI Development Services' },
  { path: '/generative-ai-development-company', title: 'Generative AI Development Company' },
  { path: '/agentic-ai-development-services', title: 'Agentic AI Development Services' },
  { path: '/free-7-days-trial', title: '40-Hour Free Trial' },
  { path: '/30-min-free-consultation', title: 'Free Consultation' },
  { path: '/free-quote', title: 'Free Quote' },

  // Custom-AI sub-pages.
  { path: '/rag-development-services', title: 'RAG & Document AI' },
  { path: '/computer-vision-development-services', title: 'Computer Vision Development Services' },
  { path: '/predictive-intelligence-services', title: 'Predictive Intelligence Services' },
  { path: '/data-engineering-services', title: 'Data Engineering Services' },
  { path: '/data-science-services', title: 'Data Science Services' },

  // Mobile & web engineering-service pages.
  {
    path: '/mobile-application-development-company',
    title: 'Mobile App Development Company',
    breadcrumbCurrentLabel: 'Mobile App Development Service',
    parent: '/software-development-company',
  },
  {
    path: '/android-application-development-company',
    title: 'Android App Development Company',
    breadcrumbLabel: 'Android Development Service',
    parent: ['/software-development-company', '/mobile-application-development-company'],
  },
  {
    path: '/ios-application-development-company',
    title: 'iOS App Development Company',
    breadcrumbLabel: 'iOS Development Services',
    parent: ['/software-development-company', '/mobile-application-development-company'],
  },
  {
    path: '/react-native-app-development-company',
    title: 'React Native Development Company India',
    breadcrumbLabel: 'React Native Development',
    parent: ['/software-development-company', '/mobile-application-development-company'],
  },
  {
    path: '/flutter-application-development-company',
    title: 'Flutter App Development Company in India',
    breadcrumbLabel: 'Flutter Development',
    parent: ['/software-development-company', '/mobile-application-development-company'],
  },
  {
    path: '/ionic-app-development-company',
    title: 'Best Ionic App Development Company in India',
    breadcrumbLabel: 'Ionic Development',
    parent: ['/software-development-company', '/mobile-application-development-company'],
  },
  {
    path: '/xamarin-app-development-company',
    title: 'Xamarin Development Company In India',
    breadcrumbLabel: 'Xamarin Development',
    parent: ['/software-development-company', '/mobile-application-development-company'],
  },
  { path: '/software-development-company', title: 'Software Development Company in India', breadcrumbLabel: 'Software Development' },
  {
    path: '/dot-net-application-development-company',
    title: '.NET Development Company in India',
    breadcrumbLabel: '.NET Development',
    parent: ['/software-development-company', '/web-application-development-company'],
  },
  {
    path: '/web-application-development-company',
    title: 'Web Application Development Company In India',
    breadcrumbCurrentLabel: 'Web App Development Service',
    parent: '/software-development-company',
  },
  {
    path: '/angularjs-development-company',
    title: 'Angular Development Company in India',
    breadcrumbLabel: 'Angular Development Services',
    parent: ['/software-development-company', '/web-application-development-company'],
  },
  {
    path: '/ruby-on-rails-development-company',
    title: 'Ruby on Rails Development Company India',
    breadcrumbLabel: 'ROR Development',
    parent: ['/software-development-company', '/web-application-development-company'],
  },
  {
    path: '/reactjs-app-development-company',
    title: 'ReactJS Development Company in India',
    breadcrumbLabel: 'ReactJS Development',
    parent: ['/software-development-company', '/web-application-development-company'],
  },
  {
    path: '/nodejs-development-company',
    title: 'NodeJS Development Company in India',
    breadcrumbLabel: 'NodeJS Development',
    parent: ['/software-development-company', '/web-application-development-company'],
  },
  {
    path: '/java-application-development-company',
    title: 'Top Java Development Company in India',
    breadcrumbLabel: 'Java Development Services',
    parent: ['/software-development-company', '/web-application-development-company'],
  },
  // Web-app technology pages softsuave.com gives no visible trail. They take
  // their live siblings' shape ("… › Web App Development › ReactJS
  // Development") rather than a lone "Web App Development ›" over a long title.
  {
    path: '/nextjs-development-company',
    title: 'Next.js Development Company for Modern Web Apps',
    breadcrumbLabel: 'Next.js Development',
    parent: ['/software-development-company', '/web-application-development-company'],
  },
  {
    path: '/typescript-development-company',
    title: 'TypeScript Development Company for Web Apps',
    breadcrumbLabel: 'TypeScript Development',
    parent: ['/software-development-company', '/web-application-development-company'],
  },
  {
    path: '/graphql-development-company',
    title: 'GraphQL Development Company for Modern APIs',
    breadcrumbLabel: 'GraphQL Development',
    parent: ['/software-development-company', '/web-application-development-company'],
  },
  {
    path: '/vuejs-development-company',
    title: 'Vue.js Development Company for Web Apps',
    breadcrumbLabel: 'Vue.js Development',
    parent: ['/software-development-company', '/web-application-development-company'],
  },
  {
    path: '/postgresql-development-company',
    title: 'PostgreSQL Development Company for Reliable Databases',
    breadcrumbLabel: 'PostgreSQL Development',
    parent: ['/software-development-company', '/web-application-development-company'],
  },
  // The last two technology slugs the nav pointed at but this app did not
  // serve: both were rewritten to softsuave.com by `navHref`, from the header
  // mega menu (`lib/home/nav-menu.ts`), the nav data's technology list and —
  // for Python — the web-app page's Django tile.
  {
    path: '/python-application-development-company',
    title: 'Python Development Company in India',
    breadcrumbLabel: 'Python Development',
    parent: ['/software-development-company', '/web-application-development-company'],
  },
  {
    path: '/php-application-development-company',
    title: 'PHP Development Company in India',
    breadcrumbLabel: 'PHP Development',
    parent: ['/software-development-company', '/web-application-development-company'],
  },

  // Delivery-model and engineering-service pages. Slugs match the pages these
  // replace on the live marketing site, so existing search equity and inbound
  // links resolve rather than 404.
  //
  // Trails read "Home › Software Development › <the service's full name>" —
  // the shape the live IT Outsourcing page's own BreadcrumbList uses — rather
  // than "Home › <the mega menu's short label>" (review: "Breadcrumbs are
  // wrong"). The GCC page's review raised no breadcrumb issue, so it keeps its
  // own.
  { path: '/global-capability-center', title: 'Global Capability Center Services' },
  {
    path: '/offshore-software-development-company',
    title: 'Offshore Software Development Company',
    breadcrumbLabel: 'Offshore Software Development Service',
    parent: '/software-development-company',
  },
  {
    path: '/it-staff-augmentation-services',
    title: 'IT Staff Augmentation Services',
    // softsuave.com's own trail label (review: "update the breadcrumb exactly
    // like in the original page")
    breadcrumbLabel: 'Staff Augmentation Service',
    parent: '/software-development-company',
  },
  {
    path: '/it-outsourcing-company-india',
    title: 'IT Outsourcing Company in India',
    // softsuave.com's own casing
    breadcrumbLabel: 'IT Outsourcing Services',
    parent: '/software-development-company',
  },
  {
    path: '/legacy-modernization-services',
    title: 'Legacy Application Modernization Services',
    breadcrumbLabel: 'Legacy Modernization Services',
    parent: '/software-development-company',
  },
  {
    path: '/product-engineering-services',
    title: 'Product Engineering Services',
    breadcrumbLabel: 'Product Engineering Services',
    parent: '/software-development-company',
  },
  {
    path: '/cloud-computing',
    title: 'Cloud Computing Services',
    breadcrumbLabel: 'Cloud Computing Services',
    parent: '/software-development-company',
  },

  // Industry AI pages. Slugs match the live marketing site's existing URLs, so
  // search equity and inbound links resolve to our routes rather than 404 once
  // `homepageEnabled` is on.
  { path: '/fintech-ai-solutions', title: 'Fintech AI Development Services', parent: '/industries' },
  { path: '/ai-solutions-in-healthtech', title: 'AI Solutions in HealthTech', parent: '/industries' },
  { path: '/ai-solutions-in-edutech', title: 'AI Solutions in EdTech', parent: '/industries' },
  { path: '/ai-solutions-for-ecommerce', title: 'AI Solutions for eCommerce', parent: '/industries' },
  { path: '/ai-in-logistics', title: 'AI in Logistics & Supply Chain', parent: '/industries' },
  { path: '/ai-solutions-for-telecom', title: 'AI Solutions for Telecom', parent: '/industries' },
  { path: '/ai-solutions-for-construction', title: 'AI Solutions for Construction', parent: '/industries' },

  // Hire-by-skill pages. Slugs match the live site's existing URLs, so the
  // nav's `hire-skill` group (see `nav-menu.ts`) starts resolving locally the
  // moment these paths are covered by MARKETING_ROUTES below.
  ...HIRE_LANDING_PAGES,
  // Not in HIRE_SKILLS: its brief composes sections neither hire template
  // renders, so the route is hand-built and registered here directly — with
  // the parent and short name the hire-skill pages get automatically, so its
  // trail reads "Home › Hire Dedicated Developer › Hire Xamarin Developers".
  {
    path: '/hire-xamarin-developer',
    title: 'Hire Xamarin Developer for High-Performance Apps',
    parent: '/hire-dedicated-developers',
    breadcrumbLabel: 'Hire Xamarin Developers',
  },

  // Company pages. Slugs match the live marketing site's existing URLs, so
  // search equity and inbound links resolve to our routes rather than 404.
  { path: '/about', title: 'About Us' },
  { path: '/contact', title: 'Contact Us' },
  { path: '/awards-recognition', title: 'Awards and Recognition' },
  { path: '/clients', title: 'Our Clients' },
  { path: '/faqs', title: 'Frequently Asked Questions' },
  { path: '/case-studies', title: 'Case Studies' },
  // Case-study pages, under the index in their breadcrumb. Registering one
  // here also turns every existing link to it (the index cards, the homepage
  // and landing-page case-study lanes) from softsuave.com into this route.
  {
    path: '/case-study-vehicle-intelligence',
    title: 'Vehicle Intelligence',
    parent: '/case-studies',
    breadcrumbLabel: 'Vehicle Intelligence',
  },
  {
    path: '/case-study-neurora-behavioral-intelligence',
    title: 'Neurora Behavioral Intelligence',
    parent: '/case-studies',
    breadcrumbLabel: 'Neurora Behavioral Intelligence',
  },
  {
    path: '/case-study-tender-intelligence',
    title: 'Tender Intelligence',
    parent: '/case-studies',
    breadcrumbLabel: 'Tender Intelligence',
  },
  {
    path: '/case-study-shiftsense-ai-shift-intelligence',
    title: 'ShiftSense AI Shift Intelligence',
    parent: '/case-studies',
    breadcrumbLabel: 'ShiftSense AI Shift Intelligence',
  },
  {
    path: '/case-study-ai-assist-logistics-onboarding',
    title: 'AI Assist Logistics Onboarding',
    parent: '/case-studies',
    breadcrumbLabel: 'AI Assist Logistics Onboarding',
  },
  {
    path: '/case-study-safeops-ai-incident-management',
    title: 'SafeOps AI Incident Management',
    parent: '/case-studies',
    breadcrumbLabel: 'SafeOps AI Incident Management',
  },
  {
    path: '/case-study-wellpet-ai-smart-wellness-platform',
    title: 'WellPet AI Smart Wellness Platform',
    parent: '/case-studies',
    breadcrumbLabel: 'WellPet AI Smart Wellness Platform',
  },
  {
    path: '/case-study-postguard-compliance-ai',
    title: 'PostGuard Compliance AI',
    parent: '/case-studies',
    breadcrumbLabel: 'PostGuard Compliance AI',
  },
  {
    path: '/case-study-marketmind-ai-market-intelligence',
    title: 'MarketMind AI Market Intelligence',
    parent: '/case-studies',
    breadcrumbLabel: 'MarketMind AI Market Intelligence',
  },
  {
    path: '/case-study-brand-forge',
    title: 'BrandForge',
    parent: '/case-studies',
    breadcrumbLabel: 'BrandForge',
  },
  {
    path: '/case-study-hire-voice',
    title: 'HireVoice',
    parent: '/case-studies',
    breadcrumbLabel: 'HireVoice',
  },
  {
    path: '/case-study-personalized-ecommerce-platform',
    title: 'Personalized eCommerce Platform',
    parent: '/case-studies',
    breadcrumbLabel: 'Personalized eCommerce Platform',
  },
  {
    path: '/case-study-online-consultation-platform-for-doctors',
    title: 'Online Consultation Platform for Doctors',
    parent: '/case-studies',
    breadcrumbLabel: 'Online Consultation Platform for Doctors',
  },
  {
    path: '/case-study-telehealth-consultation-platform-for-doctors',
    title: 'Telehealth Consultation Platform for Doctors',
    parent: '/case-studies',
    breadcrumbLabel: 'Telehealth Consultation Platform for Doctors',
  },
  {
    path: '/case-study-subscription-management-for-customer-growth',
    title: 'Subscription Management for Customer Growth',
    parent: '/case-studies',
    breadcrumbLabel: 'Subscription Management for Customer Growth',
  },
  {
    path: '/case-study-comprehensive-ecommerce-for-retail',
    title: 'Comprehensive eCommerce for Retail',
    parent: '/case-studies',
    breadcrumbLabel: 'Comprehensive eCommerce for Retail',
  },
  {
    path: '/case-study-intuitive-online-shopping-platform',
    title: 'Intuitive Online Shopping Platform',
    parent: '/case-studies',
    breadcrumbLabel: 'Intuitive Online Shopping Platform',
  },
  {
    path: '/case-study-ai-optimization-in-healthcare',
    title: 'AI Optimization in Healthcare',
    parent: '/case-studies',
    breadcrumbLabel: 'AI Optimization in Healthcare',
  },
  {
    path: '/case-study-ai-driven-equipment-&-workforce-optimization',
    title: 'AI-Driven Equipment & Workforce Optimization',
    parent: '/case-studies',
    breadcrumbLabel: 'AI-Driven Equipment & Workforce Optimization',
  },
  {
    path: '/case-study-streamlining-publication-workflows-with-integrated-tracking',
    title: 'Streamlining Publication Workflows with Integrated Tracking',
    parent: '/case-studies',
    breadcrumbLabel: 'Streamlining Publication Workflows',
  },
  {
    path: '/case-study-smart-warranty-and-document-management-app',
    title: 'Smart Warranty and Document Management App',
    parent: '/case-studies',
    breadcrumbLabel: 'Smart Warranty and Document Management App',
  },
  {
    path: '/case-study-restaurant-workflow-optimization',
    title: 'Restaurant Workflow Optimization',
    parent: '/case-studies',
    breadcrumbLabel: 'Restaurant Workflow Optimization',
  },
  {
    path: '/case-study-project-&-compliance-workflow-transformation',
    title: 'Project & Compliance Workflow Transformation',
    parent: '/case-studies',
    breadcrumbLabel: 'Project & Compliance Workflow Transformation',
  },
  {
    path: '/case-study-digital-advertising-in-public-spaces',
    title: 'Digital Advertising in Public Spaces',
    parent: '/case-studies',
    breadcrumbLabel: 'Digital Advertising in Public Spaces',
  },
  {
    path: '/case-study-area-mapping-solution',
    title: 'Area Mapping Solution For A Solar Business',
    parent: '/case-studies',
    breadcrumbLabel: 'Area Mapping Solution For A Solar Business',
  },
  {
    path: '/case-study-ticket-management-system',
    title: 'Advanced Ticket Management App for Risk-Free Transactions',
    parent: '/case-studies',
    breadcrumbLabel: 'Advanced Ticket Management App',
  },
  {
    path: '/case-study-legal-violation-tracking-application',
    title: 'Legal Violation Tracking Application',
    parent: '/case-studies',
    breadcrumbLabel: 'Legal Violation Tracking Application',
  },
  {
    path: '/case-study-job-progress-tracking',
    title: 'Effective Tool to track the Jobs or Projects for the Customers',
    parent: '/case-studies',
    breadcrumbLabel: 'Job Progress Tracking',
  },
  {
    path: '/case-study-crm-application-for-real-estate',
    title: 'Real Estate CRM Platform for better Process Tracking',
    parent: '/case-studies',
    breadcrumbLabel: 'Real Estate CRM Platform',
  },
  {
    path: '/case-study-parksafe-community-vehicle-alert-app',
    title: 'ParkSafe Community Vehicle Alert App',
    parent: '/case-studies',
    breadcrumbLabel: 'ParkSafe Community Vehicle Alert App',
  },
  {
    path: '/case-study-centralized-shipment-tracking',
    title: 'Centralized Shipment Tracking',
    parent: '/case-studies',
    breadcrumbLabel: 'Centralized Shipment Tracking',
  },
  {
    path: '/case-study-scalable-delivery-mangement-for-logistics',
    title: 'Scalable Delivery Management for Logistics',
    parent: '/case-studies',
    breadcrumbLabel: 'Scalable Delivery Management for Logistics',
  },
  {
    path: '/case-study-web-scraping-solution',
    title: 'Web Scraping Solution For Logistics Business',
    parent: '/case-studies',
    breadcrumbLabel: 'Web Scraping Solution For Logistics Business',
  },
  {
    path: '/case-study-logistics-ride-hailing-application',
    title: 'Logistics Ride Hailing Application',
    parent: '/case-studies',
    breadcrumbLabel: 'Logistics Ride Hailing Application',
  },
  {
    path: '/case-study-high-performance-lms-for-education',
    title: 'High-Performance LMS for Education',
    parent: '/case-studies',
    breadcrumbLabel: 'High-Performance LMS for Education',
  },
  {
    path: '/case-study-ai-powered-education-solutions',
    title: 'AI-Powered Education Solutions',
    parent: '/case-studies',
    breadcrumbLabel: 'AI-Powered Education Solutions',
  },
  {
    path: '/case-study-cloud-based-campus-management',
    title: 'Cloud-Based Campus Management',
    parent: '/case-studies',
    breadcrumbLabel: 'Cloud-Based Campus Management',
  },
  {
    path: '/case-study-saas-platform-for-corporate-banking',
    title: 'SaaS Platform for Corporate Banking',
    parent: '/case-studies',
    breadcrumbLabel: 'SaaS Platform for Corporate Banking',
  },
  {
    path: '/case-study-healthpass-wellness-subscriptions-in-banking',
    title: 'HealthPass Wellness Subscriptions in Banking',
    parent: '/case-studies',
    breadcrumbLabel: 'HealthPass Wellness Subscriptions in Banking',
  },
  {
    path: '/case-study-savings-solution-for-better-financial-management',
    title: 'Savings Solution for Better Financial Management',
    parent: '/case-studies',
    breadcrumbLabel: 'Savings Solution for Better Financial Management',
  },
  {
    path: '/case-study-all-in-one-financial-management-app',
    title: 'All-in-One Financial Management App',
    parent: '/case-studies',
    breadcrumbLabel: 'All-in-One Financial Management App',
  },
  {
    path: '/case-study-high-performance-trading-platform',
    title: 'High-Performance Trading Platform',
    parent: '/case-studies',
    breadcrumbLabel: 'High-Performance Trading Platform',
  },
  {
    path: '/case-study-blockchain-digital-currency-platform',
    title: 'Blockchain Digital Currency Platform',
    parent: '/case-studies',
    breadcrumbLabel: 'Blockchain Digital Currency Platform',
  },
  {
    path: '/case-study-corporate-banking-solution',
    title: 'Optimizing Corporate Banking with the Rocket Account Solution',
    parent: '/case-studies',
    breadcrumbLabel: 'Rocket Account Solution',
  },
  {
    path: '/onestop-digital-banking-solution',
    title: 'Building a Highly Secured One-stop Digital Banking Solution',
    parent: '/case-studies',
    breadcrumbLabel: 'One-stop Digital Banking Solution',
  },
  {
    path: '/case-study-digitizing-product-inspections',
    title: 'Digitizing Product Inspections',
    parent: '/case-studies',
    breadcrumbLabel: 'Digitizing Product Inspections',
  },
  {
    path: '/case-study-salesforce-telephone-app-integration',
    title: 'A Cloud-based Integration Telephone App',
    parent: '/case-studies',
    breadcrumbLabel: 'Salesforce Telephone App Integration',
  },
  {
    path: '/case-study-ai-powered-business-intelligence-insights',
    title: 'AI-Powered Business Intelligence Insights',
    parent: '/case-studies',
    breadcrumbLabel: 'AI-Powered Business Intelligence Insights',
  },
  {
    path: '/case-study-ai-chatbot-for-engagement-and-secure-transactions',
    title: 'AI Chatbot for Engagement and Secure Transactions',
    parent: '/case-studies',
    breadcrumbLabel: 'AI Chatbot for Engagement and Secure Transactions',
  },
  {
    path: '/case-study-ai-powered-multi-cloud-management',
    title: 'AI-Powered Multi-Cloud Management',
    parent: '/case-studies',
    breadcrumbLabel: 'AI-Powered Multi-Cloud Management',
  },
  {
    path: '/case-study-smart-digital-signage-with-advanced-ad-scheduling',
    title: 'Smart Digital Signage with Advanced Ad Scheduling',
    parent: '/case-studies',
    breadcrumbLabel: 'Smart Digital Signage with Advanced Ad Scheduling',
  },
  {
    path: '/case-study-tech-driven-workforce-development-platform',
    title: 'Tech-Driven Workforce Development Platform',
    parent: '/case-studies',
    breadcrumbLabel: 'Tech-Driven Workforce Development Platform',
  },
  {
    path: '/case-study-optimizing-influencer-and-brand-collaborations',
    title: 'Optimizing Influencer and Brand Collaborations',
    parent: '/case-studies',
    breadcrumbLabel: 'Optimizing Influencer and Brand Collaborations',
  },
  {
    path: '/case-study-ai-driven-cybersecurity-automation',
    title: 'AI-Driven Cybersecurity Automation',
    parent: '/case-studies',
    breadcrumbLabel: 'AI-Driven Cybersecurity Automation',
  },
  {
    path: '/case-study-ai-powered-cyber-theart-detection',
    title: 'AI-Powered Cyber Threat Detection',
    parent: '/case-studies',
    breadcrumbLabel: 'AI-Powered Cyber Threat Detection',
  },
  {
    path: '/case-study-smart-movie-ticketing-with-real-time-booking',
    title: 'Smart Movie Ticketing with Real-Time Booking',
    parent: '/case-studies',
    breadcrumbLabel: 'Smart Movie Ticketing with Real-Time Booking',
  },
  {
    path: '/case-study-custom-business-management-platform',
    title: 'Custom Business Management Platform',
    parent: '/case-studies',
    breadcrumbLabel: 'Custom Business Management Platform',
  },
  { path: '/success-stories', title: 'Success Stories' },
  { path: '/privacy-policy', title: 'Privacy Policy' },
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
