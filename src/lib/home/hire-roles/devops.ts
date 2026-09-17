/**
 * Content for `/hire-devops-developers`.
 *
 * Source: softsuave.com/hire-devops-developers, and nothing else.
 *
 *   hero         → "Hire DevOps Developers from India in 48 hours"
 *   overview     → "Hire Remote DevOps Engineers Within 48 Hours"
 *   capabilities → "What Do Our DevOps Experts Do?" (6 cards)
 *   whyRole      → "What Makes Our DevOps Engineers Unique and Trustworthy?"
 *   process      → "Hire DevOps Programmers in 4 Easy Steps"
 *   comparison   → "Soft Suave vs. In-House vs. Freelancer." (5 rows)
 *   techStack    → "Explore Our DevOps Technology Competence" (6 groups)
 *   faq          → the seven questions, verbatim
 *
 * The live overview runs as two very long paragraphs; the second is split at a
 * sentence boundary so the column stays readable, with no wording changed.
 * The live comparison table has a stray character in one cell — "S1–2 weeks,
 * variable" — which is written here as the "1–2 weeks, variable" it means.
 *
 * No rate table: the live page publishes its tiers (Junior $14/hr, Mid-level
 * $18/hr, Senior $25/hr) inside an FAQ answer, which is where they stay.
 * No technology grid, no engagement band and no mid-page CTA — this page runs
 * none of them.
 */

import type { HireRolePageContent } from './types';
import { heroForm } from './shared';

