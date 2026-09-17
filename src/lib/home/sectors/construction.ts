import type { SectorPageContent } from './types';

export const construction: SectorPageContent = {
  key: 'construction',
  slug: '/ai-solutions-for-construction',
  name: 'Construction',
  capabilityTag: 'Construction',
  meta: {
    title: 'AI Solutions for Construction | Construction AI Development',
    description:
      'AI for construction: smart scheduling, site safety monitoring, inventory and procurement, design simulation and predictive project oversight, engineered by Soft Suave.',
  },
  hero: {
    eyebrow: 'Construction',
    titleLines: ['AI-driven innovation', 'for the future of construction'],
    body:
      'Redefine on-site efficiency with AI that anticipates risks, optimizes workflows, and supports safer, faster, and cost-efficient execution.',
    img: 'sec-hero-construction',
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'What we build for the site and the back office',
    body: 'The solution families we are asked for most, on site and off it.',
    items: [
      {
        name: 'Smart scheduling',
        body:
          'AI automates scheduling, resource allocation, and workflow optimization for seamless project delivery.',
      },
      {
        name: 'Site safety monitoring',
        body:
          'AI-driven monitoring and predictive analytics help identify hazards and ensure compliance with safety standards.',
      },
      {
        name: 'Inventory and procurement',
        body:
          'Smart resource planning minimizes waste, optimizes procurement, and reduces overall costs.',
      },
      {
        name: 'Design simulation and modelling',
        body:
          'AI-powered simulations and modeling enhance design precision, reducing errors and rework.',
      },
      {
        name: 'Equipment monitoring and uptime',
        body:
          'AI-based monitoring detects potential equipment failures early, ensuring proactive maintenance and reduced downtime.',
      },
      {
        name: 'Predictive project oversight and risk alerting',
        body:
          'Cost and deadline estimators, productivity tracking, and intelligent alerts that surface a delay while there is still time to act on it.',
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
    title: 'Bring AI to your projects',
    body:
      'Scheduling, safety, procurement or oversight — tell us which part of delivery slips most often, and we will scope the build.',
  },
};
