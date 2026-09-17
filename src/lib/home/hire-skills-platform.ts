/**
 * Platform and CMS hire-by-skill pages: Magento and Drupal.
 *
 * Both differ from the language pages in `hire-skills-web.ts` and
 * `hire-skills-backend.ts`: the buyer is usually hiring for a platform they
 * already run and cannot easily leave, so the questions are about version
 * support, upgrade cost, and certification rather than about language choice.
 * The copy reflects that. Salesforce and Blockchain used to sit here too;
 * softsuave.com files both under "Hire By Role", so they are role pages now,
 * in `lib/home/hire-roles/`.
 */

import type { HireSkill } from "./hire-skill";

const magento: HireSkill = {
  slug: "hire-magento-developer",
  key: "magento",
  name: "Magento",
  role: "Magento Developers",
  metaTitle: "Hire Magento Developers",
  metaDescription:
    "Hire Magento developers from Soft Suave for Adobe Commerce builds, Magento 2 upgrades, and store performance work. You interview, two-week trial, full IP ownership.",
  serviceType: "Magento development staffing",
  eyebrow: "Hire Magento Developers",
  ctaLabel: "Hire Magento developers",
  titleLines: ["Hire Magento Developers", "For Stores That Cannot Afford Downtime"],
  heroBody: [
    "Magento and Adobe Commerce run complex catalogues, multi-store setups, and B2B pricing rules that simpler platforms cannot express. That power comes with genuine operational weight — a large codebase, a demanding upgrade cycle, and performance that has to be engineered rather than assumed.",
    "Our Magento engineers work on live revenue-generating stores, where a bad deployment is measured in lost orders rather than a rolled-back branch.",
  ],
  heroPoints: [
    "Magento 2 and Adobe Commerce, including B2B",
    "Custom modules built to survive upgrades",
    "Magento 1 and legacy version migration",
    "Performance: caching, indexing and Core Web Vitals",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/svc-web.webp",
    width: 1200,
    height: 860,
    alt: "A Magento commerce storefront with catalogue, checkout, and admin views",
  },
  requirementLabel: "What do you need Magento developers for?",
  requirementPlaceholder:
    "Your Magento or Adobe Commerce version, catalogue size and traffic, integrations, and whether an upgrade is involved.",
  overviewTitle: "What Magento Developers Actually Do for You",
  overviewParagraphs: [
    "Magento Open Source and Adobe Commerce are built for merchants whose requirements exceed what a hosted platform can express: large catalogues with complex attributes, multiple stores and currencies from one admin, customer-group pricing, B2B quoting and company accounts, and deep ERP integration. Where those apply, the platform earns its complexity.",
    "A Magento engagement covers theme and storefront work, custom modules, third-party extension integration and the conflicts between them, ERP and payment integration, indexing and cache configuration, and upgrades — which are not optional, because Adobe's security patches only apply to supported versions.",
    "The single thing that most determines whether a Magento store is maintainable is whether customisation was done through the platform's extension points or by overriding core behaviour. The second approach works immediately and makes every subsequent upgrade progressively more expensive, which is how stores end up stranded on an unsupported version.",
  ],
  pullQuote:
    "Every Magento store that cannot be upgraded got there the same way: core overridden instead of extended, one deadline at a time.",
  capabilities: [
    {
      name: "Store Development",
      tag: "Build",
      body: "Full Magento 2 and Adobe Commerce builds — catalogue structure, storefront, checkout, and payment and shipping configuration — for merchants whose requirements have outgrown a hosted platform.",
    },
    {
      name: "Custom Modules",
      tag: "Extend",
      body: "Modules written against Magento's plugin and observer interfaces rather than overriding core classes, so the store remains upgradable and each security release does not become a project.",
    },
    {
      name: "Version Migration",
      tag: "Migration",
      body: "Magento 1 to 2 migration, and moving stranded Magento 2 stores onto a supported version, with the data migration and extension-replacement work scoped before anything is committed to.",
    },
    {
      name: "Performance Engineering",
      tag: "Performance",
      body: "Full-page cache and Varnish configuration, Redis session and cache backends, indexer strategy, Elasticsearch tuning, and the front-end work that gets Core Web Vitals into an acceptable range.",
    },
    {
      name: "ERP and Systems Integration",
      tag: "Integration",
      body: "Connecting the store to ERP, PIM, WMS, and accounting systems for stock, pricing, and order flow, with the reconciliation and failure handling that integration at transaction volume requires.",
    },
    {
      name: "B2B Commerce",
      tag: "B2B",
      body: "Company accounts, negotiable quotes, customer-specific catalogues and pricing, purchase-order workflows, and approval hierarchies — the Adobe Commerce features that justify the platform for wholesale.",
    },
  ],
  techGroups: [
    {
      name: "Platform",
      items: ["Magento 2.4", "Adobe Commerce", "PHP 8.3", "Magento B2B", "PWA Studio", "Hyvä"],
    },
    {
      name: "Infrastructure",
      items: ["MySQL / MariaDB", "Elasticsearch", "Redis", "Varnish", "RabbitMQ", "Adobe Commerce Cloud"],
    },
    {
      name: "Integration",
      items: ["REST / GraphQL API", "ERP connectors", "Payment gateways", "Shipping carriers", "PIM", "Tax services"],
    },
    {
      name: "Delivery",
      items: ["Composer", "PHPUnit", "Docker / Warden", "Git", "Blackfire", "New Relic"],
    },
  ],
  faqs: [
    {
      q: "Should we migrate from Magento 1?",
      a: "Yes, and the question is only which platform you land on. Magento 1 reached end of life in June 2020 and receives no security patches, which is increasingly a PCI compliance problem as well as a risk one. Magento 2 is the natural path if your requirements still genuinely need Magento's complexity. If they do not — and for a fair number of Magento 1 merchants they no longer do — Shopify Plus or another platform may be a better landing point, and we will say so rather than selling the bigger migration.",
    },
    {
      q: "Why is our Magento store slow?",
      a: "Almost always one of a short list. Full-page cache misconfigured or being invalidated constantly; indexers set to update-on-save instead of by schedule; a poorly-written third-party extension running queries in a loop on category pages; Elasticsearch under-resourced; or an unoptimised front end with large images and blocking JavaScript. It is diagnosable — profiling with Blackfire or New Relic on the real store usually identifies the cause within a day or two, and we start there rather than guessing.",
    },
    {
      q: "Can you work with our existing extensions?",
      a: "Yes, and auditing them is usually the first task. Third-party extensions are the most common source of both performance problems and upgrade blockers, particularly where two of them patch the same core behaviour. We assess what is installed, what is actually used, what is unmaintained, and what conflicts — and quite often the recommendation is to remove several rather than upgrade them, because unused extensions still carry their performance and security cost.",
    },
    {
      q: "How do you handle Magento upgrades safely?",
      a: "On a staging environment cloned from production, with the extension compatibility matrix checked before any date is agreed, and a rehearsed deployment with a tested rollback. Upgrades are sequenced rather than jumped, and security-only patches are applied promptly between larger version steps. The goal is that the store is never more than one supported version behind, because that is the state from which an upgrade is routine rather than a project.",
    },
  ],
};