export const devops: HireRolePageContent = {
  key: 'hire-devops',
  slug: '/hire-devops-developers',
  name: 'Hire DevOps Engineers',
  serviceType: 'DevOps engineering staffing',

  /** Live order: overview, services, process, why us, comparison, technology competence, testimonials, FAQ. This page runs no client-logo strip. */
  order: [
    'overview',
    'capabilities',
    'process',
    'whyRole',
    'comparison',
    'techStack',
    'testimonials',
    'faq',
  ],

  meta: {
    title: 'Hire DevOps Engineers in India | 40-Hour Trial – Soft Suave',
    description:
      'Hire pre-vetted DevOps engineers experienced in CI/CD, Kubernetes, Docker, AWS and Azure, matched to your project within 48 hours. Rates from $14/hour.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire DevOps Developers', 'from India in 48 hours'],
    body: [
      "Soft Suave provides pre-vetted DevOps engineers experienced in CI/CD, Kubernetes, Docker, AWS and Azure, matched to your project within 48 hours. Every engagement starts with a 40-hour risk-free trial, with rates from $14/hour and no long-term contract required until you're satisfied.",
    ],
    points: [
      '40-Hour Risk-Free Trial',
      'Hire Top DevOps Developers in India',
      'Time-Zone & Language Aligned Teams',
      'Airtight NDA & IP Protection',
      'Strong Delivery Governance from Day One',
    ],
    badges: ['*Satisfaction Guaranteed – Get 40-hour Free Trial'],
    form: heroForm({
      title: 'Get Skilled Remote Developers',
      requirementLabel: 'Requirements',
      requirementPlaceholder:
        'Your cloud, pipelines and clusters, the responsibilities involved, and when you need to start.',
      subject: 'DevOps engineer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire Remote DevOps Engineers Within 48 Hours',
    paragraphs: [
      'Redefine your software delivery & deployment strategy to the next level by hiring our DevOps developers.',
      'Do your development and operational environment need to be automated? Hire Remote DevOps Developers from a leading DevOps development company like us for better integration. Our dedicated developers team would conduct a complete analysis of your business to integrate DevOps automation into your IT ecosystem. For this, we create and follow a detailed roadmap. We have helped many Startups and SMBs to accelerate time-to-market, increase efficiency and add value to their organization with our exceptional services. Our dedicated DevOps engineers (Amazon AWS or Microsoft Azure) focus on controlling the entire software implementation and delivery process to automate hefty workflow activities.',
      'Our offshore DevOps programmers are delivering successful projects for more than 13+ years which helped them to gain immense knowledge to solve any issue. Since, our developers have hands-on experience working with robust DevOps tools like Gradle, Git, Jenkins, Bamboo, etc., they have the capability to achieve world-class IT service delivery.',
      "As an expert DevOps consulting company, we help businesses to realize the full potential of collaborated performance, software quality & delivery speed. Also, our senior DevOps engineers upgrade enterprise Apps, improve IT security, and utilize infrastructure resources with a motive to increase our client's customer satisfaction, retention, and business efficiency.",
    ],
  },

  capabilities: {
    eyebrow: 'Services',
    title: 'What Do Our DevOps Experts Do?',
    body: 'Connect with the most reliable DevOps developers to improve the quality of code and undertake continuous integration.',
    items: [
      {
        name: 'Enterprise DevOps Solutions',
        body: 'Our offshore DevOps Engineers can effectively manage your entire management tasks through scalable enterprise solutions. Be it performance optimization, release management, new server setup, or change management, we have a solid workflow for continuous delivery and deployment for these tasks.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Dedicated DevOps Developers',
        body: 'We help you to minimize the incidents of failures, rollbacks and get strong source control, and elasticity in cloud computing. Also, we attain better scalability and availability of your DevOps infrastructure by executing top cloud platforms like Amazon AWS, Google Cloud, and Microsoft Azure.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'DevOps PAAS',
        body: "Implementing a framework to develop, customize and deploy apps for our client's business needs related to API management, seamless integration, strategy execution, and support across multi-cloud environments. Also, our developer's knowledge makes sure continuous DevOps software development services.",
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'DevOps Automation',
        body: "Our DevOps specialist's automation services include installing, configuring servers, and establishing communication across different software. Also, we take care of security, testing, operations, integration, and development pipelines to ensure top-class codes and speed up your software operations.",
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
      {
        name: 'DevOps Consulting Services',
        body: 'Streamline and boost your development process by partnering with our strong consulting team. We have helped many businesses to bring DevOps from designing, assessment, development, overall management, implementation to automation.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Configuration & Integration',
        body: 'Our team of skilled programmers offers comprehensive configuration management and integration solutions. We improve your IT structure by utilizing components such as Artifact, source code repository, and continuous CI/CD integration with Jenkins, Azure DevOps Server.',
        image: '/images/landing/services/svc-security-governance.webp',
      },
    ],
  },

  whyRole: {
    eyebrow: 'Why Us',
    title: 'What Makes Our DevOps Engineers Unique and Trustworthy?',
    body: 'Reducing deployment risk and accelerating release cycles is made easy when you hire DevOps engineers from us.',
    items: [
      {
        key: 'talent',
        name: 'Senior DevOps Talent',
        body: 'Hire skilled DevOps engineers with expertise in Kubernetes, Docker, CI/CD pipelines, cloud infrastructure, and automation.',
      },
      {
        key: 'reporting',
        name: 'Daily Reports + Clear Communication',
        body: 'Get daily updates and sprint reports to stay informed on progress, priorities, blockers, and delivery.',
      },
      {
        key: 'quote',
        name: 'Free Project Quote Within 24 Hours',
        body: 'Receive a clear project quote within 24 hours based on your scope, timeline, and needs.',
      },
      {
        key: 'manager',
        name: 'Dedicated Project Manager Support',
        body: 'A dedicated manager ensures smooth coordination, tracking, and communication throughout the project.',
      },
      {
        key: 'models',
        name: 'Flexible DevOps Engagement Models',
        body: 'Choose fixed price, time and material, or dedicated team models to match your project needs.',
      },
      {
        key: 'hiring',
        name: 'Flexible Engagement Models',
        body: 'Hire our experts from three custom engagement models as per your need - Full time, Part-time, and Milestone.',
      },
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'Hire DevOps Programmers in 4 Easy Steps',
    body: 'Below is the simple Full-time Hiring Process that we follow while offering a 40-hour free trial to our clients.',
    steps: [
      {
        n: '01',
        name: 'Share the DevOps JD',
        body: 'Send your DevOps hiring needs with project scope, skills, experience, and timeline.',
      },
      {
        n: '02',
        name: "Review Soft Suave's DevOps Shortlist",
        body: 'Review curated DevOps profiles with skills, experience, availability, and project fit details.',
      },
      {
        n: '03',
        name: 'Run the 40-Hour Free Trial',
        body: 'Start a 40-hour trial to assess coding skills, communication, quality, and delivery approach.',
      },
      {
        n: '04',
        name: 'Onboard the DevOps Engineer to Your Team',
        body: 'Sign SLA and NDA, complete onboarding, and integrate the DevOps engineer into your workflow.',
      },
    ],
  },

  comparison: {
    eyebrow: 'Comparison',
    title: 'Soft Suave vs. In-House vs. Freelancer.',
    body: 'Compare common hiring approaches and find the option that best fits your software development and team requirements.',
    columns: ['Factor', 'In-House Hire', 'Freelancer', 'Soft Suave DevOps Engineer'],
    rows: [
      {
        criterion: 'Time to onboard',
        values: ['4–8 weeks', '1–2 weeks, variable', '48 hours'],
      },
      {
        criterion: 'Recurring overhead',
        values: [
          '$2,000–$3,000/month',
          '$0, inconsistent availability',
          '$0 — hourly, no hidden costs',
        ],
      },
      {
        criterion: 'Vetting',
        values: [
          "Your team's time/cost",
          'Self-reported, unverified',
          'Pre-vetted + 40-hour trial',
        ],
      },
      {
        criterion: 'Risk of project failure',
        values: [
          'Moderate (ramp-up time)',
          'High (no accountability)',
          'Low — NDA, SLA, free replacement',
        ],
      },
      {
        criterion: 'Communication',
        values: ['In time zone', 'No guaranteed overlap', '4+ hrs daily overlap with US/UK'],
      },
    ],
  },

  techStack: {
    eyebrow: 'Technology',
    title: 'Explore Our DevOps Technology Competence',
    body: 'Our certified DevOps development team uses advanced technologies that aid us in delivering creative & innovative custom solutions.',
    groups: [
      {
        name: 'Cloud',
        items: [
          'Amazon Web Services',
          'Google Cloud',
          'Microsoft Azure',
          'OpenStack',
          'Cloud Foundry',
          'Rackspace',
        ],
      },
      {
        name: 'Automation',
        items: [
          'Apache JMeter',
          'Cucumber',
          'QASymphony',
          'ReSharper',
          'RSpec',
          'Sauce Labs',
          'SE',
          'Sonarqube',
          'TestRail',
        ],
      },
      {
        name: 'Javascript',
        items: ['React', 'Angular', 'Node.js', 'Vue.js', 'Meteor'],
      },
      {
        name: 'Monitoring',
        items: ['AWS CloudWatch', 'ELK Stack', 'New Relic', 'AppDynamics', 'Sensu'],
      },
      {
        name: 'Web & Mobile',
        items: [
          'CakePHP',
          'Codeigniter',
          'Flutter',
          'Ionic',
          'Laravel',
          'Objective-C',
          'React',
          'Swift',
          'WordPress',
          'Xcode',
          'Yii2',
          'Zend',
        ],
      },
      {
        name: 'Database',
        items: ['Firebase', 'Mongodb', 'Mysql', 'PostgreSQL'],
      },
    ],
  },

  faq: {
    eyebrow: 'FAQs',
    title: 'Frequently Asked Questions',
    body: 'Know more about our processes and how we work, with the help of the following FAQs our clients ask.',
    items: [
      {
        q: 'How much does it cost to hire a DevOps engineer from Soft Suave?',
        a: 'Rates start from $14/hour (Junior $14/hr, Mid-level $18/hr, Senior $25/hr) — well below the $60/hour median rate for DevOps engineers on Upwork. Every hire starts with a 40-hour risk-free trial before any monthly commitment.',
      },
      {
        q: 'How long does it take to hire a DevOps engineer?',
        a: 'Curated engineer profiles are shared within 48 hours of your requirements call, and work can start immediately after you select one.',
      },
      {
        q: 'Is there a minimum contract length?',
        a: 'No. Engagements start with a 40-hour risk-free trial with no obligation; you can continue month-to-month or move to a longer contract afterward.',
      },
      {
        q: "What happens if the engineer isn't the right fit?",
        a: 'You can request a replacement engineer at no extra cost during or after the trial period, re-matched based on your feedback.',
      },
      {
        q: 'Can a DevOps engineer work within our existing CI/CD and cloud setup?',
        a: 'Yes, engineers integrate into your existing AWS, Azure or GCP environment, Jenkins/GitLab pipelines, and Docker/Kubernetes clusters under NDA.',
      },
      {
        q: 'What tools and technologies do your DevOps engineers use?',
        a: 'Kubernetes, Docker, Jenkins, Ansible, Terraform, GitLab CI/CD, Prometheus and Grafana, across AWS, Azure and Google Cloud.',
      },
      {
        q: 'What is DevOps and how does it help my business?',
        a: 'DevOps combines development and operations practices — continuous integration, automation, and monitoring — to ship software faster and more reliably, cutting time-to-market and production incidents.',
      },
    ],
  },
};
