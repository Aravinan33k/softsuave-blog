/**
 * SEO for the Forward Deployed Engineers page, from the page's standalone
 * build (its root layout's metadata and `lib/seo.ts`), adapted to this app's
 * route. Emitted by `app/(marketing)/hire-forward-deployed-engineer/page.tsx`.
 */
import { contactEmail, contactPageHref } from "@/lib/fde/contact";
import { faqItems } from "@/lib/fde/content/faq";

export { contactEmail };

/**
 * Single source of truth for the canonical origin. Every absolute URL in the
 * metadata and the JSON-LD is derived from this, so a domain change is a
 * one-line edit here.
 */
export const siteUrl = "https://www.softsuave.com";

/**
 * Path this page is served from in this app. (The page's standalone build
 * pointed at "/hire-forward-deployed-engineers", the live page it replaces;
 * this app serves the singular route, and a canonical must name a URL the
 * app actually answers.)
 */
export const pagePath = "/hire-forward-deployed-engineer";

export const pageUrl = `${siteUrl}${pagePath}`;

/** Legal entity that owns the domain — must match, or the schema is contested. */
export const siteName = "Soft Suave Technologies";

/** Short form used in the title suffix and OG site name. */
export const brandName = "Soft Suave";

export const siteTitle =
  "Hire Forward Deployed Engineers From $14/Hour | Soft Suave";

export const siteDescription =
  "Hire Forward Deployed Engineers from $14/hour to build AI solutions, integrate systems, and turn complex workflows into production-ready implementations.";

/** Relative to /public. Also used for the Twitter card. This page's existing share card. */
export const ogImagePath = "/assets/images/hire-forward-deployed-engineer-og.webp";

export const ogImageUrl = `${siteUrl}${ogImagePath}`;


/** Markets the sales copy speaks to, mirrored into `areaServed`. */
export const areaServed = ["US", "CA", "UK", "AU", "DE", "NL", "SG", "AE"];

/**
 * `@id` values are stable anchors so the Organization node can be referenced
 * from the Service and FAQ nodes instead of being duplicated.
 */
/**
 * Matches the `@id` the rest of softsuave.com already publishes, so this
 * page's node merges into the site-wide entity rather than declaring a
 * second, competing organization on the same domain.
 */
const organizationId = `${siteUrl}/`;
const websiteId = `${siteUrl}/#website`;

export const organizationSchema = {
  "@type": "Organization",
  "@id": organizationId,
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/new-assets/common/images/softsuave_logo.webp`,
  description:
    "Soft Suave deploys Forward Deployed Engineers who embed with your team to build, integrate and ship AI and custom software into production.",
  email: contactEmail,
  areaServed,
  knowsAbout: [
    "Forward Deployed Engineering",
    "AI agent deployment",
    "LLM integration",
    "Enterprise systems integration",
    "Custom software development",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: contactEmail,
      availableLanguage: ["en"],
    },
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: siteName,
  description: siteDescription,
  publisher: { "@id": organizationId },
  inLanguage: "en",
};

export const serviceSchema = {
  "@type": "Service",
  "@id": `${pageUrl}#service`,
  serviceType: "Forward Deployed Engineering",
  name: "Hire Forward Deployed Engineers",
  url: pageUrl,
  description:
    "Dedicated Forward Deployed Engineering teams and project pods embedded in your workflow, reaching production deployment in 6-8 weeks.",
  image: ogImageUrl,
  areaServed,
  provider: { "@id": organizationId },

  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "14",

    priceSpecification: {
      "@type": "UnitPriceSpecification",
      priceCurrency: "USD",
      minPrice: "14",
      unitCode: "HUR",
      referenceQuantity: {
        "@type": "QuantitativeValue",
        value: "1",
        unitCode: "HUR",
      },
    },

    availability: "https://schema.org/InStock",
    url: `${siteUrl}${contactPageHref}`,
  },

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engagement Models",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dedicated FDE Teams",
          description:
            "Full-stack engineers embedded in your workflow, working like your in-house team.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Project Pods",
          description:
            "A scoped, fully managed pod that ships specific features on a fixed timeline.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Startup Accelerator",
          description:
            "FDE capacity that scales with your customer implementations.",
        },
      },
    ],
  },
};

/**
 * FAQPage is a subtype of WebPage, so this doubles as *the* page node —
 * one node per URL, rather than a WebPage and an FAQPage competing at the
 * same address.
 *
 * The questions are derived from the rendered FAQ rather than hand-copied,
 * so the structured data can never drift from what the page actually shows,
 * which is exactly what Google penalises.
 */
export const faqSchema = {
  "@type": "FAQPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: siteTitle,
  description: siteDescription,
  isPartOf: { "@id": websiteId },
  about: { "@id": `${pageUrl}#service` },
  primaryImageOfPage: ogImageUrl,
  inLanguage: "en",
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

/** One `@graph` per document keeps the nodes cross-referenced by `@id`. */
export function buildJsonLd(nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
