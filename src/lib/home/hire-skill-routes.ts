import { CLIENTS_PLUS, HOURLY_RATE } from "../company-figures";

/**
 * The twenty "Hire Developers by Skill" routes — path, title and breadcrumb
 * label only — in the registry's order: the skill-page counterpart of
 * `hire-roles/slugs.ts`.
 *
 * `landing-pages.ts` (and through it the nav's `SiteLink`, on every page) and
 * the breadcrumb only need these routes and their labels. They used to read
 * them from `HIRE_SKILLS`, which carries every skill page's full copy, so each
 * visitor downloaded all twenty pages' text (~100 KB compressed) with every
 * page (PageSpeed, 15 Oct).
 * `hire-skills.test.ts` asserts this list never drifts from the registry.
 *
 * Relative import only: `next.config.ts` loads this file outside the app's
 * module graph, where the `@/` alias does not resolve.
 */
export interface HireSkillRoute {
  readonly path: string;
  readonly title: string;
  /** The breadcrumb's last crumb: the skill's `breadcrumbLabel ?? "Hire " + role`. */
  readonly crumb: string;
}

export const HIRE_SKILL_ROUTES: readonly HireSkillRoute[] = [
  { path: "/hire-reactjs-developers", title: "Hire ReactJS Developers India with 40 Hours Risk-free Trial", crumb: "Hire ReactJS Developers" },
  { path: "/hire-angularjs-developers", title: "Hire Angularjs Developers India – Top 1% Programmers", crumb: "Hire Angular Developers" },
  { path: "/hire-mern-stack-developers-india", title: "Hire MERN App Developers India for Custom Apps", crumb: "Hire MERN Stack Developers" },
  { path: "/hire-mean-stack-developers-india", title: "Hire MEAN Stack Developers in India | Remote MEAN Stack Devlopers India", crumb: "Hire MEAN Stack Developers" },
  { path: "/hire-nodejs-developers", title: `Hire NodeJS Developers in India - Trusted By ${CLIENTS_PLUS} Clients`, crumb: "Hire Node.js Developers" },
  { path: "/hire-nestjs-developers", title: "Hire NestJS Developers | 7-Day Risk-Free Trial", crumb: "Hire NestJS Developers" },
  { path: "/hire-java-developers", title: "Hire Java Developer India with 40 Hours Risk-free Trial", crumb: "Hire Java Developers" },
  { path: "/hire-python-developers", title: `Hire Offshore Python Developers from India from ${HOURLY_RATE}`, crumb: "Hire Python Developers" },
  { path: "/hire-django-developer", title: "Hire Django Developer India with 40 Hours Risk-freeTrial", crumb: "Hire Django Developers" },
  { path: "/hire-php-developers", title: "Hire PHP Developers in India from Soft Suave", crumb: "Hire PHP Developers" },
  { path: "/hire-laravel-developer", title: "Hire Laravel Developer India - Top 1% Programmers", crumb: "Hire Laravel Developers" },
  { path: "/hire-dot-net-developers", title: "Hire Dot Net Developers India with 40 Hours Risk-free Trial", crumb: "Hire .NET Developers" },
  { path: "/hire-ruby-on-rails-developer", title: "Hire Ruby on Rails Developers | Dedicated Devs on Demand", crumb: "Hire Ruby on Rails Developers" },
  { path: "/hire-swift-developers", title: "Hire Swift Developer in India with 40 Hours Risk-free Trial", crumb: "Hire Swift Developers" },
  { path: "/hire-kotlin-developer", title: "Hire Kotlin Developers India - Top 1% Programmers", crumb: "Hire Kotlin Developers" },
  { path: "/hire-flutter-developers", title: "Hire Dedicated Flutter Developers India – Trusted Team", crumb: "Hire Flutter Developers" },
  { path: "/hire-react-native-developers", title: `Hire React Native Developers in India | ${HOURLY_RATE}, 40-Hr Trial`, crumb: "Hire React Native Developers" },
  { path: "/hire-ionic-developers", title: "Hire Ionic App Developers India – Top 3% Talent", crumb: "Hire Ionic Developers" },
  { path: "/hire-magento-developer", title: "Hire Magento Developer in India with Soft Suave", crumb: "Hire Magento Developers" },
  { path: "/hire-drupal-developer", title: "Hire Dedicated Drupal Developer India with 40 Hours Trial", crumb: "Hire Drupal Developers" },
];
