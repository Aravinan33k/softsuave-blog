import type { SectorPageContent } from './types';

export const edtech: SectorPageContent = {
  key: 'edtech',
  slug: '/ai-solutions-in-edutech',
  name: 'EdTech',
  capabilityTag: 'EdTech',
  meta: {
    title: 'AI Solutions in EdTech | AI Development for Education',
    description:
      'AI for education: adaptive assignments, progress monitoring, auto-grading, student chatbots and content recommendations, engineered by Soft Suave.',
  },
  hero: {
    eyebrow: 'EdTech',
    titleLines: ['AI-driven EdTech', 'for the digital era'],
    body:
      'Explore AI solutions that adapt to learner needs, enhance teaching efficiency, and automate administrative workflows. Build future-ready learning experiences with AI.',
    img: 'ind-edtech',
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'What we build for learning platforms',
    body:
      'Each of these gives a teacher hours back, or gives a learner a path suited to where they actually are.',
    items: [
      {
        name: 'AI-powered assignment tools',
        body:
          'Intelligently personalizes tasks based on learning pace, topic relevance, and student ability.',
      },
      {
        name: 'Student progress monitoring',
        body:
          'Gain complete visibility into learner performance through real-time tracking, predictive analytics, and behavior-based insights.',
      },
      {
        name: 'Automated chatbots for student queries',
        body:
          'Instantly responds to student questions, reducing support delays while delivering consistent learning assistance.',
      },
      {
        name: 'AI-powered auto-grading',
        body:
          'Eliminates manual grading errors using smart evaluation that scores assignments with predefined rubrics.',
      },
      {
        name: 'Study content recommendations',
        body:
          'Delivers tailored content suggestions based on student strengths, weaknesses, and performance.',
      },
    ],
  },
  proof: {
    eyebrow: 'Proof',
    title: 'EdTech work we have shipped',
    body:
      'One study from this sector, with the figure the client measured. The rail beneath it is the company’s own record.',
    caseStudyKey: 'edtech',
  },
  closing: {
    title: 'Build the learning experience you have in mind',
    body:
      'Tell us how your learners and teachers work today, and we will scope the AI that fits around them.',
  },
};
