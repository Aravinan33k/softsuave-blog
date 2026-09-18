/**
 * Content for `/hire-software-developers`.
 *
 * Source: softsuave.com/hire-software-developers, and nothing else. Every
 * heading, paragraph, card, step, table cell, technology name and FAQ answer
 * below is that page's own text. Where this surface's sections are named
 * differently, the mapping is:
 *
 *   hero                → the H1, its sub-copy and the five hero bullets
 *   overview            → "Hire Software Developers with the Skills Your Team Needs"
 *   specialisations     → "Hire Remote Software Developers for Your Technology Needs"
 *   globalDelivery      → "Global Delivery for Distributed Development Teams"
 *   process             → "Our 4-Step Process to Hire a Software Developer"
 *   midCta              → "Hire the Right Software Developer with a 40-Hour Trial"
 *   techStack           → "Technology Stack for Modern Software Engineering"
 *   whyRole             → "Why Hire Software Developers From Soft Suave?"
 *   comparison          → the Soft Suave / in-house / freelancer table
 *   faq                 → "Frequently Asked Questions About Hiring Developers"
 *
 * `capabilities` is omitted: the live page has one "what you can hire" band,
 * not two, and that band is the linked discipline list in `specialisations`.
 */

import type { HireRolePageContent } from './types';
import { heroForm, hiringComparison } from './shared';

