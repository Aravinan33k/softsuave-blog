/**
 * "Explore More Web / Mobile Technologies for Your Project" — the sibling-page
 * link grid every hire-by-skill page runs near its foot.
 *
 * Shared rather than per-page because it genuinely is shared on the live site:
 * the same markup ships on all twenty pages, carrying the same roster of links
 * in the same order, and a page does not drop its own technology from the list
 * (the Python page links to the Python page). The only thing that varies is the
 * heading — a page in the mobile group says "Mobile", the rest say "Web" — and
 * which of the two tabs opens first.
 *
 * The live band is a tabbed control (Web / Mobile / Quality Assurance) whose
 * inactive panels are in the DOM from the start. This surface has no tab
 * component in its card vocabulary, so a page renders the roster its own
 * heading names. Nothing is invented: every card below is a link the live page
 * ships, with the label the live page gives it, and the cards carry no body
 * copy because the live cards carry none either.
 */

import type { CardGridContent } from "@/components/landing/industries";

const INTRO =
  "Discover related web technologies and find experts in frameworks, tools, and languages to bring your vision to life.";

/** The Web tab, in the live page's own order. */
const WEB: readonly { name: string; href: string }[] = [
  { name: "React.js", href: "/hire-reactjs-developers" },
  { name: "Angular", href: "/hire-angularjs-developers" },
  { name: "ROR", href: "/hire-ruby-on-rails-developer" },
  { name: "Node.js", href: "/hire-nodejs-developers" },
  { name: "PHP", href: "/hire-php-developers" },
  { name: "Java", href: "/hire-java-developers" },
  { name: "Python", href: "/hire-python-developers" },
  { name: ".Net", href: "/hire-dot-net-developers" },
  { name: "Laravel", href: "/hire-laravel-developer" },
  { name: "Nest.js", href: "/hire-nestjs-developers" },
  { name: "Django", href: "/hire-django-developer" },
  { name: "Magento", href: "/hire-magento-developer" },
  { name: "MERN", href: "/hire-mern-stack-developers-india" },
  { name: "MEAN", href: "/hire-mean-stack-developers-india" },
  { name: "Drupal", href: "/hire-drupal-developer" },
];

/** The Mobile tab, in the live page's own order. */
const MOBILE: readonly { name: string; href: string }[] = [
  { name: "Swift", href: "/hire-swift-developers" },
  { name: "Kotlin", href: "/hire-kotlin-developer" },
  { name: "Java", href: "/hire-java-developers" },
  { name: "Python", href: "/hire-python-developers" },
  { name: ".Net", href: "/hire-dot-net-developers" },
  { name: "React Native", href: "/hire-react-native-developers" },
  { name: "Flutter", href: "/hire-flutter-developers" },
  { name: "Ionic", href: "/hire-ionic-developers" },
  { name: "Node.js", href: "/hire-nodejs-developers" },
];

export const webExplore: CardGridContent = {
  eyebrow: "More Technologies",
  title: "Explore More Web Technologies for Your Project",
  body: INTRO,
  items: WEB,
};

export const mobileExplore: CardGridContent = {
  eyebrow: "More Technologies",
  title: "Explore More Mobile Technologies for Your Project",
  body: INTRO,
  items: MOBILE,
};
