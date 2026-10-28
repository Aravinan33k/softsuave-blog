'use client';

import { safeOpsCaseStudy } from '@/lib/home/case-studies/safeops-ai-incident-management';
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
      <CaseStudy content={safeOpsCaseStudy} idPrefix="case-study-safeops-ai-incident-management" />
    </>
  );
}
