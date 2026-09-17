/**
 * Content for `/hire-ai-developer`.
 *
 * Source: softsuave.com/hire-ai-developer, and nothing else. This is one of the
 * older role pages, and it is shorter than the rest: no technology grid, no
 * engagement-model band, no global-delivery section, and a single flat list of
 * technologies rather than grouped ones. Those sections are left out instead of
 * being written for it.
 *
 *   hero         → "Hire AI Developers in India On contract"
 *   whyRole      → "Why Hire AI Developers from Soft Suave" (6 cards)
 *   capabilities → "AI Development Services We Offer" (6 services)
 *   fit          → "How We Vet and Onboard Top AI Developers" (4 stages)
 *   process      → "Steps to Hire an AI Developer" (4 steps)
 *   comparison   → "Choosing the Right AI Partner for Your Specific Needs"
 *   techStack    → "Technical Expertise of Our AI Developers"
 *   faq          → the five questions, verbatim
 *
 * It runs no overview prose block and no mid-page rate band either, so this
 * module has neither.
 */

import type { HireRolePageContent } from './types';
import { heroForm, onboardingComparison } from './shared';

export const ai: HireRolePageContent = {
  key: 'hire-ai',
  slug: '/hire-ai-developer',
  name: 'Hire AI Developers',
  serviceType: 'AI development staffing',

  /** Live order: clients, why hire, hiring steps, technical expertise, services, vetting, comparison, testimonials, FAQ. No overview prose block. */
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
    title: 'Hire AI Developers India for Generative AI Development',
    description:
      'Hire pre-vetted AI developers in India for Generative AI, LLMs, NLP, machine learning, computer vision, chatbots, and automation. 40-hour risk-free trial.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire AI Developers', 'in India On contract'],
    body: [
      'Soft Suave offers Indian AI developers without the long hiring cycles. We are a specialized agency that connects you with pre-vetted experts in Generative AI, LLMs, NLP, Machine Learning, computer vision, AI chatbots, and automation systems — contract-ready and onboarded fast.',
      'See why businesses choose Soft Suave for their AI developers hiring.',
    ],
    points: [
      '40-Hour Risk-Free Trial',
      'Hire Top AI Developers in India',
      'Time-Zone & Language Aligned Teams',
      'Airtight NDA & IP Protection',
      'Strong Delivery Governance from Day One',
    ],
    badges: ['*Satisfaction Guaranteed – Get 40-hour Free Trial'],
    form: heroForm({
      title: 'Get Skilled Remote Developers',
      requirementLabel: 'Requirements',
      requirementPlaceholder:
        'The AI work you need — models, data, integrations, responsibilities — and when you need to start.',
      subject: 'AI developer hiring enquiry',
    }),
  },

  whyRole: {
    eyebrow: 'Why Us',
    title: 'Why Hire AI Developers from Soft Suave',
    body: "At Soft Suave, we deliver AI visionaries who collaborate as partners, not just coders. Here's why businesses around the world trust us to hire remote AI developers for their projects.",
    items: [
      {
        key: 'vetted',
        name: 'Pre-vetted AI developers',
        body: "Our developers undergo thorough vetting to guarantee exceptional skills, reliable delivery, and complete dedication to your project's success.",
      },
      {
        key: 'models',
        name: 'Flexible hiring models',
        body: 'Easily hire dedicated AI developers & scale your team with flexible hiring models that adapt to your needs and timeline.',
      },
      {
        key: 'standards',
        name: 'Global delivery standards',
        body: 'Our team embraces agile methodologies and adheres to global best practices to ensure top-quality results every time.',
      },
      {
        key: 'nda',
        name: 'Strict NDA & IP protection',
        body: 'Your ideas remain secure. We enforce strict confidentiality agreements and safeguard your intellectual property.',
      },
      {
        key: 'timezone',
        name: 'Time Zone Flexibility',
        body: 'With a 4-6 hour overlap with your time zone, our developers ensure smooth, real-time communication and collaboration, wherever you are.',
      },
      {
        key: 'rates',
        name: 'World-Class Developers at Budget-Friendly Rates',
        body: 'Hire offshore AI developer talent at competitive rates & ensure you get exceptional skills while maximizing cost efficiency.',
      },
    ],
  },

  capabilities: {
    eyebrow: 'Services',
    title: 'AI Development Services We Offer',
    body: 'From Generative AI development to fine-tuning LLMs, we provide comprehensive, end-to-end solutions that empower your business to unlock the full potential of AI, driving innovation and growth. As a leading offshore software development company, we help businesses worldwide hire offshore AI developer teams to scale quickly and cost-effectively.',
    items: [
      {
        name: 'Generative AI',
        body: 'Harnessing the power of GPT-4, Midjourney, and DALL·E, we create groundbreaking solutions that generate creative content, streamline processes, and enhance customer experiences, making AI work smarter for your business.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Machine Learning',
        body: 'Through advanced techniques like supervised, unsupervised, and reinforcement learning, our systems optimize performance, automate decision-making, and enhance efficiency, enabling you to leverage data for smarter business outcomes and growth.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'Natural Language Processing',
        body: 'We power intelligent chatbots, voice assistants, and advanced text analytics, enabling machines to understand, interpret, and respond to human language, driving better user engagement and seamless interactions.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'LLM Fine-Tuning',
        body: 'We specialize in tailoring large language models (LLMs) to specific industries and tasks, enhancing performance in niche domains, ensuring better accuracy, and solving unique challenges for your business needs.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        name: 'Predictive Analysis',
        body: 'By using robust machine learning models, we predict future trends with precision, helping businesses make data-driven decisions, mitigate risks, and seize opportunities, ensuring a competitive edge in fast-changing markets.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Computer Vision',
        body: 'At Soft Suave, we provide cutting-edge computer vision technology to analyze and interpret images and videos, unlocking insights for industries ranging from security to healthcare, enhancing automation, accuracy, and real-time decision-making.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
    ],
  },

  fit: {
    eyebrow: 'Vetting & Onboarding',
    title: 'How We Vet and Onboard Top AI Developers',
    body: 'We select only the finest AI developers for your project who are agile, dependable, and experienced in delivering robust, high-performance code under tight deadlines and complex project requirements.',
    columns: ['Stage', 'What it involves'],
    rows: [
      {
        problem: 'Rigorous talent sourcing',
        solution: "We don't wait - we recruit elite AI developers from competitive tech markets.",
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'In-depth skill assessment',
        solution:
          'Our vetting includes challenging live coding tasks and deep technical evaluations to prove their expertise.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        problem: 'Thinkers & Innovators',
        solution:
          'We hire engineers who are thinkers as well as team collaborators, not just coders.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        problem: 'Cultural fit & adaptability',
        solution:
          'Our candidates are adaptable, proactive, and culturally aligned with your working environment.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'Steps to Hire an AI Developer',
    body: 'Quick, streamlined, and customized: hire expert AI developers effortlessly with our proven 4-step method.',
    steps: [
      {
        n: '01',
        name: 'Share the JD',
        body: 'Share the details regarding your project and the type of AI developers you wish to employ.',
      },
      {
        n: '02',
        name: 'Shortlist The Right Developers',
        body: 'Review and shortlist from a curated list of top developers that fit your specific needs.',
      },
      {
        n: '03',
        name: 'Free 40-hour Trial',
        body: "Test our developers' skills through a risk-free 40-hour trial period.",
      },
      {
        n: '04',
        name: 'Onboard & Manage',
        body: 'Finalize paperwork (SLA & NDA) & integrate your chosen developer with your internal team.',
      },
    ],
  },

  comparison: onboardingComparison({
    title: 'Choosing the Right AI Partner for Your Specific Needs',
    body: 'Make an informed decision - compare hiring models like freelancers, in-house teams, or our vetted developers. Our comparison guide makes it easy.',
    column: 'Soft Suave',
  }),

  techStack: {
    eyebrow: 'Technical Expertise',
    title: 'Technical Expertise of Our AI Developers',
    body: 'Our AI developers excel in machine learning, deep learning, NLP, computer vision, and more, delivering innovative solutions tailored to your needs.',
    groups: [
      {
        name: 'AI & Machine Learning',
        items: [
          'Python',
          'SpaCy',
          'PyTorch',
          'PySpark',
          'Pandas',
          'MediaPipe',
          'Keras',
          'Google Cloud Vision',
          'Azure ML',
          'OpenCV',
          'TensorFlow',
          'OpenPose',
          'NLTK',
          'Scikit-learn',
          'Google BERT',
          'ChatGPT',
        ],
      },
    ],
  },

  faq: {
    eyebrow: 'FAQs',
    title: 'FAQs About Hiring AI Developers',
    body: 'Learn more about our procedures & methods with the help of these FAQs.',
    items: [
      {
        q: 'How much does it cost to hire AI developer?',
        a: "Costs depend on the developer's experience, project scope, tech stack, etc. At Soft Suave, we offer flexible pricing starting from $14/hour, ensuring top value for your investment.",
      },
      {
        q: 'Is there any free trial period available?',
        a: 'Absolutely! Try our developers with a 40-hour trial - 100% risk-free.',
      },
      {
        q: 'What are the hiring engagement options available at Soft Suave?',
        a: 'Choose from time and material, fixed-cost, or fully managed service models.',
      },
      {
        q: 'Do you provide support and maintenance services after deployment?',
        a: 'Yes, we ensure your app thrives with continuous support, maintenance, and optimization.',
      },
      {
        q: 'Where can you find an AI Engineer?',
        a: 'You can find top-tier talent and knowledgeable AI developers right here at Soft Suave.',
      },
    ],
  },
};
