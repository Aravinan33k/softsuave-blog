/**
 * Platform hire pages: Magento and Drupal.
 *
 * Both run the newer softsuave.com layout — a client band, why-hire cards, the
 * hiring steps second, then technical expertise, services, a vetting sequence
 * and a comparison table. Where they differ from their Django/Laravel/Rails
 * siblings is the expertise band: those pages list grouped tool names, while
 * these two publish ten described capabilities, so it renders through
 * `expertise` rather than `techStack`.
 *
 * Every string is the live page's own copy.
 */

import type { HireSkill } from "./hire-skill";
import { skill as magento } from "./hire-skills/hire-magento-developer";
import { skill as drupal } from "./hire-skills/hire-drupal-developer";

export const platformHireSkills: readonly HireSkill[] = [magento, drupal];
