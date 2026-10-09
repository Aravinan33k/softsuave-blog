/**
 * Picks a card's badge glyph from the words on the card.
 *
 * The landing-page review asked for icons in place of the ordinal numbers
 * ("01", "Step 02") that most card grids and process steps led with. A number
 * says only where a card sits; a glyph can say what it is about. Hand-assigning
 * one per card across ~77 pages of content modules would be several hundred
 * edits in files this pass does not own, so the glyph is read off the card's
 * own title and body instead.
 *
 * Deliberately pure and React-free: it returns a key, not a component, so the
 * rules can be unit-tested in node and the mapping from key to lucide glyph
 * lives in one place (`components/common/card-icon-badge.tsx`).
 *
 * Matching rules:
 *  - The TITLE is tried against every rule first, and only then the body. A
 *    card headed "Cloud Migration" is about the cloud even if its body goes on
 *    to mention security; reading both at once would let an incidental word
 *    in the body outrank the heading.
 *  - Rules are ordered, first match wins, narrow words before broad ones —
 *    "development" and "build" sit near the end so they only catch a card that
 *    nothing more specific claimed.
 *  - Words are matched on boundaries (`\bai\b`), so "maintain" does not trip
 *    the AI rule and "rapid" does not trip the API one.
 *  - No match falls back to a small cycle chosen by a hash of the title, so a
 *    grid of unmatched cards is still stable across renders but does not show
 *    the same generic glyph on every card.
 */

export const ICON_KEYS = [
  "brain",
  "sparkles",
  "bot",
  "cloud",
  "shield",
  "lock",
  "smartphone",
  "globe",
  "chart",
  "database",
  "plug",
  "users",
  "handshake",
  "clock",
  "piggy",
  "dollar",
  "check",
  "bug",
  "search",
  "pen",
  "code",
  "rocket",
  "lifebuoy",
  "compass",
  "trending",
  "layers",
  "refresh",
  "workflow",
  "server",
  "gauge",
  "target",
  "award",
  "lightbulb",
  "message",
  "file",
  "eye",
  "cart",
  "truck",
  "heart",
  "graduation",
  "building",
  "landmark",
  "radio",
  "factory",
  "zap",
  "puzzle",
  "settings",
  "clipboard",
  "monitor",
  "network",
  "boxes",
  "scale",
  "link",
] as const;

export type IconKey = (typeof ICON_KEYS)[number];

/**
 * Ordered keyword rules. Each pattern runs against lowercased text with `&`
 * spelled out as "and". Keep the narrow, unambiguous subjects at the top.
 */
