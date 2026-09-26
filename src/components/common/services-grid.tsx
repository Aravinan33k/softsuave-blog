import CardGrid, { type CardGridContent, type CardIcon } from "@/components/landing/industries";

/**
 * Content this section accepts.
 *
 * Deliberately the union of every services shape already in the tree —
 * `ServicesCarouselContent` (components/common/services-carousel), the
 * data-engineering `ShowcaseContent` and the generative-AI `ServicesContent`.
 * That is the whole point: the AI pages swapped those three templates for this
 * grid without a single edit to `lib/home/`. Every name, sentence and image
 * path is the one the page already shipped.
 */
export interface ServicesGridContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly name: string;
    readonly body: string;
    /**
     * Card thumbnail, pinned to the card's top corner by the grid.
     * Root-relative path (hand-placed under public/images/landing/), resolved
     * downstream with `publicMediaUrl`.
     *
     * Either shape is accepted, because the two carousels this grid replaced
     * disagreed: the shared one carried `{ src, alt }`, the generative-AI one a
     * bare path. Normalising here rather than rewriting one of them keeps both
     * sets of content files untouched. A bare path is decorative, so it takes
     * an empty alt — the card names the service in text right beside it.
     */
    readonly image?: string | { readonly src: string; readonly alt: string };
    /**
     * Optional destination page. Omitted, the grid links the card to the page
     * its name matches (see `lib/home/service-href.ts`) — resolved client-side
     * in `CardGrid`, which knows the current path and so never self-links.
     */
    readonly href?: string;
  }[];
}

/**
 * Lowercased, punctuation-free form of a service name, used as the map key.
 *
 * `&` becomes "and" so "Model Evaluation & Validation" and "Model Evaluation
 * and Validation" are the same key, and everything else non-alphanumeric
 * collapses to a single space. That absorbs the copy edits that would
 * otherwise silently drop a card back to the keyword fallback — a comma
 * removed, "(OCR)" unbracketed, a hyphen turned into an en dash.
 */
const key = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/**
 * The glyph for each service, chosen for what that service actually does.
 *
 * This is the whole point of the file. These cards were first given glyphs by
 * position — `ICON_CYCLE[i % length]` — which put a magnifying glass on
 * "Document AI and Data Extraction" and a stack of layers on "Enterprise
 * Knowledge Retrieval". A glyph that contradicts its heading is worse than no
 * glyph, so every service on all seven AI pages is now named here.
 *
 * Two rules held while assigning:
 *  - the glyph depicts the service, not its page — "Integration" is a plug on
 *    all four pages that offer it;
 *  - no page repeats a glyph, so a reader scanning one grid never sees the
 *    same mark twice. That is why "Object & Vehicle Detection" (eye) and
 *    "Visual Inspection" (scan) differ, and why "Data Pipeline" (flow) and
 *    "Data Foundation" (layers) do.
 *
 * Keys are `key(name)`, so they survive ordinary copy edits. A service that
 * falls through anyway lands on KEYWORD_RULES below rather than nothing.
 */
const SERVICE_ICONS: Readonly<Record<string, CardIcon>> = {
  // ---- /rag-development-services ----
  "custom rag development": "code",
  "enterprise knowledge retrieval": "search",
  "rag application integration": "plug",
  "document ai and data extraction": "doc",
  "document retrieval and summarization": "list",
  "rag evaluation and optimization": "gauge",
  "permission aware knowledge access": "shield",

  // ---- /computer-vision-development-services ----
  "computer vision consulting and use case assessment": "compass",
  "data preparation": "layers",
  "custom model development and training": "cpu",
  "object and vehicle detection": "eye",
  "optical character recognition ocr": "doc",
  "video analytics": "video",
  "visual inspection": "scan",
  "validation and acceptance testing": "gauge",
  "model optimization": "cycle",
  "system integration and deployment support": "rocket",

  // ---- /data-science-services ----
  "data science consulting and strategy": "compass",
  "exploratory data analysis": "search",
  "statistical analysis and experimentation": "flask",
  "data science development services": "code",
  "model evaluation and validation": "gauge",
  "mlops and model lifecycle support": "cycle",

  // ---- /predictive-intelligence-services ----
  "ai forecasting services": "chart",
  "predictive modeling services": "cpu",
  "anomaly detection services": "pulse",
  "recommendation system development": "target",

  // ---- /data-engineering-services ----
  "data pipeline development services": "flow",
  "data foundation engineering": "layers",
  "database and system connectivity": "database",
  "cloud data engineering": "cloud",
  "analytics data preparation": "chart",
  "ai data foundation engineering": "spark",

  // ---- /generative-ai-development-company ----
  "generative ai consulting and use case discovery": "compass",
  "generative ai proof of concept development": "flask",
  "custom generative ai application development": "code",
  "generative ai integration services": "plug",
  "model selection and customisation": "cpu",
  "generative ai security and governance": "shield",
  "evaluation testing and llmops": "gauge",
  "dedicated generative ai development teams": "users",
  "generative ai product modernisation": "upgrade",
  "generative ai support and optimisation": "cycle",

  // ---- /agentic-ai-development-services ----
  "agentic ai strategy and readiness assessment": "compass",
  "custom ai agent design and development": "cpu",
  "multi agent architecture and orchestration": "network",
  "rag and enterprise knowledge integration": "search",
  "tool api and enterprise system integration": "plug",
  "agent memory and context management": "database",
  "agent evaluation testing and guardrails": "shield",
  "deployment observability and optimization": "rocket",
};