export const software: HireRolePageContent = {
  key: 'hire-software',
  slug: '/hire-software-developers',
  name: 'Hire Software Developers',
  serviceType: 'Software development staffing',

  /** Live order: clients, overview, developer expertise, global delivery, evaluation, trial, tech stack, why choose us, comparison, testimonials, FAQ. */
  order: [
    'clients',
    'overview',
    'specialisations',
    'globalDelivery',
    'process',
    'midCta',
    'techStack',
    'whyRole',
    'comparison',
    'testimonials',
    'faq',
  ],

  meta: {
    title: 'Hire Software Developers from India | Remote & Dedicated Teams',
    description:
      'Hire experienced software developers from India, matched to your technology stack, project requirements, and team needs. 40-hour risk-free trial.',
  },

  hero: {
    titleLines: ['Hire Software Developers:', 'Get the Right Talent for Your Next Project'],
    body: [
      'Hire experienced software developers from India, matched to your technology stack, project requirements, and team needs. Add the right expertise to accelerate development, strengthen delivery, and support your business goals.',
      'Review relevant profiles, interview developers directly, and use a 40-hour risk-free trial to evaluate fit before extending the engagement.',
    ],
    points: [
      'Project-Ready Developer Profiles',
      '400+ AI & Engineering Specialists',
      '40-Hour Risk-Free Trial',
      'Flexible Hiring Options',
      'Direct Developer Collaboration',
    ],
    form: heroForm({
      title: 'Get Skilled Software Developers',
      requirementLabel: 'How can we help (your requirement)',
      requirementPlaceholder:
        'Tell us about your project scope, required skills, timeline, and preferred hiring model.',
      subject: 'Software developer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire Software Developers with the Skills Your Team Needs',
    paragraphs: [
      'Hiring software developers gives you additional engineering capacity without requiring every role to become a permanent internal hire. The right developer should match your technology stack, responsibilities, delivery process, and collaboration requirements.',
      'Soft Suave helps you identify software developers for hire across frontend, backend, full-stack, mobile, and cloud-focused development. You can review relevant experience, interview shortlisted developers, and evaluate how they work with your team before continuing the engagement.',
      'This approach can support new product development, ongoing feature delivery, modernization, integrations, technical capacity gaps, and longer-term engineering requirements.',
    ],
  },

  midCta: {
    eyebrow: 'Start With a Trial',
    title: 'Hire the Right Software Developer with a 40-Hour Trial',
    body: 'Evaluate your developer through real project work and assess technical execution, communication, responsiveness, and team compatibility before extending the engagement.',
    cta: { label: 'Start Your 40-Hour Trial', href: '#enquiry' },
  },

  globalDelivery: {
    eyebrow: 'Global Delivery',
    title: 'Global Delivery for Distributed Development Teams',
    paragraphs: [
      'Hiring software developers in India gives global teams access to experienced technical talent across modern development stacks while supporting flexible team expansion and distributed delivery.',
      "Soft Suave's developers work across frontend, backend, full-stack, mobile, cloud, and DevOps technologies, with delivery teams based in Chennai and Bengaluru.",
      'You can integrate developers into your existing workflows through shared project tools, direct communication, agreed working-hour overlap, and established development processes.',
    ],
  },

  process: {
    eyebrow: 'Developer Evaluation',
    title: 'Our 4-Step Process to Hire a Software Developer',
    body: 'Make hiring simpler with a structured process designed to help you hire remote software developers who match your technical needs, collaboration style, and delivery expectations.',
    steps: [
      {
        n: '01',
        name: 'Share Your Developer Requirement',
        body: 'Share your project scope, required skills, timeline, and preferred hiring model with our team.',
      },
      {
        n: '02',
        name: 'Review Curated Developer Profiles',
        body: 'Get shortlisted developer profiles matched to your skills, goals, availability, and team needs.',
      },
      {
        n: '03',
        name: 'Start the 40-Hour Risk-Free Trial',
        body: "Test the developer's coding skills, communication, quality, and workflow fit before onboarding.",
      },
      {
        n: '04',
        name: 'Onboard the Developer to Your Team',
        body: 'Finalize SLA and NDA, set up communication, and integrate the developer into your workflow.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Developer Expertise',
    title: 'Hire Remote Software Developers for Your Technology Needs',
    body: 'Hire software developers in India with expertise across web, mobile, frontend, backend, full-stack, DevOps, and other technologies aligned to your project requirements.',
    items: [
      {
        key: 'web',
        name: 'Hire Web App Developers',
        body: 'Expand your team with skilled web app developers who craft responsive, convenient, and performant applications. Whether you need dynamic features or secure solutions, our developers bring your web vision to life with precision.',
        href: '/hire-web-app-developers',
      },
      {
        key: 'mobile',
        name: 'Hire Mobile App Developers',
        body: 'Hire mobile app developers for iOS and Android and elevate your mobile presence. We build smooth, intuitive, and high-performing mobile apps that drive engagement and provide users with seamless experiences on any device.',
        href: '/hire-mobile-app-developers',
      },
      {
        key: 'frontend',
        name: 'Hire Frontend Developers',
        body: 'Bring your user interfaces to life with frontend developers who create dynamic, visually appealing, and responsive applications. We ensure that your users have a seamless experience across all devices, while optimizing design and performance.',
        href: '/hire-frontend-application-developer',
      },
      {
        key: 'backend',
        name: 'Hire Backend Developers',
        body: "Enhance your application's foundation with backend developers who build secure, scalable, and efficient server-side systems. They ensure smooth data flow, robust integrations, and minimal downtime, supporting a flawless user experience.",
        href: '/hire-backend-application-developer',
      },
      {
        key: 'fullstack',
        name: 'Hire Fullstack Developers',
        body: 'Get versatile, well-rounded full-stack developers who manage both front-end and back-end development with expertise. They seamlessly integrate your application layers, ensuring scalability, security, and efficiency for end-to-end solutions.',
      },
      {
        key: 'devops',
        name: 'Hire DevOps Engineers',
        body: 'Speed up your development process with DevOps developers who ensure smooth collaboration between development and operations. They streamline continuous integration and delivery, enabling faster deployments, enhanced reliability, and system stability.',
        href: '/hire-devops-developers',
      },
      {
        key: 'blockchain',
        name: 'Hire Blockchain Developers',
        body: 'Unlock the power of blockchain with developers who build secure, decentralized applications. We create robust blockchain solutions, offering transparency, immutability, and efficiency for everything from smart contracts to crypto-based projects.',
        href: '/hire-blockchain-developer',
      },
      {
        key: 'ecommerce',
        name: 'Hire E-commerce Developers',
        body: 'Scale your online business with dedicated e-commerce developers. We specialize in building secure, user-friendly, and high-performing e-commerce platforms that enhance customer experience, drive conversions, and optimize your online sales process.',
      },
      {
        key: 'game',
        name: 'Hire Game Developers',
        body: 'Bring your game ideas to life with expert game developers who specialize in creating immersive, high-performance games for mobile, desktop, and consoles. We turn your vision into reality with cutting-edge technology and engaging gameplay experiences.',
      },
      {
        key: 'saas',
        name: 'Hire SaaS Developers',
        body: 'Transform your business with dedicated SaaS developers who create scalable and secure cloud-based apps. We deliver solutions that simplify operations, enhance customer experiences, and support your business goals with powerful SaaS platforms.',
      },
      {
        key: 'fintech',
        name: 'Hire Fintech Software Developers',
        body: 'Build innovative financial solutions with experienced fintech developers. We specialize in secure, high-impact apps that streamline financial operations, enhance user experience, and integrate cutting-edge tech to support the future of finance.',
      },
    ],
  },

  whyRole: {
    eyebrow: 'Why Choose Us',
    title: 'Why Hire Software Developers From Soft Suave?',
    body: 'See why businesses choose Soft Suave to hire software developers and what you can expect throughout the engagement.',
    items: [
      {
        key: 'experience',
        name: '13+ Years of Technology Expertise',
        body: 'Bring 13+ years of technology expertise into software development requirements across applications, integrations, modernization, and ongoing engineering work.',
      },
      {
        key: 'specialists',
        name: '400+ AI & Engineering Specialists',
        body: 'Soft Suave is backed by 400+ AI & Engineering Specialists across multiple development disciplines and technology areas.',
      },
      {
        key: 'trial',
        name: '40-Hour Risk-Free Trial',
        body: 'Evaluate technical execution, communication, responsiveness, and workflow compatibility before deciding whether to extend the developer engagement.',
      },
      {
        key: 'iso',
        name: 'ISO-Certified Information Security Management',
        body: 'Soft Suave is ISO/IEC 27001:2022 certified for information security management across our software development and delivery operations.',
      },
      {
        key: 'delivery',
        name: 'Global Delivery Support',
        body: 'Delivery presence across Chennai, Bengaluru, and the United States supports collaboration with distributed teams and international development requirements.',
      },
    ],
  },

  comparison: hiringComparison({
    title: 'Hiring a Software Developer: Soft Suave vs In-House vs Freelancer',
    body: 'Compare common hiring approaches and find the option that best fits your software development and team requirements.',
    column: 'Soft Suave Developer',
  }),

  techStack: {
    eyebrow: 'Tech Stack',
    title: 'Technology Stack for Modern Software Engineering',
    body: 'Work with frontend, backend, mobile, cloud, DevOps, and AI technologies that support scalable applications, efficient delivery, and modern software engineering workflows.',
    groups: [
      {
        name: 'Frontend',
        body: 'Build responsive interfaces using modern frameworks for scalable user experiences.',
        items: ['React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'JavaScript'],
      },
      {
        name: 'Backend',
        body: 'Develop secure backend systems, APIs, integrations, and business logic efficiently.',
        items: ['Node.js', '.NET', 'Python', 'Java', 'PHP', 'GraphQL'],
      },
      {
        name: 'Databases',
        body: 'Manage structured and vector data for reliable application performance needs.',
        items: ['PostgreSQL', 'Vector Databases'],
      },
      {
        name: 'Mobile',
        body: 'Create native and cross-platform apps for modern mobile experiences worldwide.',
        items: ['Swift', 'Kotlin', 'Flutter', 'React Native', 'Ionic', 'SwiftUI'],
      },
      {
        name: 'AI & Data',
        body: 'Build intelligent features using modern AI, data, and model technologies.',
        items: [
          'LLMs',
          'RAG',
          'Agentic AI',
          'PyTorch',
          'TensorFlow',
          'LangChain',
          'Hugging Face',
          'OpenAI API',
        ],
      },
      {
        name: 'Cloud & DevOps',
        body: 'Deploy scalable applications with automated cloud infrastructure and delivery workflows.',
        items: [
          'AWS',
          'Azure',
          'Google Cloud',
          'Docker',
          'Kubernetes',
          'Terraform',
          'Jenkins',
          'CI/CD',
          'Grafana',
        ],
      },
    ],
  },

  faq: {
    eyebrow: 'Ask Us',
    title: 'Frequently Asked Questions About Hiring Developers',
    body: 'Find clear answers to common questions about hiring software developers and what to expect before starting an engagement.',
    items: [
      {
        q: 'How much does it cost to hire a software developer?',
        a: "The cost depends on the developer's experience, technology stack, specialization, engagement duration, required capacity, and project responsibilities. Once we understand your requirements, we'll recommend the right developer and engagement model for your project. At Soft Suave, software developer rates start from $14/hour.",
      },
      {
        q: 'Can I interview a software developer before hiring?',
        a: 'Yes. You can interview shortlisted developers before starting the engagement to discuss their experience, technical skills, communication, project understanding, and suitability for your requirements.',
      },
      {
        q: 'What happens during the 40-hour risk-free trial?',
        a: 'The trial lets you evaluate the developer through practical working interaction. Assess technical execution, requirement understanding, communication, responsiveness, review participation, and compatibility with your development workflow before deciding whether the engagement should continue.',
      },
      {
        q: 'Can I hire software developers in India for a global team?',
        a: 'Yes. India-based developers can work with distributed teams through agreed communication windows, repositories, project-management tools, documentation, meetings, and delivery processes. Define your required working-hour overlap and collaboration expectations before the engagement begins.',
      },
      {
        q: 'Can I hire dedicated software developers for ongoing work?',
        a: 'Yes. Dedicated software developers can support ongoing products, platforms, backlogs, modernization programs, and other requirements where continuity matters. Define the expected capacity, responsibilities, technology stack, working model, and project context before profiles are matched.',
      },
      {
        q: 'When should I hire remote software developers?',
        a: 'Remote developers are suitable when your engineering work can be managed through shared development tools, documented processes, regular communication, and agreed working hours. They can support distributed teams without requiring the developer to work from your location.',
      },
      {
        q: 'Why would I hire offshore software developers?',
        a: 'Offshore hiring can expand the engineering talent available to your business and support distributed delivery. It works best when responsibilities, communication, reporting, access, working-hour overlap, and project ownership are clearly defined before the engagement starts.',
      },
      {
        q: 'What if the developer is not the right fit?',
        a: "If the developer profile isn't the right fit, we'll recommend an alternative profile at no additional cost, helping you continue the evaluation without disrupting your hiring process.",
      },
    ],
  },
};