const drupal: HireSkill = {
  slug: "hire-drupal-developer",
  key: "drupal",
  name: "Drupal",
  role: "Drupal Developers",
  metaTitle: "Hire Drupal Developers",
  metaDescription:
    "Hire Drupal developers from Soft Suave for Drupal 10 and 11 builds, Drupal 7 migration, and headless architectures. You interview, two-week trial, full IP ownership.",
  serviceType: "Drupal development staffing",
  eyebrow: "Hire Drupal Developers",
  ctaLabel: "Hire Drupal developers",
  titleLines: ["Hire Drupal Developers", "For Content Estates With Real Governance"],
  heroBody: [
    "Drupal is chosen where content modelling, editorial workflow, multilingual publishing, and access control genuinely matter — government, universities, healthcare, and large multi-site organisations. It is a content framework more than a CMS.",
    "That flexibility is also the failure mode: a badly-modelled Drupal site is very hard to fix later. Our Drupal engineers get the entity model and configuration management right at the start.",
  ],
  heroPoints: [
    "Drupal 10 and 11 with modern PHP and Symfony",
    "Drupal 7 and 8 migration, done with real data mapping",
    "Headless and decoupled architectures via JSON:API",
    "Multi-site, multilingual and accessibility compliance",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-3.webp",
    width: 800,
    height: 1000,
    alt: "A Drupal content platform showing structured content types and editorial workflow",
  },
  requirementLabel: "What do you need Drupal developers for?",
  requirementPlaceholder:
    "Your Drupal version, the size of the content estate, whether a migration or headless build is involved, and the seniority you need.",
  overviewTitle: "What Drupal Developers Actually Do for You",
  overviewParagraphs: [
    "Drupal's strength is structured content. Entities, fields, taxonomies, and view modes let you model a genuinely complex content domain and then generate listings, feeds, and APIs from that model rather than hand-building each one. Combined with granular permissions, editorial workflow, and mature multilingual support, it is why Drupal keeps its position in the public sector and higher education.",
    "A Drupal engagement covers content architecture, custom modules against Drupal's plugin and service APIs, theming with Twig, configuration management so environments stay in step, migration, and increasingly a decoupled front end consuming JSON:API or GraphQL.",
    "The recurring crisis is version support. Drupal 7 reached end of life in January 2025 after several extensions, and a large number of organisations are still on it — with no security coverage and a migration that is a genuine rebuild of the content model rather than an upgrade, because Drupal 8 changed the architecture fundamentally.",
  ],
  pullQuote:
    "A Drupal 7 to 10 move is not an upgrade. It is a rebuild with a data migration attached, and pretending otherwise is how it overruns.",
  capabilities: [
    {
      name: "Content Architecture",
      tag: "Modelling",
      body: "Entity types, fields, taxonomies, and view modes modelled around how content is actually authored and reused — the decision that determines whether the site is maintainable in three years.",
    },
    {
      name: "Drupal 7 Migration",
      tag: "Migration",
      body: "Migration to Drupal 10 or 11 using the Migrate API, with field-level mapping, media and URL alias preservation, and redirects — treated as a rebuild with data migration, which is what it is.",
    },
    {
      name: "Custom Modules",
      tag: "Extend",
      body: "Modules written against Drupal's service container, plugin system, and event subscribers, following the standards that keep a site upgradable across minor and major releases.",
    },
    {
      name: "Headless Drupal",
      tag: "Decoupled",
      body: "Drupal as a content back end serving JSON:API or GraphQL to a Next.js or other front end, keeping the editorial experience while the presentation layer becomes a modern application.",
    },
    {
      name: "Multi-Site and Multilingual",
      tag: "Scale",
      body: "Shared codebases across many sites with per-site configuration, and full multilingual content with translation workflow — both areas where Drupal is genuinely stronger than its alternatives.",
    },
    {
      name: "Accessibility and Compliance",
      tag: "Compliance",
      body: "WCAG 2.2 conformance in themes and editorial output, plus the auditing and remediation public-sector and education clients are required to evidence rather than merely assert.",
    },
  ],
  techGroups: [
    {
      name: "Platform",
      items: ["Drupal 10 / 11", "PHP 8.3", "Symfony", "Twig", "Drush", "Composer"],
    },
    {
      name: "Core Systems",
      items: ["Migrate API", "JSON:API", "GraphQL", "Views", "Config Management", "Paragraphs"],
    },
    {
      name: "Infrastructure",
      items: ["MySQL / MariaDB", "PostgreSQL", "Redis", "Varnish", "Solr", "Acquia / Pantheon"],
    },
    {
      name: "Delivery",
      items: ["PHPUnit", "Behat", "Docker / DDEV", "GitHub Actions", "PHPStan", "Lighthouse"],
    },
  ],
  faqs: [
    {
      q: "We are still on Drupal 7. What are our options?",
      a: "Drupal 7 reached end of life in January 2025, so it receives no security coverage from the community and you are relying on a commercial vendor or accepting the risk. The realistic options are migrating to Drupal 10 or 11, or moving to a different platform entirely. Either is a rebuild rather than an upgrade, because Drupal 8 replaced the architecture — so it is worth asking honestly whether Drupal is still the right fit before committing to the larger of the two paths.",
    },
    {
      q: "Is Drupal 7 to Drupal 10 really a rebuild?",
      a: "Yes, and it is better to plan for that than to be surprised by it. Drupal 8 moved to Symfony, object-oriented APIs, Twig templating, and configuration management, so Drupal 7 modules and themes do not carry over and custom code is rewritten. What does migrate is the content, through the Migrate API, with field-level mapping you define. Sites that treated it as a version bump are the ones that overran, often badly.",
    },
    {
      q: "Should we go headless with Drupal?",
      a: "It is a good fit when you need one content source feeding several channels — website, mobile app, digital signage, partner feeds — or when your front-end team wants to work in React or Next.js. It costs you some of Drupal's own strengths: in-place editing, preview, and layout tooling all need deliberate work to reproduce. For a conventional single-website project, Drupal's own theming is often the better answer, and we will say so.",
    },
    {
      q: "Drupal or WordPress?",
      a: "WordPress for content-marketing sites, blogs, and brochure sites where editorial simplicity and a vast plugin ecosystem matter most. Drupal when content is genuinely structured and reused across contexts, when you need granular permissions and editorial workflow, when multilingual is a first-class requirement, or when you are running many sites from one codebase. Drupal costs more to build and is more capable; choosing it for a site that does not need that capability is a common and expensive mistake.",
    },
  ],
};

export const platformHireSkills: readonly HireSkill[] = [magento, drupal];