/**
 * Fallback for a service not in the map — a new one, or one renamed past what
 * `key` absorbs.
 *
 * Ordered, first match wins, so the sequence is the meaning: "Agent
 * Evaluation, Testing, and Guardrails" is about guardrails before it is about
 * testing, and "System Integration & Deployment Support" is about shipping
 * before it is about integration. Narrow, unambiguous words come first; the
 * broad ones ("development", "engineering") come last, where they catch only
 * what nothing more specific claimed.
 */
const KEYWORD_RULES: readonly (readonly [RegExp, CardIcon])[] = [
  [/guardrail|governance|security|permission|complian|privacy/, "shield"],
  [/deployment|observab|monitoring|launch|production/, "rocket"],
  [/orchestrat|multi agent/, "network"],
  [/memory|context|database|connectivity/, "database"],
  [/cloud/, "cloud"],
  [/summar/, "list"],
  [/document|extraction|ocr|optical character/, "doc"],
  [/anomaly/, "pulse"],
  [/recommend|personalis|personaliz/, "target"],
  [/video/, "video"],
  [/inspection/, "scan"],
  [/detect|vision|visual|image/, "eye"],
  [/consult|strategy|discovery|readiness|assessment|scoping/, "compass"],
  [/proof of concept|experiment|prototyp/, "flask"],
  [/evaluation|validation|testing|benchmark/, "gauge"],
  [/lifecycle|mlops|llmops|optimi|support|maintenance/, "cycle"],
  [/moderni|migration|upgrade/, "upgrade"],
  [/forecast|analytics|statistic|reporting|insight|dashboard/, "chart"],
  [/retrieval|knowledge|search|exploratory/, "search"],
  [/integration|api|connect|interoper/, "plug"],
  [/pipeline|streaming|etl/, "flow"],
  [/foundation|preparation|warehouse|lake|ingest|governance/, "layers"],
  [/model|training|fine tun/, "cpu"],
  [/team|staff|dedicated|resourc/, "users"],
  [/application|development|build|engineering/, "code"],
];

/** Map first, then keywords, then a generic AI mark rather than a blank disc. */
function iconFor(name: string): CardIcon {
  const k = key(name);
  const exact = SERVICE_ICONS[k];
  if (exact) return exact;

  for (const [pattern, icon] of KEYWORD_RULES) {
    if (pattern.test(k)) return icon;
  }
  return "spark";
}

/**
 * Services as a static card grid — the `feature` card from the GCC page's
 * benefits band, filled with a page's service list.
 *
 * Replaces the centre-focused carousel on the AI service pages. The carousel
 * showed three of seven-to-ten services at a time behind a 4.6s timer, which
 * put the page's actual offering behind an interaction; this shows every one
 * of them at once, each with its own artwork in the card's top corner.
 *
 * Nothing is reimplemented here: the markup, the warm accent ramp, the
 * responsive columns and the thumbnail slot are all `CardGrid`'s `feature`
 * variant (components/landing/industries.tsx), so this grid and the benefit
 * grids elsewhere on the site stay one object. This file only adapts the
 * services content shape onto it and picks each card's badge glyph.
 *
 * A server component — it renders `CardGrid`, which is the client one.
 */
export default function ServicesGrid({
  content,
  id = "services",
}: {
  content: ServicesGridContent;
  id?: string;
}) {
  const grid: CardGridContent = {
    eyebrow: content.eyebrow,
    title: content.title,
    body: content.body,
    items: content.items.map((item) => ({
      name: item.name,
      body: item.body,
      icon: iconFor(item.name),
      href: item.href,
      image:
        typeof item.image === "string"
          ? { src: item.image, alt: "" }
          : item.image
            ? { src: item.image.src, alt: item.image.alt }
            : undefined,
    })),
  };

  return <CardGrid content={grid} id={id} variant="feature" />;
}
