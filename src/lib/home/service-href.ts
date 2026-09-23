/**
 * Maps a service card's name to the marketing page that covers it.
 *
 * The landing-page review found that almost no service card linked anywhere —
 * 21 of 504 — though most of them name something we publish a page for:
 * "Mobile App Development" on the software page, "React Native" on the mobile
 * page, "Hire Python Developers" on a hire page. Adding an `href` to each of
 * those by hand is several hundred edits across content modules; reading it
 * off the card's own name keeps every link in step with the route registry.
 *
 * Only a CONFIDENT match links. The rules are phrases ("staff augmentation",
 * "react native", "data engineering"), not loose topic words — a card headed
 * "Scalable Architecture" names no page of ours and gets no link, which is
 * better than a link to a page that is only vaguely about the same thing.
 *
 * Deliberately dependency-free (no `hire-skills` import): this runs in client
 * components, and the hire registry pulls every skill's copy in with it. The
 * test beside this file asserts that every target below is a real route in
 * `MARKETING_ROUTES`, so a renamed page fails there rather than here.
 *
 * Three passes, first match wins:
 *   1. technologies and roles — each has a company page, a hire page, or both,
 *      and "hire"/"developers" in the name picks the hire one;
 *   2. service lines ("generative AI", "legacy modernization", "cloud");
 *   3. broad disciplines (mobile / web / software) and industries, last, so
 *      they only catch what nothing more specific claimed — and industries
 *      only for a bare sector name (see `BUILD_WORDS`).
 *
 * The page a card is ON is never its target: `currentPath` is compared after
 * the match, and a self-match yields no link rather than falling through to a
 * weaker rule.
 */

interface TechRule {
  readonly pattern: RegExp;
  /** The "<tech> development company" page, where one exists. */
  readonly company?: string;
  /** The "hire <tech> developers" page, where one exists. */
  readonly hire?: string;
}

