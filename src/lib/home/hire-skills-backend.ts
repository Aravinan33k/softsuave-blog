/**
 * Back-end and server-side hire pages: Node.js, NestJS, Java, Python, Django,
 * PHP, Laravel, .NET, Ruby on Rails.
 *
 * One entry per `/hire-*` route. See `hire-skill.ts` for the shape and for why
 * each entry argues about its own technology rather than sharing one templated
 * paragraph with the other twenty-three.
 */

import type { HireSkill } from "./hire-skill";

const node: HireSkill = {
  slug: "hire-nodejs-developers",
  key: "node",
  name: "Node.js",
  role: "Node.js Developers",
  metaTitle: "Hire Node.js Developers",
  metaDescription:
    "Hire Node.js developers from Soft Suave for APIs, real-time systems, and microservices built to be operated. You interview every candidate, two-week trial, full IP ownership.",
  serviceType: "Node.js development staffing",
  eyebrow: "Hire Node.js Developers",
  ctaLabel: "Hire Node.js developers",
  titleLines: ["Hire Node.js Developers", "Who Have Run What They Built"],
  heroBody: [
    "Node.js is the default for I/O-bound services: APIs that spend their time waiting on databases and other services, real-time transports, and the BFF layer in front of a JavaScript front end. Its event loop makes that work cheap, and makes CPU-bound work expensive.",
    "Knowing which side of that line a feature falls on is the difference between a service that scales quietly and one that stalls under load. Our Node engineers have operated production systems, not only written them.",
  ],
  heroPoints: [
    "REST and GraphQL APIs designed for versioning and change",
    "Real-time systems over WebSockets at genuine concurrency",
    "Microservices, queues and event-driven architectures",
    "Observability, profiling and event-loop diagnosis",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/svc-custom-software.webp",
    width: 1200,
    height: 860,
    alt: "A Node.js service architecture showing APIs, queues, and connected data stores",
  },
  requirementLabel: "What are you building on Node.js?",
  requirementPlaceholder:
    "The services involved, expected throughput, what they integrate with, and whether this is a new build or existing code.",
  overviewTitle: "What Node.js Developers Actually Do for You",
  overviewParagraphs: [
    "Node.js runs JavaScript on the server with a single-threaded, non-blocking event loop. That design is exceptional for workloads dominated by waiting — database queries, HTTP calls to other services, streaming responses — and poor for workloads dominated by computation, because a long synchronous operation blocks every other request in the process.",
    "A Node engagement usually covers API design and implementation, authentication and authorisation, database access and query performance, background jobs and queues, real-time transport, and the operational layer: structured logging, metrics, tracing, graceful shutdown, and containerised deployment.",
    "The failure mode we are most often called in to fix is not a framework problem. It is an unbounded query, a synchronous loop over a large array, or a missing backpressure strategy on a stream — all of which present as a mysteriously unresponsive service. Engineers who have been on call for a Node system recognise these quickly.",
  ],
  pullQuote:
    "Node does not get slow gradually under CPU load. One blocking call stops every request in the process at once.",
  capabilities: [
    {
      name: "REST and GraphQL APIs",
      tag: "API",
      body: "Services designed around a versioning strategy, validated at the boundary, with consistent error semantics and documentation generated from the schema rather than maintained separately and left to drift.",
    },
    {
      name: "Real-Time Systems",
      tag: "Realtime",
      body: "WebSocket and Server-Sent Events transports for chat, presence, live dashboards, and collaboration — including the horizontal-scaling problem, which is where most real-time implementations first fail.",
    },
    {
      name: "Microservices and Events",
      tag: "Architecture",
      body: "Service decomposition along genuine ownership boundaries, message-driven communication over Kafka, RabbitMQ, or SQS, and the idempotency and retry discipline distributed systems require to be correct.",
    },
    {
      name: "Background Processing",
      tag: "Jobs",
      body: "Queue-backed workers for email, reporting, imports, and anything slow enough to be pushed out of the request path, with retries, dead-letter handling, and visibility into what failed and why.",
    },
    {
      name: "Performance and Profiling",
      tag: "Performance",
      body: "Diagnosing event-loop blocking, memory leaks, and connection-pool exhaustion using flame graphs and heap snapshots — the problems that look like infrastructure faults and are not.",
    },
    {
      name: "Observability",
      tag: "Operations",
      body: "Structured logging with correlation IDs, OpenTelemetry tracing across service boundaries, health checks, and metrics chosen so an incident can be diagnosed from the dashboards rather than by reading code.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["Node.js 20+", "TypeScript", "Express", "Fastify", "NestJS", "tRPC"],
    },
    {
      name: "Data",
      items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Drizzle", "TypeORM"],
    },
    {
      name: "Messaging & Realtime",
      items: ["Kafka", "RabbitMQ", "AWS SQS", "BullMQ", "Socket.IO", "GraphQL Subscriptions"],
    },
    {
      name: "Delivery",
      items: ["Docker", "Kubernetes", "AWS", "OpenTelemetry", "Vitest", "GitHub Actions"],
    },
  ],
  faqs: [
    {
      q: "Is Node.js fast enough for our workload?",
      a: "For I/O-bound work — which is most web APIs — yes, comfortably, and it handles high concurrency on modest hardware. For CPU-bound work it is the wrong tool by design: a single long computation blocks the event loop and every concurrent request with it. The usual answer is to move that work to a queue and a worker process, or to a service written in Go, Rust, or Java. We will say which of those applies to your workload during the first call, rather than discovering it in a load test.",
    },
    {
      q: "Express, Fastify, or NestJS?",
      a: "Express is ubiquitous and unopinionated, which makes it fine for small services and a liability for large ones, since every team invents its own structure. Fastify is meaningfully faster and has better built-in schema validation. NestJS imposes a modular, dependency-injected architecture that pays off on larger teams and longer-lived codebases at the cost of more ceremony up front. For a service expected to live for years with several engineers on it, we usually recommend NestJS.",
    },
    {
      q: "Can Node.js developers also write the front end?",
      a: "Many can, and for a JavaScript product that is a real advantage — shared types across the API boundary, no handoff on a full-stack feature. But back-end and front-end work reward different instincts, and an engineer who is genuinely strong at both is less common than job titles suggest. We tell you where each shortlisted engineer actually sits rather than describing everyone as full-stack.",
    },
    {
      q: "How do you handle security in Node applications?",
      a: "Dependency auditing in CI, since the npm supply chain is the most common real attack surface; validation of every input at the boundary with a schema rather than ad-hoc checks; parameterised database access; secrets from a managed store rather than environment files in the repo; rate limiting and sensible security headers; and authentication built on a maintained library rather than hand-rolled token handling. It is reviewed as part of code review, not deferred to a pre-launch audit.",
    },
  ],
};

