/**
 * Front-end and JavaScript-stack hire pages: React, Angular, MERN, MEAN.
 *
 * One entry per `/hire-*` route. See `hire-skill.ts` for the shape and for why
 * each entry argues about its own technology instead of sharing one templated
 * paragraph with the other twenty-three.
 */

import type { HireSkill } from "./hire-skill";

const react: HireSkill = {
  slug: "hire-reactjs-developers",
  key: "react",
  name: "React",
  role: "React Developers",
  metaTitle: "Hire React Developers",
  metaDescription:
    "Hire vetted React developers from Soft Suave. Dedicated engineers for SPAs, design systems, and Next.js applications — interviewed by you, two-week trial, you own the IP.",
  serviceType: "React development staffing",
  eyebrow: "Hire React Developers",
  ctaLabel: "Hire React developers",
  titleLines: ["Hire React Developers", "Who Have Maintained a Large Codebase"],
  heroBody: [
    "React is easy to start and unforgiving at scale. The difference between a codebase that stays workable at two hundred components and one that does not is rarely knowledge of the API — it is state boundaries, render discipline, and knowing which problems belong in the component tree at all.",
    "Our React engineers have worked on applications past that point. They arrive able to read an existing codebase, agree with your conventions rather than replacing them, and ship inside your review process from the first sprint.",
  ],
  heroPoints: [
    "Senior engineers who have maintained, not just started, React apps",
    "Hooks, Server Components, Suspense and the concurrent model",
    "Next.js App Router, SSR, ISR and streaming",
    "Design systems, accessibility and Core Web Vitals",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/svc-web.webp",
    width: 1200,
    height: 860,
    alt: "A React component architecture and interface system laid out across connected screens",
  },
  requirementLabel: "What are you building in React?",
  requirementPlaceholder:
    "The product, whether it is greenfield or an existing codebase, the rendering approach you use today, and the seniority you need.",
  overviewTitle: "What React Developers Actually Do for You",
  overviewParagraphs: [
    "React is a library for building user interfaces from composable components, and it has become the default choice for product teams because its ecosystem — routing, data fetching, forms, testing, component libraries — is deeper than any alternative. Hiring for it is less about finding someone who knows JSX than about finding someone who has lived with the consequences of their own architectural decisions.",
    "In practice a React engagement covers component architecture and a shared design system, state management chosen to fit the problem rather than by habit, data fetching and caching, rendering strategy across client and server, accessibility, and the performance work that keeps interaction latency acceptable as the application grows.",
    "Most of the React work we are asked to do is on an existing application rather than a new one — an app that shipped quickly, grew past its original structure, and now takes too long to change. That work rewards engineers who are comfortable refactoring incrementally behind working software, which is a different skill from starting clean.",
  ],
  pullQuote:
    "Almost every expensive React problem is a state-ownership problem wearing a performance costume.",
  capabilities: [
    {
      name: "Single-Page Applications",
      tag: "Product",
      body: "Dashboards, consoles, and data-dense internal tools built as composable component systems, with routing, code splitting, and caching set up so the application stays responsive as the surface area grows.",
    },
    {
      name: "Next.js Applications",
      tag: "Framework",
      body: "App Router applications using Server Components, streaming, and incremental static regeneration where each genuinely helps — rather than rendering everything on the server because the framework makes it the default.",
    },
    {
      name: "Design Systems",
      tag: "UI",
      body: "Component libraries with tokens, documented variants, and accessibility built in, published for several product teams to consume, so the interface stays consistent without a design review on every pull request.",
    },
    {
      name: "Legacy React Modernization",
      tag: "Refactor",
      body: "Class components to hooks, bespoke state layers to modern data fetching, Webpack to Vite, and an upgrade path off the framework version you are stuck on — done incrementally, behind a shipping product.",
    },
    {
      name: "Performance Engineering",
      tag: "Performance",
      body: "Profiling actual render behaviour, removing unnecessary re-renders, splitting bundles along real usage boundaries, and fixing the Core Web Vitals that affect both conversion and search ranking.",
    },
    {
      name: "Testing and CI",
      tag: "Quality",
      body: "React Testing Library suites that assert behaviour rather than implementation, Playwright coverage of the paths that matter commercially, and a pipeline that makes a red build genuinely mean something.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["React 19", "TypeScript", "Next.js", "Remix", "Vite", "React Router"],
    },
    {
      name: "State & Data",
      items: ["TanStack Query", "Redux Toolkit", "Zustand", "Jotai", "tRPC", "GraphQL / Apollo"],
    },
    {
      name: "UI & Styling",
      items: ["Tailwind CSS", "CSS Modules", "Radix UI", "shadcn/ui", "Framer Motion", "Storybook"],
    },
    {
      name: "Quality & Delivery",
      items: ["Vitest", "React Testing Library", "Playwright", "ESLint", "GitHub Actions", "Vercel"],
    },
  ],
  faqs: [
    {
      q: "Can your React developers work on our existing codebase?",
      a: "That is the majority of what we are asked to do. The first week is spent reading the code, running it, and understanding the conventions already in place rather than proposing a rewrite — including the conventions we would personally have chosen differently, because consistency in an existing codebase is worth more than any individual preference. Where something genuinely needs to change, it is raised as a proposal with a migration path, not committed as a surprise.",
    },
    {
      q: "Do your React developers know Next.js?",
      a: "Yes, and specifically the App Router rather than only the Pages Router, which is where most of the current difficulty lies. That covers Server Components and the client boundary, data fetching and caching semantics, streaming and Suspense, route handlers, and incremental static regeneration. We are also willing to tell you when a Next.js application would be better as a plain SPA — server rendering carries real operational cost, and not every product earns it.",
    },
    {
      q: "How do you handle state management?",
      a: "By choosing per problem rather than by habit. Server state belongs in a data-fetching cache such as TanStack Query, and a large share of the state problems we are called in to fix are server state that was put into a global client store. What is left — genuine client state — is usually small enough for context and a light store like Zustand. Redux Toolkit is still the right answer for complex, heavily-shared client state, and we will use it where that is what you have.",
    },
    {
      q: "Can they also handle the back end?",
      a: "Many of our React engineers are comfortable in Node.js and can own API routes, BFF layers, and server-side data access — which is often all a React product needs. For substantial back-end work we would rather staff a dedicated back-end engineer than stretch a front-end specialist across both, and we will say so during the shortlist rather than after you have hired.",
    },
  ],
};