/** Ordered: "react native" before "react", "next.js" before "node". */
const TECH_RULES: readonly TechRule[] = [
  { pattern: /\breact ?native\b/, company: "/react-native-app-development-company", hire: "/hire-react-native-developers" },
  { pattern: /\bflutter\b/, company: "/flutter-application-development-company", hire: "/hire-flutter-developers" },
  { pattern: /\bionic\b/, company: "/ionic-app-development-company", hire: "/hire-ionic-developers" },
  { pattern: /\bxamarin\b/, company: "/xamarin-app-development-company" },
  { pattern: /\bandroid\b/, company: "/android-application-development-company", hire: "/hire-android-developers" },
  { pattern: /\bswift\b/, company: "/ios-application-development-company", hire: "/hire-swift-developers" },
  { pattern: /\b(ios|iphone|ipad|iwatch|apple watch|watchos|apple tv|tvos)\b/, company: "/ios-application-development-company", hire: "/hire-ios-developers" },
  { pattern: /\bkotlin\b/, company: "/android-application-development-company", hire: "/hire-kotlin-developer" },
  { pattern: /\bnext ?(\.|dot )?js\b/, company: "/nextjs-development-company" },
  { pattern: /\bnest ?(\.|dot )?js\b/, company: "/nodejs-development-company", hire: "/hire-nestjs-developers" },
  { pattern: /\bmern\b/, company: "/reactjs-app-development-company", hire: "/hire-mern-stack-developers-india" },
  { pattern: /\bmean stack\b/, company: "/angularjs-development-company", hire: "/hire-mean-stack-developers-india" },
  { pattern: /\bnode ?(\.|dot )?js\b|\bnode\b/, company: "/nodejs-development-company", hire: "/hire-nodejs-developers" },
  { pattern: /\breact ?(\.|dot )?js\b|\breact\b/, company: "/reactjs-app-development-company", hire: "/hire-reactjs-developers" },
  { pattern: /\bangular ?(\.|dot )?(js)?\b/, company: "/angularjs-development-company", hire: "/hire-angularjs-developers" },
  { pattern: /\btypescript\b/, company: "/typescript-development-company" },
  { pattern: /\bgraphql\b/, company: "/graphql-development-company" },
  { pattern: /\bvue ?(\.|dot )?(js)?\b/, company: "/vuejs-development-company" },
  { pattern: /\bpostgre(s|sql)\b/, company: "/postgresql-development-company" },
  { pattern: /\bruby on rails\b|\brails\b|\bror\b/, company: "/ruby-on-rails-development-company", hire: "/hire-ruby-on-rails-developer" },
  { pattern: /\bdjango\b/, company: "/python-application-development-company", hire: "/hire-django-developer" },
  { pattern: /\bpython\b/, company: "/python-application-development-company", hire: "/hire-python-developers" },
  { pattern: /\blaravel\b/, company: "/php-application-development-company", hire: "/hire-laravel-developer" },
  { pattern: /\bphp\b/, company: "/php-application-development-company", hire: "/hire-php-developers" },
  { pattern: /\bjava\b/, company: "/java-application-development-company", hire: "/hire-java-developers" },
  { pattern: /(\.|\bdot ?)net\b|\basp ?net\b|\bc#/, company: "/dot-net-application-development-company", hire: "/hire-dot-net-developers" },
  { pattern: /\bmagento\b/, hire: "/hire-magento-developer" },
  { pattern: /\bdrupal\b/, hire: "/hire-drupal-developer" },
  { pattern: /\bsalesforce\b/, hire: "/hire-salesforce-developer" },
  { pattern: /\bblockchain\b|\bweb3\b|\bsmart contracts?\b/, hire: "/hire-blockchain-developer" },
  { pattern: /\bdevops\b/, hire: "/hire-devops-developers" },
  { pattern: /\bforward deployed\b/, hire: "/hire-forward-deployed-engineer" },
  { pattern: /\bqa\b|\bquality assurance\b|\bquality engineering\b|\bsoftware testing\b|\btesters?\b/, hire: "/hire-qa-testers-india" },
  { pattern: /\bfront ?-?end\b/, hire: "/hire-frontend-application-developer" },
  { pattern: /\bback ?-?end\b/, hire: "/hire-backend-application-developer" },
];

/** Service lines, by phrase. Ordered narrow → broad. */
const SERVICE_RULES: readonly (readonly [RegExp, string])[] = [
  [/\bagentic\b|\bai agents?\b|\bmulti ?-?agent\b|\bagent\b/, "/agentic-ai-development-services"],
  [/\brag\b|\bretrieval ?-?augmented\b|\bdocument (ai|intelligence)\b|\b(enterprise )?knowledge retrieval\b/, "/rag-development-services"],
  [/\bgenerative ai\b|\bgen ?ai\b|\bllms?\b|\bllmops\b|\blarge language models?\b|\bchatbots?\b|\bconversational ai\b/, "/generative-ai-development-company"],
  [/\bcomputer vision\b|\boptical character recognition\b|\bocr\b|\bvideo analytics\b|\bvisual inspection\b|\bobject (and vehicle )?detection\b|\bimage recognition\b/, "/computer-vision-development-services"],
  [/\bpredictive\b|\bforecasting\b|\brecommendation (engines?|systems?)\b|\b(product|content) recommendations?\b|\b(fraud|anomaly) detection\b/, "/predictive-intelligence-services"],
  [/\bdata engineering\b|\bdata pipelines?\b|\bdata foundation\b|\bdata preparation\b|\bbig data\b|\bdata warehous\w*\b/, "/data-engineering-services"],
  [/\bdata science\b|\bmlops\b|\bexploratory data analysis\b|\bstatistical analysis\b/, "/data-science-services"],
  [/\bcustom ai\b/, "/custom-ai-development-services"],
  [/\bai (and ml |ml |\/ml )?(development|consulting|solutions|services|integration)\b|\bai ?(and|\/) ?(ml|machine learning)\b|\bmachine learning (development|services|solutions)\b/, "/ai-development-service"],
  [/\bstaff augmentation\b|\bteam augmentation\b/, "/it-staff-augmentation-services"],
  [/\bglobal capability cent(er|re)s?\b|\bgcc\b/, "/global-capability-center"],
  [/\boffshore (software )?development\b|\boffshore development cent(er|re)\b/, "/offshore-software-development-company"],
  [/\b(it )?outsourcing\b/, "/it-outsourcing-company-india"],
  [/\blegacy\b|\bapplication moderni[sz]ation\b|\bsoftware moderni[sz]ation\b|\bre-?host\w*\b|\bre-?architect\w*\b|\bre-?platform\w*\b/, "/legacy-modernization-services"],
  [/\bproduct engineering\b|\bmvp development\b|\bproduct development\b|\bproduct (architecture|consulting|strategy|design|ui|testing|deployment)\b/, "/product-engineering-services"],
  [/\bdedicated (development |software )?(teams?|developers?)\b/, "/hire-dedicated-developers"],
  [/\bcloud\b|\b(iaas|paas)\b|\binfrastructure ?-?as ?-?a ?-?service\b|\bplatform ?-?as ?-?a ?-?service\b/, "/cloud-computing"],
];

/** Broad disciplines — company page, or the role hire page in a hire context. */
const BROAD_RULES: readonly TechRule[] = [
  { pattern: /\bmobile (app|application)s?\b|\bmobile development\b|\bcross ?-?platform\b|\bhybrid apps?\b|\bhybrid app development\b/, company: "/mobile-application-development-company", hire: "/hire-mobile-app-developers" },
  { pattern: /\bweb (app|application)s?\b|\bweb development\b|\bwebsite (development|redesign)\b|\b(web|enterprise) portals?\b|\bportal development\b|\bweb cms\b/, company: "/web-application-development-company", hire: "/hire-web-app-developers" },
  { pattern: /\b(custom )?software development\b|\bsoftware developers?\b/, company: "/software-development-company", hire: "/hire-software-developers" },
  { pattern: /\bai (developers?|engineers?)\b/, hire: "/hire-ai-developer" },
];

/** Industries — the sector AI pages. */
const INDUSTRY_RULES: readonly (readonly [RegExp, string])[] = [
  [/\bfintech\b|\bbanking\b|\bfinancial services\b/, "/fintech-ai-solutions"],
  [/\bhealth ?tech\b|\bhealthcare\b/, "/ai-solutions-in-healthtech"],
  [/\bed ?tech\b|\bedutech\b|\beducation\b/, "/ai-solutions-in-edutech"],
  [/\be-?commerce\b|\bretail\b/, "/ai-solutions-for-ecommerce"],
  [/\blogistics\b|\bsupply chain\b/, "/ai-in-logistics"],
  [/\btelecom\w*\b/, "/ai-solutions-for-telecom"],
  [/\bconstruction\b/, "/ai-solutions-for-construction"],
];

const HIRE_CONTEXT = /\b(hire|hiring|developers?|engineers?|programmers?|experts?|teams?|dedicated)\b/;

/**
 * A name that is a build service, not a sector. "Custom eCommerce Development"
 * is about building a store, and the sector page it would match is about AI
 * for retailers — related, but not the page the card describes. Industry
 * rules only fire on names free of these words.
 */
const BUILD_WORDS = /\b(develop\w*|apps?|application|web|cms|platforms?|store|solutions?|portal)\b/;

function normalise(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[‐-―]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function normalisePath(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  const p = path.split(/[?#]/)[0].replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

function pick(rule: TechRule, hireContext: boolean): string | undefined {
  return hireContext ? (rule.hire ?? rule.company) : (rule.company ?? rule.hire);
}

/** The route a service name matches, ignoring which page it is on. */
export function matchServiceRoute(name: string): string | undefined {
  const t = normalise(name);
  if (!t) return undefined;
  const hire = HIRE_CONTEXT.test(t);

  // A technology with only a hire page ("DevOps", "QA"), named outside a
  // hiring context, is held as a fallback: "Cloud and DevOps Engineering" is
  // better served by the cloud page than by "hire DevOps developers".
  let hireOnly: string | undefined;
  for (const rule of TECH_RULES) {
    if (!rule.pattern.test(t)) continue;
    if (hire || rule.company) return pick(rule, hire);
    hireOnly = rule.hire;
    break;
  }
  for (const [pattern, path] of SERVICE_RULES) {
    if (pattern.test(t)) return path;
  }
  if (hireOnly) return hireOnly;
  for (const rule of BROAD_RULES) {
    if (rule.pattern.test(t)) return pick(rule, hire);
  }
  if (!BUILD_WORDS.test(t)) {
    for (const [pattern, path] of INDUSTRY_RULES) {
      if (pattern.test(t)) return path;
    }
  }
  return undefined;
}

/**
 * The href a service card should link to: its own `href` when the content set
 * one, else the derived route — and never the page the card is on.
 */
export function serviceHref(
  name: string,
  currentPath?: string | null,
  explicit?: string,
): string | undefined {
  const here = normalisePath(currentPath);
  const target = explicit ?? matchServiceRoute(name);
  if (!target) return undefined;
  if (here && normalisePath(target) === here) return undefined;
  return target;
}

/** Every route this module can emit — asserted against the registry in tests. */
export const SERVICE_ROUTE_TARGETS: readonly string[] = [
  ...new Set([
    ...TECH_RULES.flatMap((r) => [r.company, r.hire]),
    ...SERVICE_RULES.map(([, p]) => p),
    ...BROAD_RULES.flatMap((r) => [r.company, r.hire]),
    ...INDUSTRY_RULES.map(([, p]) => p),
  ].filter((p): p is string => typeof p === "string")),
];
