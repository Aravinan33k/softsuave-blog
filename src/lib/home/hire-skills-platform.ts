/**
 * Platform, CMS, and commerce hire pages: Magento, Drupal, Salesforce,
 * Blockchain.
 *
 * These four differ from the language pages in `hire-skills-web.ts` and
 * `hire-skills-backend.ts`: the buyer is usually hiring for a *platform* they
 * already run and cannot easily leave, so the questions are about version
 * support, upgrade cost, and certification rather than about language choice.
 * The copy reflects that.
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

const salesforce: HireSkill = {
  slug: "hire-salesforce-developer",
  key: "salesforce",
  name: "Salesforce",
  role: "Salesforce Developers",
  metaTitle: "Hire Salesforce Developers",
  metaDescription:
    "Hire Salesforce developers from Soft Suave for Apex, Lightning Web Components, and integration work. Governor-limit-aware, certified engineers. You interview, two-week trial.",
  serviceType: "Salesforce development staffing",
  eyebrow: "Hire Salesforce Developers",
  ctaLabel: "Hire Salesforce developers",
  titleLines: ["Hire Salesforce Developers", "Who Build Inside the Limits, Not Against Them"],
  heroBody: [
    "Salesforce development is constrained in ways ordinary application development is not. Governor limits cap what any transaction may do, three releases a year change the platform underneath you, and configuration is frequently the correct answer instead of code.",
    "An engineer who writes Apex like ordinary Java will produce something that works in a sandbox and fails on real data volumes. Ours build to the platform's actual rules.",
  ],
  heroPoints: [
    "Apex written bulk-safe and governor-limit aware",
    "Lightning Web Components and Experience Cloud",
    "Integration via REST, Platform Events and MuleSoft",
    "Configuration first — code only where it is needed",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/svc-ai-integrations.webp",
    width: 1200,
    height: 860,
    alt: "A Salesforce org showing custom components, automation, and integrated systems",
  },
  requirementLabel: "What do you need Salesforce developers for?",
  requirementPlaceholder:
    "Which clouds you run, the customisation or integration involved, your data volumes, and the seniority you need.",
  overviewTitle: "What Salesforce Developers Actually Do for You",
  overviewParagraphs: [
    "Salesforce is a platform with hard multi-tenant constraints. Governor limits bound the queries, DML operations, CPU time, and heap a single transaction may consume, and exceeding them throws rather than degrading. Code that iterates over records issuing a query each time passes a sandbox test with ten records and fails immediately against a real data load.",
    "A Salesforce engagement covers Apex triggers and classes written to handle bulk operations correctly, Lightning Web Components for custom interfaces, Flow and declarative automation where it is the right tool, integration with the systems around the org, and the deployment pipeline through SFDX, scratch orgs, and CI.",
    "The judgement that matters most is when not to write code. Salesforce's declarative tooling — Flow, validation rules, formula fields — covers a great deal, is maintainable by administrators rather than developers, and survives platform releases more gracefully. A developer who reaches for Apex first creates a permanent dependency on developers.",
  ],
  pullQuote:
    "The best Salesforce developers write less Apex than you expect. Configuration that an admin can maintain outlives code that only they understand.",
  capabilities: [
    {
      name: "Apex Development",
      tag: "Code",
      body: "Triggers, classes, batch jobs, and queueable work written bulk-safe within governor limits, with the trigger-handler pattern and test coverage that Salesforce requires before anything reaches production.",
    },
    {
      name: "Lightning Web Components",
      tag: "UI",
      body: "Custom interfaces on the modern web-standards component model, for the requirements that standard page layouts and declarative tooling genuinely cannot express.",
    },
    {
      name: "Integration",
      tag: "Integration",
      body: "Connecting Salesforce to ERP, billing, and data platforms through REST and SOAP APIs, Platform Events, Change Data Capture, and MuleSoft, with error handling and reconciliation designed in.",
    },
    {
      name: "Declarative Automation",
      tag: "Configuration",
      body: "Flow, validation rules, and approval processes used where they are the right tool — which is more often than developers tend to assume, and leaves the result maintainable by your admins.",
    },
    {
      name: "Data Migration",
      tag: "Data",
      body: "Loading and transforming data into Salesforce at volume with deduplication, external ID matching, and the relationship and ownership mapping that determines whether reporting works afterwards.",
    },
    {
      name: "DevOps and Release",
      tag: "Delivery",
      body: "SFDX source-driven development, scratch orgs, unlocked packages, and CI-driven deployment, replacing change sets clicked through by hand between environments.",
    },
  ],
  techGroups: [
    {
      name: "Platform",
      items: ["Apex", "Lightning Web Components", "SOQL / SOSL", "Flow", "Experience Cloud", "Salesforce DX"],
    },
    {
      name: "Clouds",
      items: ["Sales Cloud", "Service Cloud", "Marketing Cloud", "CPQ", "Field Service", "Data Cloud"],
    },
    {
      name: "Integration",
      items: ["REST / SOAP API", "Platform Events", "Change Data Capture", "MuleSoft", "Named Credentials", "Bulk API"],
    },
    {
      name: "Delivery",
      items: ["Apex Test Framework", "SFDX CLI", "Unlocked Packages", "Gearset / Copado", "Git", "PMD"],
    },
  ],
  faqs: [
    {
      q: "Are your Salesforce developers certified?",
      a: "Our Salesforce engineers hold Platform Developer I as a baseline, with Platform Developer II, Administrator, and cloud-specific certifications across the team. We list each engineer's actual certifications on the shortlist rather than describing the team in aggregate. Certification is a floor rather than a proxy for capability — what we would rather you weigh is the org complexity and data volumes someone has genuinely worked at, and we give you that too.",
    },
    {
      q: "Should this be built with code or with configuration?",
      a: "Configuration wherever it will do the job. Flow, validation rules, and formula fields are maintainable by your administrators, survive platform releases more gracefully, and do not consume governor limits the way poorly-written Apex does. Code is the right answer for complex logic, callouts to external systems, bulk processing, and anything Flow cannot express. A developer who reaches for Apex by default creates a permanent dependency on developers, which is a cost you keep paying.",
    },
    {
      q: "How do you handle governor limits?",
      a: "By designing for bulk from the start rather than optimising after a failure. That means no queries or DML inside loops, collections used to process records in batches, the trigger-handler pattern with a single trigger per object, and Batch Apex or Queueable for anything processing large volumes. Testing against realistic data volumes rather than a handful of records is what actually catches these before production — a sandbox test with ten records proves almost nothing.",
    },
    {
      q: "Can you integrate Salesforce with our other systems?",
      a: "Yes — it is a large share of the Salesforce work we do. Outbound to ERP, billing, and data warehouses through REST callouts with Named Credentials; inbound through the REST and Bulk APIs; event-driven through Platform Events and Change Data Capture where near-real-time synchronisation matters. The parts that need the most design attention are error handling, retry, and reconciliation, because integrations fail intermittently and a silent failure is far worse than a loud one.",
    },
  ],
};

const blockchain: HireSkill = {
  slug: "hire-blockchain-developer",
  key: "blockchain",
  name: "Blockchain",
  role: "Blockchain Developers",
  metaTitle: "Hire Blockchain Developers",
  metaDescription:
    "Hire blockchain developers from Soft Suave for smart contracts, dApps, and enterprise ledger work. Security-first Solidity, audit-ready code. You interview, two-week trial.",
  serviceType: "Blockchain development staffing",
  eyebrow: "Hire Blockchain Developers",
  ctaLabel: "Hire blockchain developers",
  titleLines: ["Hire Blockchain Developers", "Who Write Contracts Expecting an Audit"],
  heroBody: [
    "Smart contract development has a property almost no other software has: once deployed, the code is public, immutable, and directly holding value. A bug is not a patch release — it is a loss, and it is permanent.",
    "That changes how the work has to be done. Our blockchain engineers write to the established security patterns, test adversarially, and build assuming a third-party audit rather than hoping to avoid one.",
  ],
  heroPoints: [
    "Solidity with the known vulnerability classes designed out",
    "Audit-ready code, full test coverage and fuzzing",
    "EVM chains, Layer 2s and enterprise ledgers",
    "dApp front ends with real wallet and key handling",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/svc-gcc.webp",
    width: 1200,
    height: 860,
    alt: "A blockchain application showing smart contracts, on-chain state, and wallet interaction",
  },
  requirementLabel: "What do you need blockchain developers for?",
  requirementPlaceholder:
    "The use case, target chain, whether value is held on-chain, audit and compliance requirements, and the seniority you need.",
  overviewTitle: "What Blockchain Developers Actually Do for You",
  overviewParagraphs: [
    "Blockchain development divides into two quite different disciplines. Public-chain work — smart contracts on Ethereum and compatible networks, decentralised applications, tokens — is defined by immutability and adversarial conditions: the code is public, anyone can call it, and mistakes are irreversible. Enterprise ledger work on Hyperledger or similar is closer to conventional distributed systems engineering, with known participants and governance.",
    "A public-chain engagement covers contract architecture, gas-efficient implementation, the upgrade strategy decided deliberately up front, comprehensive testing including fuzzing and invariant tests, and the front end with its wallet integration and transaction-state handling.",
    "The discipline that distinguishes competent work here is defensive. Reentrancy, integer issues, access-control errors, oracle manipulation, and front-running are well-catalogued, and every one has an established mitigation. Writing as though an auditor will read every line — because one should — is the standard we hold to, and we will always recommend an independent audit before anything holds real value.",
  ],
  pullQuote:
    "You cannot hotfix a deployed contract. Everything about how this code is written follows from that one fact.",
  capabilities: [
    {
      name: "Smart Contract Development",
      tag: "Contracts",
      body: "Solidity contracts built on audited libraries such as OpenZeppelin, with access control, reentrancy protection, and gas efficiency treated as requirements rather than later optimisations.",
    },
    {
      name: "Security and Audit Readiness",
      tag: "Security",
      body: "Full unit and integration coverage, fuzzing and invariant testing with Foundry, static analysis with Slither, and internal review against the known vulnerability classes before external audit.",
    },
    {
      name: "dApp Front Ends",
      tag: "Application",
      body: "React and Next.js interfaces with wallet connection, chain switching, transaction lifecycle states, and the failure handling that makes an on-chain action comprehensible to a non-technical user.",
    },
    {
      name: "Token and NFT Systems",
      tag: "Standards",
      body: "ERC-20, ERC-721, and ERC-1155 implementations with vesting, staking, and royalty mechanics built on standard implementations rather than reimplemented from the specification.",
    },
    {
      name: "Layer 2 and Multi-Chain",
      tag: "Scaling",
      body: "Deployment across Polygon, Arbitrum, Optimism, and Base, with the bridging, gas, and finality differences between them handled explicitly rather than assumed equivalent to mainnet.",
    },
    {
      name: "Enterprise Ledgers",
      tag: "Enterprise",
      body: "Permissioned networks on Hyperledger Fabric for supply chain traceability, provenance, and multi-party reconciliation, where the participants are known and governance is contractual.",
    },
  ],
  techGroups: [
    {
      name: "Contracts",
      items: ["Solidity", "OpenZeppelin", "Foundry", "Hardhat", "Ethers.js", "Viem"],
    },
    {
      name: "Chains",
      items: ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Base", "Hyperledger Fabric"],
    },
    {
      name: "Application",
      items: ["React / Next.js", "wagmi", "WalletConnect", "The Graph", "IPFS", "Chainlink"],
    },
    {
      name: "Security & Delivery",
      items: ["Slither", "Echidna", "Tenderly", "Etherscan verification", "Gnosis Safe", "GitHub Actions"],
    },
  ],
  faqs: [
    {
      q: "Do we actually need a blockchain for this?",
      a: "Often not, and we would rather establish that on the first call than six months in. A blockchain earns its considerable cost and complexity when you need trustless coordination between parties who do not trust each other, verifiable immutable history, or programmable value transfer without an intermediary. If all participants trust a single operator, a conventional database with an audit log does the job far more cheaply and can be changed when requirements change. We will tell you when that is what we think you need.",
    },
    {
      q: "How do you handle smart contract security?",
      a: "By writing defensively from the start rather than auditing at the end. That means building on audited libraries like OpenZeppelin rather than reimplementing standards, applying checks-effects-interactions and reentrancy guards, keeping access control explicit, and testing adversarially — unit tests, fork tests against real state, fuzzing and invariant testing in Foundry, and static analysis with Slither. For anything holding meaningful value we recommend an independent third-party audit as well, and we build expecting one.",
    },
    {
      q: "Should our contracts be upgradeable?",
      a: "It is a genuine trade-off and should be a deliberate decision before you write the first line. Proxy patterns let you fix bugs, which matters a great deal given immutability — but they reintroduce a trusted party with power to change the rules, which undermines the property users came for, and proxies have their own well-documented failure modes around storage layout and initialisation. Many projects use upgradeable contracts with a timelock and multisig as a middle position. We will explain the trade rather than defaulting.",
    },
    {
      q: "Which chain should we build on?",
      a: "Ethereum mainnet for maximum security and liquidity where transaction costs are acceptable. Layer 2s — Arbitrum, Optimism, Base, Polygon — for consumer applications where per-transaction cost matters, which is most of them, and they are EVM-compatible so the contract code largely carries over. Hyperledger Fabric where participants are known and you need permissioning and privacy. The decision follows from your users, your cost tolerance, and whether the network needs to be public at all.",
    },
  ],
};

export const platformHireSkills: readonly HireSkill[] = [magento, drupal, salesforce, blockchain];
