/**
 * Content for `/hire-software-developers`.
 *
 * Source: softsuave.com/hire-software-developers. Its sections map onto this
 * surface's as follows — overview → Overview, "developers for your technology
 * needs" → the specialisations grid, the 4-step process → Process (expanded to
 * the five stages the live copy actually describes, since interviewing is a
 * stage of its own there), "why hire from Soft Suave" → WhyUs, the
 * Soft Suave/in-house/freelancer table → Comparison, the technology stack →
 * TechStack, and the FAQ verbatim.
 */

import type { HireRolePageContent } from './types';
import { heroForm, hiringComparison } from './shared';

export const software: HireRolePageContent = {
  key: 'hire-software',
  slug: '/hire-software-developers',
  name: 'Hire Software Developers',
  serviceType: 'Software development staffing',

  meta: {
    title: 'Hire Software Developers from India | Remote & Dedicated Teams',
    description:
      'Hire software developers matched to your stack and delivery process. Interview shortlisted profiles, evaluate real work through a 40-hour risk-free trial, from $14/hour.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire Software Developers', 'for Your Next Project'],
    body: [
      'Add experienced software developers to your team, matched to your technology stack, project requirements, and the way your engineers already work. Strengthen delivery without turning every role into a permanent internal hire.',
      'Share what you need built, review profiles selected against it, interview the shortlist, and judge the work itself before the engagement continues.',
    ],
    points: [
      'Project-ready developer profiles',
      '400+ AI and engineering specialists',
      '40-hour risk-free trial',
      'Dedicated, time-and-material or fixed-bid hiring',
      'Direct collaboration with your developer',
    ],
    form: heroForm({
      title: 'Hire skilled software developers',
      requirementLabel: 'What do you need built?',
      requirementPlaceholder:
        'Technologies, responsibilities, experience level, team size and when you need to start.',
      subject: 'Software developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire Software Developers With the Skills Your Team Needs',
    paragraphs: [
      'Hiring software developers gives you additional engineering capacity without requiring every role to become a permanent internal hire. The right developer has to match your technology stack, the responsibilities you are handing over, your delivery process, and your collaboration requirements — a CV alone settles none of that.',
      'Soft Suave helps you identify software developers for hire across frontend, backend, full-stack, mobile, and cloud-focused development. You review relevant experience, interview the shortlist, and evaluate how a developer works with your team before the engagement continues.',
      'That suits new product development, ongoing feature delivery, modernization, integrations, a short-term capacity gap, or a longer-term engineering requirement. Rates start at $14 per hour and vary by skill, experience, engagement model and project scope.',
    ],
  },

  capabilities: {
    eyebrow: 'What Your Developer Can Own',
    title: 'Software Engineering Work You Can Hand Over',
    body: 'Developers take responsibility for real delivery, not isolated tickets — from the first build through integration, modernization and the maintenance that follows.',
    items: [
      {
        name: 'New Product and Platform Development',
        body: 'Build applications from architecture and data model through to release: server-side logic, interfaces, integrations, and the automated tests that keep the first version maintainable.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Ongoing Feature Delivery',
        body: 'Work a live backlog alongside your team — scoping, estimating, building and reviewing features inside your sprint routine rather than running a parallel project.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Application Modernization',
        body: 'Replace outdated frameworks, break apart tightly coupled logic, and migrate workloads to AWS, Azure or Google Cloud through planned incremental changes instead of a rewrite.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'API and System Integration',
        body: 'Connect your application to payment gateways, CRMs, ERPs, identity providers, analytics platforms and internal services through REST APIs, GraphQL and documented integration workflows.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Cloud and DevOps Collaboration',
        body: 'Contribute to containerization, CI/CD pipelines and deployment workflows with Docker, Kubernetes, Terraform and Jenkins, coordinating with whoever owns your infrastructure.',
        image: '/images/landing/services/svc-security-governance.webp',
      },
      {
        name: 'AI-Assisted Feature Development',
        body: 'Add LLM, RAG and agentic capabilities to an existing product using OpenAI APIs, LangChain and vector databases, with human review of every model-driven decision.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'Technical Capacity Cover',
        body: 'Fill a gap created by a departure, a parallel initiative or a release crunch, with a developer who joins your existing repositories, standards and review process.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Maintenance and Support',
        body: 'Resolve defects, update dependencies, investigate production issues and extend test coverage so the application keeps moving after the first release.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Start With a Trial',
    title: 'Hire the Right Software Developer With a 40-Hour Trial',
    body: 'Evaluate your developer through real project work — technical execution, communication, responsiveness and team compatibility — before extending the engagement.',
    cta: { label: 'Start Your 40-Hour Trial', href: '#enquiry' },
  },

  engagement: {
    eyebrow: 'Engagement Models',
    title: 'Flexible Ways to Hire Software Developers',
    body: 'Choose the structure that reflects how clearly the work is defined, how often your priorities change, and how your existing team prefers to work.',
    blocks: [
      {
        label: 'Dedicated developer',
        body: 'A developer who works closely with your team and stays focused on your product, your backlog and your priorities, for ongoing development and longer-term technical requirements.',
      },
      {
        label: 'Time and material',
        body: 'Flexible capacity for evolving work, where scope, technical requirements or delivery priorities are expected to change during development and effort is reviewed each cycle.',
      },
      {
        label: 'Fixed bid',
        body: 'For work whose requirements, deliverables, milestones, responsibilities and acceptance conditions are sufficiently defined before development begins.',
      },
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'How to Hire a Software Developer',
    body: 'A structured path from requirement to onboarding, designed so the decision rests on relevant experience, a direct conversation and real work — not on a shortlist you have to take on trust.',
    steps: [
      {
        n: '01',
        name: 'Share Your Developer Requirement',
        body: 'Tell us your project scope, the technologies involved, the responsibilities you are handing over, the experience you need, and your preferred hiring model.',
      },
      {
        n: '02',
        name: 'Review Curated Developer Profiles',
        body: 'Receive shortlisted profiles matched to your stack, goals, availability and team needs — typically within 24 to 48 hours of reviewing your requirement.',
      },
      {
        n: '03',
        name: 'Interview the Shortlist',
        body: 'Speak to the developers directly to assess technical depth, communication, problem-solving approach and their understanding of what your project actually involves.',
      },
      {
        n: '04',
        name: 'Run the 40-Hour Risk-Free Trial',
        body: 'Assign work that reflects the real engagement, then judge coding quality, requirement understanding, review participation and workflow fit before committing.',
      },
      {
        n: '05',
        name: 'Onboard the Developer to Your Team',
        body: 'Finalise the SLA and NDA, set up access and communication, and integrate the developer into your repositories, sprint routine and release process.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Developer Expertise',
    title: 'Hire Remote Software Developers by Discipline',
    body: 'Software development is not one role. Select against the discipline your project actually needs — or combine several into a team that covers the whole delivery surface. SaaS, blockchain, game and fintech specialists are available on the same terms.',
    items: [
      {
        key: 'web',
        name: 'Web App Developers',
        body: 'Responsive, performant browser-based applications — SaaS platforms, portals and internal systems, with the API work and integrations behind them.',
        href: '/hire-web-app-developers',
      },
      {
        key: 'mobile',
        name: 'Mobile App Developers',
        body: 'iOS and Android products, native or cross-platform, built for smooth navigation, device performance and store release requirements.',
        href: '/hire-mobile-app-developers',
      },
      {
        key: 'frontend',
        name: 'Frontend Developers',
        body: 'Interface implementation in React, Angular, Vue.js and Next.js, with reusable components, responsive behaviour and Core Web Vitals in view.',
        href: '/hire-frontend-application-developer',
      },
      {
        key: 'backend',
        name: 'Backend Developers',
        body: 'Secure, scalable server-side systems: application logic, APIs, databases, authentication and the integrations your product depends on.',
        href: '/hire-backend-application-developer',
      },
      {
        key: 'fullstack',
        name: 'Full-Stack Developers',
        body: 'Developers who carry a feature across both layers, integrating interface, API and data work rather than handing it between specialists.',
      },
      {
        key: 'devops',
        name: 'DevOps Engineers',
        body: 'Continuous integration and delivery, containerization, cloud infrastructure and monitoring, so releases become routine instead of eventful.',
        href: '/hire-devops-developers',
      },
      {
        key: 'ai',
        name: 'AI Developers',
        body: 'Generative AI, LLM applications, RAG pipelines and machine-learning features, added to products that already have users.',
        href: '/hire-ai-developer',
      },
      {
        key: 'qa',
        name: 'QA Engineers',
        body: 'Manual and automation testing across functional, API, regression and performance work, so quality is verified rather than assumed.',
        href: '/hire-qa-testers-india',
      },
      {
        key: 'ecommerce',
        name: 'eCommerce Developers',
        body: 'Storefronts, catalogues, checkout and payment flows, and the third-party integrations that keep an online business running.',
      },
    ],
  },

  comparison: hiringComparison({
    title: 'Soft Suave vs an In-House Hire vs a Freelancer',
    body: 'Each route suits a different situation. These are the factors that usually decide which one fits the work in front of you.',
    column: 'Soft Suave developer',
  }),

  techStack: {
    eyebrow: 'Technology Stack',
    title: 'Technology Stack for Modern Software Engineering',
    body: 'Frontend, backend, mobile, cloud, DevOps and AI technologies that support scalable applications and modern delivery workflows — matched to your architecture rather than to a preferred stack of ours.',
    groups: [
      {
        name: 'Frontend',
        items: ['React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'JavaScript'],
      },
      {
        name: 'Backend',
        items: ['Node.js', '.NET', 'Python', 'Java', 'PHP', 'GraphQL'],
      },
      {
        name: 'Databases',
        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Server', 'Redis'],
      },
      {
        name: 'Mobile',
        items: ['Swift', 'Kotlin', 'Flutter', 'React Native', 'Ionic', 'SwiftUI'],
      },
      {
        name: 'AI and Data',
        items: ['LLMs', 'RAG', 'PyTorch', 'TensorFlow', 'LangChain', 'Hugging Face', 'OpenAI API'],
      },
      {
        name: 'Cloud and DevOps',
        items: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Grafana'],
      },
    ],
  },

  faq: {
    eyebrow: 'FAQs',
    title: 'Questions About Hiring Software Developers',
    body: 'Clear answers to what companies ask before starting an engagement — cost, evaluation, time zones and what happens if a fit is wrong.',
    items: [
      {
        q: 'How much does it cost to hire a software developer?',
        a: 'Cost depends on the developer’s experience, technology stack, specialisation, engagement duration, required capacity and project responsibilities. Soft Suave’s software developer rates start from $14 per hour, and we recommend the right developer and engagement model once your requirements are understood.',
      },
      {
        q: 'Can I interview a software developer before hiring?',
        a: 'Yes. You can interview shortlisted developers before the engagement starts, to discuss their experience, technical skills, communication, understanding of your project and suitability for the responsibilities involved.',
      },
      {
        q: 'What happens during the 40-hour risk-free trial?',
        a: 'The trial lets you evaluate the developer through practical working interaction. You assess technical execution, requirement understanding, communication, responsiveness, review participation and compatibility with your development workflow before deciding whether the engagement should continue.',
      },
      {
        q: 'Can I hire software developers in India for a global team?',
        a: 'Yes. India-based developers work with distributed teams through agreed communication windows, shared repositories, project-management tools, documentation, meetings and delivery processes. Define the working-hour overlap and collaboration expectations you need before the engagement begins.',
      },
      {
        q: 'Can I hire dedicated software developers for ongoing work?',
        a: 'Yes. Dedicated developers suit ongoing products, platforms, backlogs and modernization programmes where continuity matters. Define the expected capacity, responsibilities, technology stack, working model and project context before profiles are matched.',
      },
      {
        q: 'When should I hire remote software developers?',
        a: 'Remote developers suit engineering work that can be managed through shared development tools, documented processes, regular communication and agreed working hours. They support distributed teams without requiring anyone to work from your location.',
      },
      {
        q: 'Why would I hire offshore software developers?',
        a: 'Offshore hiring widens the engineering talent available to your business and supports distributed delivery. It works best when responsibilities, communication, reporting, access, working-hour overlap and project ownership are defined clearly before the engagement starts.',
      },
      {
        q: 'What if the developer is not the right fit?',
        a: 'If a profile is not the right fit, we recommend an alternative at no additional cost, so you can continue the evaluation without disrupting your hiring process.',
      },
      {
        q: 'How quickly can I receive matched developer profiles?',
        a: 'Matched profiles are typically shared within 24 to 48 hours of reviewing your technologies, responsibilities, experience requirements, availability and engagement needs. Highly specialised roles can take longer.',
      },
    ],
  },
};
