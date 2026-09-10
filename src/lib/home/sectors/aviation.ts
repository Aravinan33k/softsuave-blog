import type { SectorPageContent } from './types';

export const aviation: SectorPageContent = {
  key: 'aviation',
  slug: '/ai-in-aviation',
  name: 'Aviation',
  capabilityTag: 'Aviation',
  meta: {
    title: 'AI in Aviation | Aviation AI Development',
    description:
      'AI for aviation: flight and crew management, predictive maintenance and MRO, delay management, passenger personalization and route optimization, engineered by Soft Suave.',
  },
  hero: {
    eyebrow: 'Aviation',
    titleLines: ['Smarter skies:', 'AI for the future of aviation'],
    body:
      'Smarter skies start with AI, boosting flight efficiency, elevating safety standards, and crafting seamless, personalized experiences from takeoff to touchdown.',
    img: null,
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'What we build for airlines and operators',
    body: 'Five solution families, from the hangar to the cabin.',
    items: [
      {
        name: 'Smart flight and crew management',
        body:
          'Electronic Flight Bags, Electronic Log Books, and automated scheduling solutions to simplify flight operations and streamline crew management in real time.',
      },
      {
        name: 'Predictive maintenance and MRO automation',
        body:
          'AI-driven tools enable predictive maintenance, fleet optimization, and automated MRO processes to reduce downtime, cut costs, and boost aircraft reliability.',
      },
      {
        name: 'AI-powered air traffic and delay management',
        body:
          'Optimize air traffic flow and predict delays using intelligent systems, ensuring timely operations and proactive responses in high-traffic environments.',
      },
      {
        name: 'Personalized passenger experience and baggage tracking',
        body:
          'Enhance passenger journeys with AI-powered personalization while ensuring efficient baggage handling and real-time tracking from departure to arrival.',
      },
      {
        name: 'Route optimization, fuel efficiency and risk assessment',
        body:
          'Smarter route planning, fuel management, and automated risk and rostering tools to ensure safe, cost-effective, and sustainable flight operations.',
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
    title: 'Put AI in your flight operations',
    body:
      'Crew, maintenance, delays or the passenger journey — tell us where the day goes wrong, and we will scope the build.',
  },
};
