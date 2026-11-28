'use client';

import { businessManagementCaseStudy } from '@/lib/home/case-studies/custom-business-management-platform';
import CaseStudy from '@/components/case-study/case-study';

/**
 * The page's sections, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead.
 */
export default function Sections() {
  return (
    <>
      <CaseStudy
        content={businessManagementCaseStudy}
        idPrefix="case-study-custom-business-management-platform"
      />
    </>
  );
}
