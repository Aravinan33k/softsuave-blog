import type { SectorPageContent } from './types';

export const healthtech: SectorPageContent = {
  key: 'healthtech',
  slug: '/ai-solutions-in-healthtech',
  name: 'HealthTech',
  capabilityTag: 'HealthTech',
  meta: {
    title: 'AI Solutions in HealthTech | Healthcare AI Development',
    description:
      'AI for healthcare: patient intake and risk assessment, clinical analysis and reporting, prescription safety and staff scheduling, engineered by Soft Suave.',
  },
  hero: {
    eyebrow: 'HealthTech',
    titleLines: ['AI solutions shaping', 'the future of healthcare'],
    body:
      'Unlock the power of AI to automate processes, generate insights, and revolutionize HealthTech. Powered by AI to accelerate digital transformation.',
    /**
     * The one sector still on its index card's portrait slot: the hand-placed
     * `sec-hero-healthtech` frame has not been made yet, and the other seven
     * switched to theirs. So this hero cover-crops an 800x1000 portrait into a
     * 4:3 frame and loses the sides — visibly tighter than its neighbours.
     * Swap to 'sec-hero-healthtech' the moment that frame lands.
     */
    img: 'ind-healthtech',
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'What we build for healthcare',
    body:
      'Clinical work carries a duty of care, so each of these is built to support a clinician’s decision rather than stand in for it.',
    items: [
      {
        name: 'AI-powered patient intake and risk assessment',
        body:
          'We help you streamline patient intake, automate pre-consultation data aggregation, and assess health risks early with AI-driven precision.',
      },
      {
        name: 'Intelligent clinical analysis and reporting',
        body:
          'Our solutions analyze medical data, generate detailed reports, and process images and documents with accuracy to support faster diagnoses.',
      },
      {
        name: 'Automated discharge and virtual patient support',
        body:
          'Our platform automates patient discharge, manages follow-ups, and offers AI-powered virtual assistants for handling common patient questions.',
      },
      {
        name: 'Smart decision support and prescription safety',
        body:
          'We enable clinical teams with AI that supports real-time decisions and flags prescription errors before they impact patient safety.',
      },
      {
        name: 'Optimized staff scheduling and resource management',
        body:
          'You can optimize workforce planning and resource allocation through our intelligent scheduling system tailored to dynamic healthcare environments.',
      },
    ],
  },
  proof: {
    eyebrow: 'Proof',
    title: 'HealthTech work we have shipped',
    body:
      'One study from this sector, with the figure the client measured. The rail beneath it is the company’s own record.',
    caseStudyKey: 'healthtech',
  },
  closing: {
    title: 'Put AI to work in your clinical workflows',
    body:
      'Bring us the workflow that costs your teams the most hours — intake, records, scheduling or reporting — and we will scope it with you.',
  },
};
