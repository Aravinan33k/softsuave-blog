'use client';

import { privacyPolicyBody, privacyPolicyHero } from '@/lib/home/privacy-policy-content';
import Listing from '@/components/landing/listing';
import LegalProse from '@/components/generative-ai/legal-prose';
import home from '@/components/home/home.module.css';

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
      <Listing content={privacyPolicyHero} id='top' />

      <div className={home.light}>
        <LegalProse content={privacyPolicyBody} />
      </div>
    </>
  );
}
