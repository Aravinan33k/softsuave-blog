import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/json-ld';
import HireRolePage from '@/components/hire/hire-role-page';
import { frontend as content } from '@/lib/home/hire-roles';
import { hireRoleJsonLd, hireRoleMetadata } from '@/lib/home/hire-roles/page-meta';

/**
 * Hire Frontend Developers — one of the nine "Hire Developers by Role" pages.
 *
 * A server component so the route can own its `metadata` and emit JSON-LD; the
 * animated sections underneath are the client components. The surrounding
 * `(marketing)` layout supplies the display fonts, the `.theme-four` tokens and
 * the Lenis `ScrollProvider`, exactly as it does for the homepage.
 *
 * Everything about this page other than its copy lives in `HireRolePage`, which
 * all nine routes share; the copy is `lib/home/hire-roles/frontend.ts`.
 */

// Matches the homepage/marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = hireRoleMetadata(content);

export default function HireFrontendDevelopersPage() {
  return (
    <>
      <JsonLd data={hireRoleJsonLd(content)} />
      <HireRolePage content={content} />
    </>
  );
}
