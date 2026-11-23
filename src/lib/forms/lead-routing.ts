/**
 * Which of softsuave.com's lead endpoints a form uses — for what the visitor has typed so far (the "incomplete"
 * save, `lib/leads/draft.ts`) and for the submitted lead (`/api/v1/enquiry`).
 *
 * Taken from the old PHP pages themselves (scan of /var/www/newhtml, 23 Nov, commented-out buttons ignored). Every
 * form saves and submits to the SAME type; which type depends on the form and, for the hero card, on the page:
 *
 *   footer form ("footer_contact_form", 183 pages)   freeQuote   (handleFieldBlurFreeQuote / processFreeQuotefooterEmailForm)
 *   hero card on the 61 pages in CONTACT_US_HERO      contactUs   (handleFieldBlurContactUs / processServiceEmailForm)
 *   hero card everywhere else (55 pages and /contact) developer   (handleFieldBlur / processDeveloperEmailForm)
 *   case-study download                               caseStudy   (handleFieldBlurCaseStudy / sendEmailFormCaseStudy)
 *
 * Pages that had no hero form on the old site (case studies, industry pages, the homepage …) and the pages new to this
 * site use the developer pair, which is where every lead of these pages went before the per-form routing.
 */

export type DraftType = 'developer' | 'contactUs' | 'freeQuote' | 'caseStudy';
export type SubmitType = 'developer' | 'contactUs' | 'freeQuote';

export type LeadRouting = { draft: DraftType; submit: SubmitType };

/** Where a form sits: the page's hero card, or the closing "Book Free Consultation" band (the live footer form). */
export type FormSlot = 'hero' | 'close';

/** Pages whose old hero form used the contact-us pair (processServiceEmailForm). */
const CONTACT_US_HERO: ReadonlySet<string> = new Set([
  '/30-min-free-consultation',
  '/ad/android-development-company',
  '/ad/app-development-company-india',
  '/ad/hire-full-stack-developers',
  '/ad/hire-java-developers',
  '/ad/hire-remote-developers-india',
  '/ad/ios-development-company',
  '/ad/mvp-development',
  '/ad/on-demand-app-development-company',
  '/android-application-development-company',
  '/angularjs-development-company',
  '/cloud-computing',
  '/construction-project-management-software',
  '/cross-platform-application-development-company',
  '/dot-net-application-development-company',
  '/ecommerce-mobile-app-development-company',
  '/education-app-development-company',
  '/flutter-application-development-company',
  '/free-7-days-trial',
  '/free-demo-app',
  '/free-quote',
  '/generative-ai-integration-services',
  '/healthcare-mobile-app-development-company',
  '/ionic-app-development-company',
  '/ios-application-development-company',
  '/it-outsourcing-company-india',
  '/it-staff-augmentation-services',
  '/java-application-development-company',
  '/legacy-modernization-services',
  '/low-code-development-company',
  '/magento-development',
  '/mobile-app-development-company-dubai',
  '/mobile-app-development-company-germany',
  '/mobile-app-development-company-italy',
  '/mobile-app-development-company-maryland',
  '/mobile-app-development-company-poland',
  '/mobile-app-development-company-saudi-arabia',
  '/mobile-app-development-company-south-africa',
  '/mobile-application-development-company',
  '/multi-vendor-marketplace-platform',
  '/nodejs-development-company',
  '/offshore-software-development-company',
  '/payment-gateway-integration-services',
  '/php-application-development-company',
  '/pos-software-development-company',
  '/product-engineering-services',
  '/python-application-development-company',
  '/react-native-app-development-company',
  '/reactjs-app-development-company',
  '/real-estate-crm-software-development',
  '/retail-solutions',
  '/ruby-on-rails-development-company',
  '/software-development-company',
  '/software-development-company-france',
  '/software-development-company-germany',
  '/software-development-company-spain',
  '/swift-app-development-company',
  '/video-call-app-development-company',
  '/web-application-development-company',
  '/wordpress-development-company',
  '/xamarin-app-development-company',
]);

/** The endpoints for a form at `slot` on `path`. A case-study download form always uses the case-study pair. */
export function leadRouting(path: string, slot: FormSlot = 'hero', caseStudy = false): LeadRouting | { draft: 'caseStudy'; submit: 'caseStudy' } {
  if (caseStudy) return { draft: 'caseStudy', submit: 'caseStudy' };
  if (slot === 'close') return { draft: 'freeQuote', submit: 'freeQuote' };
  const clean = path.replace(/\/+$/, '') || '/';
  return CONTACT_US_HERO.has(clean) ? { draft: 'contactUs', submit: 'contactUs' } : { draft: 'developer', submit: 'developer' };
}

/** The `sessionStorage` key the live pages keep each type's row id under — shared, so a visit that moves between
 *  PHP pages and these pages keeps updating one row. */
export const DRAFT_ID_KEY: Record<DraftType, string> = {
  developer: 'developerUniqueId',
  contactUs: 'contactUniqueId',
  freeQuote: 'freeQuoteUniqueId',
  caseStudy: 'caseStudyUniqueId',
};