const nestjs: HireSkill = {
  slug: "hire-nestjs-developers",
  key: "nestjs",
  name: "NestJS",
  role: "NestJS Developers",
  metaTitle: "Hire NestJS Developers",
  metaDescription:
    "Hire NestJS developers from Soft Suave for structured, testable TypeScript back ends — modular architecture, DI, microservices. You interview, two-week trial.",
  serviceType: "NestJS development staffing",
  eyebrow: "Hire NestJS Developers",
  ctaLabel: "Hire NestJS developers",
  titleLines: ["Hire NestJS Developers", "For Back Ends That Stay Legible"],
  heroBody: [
    "NestJS exists because Express codebases stop being readable at a certain size. It brings modules, dependency injection, and decorator-driven structure to Node — the conventions that let a new engineer find things without being told where they are.",
    "That structure only pays off if it is used properly rather than treated as ornamentation. Our NestJS engineers build the module boundaries, providers, and testing seams the framework is actually designed around.",
  ],
  heroPoints: [
    "Modular architecture with real dependency injection",
    "REST, GraphQL and microservice transports",
    "TypeORM and Prisma with migration discipline",
    "Testable by construction — unit and e2e suites",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-5.webp",
    width: 800,
    height: 1000,
    alt: "A modular TypeScript service architecture with clearly separated layers",
  },
  requirementLabel: "What are you building on NestJS?",
  requirementPlaceholder:
    "The services involved, your database and transport choices, team size, and whether this is greenfield or an Express migration.",
  overviewTitle: "What NestJS Developers Actually Do for You",
  overviewParagraphs: [
    "NestJS is an opinionated Node framework that borrows Angular's architecture: applications are composed of modules, dependencies are injected rather than imported directly, and cross-cutting concerns are expressed as guards, interceptors, and pipes. The result is a codebase where routing, validation, authorisation, and business logic each live somewhere predictable.",
    "A NestJS engagement covers module and provider design, DTOs with validation at the boundary, database access through TypeORM or Prisma with proper migrations, authentication and role-based guards, and the transport layer — HTTP, GraphQL, WebSockets, or a message broker, all of which Nest abstracts behind the same programming model.",
    "The framework's real payoff is testability. Because dependencies are injected, any provider can be tested with its collaborators replaced, and Nest ships a testing module that makes that straightforward. Teams that use it get high coverage almost incidentally; teams that bypass DI and instantiate directly end up with the ceremony and none of the benefit.",
  ],
  pullQuote:
    "NestJS is only worth its ceremony if you use the dependency injection. Bypassed, it is Express with extra decorators.",
  capabilities: [
    {
      name: "Modular Back Ends",
      tag: "Architecture",
      body: "Feature modules with explicit boundaries and injected dependencies, so a new engineer can locate any piece of behaviour from the module graph rather than by searching the repository.",
    },
    {
      name: "REST and GraphQL APIs",
      tag: "API",
      body: "Controllers and resolvers with DTO validation, serialisation, and OpenAPI or schema generation kept automatically in step with the code rather than maintained as a separate document.",
    },
    {
      name: "Microservices",
      tag: "Distributed",
      body: "Nest's transport abstraction over Kafka, RabbitMQ, NATS, gRPC, or Redis, so a service can change its communication mechanism without the business logic inside it being rewritten.",
    },
    {
      name: "Database and Migrations",
      tag: "Data",
      body: "TypeORM or Prisma with reviewed, reversible migrations, transaction boundaries drawn deliberately, and repository patterns that keep query logic out of controllers.",
    },
    {
      name: "Auth and Authorisation",
      tag: "Security",
      body: "Passport strategies, JWT with refresh rotation, OAuth and SSO, and guard-based role or attribute permissions enforced consistently at the server rather than assumed from the interface.",
    },
    {
      name: "Express Migration",
      tag: "Migration",
      body: "Moving an Express codebase that has outgrown its structure onto Nest incrementally, module by module, with both running side by side rather than a freeze for a rewrite.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["NestJS 10+", "TypeScript", "Node.js 20+", "Fastify adapter", "RxJS", "class-validator"],
    },
    {
      name: "Data",
      items: ["PostgreSQL", "TypeORM", "Prisma", "MongoDB / Mongoose", "Redis", "MikroORM"],
    },
    {
      name: "Transport & Messaging",
      items: ["GraphQL", "gRPC", "Kafka", "RabbitMQ", "NATS", "BullMQ"],
    },
    {
      name: "Delivery",
      items: ["Jest", "Supertest", "Docker", "Kubernetes", "AWS", "GitHub Actions"],
    },
  ],
  faqs: [
    {
      q: "Why NestJS instead of plain Express?",
      a: "Because Express gives you no structure, and on a team of more than two or three that becomes the problem. Every Express codebase invents its own conventions for where validation lives, how services are wired, and what a module even is — and those conventions diverge as people come and go. Nest supplies one answer to all of that. For a small service with a single owner and a short life, plain Express or Fastify is still less overhead, and we will say so.",
    },
    {
      q: "Can you migrate our Express application to NestJS?",
      a: "Yes, and incrementally rather than as a rewrite. Nest can mount an existing Express application, which lets new features be built the Nest way while old routes continue serving untouched, then migrated module by module as they are next worked on. That sequencing means the migration is funded by feature work rather than needing its own freeze, and it can be stopped partway without leaving the codebase broken.",
    },
    {
      q: "TypeORM or Prisma?",
      a: "Prisma has the better developer experience and much stronger type safety — the generated client knows your schema exactly — and it is our default for new projects. TypeORM integrates more naturally with Nest's dependency injection, handles some complex relational mapping and raw-SQL cases more gracefully, and is what most existing Nest codebases already use. If you have TypeORM in place and it is working, we will not propose swapping it as a project in its own right.",
    },
    {
      q: "Is NestJS overkill for a small service?",
      a: "Sometimes, and it is worth being honest about that. For a service with a handful of endpoints, one owner, and a short expected life, the module and provider ceremony costs more than the structure returns. The threshold in our experience is roughly three engineers or two years of expected life — past either, the structure starts paying for itself, and below both a lighter framework is the better call.",
    },
  ],
};

