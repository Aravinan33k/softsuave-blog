import type { Metadata } from 'next';

import { JsonLd } from '@/components/seo/json-ld';
import HireRolePage from '@/components/hire/hire-role-page';
import { forwardDeployed as content } from '@/lib/home/hire-roles';
import { hireRoleJsonLd, hireRoleMetadata } from '@/lib/home/hire-roles/page-meta';

/**
 * Hire Forward Deployed Engineers — the "Hire Developers by Role" template
 * applied to the Forward Deployed Engineering offer.
 *
 * A server component so the route can own its `metadata` and emit JSON-LD; the
 * animated sections underneath are the client components. The surrounding
 * `(marketing)` layout supplies the display fonts, the `.theme-four` tokens and
 * the Lenis `ScrollProvider`, exactly as it does for the homepage.
 *
 * Unlike the thirteen developer roles, this one is not in the nav's "Hire By
 * Role" panel — softsuave.com files it under Services, and `nav-menu.ts` is
 * hand-written, so registering it in `hire-roles` does not add it there.
 *
 * Everything about this page other than its copy lives in `HireRolePage`, which
 * all fourteen routes share; the copy is `lib/home/hire-roles/forward-deployed.ts`.
 */

// Matches the homepage/marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = hireRoleMetadata(content);

export default function HireForwardDeployedEngineerPage() {
  return (
    <>
      <JsonLd data={hireRoleJsonLd(content)} />
      <HireRolePage content={content} />
    </>
  );
}