const angular: HireSkill = {
  slug: "hire-angularjs-developers",
  key: "angular",
  name: "Angular",
  role: "Angular Developers",
  metaTitle: "Hire Angular Developers",
  metaDescription:
    "Hire Angular developers from Soft Suave for enterprise applications, AngularJS migrations, and RxJS-heavy front ends. You interview, two-week trial, full IP ownership.",
  serviceType: "Angular development staffing",
  eyebrow: "Hire Angular Developers",
  ctaLabel: "Hire Angular developers",
  titleLines: ["Hire Angular Developers", "For Applications Built to Last"],
  heroBody: [
    "Angular is chosen for applications that will be maintained for years by teams that change. Its opinionated structure, dependency injection, and first-class TypeScript are the point: they make a large codebase legible to an engineer who did not write it.",
    "That only holds if the team understands RxJS and change detection properly. Our Angular engineers do, and a good number of them have carried applications through the AngularJS migration and several major-version upgrades since.",
  ],
  heroPoints: [
    "Angular 17+ with standalone components and signals",
    "RxJS and change-detection expertise, not just familiarity",
    "AngularJS to Angular migration experience",
    "NgRx, Nx monorepos and module federation",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-1.webp",
    width: 800,
    height: 1000,
    alt: "An enterprise Angular application showing modular structure and data-dense views",
  },
  requirementLabel: "What are you building in Angular?",
  requirementPlaceholder:
    "The application, the Angular version you are on, whether a migration is involved, and the seniority you need.",
  overviewTitle: "What Angular Developers Actually Do for You",
  overviewParagraphs: [
    "Angular is a complete front-end framework rather than a library: routing, forms, HTTP, testing, and dependency injection ship with it and work the same way in every project. For enterprises that is the attraction — a new engineer joining an Angular codebase already knows where things go, which is not true of a React codebase assembled from a dozen independent choices.",
    "An Angular engagement typically covers module and component architecture, reactive forms, state management, RxJS streams for asynchronous work, performance tuning through change-detection strategy, and increasingly a migration — either off AngularJS, or forward across major versions from something like Angular 8.",
    "The version question is usually the real one. Angular's release cadence means an application two or three years behind is already a migration project, and the longer it waits the more the ecosystem around it has moved on. Our engineers treat that as incremental work delivered alongside features, not a freeze while the framework is upgraded.",
  ],
  pullQuote:
    "An Angular codebase does not decay gradually. It is fine, and then it is three major versions behind and nothing will install.",
  capabilities: [
    {
      name: "Enterprise Applications",
      tag: "Product",
      body: "Large, long-lived line-of-business applications — complex forms, role-based access, deep data grids, and reporting — built on the structure Angular provides so a team that turns over can still maintain them.",
    },
    {
      name: "AngularJS Migration",
      tag: "Migration",
      body: "Moving applications off AngularJS, which has been unsupported since 2021, using incremental hybrid rendering so the product keeps shipping rather than freezing for the duration of a rewrite.",
    },
    {
      name: "Version Upgrades",
      tag: "Upgrade",
      body: "Stepping an application forward across Angular major versions, including the standalone-component and signals migrations, with the dependency and build changes each version actually requires.",
    },
    {
      name: "RxJS and Reactive State",
      tag: "Architecture",
      body: "Asynchronous flows modelled as streams that can be reasoned about and tested, plus NgRx where the state genuinely warrants it — and a simpler service-based store where it does not.",
    },
    {
      name: "Nx Monorepos",
      tag: "Scale",
      body: "Multiple Angular applications and shared libraries in one workspace with enforced boundaries, affected-only builds, and module federation where independent deployment matters.",
    },
    {
      name: "Change-Detection Performance",
      tag: "Performance",
      body: "Diagnosing the re-render storms that make large Angular applications feel slow — OnPush strategy, trackBy, virtual scrolling, and moving work out of the zone where it does not belong.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["Angular 17+", "TypeScript", "RxJS", "Angular Signals", "Angular Universal", "AngularJS"],
    },
    {
      name: "State & Data",
      items: ["NgRx", "NGXS", "Akita", "Apollo Angular", "REST / OpenAPI", "Socket.IO"],
    },
    {
      name: "UI & Tooling",
      items: ["Angular Material", "PrimeNG", "Tailwind CSS", "Nx", "Module Federation", "Storybook"],
    },
    {
      name: "Quality & Delivery",
      items: ["Jest", "Karma / Jasmine", "Cypress", "Playwright", "Azure DevOps", "GitHub Actions"],
    },
  ],
  faqs: [
    {
      q: "Can you migrate our AngularJS application to Angular?",
      a: "Yes, and it is one of the more common requests we get, because AngularJS reached end of life in December 2021 and is now a security and hiring problem as much as a technical one. The approach is incremental rather than a rewrite: run both frameworks side by side, migrate route by route or component by component, and keep shipping throughout. A full rewrite is occasionally the right call when the application is small or the domain model has changed entirely, and we will tell you when we think that is the case.",
    },
    {
      q: "What Angular versions do your developers work with?",
      a: "Angular 17 and above day to day, including standalone components, the new control-flow syntax, and signals. They also work comfortably in older codebases — Angular 8 through 16 is common in enterprises — and with AngularJS where a migration is involved. If you are several versions behind, the upgrade path and the dependency work it needs is something we scope explicitly rather than assume away.",
    },
    {
      q: "Do we need NgRx?",
      a: "Often not. NgRx is genuinely valuable when many unrelated components share mutable state, when you need time-travel debugging, or when state transitions are complex enough to warrant being explicit. For a great many applications a well-structured service with RxJS subjects does the same job with a fraction of the boilerplate. Our engineers will recommend against NgRx when it is not earning its cost, and work with it without complaint when you have already adopted it.",
    },
    {
      q: "How do you deal with Angular performance problems?",
      a: "By measuring before changing anything. Most Angular performance complaints resolve to change detection running far more often than necessary, so the work is profiling with the Angular DevTools profiler, moving components to OnPush, adding trackBy to list rendering, virtualising long lists, and moving high-frequency work such as scroll handlers outside the zone. Bundle size is a separate exercise — lazy-loaded routes and a look at what the dependency tree actually pulls in.",
    },
  ],
};