const java: HireSkill = {
  slug: "hire-java-developers",
  key: "java",
  name: "Java",
  role: "Java Developers",
  metaTitle: "Hire Java Developers",
  metaDescription:
    "Hire Java developers from Soft Suave for Spring Boot services, microservices, and enterprise modernization. You interview every candidate, two-week trial, full IP ownership.",
  serviceType: "Java development staffing",
  eyebrow: "Hire Java Developers",
  ctaLabel: "Hire Java developers",
  titleLines: ["Hire Java Developers", "For Systems That Cannot Fail Quietly"],
  heroBody: [
    "Java runs the systems where correctness and uptime are not negotiable — payments, core banking, order management, logistics. Its appeal is not novelty but the opposite: a mature runtime, exceptional observability, and libraries that have been load-bearing for two decades.",
    "Our Java engineers work across both halves of that reality: Spring Boot services on Java 21 and containers, and the older estates that still run the business and need modernizing carefully.",
  ],
  heroPoints: [
    "Spring Boot microservices and modular monoliths",
    "Java 17 and 21, including virtual threads",
    "JPA, Hibernate and genuine SQL performance work",
    "Legacy modernization from J2EE and monoliths",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-3.webp",
    width: 800,
    height: 1000,
    alt: "An enterprise Java service estate with layered architecture and integration points",
  },
  requirementLabel: "What are you building in Java?",
  requirementPlaceholder:
    "The systems involved, your Java and Spring versions, integration points, and whether this is new development or modernization.",
  overviewTitle: "What Java Developers Actually Do for You",
  overviewParagraphs: [
    "Java's position in enterprise software rests on a strong static type system that catches whole classes of error at compile time, a JVM with mature garbage collection and excellent production tooling, and an ecosystem where the important libraries have been maintained for years rather than months. For systems that must be correct and observable, those matter more than language ergonomics.",
    "A Java engagement typically covers Spring Boot service development, REST and event-driven integration, persistence through JPA and Hibernate with attention to the queries actually generated, transaction management, caching, and the build and deployment pipeline. On existing estates it usually also covers a version upgrade.",
    "That upgrade work is more common than greenfield. A great many organisations run Java 8 or 11 with old Spring versions, and the jump to Java 17 or 21 unlocks real gains — virtual threads in particular change how throughput-bound services are written. It is also where the security patches are, which is usually the argument that finally funds it.",
  ],
  pullQuote:
    "Most Java performance work is not JVM tuning. It is finding the N+1 query that Hibernate is generating on your behalf.",
  capabilities: [
    {
      name: "Spring Boot Services",
      tag: "Build",
      body: "REST and event-driven services with dependency injection, configuration management, health and metrics endpoints, and the production concerns handled by the framework rather than reinvented per team.",
    },
    {
      name: "Microservices",
      tag: "Architecture",
      body: "Service decomposition along domain boundaries, synchronous and asynchronous integration, distributed tracing, resilience patterns, and the transactional consistency problem addressed rather than assumed away.",
    },
    {
      name: "Legacy Modernization",
      tag: "Migration",
      body: "Moving J2EE, Struts, and monolithic applications onto Spring Boot and current Java, incrementally — strangling functionality out of the monolith so the business keeps running throughout.",
    },
    {
      name: "Persistence and Performance",
      tag: "Data",
      body: "JPA and Hibernate mapping done with awareness of the SQL it generates, index and query tuning, connection-pool sizing, and caching — where most real Java performance problems are found and fixed.",
    },
    {
      name: "Version Upgrades",
      tag: "Upgrade",
      body: "Java 8 or 11 to 17 and 21, and the corresponding Spring Boot upgrades, including the Jakarta EE namespace change that makes the Spring Boot 2 to 3 step more than a version bump.",
    },
    {
      name: "Batch and Integration",
      tag: "Processing",
      body: "Spring Batch pipelines, scheduled processing, file and message-based integration with external partners, and the restartability and idempotency that overnight processing actually requires.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["Java 17 / 21", "Spring Boot 3", "Spring Cloud", "Jakarta EE", "Maven", "Gradle"],
    },
    {
      name: "Data",
      items: ["PostgreSQL", "Oracle", "MySQL", "Hibernate / JPA", "Flyway", "Redis"],
    },
    {
      name: "Messaging & Integration",
      items: ["Apache Kafka", "RabbitMQ", "Spring Batch", "gRPC", "Elasticsearch", "Camel"],
    },
    {
      name: "Delivery",
      items: ["Docker", "Kubernetes", "JUnit 5", "Testcontainers", "Jenkins", "Micrometer"],
    },
  ],
  faqs: [
    {
      q: "Can you upgrade our Java 8 application?",
      a: "Yes, and it is worth doing for the security patches alone — Java 8 public updates ended years ago and commercial support is a cost with no upside. The path is usually Java 8 to 11 to 17, then 21, taken as steps rather than one jump. The genuinely disruptive part is rarely the language: it is the Jakarta EE namespace change in Spring Boot 3, which renames every javax import, and the dependencies that never released a compatible version. We scope both explicitly before starting.",
    },
    {
      q: "Do your Java developers work with Spring Boot?",
      a: "Effectively all of them — Spring Boot is the default for new Java work and has been for years. That includes Spring Data, Spring Security, Spring Cloud for distributed concerns, and Spring Batch for scheduled processing. Engineers with Quarkus and Micronaut experience are available where startup time and memory footprint matter enough to justify a less common framework, which is mainly serverless and edge deployment.",
    },
    {
      q: "Should we break our Java monolith into microservices?",
      a: "Often not, or at least not yet. Microservices trade a code-organisation problem for a distributed-systems problem, and the second is considerably harder: network failure, eventual consistency, distributed tracing, and deployment coordination all become your concern. A well-structured modular monolith gives most of the maintainability benefit with none of that. Where a genuine scaling or team-autonomy boundary exists we will extract that service specifically, rather than decomposing everything on principle.",
    },
    {
      q: "How do you approach Java performance problems?",
      a: "By profiling before changing anything — JFR, async-profiler, and the actual SQL log. In practice the great majority of what gets reported as a JVM problem is a database problem: an N+1 query from a lazy Hibernate association, a missing index, or a connection pool sized wrong. Genuine JVM tuning matters far less than it used to now that G1 and ZGC are good defaults, so it is where we look last rather than first.",
    },
  ],
};

