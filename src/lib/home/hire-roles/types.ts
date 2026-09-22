/**
 * Shape of a "Hire Developers by Role" page — the nine routes under the nav's
 * `hire-role` group (`lib/home/nav-menu.ts`).
 *
 * Each role gets its own module in this directory holding one object of this
 * shape, and `app/(marketing)/<slug>/page.tsx` renders it through
 * `components/hire/hire-role-page`. The slugs are softsuave.com's own, so these
 * routes take over URLs that already exist rather than inventing new ones (see
 * `MARKETING_PATHS` in themes/softsuave/nav-data).
 *
 * Every field is typed against the prop interface of the section component that
 * renders it, imported from `components/generative-ai/*`. That is deliberate:
 * these pages add no new section vocabulary, they only supply copy to the
 * landing-page sections the AI pages already ship. A renamed prop therefore
 * fails to compile here instead of rendering an empty band.
 *
 * Sourcing rule: the copy is the live softsuave.com page's own — its claims,
 * its figures, its FAQ answers — restructured for these sections and edited for
 * readability. Nothing here states a number, certification, client or
 * capability the live page does not. Proof imagery and case-study facts come
 * from `lib/home/content.ts`, so a role page can never quote a study the rest
 * of the site does not.
 */

import type { HeroContent } from '@/components/generative-ai/hero';
import type { OverviewContent } from '@/components/generative-ai/overview';
import type { ServicesContent } from '@/components/generative-ai/services';
import type { CardGridContent } from '@/components/generative-ai/industries';
import type { ProblemsContent } from '@/components/generative-ai/problems';
import type { ComparisonContent } from '@/components/generative-ai/comparison';
import type { ProcessContent } from '@/components/generative-ai/process';
import type { IntegrationContent } from '@/components/generative-ai/integration';
import type { TechStackContent } from '@/components/home/tech-stack';
import type { FaqContent } from '@/components/generative-ai/faq';
import type { CtaBandContent } from '@/components/generative-ai/cta-band';

/**
 * Note what is NOT here: the client logos, the case studies, the client stories
 * and the closing enquiry band. Those are statements about the company, not
 * about the role, so the page renders the homepage's own components over the
 * homepage's own copy in `lib/home/content.ts` — see
 * `components/hire/hire-role-page`. A role-written version of any of them would
 * be a second set of facts about Soft Suave, free to drift out of step with the
 * homepage's.
 *
 * Those bands are on the live role pages too, where the page runs them: the
 * client strip's heading and body are word for word the "Preferred AI-Enabled
 * Technology Partner" block, the stories are its testimonials, and the closing
 * band is its "Book Free Consultation" form. The homepage bands that no live
 * role page runs — the Why Soft Suave manifesto, the industries fan and the
 * awards strip — are not rendered on these pages at all. Which of the rest a
 * page runs, and in what sequence, is its `order`.
 */
/**
 * One band of a role page, named so a page can declare its own running order.
 *
 * `clients`, `caseStudies` and `testimonials` name the homepage components the
 * page borrows; the rest name this interface's own fields. A band listed in
 * `order` whose field is absent simply does not render, so a page can carry the
 * same order as its sibling without inventing content to fill it.
 *
 * `list:<key>` names one entry of `lists`, which is how a page runs the same
 * kind of band more than once at different points — the QA page prints three
 * label-only lists in three separate places, and each needs its own position.
 */
export type HireBand =
  | 'clients'
  | 'overview'
  | 'capabilities'
  | 'specialisations'
  | 'fit'
  | 'engagement'
  | 'globalDelivery'
  | 'process'
  | 'midCta'
  | 'whyRole'
  | 'comparison'
  | 'rates'
  | 'techStack'
  | 'caseStudies'
  | 'testimonials'
  | 'faq'
  | `list:${string}`;

/** One of `lists`: a `TechStackContent` that `order` can name individually. */
export interface HireListBand extends TechStackContent {
  /** Names this band in `order` as `list:<key>`. Unique within the page. */
  readonly key: string;
}

export interface HireRolePageContent {
  /** Stable key, used for the field-id prefix on the hero form. */
  readonly key: string;
  /** App-internal route, leading slash. softsuave.com's own path. */
  readonly slug: string;
  /** Role name, as the nav uses it. */
  readonly name: string;
  /** `serviceType` for the Service schema, e.g. "Backend development staffing". */
  readonly serviceType: string;