const mern: HireSkill = {
  slug: "hire-mern-stack-developers-india",
  key: "mern",
  name: "MERN Stack",
  role: "MERN Stack Developers",
  metaTitle: "Hire MERN Stack Developers in India",
  metaDescription:
    "Hire MERN stack developers in India from Soft Suave. Engineers across MongoDB, Express, React, and Node.js who own a feature end to end. You interview, two-week trial.",
  serviceType: "MERN stack development staffing",
  eyebrow: "Hire MERN Stack Developers",
  ctaLabel: "Hire MERN developers",
  titleLines: ["Hire MERN Stack Developers", "Who Own a Feature End to End"],
  heroBody: [
    "MongoDB, Express, React, and Node.js is the fastest route from an idea to a working product, because one language spans the whole stack and one engineer can carry a feature from schema to interface without a handoff.",
    "The risk is the same as the appeal. A team that never crosses a specialist boundary can build something that works at launch and does not survive its first real load. Our MERN engineers are full-stack in the honest sense — they have operated what they built.",
  ],
  heroPoints: [
    "One engineer owning schema, API and interface",
    "MongoDB data modelling and aggregation pipelines",
    "Node.js and Express APIs built to be operated",
    "React front ends with real state discipline",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-2.webp",
    width: 800,
    height: 1000,
    alt: "A full-stack JavaScript application spanning database, API, and interface layers",
  },
  requirementLabel: "What are you building on MERN?",
  requirementPlaceholder:
    "The product, the stage it is at, your expected load and data shape, and whether you need one full-stack engineer or a squad.",
  overviewTitle: "What MERN Stack Developers Actually Do for You",
  overviewParagraphs: [
    "MERN puts JavaScript everywhere: MongoDB for storage, Express for the HTTP layer, React for the interface, Node.js underneath. The practical benefit is not the shared language so much as the shared mental model — one engineer can change a field in the database and the form that edits it in the same afternoon, with no coordination cost.",
    "That makes MERN a strong fit for products in their first two years, where requirements change weekly and the cost of a cross-team handoff is larger than the cost of any individual technical decision. It is also why a great deal of venture-backed software starts here.",
    "The stack's weak point is data modelling. MongoDB's flexibility rewards teams who design their documents deliberately around access patterns, and punishes teams who treat it as a place to put JSON. Most of the MERN rescue work we do is a schema problem that became a performance problem, so that is where our engineers spend their design time.",
  ],
  pullQuote:
    "MongoDB does not stop you from modelling your data badly. It just waits until production to mention it.",
  capabilities: [
    {
      name: "MVPs and Product Launches",
      tag: "Build",
      body: "Going from specification to a working, deployed product with the whole stack owned by a small team — the case MERN is genuinely best at, and where the shared language pays for itself immediately.",
    },
    {
      name: "MongoDB Data Modelling",
      tag: "Data",
      body: "Document design driven by real access patterns, with indexing, aggregation pipelines, and a deliberate decision about embedding versus referencing — the choice that determines whether the application is fast at scale.",
    },
    {
      name: "Node and Express APIs",
      tag: "Back end",
      body: "REST and GraphQL services with input validation, structured error handling, authentication, rate limiting, and the logging and metrics that make an incident diagnosable at two in the morning.",
    },
    {
      name: "React Front Ends",
      tag: "Front end",
      body: "Component architecture, server-state caching, and routing built to the same standard as a dedicated front-end engagement, rather than treated as the easy half of the stack.",
    },
    {
      name: "Real-Time Features",
      tag: "Realtime",
      body: "WebSocket and Socket.IO messaging for chat, presence, live dashboards, and collaborative editing, including the reconnection and state-reconciliation logic these features need to survive a flaky connection.",
    },
    {
      name: "Deployment and Scaling",
      tag: "Operations",
      body: "Containerised deployment, CI pipelines, MongoDB Atlas configuration, replica sets, and caching — the work that separates a product that survives its launch week from one that does not.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["MongoDB", "Express", "React", "Node.js", "TypeScript", "Next.js"],
    },
    {
      name: "Data & API",
      items: ["Mongoose", "MongoDB Atlas", "GraphQL", "Redis", "Socket.IO", "Zod"],
    },
    {
      name: "Front End",
      items: ["TanStack Query", "Redux Toolkit", "Tailwind CSS", "Vite", "Storybook", "Framer Motion"],
    },
    {
      name: "Delivery",
      items: ["Docker", "AWS", "GitHub Actions", "Jest", "Playwright", "PM2"],
    },
  ],
  faqs: [
    {
      q: "Is MERN a good choice for our product?",
      a: "It is an excellent choice for products where requirements are still moving and time to market matters, and for teams small enough that a handoff between front-end and back-end specialists would be pure overhead. It is a weaker choice when you need heavy transactional guarantees across many entities, complex reporting over relational data, or a compute-intensive back end — a relational database with a Java, .NET, or Go service is usually the better answer there. We will tell you if we think your requirements point away from MERN.",
    },
    {
      q: "Should we use MongoDB or a relational database?",
      a: "MongoDB fits when documents map naturally to how you read data, when the schema varies between records, and when you can design around your access patterns up front. PostgreSQL fits when you need joins across many entities, strong transactional guarantees, or ad-hoc analytical queries. A fair number of MERN products would be better served by Postgres and chose MongoDB because it came with the acronym — our engineers are comfortable with both and will raise it early, when changing course is still cheap.",
    },
    {
      q: "Can one MERN developer really cover the whole stack?",
      a: "For most product work, yes, and that is the model's main advantage: no handoff, no waiting for the other half of a feature. Where it breaks down is at the edges — sophisticated interaction design, heavy infrastructure work, or data engineering all benefit from a specialist. We staff those separately rather than claiming a single engineer covers everything equally well, and we would rather say that during the shortlist than after you have hired.",
    },
    {
      q: "Do you work with Next.js instead of Express?",
      a: "Often, yes. Next.js route handlers and server actions replace a large share of what a separate Express service used to do, which removes a deployment and a set of CORS problems along with it. Whether that is right depends on whether the API has consumers other than your own front end: if mobile apps or partners also call it, a standalone Express or NestJS service is still the cleaner boundary. Our engineers work in both shapes.",
    },
  ],
};

