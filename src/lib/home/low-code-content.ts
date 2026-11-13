import type { HeroContent } from '@/components/landing/hero';
import type { FaqContent } from '@/components/landing/faq';
import type { CardGridContent } from '@/components/landing/industries';
import type { CtaBandContent } from '@/components/landing/cta-band';
import type { ProcessContent } from '@/components/landing/process';
import { heroForm } from '@/lib/home/hire-roles/shared';
import { CLIENTS_PLUS, COUNTRIES_PLUS, SPECIALISTS_PLUS, YEARS_PLUS } from '@/lib/company-figures';

/**
 * /low-code-development-company — softsuave.com's "Best Low-Code Development Company in India" page, word
 * for word: the banner with its quote form, the overview, the six platforms, the nine benefits, the "Are You
 * Ready…" band with its four figures, the hiring steps, the "Considered the Best" cards, the FAQs and the
 * closing "Book Free Consultation" band. Images are under /images/low-code.
 *
 * The live steps and "Considered the Best" cards are worded for MERN, and the steps' intro says "1-week
 * free trial"; all of that is the live page's own copy and is kept as it stands.
 */

export const lcMeta = {
  path: '/low-code-development-company',
  shortTitle: 'Low-Code Development Company',
  title: 'Low code development company in india - Soft Suave',
  description:
    'Partner with a low code development company in India to accelerate digital transformation through rapid app delivery and innovative solutions.',
} as const;

const IMG = '/images/low-code';

/** A run of copy: plain text, a bold phrase, or a link. */
export type Piece =
  | string
  | { readonly b: string }
  | { readonly text: string; readonly href: string };

export const lcHero: HeroContent = {
  titleLines: ['Best Low-Code Development Company in India'],
  accent: 'Low-Code Development Company',
  titleScale: 'home',
  accentGradient: true,
  body: ['Improve efficiency, reduce costs, and streamline processes with the fastest low-code app development company.'],
  points: [
    'Expertise in low-code development',
    'Rapid application development',
    'Business-specific custom software solutions',
    'Easy to modify and update',
    'Complete support and maintenance for the app',
  ],
  form: {
    ...heroForm({
      title: 'Request a FREE App Quote!',
      requirementLabel: 'How Can We Help (Requirement)',
      requirementPlaceholder: 'How Can We Help (Requirement)',
      subject: 'Low-code development enquiry',
      noEyebrow: true,
    }),
    submit: 'Hire Now',
  },
};

export const lcAbout = {
  title: 'A Trustworthy Low Code App Development Agencies in india',
  body: 'Develop applications faster, with Affordable costs and improved reliability.',
  paragraphs: [
    [
      'Soft Suave is a ',
      { b: 'Low Code Development Company in India and USA' },
      ' that helps businesses build custom software applications quickly and cost-effectively. It uses a visual drag-and-drop interface to create applications that are tailored to the specific needs of the business, and the code is generated automatically, cutting down on development time and costs. ',
      { b: 'Low-code development platforms' },
      ' provide a convenient way of creating powerful applications with minimal coding.',
    ],
    [
      'It makes it easier for businesses to quickly create, deploy, and maintain the web and mobile applications. Another benefit of low-code app development is that it reduces the risk of errors and bugs. As developers can quickly visualize and test their code changes, they can quickly identify and fix issues, reducing the time and cost associated with resolving them.',
    ],
    [
      'It also helps to reduce the dependency on IT teams for application development and maintenance, allowing enterprises to quickly respond to changing business requirements. Well, Looks like an Instant software solution with customization. Why not give it a shot?',
    ],
  ] as readonly (readonly Piece[])[],
  image: { src: `${IMG}/overview.svg`, width: 600, height: 480, alt: '' },
} as const;

export const lcPlatforms = {
  title: 'Low Code Development Platforms',
  accent: 'Development Platforms',
  body: [
    'We use the Most Powerful and popular platform for ',
    { b: 'Low code development services' },
    ' to make advanced and innovative applications for you.',
  ] as readonly Piece[],
  items: [
    { name: 'Zoho Creator', src: `${IMG}/platforms/p1.svg` },
    { name: 'Salesforce Lightning', src: `${IMG}/platforms/p2.svg` },
    { name: 'Power Apps', src: `${IMG}/platforms/p3.svg` },
    { name: 'Outsystems', src: `${IMG}/platforms/p4.svg` },
    { name: 'Mendix', src: `${IMG}/platforms/p5.svg` },
    { name: 'Node-RED', src: `${IMG}/platforms/p6.svg` },
  ],
} as const;

export const lcBenefits = {
  title: 'Why You Should Go For Low Code App Development?',
  accent: 'Low Code',
  body: "Soft Suave's low-code app development services has many advantages. Here are a few reasons why you should choose it.",
  items: [
    { name: 'Lowers Time To Value (LTV)', src: `${IMG}/benefits/b1.svg`, body: 'With low code development service, you get greater value in less time by rapidly developing applications tailored to your business needs.' },
    { name: 'Scalable Solutions', src: `${IMG}/benefits/b2.svg`, body: 'On a cloud-native architecture, low-code development platforms develop maintainable solutions which are easy to scale. These applications can handle a large number of users and heavy workloads or transactions.' },
    { name: 'Agile Framework', src: `${IMG}/benefits/b3.svg`, body: 'It facilitates a smooth and speedy function of app capabilities over multiple devices for the required agility in app development through low code development.' },
    { name: 'Easy Transformation', src: `${IMG}/benefits/b4.svg`, body: 'As a result of low code development, application transformation becomes very easy. You will not spend hours on tedious coding, so you can make changes as soon as your business requires them, and it will also be easier to implement.' },
    { name: 'Multi-Experience Development', src: `${IMG}/benefits/b5.svg`, body: 'Low-code developers design digital strategies to engage customers. They use pre-built templates, automated refactoring, and easy chatbots to provide an excellent user experience.' },
    { name: 'Saves Costs', src: `${IMG}/benefits/b6.svg`, body: 'Automation enables organizations to develop more apps in less time, saving them money in the long run. What previously took months now only takes days, with fewer developers needed.' },
    { name: 'Automated Refactoring', src: `${IMG}/benefits/b7.svg`, body: 'Due to their comprehensive knowledge of low-code platforms, the experts can design responsive apps and improve the maintenance, performance, and security of the app.' },
    { name: 'Enterprise-Grade Security', src: `${IMG}/benefits/b8.svg`, body: 'Low code developers deliver secure applications by leveraging integrated enterprise-class security scanning and authentication solutions from third parties' },
    { name: 'Low-Maintenance Required', src: `${IMG}/benefits/b9.svg`, body: 'Through the visual development environment, low code platforms address the bottlenecks in the software application development process, in the design stage itself, thus minimizing maintenance requirements.' },
  ],
} as const;

