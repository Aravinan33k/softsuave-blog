/**
 * The 24 "Hire <skill> Developers" pages, in one list.
 *
 * Split across four modules purely for readability — twenty-four entries of
 * this size in one file is not reviewable. The split is by buyer intent rather
 * than by language family, because that is what the copy in each module has in
 * common: the platform pages argue about upgrade cost and certification, the
 * language pages argue about fit and architecture.
 *
 * Every slug matches the URL the page already has on softsuave.com, so search
 * equity and inbound links resolve rather than 404 when these ship. The nav
 * links all 24 of them, though not all from one group: twenty sit in its
 * `hire-skill` group and four — Android, iOS, Salesforce and Blockchain — sit
 * in `hire-role`, because that is how the live menu files them. Either way the
 * link points at the live site until the path is added to `MARKETING_PATHS` in
 * `themes/softsuave/nav-data.ts`.
 */

import type { HireSkill } from "./hire-skill";
import { webHireSkills } from "./hire-skills-web";
import { backendHireSkills } from "./hire-skills-backend";
import { mobileHireSkills } from "./hire-skills-mobile";
import { platformHireSkills } from "./hire-skills-platform";

export type { HireSkill } from "./hire-skill";

export const HIRE_SKILLS: readonly HireSkill[] = [
  ...webHireSkills,
  ...backendHireSkills,
  ...mobileHireSkills,
  ...platformHireSkills,
];

/**
 * Slug → skill, built once at module load.
 *
 * Each page module imports its own skill through `hireSkill(slug)` rather than
 * reaching into the category array, so a route only ever names its own slug.
 */
const BY_SLUG = new Map(HIRE_SKILLS.map((s) => [s.slug, s]));

/**
 * Look up a skill by slug, throwing if it is missing.
 *
 * Throwing rather than returning undefined is deliberate: every caller is a
 * route module with a hardcoded slug, so a miss is a typo that should fail the
 * build rather than render a page with empty sections.
 */
export function hireSkill(slug: string): HireSkill {
  const skill = BY_SLUG.get(slug);
  if (!skill) {
    throw new Error(
      `Unknown hire skill slug: "${slug}". Known slugs: ${[...BY_SLUG.keys()].join(", ")}`,
    );
  }
  return skill;
}

/** Every hire route, as app-internal paths. Consumed by the page registry. */
export const HIRE_PATHS: readonly string[] = HIRE_SKILLS.map((s) => `/${s.slug}`);
