/**
 * Which of softsuave.com's lead endpoints a form uses — for what the visitor has typed so far (the "incomplete"
 * save, `lib/leads/draft.ts`) and for the submitted lead (`/api/v1/enquiry`).
 *
 * The live PHP pages decide this per form, not per site, and not consistently (survey of the PHP pages, 23 Nov):
 *
 *   form on the live page                    saved while typing to        submitted to
 *   ---------------------------------------  ---------------------------  ------------------------------
 *   hero enquiry card ("contact-form")       upsertContactUsIncomplete    developer   (processDeveloperEmailForm)
 *   footer form ("footer_contact_form")      upsertFreeQuoteIncomplete    freeQuote   (processFreeQuotefooterEmailForm)
 *   case-study download dialog               upsertCaseStudyIncomplete    caseStudy   (sendEmailFormCaseStudy)
 *   contact page                             upsertContactUsIncomplete    contactUs   (processContactEmailForm)
 *   /free-quote                              upsertContactUsIncomplete    contactUs   (processServiceEmailForm)
 *
 * The defaults below follow that table; `PAGE_OVERRIDES` carries the pages whose live forms differ.
 */

export type DraftType = 'developer' | 'contactUs' | 'freeQuote' | 'caseStudy';
export type SubmitType = 'developer' | 'contactUs' | 'freeQuote';

export type LeadRouting = { draft: DraftType; submit: SubmitType };

/** Where a form sits: the page's hero card, or the closing "Book Free Consultation" band (the live footer form). */
export type FormSlot = 'hero' | 'close';

const BY_SLOT: Record<FormSlot, LeadRouting> = {
  hero: { draft: 'contactUs', submit: 'developer' },
  close: { draft: 'freeQuote', submit: 'freeQuote' },
};

/** Pages whose live form used other endpoints than its slot's default. Keyed by path, then slot. */
const PAGE_OVERRIDES: Record<string, Partial<Record<FormSlot, LeadRouting>>> = {
  '/contact': { hero: { draft: 'contactUs', submit: 'contactUs' } },
  '/free-quote': { hero: { draft: 'contactUs', submit: 'contactUs' } },
};

/** The endpoints for a form at `slot` on `path`. A case-study download form always uses the case-study pair. */
export function leadRouting(path: string, slot: FormSlot = 'hero', caseStudy = false): LeadRouting | { draft: 'caseStudy'; submit: 'caseStudy' } {
  if (caseStudy) return { draft: 'caseStudy', submit: 'caseStudy' };
  const clean = path.replace(/\/+$/, '') || '/';
  return PAGE_OVERRIDES[clean]?.[slot] ?? BY_SLOT[slot];
}

/** The `sessionStorage` key the live pages keep each type's row id under — shared, so a visit that moves between
 *  PHP pages and these pages keeps updating one row. */
export const DRAFT_ID_KEY: Record<DraftType, string> = {
  developer: 'developerUniqueId',
  contactUs: 'contactUniqueId',
  freeQuote: 'freeQuoteUniqueId',
  caseStudy: 'caseStudyUniqueId',
};