const python: HireSkill = {
  slug: "hire-python-developers",
  key: "python",
  name: "Python",
  role: "Python Developers",
  metaTitle: "Hire Python Developers",
  metaDescription:
    "Hire Python developers from Soft Suave for APIs, data pipelines, automation, and ML systems. FastAPI, Django, and pandas expertise. You interview, two-week trial.",
  serviceType: "Python development staffing",
  eyebrow: "Hire Python Developers",
  ctaLabel: "Hire Python developers",
  titleLines: ["Hire Python Developers", "For Back Ends, Data and Everything Between"],
  heroBody: [
    "Python is the only mainstream language that is simultaneously a strong choice for web APIs, data engineering, automation, and machine learning. For teams whose work spans those, that breadth removes an entire category of integration problem.",
    "It also means \"Python developer\" describes several different jobs. We match on the one you actually need — API engineering, data pipelines, or ML systems — rather than on the language alone.",
  ],
  heroPoints: [
    "FastAPI and Django REST services with typed models",
    "Data pipelines with pandas, Polars, Airflow and dbt",
    "ML systems from training through to serving",
    "Automation, integrations and scheduled processing",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-9.png",
    width: 1536,
    height: 1024,
    alt: "A Python system spanning API services, data pipelines, and model serving",
  },
  requirementLabel: "What do you need Python developers for?",
  requirementPlaceholder:
    "Whether the work is API development, data engineering, or ML — plus the frameworks in play and the seniority you need.",
  overviewTitle: "What Python Developers Actually Do for You",
  overviewParagraphs: [
    "Python trades raw execution speed for readability and an enormous ecosystem, which is the right trade for most work that is not CPU-bound in its inner loop. Its position in data and machine learning is effectively unchallenged, and modern typed frameworks such as FastAPI have made it a serious choice for web APIs rather than merely a convenient one.",
    "The breadth is real but it fragments the skill set. Someone excellent at building high-throughput FastAPI services may have never written an Airflow DAG; someone who has spent three years on ML pipelines may not have designed an authentication system. Hiring well means being specific about which of these you need.",
    "A Python engagement therefore starts with that question. From there it covers the usual ground for its type — API design and async correctness, or pipeline orchestration and data quality, or model training, evaluation, and serving — plus the packaging and dependency discipline that Python projects need more than most.",
  ],
  pullQuote:
    "\"Python developer\" covers at least three different jobs. Hiring for the language rather than the job is why the match so often fails.",
  capabilities: [
    {
      name: "FastAPI Services",
      tag: "API",
      body: "Async APIs with Pydantic models providing validation and generated OpenAPI documentation, plus the async discipline that keeps a blocking call from stalling the entire event loop.",
    },
    {
      name: "Django Applications",
      tag: "Web",
      body: "Full applications on Django and Django REST Framework where the admin, ORM, auth, and migrations remove months of work that would otherwise be rebuilt by hand.",
    },
    {
      name: "Data Pipelines",
      tag: "Data",
      body: "Batch and streaming pipelines orchestrated with Airflow, Dagster, or Prefect, with transformations in pandas, Polars, or dbt and data-quality checks that fail loudly rather than silently.",
    },
    {
      name: "Machine Learning Systems",
      tag: "ML",
      body: "Training pipelines, feature engineering, experiment tracking, model registries, and serving — the engineering around a model, which is where most ML projects stall short of production.",
    },
    {
      name: "Automation and Integration",
      tag: "Automation",
      body: "Scheduled jobs, third-party API integrations, document and file processing, and the internal tooling that replaces recurring manual work — often the fastest measurable return in a Python engagement.",
    },
    {
      name: "Performance and Packaging",
      tag: "Engineering",
      body: "Profiling hot paths, moving CPU-bound work into NumPy or a compiled extension, and dependency management with Poetry or uv so environments are reproducible across machines and CI.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["Python 3.12", "FastAPI", "Django", "Flask", "Pydantic", "SQLAlchemy"],
    },
    {
      name: "Data & ML",
      items: ["pandas", "Polars", "Apache Airflow", "dbt", "PyTorch", "scikit-learn"],
    },
    {
      name: "Infrastructure",
      items: ["PostgreSQL", "Redis", "Celery", "Kafka", "Snowflake", "DuckDB"],
    },
    {
      name: "Delivery",
      items: ["pytest", "Docker", "uv / Poetry", "Ruff", "mypy", "GitHub Actions"],
    },
  ],
  faqs: [
    {
      q: "Django or FastAPI for our project?",
      a: "Django when you need a full web application with an admin interface, user management, sessions, and server-rendered pages — it supplies all of that and the productivity gain is large. FastAPI when you are building an API consumed by a separate front end or other services, particularly one that is I/O-bound and benefits from async. A common and sensible arrangement is Django for the internal admin and FastAPI for the public API, sharing a database.",
    },
    {
      q: "Is Python fast enough for production workloads?",
      a: "For I/O-bound services — waiting on databases and other APIs, which is most web work — yes, and async frameworks handle high concurrency well. For CPU-bound work, pure Python is genuinely slow, but that is rarely the real constraint because the heavy numerical libraries are compiled C or Rust underneath. Where a hot path is genuinely Python-bound, the options are vectorising with NumPy, a native extension, or moving that component to another language, and we will recommend accordingly rather than defending the language.",
    },
    {
      q: "Can your Python developers do machine learning work?",
      a: "Some, and we match specifically rather than assuming the language implies the skill. ML engineering — training pipelines, feature stores, evaluation, serving, monitoring for drift — is a distinct discipline from API development, and conflating them is the most common reason a Python hire disappoints. Tell us which you need on the first call and the shortlist will reflect it.",
    },
    {
      q: "How do you handle Python dependency management?",
      a: "With a lockfile and a reproducible toolchain — uv or Poetry on new projects, pinned requirements with pip-tools on existing ones — so the environment in CI matches the environment on a developer's machine. Docker for anything with system-level dependencies. It is worth being deliberate about early: Python's packaging has improved considerably but it remains the most common source of works-on-my-machine failures.",
    },
  ],
};

const django: HireSkill = {
  slug: "hire-django-developer",
  key: "django",
  name: "Django",
  role: "Django Developers",
  metaTitle: "Hire Django Developers",
  metaDescription:
    "Hire Django developers from Soft Suave for secure, admin-driven web applications and REST APIs. Batteries-included delivery, you interview every candidate, two-week trial.",
  serviceType: "Django development staffing",
  eyebrow: "Hire Django Developers",
  ctaLabel: "Hire Django developers",
  titleLines: ["Hire Django Developers", "Who Use What the Framework Gives You"],
  heroBody: [
    "Django's value is how much you do not have to build: authentication, permissions, an admin interface, an ORM with real migrations, and a security posture that defends against the common web vulnerabilities by default.",
    "The waste we see most often is teams reimplementing those by hand. Our Django engineers know the framework deeply enough to use it as intended, which is usually the difference between a three-month build and a six-month one.",
  ],
  heroPoints: [
    "Django 5 with Django REST Framework",
    "The admin used properly as an internal tool",
    "ORM query optimisation and safe migrations",
    "Celery for background and scheduled work",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-6.webp",
    width: 800,
    height: 1000,
    alt: "A Django application showing admin tooling, models, and API surface",
  },
  requirementLabel: "What are you building in Django?",
  requirementPlaceholder:
    "The application, your Django version, whether there is a separate front end, and the seniority you need.",
  overviewTitle: "What Django Developers Actually Do for You",
  overviewParagraphs: [
    "Django is a batteries-included web framework: an ORM with migrations, an authentication and permission system, an automatically-generated admin interface, form handling, and protection against CSRF, SQL injection, and XSS all ship with it. For applications with users, roles, and data to administer, that removes a very large amount of work that has no competitive value.",
    "A Django engagement covers model design and migrations, views or DRF viewsets, the permission model, the admin configured as a genuine internal tool, background processing with Celery, caching, and deployment. Where a separate front end exists, Django serves as the API and the admin behind it.",
    "The framework's characteristic performance problem is the ORM's convenience: an innocuous-looking template loop can issue a query per row. It is entirely avoidable with select_related, prefetch_related, and an eye on the query log, and it is the first thing our engineers check when a Django application is reported as slow.",
  ],
  pullQuote:
    "The Django admin is the most under-used feature in web development. Configured properly it replaces months of internal tooling.",
  capabilities: [
    {
      name: "Web Applications",
      tag: "Product",
      body: "Full applications with users, roles, and workflow built on Django's own auth and permission systems rather than a bespoke reimplementation that will need its own security review.",
    },
    {
      name: "REST APIs",
      tag: "API",
      body: "Django REST Framework viewsets, serializers, and permission classes, with pagination, filtering, and throttling configured properly — plus generated schema documentation that stays current.",
    },
    {
      name: "Admin as Internal Tooling",
      tag: "Operations",
      body: "The Django admin customised into a real operations interface — inline editing, bulk actions, filters, and scoped permissions — which usually removes an entire internal-tools project from the roadmap.",
    },
    {
      name: "ORM Performance",
      tag: "Performance",
      body: "Finding and fixing N+1 queries with select_related and prefetch_related, adding the indexes the query plan actually wants, and using annotations to push aggregation into the database.",
    },
    {
      name: "Background Processing",
      tag: "Jobs",
      body: "Celery workers for email, reporting, imports, and scheduled tasks, with retry policy, result handling, and monitoring so a silently failing nightly job is noticed the same day.",
    },
    {
      name: "Upgrades and Security",
      tag: "Maintenance",
      body: "Moving applications forward across Django LTS releases, resolving the deprecations each one introduces, and keeping the dependency tree patched — routine work that becomes a project when deferred.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["Django 5", "Django REST Framework", "Python 3.12", "Celery", "Channels", "django-allauth"],
    },
    {
      name: "Data",
      items: ["PostgreSQL", "Redis", "Elasticsearch", "django-filter", "pgBouncer", "S3 storage"],
    },
    {
      name: "Front End",
      items: ["HTMX", "Alpine.js", "React", "Tailwind CSS", "django-templates", "Vite"],
    },
    {
      name: "Delivery",
      items: ["pytest-django", "Docker", "Gunicorn", "Nginx", "AWS", "GitHub Actions"],
    },
  ],
  faqs: [
    {
      q: "Is Django a good fit if we already have a React front end?",
      a: "Yes — Django REST Framework is a mature, well-understood way to serve an API, and you keep the admin, the auth system, and the migration tooling behind it. The main thing to decide early is where session versus token authentication sits and how CORS is handled, because retrofitting that later is more disruptive than it sounds. If the application is purely an API with no admin requirement and is heavily I/O-bound, FastAPI is worth considering instead.",
    },
    {
      q: "Can Django handle high traffic?",
      a: "Yes, with the usual caveats that apply to any framework: query optimisation, caching at the right layers, a properly sized connection pool, and horizontal scaling behind a load balancer. Instagram ran on Django at enormous scale, so the ceiling is not the framework. The practical limit is almost always the database and the ORM usage in front of it, which is where we look when a Django application is reported as slow.",
    },
    {
      q: "Should we use the Django admin for our customers?",
      a: "No. The admin is built for trusted internal staff, and its permission model, interface, and error handling all assume that. Exposing it to customers leads to both security and usability problems. Use it for your own operations team — where it is genuinely excellent — and build customer-facing interfaces as normal views or through the API.",
    },
    {
      q: "How do you handle Django version upgrades?",
      a: "LTS to LTS, one step at a time, with the deprecation warnings from the current version resolved before the jump rather than after. Django's release notes are unusually good about what breaks, so the work is predictable; the unpredictable part is third-party packages that have not kept pace, which we audit before committing to a date. Running the test suite with warnings turned into errors is what surfaces most of it early.",
    },
  ],
};

