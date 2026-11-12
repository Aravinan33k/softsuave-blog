import type { SectorPageContent } from './types';

export const logistics: SectorPageContent = {
  key: 'logistics',
  slug: '/ai-in-logistics',
  name: 'Logistics',
  capabilityTag: 'Logistics',
  meta: {
    title: 'AI in Logistics | Supply Chain AI Development',
    description:
      'AI for logistics: route and delivery optimization, freight cost control, shipment tracking, document automation and fleet management, engineered by Soft Suave.',
  },
  hero: {
    titleLines: ['AI in logistics:', 'transforming supply chain efficiency'],
    body:
      'Optimize supply chains, reduce delays, and enhance real-time decision-making with AI-powered logistics solutions. Leverage AI to boost efficiency, cut costs, and enhance operations.',
    img: 'sec-hero-logistics',
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'What we build for supply chains',
    body: 'Five solution families, each aimed at a cost or a delay you can measure.',
    items: [
      {
        name: 'Intelligent route and delivery optimization',
        body:
          'Our solutions optimize route planning, predict traffic patterns, and improve delivery schedules, reducing delays, cutting fuel costs, and streamlining last-mile logistics.',
      },
      {
        name: 'AI-powered freight and cost optimization',
        body:
          'Soft Suave delivers automated freight auditing, cost control, and load optimization, ensuring precise billing, minimized expenses, and enhanced logistics efficiency through AI-driven insights.',
      },
      {
        name: 'AI-driven tracking and monitoring',
        body:
          'We offer real-time shipment visibility, predictive alerts, and advanced incident analytics, enabling proactive logistics management and ensuring operational security.',
      },
      {
        name: 'Smart document and data management',
        body:
          'Soft Suave simplifies document handling, compliance tracking, and analytics-driven reporting, enhancing operational efficiency and accelerating data-driven decision-making.',
      },
      {
        name: 'AI-powered parking and fleet management',
        body:
          'Our technology improves parking utilization, detects violations, and provides vehicle insights, ensuring seamless fleet operations and optimized space management.',
      },
    ],
  },
  proof: {
    eyebrow: 'Proof',
    title: 'Logistics work we have shipped',
    body:
      'One study from this sector, with the figure the client measured. The rail beneath it is the company’s own record.',
    caseStudyKey: 'logistics',
  },
  closing: {
    title: 'Take the delay out of your network',
    body:
      'Routing, freight cost, visibility or paperwork — tell us where your network loses time, and we will scope the build.',
  },
};
