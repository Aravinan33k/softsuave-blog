import type { Metadata } from 'next';
import HirePage, { hireMetadata } from '@/components/landing/hire-page';
import { hireSkill } from '@/lib/home/hire-skills';

/**
 * "hire-cms-developer" — one of the hire-by-skill landing pages.
 *
 * The whole page is `components/landing/hire-page.tsx` rendered with this
 * skill's record; see `lib/home/hire-skills.ts` for the registry and
 * `lib/home/hire-skill.ts` for what a record holds.
 */

const skill = hireSkill('hire-cms-developer');

export const revalidate = 300;

export const metadata: Metadata = hireMetadata(skill);

export default function HireCmsDeveloperPage() {
  return <HirePage skill={skill} />;
}