const php: HireSkill = {
  slug: "hire-php-developers",
  key: "php",
  name: "PHP",
  role: "PHP Developers",
  metaTitle: "Hire PHP Developers",
  metaDescription:
    "Hire PHP developers from Soft Suave for modern PHP 8 applications, Laravel builds, and legacy modernization. You interview every candidate, two-week trial, full IP ownership.",
  serviceType: "PHP development staffing",
  eyebrow: "Hire PHP Developers",
  ctaLabel: "Hire PHP developers",
  titleLines: ["Hire PHP Developers", "Who Write Modern PHP, Not 2012 PHP"],
  heroBody: [
    "PHP 8 is a typed, fast, genuinely pleasant language, and it still runs a large share of the web. The problem is that a great deal of PHP in production was written before any of that was true, by people following advice that was already outdated.",
    "Our PHP engineers work in the modern idiom — typed properties, Composer, PSR standards, real test suites — and are equally comfortable carrying an older codebase forward without stopping the business to do it.",
  ],
  heroPoints: [
    "PHP 8.3 with strict types and modern tooling",
    "Laravel and Symfony application development",
    "Legacy PHP modernization, done incrementally",
    "MySQL and PostgreSQL query performance work",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/story.webp",
    width: 1400,
    height: 900,
    alt: "A PHP application being modernized, showing legacy and current code paths side by side",
  },
  requirementLabel: "What do you need PHP developers for?",
  requirementPlaceholder:
    "The application, your PHP version and framework, whether modernization is involved, and the seniority you need.",
  overviewTitle: "What PHP Developers Actually Do for You",
  overviewParagraphs: [
    "PHP's reputation was earned by a version of the language that no longer exists. PHP 8 has union types, enums, readonly properties, attributes, and a JIT compiler, and performance improved several-fold from PHP 5 to PHP 8. The ecosystem standardised around Composer and the PSR specifications years ago, so modern PHP code looks much like modern code anywhere.",
    "A PHP engagement is usually one of two things. Either new application work — typically Laravel or Symfony, where the framework supplies routing, ORM, queues, and testing — or modernization of an existing codebase that has been running the business for a decade and is now hard to change and harder to secure.",
    "The modernization case is the more common of the two, and it is rarely a rewrite. It is version upgrades, introducing Composer and autoloading where includes were used, adding a test suite around the parts that must not break, and extracting logic into testable services one area at a time while the application keeps serving traffic.",
  ],
  pullQuote:
    "Most legacy PHP does not need a rewrite. It needs a test suite, an upgrade path, and someone willing to do it incrementally.",
  capabilities: [
    {
      name: "Laravel Applications",
      tag: "Framework",
      body: "Full applications on Laravel with Eloquent, queues, events, and the testing tools the framework provides — the fastest route to a maintainable PHP product for most teams.",
    },
    {
      name: "Symfony Applications",
      tag: "Framework",
      body: "Symfony builds where explicit configuration and component-level control matter more than convention — common in larger enterprises and in applications with unusual architectural constraints.",
    },
    {
      name: "Legacy Modernization",
      tag: "Migration",
      body: "PHP 5 and 7 codebases brought to PHP 8, procedural code refactored into testable services, Composer and autoloading introduced — delivered incrementally, never as a freeze for a rewrite.",
    },
    {
      name: "API Development",
      tag: "API",
      body: "REST and GraphQL services with token authentication, rate limiting, versioning, and generated documentation, whether standalone or layered onto an existing monolithic application.",
    },
    {
      name: "Database Performance",
      tag: "Data",
      body: "Query and index tuning on MySQL and PostgreSQL, fixing the N+1 patterns ORMs encourage, adding caching where it genuinely helps, and reviewing the schema behind a slow application.",
    },
    {
      name: "Security Hardening",
      tag: "Security",
      body: "Closing SQL injection and XSS holes in older code, replacing hand-rolled authentication with maintained libraries, moving secrets out of the repository, and getting the dependency tree patched.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["PHP 8.3", "Laravel", "Symfony", "Composer", "PSR standards", "CodeIgniter"],
    },
    {
      name: "Data",
      items: ["MySQL", "PostgreSQL", "Redis", "Eloquent", "Doctrine", "Elasticsearch"],
    },
    {
      name: "Front End & API",
      items: ["Livewire", "Inertia.js", "Blade", "Twig", "REST", "GraphQL"],
    },
    {
      name: "Delivery",
      items: ["PHPUnit", "Pest", "PHPStan", "Docker", "GitHub Actions", "Nginx / FPM"],
    },
  ],
  faqs: [
    {
      q: "Our PHP application is old. Do we need to rewrite it?",
      a: "Usually not, and rewrites of working business systems fail far more often than they succeed — you spend a year rebuilding behaviour nobody documented, while the original keeps changing. The path we recommend is incremental: get onto a supported PHP version, add characterisation tests around the parts that must not break, introduce Composer and autoloading, and extract areas into testable services as you touch them for feature work. A rewrite is the right answer when the domain itself has fundamentally changed, and we will say so if that is what we find.",
    },
    {
      q: "Which PHP versions do you work with?",
      a: "PHP 8.1 through 8.3 for anything new. We work with 7.x codebases routinely because that is what a lot of production PHP still runs, and with 5.x where a migration is the point of the engagement. If you are on anything below 8.1 you are past end of security support, which is normally the argument that gets the upgrade funded — and the 7.4 to 8.x step is considerably smaller than most teams expect.",
    },
    {
      q: "Laravel or Symfony?",
      a: "Laravel for most product work: it is more productive, the ecosystem is larger, the documentation is better, and the hiring pool is deeper. Symfony when you need explicit control over configuration and component wiring, when you are in an enterprise with existing Symfony investment, or when the application's structure does not fit Laravel's conventions. Both are mature and well-maintained — this is a genuine choice rather than one being the correct answer.",
    },
    {
      q: "Is PHP still a reasonable choice for a new project?",
      a: "For content-driven sites, e-commerce, and conventional business applications, yes — PHP 8 with Laravel is fast to build in, cheap to host, and easy to hire for. Where we would point you elsewhere is real-time systems at high concurrency, heavy data or ML work, or anything needing long-lived in-process state, since PHP's request lifecycle is a poor fit for all three. The language is no longer a reason to rule it out; the workload might be.",
    },
  ],
};

