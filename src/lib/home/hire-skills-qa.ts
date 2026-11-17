/**
 * QA hire pages: Selenium.
 *
 * /hire-selenium-tester runs the older softsuave.com layout — overview, expertise cards, the rate band,
 * four steps, why-hire cards, a tools band and the FAQs — closed by the full "Book Free Consultation"
 * band. The record itself lives in `./hire-skills/hire-selenium-tester`.
 */

import type { HireSkill } from "./hire-skill";
import { skill as selenium } from "./hire-skills/hire-selenium-tester";

export const qaHireSkills: readonly HireSkill[] = [selenium];
