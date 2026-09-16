/**
 * Content for `/hire-devops-developers`.
 *
 * Source: softsuave.com/hire-devops-developers — the six service cards, the
 * four-step process, the six "what makes our engineers unique" points, the
 * five-row comparison, the published rate tiers, the technology-competence
 * groups and the seven FAQs.
 *
 * Two deliberate departures. The live page's technology list includes web and
 * mobile frameworks that have nothing to do with a DevOps engagement (CakePHP,
 * WordPress, Xcode), so the stack here is the DevOps tooling the same page's own
 * FAQ names. And its Upwork median-rate comparison is dropped: a third-party
 * figure goes stale without anyone noticing, and the published tiers say enough.
 */

import type { HireRolePageContent } from './types';
import { heroForm, onboardingComparison, rateTiers } from './shared';

export const devops: HireRolePageContent = {
  key: 'hire-devops',
  slug: '/hire-devops-developers',
  name: 'Hire DevOps Engineers',
  serviceType: 'DevOps engineering staffing',

  meta: {
    title: 'Hire DevOps Engineers in India | CI/CD, Kubernetes & Cloud',
    description:
      'Hire pre-vetted DevOps engineers experienced in CI/CD, Kubernetes, Docker, Terraform, AWS and Azure. Matched within 48 hours, 40-hour risk-free trial, from $14/hour.',
  },

  hero: {
    eyebrow: 'Hire Developers by Role',
    titleLines: ['Hire DevOps Engineers', 'and Ship Without Drama'],
    body: [
      'Soft Suave provides pre-vetted DevOps engineers experienced in CI/CD, Kubernetes, Docker, Terraform, AWS and Azure, matched to your project within 48 hours.',
      'Every engagement starts with a 40-hour risk-free trial, with rates from $14 per hour and no long-term contract required until you are satisfied. Engineers work inside your existing cloud account, pipelines and clusters under NDA.',
    ],
    points: [
      'CI/CD, Kubernetes, Docker and Terraform',
      'AWS, Azure and Google Cloud experience',
      'Profiles within 48 hours',
      '40-hour risk-free trial',
      'Rates from $14 / hour',
    ],
    form: heroForm({
      title: 'Hire skilled DevOps engineers',
      requirementLabel: 'Your DevOps requirement',
      requirementPlaceholder:
        'Cloud provider, current pipeline and cluster setup, what you need automated or stabilised, and your target start date.',
      subject: 'DevOps engineer hiring enquiry',
    }),
  },

  overview: {
    eyebrow: 'Overview',
    title: 'Hire Remote DevOps Engineers Within 48 Hours',
    paragraphs: [
      'Does your development and operational environment need automating? Our engineers analyse how your software actually gets built, tested and released, then integrate DevOps automation into your existing IT ecosystem against a documented roadmap rather than a rewrite.',
      'We have helped startups and SMBs accelerate time to market, improve efficiency and reduce release risk. Our engineers focus on the whole implementation and delivery path — controlling the heavy, repetitive workflow activities that slow a team down and make releases eventful.',
      'Offshore DevOps engineers with 13+ years of project delivery behind them bring hands-on experience of tools including Git, Jenkins, Gradle and Bamboo. The work also covers upgrading enterprise applications, improving IT security and using infrastructure resources properly — because paying for idle capacity is as much a DevOps problem as a slow pipeline is.',
    ],
  },

  fit: {
    eyebrow: 'Where to Start',
    title: 'Which DevOps Problem Are You Solving?',
    body: 'DevOps covers several distinct problems, and they call for different first moves. Pick the one that sounds most like your situation.',
    columns: ['Your situation', 'Where an engineer starts'],
    rows: [
      {
        problem: 'Releases are manual, slow, or risky enough that nobody wants to do them',
        solution:
          'Start with the pipeline. Build CI/CD in Jenkins, GitLab CI, GitHub Actions or Azure DevOps with automated tests, artifact management and repeatable deployment steps — so a release becomes a routine event rather than a scheduled one.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        problem: 'Infrastructure is configured by hand and nobody is sure what is running',
        solution:
          'Start with infrastructure as code. Terraform and Ansible make the current state explicit and reproducible, which is the prerequisite for every other improvement — you cannot reliably change what you cannot reliably describe.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        problem: 'The application does not scale, or falls over under load',
        solution:
          'Start with containerization and orchestration. Docker and Kubernetes give you elasticity, controlled rollouts and rollback, across AWS, Google Cloud or Azure — plus the source control and release discipline that makes rollback actually work.',
        image: '/images/landing/services/svc-support-optimisation.webp',
      },
      {
        problem: 'Something is wrong in production and nobody can say what',
        solution:
          'Start with observability. CloudWatch, the ELK stack, Prometheus, Grafana, New Relic or AppDynamics turn an outage from an argument into a diagnosis, and a performance complaint into a measurement.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        problem: 'Cloud spend is rising and nobody owns it',
        solution:
          'Start with resource use. Right-sizing, autoscaling policies, environment lifecycle and storage tiering usually recover meaningful cost — and the instrumentation that finds it is the same instrumentation that improves reliability.',
        image: '/images/landing/services/svc-security-governance.webp',
      },
    ],
  },

  capabilities: {
    eyebrow: 'Services',
    title: 'What Our DevOps Engineers Do',
    body: 'Engineers who improve code quality, establish continuous integration, and take the manual effort out of everything between a commit and a release.',
    items: [
      {
        name: 'CI/CD Pipeline Engineering',
        body: 'Build and maintain continuous integration and delivery pipelines with Jenkins, GitLab CI, GitHub Actions and Azure DevOps, including automated tests, artifact management and repeatable deployments.',
        image: '/images/landing/services/svc-application-development.webp',
      },
      {
        name: 'Enterprise DevOps Solutions',
        body: 'Manage performance optimization, release management, new server setup and change management through a solid workflow for continuous delivery and deployment across scalable enterprise environments.',
        image: '/images/landing/services/svc-consulting-discovery.webp',
      },
      {
        name: 'Cloud Infrastructure and Scalability',
        body: 'Reduce failures and rollbacks, establish strong source control, and gain elasticity in cloud computing — with scalability and availability delivered on AWS, Google Cloud and Microsoft Azure.',
        image: '/images/landing/services/svc-dedicated-teams.webp',
      },
      {
        name: 'Containers and Orchestration',
        body: 'Containerize applications with Docker and run them on Kubernetes with controlled rollouts, health checks, autoscaling and a rollback path that has actually been tested.',
        image: '/images/landing/services/svc-model-selection.webp',
      },
      {
        name: 'Infrastructure as Code',
        body: 'Make environments reproducible with Terraform and Ansible, so the running state is explicit, reviewable and recoverable rather than remembered.',
        image: '/images/landing/services/svc-product-modernisation.webp',
      },
      {
        name: 'DevOps Automation',
        body: 'Install and configure servers, establish communication between systems, and automate security, testing, operations, integration and delivery pipelines to speed up software operations.',
        image: '/images/landing/services/svc-integration.webp',
      },
      {
        name: 'Monitoring and Observability',
        body: 'Set up metrics, logging, tracing, dashboards and alerts with CloudWatch, the ELK stack, Prometheus, Grafana, New Relic or AppDynamics so behaviour is visible before users report it.',
        image: '/images/landing/services/svc-evaluation-llmops.webp',
      },
      {
        name: 'DevOps Consulting and Assessment',
        body: 'Assess your current delivery process, then plan the design, implementation, management and automation work in the order that returns the most reliability soonest.',
        image: '/images/landing/services/svc-proof-of-concept.webp',
      },
    ],
  },

  midCta: {
    eyebrow: 'Start With a Trial',
    title: 'Get a DevOps Engineer on Your Pipeline This Week',
    body: 'Profiles within 48 hours, a 40-hour risk-free trial on your own infrastructure, and a project quote within 24 hours of sharing your scope.',
    cta: { label: 'Start Your 40-Hour Trial', href: '#enquiry' },
  },

  engagement: {
    eyebrow: 'Engagement Models',
    title: 'Flexible DevOps Engagement Models',
    body: 'Choose the structure that matches the work — a standing capability, a bounded improvement, or capacity that flexes with your release calendar.',
    blocks: [
      {
        label: 'Dedicated engineer',
        body: 'A DevOps engineer who stays with your platform, owning pipelines, infrastructure and monitoring as the system and the team grow. Available full-time or part-time.',
      },
      {
        label: 'Time and material',
        body: 'Flexible capacity for an infrastructure programme whose scope depends on what the assessment finds, with effort reviewed and reprioritised each cycle.',
      },
      {
        label: 'Fixed price or milestone',
        body: 'For a defined piece of work — a pipeline build, a Kubernetes migration, an observability rollout — with agreed deliverables and acceptance criteria.',
      },
    ],
  },

  process: {
    eyebrow: 'Hiring Process',
    title: 'Hire a DevOps Engineer in Five Steps',
    body: 'From a requirement to an engineer inside your cloud account, with a 40-hour free trial before any commitment.',
    steps: [
      {
        n: '01',
        name: 'Share the DevOps Requirement',
        body: 'Tell us your project scope, cloud provider, current pipeline and cluster setup, the skills and experience needed, and your timeline.',
      },
      {
        n: '02',
        name: 'Review the Curated Shortlist',
        body: 'Review DevOps engineer profiles with skills, experience, availability and project fit — typically shared within 48 hours, with a project quote inside 24.',
      },
      {
        n: '03',
        name: 'Interview the Shortlist',
        body: 'Assess tooling depth, cloud experience, incident thinking and how the engineer would approach your existing setup rather than replace it.',
      },
      {
        n: '04',
        name: 'Run the 40-Hour Free Trial',
        body: 'Evaluate technical work, communication, quality and delivery approach on your own infrastructure before committing to an ongoing engagement.',
      },
      {
        n: '05',
        name: 'Onboard the DevOps Engineer',
        body: 'Sign the SLA and NDA, complete onboarding, and integrate the engineer into your AWS, Azure or GCP environment, pipelines and on-call routine.',
      },
    ],
  },

  specialisations: {
    eyebrow: 'Hire by Specialisation',
    title: 'DevOps Expertise You Can Hire Against',
    body: 'DevOps is a set of related disciplines rather than one job. Match the specialisation to the constraint you are actually hitting.',
    items: [
      {
        key: 'automation',
        name: 'CI/CD Engineers',
        body: 'Jenkins, GitLab CI, GitHub Actions and Azure DevOps pipelines with automated testing, artifact management and repeatable deployment steps.',
      },
      {
        key: 'cloud',
        name: 'Cloud Engineers',
        body: 'AWS, Microsoft Azure, Google Cloud, OpenStack and Cloud Foundry — architecture, networking, managed services and cost-aware resource use.',
      },
      {
        key: 'devops',
        name: 'Kubernetes Engineers',
        body: 'Cluster setup, workload configuration, ingress, autoscaling, controlled rollouts and the rollback path that makes a bad release survivable.',
      },
      {
        key: 'integration',
        name: 'Infrastructure-as-Code Engineers',
        body: 'Terraform and Ansible so environments are reproducible, reviewable and recoverable rather than configured by hand and hoped for.',
      },
      {
        key: 'performance',
        name: 'Observability Engineers',
        body: 'Metrics, logging, tracing, dashboards and alerting with CloudWatch, the ELK stack, Prometheus, Grafana, New Relic and AppDynamics.',
      },
      {
        key: 'security',
        name: 'DevSecOps Engineers',
        body: 'Security into the pipeline: dependency and image scanning, secret management, least-privilege access and SonarQube quality gates.',
      },
      {
        key: 'qa',
        name: 'Release and Test Automation Engineers',
        body: 'Automated test execution inside the pipeline with JMeter, Cucumber, Sauce Labs and TestRail, so quality gates are enforced rather than intended.',
      },
      {
        key: 'data',
        name: 'Database Reliability Engineers',
        body: 'Backup and restore, replication, migrations and performance for PostgreSQL, MySQL, MongoDB and Firebase — under change, not just at rest.',
      },
      {
        key: 'team',
        name: 'DevOps Consultants',
        body: 'Assessment, roadmap, standards and enablement for teams that need the practice established rather than a single pipeline built.',
      },
    ],
  },

  comparison: onboardingComparison({
    title: 'Soft Suave vs an In-House Hire vs a Freelancer',
    body: 'DevOps engineers are among the hardest roles to recruit internally, and the least suitable to leave with someone who may not be reachable during an incident.',
    column: 'Soft Suave DevOps engineer',
  }),

  rates: rateTiers({
    title: 'DevOps Engineer Rates',
    body: 'Published tiers by experience level. Every tier starts with the same 40-hour risk-free trial, and no long-term contract is required until you are satisfied.',
    role: 'DevOps engineer',
  }),

  techStack: {
    eyebrow: 'Technology Stack',
    title: 'Our DevOps Technology Competence',
    body: 'The platforms, orchestration, automation and monitoring tooling our certified DevOps teams work with day to day.',
    groups: [
      {
        name: 'Cloud Platforms',
        items: ['AWS', 'Microsoft Azure', 'Google Cloud', 'OpenStack', 'Cloud Foundry'],
      },
      {
        name: 'Containers and Orchestration',
        items: ['Docker', 'Kubernetes'],
      },
      {
        name: 'CI/CD',
        items: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Azure DevOps', 'Bamboo', 'Gradle'],
      },
      {
        name: 'Infrastructure as Code',
        items: ['Terraform', 'Ansible'],
      },
      {
        name: 'Monitoring and Observability',
        items: ['Prometheus', 'Grafana', 'AWS CloudWatch', 'ELK Stack', 'New Relic', 'AppDynamics', 'Sensu'],
      },
      {
        name: 'Source Control',
        items: ['Git', 'GitHub', 'GitLab', 'Bitbucket'],
      },
      {
        name: 'Automation and Quality',
        items: ['Apache JMeter', 'Cucumber', 'SonarQube', 'Sauce Labs', 'TestRail'],
      },
      {
        name: 'Databases',
        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'],
      },
    ],
  },

  faq: {
    eyebrow: 'FAQs',
    title: 'Questions About Hiring DevOps Engineers',
    body: 'Answers on rates, timelines, contracts, tooling and working inside your existing setup.',
    items: [
      {
        q: 'How much does it cost to hire a DevOps engineer from Soft Suave?',
        a: 'Rates start from $14 per hour: junior from $14, mid-level from $18 and senior from $25. Every hire starts with a 40-hour risk-free trial before any monthly commitment.',
      },
      {
        q: 'How long does it take to hire a DevOps engineer?',
        a: 'Curated engineer profiles are shared within 48 hours of your requirements call, and work can start immediately after you select one.',
      },
      {
        q: 'Is there a minimum contract length?',
        a: 'No. Engagements start with a 40-hour risk-free trial with no obligation; you can continue month to month or move to a longer contract afterwards.',
      },
      {
        q: 'What happens if the engineer is not the right fit?',
        a: 'You can request a replacement engineer at no extra cost during or after the trial period, re-matched based on your feedback.',
      },
      {
        q: 'Can a DevOps engineer work within our existing CI/CD and cloud setup?',
        a: 'Yes. Engineers integrate into your existing AWS, Azure or GCP environment, your Jenkins or GitLab pipelines, and your Docker and Kubernetes clusters, under NDA. The starting point is an assessment of what you already run, not a replacement of it.',
      },
      {
        q: 'What tools and technologies do your DevOps engineers use?',
        a: 'Kubernetes, Docker, Jenkins, Ansible, Terraform, GitLab CI/CD, Prometheus and Grafana, across AWS, Azure and Google Cloud.',
      },
      {
        q: 'What is DevOps and how does it help my business?',
        a: 'DevOps combines development and operations practices — continuous integration, automation and monitoring — to ship software faster and more reliably, cutting time to market and production incidents.',
      },
      {
        q: 'Can a DevOps engineer work with our existing engineering team?',
        a: 'Yes. Engineers work inside your repositories, ticketing system, sprint routine and escalation paths, with daily updates and sprint reports agreed before onboarding.',
      },
    ],
  },
};
