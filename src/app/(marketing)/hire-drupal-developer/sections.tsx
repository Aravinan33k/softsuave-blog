'use client';

import HireBands, { type HireSectionsProps } from '@/components/landing/hire-bands';
import { skill } from '@/lib/home/hire-skills/hire-drupal-developer';

/**
 * The page's bands, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead. Only this page's
 * own record is imported, never the `lib/home/hire-skills` registry, which carries all twenty.
 * The tech stack (tech-logo) and the overview photo (overview-images) stay on the server
 * and arrive as props from `HirePage`.
 */
export default function Sections({ techStack, overviewImage }: Readonly<HireSectionsProps>) {
  return <HireBands skill={skill} techStack={techStack} overviewImage={overviewImage} />;
}
