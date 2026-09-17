/**
 * Composes a `HireSkill` into the content objects the landing components take.
 *
 * This is the seam between the two halves of a hire page: the technology-
 * specific copy in `hire-skills-*.ts` and the engagement copy in
 * `hire-shared.ts`. Keeping the composition here means the section order, the
 * anchor ids, and the shared sections are defined once for all 24 pages, so
 * they cannot drift apart one page at a time.
 *
 * Everything is derived, not stored: a hire page holds no content of its own.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { FaqContent } from "@/components/landing/faq";
import type { HireSkill } from "./hire-skill";
import { hireHeroBadges, hireSharedFaqs } from "./hire-shared";

export function hireHero(skill: HireSkill): HeroContent {
  return {
    eyebrow: skill.eyebrow,
    titleLines: skill.titleLines,
    body: skill.heroBody,
    points: skill.heroPoints,
    badges: hireHeroBadges,
    form: {
      eyebrow: "Hiring Enquiry",
      title: `Hire ${skill.name} developers`,
      note: "Tell us the role, the seniority, and how soon you need someone. We come back within three to five business days with matched profiles, real availability, and indicative rates. Everything stays under NDA.",
      submit: "Request a shortlist",
      sending: "Opening your mail…",
      requirementLabel: skill.requirementLabel,
      requirementPlaceholder: skill.requirementPlaceholder,
      subject: `${skill.role} enquiry`,
    },
    image: skill.image,
  };
}

export function hireOverview(skill: HireSkill): OverviewContent {
  return {
    eyebrow: "The Short Answer",
    title: skill.overviewTitle,
    paragraphs: skill.overviewParagraphs,
    pullQuote: skill.pullQuote,
  };
}

export function hireCapabilities(skill: HireSkill): ServicesContent {
  return {
    eyebrow: "Capabilities",
    title: `What Our ${skill.role} Build`,
    body: `The work our ${skill.name} engineers are brought in to do, and what each of them actually involves.`,
    items: skill.capabilities,
  };
}

export function hireTechStack(skill: HireSkill): TechStackContent {
  return {
    eyebrow: "Technology",
    title: `The ${skill.name} Stack We Work In`,
    body: "The tools and libraries around the language itself — the part that decides whether an engineer is productive in your codebase in week one or week five.",
    groups: skill.techGroups,
  };
}

/**
 * Technology questions first, then the commercial ones.
 *
 * That order is deliberate: a visitor who has scrolled this far is still
 * deciding whether we understand the technology. The contractual answers matter
 * once they have, and not before.
 */
export function hireFaqs(skill: HireSkill): FaqContent {
  return {
    eyebrow: "FAQs",
    title: `FAQs About Hiring ${skill.role}`,
    body: "What engineering and hiring leads ask before starting an engagement — the technology first, then the commercial terms.",
    items: [...skill.faqs, ...hireSharedFaqs],
  };
}
