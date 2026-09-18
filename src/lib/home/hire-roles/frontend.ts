/**
 * Content for `/hire-frontend-application-developer`.
 *
 * Source: softsuave.com/hire-frontend-application-developer, and nothing else.
 *
 *   hero            → "Hire Frontend Developers for Modern Web Applications"
 *   overview        → "Why Hire a Frontend Developer for Your Product Team?"
 *   capabilities    → "How Our Frontend Developers Support Your Product" (6 cards)
 *   specialisations → "Choose Developers for Your Frontend Stack" (6 cards)
 *   fit             → "Find the Frontend Skills Your Product Requires"
 *   engagement      → "Choose an Engagement Model That Fits the Work"
 *   midCta          → "Evaluate Real Frontend Work Before You Hire"
 *   globalDelivery  → "Frontend Delivery Across Key Technology Markets"
 *   process         → "Hire a Frontend Developer in Four Steps"
 *   techStack       → "Technologies Our Frontend Developers Work With" (7 groups)
 *   faq             → the ten questions, verbatim
 *
 * The live skill-matching table has three columns — product need, suitable
 * skills, what to evaluate. `Problems` carries two, so the second and third
 * cells are joined into the one answer they read as, with no wording changed.
 *
 * No `comparison`: this page runs no Soft Suave/in-house/freelancer table, and
 * no rate table — it states only that rates start at $14 per hour. Its "Why
 * Hire Frontend Developers From Soft Suave?" cards are the company's own
 * claims and stay with the homepage's Why band.
 */

import type { HireRolePageContent } from './types';
import { heroForm } from './shared';

