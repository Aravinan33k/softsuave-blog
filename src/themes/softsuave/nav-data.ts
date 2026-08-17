// Full Soft Suave navigation, mirroring the live mega-menu. Relative hrefs point
// at the main marketing site; the Blog link is local.
import { homepageEnabled } from '@/lib/flags';

export const SITE = 'https://www.softsuave.com';

export interface NavLink {
  label: string;
  href: string;
  desc?: string;
}
export interface NavGroup {
  title: string;
  href?: string;
  links: NavLink[];
}
export type NavItem =
  | { label: string; href: string; kind: 'link' }
  | { label: string; href: string; kind: 'grid'; items: NavLink[] }
  | { label: string; href: string; kind: 'groups'; groups: NavGroup[] };

const INDUSTRIES: NavLink[] = [
  { label: 'Aviation', href: '/ai-in-aviation', desc: 'Enhancing Aviation with Tech' },
  { label: 'EduTech', href: '/ai-solutions-in-edutech', desc: 'Transforming Education' },
  { label: 'FinTech', href: '/fintech-ai-solutions', desc: 'Shaping Financial Futures' },
  { label: 'Construction', href: '/ai-solutions-for-construction', desc: "Building Tomorrow's World" },
  { label: 'HealthTech', href: '/ai-solutions-in-healthtech', desc: 'Optimizing Health Solutions' },
  { label: 'eCommerce', href: '/ai-solutions-for-ecommerce', desc: 'Boosting Online Sales' },
  { label: 'Logistics', href: '/ai-in-logistics', desc: 'Streamlining Supply Chains' },
  { label: 'Telecom', href: '/ai-solutions-for-telecom', desc: 'Connecting Global Networks' },
];

const SERVICE_GROUPS: NavGroup[] = [
  {
    title: 'By Team Expertise',
    links: [
      { label: 'Global Capability Center', href: '/global-capability-center' },
      { label: 'AI Solutions', href: '/ai-development-service' },
      { label: 'Offshore Development', href: '/offshore-software-development-company' },
      { label: 'IT Staff Augmentation', href: '/it-staff-augmentation-services' },
      { label: 'IT Outsourcing', href: '/it-outsourcing-services' },
      { label: 'Legacy Modernization', href: '/legacy-modernization-services' },
      { label: 'Product Engineering', href: '/product-engineering-services' },
      { label: 'Cloud Computing', href: '/cloud-computing' },
    ],
  },
  {
    title: 'Mobile App Development',
    href: '/mobile-application-development-company',
    links: [
      { label: 'Android', href: '/android-application-development-company' },
      { label: 'iOS', href: '/ios-application-development-company' },
      { label: 'React Native', href: '/react-native-app-development-company' },
      { label: 'Flutter', href: '/flutter-application-development-company' },
      { label: 'Ionic', href: '/ionic-app-development-company' },
      { label: 'Xamarin', href: '/xamarin-app-development-company' },
    ],
  },
  {
    title: 'Web App Development',
    href: '/web-application-development-company',
    links: [
      { label: 'React', href: '/reactjs-app-development-company' },
      { label: 'Angular', href: '/angularjs-development-company' },
      { label: 'ROR', href: '/ruby-on-rails-development-company' },
      { label: 'Node.js', href: '/nodejs-development-company' },
      { label: 'Java', href: '/java-application-development-company' },
      { label: 'Python', href: '/python-application-development-company' },
      { label: 'PHP', href: '/php-application-development-company' },
      { label: '.Net', href: '/dot-net-application-development-company' },
    ],
  },
  {
    title: 'Hire by Role',
    links: [
      { label: 'Software Developer', href: '/hire-software-developers' },
      { label: 'Web App Developer', href: '/hire-web-app-developers' },
      { label: 'Mobile App Developer', href: '/hire-mobile-app-developers' },
      { label: 'Frontend Developer', href: '/hire-frontend-application-developer' },
      { label: 'Backend Developer', href: '/hire-backend-application-developer' },
      { label: 'Dedicated Developer', href: '/hire-dedicated-developers' },
      { label: 'AI Developer', href: '/hire-ai-developer' },
      { label: 'QA Engineer', href: '/hire-qa-testers-india' },
      { label: 'Android Developer', href: '/hire-android-developers' },
      { label: 'iOS Developer', href: '/hire-ios-developers' },
      { label: 'DevOps Developer', href: '/hire-devops-developers' },
    ],
  },
  {
    title: 'Hire by Skill',
    links: [
      { label: 'React', href: '/hire-reactjs-developers' },
      { label: 'Angular', href: '/hire-angularjs-developers' },
      { label: 'ROR', href: '/hire-ruby-on-rails-developer' },
      { label: 'Node.js', href: '/hire-nodejs-developers' },
      { label: 'Java', href: '/hire-java-developers' },
      { label: 'Python', href: '/hire-python-developers' },
      { label: 'PHP', href: '/hire-php-developers' },
      { label: '.Net', href: '/hire-dot-net-developers' },
      { label: 'Flutter', href: '/hire-flutter-developers' },
      { label: 'Laravel', href: '/hire-laravel-developer' },
      { label: 'React Native', href: '/hire-react-native-developers' },
      { label: 'NestJS', href: '/hire-nestjs-developers' },
      { label: 'Django', href: '/hire-django-developer' },
      { label: 'Ionic', href: '/hire-ionic-developers' },
      { label: 'Kotlin', href: '/hire-kotlin-developer' },
      { label: 'Magento', href: '/hire-magento-developer' },
      { label: 'Swift', href: '/hire-swift-developers' },
      { label: 'MERN', href: '/hire-mern-stack-developers-india' },
      { label: 'Drupal', href: '/hire-drupal-developer' },
      { label: 'MEAN', href: '/hire-mean-stack-developers-india' },
    ],
  },
];

