import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/json-ld';
import HireRolePage from '@/components/hire/hire-role-page';
import { ios as content } from '@/lib/home/hire-roles';
import { hireRoleJsonLd, hireRoleMetadata } from '@/lib/home/hire-roles/page-meta';

/**
 * Hire iOS Developers — one of the thirteen "Hire Developers by Role" pages.
 *
 * Was a hire-by-skill page rendered from `lib/home/hire-skills`. softsuave.com
 * files it under "Hire By Role", and its live page runs the role sections —
 * why-hire cards, the four-step process, services and the FAQ — so it is a role
 * page here too, sharing `HireRolePage` with the other twelve.
 *
 * A server component so the route can own its `metadata` and emit JSON-LD; the
 * animated sections underneath are the client components.
 */

// Matches the homepage/marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = hireRoleMetadata(content);

export default function HireIosDevelopersPage() {
  return (
    <>
      <JsonLd data={hireRoleJsonLd(content)} />
      <HireRolePage content={content} />
    </>
  );
}