const RULES: readonly (readonly [RegExp, IconKey])[] = [
  // Industries — a proper noun is the least ambiguous thing a card can say.
  [/\b(fintech|banking|bank|finance|financial|insurance|payments?|lending|wealth)\b/, "landmark"],
  [/\b(health\s?tech|healthcare|health|medical|clinical|patient|hospital|pharma)\w*/, "heart"],
  // "learning" alone is education, but not in "machine/deep learning".
  [/\b(ed\s?tech|education|edutech|e-?learning|students?|school|lms)\b|(?<!machine |deep |reinforcement )\blearning\b/, "graduation"],
  [/\b(e-?commerce|retail|shopping|storefront|checkout|marketplace|magento|shopify)\b/, "cart"],
  [/\b(logistics|supply chain|fleet|shipping|freight|warehouse management|delivery routes?)\b/, "truck"],
  [/\b(telecom|telco|5g|network operators?)\b/, "radio"],
  [/\b(construction|real estate|property|buildings?)\b/, "building"],
  [/\b(manufacturing|factory|industrial)\b/, "factory"],

  // Trust, security and compliance.
  [/\b(nda|confidential\w*|ip protection|intellectual property|non-disclosure)\b/, "lock"],
  [/\b(security|secure|compliance|compliant|governance|guardrails?|privacy|gdpr|hipaa|iso|soc ?2|risk)\b/, "shield"],

  // Time, cost and commercial terms.
  [/\b(time[- ]?zones?|overlap|24\/7|round[- ]the[- ]clock|hours?|timeline|on[- ]time|faster|speed to|time[- ]to[- ]market)\b/, "clock"],
  [/\b(cost[- ]effective|cost savings?|save|savings|affordable|budget|lower costs?|reduce costs?)\b/, "piggy"],
  [/\b(cost|pricing|price|rates?|billing|estimate|estimation|quote|transparent pricing|roi)\b/, "dollar"],

  // AI and data.
  [/\b(agents?|agentic|chatbots?|assistants?|copilots?|bots?)\b/, "bot"],
  [/\b(generative|gen ?ai|llms?|gpt|prompt\w*|rag)\b/, "sparkles"],
  [/\b(ai|a\.i\.|artificial intelligence|machine learning|ml|mlops|deep learning|neural|ai models?|ml models?|model training|fine[- ]tun\w*|predictive|nlp)\b/, "brain"],
  [/\b(computer vision|vision|image recognition|ocr|detection|inspection|visual)\b/, "eye"],
  [/\b(analytics|dashboards?|reporting|reports?|insights?|bi|metrics|kpis?|forecast\w*|statistic\w*|visuali[sz]ation)\b/, "chart"],
  [/\b(data|database|warehouse|lake|etl|pipelines?|sql|big data)\b/, "database"],

  // Platforms.
  [/\b(cloud|aws|azure|gcp|serverless|saas)\b/, "cloud"],
  [/\b(devops|ci\/cd|infrastructure|servers?|hosting|kubernetes|docker|containers?)\b/, "server"],
  [/\b(mobile|ios|android|iphone|smartphone|apps? store|react native|flutter|ionic|xamarin|swift|kotlin)\b/, "smartphone"],
  [/\b(integrations?|integrate|apis?|connect\w*|interoperab\w*|third[- ]party|middleware|graphql)\b/, "plug"],
  [/\b(web|website|websites|browser|frontend|front[- ]end|portal|pwa)\b/, "globe"],
  [/\b(design|ux|ui\/ux|wireframes?|prototyp\w*|mockups?|user experience)\b/, "pen"],
  [/\b(desktop|cross[- ]platform|ui|user interface)\b/, "monitor"],
  [/\b(microservices?|architecture|distributed|scalable systems?)\b/, "network"],

  // Delivery lifecycle — the vocabulary of process steps.
  [/\b(discover\w*|research|requirements?|analy[sz]e|analysis|audit|assessment|assess|understand\w*|explore|scoping|scope)\b/, "search"],
  [/\b(strategy|strategic|consult\w*|roadmap|advisory|planning|plan|blueprint)\b/, "compass"],
  [/\b(testing|test|qa|quality assurance|bugs?|debug\w*)\b/, "bug"],
  [/\b(quality|reliab\w*|review|vetted|vetting|verified|accuracy|standards?|best practices)\b/, "check"],
  [/\b(deploy\w*|launch\w*|go[- ]live|release|rollout|ship\w*|mvp)\b/, "rocket"],
  [/\b(support|maintenance|maintain|monitoring|post[- ]launch|sla|help ?desk)\b/, "lifebuoy"],
  [/\b(moderni[sz]\w*|migrat\w*|legacy|upgrade|re-?engineer\w*|refactor\w*|transform\w*)\b/, "refresh"],
  [/\b(automat\w*|workflows?|orchestrat\w*|process automation|rpa)\b/, "workflow"],
  [/\b(scal\w*|growth|grow|expand\w*|elastic)\b/, "trending"],
  [/\b(performance|optimi[sz]\w*|efficien\w*|fast|latency)\b/, "gauge"],

  // People and engagement.
  [/\b(hire|hiring|recruit\w*|onboard\w*)\b/, "users"],
  [/\b(teams?|talent|developers?|engineers?|experts?|specialists?|staff\w*|dedicated|resources?|people|augment\w*)\b/, "users"],
  [/\b(partner\w*|collaborat\w*|engagement|relationship|trust|clients?)\b/, "handshake"],
  [/\b(communicat\w*|transparen\w*|updates?|meetings?|standups?|feedback)\b/, "message"],
  [/\b(flexib\w*|configur\w*|settings)\b/, "settings"],
  [/\b(experience|proven|years|award\w*|track record|certified|expertise)\b/, "award"],
  [/\b(innovat\w*|ideas?|ideation|creative)\b/, "lightbulb"],
  [/\b(goals?|outcomes?|results?|focus\w*|objectives?|precision)\b/, "target"],
  [/\b(documents?|documentation|contracts?|paperwork|compliance docs)\b/, "file"],
  [/\b(project management|manage\w*|coordination|sprints?|agile|scrum)\b/, "clipboard"],
  [/\b(products?|platforms?|solutions?|modules?)\b/, "boxes"],
  [/\b(real[- ]time|instant|quick\w*|rapid\w*)\b/, "zap"],
  [/\b(compar\w*|balance|fair)\b/, "scale"],

  // Broad build words last.
  [/\b(develop\w*|build\w*|coding|code|engineering|implementation|implement|programming|software)\b/, "code"],
];

/** Stable fallbacks, cycled by a hash of the title so unmatched cards differ. */
const FALLBACKS: readonly IconKey[] = ["sparkles", "layers", "puzzle", "lightbulb", "boxes"];

function normalise(text: string): string {
  return text.toLowerCase().replace(/&/g, " and ").replace(/\s+/g, " ").trim();
}

function match(text: string): IconKey | null {
  if (!text) return null;
  const t = normalise(text);
  for (const [pattern, key] of RULES) {
    if (pattern.test(t)) return key;
  }
  return null;
}

/** Small, stable string hash (djb2). Only used to spread the fallbacks. */
function hash(text: string): number {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * The glyph key for a card: the title's first matching rule, else the body's,
 * else a deterministic fallback.
 */
export function iconFor(title: string, body?: string): IconKey {
  return match(title) ?? match(body ?? "") ?? FALLBACKS[hash(normalise(title)) % FALLBACKS.length];
}