const laravel: HireSkill = {
  slug: "hire-laravel-developer",
  key: "laravel",
  name: "Laravel",
  role: "Laravel Developers",
  metaTitle: "Hire Laravel Developers",
  metaDescription:
    "Hire Laravel developers from Soft Suave for SaaS platforms, APIs, and e-commerce backends. Eloquent, queues, and Livewire expertise. You interview, two-week trial.",
  serviceType: "Laravel development staffing",
  eyebrow: "Hire Laravel Developers",
  ctaLabel: "Hire Laravel developers",
  titleLines: ["Hire Laravel Developers", "Who Know the Framework Past the Surface"],
  heroBody: [
    "Laravel is the most productive way to build a conventional web application in PHP, and the gap between someone who has read the documentation and someone who has run a Laravel application in production is wide.",
    "It shows in the things that are not in a tutorial: queue reliability, Eloquent query behaviour under real data volumes, and the difference between a service container used properly and one used as a global registry.",
  ],
  heroPoints: [
    "Laravel 11 with queues, events and broadcasting",
    "Eloquent at volume, including the N+1 traps",
    "Livewire, Inertia and API-first architectures",
    "Multi-tenant SaaS and subscription billing",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-10.png",
    width: 1536,
    height: 1024,
    alt: "A Laravel SaaS application showing queued jobs, billing, and tenant separation",
  },
  requirementLabel: "What are you building in Laravel?",
  requirementPlaceholder:
    "The application, your Laravel version, whether it is multi-tenant, the front-end approach, and the seniority you need.",
  overviewTitle: "What Laravel Developers Actually Do for You",
  overviewParagraphs: [
    "Laravel supplies routing, an expressive ORM, queues, scheduling, events, broadcasting, authentication scaffolding, and a first-class testing layer, all with conventions that mean two Laravel codebases tend to look alike. For conventional web applications — SaaS products, marketplaces, internal platforms, e-commerce back ends — that is a very large productivity advantage.",
    "A Laravel engagement covers model and migration design, request validation and authorisation policies, queued jobs for anything slow, the front-end approach (Blade, Livewire, Inertia, or a separate SPA), and deployment with queue workers and the scheduler running reliably.",
    "The two things that separate experienced Laravel engineers are Eloquent behaviour at volume and queue reliability. Eloquent makes N+1 queries almost invisible until the data grows; queues look simple until a job fails halfway through and nothing is idempotent. Both are routine to get right and expensive to retrofit.",
  ],
  pullQuote:
    "Eloquent is a pleasure to write and entirely willing to issue four hundred queries for one page. Someone has to be watching.",
  capabilities: [
    {
      name: "SaaS Platforms",
      tag: "Product",
      body: "Multi-tenant applications with tenant isolation, subscription billing through Cashier and Stripe, usage metering, and the role and permission model these products need from the first release.",
    },
    {
      name: "API Development",
      tag: "API",
      body: "API-first applications with Sanctum or Passport authentication, resource transformers, rate limiting, versioning, and generated documentation — whether serving a SPA, a mobile app, or partners.",
    },
    {
      name: "Queues and Scheduling",
      tag: "Jobs",
      body: "Redis or SQS-backed queues with retry policy, idempotent handlers, dead-letter handling, and Horizon for visibility, so slow work leaves the request path without becoming invisible.",
    },
    {
      name: "Livewire and Inertia",
      tag: "Front end",
      body: "Interactive interfaces without a separate front-end application and build pipeline, where that trade is right — plus honest advice about when the product has outgrown it and needs a real SPA.",
    },
    {
      name: "Eloquent at Volume",
      tag: "Performance",
      body: "Eager loading, chunked processing, database-level aggregation, and indexing — the work that keeps a Laravel application responsive once the tables are measured in millions of rows.",
    },
    {
      name: "Upgrades and Maintenance",
      tag: "Maintenance",
      body: "Carrying applications forward across Laravel major versions, keeping first-party packages in step, and resolving the breaking changes each release introduces before they accumulate.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["Laravel 11", "PHP 8.3", "Eloquent", "Livewire", "Inertia.js", "Blade"],
    },
    {
      name: "Data & Queues",
      items: ["MySQL", "PostgreSQL", "Redis", "Horizon", "AWS SQS", "Meilisearch"],
    },
    {
      name: "Ecosystem",
      items: ["Sanctum", "Cashier / Stripe", "Nova", "Filament", "Scout", "Telescope"],
    },
    {
      name: "Delivery",
      items: ["Pest", "PHPUnit", "Laravel Forge", "Docker", "GitHub Actions", "Vite"],
    },
  ],
  faqs: [
    {
      q: "Can you build a multi-tenant SaaS on Laravel?",
      a: "Yes, and it is one of the things Laravel is best suited to. The key decision is the isolation model — a shared database with a tenant column, a schema per tenant, or a database per tenant — and it should be made before the first migration, because changing it later is genuinely expensive. Shared-with-a-column is right for most products; database-per-tenant is for strict data-residency or enterprise-isolation requirements. Billing through Cashier and Stripe is straightforward once that is settled.",
    },
    {
      q: "Livewire, Inertia, or a separate front end?",
      a: "Livewire when the interactivity is moderate and you want to stay in PHP with no separate build and deployment — it is remarkably productive for admin panels and CRUD-heavy applications. Inertia when you want React or Vue components without building a separate API. A fully separate SPA when the front end is complex enough to warrant its own team, or when a mobile app needs the same API. Products do outgrow Livewire, and we will tell you when yours has.",
    },
    {
      q: "How do you keep Laravel applications fast?",
      a: "Mostly by watching Eloquent. Eager loading to eliminate N+1 queries, chunking on large result sets rather than loading everything into memory, pushing aggregation into the database instead of collections, and adding indexes the query plan actually wants. After that: caching at the query and response layers, moving slow work to queues, and config and route caching in production. Telescope locally and a query log in staging surface almost all of it before users do.",
    },
    {
      q: "We are several Laravel versions behind. Is upgrading hard?",
      a: "Less than you would expect, because Laravel's upgrade guides are precise and most breaking changes are mechanical. The work is one major version at a time, with the test suite run at each step — which is also why an application with no tests is the harder case, and why we usually add characterisation tests around the critical paths first. Third-party packages that have stopped being maintained are the usual real obstacle, and we audit those before agreeing a date.",
    },
  ],
};

