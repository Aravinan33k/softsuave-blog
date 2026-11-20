/**
 * Front-end and JavaScript-stack hire pages: React, Angular, MERN, MEAN.
 *
 * Every string below is its live softsuave.com page's own copy, and `order` is
 * the sequence that page's `<section>` elements actually run in. See
 * `hire-skill.ts` for the band vocabulary and for why this replaced the
 * previous arrangement, where all twenty pages shared one order and one set of
 * hand-written engagement sections.
 *
 * The live React and MEAN pages' hiring steps and why-hire cards talk about
 * "MERN" — a copy slip the hire-by-skill review asked us to correct, so those
 * pages build the blocks for their own technology (`techSteps` / `techWhy`).
 */

import type { HireSkill } from "./hire-skill";
import { skill as react } from "./hire-skills/hire-reactjs-developers";
import { skill as angular } from "./hire-skills/hire-angularjs-developers";
import { skill as mern } from "./hire-skills/hire-mern-stack-developers-india";
import { skill as mean } from "./hire-skills/hire-mean-stack-developers-india";

export const webHireSkills: readonly HireSkill[] = [react, angular, mern, mean];
