'use client';

import HireRoleBands, { type HireRoleServerProps } from '@/components/hire/hire-role-bands';
// This role's own module, not the `lib/home/hire-roles` barrel: the barrel holds
// all fourteen roles' copy, and the browser should get only this page's.
import { software as content } from '@/lib/home/hire-roles/software';

/**
 * The page's sections, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead. The technology
 * bands and the pipeline's photos arrive from the server shell (`HireRolePage`) as props:
 * see `HireRoleServerProps`.
 */
export default function Sections(props: HireRoleServerProps) {
  return <HireRoleBands content={content} {...props} />;
}
