/**
 * Server-side and language hire pages: Node.js, NestJS, Java, Python, Django,
 * PHP, Laravel, .NET and Ruby on Rails.
 *
 * Every string is its live softsuave.com page's own copy, and `order` is the
 * sequence that page's `<section>` elements run in. Three distinct sequences
 * live in this one file, which is exactly why `order` is per page:
 *
 * - Java, Python, PHP and .NET run the older layout — prose, services, a rate
 *   band, four steps, why-hire cards, then the link grid.
 * - Node opens on the applications it builds and reaches its steps last, after
 *   a comparison table; NestJS runs a similar shape and publishes no FAQ at all.
 * - Django, Laravel and Rails run the newer layout — a client band, why-hire
 *   cards, the hiring steps *second*, then technical expertise, services and a
 *   vetting sequence.
 *
 * Live authoring slips are reproduced, not corrected (see `hire-blocks.ts`).
 * Two are worth knowing about: the Laravel page's technical-expertise band
 * opens on mobile groups (Flutter, Swift, Xcode), and the Rails page's why-hire
 * cards and hiring steps mention Drupal. Both are on the live pages today.
 */

import type { HireSkill } from "./hire-skill";
import { skill as nodejs } from "./hire-skills/hire-nodejs-developers";
import { skill as nestjs } from "./hire-skills/hire-nestjs-developers";
import { skill as java } from "./hire-skills/hire-java-developers";
import { skill as python } from "./hire-skills/hire-python-developers";
import { skill as django } from "./hire-skills/hire-django-developer";
import { skill as php } from "./hire-skills/hire-php-developers";
import { skill as laravel } from "./hire-skills/hire-laravel-developer";
import { skill as dotnet } from "./hire-skills/hire-dot-net-developers";
import { skill as rails } from "./hire-skills/hire-ruby-on-rails-developer";

export const backendHireSkills: readonly HireSkill[] = [
  nodejs,
  nestjs,
  java,
  python,
  django,
  php,
  laravel,
  dotnet,
  rails,
];