  /**
   * Opt this page into a `BreadcrumbList`. Defaults to **off** — most of these
   * 14 pages have no breadcrumb on their live page, and the schema here must
   * never state more than the live page does. Set alongside `breadcrumbParents`
   * on the few pages whose live page does carry one.
   */
  readonly showBreadcrumb?: boolean;
  /** Crumbs between Home and this page, matching the live page's own trail exactly. */
  readonly breadcrumbParents?: readonly { readonly name: string; readonly path: string }[];
  /**
   * Stop the trail at the last `breadcrumbParents` entry instead of naming this
   * page as its own final crumb — matches the live pages whose own breadcrumb
   * plugin does the same (e.g. `/hire-mobile-app-developers` traces to "Home ›
   * Hire Developers" and never names itself).
   */
  readonly breadcrumbEndsAtParent?: boolean;

  /**
   * The bands this page runs, in the order its live page runs them — the hero
   * is always first and the closing enquiry band always last, so neither is
   * listed. These pages are not one template on softsuave.com: some open on
   * their why-hire cards, some put the technology stack before the services,
   * one closes on a rate table, and four run no client strip at all. Copying
   * that order is the point of this field.
   */
  readonly order: readonly HireBand[];

  readonly meta: {
    readonly title: string;
    readonly description: string;
  };

  /** Hero: H1, positioning copy, assurance points and the enquiry form. */
  readonly hero: HeroContent;
  /** Editorial prose defining what hiring this role gives you. */
  readonly overview?: OverviewContent;
  /**
   * The "which skill fits which need" selector, where the live page carries a
   * decision table. Omitted on roles whose live page has none.
   */
  readonly fit?: ProblemsContent;
  /**
   * What the role can own, as the centre-focused carousel. Optional: several of
   * the live pages carry only one "what you can hire" section, and where that
   * section is a linked list of disciplines it belongs in `specialisations`
   * instead. Omitted rather than filled with a second, invented list.
   */
  readonly capabilities?: ServicesContent;
  /**
   * Mid-page conversion band, where the live page has one. Optional: the older
   * role pages put their trial CTA in the hero and nowhere else, and a band
   * invented for them would be the one section on the page we wrote ourselves.
   */
  readonly midCta?: CtaBandContent;
  /**
   * Engagement models, as the two-to-three panel block. Optional, because not
   * every live page runs a hiring-options section — the ones that only name the
   * models inside their comparison table are left without this band.
   */
  readonly engagement?: IntegrationContent;
  /**
   * "Global Delivery for Distributed Development Teams" — the working-hours
   * overlap, the delivery locations and how a developer joins your workflow.
   *
   * Prose rather than labelled panels, because that is what the live pages run:
   * a heading and two or three paragraphs. Panels would need a label per
   * paragraph, and those labels would be ours, not the page's.
   */
  readonly globalDelivery?: OverviewContent;
  /**
   * The live page's own card band that none of the other fields fit — on most
   * of these pages its "Why hire <role> developers from Soft Suave?" cards, and
   * on the dedicated-developers page its list of common hiring challenges.
   *
   * Distinct from the homepage's Why band, which this page also renders: that
   * band is the company's standing claim (13+ years, 400+ specialists), the
   * same statement the live pages make in their "Preferred AI-Enabled
   * Technology Partner" block. This field is the page's own cards, which differ
   * page to page and would otherwise be dropped.
   */
  readonly whyRole?: CardGridContent;
  /**
   * Hiring process, with exactly the stages the live page publishes — four on
   * most of these pages, five where the live copy separates interviewing out.
   * `Process` sizes its ring to whatever it is given.
   */
  readonly process: ProcessContent;
  /**
   * Specialisations within the role: the technologies you can hire against.
   * Optional, because not every live page runs one — the older role pages lead
   * with their services and name no technology grid at all.
   */
  readonly specialisations?: CardGridContent;
  /**
   * Soft Suave vs in-house vs freelancer. Optional: only some of the live
   * pages run this table, and a page that does not is left without one rather
   * than given a comparison its source never makes.
   */
  readonly comparison?: ComparisonContent;
  /** Rate tiers, where the live page publishes them. */
  readonly rates?: ComparisonContent;
  /** This role's stack, rendered through the homepage's technology band. */
  readonly techStack?: TechStackContent;
  /**
   * Further label-only bands, each placed by `order` as `list:<key>`.
   *
   * The QA page is why this exists: it prints its testing types, its domains
   * and its approach as three separate sections of bare labels, at three points
   * in the page, none of them carrying descriptions. Cards would need a body
   * per label and those bodies would be ours, not the page's; folding them into
   * `techStack` put all three in one band, in one place, which is not where the
   * page runs them.
   */
  readonly lists?: readonly HireListBand[];
  readonly faq: FaqContent;
}
