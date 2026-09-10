import type { SectorPageContent } from './types';

export const telecom: SectorPageContent = {
  key: 'telecom',
  slug: '/ai-solutions-for-telecom',
  name: 'Telecom',
  capabilityTag: 'Telecom',
  meta: {
    title: 'AI Solutions for Telecom | Network AI Development',
    description:
      'AI for telecom: network optimization, predictive maintenance, automated fault resolution, fraud detection and revenue assurance, engineered by Soft Suave.',
  },
  hero: {
    eyebrow: 'Telecom',
    titleLines: ['Enhancing telecom', 'efficiency with AI'],
    body:
      'From network optimization and predictive maintenance to fraud detection and customer service, AI streamlines telecom operations for unmatched efficiency and peak performance.',
    img: 'ind-telecom',
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'What we build for network operators',
    body: 'Five solution families, from the network layer up to the customer’s bill.',
    items: [
      {
        name: 'Network optimization and predictive maintenance',
        body:
          'We optimize network performance and enable predictive maintenance for infrastructure to ensure efficient traffic management and minimal downtime.',
      },
      {
        name: 'Automated fault detection and smart resolution',
        body:
          'Our AI automates fault detection and resolution processes, reducing manual intervention and speeding up recovery to maintain seamless connectivity.',
      },
      {
        name: 'Fraud detection and revenue assurance',
        body:
          'Using AI, we provide real-time fraud detection, prevention, and intelligent billing for accurate, secure, and assured revenue management.',
      },
      {
        name: 'AI-powered customer support and personalization',
        body:
          'We enhance user satisfaction through AI-powered customer support and personalized user experiences tailored to individual needs and behaviors.',
      },
      {
        name: 'Intelligent automation and service efficiency',
        body:
          'We leverage AI-driven automation across operations, including billing, network traffic, and maintenance, to boost telecom service speed and efficiency.',
      },
    ],
  },
  proof: {
    eyebrow: 'Proof',
    title: 'The bench behind the build',
    body:
      'We publish figures for the company rather than per sector. The same engineers, and the same delivery model, stand behind every system on this page.',
    caseStudyKey: null,
  },
  closing: {
    title: 'Make your network operations self-aware',
    body:
      'Faults, traffic, fraud or billing — tell us which one costs you most, and we will scope the team and the first release.',
  },
};