const dotnet: HireSkill = {
  slug: "hire-dot-net-developers",
  key: "dotnet",
  name: ".NET",
  role: ".NET Developers",
  metaTitle: "Hire .NET Developers",
  metaDescription:
    "Hire .NET developers from Soft Suave for ASP.NET Core services, Azure workloads, and .NET Framework migration. You interview, two-week trial, full IP ownership.",
  serviceType: ".NET development staffing",
  eyebrow: "Hire .NET Developers",
  ctaLabel: "Hire .NET developers",
  titleLines: ["Hire .NET Developers", "For Enterprise Systems on Modern .NET"],
  heroBody: [
    "Modern .NET is cross-platform, genuinely fast, and one of the strongest choices available for enterprise back ends. It is also, in most organisations, running alongside .NET Framework applications that predate all of that.",
    "Our .NET engineers work across both: ASP.NET Core services on .NET 8 in containers, and the careful migration work that gets a Framework application off Windows-only hosting without pausing the business.",
  ],
  heroPoints: [
    ".NET 8 and ASP.NET Core, containerised",
    "Entity Framework Core with real query awareness",
    ".NET Framework to .NET migration",
    "Azure-native services and deployment",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/svc-modernization.webp",
    width: 1200,
    height: 860,
    alt: "An enterprise .NET estate showing modern services alongside legacy Framework applications",
  },
  requirementLabel: "What are you building in .NET?",
  requirementPlaceholder:
    "The systems involved, your .NET version, whether migration from Framework is in scope, and the seniority you need.",
  overviewTitle: "What .NET Developers Actually Do for You",
  overviewParagraphs: [
    "The .NET platform changed fundamentally with .NET Core and the unified .NET 5 onwards: it runs on Linux, deploys in containers, and performs at a level that puts it among the fastest managed runtimes available. C# has meanwhile absorbed records, pattern matching, and nullable reference types, which remove a significant class of runtime error at compile time.",
    "A .NET engagement typically covers ASP.NET Core web APIs, Entity Framework Core data access, authentication and authorisation, background services, and deployment — usually to Azure, though nothing about modern .NET requires it. On existing estates it frequently also covers migration.",
    "That migration is the defining .NET question in most organisations. .NET Framework is supported but no longer developed, and applications on it are tied to Windows hosting, cannot use current libraries, and are progressively harder to hire for. Moving them is real work, and it is incremental work — not a weekend port.",
  ],
  pullQuote:
    ".NET Framework will keep running for years. It just will not get any faster, cheaper, or easier to hire for.",
  capabilities: [
    {
      name: "ASP.NET Core APIs",
      tag: "API",
      body: "Web APIs and minimal APIs with dependency injection, middleware pipelines, validation, OpenAPI generation, and structured configuration — deployed in Linux containers rather than tied to IIS.",
    },
    {
      name: "Framework Migration",
      tag: "Migration",
      body: "Moving .NET Framework applications to modern .NET, project by project, with the dependency analysis and the System.Web replacements planned before the work starts rather than discovered during it.",
    },
    {
      name: "Entity Framework Core",
      tag: "Data",
      body: "Data access with attention to the SQL actually generated, tracking behaviour chosen deliberately, reviewed migrations, and raw SQL or Dapper where EF's abstraction costs more than it returns.",
    },
    {
      name: "Azure Workloads",
      tag: "Cloud",
      body: "App Service, Functions, Service Bus, Cosmos DB, and Azure SQL, with infrastructure defined as code and identity handled through managed identities rather than connection strings in configuration.",
    },
    {
      name: "Microservices",
      tag: "Architecture",
      body: "Service decomposition with gRPC or message-based integration, resilience through Polly, health checks, and distributed tracing — plus a frank view on whether decomposition is warranted at all.",
    },
    {
      name: "Blazor Applications",
      tag: "Front end",
      body: "Server and WebAssembly Blazor for teams who would rather write C# than JavaScript across the stack, with honest advice about where that trade holds and where it does not.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: [".NET 8", "C# 12", "ASP.NET Core", "Blazor", "Minimal APIs", ".NET Framework 4.8"],
    },
    {
      name: "Data",
      items: ["SQL Server", "PostgreSQL", "EF Core", "Dapper", "Azure SQL", "Cosmos DB"],
    },
    {
      name: "Cloud & Messaging",
      items: ["Azure", "AWS", "Service Bus", "RabbitMQ", "SignalR", "Redis"],
    },
    {
      name: "Delivery",
      items: ["xUnit", "Docker", "Kubernetes", "Azure DevOps", "GitHub Actions", "Serilog"],
    },
  ],
  faqs: [
    {
      q: "Can you migrate our .NET Framework application to .NET 8?",
      a: "Yes, and it is a large share of the .NET work we do. The approach starts with the .NET Upgrade Assistant and a dependency analysis, because the blockers are almost always third-party libraries with no modern equivalent rather than your own code. Web Forms applications are the hard case — there is no direct path, so those become a rewrite of the presentation layer onto Razor Pages, MVC, or Blazor. Class libraries and MVC applications usually port with moderate effort, and we sequence it so the business keeps running.",
    },
    {
      q: "Do your .NET developers work with Azure?",
      a: "Most of them, day to day — App Service, Functions, Service Bus, Azure SQL, Key Vault, and Entra ID, with infrastructure defined in Bicep or Terraform. We also have engineers who run .NET on AWS and on Kubernetes, since modern .NET has no dependency on Azure at all. Tell us your target platform on the first call and the shortlist will reflect it rather than assuming Microsoft's own stack.",
    },
    {
      q: "Entity Framework Core or Dapper?",
      a: "EF Core for most application data access: the productivity gain is real, migrations are well handled, and the generated SQL is good enough in the overwhelming majority of cases. Dapper for hot paths where you want exact control over the query, and for reporting or bulk work where EF's change tracking is pure overhead. They coexist happily in one codebase, and using both deliberately is more common in our work than picking one exclusively.",
    },
    {
      q: "Is Blazor ready for production?",
      a: "Blazor Server is mature and works well for internal line-of-business applications, with the caveat that it needs a persistent connection and degrades noticeably over poor networks. Blazor WebAssembly has a meaningful initial download and slower startup, which matters for public-facing applications and matters much less for an internal tool behind a login. For a team that is strong in C# and has no front-end specialists, it is a reasonable trade; for a public consumer product, we would usually still recommend a JavaScript framework.",
    },
  ],
};