export const frontend: HireRolePageContent = {
  key: 'hire-frontend',
  slug: '/hire-frontend-application-developer',
  name: 'Hire Frontend Developers',
  serviceType: 'Frontend development staffing',

  /** Live order: clients, overview, capabilities, technology expertise, skill matching, engagement options, trial, process, why choose us, delivery presence, technologies, testimonials, FAQ. */
  order: [
    'clients',
    'overview',
    'capabilities',
    'specialisations',
    'fit',
    'engagement',
    'midCta',
    'process',
    'whyRole',
    'globalDelivery',
    'techStack',
    'testimonials',
    'faq',
  ],

  meta: {
    title: 'Hire Frontend Developers From $14/Hour | 40-Hour Trial',
    description:
      'Hire frontend developers across React, Angular, Vue.js, Next.js, JavaScript, and TypeScript, working inside your existing tools, standards, and sprint routines.',
  },

  hero: {
    titleLines: ['Hire Frontend Developers', 'for Modern Web Applications'],
    body: [
      'Add experienced front end developers to your product team for new interface development, modernization, performance improvement, and ongoing feature delivery. Our developers work across React, Angular, Vue.js, Next.js, JavaScript, and TypeScript while fitting into your existing tools, standards, and sprint routines.',
      'Share your frontend requirements, review matched developers, and assess practical work through a 40-hour risk-free trial before making a commitment.',
    ],
    points: [
      'Vetted Talent On Contract',
      'React, Angular & Vue.js Skills',
      'Direct Developer Collaboration',
      'Flexible Engagement Models',
      '400+ AI & Engineering Specialists',
    ],
    form: heroForm({
      title: 'Get Skilled Remote Developers',
      requirementLabel: 'Requirements',
      requirementPlaceholder:
        'Framework, product type, responsibilities, experience level, and when you need to start.',
      subject: 'Frontend developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Why Hire a Frontend Developer for Your Product Team?',
    paragraphs: [
      'Frontend developers build and maintain the user-facing parts of websites and web applications. Their work includes creating interfaces, developing reusable components, integrating APIs, supporting responsive experiences, and improving frontend performance.',
      'You should hire a frontend developer when your team needs additional delivery capacity, specialized framework knowledge, help modernizing an existing interface, or continued support for a growing product. The developer can work independently or collaborate with designers, backend engineers, QA specialists, and product managers.',
      'Soft Suave provides front end developers for hire across React, Angular, Vue.js, Next.js, JavaScript, and TypeScript requirements. Developers join your existing tools and processes, including source control, sprint planning, code review, testing, documentation, and deployment workflows.',
      'Our developer rates start at $14 per hour and vary by skill, experience, engagement model, and project requirements.',
    ],
  },

  capabilities: {
    eyebrow: 'Capabilities',
    title: 'How Our Frontend Developers Support Your Product',
    body: 'Hire frontend developers from Soft Suave to work across the frontend layer, from building new interfaces and modernizing existing applications to integrating APIs, improving performance, and maintaining test coverage.',
    items: [
      {
        name: 'Custom Interface Development',
        body: 'Develop user-facing interfaces for SaaS products, dashboards, portals, ecommerce platforms, internal systems, and other web applications using reusable components and established frontend architecture.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Design-to-Code Implementation',
        body: 'Convert approved designs into responsive interfaces while maintaining visual consistency, reusable patterns, accessibility considerations, browser compatibility, and alignment with the intended user journey.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Component and Design Systems',
        body: 'Create and maintain reusable component libraries that support consistent behavior across screens, reduce duplicated implementation, and make future interface changes easier to manage.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'API and Backend Integration',
        body: 'Connect frontend applications with REST and GraphQL APIs, authentication services, backend workflows, and third-party platforms while managing loading states, errors, permissions, and application data.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Frontend Modernization',
        body: 'Replace outdated interface patterns, migrate legacy code incrementally, introduce modern frameworks, improve component structure, and add testing without unnecessarily rebuilding the entire application.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'Performance, Testing and Maintenance',
        body: 'Improve rendering, bundle size, responsive behavior, Core Web Vitals, and browser compatibility while using tools such as Jest, Cypress, or Playwright to protect important workflows.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  fit: {
    eyebrow: 'Skill Matching',
    title: 'Find the Frontend Skills Your Product Requires',
    body: 'The right framework is only one part of the decision. Product type, existing architecture, user workflows, testing expectations, performance requirements, and team structure should also guide developer matching.',
    columns: ['Product Need', 'Suitable Frontend Skills'],
    rows: [
      {
        problem: 'SaaS product interface',
        solution:
          'React, Next.js, TypeScript, state management. Evaluate component structure and maintainability.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        problem: 'Enterprise dashboard',
        solution:
          'Angular, TypeScript, data visualization. Evaluate complex state and workflow handling.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'Customer portal',
        solution:
          'React or Vue.js, API integration. Evaluate authentication and responsive behavior.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        problem: 'Ecommerce interface',
        solution:
          'React, Next.js, performance optimization. Evaluate product discovery, checkout and Core Web Vitals.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        problem: 'Legacy modernization',
        solution:
          'Modern frameworks, testing, migration planning. Evaluate incremental migration and regression control.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        problem: 'Design-system implementation',
        solution:
          'Component libraries and accessibility. Evaluate consistency, documentation and reusable patterns.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Start With a Trial',
    title: 'Evaluate Real Frontend Work Before You Hire',
    body: 'Use the 40-hour risk-free trial to review code structure, component design, UI accuracy, responsive behavior, API integration, testing discipline, communication, requirement understanding, and how well the developer works within your existing process.',
    cta: { label: 'Start Your 40-Hour Trial', href: '#enquiry' },
  },

  engagement: {
    eyebrow: 'Engagement Options',
    title: 'Choose an Engagement Model That Fits the Work',
    body: 'Select an engagement structure based on how clearly the work is defined, how often requirements change, and whether you need one specialist or broader team support.',
    blocks: [
      {
        label: 'Dedicated Developer',
        body: 'For continuing work, hire dedicated frontend developers you manage directly within your existing product team.',
      },
      {
        label: 'Time and Material',
        body: 'For evolving requirements, with effort reviewed, reprioritized, and adjusted during each development cycle as needed.',
      },
      {
        label: 'Fixed Bid',
        body: 'For defined work with confirmed scope, deliverables, timelines, dependencies, and clear acceptance criteria agreed upfront.',
      },
    ],
  },

  globalDelivery: {
    eyebrow: 'Delivery Presence',
    title: 'Frontend Delivery Across Key Technology Markets',
    paragraphs: [
      'Soft Suave has a delivery presence across Chennai, Bengaluru, and the United States. This structure supports collaboration across locations while keeping developers connected with your product goals, technical standards, communication tools, and established delivery routines.',
      'Onboarding begins with access to your repositories, design files, ticketing system, and documentation. The developer joins your existing standups and review cycles from the start, so the working relationship is established before delivery expectations increase.',
      "From there, work with frontend developers in India is coordinated through agreed meetings, sprint reviews, written updates, code reviews, and shared project-management systems. The working arrangement is defined around your team's collaboration needs and the responsibilities assigned to the developer.",
    ],
  },

  process: {
    eyebrow: 'Our Process',
    title: 'Hire a Frontend Developer in Four Steps',
    body: 'Get a frontend developer matched to your technical requirements, product needs, and existing team structure in just 4 simple steps.',
    steps: [
      {
        n: '01',
        name: 'Share the Frontend JD',
        body: 'Share the frontend job description, responsibilities, experience, and product context needed to hire a frontend developer.',
      },
      {
        n: '02',
        name: 'Review Matched Developer Profiles',
        body: 'Review matched profiles based on your stack, project needs, experience, availability, and team fit.',
      },
      {
        n: '03',
        name: 'Interview and Start the Trial',
        body: 'Interview shortlisted developers and assess practical work through the 40-hour trial.',
      },
      {
        n: '04',
        name: 'Onboard and Manage the Work',
        body: 'Onboard your selected developer, assign priorities, and manage delivery within your existing workflow.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Technology Expertise',
    title: 'Choose Developers for Your Frontend Stack',
    body: "Choose frontend developers with experience in your product's technology stack, so they can contribute to your codebase without an extended ramp-up period.",
    items: [
      {
        key: 'react',
        name: 'Hire Reactjs Developers',
        body: 'Support component-based applications, interactive product interfaces, reusable UI systems, state management, API-driven features, testing, maintenance, and React modernization across new or existing products.',
        href: '/hire-reactjs-developers',
      },
      {
        key: 'angular',
        name: 'Hire AngularJS Developers',
        body: 'Add Angular expertise for enterprise applications, dashboards, portals, structured workflows, TypeScript development, RxJS-based interactions, component architecture, automated testing, and long-term interface maintenance.',
        href: '/hire-angularjs-developers',
      },
      {
        key: 'vue',
        name: 'Hire Vue.js Developers',
        body: 'Build or maintain Vue.js interfaces with reusable components, reactive state, API integration, routing, performance improvements, and incremental adoption within an existing web application.',
      },
      {
        key: 'nextjs',
        name: 'Hire Next.js Developers',
        body: 'Support React applications requiring server-side rendering, static generation, structured routing, performance optimization, API integration, reusable components, and maintainable frontend architecture with Next.js.',
      },
      {
        key: 'javascript',
        name: 'Hire JavaScript Developers',
        body: 'Add JavaScript expertise for interactive interfaces, browser behavior, third-party integrations, legacy application maintenance, component logic, debugging, testing, and improvements to existing frontend code.',
      },
      {
        key: 'typescript',
        name: 'Hire TypeScript Developers',
        body: 'Use TypeScript for clearer interfaces, reusable types, safer refactoring, framework development, API contracts, component libraries, testing, and maintainable frontend work across larger applications.',
      },
    ],
  },

  whyRole: {
    eyebrow: 'Why Choose Us',
    title: 'Why Hire Frontend Developers From Soft Suave?',
    body: 'Your developer should bring the required technical skills while working effectively with your product, design, backend, and QA teams. Soft Suave supports that fit through practical evaluation and flexible engagement.',
    items: [
      {
        key: 'trial',
        name: '40-Hour Risk-Free Trial',
        body: 'Evaluate frontend execution, communication, requirement understanding, and team compatibility before making a longer-term commitment.',
      },
      {
        key: 'specialists',
        name: '400+ AI & Engineering Specialists',
        body: 'Access broader engineering expertise when frontend delivery requires support across connected technical disciplines.',
      },
      {
        key: 'experience',
        name: '13+ Years of Technology Expertise',
        body: 'Work with an experienced engineering partner across development, modernization, maintenance, and changing technical requirements.',
      },
      {
        key: 'iso',
        name: 'ISO/IEC 27001:2022 Certified',
        body: 'Soft Suave maintains a certified information security management system across software development and delivery activities.',
      },
      {
        key: 'collaboration',
        name: 'Direct Developer Collaboration',
        body: 'Collaborate directly with your developer on priorities, decisions, reviews, blockers, and progress.',
      },
      {
        key: 'models',
        name: 'Flexible Engagement Models',
        body: 'Choose dedicated, time-and-material, or fixed-bid support based on scope, capacity, priorities, and workload.',
      },
    ],
  },

  techStack: {
    eyebrow: 'Technologies',
    title: 'Technologies Our Frontend Developers Work With',
    body: 'Our frontend developers work across languages, frameworks, APIs, testing platforms, and build tools. Add frontend expertise aligned with your current technology stack, helping your team maintain development continuity from the first working day.',
    groups: [
      {
        name: 'Languages and Markup',
        items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
      },
      {
        name: 'Frameworks and Libraries',
        items: ['React', 'Angular', 'Vue.Js', 'Next.Js', 'Apollo Client', 'Axios'],
      },
      {
        name: 'UI and Styling',
        items: [
          'Tailwind CSS',
          'Sass',
          'Material UI',
          'Bootstrap',
          'styled-components',
          'Storybook',
        ],
      },
      {
        name: 'State Management',
        items: ['Redux', 'Redux Toolkit', 'NgRx', 'Pinia', 'Zustand', 'RxJS'],
      },
      {
        name: 'Testing and Quality',
        items: [
          'Jest',
          'Cypress',
          'Playwright',
          'React Testing Library',
          'Vitest',
          'ESLint',
          'Prettier',
        ],
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
    eyebrow: 'Ask Us',
    title: 'Questions About Hiring Frontend Developers',
    body: 'Find clear answers to common questions about hiring frontend developers from Soft Suave.',
    items: [
      {
        q: 'What does a frontend developer work on?',
        a: 'A frontend developer builds and maintains the user-facing layer of a website or web application. The work can include components, responsive layouts, state management, API integration, accessibility, browser compatibility, testing, performance improvement, debugging, and continued interface development.',
      },
      {
        q: 'When should a company hire a frontend developer?',
        a: 'You should hire frontend developer support when your team lacks capacity or needs specialized interface expertise. Common situations include new product development, feature backlogs, framework migration, design-system implementation, performance work, maintenance, and additional support for an existing engineering team.',
      },
      {
        q: 'Which frontend framework should we choose?',
        a: 'The right framework depends on your product, existing architecture, team knowledge, performance needs, and maintenance plans. React and Next.js suit many component-based products, Angular supports structured enterprise applications, and Vue.js can support progressive adoption and lightweight interface development.',
      },
      {
        q: 'What does the 40-hour risk-free trial cover?',
        a: 'The trial covers practical frontend work within an agreed scope. You can assess technical execution, code quality, communication, requirement understanding, responsiveness, and compatibility with your team.',
      },
      {
        q: 'How do frontend developers collaborate across time zones?',
        a: 'Our frontend developers provide 4–6 hours of working-time overlap for global clients. When you hire frontend developer support, collaboration includes standups, handovers, agreed review points, and asynchronous communication.',
      },
      {
        q: 'How can we evaluate a frontend developer?',
        a: 'You can evaluate a frontend developer through an interview, relevant code discussion, and practical work. Review code structure, component design, responsive behavior, API handling, testing, communication, requirement understanding, and how effectively the developer works within your existing process.',
      },
      {
        q: 'How much does it cost to hire frontend developers?',
        a: 'Our developer rates start at $14 per hour and vary by skill, experience, engagement model, and project requirements. Framework specialization, application complexity, architecture ownership, testing responsibilities, integration requirements, and engagement duration can all influence the applicable rate.',
      },
      {
        q: 'Can frontend developers work with our backend team?',
        a: 'Yes. Frontend developers regularly collaborate with backend engineers and work with REST or GraphQL APIs, authentication services, permissions, error states, and application data. The required integration experience should be included when defining the role and evaluating matched developers.',
      },
      {
        q: 'Can we hire one developer or a frontend team?',
        a: 'You can hire an individual frontend developer or assemble a broader team based on the scope. A larger engagement may include multiple frontend engineers alongside backend developers, QA specialists, DevOps support, technical leadership, or project coordination where those roles are required.',
      },
      {
        q: 'Can a developer work with our existing frontend code?',
        a: 'Yes. A frontend developer can review and work within an existing codebase when the framework, documentation, dependencies, access, and project expectations are clear. The initial assessment should identify technical debt, testing coverage, architectural constraints, and areas requiring careful regression control.',
      },
    ],
  },
};
