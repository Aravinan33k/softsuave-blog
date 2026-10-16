import type { SectorPageContent } from './types';

export const ecommerce: SectorPageContent = {
  key: 'ecommerce',
  slug: '/ai-solutions-for-ecommerce',
  name: 'eCommerce',
  capabilityTag: 'eCommerce',
  meta: {
    title: 'AI Solutions for Ecommerce | Boost Sales and Automate Growth',
    description:
      'AI for online retail: recommendations, intelligent search, dynamic pricing, demand forecasting and cart recovery, engineered by Soft Suave.',
  },
  hero: {
    titleLines: ['AI solutions for ecommerce:', 'boost sales, automate growth'],
    body:
      'Maximize profits with our AI e-commerce solution. Predict intent, personalize journeys, and automate operations to boost conversions and scale globally, ensuring secure growth, reduced costs, and lasting customer loyalty.',
    img: 'sec-hero-ecommerce',
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'What we build for online retail',
    body: 'The solution families that move revenue soonest, and what each one is for.',
    items: [
      {
        name: 'AI-powered recommendation systems',
        body:
          'Unlock Amazon-grade recommendations with AI engines that learn from every click, view, and purchase.',
      },
      {
        name: 'Intelligent product search',
        body:
          'Help customers find exactly what they want faster with an AI search that understands natural language, intent, typos, and visuals.',
      },
      {
        name: 'Cart abandonment reduction',
        body:
          'Stop losing ready-to-buy customers with AI that predicts drop-offs, triggers timely nudges, and recovers abandoned carts before they disappear.',
      },
      {
        name: 'Predictive analytics and demand forecasting',
        body:
          'Turn historical data into forward-looking insight with AI models that predict demand, customer value, and campaign performance.',
      },
      {
        name: 'Smart and dynamic pricing algorithms',
        body:
          'Stay profitable and competitive with AI that optimizes prices dynamically based on demand, inventory, and competitor signals.',
      },
      {
        name: 'Visual search and computer vision',
        body:
          'Let shoppers search with images, not just words, using computer vision that recognizes products instantly.',
      },
    ],
  },
  proof: {
    eyebrow: 'Proof',
    title: 'Ecommerce work we have shipped',
    body:
      'One study from this sector, with the figure the client measured. The rail beneath it is the company’s own record.',
    caseStudyKey: 'ecommerce',
  },
  closing: {
    title: 'Make your storefront intelligent',
    body:
      'Search, recommendations, pricing or forecasting — tell us where the revenue is leaking and we will scope the fix.',
  },
};