const rails: HireSkill = {
  slug: "hire-ruby-on-rails-developer",
  key: "rails",
  name: "Ruby on Rails",
  role: "Ruby on Rails Developers",
  metaTitle: "Hire Ruby on Rails Developers",
  metaDescription:
    "Hire Ruby on Rails developers from Soft Suave for rapid product delivery, Rails upgrades, and legacy rescue work. You interview, two-week trial, full IP ownership.",
  serviceType: "Ruby on Rails development staffing",
  eyebrow: "Hire Rails Developers",
  ctaLabel: "Hire Rails developers",
  titleLines: ["Hire Ruby on Rails Developers", "Who Still Get Products Shipped Fast"],
  heroBody: [
    "Rails remains one of the fastest routes from an idea to a working, revenue-generating product. Its conventions remove a very large number of decisions, and for a small team that is worth more than any individual framework feature.",
    "Much of the Rails work we are asked to do now is on applications built years ago that need upgrading, untangling, or simply maintaining by people who know the framework properly. Our engineers do both.",
  ],
  heroPoints: [
    "Rails 7 with Hotwire, Turbo and Stimulus",
    "Rails upgrades from 4 and 5 onwards",
    "Active Record performance at real data volumes",
    "Sidekiq background processing and scheduling",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-7.png",
    width: 1536,
    height: 1024,
    alt: "A Ruby on Rails application showing convention-driven structure and background processing",
  },
  requirementLabel: "What are you building in Rails?",
  requirementPlaceholder:
    "The application, your Rails and Ruby versions, whether an upgrade is involved, and the seniority you need.",
  overviewTitle: "What Ruby on Rails Developers Actually Do for You",
  overviewParagraphs: [
    "Rails is built on the premise that most web applications are more alike than different, so the framework should make the common decisions for you. Directory structure, naming, database access, migrations, background jobs, and testing all have one accepted answer, and a Rails developer joining a Rails codebase already knows where everything is.",
    "That convention is why Rails is still exceptionally fast for product delivery, particularly for the first year of a product's life when the requirement is changing weekly. With Hotwire, a great deal of interactivity is also achievable without a separate front-end application at all.",
    "The counterpart is that Rails applications age in a characteristic way: business logic accumulates in models and controllers, the test suite slows, and the gem dependencies fall behind until upgrading becomes daunting. Most of the Rails work we take on now is on applications in exactly that state, and it is very recoverable.",
  ],
  pullQuote:
    "A Rails application rarely fails because of Rails. It fails because nobody upgraded it for four years.",
  capabilities: [
    {
      name: "Product Development",
      tag: "Build",
      body: "Going from specification to a deployed product quickly, using Rails conventions rather than fighting them — the case the framework was designed for and is still very hard to beat at.",
    },
    {
      name: "Rails Upgrades",
      tag: "Upgrade",
      body: "Moving applications forward one minor version at a time with a working test suite at each step, plus the gem audit that determines how much of the work is genuinely yours and how much is dependencies.",
    },
    {
      name: "Hotwire Interfaces",
      tag: "Front end",
      body: "Turbo Drive, Turbo Frames, Turbo Streams, and Stimulus for interactive interfaces without a separate SPA — and a frank assessment of when the product has outgrown that approach.",
    },
    {
      name: "Active Record Performance",
      tag: "Performance",
      body: "Eliminating N+1 queries with includes, adding the indexes the query plan wants, batching large operations, and moving aggregation into SQL rather than into Ruby memory.",
    },
    {
      name: "Background Processing",
      tag: "Jobs",
      body: "Sidekiq and Active Job for email, imports, reporting, and scheduled work, with idempotent jobs, sensible retry policy, and monitoring so a failing nightly job is noticed the same day.",
    },
    {
      name: "Legacy Rescue",
      tag: "Recovery",
      body: "Taking on applications with no active maintainer — restoring the build, getting the test suite green, upgrading Ruby and Rails, and documenting enough that the next engineer is not starting over.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["Ruby 3.3", "Rails 7", "Hotwire / Turbo", "Stimulus", "Active Record", "Action Cable"],
    },
    {
      name: "Data & Jobs",
      items: ["PostgreSQL", "MySQL", "Redis", "Sidekiq", "Elasticsearch", "Active Storage"],
    },
    {
      name: "Ecosystem",
      items: ["Devise", "Pundit", "GraphQL Ruby", "Grape", "Kaminari", "Stripe"],
    },
    {
      name: "Delivery",
      items: ["RSpec", "Capybara", "FactoryBot", "Docker", "Heroku / AWS", "GitHub Actions"],
    },
  ],
  faqs: [
    {
      q: "Is Ruby on Rails still a good choice in 2026?",
      a: "For conventional web applications — SaaS products, marketplaces, internal platforms — yes. Rails is actively developed, Ruby 3 is substantially faster than Ruby 2, and no framework has clearly displaced it for speed of delivery on a small team. The genuine reasons to look elsewhere are heavy computation, very high-concurrency real-time systems, and hiring depth in some markets. The reputational quiet around Rails is not the same as decline.",
    },
    {
      q: "Can you upgrade our old Rails application?",
      a: "Yes, and it is a large part of our Rails work. The sequence is one minor version at a time with the test suite green before each step — skipping versions turns a mechanical upgrade into an archaeology exercise. The first task is usually getting the existing suite running at all, and where coverage is thin we add characterisation tests around the critical paths first. Unmaintained gems are the usual real blocker, and we audit those before committing to a timeline.",
    },
    {
      q: "Should we use Hotwire or a JavaScript front end?",
      a: "Hotwire when the interactivity is form-driven and page-oriented, which covers a surprising amount of business software — you keep one application, one deployment, and one language. A separate React or Vue front end when the interface is genuinely application-like, when you need offline behaviour, or when a mobile app will consume the same API. Starting with Hotwire and extracting later is a reasonable strategy; starting with a SPA you do not yet need is a common and expensive mistake.",
    },
    {
      q: "How do you handle Rails performance at scale?",
      a: "Active Record first, because that is where the problems overwhelmingly are: N+1 queries, unbounded result sets loaded into memory, and missing indexes. Then caching — fragment and Russian-doll caching are genuinely effective in Rails and often under-used. Then background jobs for anything slow in the request path, and connection-pool and worker sizing. Puma configuration and Ruby GC tuning matter far less than the query log, so they come last rather than first.",
    },
  ],
};

export const backendHireSkills: readonly HireSkill[] = [
  node,
  nestjs,
  java,
  python,
  django,
  php,
  laravel,
  dotnet,
  rails,
];
