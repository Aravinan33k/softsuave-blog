/**
 * The id softsuave.com files each case study under — what its download form sends to its own case-study endpoint
 * as `caseStudyType` (the `id` of the page's `#consult_Popup` dialog), keyed by the PDF's file name.
 *
 * The live page does not hand the PDF over in the browser: it posts the visitor's details with this id, and the
 * server e-mails the visitor the case study. Read from each live case study page; two pages
 * (`revitalizing-ai-in-healthcare.pdf`, `personalized-ecommerce-platform.pdf`) share the live id "heaps".
 */
export const CASE_STUDY_IDS: Readonly<Record<string, string>> = {
  "AI_Assist_Logistics_Case_Study.pdf": "AI_ASSIST_LOGISTICS_ONBOARDING",
  "BrandForge_case_study.pdf": "BRANDFORGE",
  "HireVoice_case_study.pdf": "HIREVOICE",
  "Job-progress-tracking-platform.pdf": "JOB_PROGRESS_TRACKING_PLATFORM",
  "MarketMind_Case_Study.pdf": "MARKETMIND_AI_MARKET_INTELLIGENCE",
  "Neurora_Labs_case_study.pdf": "NEURORA_BEHAVIORAL_INTELLIGENCE",
  "PostGuard_case_study.pdf": "POSTGUARD",
  "SafeOps_Case_Study.pdf": "SAFEOPS_AI_INCIDENT_MANAGEMENT",
  "ShiftSense_Case_Study.pdf": "SHIFTSENSE_AI_SHIFT_INTELLIGENCE",
  "Tender_Intelligence_Case_Study.pdf": "TENDER_INTELLIGENCE",
  "Vehicle_Intelligence_Case_Study.pdf": "VEHICLE_INTELLIGENCE_PLATFORM",
  "WellPet_Case_Study.pdf": "WELLPET_AI_SMART_WELLNESS_PLATFORM",
  "abcd.pdf": "abcd",
  "area-mapping-solution.pdf": "AREA_MAPPING_SOLUTION",
  "azzetta.pdf": "azzetta",
  "blockchain-powered-digital-currency-platform.pdf": "omnumi",
  "business-operations-with-custom-management-platform.pdf": "utiliko",
  "chat-for-ai.pdf": "chat-for-ai",
  "cloud-integrated-campus-management-system.pdf": "camu",
  "comprehensive-ecommerce-solution.pdf": "poorvika",
  "corporate-banking-solution.pdf": "corporate_banking_solution",
  "crm-software-for-realestate-management.pdf": "CRM_SOFTWARE_FOR_REALESTATE_MANAGEMENT",
  "cyber-threat-detection-with-ai.pdf": "enigma",
  "cybersecurity-ai.pdf": "cybersecurity-ai",
  "digital-advertisements-in-public-spaces.pdf": "bulletin",
  "digital-banking-solution.pdf": "DIGITAL_BANKING_SOLUTION",
  "eaglebot.pdf": "eaglebot",
  "education-through-ai-solutions.pdf": "socrat",
  "elevating-learning-management-system.pdf": "esense",
  "hsbc.pdf": "hsbc",
  "igtb.pdf": "igtb",
  "improving-workflow-in-restaurant.pdf": "milagro",
  "legal-violation-tracking-application.pdf": "LEGAL_VIOLATION_TRACKING_APPLICATION",
  "logistics-ride-hailing-application.pdf": "LOGISTICS_RIDE_HAILING_APPLICATION",
  "montycloud.pdf": "montycloud",
  "movie-ticketing-with-real-time-booking.pdf": "influx",
  "online-consultation-app-for-doctors.pdf": "ONLINE_CONSULTATION_APP_FOR_DOCTORS",
  "online-shopping-with-effortless-transactions.pdf": "unipick",
  "parkinghero.pdf": "parkinghero",
  "personalized-ecommerce-platform.pdf": "heaps",
  "phoenix.pdf": "phoenix",
  "quber.pdf": "quber",
  "revitalizing-ai-in-healthcare.pdf": "heaps",
  "salesforce-telephone-app-integration.pdf": "SALESFORCE_TELEPHONE_APP_INTEGRATION",
  "scalable-delivery-management-solution.pdf": "translytix",
  "shipment-tracking-for-global-logistics.pdf": "trames",
  "signedge.pdf": "signedge",
  "standardize-product-inspection.pdf": "product_inspection",
  "syme.pdf": "syme",
  "telehealth-app-for-doctor-consultation.pdf": "TELEHEALTH_APP_FOR_DOCTOR_CONSULTATION",
  "ticket-management-system.pdf": "TICKET_MANAGEMENT_SYSTEM",
  "tnq.pdf": "tnq",
  "tnsdc.pdf": "tnsdc",
  "tradesocio.pdf": "tradesocio",
  "transformed-project-workflows.pdf": "outsource_consultants",
  "urmilla.pdf": "urmilla",
  "web-scrapping-solution.pdf": "WEB_SCRAPPING_SOLUTION",
};

/** The live id for a case study's PDF path (`/assets/case-studies/x.pdf`), or null when the PDF is not one of ours. */
export function caseStudyIdFor(pdfPath: string): string | null {
  return BY_FILE.get(pdfPath.slice(pdfPath.lastIndexOf('/') + 1).toLowerCase()) ?? null;
}

/** File names compared without regard to case: live's `BrandForge_case_study.pdf` is our `BrandForge_Case_Study.pdf`. */
const BY_FILE = new Map(Object.entries(CASE_STUDY_IDS).map(([file, id]) => [file.toLowerCase(), id]));