export const lcReady: CtaBandContent = {
  title: 'Are You Ready To Develop Low-Code Mobile Apps?',
  body: 'With our low code developers, you get technically and aesthetically customized applications that work seamlessly across multiple devices, even with constant updates. Our low-code mobile app development expertise and proven experience transform your business ideas into reality. Boost your application development speed with our low-code services to build scalable applications at an accelerated pace.',
  cta: { label: 'Get Started', href: '/free-quote' },
  stats: [
    { figure: YEARS_PLUS, label: 'Years' },
    { figure: SPECIALISTS_PLUS, label: 'Experts' },
    { figure: COUNTRIES_PLUS, label: 'Countries' },
    { figure: CLIENTS_PLUS, label: 'Clients' },
  ],
};

export const lcSteps: ProcessContent = {
  eyebrow: '',
  title: 'Hire Low code App Developers in 5 Easy Steps',
  body: 'Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.',
  steps: [
    { n: '01', name: 'Share the MERN Stack JD', body: 'Send your MERN stack needs with project scope, skills, experience, and timeline.' },
    { n: '02', name: 'Review Soft Suave’s MERN Shortlist', body: 'Review curated MERN profiles with skills, experience, availability, and project fit details.' },
    { n: '03', name: 'Run the 40-Hour Free Trial', body: 'Start a 40-hour trial to assess coding skills, communication, quality, and delivery approach.' },
    { n: '04', name: 'Onboard the MERN Developer to Your Team', body: 'Sign SLA and NDA, complete onboarding, and integrate the MERN developer into your workflow.' },
  ],
};

export const lcBest: CardGridContent = {
  eyebrow: '',
  title: 'Why Are Our Low Code App Developers Considered the Best?',
  body: 'Our strong team of Low Code App Developers has exceptional knowledge in the front end, back end, and integration solutions.',
  items: [
    { name: 'Senior MERN Stack Talent', body: 'Hire skilled MERN developers with expertise in MongoDB, Express, React, Node, APIs, and cloud.', icon: 'users' as const },
    { name: 'Daily Reports + Clear Communication', body: 'Get daily updates and sprint reports to stay informed on progress, priorities, blockers, and delivery.', icon: 'gauge' as const },
    { name: 'Free Project Quote Within 24 Hours', body: 'Receive a clear project quote within 24 hours based on your scope, timeline, and needs.', icon: 'globe' as const },
    { name: 'Dedicated Project Manager Support', body: 'A dedicated manager ensures smooth coordination, tracking, and communication throughout the project.', icon: 'shield' as const },
    { name: 'Flexible MERN Engagement Models', body: 'Choose fixed price, time and material, or dedicated team models to match your project needs.', icon: 'book' as const },
    { name: 'Flexible Engagement Models', body: 'Hire our experts from three custom engagement models as per your need - Full time, Part-time, and Milestone.', icon: 'coins' as const },
  ].map((it) => ({ ...it, link: false as const })),
};

export const lcFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Here are some FAQs to enlighten you about the Low code app development service we provide',
  items: [
    {
      q: 'What is low code development and how does it work?',
      a: 'Low code development is a way to build software applications quickly and easily without having to write a lot of code. Instead, developers can use pre-built modules and visual interfaces to create applications faster. This approach makes software development more efficient and reduces the need for highly skilled programmers.',
    },
    {
      q: 'What are the benefits of using low code development for software development?',
      a: "Low code development is awesome for software development! It makes things faster, cheaper, and easier for everyone involved. Basically, you don't need to be a super skilled programmer to make great applications. You can use visual tools and pre-built parts to put your app together. This means that anyone, even non-technical people, can be a part of the process.",
    },
    {
      q: 'What kind of applications can be built using low-code development?',
      a: 'With low-code development, you can build a variety of applications, from simple to complex ones. You can create mobile apps, web apps, and even automate business processes. Some examples of applications that can be built using low-code development include inventory management systems, customer relationship management (CRM) tools, project management software, and more.',
    },
    {
      q: 'Is low code development suitable for enterprise-level applications and projects?',
      a: 'Yes,Low code development is a suitable option for enterprise-level applications and projects. It simplifies the complicated process, makes it more efficient, and cost-effective. Therefore, it is worth considering for enterprise-level projects.',
    },
    {
      q: 'What are some popular low code development platforms and tools available in the market?',
      a: "There are lots of great low code development platforms and tools out there. Some of the most popular ones include Microsoft Power Apps, OutSystems, Appian, Salesforce Lightning, Mendix, and Google App Maker. They each have their own unique features and benefits, so it's important to do your research and find the one that's best for you. With these platforms, you can easily build custom applications without having to write a lot of code. So, take your pick and start creating!",
    },
  ],
};
