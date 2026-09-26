/**
 * The shape of one "Hire <skill> Developers" page.
 *
 * Every field here is the *live* softsuave.com page's own copy — its headings,
 * its cards, its steps, its figures, its FAQ answers — carried across to this
 * app's components. Nothing in a skill entry may state something its live page
 * does not, and nothing the live page states may be dropped.
 *
 * That rule replaces the previous one. These pages used to share a single
 * section order and a set of hand-written engagement sections (`hire-shared`),
 * which meant twenty pages rendered a sequence and a body of copy that no live
 * page actually runs — including the homepage's "Why Soft Suave" manifesto,
 * which appears on none of them. `order` below is what replaced it.
 *
 * Every field is typed against the prop interface of the component that renders
 * it, so a renamed prop fails to compile here rather than rendering an empty
 * band.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { ComparisonContent } from "@/components/landing/comparison";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { FaqContent } from "@/components/landing/faq";

/**
 * Intrinsic size of the hero's background asset. Existing `page: "four"` art is
 * reused rather than fetched — see `content/images.manifest.json` for the slots
 * and `docs/homepage/README.md` for the Pexels pipeline that fills them.
 */
export interface HireImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

/**
 * One band of a hire-by-skill page, named so a page can declare its own order.
 *
 * The names map one-to-one onto the `<section>` elements the live pages run:
 *
 * | live markup                      | band            |
 * | -------------------------------- | --------------- |
 * | `.banner_bg_img`                 | (hero, implicit)|
 * | "Preferred AI-Enabled Partner"   | `clients`       |
 * | `.about`                         | `overview`      |
 * | `.app_develop_section`           | `applications`  |
 * | `.angular_dev_tech_section`      | `combinations`  |
 * | `.hiring_services` / `.services` | `services`      |
 * | `.technology_tech_stack_section` | `techStack`     |
 * | `.down_profile`                  | `midCta`        |
 * | `.hiring_steps` / `.steps`       | `process`       |
 * | `.why_choose` / `.angular_why_hire` | `whyUs`      |
 * | `.hire-models`                   | `comparison`    |
 * | "How We Vet and Onboard"         | `vetting`       |
 * | `.tech-stack`                    | `exploreMore`   |
 * | (client stories)                 | `testimonials`  |
 * | `.faq-sec`                       | `faq`           |
 *
 * The hero is always first and the closing enquiry band always last, so neither
 * is listed. A band named in `order` whose field is absent simply does not
 * render, so no page has to invent content to fill a slot.
 */
export type HireBand =
  | "clients"
  | "overview"
  | "applications"
  | "combinations"
  | "services"
  | "techStack"
  | "expertise"
  | "midCta"
  | "process"
  | "whyUs"
  | "comparison"
  | "vetting"
  | "exploreMore"
  | "testimonials"
  | "faq";

export interface HireSkill {
  /** Route slug, no leading slash. Matches the live site's existing URL. */
  readonly slug: string;
  /** Stable key for anchors and `idPrefix`. Lowercase, hyphenated. */
  readonly key: string;
  /** The technology, as it should read in a sentence. e.g. "React". */
  readonly name: string;
  /** The role, plural. e.g. "ReactJS Developers". */
  readonly role: string;

  /** `<title>`, before the " | Soft Suave" suffix. The live page's own. */
  readonly metaTitle: string;
  /** Meta description. The live page's own. */
  readonly metaDescription: string;
  /** JSON-LD `serviceType`. */
  readonly serviceType: string;

  /**
   * Opt this page into a `BreadcrumbList`. Defaults to **off** — most of these
   * 24 pages have no breadcrumb on their live page, and the schema here must
   * never state more than the live page does. Set alongside `breadcrumbParents`
   * on the few pages whose live page does carry one.
   */
  readonly showBreadcrumb?: boolean;
  /** Crumbs between Home and this page, matching the live page's own trail exactly. */
  readonly breadcrumbParents?: readonly { readonly name: string; readonly path: string }[];
  /**
   * Trailing breadcrumb label, where it differs from `role` — e.g. the live
   * trail names this page "Angular Developers", not "Hire Angular Developers".
   * Defaults to `role`.
   */
  readonly breadcrumbLabel?: string;

  /** Nav CTA label. */
  readonly ctaLabel: string;

  /**
   * The bands this page runs, in the order its live page runs them.
   *
   * These twenty pages are not one template on softsuave.com. Six run the newer
   * "Preferred AI-Enabled Technology Partner" layout that opens on a client
   * band and puts the hiring steps second; ten run the older "$14/hour" layout
   * that reaches its process only after a rate band; Node and Angular open on
   * the applications they build; React Native puts its comparison table before
   * its rates; NestJS publishes no FAQ at all. Copying that order is the point
   * of this field.
   */
  readonly order: readonly HireBand[];

  /** Hero: H1, positioning copy, assurance points and the enquiry form. */
  readonly hero: HeroContent;
  /** `.about` — the page's opening prose band. */
  readonly overview?: OverviewContent;
  /** `.app_develop_section` — "Applications That Our Developers Build Using X". */
  readonly applications?: ServicesContent;
  /** `.angular_dev_tech_section` — "Tech Combinations Our Developers Use". */
  readonly combinations?: CardGridContent;
  /** `.hiring_services` — the development-services / expertise cards. */
  readonly services?: ServicesContent;
  /** `.technology_tech_stack_section` — the developer's own skillset, as tool chips. */
  readonly techStack?: TechStackContent;
  /**
   * The same live band where it carries prose cards instead of tool chips.
   *
   * The Magento and Drupal pages publish their "Technical Expertise of Our X
   * Developers" section as ten described capabilities, not as grouped tool
   * names, so it cannot go in `techStack` without inventing chip labels or
   * throwing the descriptions away.
   */
  readonly expertise?: CardGridContent;
  /** `.down_profile` — the rate band, profile download, or mid-page CTA. */
  readonly midCta?: CtaBandContent;
  /** `.hiring_steps` — the hiring sequence, with exactly the live page's steps. */
  readonly process?: ProcessContent;
  /** `.why_choose` — "Why Are Our X Developers Considered the Best?" cards. */
  readonly whyUs?: CardGridContent;
  /** `.hire-models` — "Choose the Right X Development Partner". */
  readonly comparison?: ComparisonContent;
  /** "How We Vet and Onboard Top X Developers". */
  readonly vetting?: ProcessContent;
  /** `.tech-stack` — "Explore More Web/Mobile Technologies for Your Project". */
  readonly exploreMore?: CardGridContent;
  /** `.faq-sec` — the live page's own questions, in its own order. */
  readonly faq?: FaqContent;
}
