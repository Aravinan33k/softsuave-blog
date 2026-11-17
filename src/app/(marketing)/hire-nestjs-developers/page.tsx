import type { Metadata } from 'next';
import HirePage, { hireMetadata } from '@/components/landing/hire-page';
import { hireSkill } from '@/lib/home/hire-skills';
import Sections from './sections';

/**
 * "hire-nestjs-developers" — one of the 24 hire-by-skill landing pages.
 *
 * The whole page is `components/landing/hire-page.tsx` rendered with this
 * skill's record; see `lib/home/hire-skills.ts` for the registry and
 * `lib/home/hire-skill.ts` for what a record holds.
 *
 * The server shell keeps the metadata, JSON-LD, Nav and Footer and draws the
 * tech stack; the bands themselves are rendered by `./sections`, a client
 * boundary that imports this page's own record (`lib/home/hire-skills/hire-nestjs-developers.ts`),
 * so the copy is in the document once rather than twice.
 */

const skill = hireSkill('hire-nestjs-developers');

export const revalidate = 300;

export const metadata: Metadata = hireMetadata(skill);

export default function HireNestjsDevelopersPage() {
  return <HirePage skill={skill} Sections={Sections} />;
}
