/**
 * Platform hire pages: Magento, Drupal and SaaS.
 *
 * All three run the newer softsuave.com layout — a client band, why-hire cards, the
 * hiring steps second, then technical expertise, services, a vetting sequence
 * and a comparison table. Magento and Drupal publish ten described capabilities
 * in their expertise band, so it renders through `expertise` rather than
 * `techStack`; SaaS lists grouped tools in the `rows` tech stack.
 *
 * Every string is the live page's own copy.
 */

import type { HireSkill } from "./hire-skill";
import { skill as magento } from "./hire-skills/hire-magento-developer";
import { skill as drupal } from "./hire-skills/hire-drupal-developer";
import { skill as saas } from "./hire-skills/hire-saas-developer";

export const platformHireSkills: readonly HireSkill[] = [magento, drupal, saas];
