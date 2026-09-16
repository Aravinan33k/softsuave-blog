import type { SectorPageContent } from './types';

export const fintech: SectorPageContent = {
  key: 'fintech',
  slug: '/fintech-ai-solutions',
  name: 'FinTech',
  capabilityTag: 'FinTech',
  meta: {
    title: 'Fintech AI Development Services | Custom Fintech AI Solutions',
    description:
      'AI for financial services: fraud detection, credit risk and underwriting, regulatory automation and conversational banking, built by Soft Suave’s engineering teams.',
  },
  hero: {
    eyebrow: 'FinTech',
    titleLines: ['Fintech AI development solutions', 'to power digital innovation'],
    body:
      'Unlock smarter financial solutions through AI-driven innovation. Transform your operations, enhance security, and boost efficiency with our expert Fintech AI development services tailored for success.',
    img: 'sec-hero-fintech',
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'What we build for financial services',
    body: 'The solution families we are asked for most, and what each one is for.',
    items: [
      {
        name: 'Real-time fraud detection and transaction monitoring',
        body:
          'Monitor every transaction in real time, flag anomalies instantly, and stop fraud before it impacts customers.',
      },
      {
        name: 'Intelligent credit risk and underwriting frameworks',
        body:
          'AI-driven credit scoring and underwriting accelerate approvals while reducing defaults and bias across portfolios.',
      },
      {
        name: 'Compliance and regulatory automation (RegTech)',
        body:
          'Automate monitoring, reporting, and alerts to stay aligned with evolving regulations and audit requirements.',
      },
      {
        name: 'Conversational AI and virtual financial assistants',
        body:
          'Deliver 24/7 intelligent support with AI assistants that answer, assist, and guide customers across channels.',
      },
      {
        name: 'Smart risk management and predictive stress-testing',
        body:
          'Simulate scenarios, forecast risks, and stress-test portfolios using predictive models for resilient financial planning.',
      },
      {
        name: 'Embedded finance and smart payment platforms',
        body:
          'Embed secure, intelligent payments into any journey, enabling smoother checkouts and contextual financial experiences.',
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
    title: 'Bring AI to your financial products',
    body:
      'Tell us the workflow you want to make intelligent — scoring, monitoring, servicing or reporting — and we will scope the team and the first release with you.',
  },
};
