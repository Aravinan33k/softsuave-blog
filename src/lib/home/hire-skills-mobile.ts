/**
 * Mobile hire pages: Swift, Kotlin, Flutter, React Native, Ionic.
 *
 * Every string is its live softsuave.com page's own copy, and `order` is the
 * sequence that page's `<section>` elements run in. All five differ:
 *
 * - Swift and Flutter run the older layout, though Swift's hiring band has five
 *   steps where every other page has four.
 * - React Native puts its comparison table *before* the rate band, and that
 *   table is its own — different columns and real rate figures, not the
 *   shared one in `hire-comparison.ts`.
 * - Ionic runs a technical-proficiency band between its rate band and its
 *   why-hire cards, and reaches its hiring steps only after the comparison.
 * - Kotlin runs the newer layout: a client band first, hiring steps second.
 *
 * These pages link the mobile roster in their "Explore More Technologies" band,
 * not the web one — that is the only difference the live markup makes between
 * the two groups there.
 */

import type { HireSkill } from "./hire-skill";
import { skill as swift } from "./hire-skills/hire-swift-developers";
import { skill as kotlin } from "./hire-skills/hire-kotlin-developer";
import { skill as flutter } from "./hire-skills/hire-flutter-developers";
import { skill as reactNative } from "./hire-skills/hire-react-native-developers";
import { skill as ionic } from "./hire-skills/hire-ionic-developers";

export const mobileHireSkills: readonly HireSkill[] = [
  swift,
  kotlin,
  flutter,
  reactNative,
  ionic,
];
