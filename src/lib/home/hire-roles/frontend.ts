/**
 * Content for `/hire-frontend-application-developer`.
 *
 * Source: softsuave.com/hire-frontend-application-developer — the six
 * capability cards, the six framework hiring cards, the "find the frontend
 * skills your product requires" table (which becomes the `fit` selector), the
 * three engagement models, the four-step process, the six differentiators, the
 * delivery-presence note, the seven technology groups and the ten FAQs.
 */

import type { HireRolePageContent } from './types';
import { heroForm, hiringComparison } from './shared';

export const frontend: HireRolePageContent = {
  key: 'hire-frontend',
  slug: '/hire-frontend-application-developer',
  name: 'Hire Frontend Developers',
  serviceType: 'Frontend development staffing',

  meta: {
    title: 'Hire Frontend Developers From $14/Hour | 40-Hour Trial',
    description:
      'Hire frontend developers for React, Angular, Vue.js, Next.js, JavaScript and TypeScript. Interface development, modernization and performance work, evaluated on a 40-hour trial.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire Frontend Developers', 'for Modern Web Applications'],
    body: [
      'Add experienced front-end developers to your product team for new interface development, modernization, performance work and ongoing feature delivery. Our developers work across React, Angular, Vue.js, Next.js, JavaScript and TypeScript while fitting into your existing tools, standards and sprint routines.',
      'Share your frontend requirements, review matched developers, and assess practical work through a 40-hour risk-free trial before making a commitment.',
    ],
    points: [
      'React, Angular, Vue.js and Next.js expertise',
      '400+ AI and engineering specialists',
      '40-hour risk-free trial',
      'Direct collaboration with your developer',
      '4–6 hours of working-time overlap',
    ],
    form: heroForm({
      title: 'Hire skilled frontend developers',
      requirementLabel: 'Your frontend requirement',
      requirementPlaceholder:
        'Framework, product type, design-system state, testing expectations and the responsibilities you want covered.',
      subject: 'Frontend developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Why Hire a Frontend Developer for Your Product Team?',
    paragraphs: [
      'Frontend developers build and maintain the user-facing parts of websites and web applications: creating interfaces, developing reusable components, integrating APIs, supporting responsive experiences and improving frontend performance.',
      'Hire a frontend developer when your team needs additional delivery capacity, specialized framework knowledge, help modernizing an existing interface, or continued support for a growing product. The developer can work independently or alongside designers, backend engineers, QA specialists and product managers.',
      'Soft Suave provides front-end developers for hire across React, Angular, Vue.js, Next.js, JavaScript and TypeScript. Developers join your existing tools and processes — source control, sprint planning, code review, testing, documentation and deployment. Rates start at $14 per hour and vary by skill, experience, engagement model and project requirements.',
    ],
  },

  fit: {
    eyebrow: 'Match the Skills to the Product',
    title: 'Find the Frontend Skills Your Product Requires',
    body: 'The framework is only one part of the decision. Product type, existing architecture, user workflows, testing expectations, performance requirements and team structure should all guide the match.',
    columns: ['What you are building', 'Skills to hire for, and what to evaluate'],
    rows: [
      {
        problem: 'A SaaS product interface',
        solution:
          'React, Next.js and TypeScript with real state-management experience. What to evaluate: component structure and maintainability — a SaaS interface grows for years, and the cost of a poor component boundary compounds the whole time.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        problem: 'An enterprise dashboard',
        solution:
          'Angular and TypeScript, with data-visualization work behind them. What to evaluate: how the developer handles complex state and multi-step workflows, because that — not the chart library — is what makes a dashboard hard.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'A customer portal',
        solution:
          'React or Vue.js with solid API-integration experience. What to evaluate: authentication flows, permission-aware rendering, error and loading states, and responsive behaviour on the devices your customers actually use.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        problem: 'An ecommerce interface',
        solution:
          'React or Next.js with performance-optimization experience. What to evaluate: product discovery, the checkout path and Core Web Vitals — on a storefront these are revenue questions, not engineering preferences.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        problem: 'A legacy modernization or design-system rollout',
        solution:
          'Modern frameworks plus migration planning, testing discipline and component-library experience. What to evaluate: incremental migration and regression control for legacy work; consistency, documentation and reusable patterns for a design system.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
    ],
  },

  capabilities: {
    eyebrow: 'Capabilities',
    title: 'How Our Frontend Developers Support Your Product',
    body: 'Work across the whole frontend layer — new interfaces, modernization, API integration, performance and the test coverage that keeps important workflows safe.',
    items: [
      {
        name: 'Custom Interface Development',
        body: 'Develop user-facing interfaces for SaaS products, dashboards, portals, ecommerce platforms and internal systems using reusable components and an established frontend architecture.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Design-to-Code Implementation',
        body: 'Convert approved designs into responsive interfaces while maintaining visual consistency, reusable patterns, accessibility considerations, browser compatibility and the intended user journey.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Component and Design Systems',
        body: 'Create and maintain reusable component libraries that support consistent behaviour across screens, reduce duplicated implementation, and make future interface changes easier to manage.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'API and Backend Integration',
        body: 'Connect frontend applications with REST and GraphQL APIs, authentication services, backend workflows and third-party platforms while managing loading states, errors, permissions and application data.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Frontend Architecture',
        body: 'Establish routing, state boundaries, data-fetching strategy, rendering approach and folder structure so a growing interface stays navigable for the engineers who come after.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'Frontend Modernization',
        body: 'Replace outdated interface patterns, migrate legacy code incrementally, introduce modern frameworks, improve component structure and add testing — without rebuilding the whole application.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'Performance and Core Web Vitals',
        body: 'Improve rendering, bundle size, responsive behaviour, Core Web Vitals and browser compatibility, measuring before and after rather than changing things hopefully.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
      {
        name: 'Testing and Maintenance',
        body: 'Protect important workflows with Jest, Cypress, Playwright and React Testing Library, then keep dependencies current and defects resolved as the interface evolves.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Start With a Trial',
    title: 'Evaluate Real Frontend Work Before You Hire',
    body: 'Use the 40-hour risk-free trial to review code structure, component design, UI accuracy, responsive behaviour, API integration, testing discipline and communication.',
    cta: { label: 'Start Your 40-Hour Trial', href: '#enquiry' },
  },

  engagement: {
    eyebrow: 'Engagement Models',
    title: 'Choose an Engagement Model That Fits the Work',
    body: 'Select a structure based on how clearly the work is defined, how often requirements change, and whether you need one specialist or broader team support.',
    blocks: [
      {
        label: 'Dedicated developer',
        body: 'For continuing work: a frontend developer you manage directly inside your existing product team, with your priorities and your review process.',
      },
      {
        label: 'Time and material',
        body: 'For evolving requirements, with effort reviewed, reprioritised and adjusted during each development cycle as the interface and the roadmap change.',
      },
      {
        label: 'Fixed bid',
        body: 'For defined work with confirmed scope, deliverables, timelines, dependencies and clear acceptance criteria agreed upfront.',
      },
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'Hire a Frontend Developer in Five Steps',
    body: 'A frontend developer matched to your technical requirements, product needs and existing team structure — with the decision resting on work you can read.',
    steps: [
      {
        n: '01',
        name: 'Share the Frontend Job Description',
        body: 'Tell us the responsibilities, framework, experience level and product context the role involves, along with your preferred engagement model.',
      },
      {
        n: '02',
        name: 'Review Matched Developer Profiles',
        body: 'Review profiles matched on your stack, project needs, experience, availability and team fit.',
      },
      {
        n: '03',
        name: 'Interview the Shortlist',
        body: 'Discuss relevant code, component decisions and past interface work to assess depth beyond framework familiarity.',
      },
      {
        n: '04',
        name: 'Assess Practical Work on the Trial',
        body: 'Judge code structure, component design, UI accuracy, responsive behaviour, API handling and testing discipline through the 40-hour trial.',
      },
      {
        n: '05',
        name: 'Onboard and Manage the Work',
        body: 'Onboard your selected developer with repository, design-file, ticketing and documentation access, then assign priorities inside your existing workflow.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Hire by Framework',
    title: 'Choose Developers for Your Frontend Stack',
    body: 'Hire against your product’s actual technology stack so a developer can contribute to your codebase without an extended ramp-up period.',
    items: [
      {
        key: 'frontend',
        name: 'React Developers',
        body: 'Component-based applications, interactive product interfaces, reusable UI systems, state management, API-driven features, testing and React modernization.',
      },
      {
        key: 'web',
        name: 'Angular Developers',
        body: 'Enterprise applications, dashboards, portals and structured workflows with TypeScript, RxJS-based interactions, component architecture and automated testing.',
      },
      {
        key: 'design',
        name: 'Vue.js Developers',
        body: 'Vue interfaces with reusable components, reactive state, API integration, routing, performance work and incremental adoption inside an existing application.',
      },
      {
        key: 'performance',
        name: 'Next.js Developers',
        body: 'React applications requiring server-side rendering, static generation, structured routing, performance optimization and maintainable frontend architecture.',
      },
      {
        key: 'api',
        name: 'TypeScript Developers',
        body: 'Clearer interfaces, reusable types, safer refactoring, API contracts and component libraries — the things that keep a large frontend maintainable.',
      },
      {
        key: 'automation',
        name: 'JavaScript Developers',
        body: 'Interactive interfaces, browser behaviour, third-party integrations, legacy application maintenance, component logic, debugging and testing.',
      },
      {
        key: 'integration',
        name: 'Design-System Engineers',
        body: 'Component libraries documented in Storybook, with accessibility considerations and the consistency that stops every screen inventing its own patterns.',
      },
      {
        key: 'qa',
        name: 'Frontend Test Engineers',
        body: 'Jest, Cypress, Playwright and React Testing Library coverage over the workflows that must not break, plus the lint and formatting standards around them.',
      },
      {
        key: 'fullstack',
        name: 'Full-Stack JavaScript Developers',
        body: 'Developers who carry a feature across interface and API rather than handing it over — useful when the frontend and backend teams are the same small team.',
      },
    ],
  },

  comparison: hiringComparison({
    title: 'Soft Suave vs an In-House Hire vs a Freelancer',
    body: 'Frontend work is continuous and highly collaborative, which makes team integration the factor most worth weighing.',
    column: 'Soft Suave developer',
  }),

  techStack: {
    eyebrow: 'Technology Stack',
    title: 'Technologies Our Frontend Developers Work With',
    body: 'Languages, frameworks, APIs, testing platforms and build tools — add frontend expertise aligned with your current stack so your team keeps continuity from the first working day.',
    groups: [
      {
        name: 'Languages and Markup',
        items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
      },
      {
        name: 'Frameworks and Libraries',
        items: ['React', 'Angular', 'Vue.js', 'Next.js', 'Apollo Client', 'Axios'],
      },
      {
        name: 'UI and Styling',
        items: ['Tailwind CSS', 'Sass', 'Material UI', 'Bootstrap', 'styled-components', 'Storybook'],
      },
      {
        name: 'State Management',
        items: ['Redux', 'Redux Toolkit', 'NgRx', 'Pinia', 'Zustand', 'RxJS'],
      },
      {
        name: 'Testing and Quality',
        items: ['Jest', 'Cypress', 'Playwright', 'React Testing Library', 'Vitest', 'ESLint', 'Prettier'],
      },
      {
        name: 'Build Tools',
        items: ['Vite', 'Webpack', 'Babel', 'npm', 'Yarn', 'pnpm'],
      },
      {
        name: 'Source Control',
        items: ['Git', 'GitHub', 'GitLab', 'Bitbucket'],
      },
    ],
  },

  faq: {
    eyebrow: 'FAQs',
    title: 'Questions About Hiring Frontend Developers',
    body: 'Answers on scope, framework choice, evaluation, collaboration and cost.',
    items: [
      {
        q: 'What does a frontend developer work on?',
        a: 'A frontend developer builds and maintains the user-facing layer of a website or web application. The work can include components, responsive layouts, state management, API integration, accessibility, browser compatibility, testing, performance improvement, debugging and continued interface development.',
      },
      {
        q: 'When should a company hire a frontend developer?',
        a: 'When your team lacks capacity or needs specialized interface expertise. Common situations include new product development, a feature backlog, framework migration, design-system implementation, performance work, maintenance, and additional support for an existing engineering team.',
      },
      {
        q: 'Which frontend framework should we choose?',
        a: 'It depends on your product, existing architecture, team knowledge, performance needs and maintenance plans. React and Next.js suit many component-based products, Angular supports structured enterprise applications, and Vue.js can support progressive adoption and lighter interface development.',
      },
      {
        q: 'What does the 40-hour risk-free trial cover?',
        a: 'Practical frontend work within an agreed scope. You can assess technical execution, code quality, communication, requirement understanding, responsiveness and compatibility with your team.',
      },
      {
        q: 'How do frontend developers collaborate across time zones?',
        a: 'Our frontend developers provide 4 to 6 hours of working-time overlap for global clients. Collaboration includes standups, handovers, agreed review points and asynchronous communication.',
      },
      {
        q: 'How can we evaluate a frontend developer?',
        a: 'Through an interview, relevant code discussion and practical work. Review code structure, component design, responsive behaviour, API handling, testing, communication, requirement understanding, and how effectively the developer works within your existing process.',
      },
      {
        q: 'How much does it cost to hire frontend developers?',
        a: 'Rates start at $14 per hour and vary by skill, experience, engagement model and project requirements. Framework specialization, application complexity, architecture ownership, testing responsibilities, integration requirements and engagement duration can all influence the applicable rate.',
      },
      {
        q: 'Can frontend developers work with our backend team?',
        a: 'Yes. Frontend developers regularly collaborate with backend engineers and work with REST or GraphQL APIs, authentication services, permissions, error states and application data. Include the required integration experience when defining the role so matched developers can be evaluated against it.',
      },
      {
        q: 'Can we hire one developer or a frontend team?',
        a: 'Either. A larger engagement may include multiple frontend engineers alongside backend developers, QA specialists, DevOps support, technical leadership or project coordination where those roles are required.',
      },
      {
        q: 'Can a developer work with our existing frontend code?',
        a: 'Yes, when the framework, documentation, dependencies, access and project expectations are clear. The initial assessment should identify technical debt, testing coverage, architectural constraints and the areas that need careful regression control.',
      },
    ],
  },
};
