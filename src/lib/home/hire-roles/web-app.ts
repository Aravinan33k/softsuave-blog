/**
 * Content for `/hire-web-app-developers`.
 *
 * Source: softsuave.com/hire-web-app-developers — the eight capability cards,
 * the twelve technology-specific hiring cards, the three engagement models, the
 * six differentiators, the global-delivery note, the four-step process, the
 * seven technology groups and the ten FAQs. The technology cards become the
 * specialisations grid (trimmed to nine so the grid resolves evenly, with the
 * remainder named in the section intro rather than dropped).
 */

import type { HireRolePageContent } from './types';
import { heroForm, hiringComparison } from './shared';

export const webApp: HireRolePageContent = {
  key: 'hire-web',
  slug: '/hire-web-app-developers',
  name: 'Hire Web App Developers',
  serviceType: 'Web application development staffing',

  meta: {
    title: 'Hire Web App Developers | Remote, 40-Hour Risk-Free Trial',
    description:
      'Hire web application developers matched to your architecture and delivery process. SaaS platforms, portals, ecommerce and API integrations. From $14/hour.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire Web App Developers', 'for Scalable Digital Products'],
    body: [
      'Hire web app developers matched to your technology stack, product requirements and delivery process. Build a new application, modernize an existing platform, complete an integration, or add engineering capacity for the work your team has to ship.',
      'Review relevant profiles, interview the specialists you shortlist, and evaluate technical skill, communication and team fit through a 40-hour trial before the engagement continues.',
    ],
    points: [
      'Project-ready developer profiles',
      '400+ AI and engineering specialists',
      '40-hour risk-free trial',
      'Flexible hiring from $14 / hour',
      '4–6 hours of overlap with US and UK hours',
    ],
    form: heroForm({
      title: 'Hire skilled web app developers',
      requirementLabel: 'Your web application requirement',
      requirementPlaceholder:
        'Application type, current stack, integrations, responsibilities and the start date you are working toward.',
      subject: 'Web app developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire Web Application Developers for Your Product',
    paragraphs: [
      'Hiring web application developers gives your business additional engineering capacity for building, modernizing and maintaining browser-based products. The right developer has to match your architecture, technologies, delivery process, security requirements and the responsibilities the project actually involves.',
      'Soft Suave helps you identify web app developers for hire on the technical skills, experience, availability and collaboration model your project requires. You review the profiles, interview the shortlist, and use the 40-hour trial to judge technical skill, communication and team fit before continuing.',
      'Our developers build SaaS platforms, customer portals, internal business applications, ecommerce applications and API-integrated systems, and support modernization, feature delivery and ongoing maintenance. Rates start at $14 per hour and vary by skill, experience, engagement model and project requirements.',
    ],
  },

  fit: {
    eyebrow: 'Match the Skills to the Product',
    title: 'Which Web App Developer Does Your Product Need?',
    body: 'The framework is only part of the decision. Product type, existing architecture, integration surface and maintenance plans should all shape who you hire. Pick the situation closest to yours.',
    columns: ['Your situation', 'What to hire for'],
    rows: [
      {
        problem: 'A new SaaS platform with subscriptions and permissions',
        solution:
          'A developer strong in React or Next.js with TypeScript and a backend stack you can live with long-term. Account management, role-based permissions, billing integration and reporting are the work — so evaluate data-model thinking and component structure, not interface polish alone.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        problem: 'An enterprise application your operations teams depend on',
        solution:
          'Angular or .NET experience, with real exposure to workflow-heavy internal systems. The hard parts are complex state, reporting across departments and access control — so review how the developer handles data flow and permissions before anything visual.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'A legacy application on an outdated framework',
        solution:
          'A developer who plans incremental migration rather than a rewrite: assessing technical debt, adding test coverage before changing behaviour, replacing components in stages and controlling regression. Containerization and a CI/CD pipeline usually come with it.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        problem: 'An application that needs to reach systems it does not yet reach',
        solution:
          'Integration experience above framework preference — REST and GraphQL, OAuth 2.0, webhooks, payment gateways, CRMs, ERPs and identity providers. Ask how the developer handles partial failure, retries and credential management, because that is where integrations break.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        problem: 'A product that is slowing down as usage grows',
        solution:
          'Performance and scalability work: query and index tuning, caching layers, bundle size, rendering strategy and infrastructure use. Evaluate whether the developer measures before changing things — the alternative is expensive guesswork.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  capabilities: {
    eyebrow: 'Capabilities',
    title: 'Web App Developers for Your Product Requirements',
    body: 'Developers who turn requirements into reliable digital products, strengthen the systems you already run, and help the application adapt as priorities change.',
    items: [
      {
        name: 'SaaS Application Development',
        body: 'Build and expand subscription-based applications with account management, user permissions, dashboards, workflow automation, billing integrations and reporting aligned to your operating model.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Customer and Partner Portals',
        body: 'Secure web portals for customers, employees, vendors and partners — account access, document sharing, communication, transactions, approvals and self-service workflows in one application.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Enterprise Web Applications',
        body: 'Internal platforms supporting operational workflows, reporting, resource management and data access across departments, systems and distributed business teams.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Ecommerce Applications',
        body: 'Storefronts, marketplaces, ordering platforms, payment workflows and product-management systems that connect with your business applications and external services.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
      {
        name: 'API and System Integrations',
        body: 'Connect your application with PostgreSQL, MySQL, MongoDB and SQL Server, plus payment gateways, CRMs, ERPs, analytics platforms and identity providers through REST APIs and GraphQL.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Web Application Modernization',
        body: 'Update legacy applications, replace outdated frameworks and migrate workloads to AWS, Azure or Google Cloud, improving architecture and containerization with Docker and Kubernetes behind CI/CD pipelines.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'Performance and Scalability Engineering',
        body: 'Improve application responsiveness, database performance, caching, infrastructure use and code quality as user demand and operational complexity increase.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
      {
        name: 'Maintenance and Enhancement',
        body: 'Add features, resolve technical issues, update dependencies and strengthen automated, integration and performance testing so continuous development of an existing application stays safe.',
        image: '/images/landing/services/svc-security-governance.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Start With a Trial',
    title: 'Find the Right Developer Before You Commit',
    body: 'Choose the engagement model that fits your project, then use the 40-hour risk-free trial to assess real work before making a longer-term commitment.',
    cta: { label: 'Start Your 40-Hour Trial', href: '#enquiry' },
  },

  engagement: {
    eyebrow: 'Engagement Models',
    title: 'Flexible Ways to Hire Web App Developers',
    body: 'Choose an approach that reflects your application scope, delivery responsibilities, the flexibility you need, and the way your existing team works.',
    blocks: [
      {
        label: 'Dedicated developer',
        body: 'A developer working closely with your team on product enhancements, ongoing development, application maintenance, modernization or longer-term technical requirements.',
      },
      {
        label: 'Time and material',
        body: 'A flexible model for evolving applications, where scope, technical requirements, delivery priorities or resource needs may change during development.',
      },
      {
        label: 'Fixed bid',
        body: 'For work whose requirements, deliverables, milestones, responsibilities and acceptance conditions are defined sufficiently before development begins.',
      },
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'Our Process for Hiring a Web App Developer',
    body: 'From an initial requirement to a developer inside your sprint routine — structured so technical fit, communication and availability are all assessed before you commit.',
    steps: [
      {
        n: '01',
        name: 'Share the Job Description',
        body: 'Tell us the required technologies, responsibilities, experience level and project expectations, along with the engagement model you have in mind.',
      },
      {
        n: '02',
        name: 'Review Shortlisted Profiles',
        body: 'Receive developers matched to your technology stack and project requirements, typically within 24 to 48 hours of the requirement review.',
      },
      {
        n: '03',
        name: 'Interview the Shortlist',
        body: 'Assess technical knowledge, relevant experience, communication, problem-solving approach and understanding of the responsibilities your project involves.',
      },
      {
        n: '04',
        name: 'Begin the 40-Hour Risk-Free Trial',
        body: 'Evaluate technical execution, code quality, communication, responsiveness and compatibility with your team through practical work in your own environment.',
      },
      {
        n: '05',
        name: 'Onboard and Scale',
        body: 'Sign the SLA and NDA, then integrate the developer into your tools, workflows and communication routines — and add capacity from there when you need it.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Hire by Technology',
    title: 'Hire Web App Developers by Technology',
    body: 'Select against your application architecture, existing stack and integration requirements so a developer can contribute without an extended ramp-up. Laravel, Django, Ruby on Rails and MEAN specialists are available on the same terms.',
    items: [
      {
        key: 'frontend',
        name: 'React Developers',
        body: 'Responsive interfaces, dashboards, portals and interactive single-page applications built on React and component-based frontend architecture.',
      },
      {
        key: 'web',
        name: 'Angular Developers',
        body: 'Structured single-page applications, dashboards, portals and complex interfaces using Angular, TypeScript and reusable component libraries.',
      },
      {
        key: 'api',
        name: 'Node.js Developers',
        body: 'APIs, real-time services, backend applications and event-driven systems built on Node.js and the server-side JavaScript ecosystem.',
      },
      {
        key: 'backend',
        name: '.NET Developers',
        body: 'Enterprise applications, APIs, cloud-connected systems and business platforms using .NET, ASP.NET Core, C# and Azure.',
      },
      {
        key: 'data',
        name: 'Java Developers',
        body: 'Enterprise systems, high-traffic platforms, backend services and API-driven applications using Java and its supporting frameworks.',
      },
      {
        key: 'automation',
        name: 'Python Developers',
        body: 'Web platforms, backend services, APIs, automation workflows and data-connected applications using Python and the relevant frameworks.',
      },
      {
        key: 'integration',
        name: 'PHP Developers',
        body: 'Custom platforms, ecommerce applications, portals, APIs and content-driven systems built on PHP and its established ecosystem.',
      },
      {
        key: 'fullstack',
        name: 'MERN Stack Developers',
        body: 'Interactive, component-driven web applications on MongoDB, Express.js, React and Node.js across one JavaScript stack.',
      },
      {
        key: 'performance',
        name: 'Next.js Developers',
        body: 'React applications needing server-side rendering, static generation, structured routing and a maintainable frontend architecture.',
      },
    ],
  },

  comparison: hiringComparison({
    title: 'Soft Suave vs an In-House Hire vs a Freelancer',
    body: 'Web application work is rarely finished, which makes the hiring route a long-lived decision. These are the factors that usually settle it.',
    column: 'Soft Suave developer',
  }),

  techStack: {
    eyebrow: 'Technology Stack',
    title: 'Technology Expertise for Modern Web Applications',
    body: 'Work with technologies aligned to your existing architecture and long-term product direction, instead of forcing your project into a predetermined stack.',
    groups: [
      {
        name: 'Frontend',
        items: ['React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux'],
      },
      {
        name: 'Backend',
        items: ['Node.js', '.NET', 'Python', 'Java', 'PHP', 'Laravel', 'Django', 'Ruby on Rails', 'Express'],
      },
      {
        name: 'Databases',
        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Server', 'Redis'],
      },
      {
        name: 'APIs and Integrations',
        items: ['REST APIs', 'GraphQL', 'OAuth 2.0', 'Webhooks', 'Payment gateways'],
      },
      {
        name: 'Cloud and DevOps',
        items: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
      },
      {
        name: 'Testing',
        items: ['Jest', 'Cypress', 'Playwright', 'Selenium', 'JUnit', 'PyTest'],
      },
      {
        name: 'AI and Automation',
        items: ['OpenAI API', 'LangChain', 'Hugging Face', 'Vector databases', 'RAG pipelines'],
      },
    ],
  },

  faq: {
    eyebrow: 'FAQs',
    title: 'Questions About Hiring Web App Developers',
    body: 'Clear answers on the process, evaluation, technologies, intellectual property and cost.',
    items: [
      {
        q: 'How do I hire web app developers from Soft Suave?',
        a: 'Share your technical and project requirements, review matched profiles, interview the specialists you shortlist, and begin a 40-hour risk-free trial. After the evaluation, the selected developer is integrated into your tools, workflows and delivery process.',
      },
      {
        q: 'Can I interview developers before hiring them?',
        a: 'Yes. You can interview shortlisted developers before the engagement starts. The interview helps you evaluate technical knowledge, relevant experience, communication, problem-solving approach, availability and understanding of the responsibilities your web application project involves.',
      },
      {
        q: 'What can I evaluate during the 40-hour trial?',
        a: 'Technical execution, code quality, communication, responsiveness, requirement understanding and compatibility with your team. The evaluation can use practical responsibilities connected to the proposed engagement and your own development environment.',
      },
      {
        q: 'Can I hire one developer or a complete team?',
        a: 'Either. A complete web application team can include specialists for frontend development, backend engineering, testing, integrations, cloud infrastructure and related responsibilities, based on your delivery requirements.',
      },
      {
        q: 'Which technologies do your web developers support?',
        a: 'Technologies including React, Next.js, Angular, Vue.js, Node.js, .NET, Java, Python, PHP, PostgreSQL, MongoDB, AWS, Azure, Docker and Kubernetes. The final combination depends on your existing architecture and application requirements.',
      },
      {
        q: 'Can developers work with our existing engineering team?',
        a: 'Yes — through shared repositories, project-management platforms, communication tools, sprint routines, documentation, testing processes and code-review practices. The collaboration approach is agreed around your established development workflow and role requirements.',
      },
      {
        q: 'How do you protect our intellectual property?',
        a: 'Intellectual-property responsibilities are documented through the applicable engagement agreement and NDA before development begins. Project access, repositories, credentials and development environments follow the controls agreed for your organization and the responsibilities assigned to the developer.',
      },
      {
        q: 'How much does it cost to hire web app developers?',
        a: 'Rates start at $14 per hour and vary by skill, experience, engagement model and project requirements. The final rate also depends on responsibilities, duration, team composition and collaboration needs. Ask us for a rate card for the role you need.',
      },
      {
        q: 'How quickly can I receive matched developer profiles?',
        a: 'Typically within 24 to 48 hours after we review your technologies, responsibilities, experience requirements, availability and engagement needs. Timing may vary for highly specialised roles.',
      },
      {
        q: 'Can developers overlap with US or UK working hours?',
        a: 'Yes. We can arrange 4 to 6 hours of working-time overlap based on your collaboration needs and developer availability. Preferred hours, meeting schedule and communication expectations are agreed before onboarding.',
      },
    ],
  },
};
