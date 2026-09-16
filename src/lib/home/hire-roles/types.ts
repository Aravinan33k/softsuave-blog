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
 * Note what is NOT here: "Why Soft Suave", the client logos, the case studies,
 * the recognitions, the client stories and the closing enquiry band. Those are
 * statements about the company, not about the role, so the page renders the
 * homepage's own components over the homepage's own copy in `lib/home/content.ts`
 * — see `components/hire/hire-role-page`. A role-written version of any of them
 * would be a second set of facts about Soft Suave, free to drift out of step
 * with the homepage's.
 */
export interface HireRolePageContent {
  /** Stable key, used for the field-id prefix on the hero form. */
  readonly key: string;
  /** App-internal route, leading slash. softsuave.com's own path. */
  readonly slug: string;
  /** Role name, as the nav and the breadcrumb use it. */
  readonly name: string;
  /** `serviceType` for the Service schema, e.g. "Backend development staffing". */
  readonly serviceType: string;

  readonly meta: {
    readonly title: string;
    readonly description: string;
  };

  /** Hero: H1, positioning copy, assurance points and the enquiry form. */
  readonly hero: HeroContent;
  /** Editorial prose defining what hiring this role gives you. */
  readonly overview: OverviewContent;
  /**
   * The "which skill fits which need" selector, where the live page carries a
   * decision table. Omitted on roles whose live page has none.
   */
  readonly fit?: ProblemsContent;
  /** What the role can own, as the centre-focused carousel. */
  readonly capabilities: ServicesContent;
  /** Mid-page conversion band. */
  readonly midCta: CtaBandContent;
  /** Engagement models, as the two-to-three panel block. */
  readonly engagement: IntegrationContent;
  /** Hiring process. Exactly five steps — `Process` renders a five-point ring. */
  readonly process: ProcessContent;
  /** Specialisations within the role: the technologies you can hire against. */
  readonly specialisations: CardGridContent;
  /** Soft Suave vs in-house vs freelancer. */
  readonly comparison: ComparisonContent;
  /** Rate tiers, where the live page publishes them. */
  readonly rates?: ComparisonContent;
  /** This role's stack, rendered through the homepage's technology band. */
  readonly techStack: TechStackContent;
  readonly faq: FaqContent;
}
