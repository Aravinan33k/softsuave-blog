/**
 * Content for `/hire-salesforce-developer`.
 *
 * Source: softsuave.com/hire-salesforce-developer, and nothing else.
 *
 *   hero         → "Hire Salesforce Developers On Contract"
 *   whyRole      → "Why Hire Salesforce Developers from Soft Suave"
 *   process      → "Steps to Hire a Salesforce Developer"
 *   techStack    → "Technical Expertise of Our Salesforce Developers" (13 groups)
 *   capabilities → "Salesforce Development Services We Offer" (8 cards)
 *   fit          → "How We Vet and Onboard Top Salesforce Developers"
 *   comparison   → "Choosing the Right Salesforce Partner for Your Specific Needs"
 *   faq          → the six questions, verbatim
 *
 * The live page runs no overview prose block and no mid-page rate band, so this
 * module has neither. Its eighth service card, "Ongoing Support & Maintenance",
 * is published with the seventh card's migration text pasted into it; the card
 * below keeps its title and takes its description from this same page's own FAQ
 * answer on support and maintenance, rather than repeating the migration copy.
 */

import type { HireRolePageContent } from './types';
import { heroForm, onboardingComparison } from './shared';

export const salesforce: HireRolePageContent = {
  key: 'hire-salesforce',
  slug: '/hire-salesforce-developer',
  name: 'Hire Salesforce Developers',
  serviceType: 'Salesforce development staffing',

  /** Live order: clients, why hire, hiring steps, technical expertise, services, vetting, comparison, testimonials, FAQ. */
  order: [
    'clients',
    'whyRole',
    'process',
    'techStack',
    'capabilities',
    'fit',
    'comparison',
    'testimonials',
    'faq',
  ],

  meta: {
    title: 'Hire Salesforce Developers | 40-Hr Trial – Soft Suave',
    description:
      'Hire pre-vetted Salesforce developers skilled in Apex, Lightning Web Components, Sales Cloud and Service Cloud customization, matched within 48 hours.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire Salesforce Developers', 'On Contract'],
    body: [
      "Soft Suave provides pre-vetted Salesforce developers skilled in Apex, Lightning Web Components, Sales Cloud and Service Cloud customization, matched to your project within 48 hours. Every engagement starts with a 40-hour risk-free trial, with rates from $14/hour and no long-term contract required until you're satisfied.",
    ],
    points: [
      '40-Hour Risk-Free Trial',
      'Hire Top Salesforce Developers in India',
      'Time-Zone & Language Aligned Teams',
      'Airtight NDA & IP Protection',
      'Strong Delivery Governance from Day One',
    ],
    badges: ['*Satisfaction Guaranteed – Get 40-hour Free Trial'],
    form: heroForm({
      title: 'Get Skilled Remote Developers',
      requirementLabel: 'Requirements',
      requirementPlaceholder:
        'Your Salesforce org, the clouds in use, the customization or integration work involved, and when you need to start.',
      subject: 'Salesforce developer hiring enquiry',
    }),
  },

  whyRole: {
    eyebrow: 'Why Us',
    title: 'Why Hire Salesforce Developers from Soft Suave',
    body: 'We provide experienced Salesforce developers to offer world-class service for your business. Put our experience to work and get the results that count.',
    items: [
      {
        key: 'vetted',
        name: 'Pre-vetted Salesforce developers',
        body: 'Get access to a pre-vetted group of Salesforce developers who can give you the best quality possible.',
      },
      {
        key: 'models',
        name: 'Flexible hiring models',
        body: 'Select from various hiring options to fit your project needs and scale your resources as required.',
      },
      {
        key: 'standards',
        name: 'Global delivery standards',
        body: 'Our Developers adhere to international standards to produce quality and consistent solutions that meet international benchmarks and expectations.',
      },
      {
        key: 'nda',
        name: 'Strict NDA & IP protection',
        body: 'Our policy on NDA and IP protection is strict so that your proprietary information and ideas are kept safe.',
      },
      {
        key: 'timezone',
        name: 'Time Zone Flexibility',
        body: 'Take advantage of 4-6 hours of overlapping working hours to get continuous cooperation and accelerate project completion.',
      },
      {
        key: 'rates',
        name: 'World-Class Developers at Budget-Friendly Rates',
        body: 'Hire world-class developers through our offshore software development services, offering high-quality expertise at competitive, budget-friendly rates.',
      },
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'Steps to Hire a Salesforce Developer',
    body: "Hiring the right Salesforce developer is simple with Soft Suave. Here's the 4-step process we use to streamline the process for your convenience and success.",
    steps: [
      {
        n: '01',
        name: 'Share the JD',
        body: 'Provide a comprehensive job description so that we understand what you want and locate the best match for your project.',
      },
      {
        n: '02',
        name: 'Shortlist The Right Developers',
        body: 'We carefully review candidates to shortlist top developers with the right skills, experience, and alignment to your needs.',
      },
      {
        n: '03',
        name: 'Free 40-hour Trial',
        body: 'Get to know our developers by taking a free 40-hour trial to be sure that they are the right person to take on your project.',
      },
      {
        n: '04',
        name: 'Onboard & Manage',
        body: 'Seamlessly onboard your developer and manage ongoing tasks, with our support ensuring smooth collaboration and high productivity throughout.',
      },
    ],
  },

  capabilities: {
    eyebrow: 'Services',
    title: 'Salesforce Development Services We Offer',
    body: 'We are a one-stop solution for all your Salesforce development needs, including developing apps, seamless integration, and more, providing end-to-end solutions to your business.',
    items: [
      {
        name: 'Salesforce Consulting',
        body: 'Professional Salesforce consulting to assess, plan, and implement solutions to support company growth and optimize operations.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Advanced Salesforce Cloud Services',
        body: 'Expert Salesforce cloud services that take advantage of the newest functionality, increasing scalability, access, and cooperation throughout your company.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Tailored Salesforce Solutions',
        body: 'Bespoke Salesforce solutions built to meet your specific business requirements, streamline operations, and achieve long-term success.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'Salesforce App Development',
        body: 'Bespoke Salesforce applications developed to meet the specifications of your business, providing a well-integrated system, user-friendly interface, and better user experience.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Salesforce Customization',
        body: 'Salesforce customization allows you to fulfill your particular business needs and assist you in increasing productivity and efficiency.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        name: 'Third-Party Integrations',
        body: 'Seamless connectivity with Salesforce third parties, so the information between systems flows smoothly to increase operational efficiency at all levels.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Salesforce Migration',
        body: 'Simple and safe migration to Salesforce, making sure that the data is intact and no downtime is faced when switching from your legacy systems to Salesforce.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'Ongoing Support & Maintenance',
        body: 'Developers provide continuous support and maintenance to keep your Salesforce solution running efficiently after go-live.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  fit: {
    eyebrow: 'Vetting & Onboarding',
    title: 'How We Vet and Onboard Top Salesforce Developers',
    body: 'We meticulously vet every developer to ensure they meet your technical and cultural expectations, ensuring a seamless and effective collaboration from day one.',
    columns: ['Stage', 'What it involves'],
    rows: [
      {
        problem: 'Rigorous talent sourcing',
        solution:
          'We source top-tier talent through a meticulous process, ensuring only the best fit for your needs.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'In-depth skill assessment',
        solution:
          'Thorough skill assessments guarantee developers possess the expertise and experience required to excel in your projects.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        problem: 'Thinkers & Innovators',
        solution:
          'Our developers are creative thinkers and innovators, solving complex challenges with cutting-edge, efficient solutions.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        problem: 'Cultural fit & adaptability',
        solution:
          'We ensure every developer seamlessly integrates with your team, adapting to your culture and work style.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
    ],
  },

  comparison: onboardingComparison({
    title: 'Choosing the Right Salesforce Partner for Your Specific Needs',
    body: 'Selecting the appropriate Salesforce partner will make you successful. Our developers have reliability, expertise, and scalability that in-house devs and freelancers cannot match. The following brief comparison will help you make a decision.',
    column: 'Soft Suave',
  }),

  techStack: {
    eyebrow: 'Expertise',
    title: 'Technical Expertise of Our Salesforce Developers',
    body: "The technical expertise of our developers guarantees that your Salesforce platform is not only powerful but also scalable in the long term. Here's a list of technologies that our developers are proficient in.",
    groups: [
      {
        name: 'Front End',
        items: [
          'Lightning Web Components (LWC)',
          'Aura/Lightning Components',
          'Visualforce',
          'JavaScript',
          'HTML/CSS',
          'User Interface (UI) Design',
        ],
      },
      {
        name: 'Back End',
        items: [
          'Apex Programming',
          'SOQL/SOSL',
          'Integration (REST/SOAP API)',
          'Data Modeling',
          'Batch Classes & Scheduling',
          'Workflow & Triggers',
          'Security Practices',
        ],
      },
      {
        name: 'Automation',
        items: ['Flow Builder', 'Process Builder', 'Validation Rules', 'Approval Processes'],
      },
      {
        name: 'Data',
        items: ['Data Migration', 'Data Management', 'Data Analytics & Reporting'],
      },
      {
        name: 'Integration',
        items: ['External System Integration', 'Salesforce Connect'],
      },
      {
        name: 'Testing & Debugging',
        items: ['Unit Testing (Apex, UI)', 'Debug Logs & Error Handling'],
      },
      {
        name: 'DevOps',
        items: [
          'Version Control (Git)',
          'Deployment Tools (Salesforce DX)',
          'Change Sets',
          'CI/CD Pipelines',
        ],
      },
      {
        name: 'Cloud/Platform',
        items: [
          'Platform Events & Pub/Sub',
          'Salesforce Communities',
          'AppExchange Package Development',
        ],
      },
      {
        name: 'Architecture',
        items: ['Solution & System Design', 'Multi-Org Strategy'],
      },
      {
        name: 'Business Analysis',
        items: ['Business Process Mapping', 'Requirements Gathering'],
      },
      {
        name: 'Soft Skills',
        items: ['Communication', 'Problem Solving', 'Analytical Thinking', 'Team Collaboration'],
      },
      {
        name: 'Documentation',
        items: ['User Training', 'Technical Documentation'],
      },
      {
        name: 'Industry Knowledge',
        items: ['CRM Best Practices', 'Cloud Computing Concepts'],
      },
    ],
  },

  faq: {
    eyebrow: 'FAQs',
    title: 'FAQs About Hiring Salesforce Developers',
    body: 'Find answers to your most frequent questions on hiring Salesforce developers.',
    items: [
      {
        q: 'How much does it cost to hire a Salesforce developer?',
        a: 'Rates start from $14/hour for a dedicated offshore hire, in line with the $25-$40/hour range Upwork reports for Salesforce developers ($30/hour median). Final pricing depends on project scope - every engagement starts with a 40-hour risk-free trial before you commit.',
      },
      {
        q: 'Is there a free trial period available?',
        a: 'Yes. We offer a risk-free 40-hour trial to ensure the right fit for your project before full-scale commitment.',
      },
      {
        q: 'What Salesforce skills and technologies do your developers specialize in?',
        a: 'Developers are skilled in Lightning Web Components (LWC), Apex programming, SOQL/SOSL, Flow Builder automation, REST/SOAP API integrations, and Sales Cloud/Service Cloud customization.',
      },
      {
        q: 'What hiring engagement options are available at Soft Suave?',
        a: 'Choose from fixed price, time and material, or managed services models, tailored to your business needs.',
      },
      {
        q: 'Do you provide support and maintenance after deployment?',
        a: 'Yes — developers provide continuous support and maintenance to keep your Salesforce solution running efficiently after go-live.',
      },
      {
        q: "What happens if the Salesforce developer isn't the right fit?",
        a: 'You can request a replacement developer at no extra cost during or after the trial period, re-matched based on your feedback.',
      },
    ],
  },
};