const mean: HireSkill = {
  slug: "hire-mean-stack-developers-india",
  key: "mean",
  name: "MEAN Stack",
  role: "MEAN Stack Developers",
  metaTitle: "Hire MEAN Stack Developers in India",
  metaDescription:
    "Hire MEAN stack developers in India from Soft Suave — MongoDB, Express, Angular, and Node.js engineers for structured, long-lived applications. You interview, two-week trial.",
  serviceType: "MEAN stack development staffing",
  eyebrow: "Hire MEAN Stack Developers",
  ctaLabel: "Hire MEAN developers",
  titleLines: ["Hire MEAN Stack Developers", "For Structured, Long-Lived Products"],
  heroBody: [
    "MEAN is MERN's more structured sibling: the same JavaScript-everywhere model, with Angular in place of React. That trade buys convention over assembly, which is what makes it a sensible default for applications a changing team will maintain for years.",
    "It suits enterprise software rather than experiments. Our MEAN engineers are comfortable with the whole span — Mongo document design, Express services, and Angular applications with real RxJS discipline — and with the long-running upgrade work these products eventually need.",
  ],
  heroPoints: [
    "Full-stack TypeScript from schema to component",
    "Angular structure for applications teams inherit",
    "MongoDB modelling around real access patterns",
    "Node.js and Express services built to be operated",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-4.webp",
    width: 800,
    height: 1000,
    alt: "A structured full-stack JavaScript application with modular front-end and service layers",
  },
  requirementLabel: "What are you building on MEAN?",
  requirementPlaceholder:
    "The application, the Angular and Node versions in play, whether it is greenfield or existing, and the seniority you need.",
  overviewTitle: "What MEAN Stack Developers Actually Do for You",
  overviewParagraphs: [
    "MEAN pairs MongoDB, Express, Angular, and Node.js into a single-language stack where TypeScript runs from the database access layer through to the component. Because Angular is itself strongly typed and strongly opinionated, a MEAN codebase tends to be more uniform than an equivalent MERN one — which matters more the longer the application lives and the more engineers pass through it.",
    "A MEAN engagement usually covers Angular application architecture, Express API design, MongoDB schema and aggregation work, authentication and role-based access, and the deployment pipeline. Shared TypeScript interfaces between the API and the client are a genuine practical benefit: a contract change that breaks the front end fails at compile time rather than in production.",
    "The stack's characteristic problem is the Angular upgrade cycle. MEAN applications tend to be long-lived, and long-lived Angular applications fall behind. Our engineers treat version upgrades as routine scheduled work delivered alongside features, rather than a project that gets deferred until it becomes a rewrite.",
  ],
  pullQuote:
    "Shared types between the API and the client turn an entire category of integration bug into a failed build.",
  capabilities: [
    {
      name: "Enterprise Web Applications",
      tag: "Product",
      body: "Admin consoles, operations platforms, and line-of-business systems where role-based access, complex forms, and auditability matter more than novel interaction design.",
    },
    {
      name: "End-to-End TypeScript",
      tag: "Architecture",
      body: "Shared interfaces and validation schemas across the API boundary, so a breaking contract change fails in CI rather than surfacing as a runtime error in a user's browser.",
    },
    {
      name: "Express API Design",
      tag: "Back end",
      body: "Well-structured REST services with middleware for authentication and authorisation, request validation, consistent error semantics, and the observability needed to run them in production.",
    },
    {
      name: "MongoDB Schema Work",
      tag: "Data",
      body: "Document design, compound indexing, and aggregation pipelines driven by the queries the application actually runs, plus the migration tooling to evolve a schema safely once there is live data in it.",
    },
    {
      name: "Angular Upgrades",
      tag: "Maintenance",
      body: "Carrying long-lived MEAN applications forward across Angular major versions — including standalone components and signals — as incremental work rather than a deferred rewrite.",
    },
    {
      name: "Authentication and Access Control",
      tag: "Security",
      body: "JWT and session flows, refresh-token rotation, SSO through OAuth 2.0 and SAML, and role or attribute-based permissions enforced on the server rather than only hidden in the interface.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["MongoDB", "Express", "Angular 17+", "Node.js", "TypeScript", "RxJS"],
    },
    {
      name: "Data & API",
      items: ["Mongoose", "MongoDB Atlas", "Redis", "REST / OpenAPI", "GraphQL", "Socket.IO"],
    },
    {
      name: "Front End",
      items: ["Angular Material", "NgRx", "Tailwind CSS", "Nx", "PrimeNG", "Storybook"],
    },
    {
      name: "Delivery",
      items: ["Docker", "AWS", "Azure DevOps", "Jest", "Cypress", "GitHub Actions"],
    },
  ],
  faqs: [
    {
      q: "MEAN or MERN — which should we choose?",
      a: "It comes down to Angular versus React, because the other three letters are identical. Angular gives you convention, a complete batteries-included framework, and codebases that look the same across teams, which suits long-lived enterprise applications maintained by people who did not write them. React gives you a larger ecosystem, a shallower learning curve, and a bigger hiring pool, which suits products that need to move fast and iterate on the interface. Neither is technically superior; they fail in different ways.",
    },
    {
      q: "Can your MEAN developers work across the whole stack?",
      a: "Yes — that is the point of hiring for the stack rather than for a layer. In practice most engineers lean one way, and we tell you which during the shortlist rather than presenting everyone as perfectly balanced. For a team of three or more we would usually suggest weighting it deliberately: one stronger on Angular, one stronger on Node and Mongo, and one genuinely in the middle.",
    },
    {
      q: "Do you use NestJS instead of plain Express?",
      a: "Frequently, and for a MEAN team it is often the better fit. NestJS brings Angular's own structural conventions to the back end — modules, dependency injection, decorators — so an Angular developer reads the server code without a context switch. Plain Express remains the right choice for small services where that structure would be overhead. We work with both and will recommend one based on the size and expected lifetime of the service.",
    },
    {
      q: "Our MEAN application is on an old Angular version. Can you help?",
      a: "Yes, and it is one of the more common reasons teams come to us. The work is scoped as a sequence of major-version steps rather than one jump, because Angular's migration tooling is designed for that and skipping versions turns a mechanical upgrade into a debugging exercise. Each step is delivered alongside normal feature work so the product does not freeze, and the dependency upgrades that ride along with it — RxJS, TypeScript, the component library — are scoped explicitly rather than discovered halfway through.",
    },
  ],
};

export const webHireSkills: readonly HireSkill[] = [react, angular, mern, mean];