const COMPANY: NavLink[] = [
  { label: 'About Us', href: '/about', desc: 'Know Our Story & Vision' },
  { label: 'Awards', href: '/awards-recognition', desc: 'Recognized for Excellence' },
  { label: 'Clients', href: '/clients', desc: 'Trusted by Leading Brands' },
  { label: 'Success Stories', href: '/success-stories', desc: 'Real Client Wins, Real Impact' },
  { label: 'Contact Us', href: '/contact', desc: "Let's Start a Conversation" },
  { label: 'Life at Soft Suave', href: '/life-at-softsuave', desc: 'Discover Our Work Culture' },
  { label: 'Career', href: '/career-overview', desc: 'Join Our Growing Team' },
];

const RESOURCES: NavLink[] = [
  { label: 'Blog', href: '/blog', desc: 'Insights, Trends & Tips' },
  { label: 'Case Studies', href: '/case-studies', desc: 'Our Solutions in Action' },
];

// Curated "Related Services" / "Related Case Studies" cards shown under blog
// posts (relative hrefs resolve to the main marketing site via navHref).
export const RELATED_SERVICES: NavLink[] = [
  { label: 'Product Engineering Services', href: '/product-engineering-services', desc: 'From idea to market-ready product' },
  { label: 'AI Development Services', href: '/ai-development-service', desc: 'Custom AI solutions & integrations' },
  { label: 'Cloud Computing Services', href: '/cloud-computing', desc: 'Scalable, secure cloud architecture' },
  { label: 'Offshore Development Center', href: '/offshore-software-development-company', desc: 'Dedicated teams, faster delivery' },
];

export const RELATED_CASE_STUDIES: NavLink[] = [
  { label: 'Case Studies', href: '/case-studies', desc: 'Our solutions in action' },
  { label: 'Success Stories', href: '/success-stories', desc: 'Real client wins, real impact' },
];

export const NAV: NavItem[] = [
  { label: 'Industries', href: '/industries', kind: 'grid', items: INDUSTRIES },
  { label: 'Services', href: '/services', kind: 'groups', groups: SERVICE_GROUPS },
  { label: 'Company', href: '/about', kind: 'grid', items: COMPANY },
  { label: 'Resources', href: '/case-studies', kind: 'grid', items: RESOURCES },
  { label: 'Blog', href: '/blog', kind: 'link' },
];

/**
 * Paths this app serves itself. The blog archive always; the marketing homepage
 * only once it is released — until then `/` belongs to the live site, so "home"
 * links go straight there rather than bouncing off our redirect to /blog.
 */
const LOCAL_PATHS = new Set(homepageEnabled ? ['/', '/blog'] : ['/blog']);

/** Absolute URL: local for our own routes, otherwise the marketing site. */
export function navHref(href: string): string {
  return LOCAL_PATHS.has(href) ? href : `${SITE}${href}`;
}

/** True when `navHref` sent this path off to the marketing site. */
export function isExternalHref(href: string): boolean {
  return !LOCAL_PATHS.has(href);
}
