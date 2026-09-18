/**
 * Server-side and language hire pages: Node.js, NestJS, Java, Python, Django,
 * PHP, Laravel, .NET and Ruby on Rails.
 *
 * Every string is its live softsuave.com page's own copy, and `order` is the
 * sequence that page's `<section>` elements run in. Three distinct sequences
 * live in this one file, which is exactly why `order` is per page:
 *
 * - Java, Python, PHP and .NET run the older layout — prose, services, a rate
 *   band, four steps, why-hire cards, then the link grid.
 * - Node opens on the applications it builds and reaches its steps last, after
 *   a comparison table; NestJS runs a similar shape and publishes no FAQ at all.
 * - Django, Laravel and Rails run the newer layout — a client band, why-hire
 *   cards, the hiring steps *second*, then technical expertise, services and a
 *   vetting sequence.
 *
 * Live authoring slips are reproduced, not corrected (see `hire-blocks.ts`).
 * Two are worth knowing about: the Laravel page's technical-expertise band
 * opens on mobile groups (Flutter, Swift, Xcode), and the Rails page's why-hire
 * cards and hiring steps mention Drupal. Both are on the live pages today.
 */

import type { HireSkill } from "./hire-skill";
import { sharedHeroAlert } from "./delivery-shared";
import { webExplore } from "./hire-explore";
import { partnerTable } from "./hire-comparison";
import { MERN_STEPS, MERN_WHY, CURATED_STEPS } from "./hire-blocks";

/** The older pages' shared running order, oldest layout first. */
const CLASSIC_ORDER = [
  "overview",
  "services",
  "midCta",
  "process",
  "whyUs",
  "exploreMore",
  "testimonials",
  "faq",
] as const;

/** The newer pages' running order — client band first, steps second. */
const MODERN_ORDER = [
  "clients",
  "whyUs",
  "process",
  "techStack",
  "services",
  "vetting",
  "comparison",
  "exploreMore",
  "testimonials",
  "faq",
] as const;

/** The vetting band's four stages, as each newer page words them. */
const VETTING_NAMES = [
  "Rigorous talent sourcing",
  "In-depth skill assessment",
  "Thinkers & Innovators",
  "Cultural fit & adaptability",
] as const;

const vetting = (bodies: readonly [string, string, string, string]) =>
  VETTING_NAMES.map((name, i) => ({ n: `0${i + 1}`, name, body: bodies[i] }));

const nodejs: HireSkill = {
  slug: "hire-nodejs-developers",
  key: "nodejs",
  name: "Node.js",
  role: "Node.js Developers",
  metaTitle: "Hire NodeJS Developers India | 150+ Clients",
  metaDescription:
    "Hire dedicated Node.js developers for scalable APIs and backend systems. Onboard in 48 hours with a 40-hour risk-free trial. Rates from $14/hr.",
  serviceType: "Node.js development staffing",
  ctaLabel: "Hire Node.js developers",

  order: [
    "applications",
    "combinations",
    "services",
    "midCta",
    "techStack",
    "whyUs",
    "comparison",
    "process",
    "exploreMore",
    "testimonials",
    "faq",
  ],

  hero: {
    titleLines: ["Hire Node.js Developers", "In India"],
    body: [
      "Soft Suave provides pre-vetted Node.js developers experienced in Express.js, NestJS, MongoDB, and scalable backend systems, matched to your project within 48 hours. Every engagement starts with a 40-hour risk-free trial, with rates from $14/hour and no long-term contract required until you're satisfied.",
      "Here is how Soft Suave engineers your Node.js success.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Node.js Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Node.js requirement.",
      subject: "Node.js Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/svc-custom-software.webp",
      width: 1200,
      height: 860,
      alt: "A Node.js service architecture showing APIs, queues, and connected data stores",
    },
  },

  applications: {
    eyebrow: "What We Build",
    title: "Applications That Our Developers Build Using NodeJS",
    body: "Build and utilize various high-performance web applications with our developer's expertise",
    items: [
      {
        name: "Web Applications",
        body: "We develop web apps with NodeJS, ensuring smooth experiences across devices. From e-commerce sites to social networks, our developers use NodeJS for high-performance web solutions tailored to your needs.",
      },
      {
        name: "API Development",
        body: "You can hire our NodeJS developer to build scalable APIs with NodeJS for seamless application integration and communication. Whether it's connecting services or enabling real-time interactions, our API development ensures smooth connectivity.",
      },
      {
        name: "Real-time Applications",
        body: "We specialize in real-time apps using NodeJS for instant user communication. From chat apps to live streaming, our developers create high-performance solutions that meet user demands.",
      },
      {
        name: "Network Applications",
        body: "Our developers use NodeJS for efficient data transmission in network apps. From file sharing to multiplayer games, we utilize NodeJS and its event-driven architecture to create scalable apps.",
      },
      {
        name: "Data Streaming Applications",
        body: "As one of the top NodeJS development companies, we develop data streaming apps with NodeJS for real-time data processing. Whether it's video streaming or financial analysis, our developers ensure seamless data streaming and processing.",
      },
      {
        name: "IoT Applications",
        body: "We enable IoT connectivity with NodeJS. From smart homes to industrial monitoring, our developers utilize NodeJS and its lightweight nature to create scalable IoT solutions.",
      },
      {
        name: "Single-page Applications (SPAs)",
        body: "We build fast SPAs using NodeJS for quick loading times. From portfolios to dashboards, our developers utilize NodeJS and its asynchronous programming functionality to ensure smooth user experiences.",
      },
      {
        name: "Social & Interactive Apps",
        body: "We create engaging social apps with NodeJS for real-time interactions. Whether it's social networks or multiplayer games, our developers use NodeJS to build interactive experiences.",
      },
      {
        name: "Multimedia Apps",
        body: "We develop multimedia apps with NodeJS for efficient processing. From media streaming to video editing, our developers ensure high-performance solutions with NodeJS.",
      },
      {
        name: "Real-time Collaboration Tools",
        body: "We build collaboration tools with NodeJS for seamless teamwork. Whether it's project management or document editing, our developers use NodeJS to enable real-time collaboration.",
      },
    ],
  },

  combinations: {
    eyebrow: "Tech Combinations",
    title: "Tech Combinations Our Developers Use",
    body: "Technology Combinations our developers use to develop high-performing and scalable NodeJS apps",
    items: [
      {
        name: "NodeJS + ReactJS",
        body: "We combine NodeJS's powerful backend for scalability with ReactJS's dynamic and user-friendly front-end development. This duo ensures a seamless user experience and efficient data handling.",
      },
      {
        name: "NodeJS + AngularJS",
        body: "Our developers can leverage NodeJS on the backend for security and scalability while utilizing AngularJS's well-defined framework for building feature-rich web applications.",
      },
      {
        name: "NodeJS + VueJS",
        body: "NodeJS provides a robust backend, while VueJS's versatility and ease of use allow for the rapid development of interactive web interfaces within a NodeJS environment.",
      },
      {
        name: "NodeJS + ExpressJS",
        body: "Our developers utilize this combination to build fast APIs, and they use NodeJS for scalability and ExpressJS for simplified development.",
      },
      {
        name: "NodeJS + Koa",
        body: "Koa's lightweight nature allows for detailed control over the application logic, perfect for building complex and tailored APIs alongside the scalability of NodeJS.",
      },
      {
        name: "NodeJS + NestJS",
        body: "NestJS is a framework for building efficient and scalable server-side applications. Together with NodeJS, it utilizes JavaScript's versatility to create robust backend solutions.",
      },
    ],
  },

  services: {
    eyebrow: "Why NodeJS",
    title: "Why We Recommend NodeJS for Building Web Applications?",
    body: "With a diverse set of tools out there for building web applications, why should you choose NodeJS?",
    items: [
      {
        name: "Handles Traffic Spikes",
        body: "NodeJS lets your web app handle massive user surges without crashing. It scales smoothly, keeping things fast and responsive as your user base grows.",
      },
      {
        name: "Real-Time Features",
        body: "Want instant chat or live editing? NodeJS lets us build them! This keeps users engaged and productive.",
      },
      {
        name: "Streams Data Smoothly",
        body: "Apps usually deal with constant data flow, like in live video. NodeJS excels at handling this data for uninterrupted processing, so hire a NodeJS developer and procure quality solutions.",
      },
      {
        name: "Easy API Creation",
        body: "NodeJS simplifies building APIs, the messengers between different parts of your app. This allows for seamless data exchange.",
      },
      {
        name: "Faster Development",
        body: "NodeJS allows for quicker development by handling multiple requests at once. Get your app launched faster!",
      },
      {
        name: "Perfect for SPAs",
        body: "NodeJS is great for building Single-Page Applications (SPAs), web apps that load everything on one page. We handle the backend for a smooth user experience.",
      },
    ],
  },

  midCta: {
    title: "Looking for offshore NodeJS developers?",
    body: "Soft Suave offers a team of experts to fit your needs. Get a free 7-day trial today!",
    cta: { label: "Request Rate Card", href: "#enquiry" },
  },

  techStack: {
    eyebrow: "Technology",
    title: "Tech Stack - Our Developer's Skillset",
    body: "Discover our developers' proficiency across a wide range of frameworks, libraries, databases, and tools, ensuring top-notch solutions for your projects",
    groups: [
      {
        name: "Frameworks",
        items: ["Express.js", "Hapi.js", "Nest.js", "Total.js", "Koa.js", "Loopback.js"],
      },
      {
        name: "Libraries",
        items: [
          "Node cron",
          "Passport",
          "Lodash",
          "PM2",
          "Nodemailer",
          "Babel",
          "Unload",
          "Webpack",
          "Feathers.io",
          "Axios",
        ],
      },
      { name: "Databases", items: ["Redis", "Firebase", "MongoDB", "PostgreSQL", "MySQL"] },
      { name: "ORM", items: ["Typeform", "Mongoose", "Sequelize"] },
    ],
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Hire NodeJS Developer From Soft Suave?",
    body: "Using the skills of dedicated NodeJS developers in India can be highly beneficial for your web application needs. Let us tell you why",
    items: [
      {
        name: "13+ Years of Average Experience",
        body: "Our seasoned NodeJS developers make use of their in-depth knowledge to deliver exceptional applications, on time, every time.",
        icon: "book",
      },
      {
        name: "Defined Talent Screening",
        body: "We thoroughly vet candidates and select only the most skilled NodeJS developers to ensure your project's success.",
        icon: "users",
      },
      {
        name: "NodeJS Development",
        body: "Our agile approach keeps you informed throughout the NodeJS development process, with flexible engagement models and time zone adjustments for a smooth experience.",
        icon: "gauge",
      },
    ],
  },

  comparison: partnerTable("Choose the Right NodeJS Development Partner"),

  process: {
    eyebrow: "Hiring Process",
    title: "The 4-step NodeJS Developer Hiring Process",
    body: "Onboarding developers has never been easier. With this simple 4-step process, find the resource who is the perfect fit for your team!",
    steps: CURATED_STEPS,
  },

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "How much does it cost to hire a Node.js developer from Soft Suave?",
        a: "Rates start from $14/hour, below the $25/hour median rate for Node.js developers on Upwork ($18–$38/hr typical range). Every engagement starts with a 40-hour risk-free trial before any monthly commitment.",
      },
      {
        q: "Is there a free trial period available?",
        a: "Yes — every engagement starts with a 40-hour risk-free trial so you can evaluate real work before committing.",
      },
      {
        q: "How do I test your Node.js developer's expertise?",
        a: "Through technical interviews on core Node.js concepts, code review of past work, and portfolio analysis of relevant experience.",
      },
      {
        q: "Do you provide an NDA for my project?",
        a: "Absolutely. Soft Suave prioritizes confidentiality — we sign a standard non-disclosure agreement (NDA) before starting any project to protect your intellectual property.",
      },
      {
        q: "Will I have full ownership of my source code?",
        a: "Yes, absolutely. The intellectual property rights, including the source code, belong entirely to you upon project completion.",
      },
      {
        q: "What happens if I want to change developers mid-project?",
        a: "You can request a replacement developer at no extra cost during or after the trial period, re-matched based on your feedback.",
      },
      {
        q: "How long do you offer post-launch support and maintenance?",
        a: "We provide ongoing post-launch support and maintenance to keep your application running smoothly, with terms scoped to your specific project.",
      },
      {
        q: "How do I track the development progress of my Node.js project?",
        a: "Soft Suave prioritizes transparency — we use project management tools to give you real-time visibility into progress.",
      },
    ],
  },
};

const nestjs: HireSkill = {
  slug: "hire-nestjs-developers",
  key: "nestjs",
  name: "NestJS",
  role: "NestJS Developers",
  metaTitle: "Hire NestJS Developers | 7-Day Risk-Free Trial",
  metaDescription:
    "Hire NestJS developers from Soft Suave without long hiring cycles. Vetted experts from $14/hr, ready to build scalable applications with flexible engagement.",
  serviceType: "NestJS development staffing",
  ctaLabel: "Hire NestJS developers",

  /** No `faq`: the live NestJS page publishes none, and closes on its stories. */
  order: [
    "overview",
    "services",
    "midCta",
    "comparison",
    "process",
    "exploreMore",
    "testimonials",
  ],

  hero: {
    titleLines: ["Hire Remote NestJS Developers", "in India on Contract"],
    body: [
      "Hire NestJS developers from Soft Suave without long hiring cycles. As a specialized development agency, we deliver vetted experts starting at $14/hr, ready to build scalable applications fast while ensuring flexibility, strong quality standards, and complete project control.",
      "Skip hiring delays. Start building with NestJS experts today.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top NestJS Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your NestJS requirement.",
      subject: "NestJS Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/work-5.webp",
      width: 1200,
      height: 860,
      alt: "A modular TypeScript service architecture with clearly separated layers",
    },
  },

  overview: {
    eyebrow: "Overview",
    title: "What Nest.js Developers do and How they can benefit a project",
    paragraphs: [
      "Nest.js developers focus on building secure and scalable server-side applications, utilizing the Nest.js framework to enhance the capabilities of Node.js.",
      "Nest.js is a highly scalable and strong JavaScript framework built on Node.js to create efficient server-side applications. It's an open-source platform designed for future-ready enterprise projects. Hiring Nest.js developers can free you from the challenges of handling coding structure, dependency management, testing, microservices, web sockets, routing, and other important parts of your application.",
    ],
  },

  services: {
    eyebrow: "Services",
    title: "NestJS Development Services We Provide",
    body: "Our team of experts excels in building reliable, efficient, and scalable web applications with NestJS. We prioritize delivering high-quality results and a seamless user experience, backed by exceptional development services.",
    items: [
      {
        name: "NestJS Web Development",
        body: "Soft Suave's NodeJS developers utilize a variety of tools and plugins from the NodeJS ecosystem to create scalable and efficient server-side applications.",
      },
      {
        name: "NestJS eCommerce",
        body: "Elevate the backend of your online store by hiring NestJS developers who excel at leveraging its powerful architecture.",
      },
      {
        name: "NestJS Backend Development",
        body: "By combining the progressive NestJS server-side framework with TypeScript expertise, our development team delivers clean, efficient, and bug-free backend APIs.",
      },
      {
        name: "NestJS Custom Development",
        body: "Leveraging the strengths of JavaScript, TypeScript, Node, and Express, we deliver customized solutions that are both efficient and reliable, tailored to meet your specific needs.",
      },
      {
        name: "App Architecture Development",
        body: "Looking to build innovative application architecture with the versatile NestJS? Let us show you how we can deliver testable, scalable, and efficient solutions tailored to your needs.",
      },
      {
        name: "NestJS Maintenance & Support",
        body: "We understand common modification patterns in the framework, allowing us to support you with reliable technical maintenance solutions.",
      },
    ],
  },

  midCta: {
    title: "Are you ready to take your backend development to the next level?",
    body: "Partner with Soft Suave to hire dedicated NestJS developers and gain scalable, secure, and high-performing applications tailored to your needs.",
    cta: { label: "Request Rate Card", href: "#enquiry" },
  },

  comparison: partnerTable("Choose the Right NestJS Development Partner"),

  process: {
    eyebrow: "Hiring Process",
    title: "How to Hire NestJS Developers from Soft Suave",
    body: "Onboarding developers has never been easier. With this simple 4-step process, find the resource who is the perfect fit for your team!",
    steps: CURATED_STEPS,
  },

  exploreMore: webExplore,
};

const java: HireSkill = {
  slug: "hire-java-developers",
  key: "java",
  name: "Java",
  role: "Java Developers",
  metaTitle: "Hire Java Developers India | 40-Hour Trial",
  metaDescription:
    "Hire pre-vetted Java developers from India without long hiring delays. Experts in Spring Boot, Hibernate, microservices, REST APIs, AWS and enterprise apps.",
  serviceType: "Java development staffing",
  ctaLabel: "Hire Java developers",

  order: [...CLASSIC_ORDER],

  hero: {
    titleLines: ["Hire Java Developers", "in India on Contract"],
    body: [
      "Soft Suave provides pre-vetted Java developers from India without long hiring delays. Hire experts in Spring Boot, Hibernate, microservices, REST APIs, AWS, and enterprise application development – contract-ready and fast to onboard.",
      "See why businesses choose Soft Suave for Java hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Java Developers in India",
      "Time-Zone & Language-Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Java requirement.",
      subject: "Java Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/work-3.webp",
      width: 1200,
      height: 860,
      alt: "An enterprise Java service estate with layered architecture and integration points",
    },
  },

  overview: {
    eyebrow: "Overview",
    title: "Hire Top-notch Remote Java Developers from Soft Suave",
    paragraphs: [
      "Flexibility, scalability, and cost-effectiveness are guaranteed when you hire Java developers from us.",
      "Soft Suave is the most trusted company to hire Java developers in India. We are reputed to deliver fast and streamlined web app development services at an economical cost. Hire Java programmers from us to stay up to date with trending frameworks, tools, technologies and to build robust applications at your desired budget. Our Java experts have in-depth knowledge and go beyond their duty to provide comprehensive Java solutions. Our developers are counted among the top Java developers in India that build high quality and successful apps for clients around the world.",
      "Our Java developer's domain-specific experience help us to provide optimum programming solutions. Hire Java developers from us who are committed to the client's business goals and act as an extended development team that saves cost and time.",
      "Full-stack Java developers from Soft Suave offer advanced Java solutions that allow clients to expand their business swiftly. When you hire Java developer from us, you get developers that can deal with any complex requirement. Moreover, they do not shy away from challenges but go the extra mile to deliver quality-focused Java solutions. The expertise and experience in various industry verticals is an added advantage when you hire the best Java experts in India from us.",
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Soft Suave's Java Development Services",
    body: "Our highly skilled Java developers have a separate client base all around the world for their revolutionary solutions.",
    items: [
      {
        name: "Java Web Development",
        body: "Our dedicated Java experts are committed to offering secure and reliable Java web development with the latest tools and cutting-edge technologies. Our expert Java engineers are prompt in delivering innovative web solutions at an affordable cost.",
      },
      {
        name: "API & Web Service Integration",
        body: "Java experts at Soft Suave are capable of developing astounding APIs and integrating them into different software applications. They also build successful custom API for clients based on their business requirement.",
      },
      {
        name: "Java-based eCommerce Development",
        body: "Hire our Java developers to develop innovative Java-based eCommerce applications that steer your business towards success and growth. Moreover, our developers hold excellent domain expertise in developing eCommerce apps that are secure and user-friendly.",
      },
      {
        name: "Java-based CMS Development",
        body: "Our team of skilled Java developers build Java-based CMS swiftly without any data leaks. They elevate the development by making sure CMS is feature-packed with innovative and secure features.",
      },
      {
        name: "Java Module Development",
        body: "Hire dedicated Java developers for developing user-friendly modules that facilitate the quick development of enterprise-level applications. The developers have 10+ years on average of hands-on experience in Java that allows them to offer hassle-free module development.",
      },
      {
        name: "Support & Maintenance",
        body: "When you hire expert Java developers from Soft Suave, you get high-quality support services that enable app stability and assures bug-free application. Moreover, our developers are well-versed to offer full-maintenance service and optimize your business simultaneously at a competitive cost.",
      },
    ],
  },

  midCta: {
    title: "Hire Java Developers Starting from $14/hour",
    body: "We will provide you with remote Java developers that work from India. Contact us to take a look at CVs.",
    cta: { label: "Request Rate Card", href: "#enquiry" },
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Hire Java Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: MERN_STEPS,
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Are Our Java Developers Considered the Best?",
    body: "We have dedicated Java developers with exceptional technical knowledge to deliver secure Java solutions.",
    items: MERN_WHY,
  },

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "How to select an offshore development team for Java projects in India?",
        a: "It is advisable to select a Java developer or a dedicated team from mid-scale app development companies that have 5-10 years of experience in app development and have an excellent client base worldwide. It is also necessary to check testimonials and portfolios to decide on the best offshore Java development team. Soft Suave is a mid-scale Java development company that assures quality Java development under your budget.",
      },
      {
        q: "Why shall I hire Java Developers from Soft Suave?",
        a: "When you hire Java app developers from us, you are assured of getting premium Java development services at your budget. Moreover, our developers have 5+ years on average experience to give you a competitive edge in the app development market.",
      },
      {
        q: "How do I test your Java developer's expertise?",
        a: "Hire on-demand Java developers from Soft Suave by testing their technology expertise and hands-on industry experience. Moreover, to understand the expertise of our team, our developers are open for one-to-one interviews and a week's man-hour of test project.",
      },
      {
        q: "Can I hire a Java developer for an hourly or project-based task?",
        a: "Our dedicated developers are committed to your business goals and stay proactive in offering successful Java app development solutions. Moreover, they are flexible to overlap time zones to receive tasks and feedback from you directly.",
      },
      {
        q: "What are the various hiring models offered by you to hire Java developers?",
        a: [
          "Soft Suave has curated three client-friendly hiring models to help you hire dedicated Java developers from us. We also prefer customizing plans according to your budget",
          "Full-time basis",
          "Part-time basis",
          "Milestone basis",
        ],
      },
    ],
  },
};

const python: HireSkill = {
  slug: "hire-python-developers",
  key: "python",
  name: "Python",
  role: "Python Developers",
  metaTitle: "Hire Offshore Python Developers from India",
  metaDescription:
    "Hire skilled Python developers from India, ready to join quickly. Experts in Django, Flask, FastAPI, AI/ML, automation and data engineering.",
  serviceType: "Python development staffing",
  ctaLabel: "Hire Python developers",

  order: [...CLASSIC_ORDER],

  hero: {
    titleLines: ["Hire Python Developers", "in India On Contract"],
    body: [
      "Soft Suave offers skilled Python developers from India ready to join quickly. Hire experts in Django, Flask, FastAPI, AI/ML, automation, data engineering, and backend development – pre-vetted and deployment-ready.",
      "See why businesses choose Soft Suave for Python hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Python Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Python requirement.",
      subject: "Python Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/work-9.png",
      width: 1200,
      height: 860,
      alt: "A Python system spanning API services, data pipelines, and model serving",
    },
  },

  overview: {
    eyebrow: "Overview",
    title: "Multiskilled Team of Dedicated Python Developers",
    paragraphs: [
      "Leverage the expertise of our experienced Python developers to build technology-rich Apps.",
      "Do you need a skilled remote Python developer to develop a top-notch web application? or do you want to transform/improve your existing app effortlessly? Hire Python developers from us who have in-depth knowledge and expertise working with the programming language. Also, they have the capacity to work with any complex development projects and bring in desired results.",
      "Our developers build intuitive applications as they are experts in development tools & frameworks including Django, Turbogears, Pylons, Web2py, Flask, and Pyramid. And, our Python web developer's unique specialty is building powerful apps with seamless & complex functionalities that improve client's business efficiency and offer engaging user experience.",
      "Our developer's competency in working with Python language helps us to execute complicated tasks with a few lines of code. This will be greatly convenient to maintain the application effectively after successful deployment in the market. Develop feature-packed, scalable, customizable, and responsive web apps by partnering with our trusted Python app development team who has 13+ years of experience. Also, our simple yet efficient app constructing methods assist us to reduce up to 60% development cost which is loved by many start-ups and SMBs.",
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Our Top-grade Python Development Services",
    body: "Soft Suave provides the most reliable Python app developers who can help businesses to accomplish 10X growth effortlessly.",
    items: [
      {
        name: "Python Web Application",
        body: "Our top dedicated python programmers have hands-on experience to build highly scalable, secure, and performing web apps. They analyze the client's business in and out to deliver custom apps that fit the business characteristics and increases brand reputation.",
      },
      {
        name: "Dedicated Python Developers",
        body: "Hiring offshore Python developers helps in building the best apps for global businesses. Also, our strong development process integrates the latest technology to deliver feature-rich and rewarding the solutions in the market.",
      },
      {
        name: "Migration & Integration Services",
        body: "Our offshore developers help you migrate your existing Apps to Python smoothly without losing any data. They also complete the integration process hassle-free in no time at an affordable cost. Also, you can expect a secure, smooth, and seamless integration and migration service.",
      },
      {
        name: "API Development Services",
        body: "When you hire dynamic Python programmers from us, you have the resource and skillset to build fully functional backend APIs seamlessly. We help you to access your app's platform data by our proficiency in using diverse APIs and internal packages to create more solid client solutions.",
      },
      {
        name: "AI & Machine Learning Apps",
        body: "Our skilled team of Python full-stack developers has expertise working with diverse Python libraries such as Caffe, DeepLearning4J, TensorFlow, Theano, Torch. This helps them to offer best-in-class Machine Learning and AI-based services.",
      },
      {
        name: "Support & Maintenance",
        body: "Highly-performing Apps need support and maintenance regularly. Our dedicated developers have extensive knowledge about Python's vast ecosystem which enables us to offer round-the-clock support and free maintenance for apps developed at Soft Suave.",
      },
    ],
  },

  midCta: {
    title: "Hire Python Developers Starting from $14/hour",
    body: "We will provide you with remote python developers that work from India. Contact us to take a look at CVs.",
    cta: { label: "Request Rate Card", href: "#enquiry" },
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Hire Python Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: MERN_STEPS,
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "What Makes Our Python Developers Unique and Trustworthy?",
    body: "Hire Python developers from us having 5+ years of average experience to build expressive, scalable, & visually appealing web applications.",
    items: MERN_WHY,
  },

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "How can I hire Python developers in India who fit for my start-up?",
        a: [
          "To hire a Python developer who perfectly fits your start-up, you can get in touch with companies like us that offer proficient Python professionals at an affordable cost.",
          "You should also check the below factors or parameters before you start the hiring process;",
          "Level of experience",
          "Expertise",
          "Reviews from past clients & projects",
          "Easy communication",
          "Offering enterprise solutions for SMBs and Start-ups at affordable cost",
          "Privacy and security measures",
        ],
      },
      {
        q: "How long does it take to build a web application with Python?",
        a: "The duration of web app development with Python depends on the number and complexity of features. However, we follow the effective first-time-right coding methodology which allows us to complete projects before the agreed deadline.",
      },
      {
        q: "Why should I work with Soft Suave for my Python project?",
        a: "Our Python web developers leverage this high-level dynamic programming language to help clients get a competitive edge in the web app market. Moreover, we consistently developing multi-disciplinary, complex, and multi-technology projects with a convenient development process. You can communicate and assign tasks from your project directly to the team and conduct sprint meetings to understand the progress of your project.",
      },
      {
        q: "How much does it cost to hire Python Developers?",
        a: "Before quoting the price of your Python development, we carefully analyze every requirement of the project. Hence, our cost is competitive in the market that attracts many Startups and SMBs. Additionally, you can hire a developer from these cost-effective hiring models - part-time, full-time, or milestone.",
      },
      {
        q: "How do I test your Python developer's expertise?",
        a: "You can conduct a one-to-one interview via skype, slack, and Google Meet. Furthermore, you can also avail of their 1-week free trial to test the developer's expertise on your business.",
      },
      {
        q: "What type of web applications can be developed using Python?",
        a: "We build web applications in Blockchain, Audio & Video, System administration, Games, Machine learning, Data Science & Analytics, eCommerce, and Entertainment. However, when you hire Python developer from India, we help you to develop any type of app customized for your business goals and needs.",
      },
    ],
  },
};

const django: HireSkill = {
  slug: "hire-django-developer",
  key: "django",
  name: "Django",
  role: "Django Developers",
  metaTitle: "Hire Django Developers India | 40-Hour Trial",
  metaDescription:
    "Hire pre-vetted Django developers from India for faster backend delivery and lower hiring costs. Experts in Django, DRF, Python, PostgreSQL, APIs and SaaS platforms.",
  serviceType: "Django development staffing",
  ctaLabel: "Hire Django developers",

  order: [...MODERN_ORDER],

  hero: {
    titleLines: ["Hire Django Developers", "On Contract"],
    body: [
      "Soft Suave helps businesses hire pre-vetted Django developers from India for faster backend delivery and lower hiring costs. Our developers specialize in Django, Django REST Framework, Python, PostgreSQL, APIs, SaaS platforms, and scalable web applications. Get contract-ready talent onboarded quickly with flexible engagement models.",
      "See why businesses choose Soft Suave for their Django developer hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Django Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Django requirement.",
      subject: "Django Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/work-6.webp",
      width: 1200,
      height: 860,
      alt: "A Django application showing admin tooling, models, and API surface",
    },
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Hire Django Developers from Soft Suave",
    body: "Hire expert Django developers from Soft Suave for superior expertise and cost-effective innovation. Our dedicated developers deliver high-quality, customized solutions rapidly, driving impactful results and guaranteed project success.",
    items: [
      {
        name: "Pre-vetted Django Developers",
        body: "Our developers are meticulously vetted to guarantee top-level skills, reliable performance, and total dedication to your project.",
        icon: "users",
      },
      {
        name: "Flexible hiring models",
        body: "Hire dedicated Django developers on your terms and scale your team up or down as required with our adaptable hiring models that align perfectly with your project's demands.",
        icon: "gauge",
      },
      {
        name: "Global delivery standards",
        body: "We implement agile techniques and global best practices to ensure quality that consistently meets or exceeds your expectations.",
        icon: "globe",
      },
      {
        name: "Strict NDA & IP protection",
        body: "We keep your intellectual property safe. Our airtight NDA agreements and complete protection ensure confidentiality every step of the way.",
        icon: "shield",
      },
      {
        name: "Time Zone Flexibility",
        body: "Our developers overlap 4-6 hours within your time zone, ensuring effortless real-time communication.",
        icon: "book",
      },
      {
        name: "World-Class Developers at Budget-Friendly Rates",
        body: "Hire offshore Django developer talent from a leading offshore software development company at competitive rates with top-tier expertise.",
        icon: "coins",
      },
    ],
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Steps to Hire a Django Developer",
    body: "With our 4-step customized hiring process, you can hire expert Django developers swiftly and stress-free.",
    steps: [
      {
        n: "01",
        name: "Share the JD",
        body: "Provide us with the details of your Django project and the skills you're looking for.",
      },
      {
        n: "02",
        name: "Shortlist The Right Developers",
        body: "We handpick the top developers that perfectly match your project needs.",
      },
      {
        n: "03",
        name: "Free 40-hour Trial",
        body: "Test our developers' capabilities for 40 hours with no commitment or cost.",
      },
      {
        n: "04",
        name: "Onboard & Manage",
        body: "Complete the legal agreements and smoothly integrate the developer into your workflow.",
      },
    ],
  },

  techStack: {
    eyebrow: "Technology",
    title: "Technical Expertise of Our Django Developers",
    body: "Our Django developers excel in Python, REST APIs, PostgreSQL, and scalable architecture. Hire remote Django developers and gain powerful solutions backed by robust technical expertise to enhance your digital capabilities.",
    groups: [
      { name: "Frameworks", items: ["Django", "Flask", "Pyramid"] },
      { name: "Platforms", items: ["AWS", "Azure", "GoogleCloud"] },
      {
        name: "Database",
        items: [
          "Mysql",
          "MongoDB",
          "Postgresql",
          "AWS dynomoDB",
          "SQLite",
          "Cloud Firestore",
          "Oracle",
          "MS SQL Server",
        ],
      },
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Django Development Services We Offer",
    body: "Unlock your project's full potential - our tailored Django solutions empower your ideas with innovation and precision. Accelerate digital growth by partnering with Soft Suave's highly skilled Django development experts today!",
    items: [
      {
        name: "Django API development",
        body: "Power your apps with secure, scalable Django APIs. Hire dedicated Django developer to craft seamless integrations, enhance performance, and transform user experience - your data, delivered flawlessly across any platform.",
      },
      {
        name: "Django e-commerce development",
        body: "Accelerate online sales with dynamic Django-powered e-commerce solutions. Hire expert Django developer from Soft Suave for secure shopping experiences, smooth payments, and optimized user journeys driving profitable growth effortlessly.",
      },
      {
        name: "Django migration and upgrades",
        body: "Future-proof your legacy apps with seamless Django migration. Our developers ensure zero downtime, enhanced security, and improved functionality, transforming outdated systems into robust, modern digital experiences quickly.",
      },
      {
        name: "Django web application development",
        body: "Create dynamic, effective Django web applications that are suited to your company's objectives. Hire remote Django developers from Soft Suave, delivering customized, user-focused applications that boost your competitive advantage significantly.",
      },
      {
        name: "Django maintenance and support",
        body: "Keep your business thriving with comprehensive Django support and maintenance that never lets you down. Our dedicated Django experts proactively handle updates, security, and troubleshooting, maximizing app reliability while you focus on core growth.",
      },
      {
        name: "Django dedicated teams",
        body: "Hire dedicated Django developers who will only work on your project. Take advantage of immediate scalability, direct control, and individualized attention to effortlessly achieve superior project outcomes, greater quality, and faster delivery.",
      },
      {
        name: "Django offshore teams",
        body: "Extend your capabilities efficiently—hire offshore Django developer teams offering unmatched flexibility and cost advantages. Our offshore specialists deliver superior Django expertise, accelerating your project timelines without compromising quality standards.",
      },
    ],
  },

  vetting: {
    eyebrow: "Vetting",
    title: "How We Vet and Onboard Top Django Developers",
    body: "We handpick top-tier Django talent with a rigorous selection process. Hire remote Django developers from Soft Suave, ensuring exceptional quality, reliability, and rapid onboarding for your projects every time.",
    steps: vetting([
      "We directly reach out to top Django developers to ensure we find the best talent.",
      "Each developer undergoes a comprehensive assessment, including coding tests and live challenges.",
      "We hire developers who thrive on collaboration and are adept at solving complex challenges.",
      "We ensure our developers are a great fit for your team and can adapt to your work environment.",
    ]),
  },

  comparison: partnerTable(
    "Choosing the Right Django Partner for Your Specific Needs",
    "Explore different hiring models like freelancers, in-house teams, or our expert Django developers. Our comparison chart helps you make an informed decision.",
  ),

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "FAQs About Hiring Django Developers",
    body: "Learn more about our procedures & methods with the help of these FAQs.",
    items: [
      {
        q: "How much does it cost to hire Django developer?",
        a: "Hire dedicated Django developer starting at just $14/hour. Pricing that is transparent and adaptable to your project's scope and budget.",
      },
      {
        q: "Is there any free trial period available?",
        a: "Yes, we provide a 40-hour trial to assess our developers' abilities before committing.",
      },
      {
        q: "What are the hiring engagement options available at Soft Suave?",
        a: "We offer flexible options: fixed price, time-based, and fully managed services.",
      },
      {
        q: "Do you provide support and maintenance services after deployment?",
        a: "Yes, we offer dedicated support and maintenance once the project goes live.",
      },
      {
        q: "Where can you find a Django Engineer?",
        a: "Hire Django developers effortlessly from Soft Suave. Our talent pool offers skilled, pre-vetted Django engineers, readily available for immediate onboarding, providing unmatched flexibility and expertise instantly.",
      },
    ],
  },
};

const php: HireSkill = {
  slug: "hire-php-developers",
  key: "php",
  name: "PHP",
  role: "PHP Developers",
  metaTitle: "Hire PHP Developers in India from Soft Suave",
  metaDescription:
    "Hire dedicated PHP developers from India who build secure, scalable web platforms. Pre-vetted experts in PHP, Laravel, CodeIgniter, MySQL, APIs and CMS.",
  serviceType: "PHP development staffing",
  ctaLabel: "Hire PHP developers",

  order: [...CLASSIC_ORDER],

  hero: {
    titleLines: ["Hire PHP Developers", "in India on Contract"],
    body: [
      "Soft Suave helps businesses hire dedicated PHP developers from India who build secure and scalable web platforms. Access pre-vetted experts in PHP, Laravel, CodeIgniter, MySQL, APIs, CMS development, and custom web solutions with fast onboarding.",
      "See why businesses choose Soft Suave for their PHP developer hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top PHP Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your PHP requirement.",
      subject: "PHP Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/story.webp",
      width: 1200,
      height: 860,
      alt: "A PHP application being modernized, showing legacy and current code paths side by side",
    },
  },

  overview: {
    eyebrow: "Overview",
    title: "Hire Remote PHP Developers 2X Faster",
    paragraphs: [
      "Join hands with our dedicated PHP developers who are flexible with modern development methodologies.",
      "Soft Suave offers the dedicated PHP developers in India that support start-ups and SMBs to develop quality PHP programming solutions. Our PHP coders are expert in all PHP frameworks like Laravel, CodeIgniter, and CakePHP. When you hire PHP developers from Soft Suave, you get the roadmap to deliver PHP development projects 2X faster and 50% cheaper than your competitors do.",
      "Our team of dedicated PHP developers work together to seamlessly transform your business requirements into thriving reality at your affordable cost. Our full-time PHP web developers are well-versed in handling enterprise-grade websites, eCommerce solutions, web applications, and content management sites.",
      "Soft Suave handles simple and complex requirements of your business with the help of all the latest technologies and trends. Our expert PHP app programmers have an average of 5+ years of experience to handle high-quality development and save operational costs simultaneously. Moreover, you get a competitive edge in the market when you hire PHP developers from Soft Suave and even get the privilege to work with the top 2% of India's PHP developers.",
    ],
  },

  services: {
    eyebrow: "Tech Stack",
    title: "Our Top-grade PHP Developers Tech Stack",
    body: "Hire PHP developers from us who are technically sound and equipped to handle any complex project.",
    items: [
      {
        name: "PHP Web Development",
        body: "Our first-class PHP developers are sharp to transform your custom requirements into secure and engaging web solutions. Leveraging the fastest and most effective frameworks, our PHP web app developers bring dynamism and agility to web applications.",
      },
      {
        name: "PHP-based CMS Development",
        body: "We have a team of elite PHP developers that have hands-on experience in developing CMS for several tech giants across the globe. We leverage PHP to develop advanced CMS features that add value to your CMS system and make it user-friendly.",
      },
      {
        name: "PHP eCommerce Application",
        body: "Hire PHP developers from Soft Suave to have a competitive edge in the current eCommerce market. They build eCommerce applications with high-standard and make them versatile, user-friendly, and compatible with all devices.",
      },
      {
        name: "PHP Integration & Upgradation",
        body: "When you hire PHP developers in India from Soft Suave, you get seamless PHP integration at a less time compared to other app development companies. Our integration is smooth, and we guarantee smooth upgradation without any data leaks.",
      },
      {
        name: "PHP Maintenance & Support",
        body: "Maintenance of the application is not a challenge when you hire PHP programmers from Soft Suave. Our developers are well versed to handle any complicated bug fixes and offer 24/7 support to our clients for any PHP development services.",
      },
      {
        name: "PHP Consulting Service",
        body: "Soft Suave houses extraordinary PHP experts who are capable of infusing years of experience and expertise in PHP development to deliver customized and profitable consulting solutions to our clients.",
      },
    ],
  },

  /** The PHP page's mid band offers a profile download rather than a rate card. */
  midCta: {
    title: "Download PHP Developers Profile!",
    body: "Download our PHP engineer's profile within a few seconds and try risk free 1-week trial to test their skills.",
    cta: { label: "Download Now", href: "#enquiry" },
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Hire PHP Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: MERN_STEPS,
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Are Our PHP Developers Considered the Best?",
    body: "When you hire PHP developers, you can fulfill all your requirements effectively, be it e-commerce solutions or web Apps.",
    items: MERN_WHY,
  },

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "What are the benefits if I hire PHP developers from Soft Suave?",
        a: "Developing high-quality and feature-rich applications at a pocket-friendly cost is possible if you hire PHP developer from us. You will also get the opportunity to share your business goals with the top 2% of PHP developers in India.",
      },
      {
        q: "How to select the best company in India to hire PHP programmers?",
        a: "Suppose you are looking out to hire PHP programmer from the best PHP development company in India. In that case, you must check their app developing process and their experience in PHP app development. At Soft Suave, you will get 7 days of free trial to check the ability and expertise of our PHP programmers.",
      },
      {
        q: "What type of software applications can be created with PHP?",
        a: "PHP is a programming language that is versatile and robust. You can develop feature-rich and dynamic Content Management System, eCommerce apps, Web page applications, Graphical User Interface applications (GUI) and many more.",
      },
      {
        q: "Will the hired remote PHP developer work dedicated only for me?",
        a: "Absolutely! The dedicated PHP developers you hire will be committed to your business goals and work fulltime only for your projects.",
      },
      {
        q: "Can I hire PHP developer for the hourly or project-based task?",
        a: "There are three flexible models to hire PHP developer from us who would be the perfect fit for your project. Those models include Full time, Part-time and Milestone hiring. We even go the extra mile to personalize hiring models based on your requirement and budget.",
      },
      {
        q: "Can I hire PHP developer as per my specific industry?",
        a: "Yes, you can hire PHP developers as per your industry. Additionally, the developer you hire from us will have experience in working for many industries and hence you are rest assured to receive many innovative industry-specific solutions.",
      },
    ],
  },
};

const laravel: HireSkill = {
  slug: "hire-laravel-developer",
  key: "laravel",
  name: "Laravel",
  role: "Laravel Developers",
  metaTitle: "Hire Laravel Developer India - Top 1% Programmers",
  metaDescription:
    "Hire experienced Laravel developers from India. Experts in Laravel, PHP, MySQL, REST APIs, SaaS platforms, eCommerce systems and custom web applications.",
  serviceType: "Laravel development staffing",
  ctaLabel: "Hire Laravel developers",

  order: [...MODERN_ORDER],

  hero: {
    titleLines: ["Hire Laravel Developers", "in India within 48 hours"],
    body: [
      "Soft Suave provides experienced Laravel developers from India for rapid hiring needs. Hire experts in Laravel, PHP, MySQL, REST APIs, SaaS platforms, eCommerce systems, and custom web applications – contract-ready and onboarded fast.",
      "See why businesses choose Soft Suave for Laravel hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Laravel Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Laravel requirement.",
      subject: "Laravel Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/work-10.png",
      width: 1200,
      height: 860,
      alt: "A Laravel SaaS application showing queued jobs, billing, and tenant separation",
    },
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Hire Laravel Developers from Soft Suave",
    body: "At Soft Suave, we don't just provide developers - we deliver Laravel experts who think like partners, not just coders. Here's why businesses worldwide hire remote Laravel developers from us.",
    items: [
      {
        name: "Pre-vetted Laravel developers",
        body: "Every developer is rigorously screened to ensure top-tier skills, reliable performance, and a strong commitment to your project.",
        icon: "users",
      },
      {
        name: "Flexible hiring models",
        body: "Scale up or down easily — hire dedicated Laravel developers on your terms with flexible models that adapt to your project's pace.",
        icon: "gauge",
      },
      {
        name: "Global delivery standards",
        body: "Our teams work with agile precision and global best practices to deliver quality that speaks for itself.",
        icon: "globe",
      },
      {
        name: "Strict NDA & IP protection",
        body: "Your ideas stay yours. We ensure confidentiality with airtight NDAs and complete intellectual property protection.",
        icon: "shield",
      },
      {
        name: "Time Zone Flexibility",
        body: "We overlap with your time zone for 4 - 6 hours, ensuring seamless collaboration and real-time communication no matter where you are.",
        icon: "book",
      },
      {
        name: "World-Class Developers at Budget-Friendly Rates",
        body: "As a leading offshore software development company, Soft Suave lets you hire offshore Laravel developer talent at budget-friendly rates without compromising on quality.",
        icon: "coins",
      },
    ],
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Steps to Hire a Laravel Developer",
    body: "Fast, easy, and tailored: Our 4-step hiring process lets you hire expert Laravel developers & onboard them in no time",
    steps: [
      {
        n: "01",
        name: "Share the JD",
        body: "Tell us about your project and the type of Laravel developers you are looking for.",
      },
      {
        n: "02",
        name: "Shortlist The Right Developers",
        body: "Select leading developers from a carefully chosen list that matches your project needs.",
      },
      {
        n: "03",
        name: "Free 40-hour Trial",
        body: "Evaluate our developers' skills at no cost by utilizing a 40-hour trial.",
      },
      {
        n: "04",
        name: "Onboard & Manage",
        body: "Sign the SLA & NDA agreements and integrate the resource into your team.",
      },
    ],
  },

  /**
   * Carried across exactly as the live page publishes it — including the first
   * four groups, which list a mobile stack (Flutter, Swift, Xcode, Swift Data)
   * on a Laravel page. That is a content error on softsuave.com, not a porting
   * one; correcting it is the site owners' call.
   */
  techStack: {
    eyebrow: "Technology",
    title: "Technical Expertise of Our Laravel Developers",
    body: "Soft Suave makes it easy to hire Laravel developers with expertise in modern frameworks, API integrations, and building robust digital solutions.",
    groups: [
      { name: "Frameworks", items: ["Flutter", "Swift", "Ionic", "NativeScript", "jQuery Mobile"] },
      { name: "Programming Languages", items: ["Java", "Kotlin", "JavaScript", "TypeScript"] },
      { name: "Databases", items: ["SQLite", "Swift Data", "PostgreSQL"] },
      { name: "IDE", items: ["Android Studio", "Eclipse, Xcode", "Visual Studio Code"] },
      { name: "Technologies", items: ["PHP", "Javascript", "Typescript", "DBMS"] },
      {
        name: "Packages & Libraries",
        items: ["Composer", "GuzzleHTTP", "PHP Mailer", "Tinker", "PHP Unit", "Swift Mailer", "Telescopet"],
      },
      { name: "Version Control", items: ["Git", "Github", "Gitlab", "Bitbucket", "AWS CodeCommit"] },
      { name: "Testing Tools", items: ["PEST", "Selenium", "Cypress"] },
      {
        name: "Startup Kit/ CMS",
        items: ["Filament", "Breez", "Nova", "Voyager", "Statamic", "October CMS", "Backpack"],
      },
      { name: "Cloud", items: ["AWS", "Azure", "GCP"] },
      { name: "API", items: ["REST", "SOAP", "OpenAPI"] },
      {
        name: "Development Tools",
        items: ["PHP Storm", "VS Code", "Sublime", "Postman", "Laragon", "Docker", "SQLyog", "Herd"],
      },
      {
        name: "UI/UX Support",
        items: ["Laravel Blade", "Twig", "Livewire", "Vue JS", "React JS", "Angular JS", "Tailwind CSS"],
      },
      { name: "Project Management Tools", items: ["Jira", "Asana", "Trello", "Basecamp"] },
      {
        name: "Deployment Tools",
        items: ["Github Actions", "Jenkins", "Circle CI", "Laravel Forge", "Envoyer", "Vapor"],
      },
      { name: "Communication Tools", items: ["Slack", "MS Teams", "Zoom", "Google Meet and Chat"] },
      { name: "AI Tools", items: ["Github CoPilot", "Tabnine", "Chat GPT"] },
      {
        name: "Authentication & Authorisations",
        items: ["Laravel Passport", "Sanctum", "JWT", "Spatie Permissions", "Gates", "Policies"],
      },
      { name: "Real-time data communication", items: ["Pusher", "Socket.io"] },
      {
        name: "Design Patterns",
        items: ["Simple MVC pattern", "Service pattern", "Repository pattern", "Factory pattern"],
      },
      {
        name: "Other Services/Integrations",
        items: ["Stripe", "Paypal", "Authorize.net", "Twilio", "Mailchimp", "Firebase", "GCP Services"],
      },
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Laravel Development Services We Offer",
    body: "From strategy to deployment, we deliver high-quality, tailored applications for diverse business needs. Our end-to-end Laravel development services empower businesses to build robust digital solutions",
    items: [
      {
        name: "Custom Laravel Web Development",
        body: "Bespoke Laravel websites tailored to your business goals — fast, scalable, secure, and ready to impress your users.",
      },
      {
        name: "Laravel Application Development",
        body: "We build robust Laravel applications that power digital transformation and deliver superior user experiences across platforms and industries.",
      },
      {
        name: "Laravel Enterprise Application Development",
        body: "Enterprise-grade Laravel apps built for performance, security, scalability, and seamless integration into your complex business ecosystems.",
      },
      {
        name: "API & Module Development",
        body: "Custom APIs and reusable Laravel modules that connect, extend, and supercharge your web or mobile application.",
      },
      {
        name: "Support and Maintenance Services",
        body: "We take care of your Laravel app with proactive updates and security patches, performance tuning, and 24/7 support.",
      },
      {
        name: "Laravel Migration & Upgradation",
        body: "Hire dedicated Laravel developers & future-proof your projects with smooth migrations & updates, ensuring peak performance and enhanced features.",
      },
      {
        name: "Laravel Testing & QA",
        body: "Hire expert Laravel developers and ensure flawless performance with thorough Laravel testing and QA to catch bugs before launch.",
      },
      {
        name: "Laravel Cloud Deployment and Hosting",
        body: "Launch seamlessly on the cloud with secure, scalable Laravel hosting. Hire dedicated Laravel developers for a smooth cloud setup!",
      },
      {
        name: "Laravel Security Services",
        body: "Fortify your app with top-tier Laravel security and protect your data, apps, and users. Hire expert Laravel developers for impenetrable security.",
      },
      {
        name: "Laravel CMS Development",
        body: "Create a CMS that adapts to your needs and scales with your business. Build something powerful, flexible, and effortless.",
      },
      {
        name: "Laravel Consulting & Strategy",
        body: "Unlock your business's potential with strategic Laravel consulting. We turn bold ideas into efficient, high-impact solutions that deliver results.",
      },
    ],
  },

  vetting: {
    eyebrow: "Vetting",
    title: "How We Vet and Onboard Top Laravel Developers",
    body: "Our process ensures only the best Laravel developers join your project – skilled, adaptable, and reliable, with proven experience in delivering high-performance, maintainable code across complex, deadline-driven development environments.",
    steps: vetting([
      "We actively hunt for top-tier Laravel talent, not just post ads and wait.",
      "Every developer proves their expertise through tough technical tests and live coding challenges.",
      "We hire developers who think, collaborate, and innovate — perfect for complex, fast-moving projects.",
      "We select Laravel experts who communicate well, adapt quickly, and thrive in your team culture.",
    ]),
  },

  comparison: partnerTable("Choosing the Right Laravel Partner for Your Specific Needs"),

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "FAQs About Hiring Laravel Developers",
    body: "Learn more about our procedures & methods with the help of these FAQs.",
    items: [
      {
        q: "How much does it cost to hire a Laravel developer?",
        a: "Our prices begin at $14/hour, and based on the level of experience of the developer, it may increase.",
      },
      {
        q: "Is there any free trial period available?",
        a: "Yes, we provide a risk-free 40-hour trial so you can assess our developers' abilities before committing.",
      },
      {
        q: "What are the hiring engagement options available at Soft Suave?",
        a: "We offer flexible hiring models: fixed price, time and material, or managed services model.",
      },
      {
        q: "Do you provide support and maintenance services after deployment?",
        a: [
          "Yes, we offer dedicated support, maintenance, and performance enhancement services once the project goes live.",
          "Full-time Basis",
          "Part-time Basis",
          "Milestone Basis",
        ],
      },
      {
        q: "Where can you find a Laravel Engineer?",
        a: "At Soft Suave, you can hire expert Laravel developers quickly and easily.",
      },
    ],
  },
};

const dotnet: HireSkill = {
  slug: "hire-dot-net-developers",
  key: "dotnet",
  name: ".NET",
  role: ".NET Developers",
  metaTitle: "Hire Dot Net Developers India | 40-Hour Free Trial",
  metaDescription:
    "Hire skilled .NET developers from India for secure, scalable software. Experts in ASP.NET, .NET Core, C#, Azure, MVC, APIs and cloud applications.",
  serviceType: ".NET development staffing",
  ctaLabel: "Hire .NET developers",

  order: [...CLASSIC_ORDER],

  hero: {
    titleLines: ["Hire .NET Developers", "in India on Contract"],
    body: [
      "Soft Suave provides skilled .NET developers from India for startups and enterprises needing secure, scalable software solutions. Hire experts in ASP.NET, .NET Core, C#, Azure, MVC, enterprise systems, APIs, and cloud applications. Fast onboarding with cost-effective engagement options.",
      "See why businesses choose Soft Suave for their .NET developer hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top .NET Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your .NET requirement.",
      subject: ".NET Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/svc-modernization.webp",
      width: 1200,
      height: 860,
      alt: "An enterprise .NET estate showing modern services alongside legacy Framework applications",
    },
  },

  overview: {
    eyebrow: "Overview",
    title: "Hire Remote .NET Developer At The Right Place",
    paragraphs: [
      "Accelerate your business to a whole new level by connecting with our seasoned .NET developers.",
      "Soft Suave is a reputed Web App Development Company that houses world-class remote ASP.NET developers. Our .NET web developers are proficient in building powerful and scalable Web Apps under your budget. When you hire our dedicated ASP.NET developer, you get to work alongside programmers who have experience working with start-ups and SMBs worldwide. Our certified .NET professionals have in-depth knowledge of .NET frameworks and will go beyond their duty to provide competitive web app development. Soft Suave assures you in delivering successful ASP.NET development services with the help of our developers who have technical expertise coupled with experience in the agile development methodology.",
      "Hire .NET developers from Soft Suave to accelerate your business in a new direction and have a competitive edge in the market. Our dot net developer's exceptional experience in all the latest tools, technologies and systems assist us to build robust web apps. Whether you are building industry-specific desktop Apps or complex web Apps, our ASP.NET programmers can get it started for you and deliver tech-driven solutions. When you hire our 5+ years experienced .NET developer, you can tackle any tedious business or development challenges effortlessly.",
    ],
  },

  services: {
    eyebrow: "Expertise",
    title: "Expertise Of Our .NET Developers",
    body: "With in-depth technical expertise and agile methodology, our .NET developers offer top-class .NET solutions.",
    items: [
      {
        name: "Dedicated .NET Developer",
        body: "Our ASP.NET developers are committed to your business goals and offer reliable and secure .NET solutions with the latest tools and technologies in the ASP.NET framework. They do not shy away from complex requirements; instead, they face them and deliver future-ready .NET solutions.",
      },
      {
        name: "IoT & Embedded Systems",
        body: "IoT and embedded systems are the future. Hire .NET developers from Soft Suave if you want to leverage the expertise and experience to develop scalable and robust IoT and embedded systems.",
      },
      {
        name: ".NET Core Database Management",
        body: "Hire first-class ASP.NET developers from us to simplify your database development process. Our developers have the proficiency to explore and manage your existing or new database seamlessly.",
      },
      {
        name: "Cloud Solutions & Integrations",
        body: "Cloud solutions are crucial in this era. So, many businesses hire .NET developers India. Soft Suave's expert .NET web App developers have the competency to leverage cloud solutions and integrations to develop ground-breaking web Applications.",
      },
      {
        name: "ASP.NET Migration",
        body: "Our .NET experts guarantee smooth transition and migration to your remodeled Apps by analyzing your ASP.NET frameworks, dependencies, and class libraries. Legacy apps can now be safely transformed if you hire .NET developers from us.",
      },
      {
        name: ".NET Desktop App Development",
        body: "Desktop apps are still ruling the app market. Our ASP.NET developers focus on every particular aspect of desktop app development to make it functional and thriving in the market.",
      },
    ],
  },

  midCta: {
    title: "Hire .Net Developers Starting from $14/hour",
    body: "We will provide you with remote .Net developers that work from India. Contact us to take a look at CVs.",
    cta: { label: "Request Rate Card", href: "#enquiry" },
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Hire .Net Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: MERN_STEPS,
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Are Our .Net Programmers Considered the Best?",
    body: "Clients all around the world trust our .NET developers to acquire industry-specific .NET solutions with quality.",
    items: MERN_WHY,
  },

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "What are the various hiring models offered by you to hire .NET developers?",
        a: [
          "Soft Suave has designed three flexible hiring models to help you hire .NET developers who are experts in providing .NET solutions. We also offer customized plans fit that your budget and requirement.",
          "Full-time Hiring",
          "Part-time Hiring",
          "Milestone Hiring",
        ],
      },
      {
        q: "What if I am not satisfied with the developed .NET solution?",
        a: "Soft Suave is renowned for offering exceptional .NET solutions that accurately match clients' requirements. However, if you are not satisfied, you can report to our development team, and they will attempt to fix it without any extra cost.",
      },
      {
        q: "Can you sign a Non-disclosure agreement (NDA) for my project?",
        a: "Yes, we will sign the NDA agreement before we start the project with you. Confidentiality and security are our utmost priority, and hence we follow strict NDA after you hire .NET developers.",
      },
      {
        q: "How to find a cost-effective full-stack .NET developer online?",
        a: "If you are looking out to hire a full-stack ASP.NET developer online, you can prefer companies like us that have the experience and expertise in working with reputed start-ups and SMBs around the world.",
      },
      {
        q: "What would be the estimated cost for hiring .NET developer?",
        a: "The estimated cost to hire .NET developers depends on several factors like expertise, experience, and project size. However, we can assure you that our prices are competitive and pocket-friendly.",
      },
    ],
  },
};

const rails: HireSkill = {
  slug: "hire-ruby-on-rails-developer",
  key: "rails",
  name: "Ruby on Rails",
  role: "Ruby on Rails Developers",
  metaTitle: "Hire Ruby on Rails Developers on Demand",
  metaDescription:
    "Hire Ruby on Rails developers through Soft Suave — dedicated teams or individual developers, vetted, contract-ready, and built to deliver scalable web applications.",
  serviceType: "Ruby on Rails development staffing",
  ctaLabel: "Hire Rails developers",

  order: [...MODERN_ORDER],

  hero: {
    titleLines: ["Hire Ruby on Rails Developers", "in India On Contract"],
    body: [
      "Faster builds. Cleaner code. Quicker launches. Hire Ruby on Rails developers through Soft Suave, a specialized staffing agency offering dedicated teams or individual developers - vetted, contract-ready, and built to deliver scalable web applications that move as fast as your business does.",
      "Great Rails apps start with the right developer - find yours here.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top Ruby on Rails in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      eyebrow: "*Satisfaction Guaranteed - Get 40-hour Free Trial",
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Ruby on Rails requirement.",
      subject: "Ruby on Rails Developers enquiry",
      alert: sharedHeroAlert,
    },
    image: {
      src: "/images/four/work-7.png",
      width: 1200,
      height: 860,
      alt: "A Ruby on Rails application showing convention-driven structure and background processing",
    },
  },

  /**
   * The last card and the first hiring step both say "Drupal" on the live
   * Rails page. Reproduced as published — see this file's header.
   */
  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Hire Ruby on Rails Developers from Soft Suave",
    body: "Why settle for average? Hire dedicated Ruby on Rails developers who thrive under pressure, adapt quickly, deliver exceptional results every time, and give your projects the expertise they truly deserve",
    items: [
      {
        name: "Pre-vetted Ruby on Rails Developers",
        body: "Our Ruby on Rails developers undergo strict screening to ensure they possess top-notch skills, reliability, and an unwavering commitment to your project's success.",
        icon: "users",
      },
      {
        name: "Flexible hiring models",
        body: "From rapid scaling to adjusting your team, our flexible hiring models allow you to adjust according to your project's rhythm.",
        icon: "gauge",
      },
      {
        name: "Global delivery standards",
        body: "Using agile methodologies and global best practices, we ensure top-quality deliverables every time.",
        icon: "globe",
      },
      {
        name: "Strict NDA & IP protection",
        body: "We guarantee your confidentiality. Strict NDA agreements and comprehensive intellectual property protection keep your ideas secure.",
        icon: "shield",
      },
      {
        name: "Time Zone Flexibility",
        body: "Our developers work 4-6 hours within your time zone, ensuring seamless real-time collaboration, no matter where you are.",
        icon: "book",
      },
      {
        name: "World-Class Developers at Budget-Friendly Rates",
        body: "Hire offshore Drupal developers or use our offshore software development service to access top-tier talent at competitive rates with Soft Suave.",
        icon: "coins",
      },
    ],
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Steps to Hire a Ruby on Rails Developer",
    body: "Hire expert Ruby on Rails developers in just 4 easy steps & onboard them in no time!",
    steps: [
      {
        n: "01",
        name: "Share the JD",
        body: "Provide details about your project and the ideal skill set for your Drupal developer.",
      },
      {
        n: "02",
        name: "Shortlist The Right Developers",
        body: "We present the top developers who match your project requirements and goals.",
      },
      {
        n: "03",
        name: "Free 40-hour Trial",
        body: "Experience our developer's abilities firsthand with a 40-hour free trial, no strings attached.",
      },
      {
        n: "04",
        name: "Onboard & Manage",
        body: "Complete the required paperwork (SLA & NDA), & smoothly onboard the developer into your team.",
      },
    ],
  },

  techStack: {
    eyebrow: "Technology",
    title: "Technical Expertise of Our Ruby on Rails Developers",
    body: "Unlock the power of your project with our Ruby on Rails experts, from stunning front-end designs to robust database solutions. Hire experts who craft modular architecture, boost performance, and engineer every line for stability, speed, and scale.",
    groups: [
      { name: "Frameworks", items: ["Rails", "Sinatra", "Hanami", "Cuba"] },
      { name: "Programming Languages", items: ["Ruby"] },
      { name: "Databases", items: ["AWS RDS", "Heroku Postgres", "Maria DB"] },
      {
        name: "IDE",
        items: ["RubyMine", "Sublime", "VIM", "Visual Studio Code", "Atom Editor", "Aptana Studio"],
      },
      { name: "Web Server", items: ["Nginx", "Apache"] },
      { name: "App Server", items: ["Puma", "Unicorn", "Passenger", "Thin", "Webrick"] },
      { name: "Version Control", items: ["Git", "Github", "Gitlab", "Bitbucket"] },
      {
        name: "Testing Tools",
        items: ["Rspec", "Capybara", "FactoryBot", "Faker", "Minitest", "Simplecov", "Database Cleaner"],
      },
      {
        name: "Frontend",
        items: ["ReactJS", "VueJS", "Angular", "Webpacker", "Hotwire", "Bootstrap", "Jquery"],
      },
      { name: "Cloud", items: ["AWS", "Azure", "Digital Ocean"] },
      { name: "API Integration", items: ["Grape", "Rails API", "Swagger", "Apipie-rails"] },
      { name: "Monitoring and Performance", items: ["New Relic", "Datadog", "PaperTrail"] },
      { name: "CI/CD", items: ["CircleCI", "GitHub Actions", "Jenkins"] },
      { name: "Code Quality", items: ["Rubocop", "Reek"] },
      { name: "Deployment Tools", items: ["Heroku", "Capistrano", "Mina", "Docker"] },
      { name: "Communication Tools", items: ["Slack", "MS Teams", "Google Meet and Chat"] },
      { name: "AI Tools", items: ["Github CoPilot", "Google Gemini", "Chat GPT"] },
      {
        name: "Authentication & Authorizations",
        items: ["Devise", "Omniauth", "Pundit", "CanCanCan"],
      },
      { name: "Background Jobs", items: ["Sidekiq", "Resque", "Delayed Jobs"] },
      { name: "Caching", items: ["Redis"] },
      { name: "Error Tracking and Logging", items: ["Sentry", "Rollbar", "Honeybadger"] },
      { name: "Search", items: ["Elasticsearch", "Solr"] },
      { name: "Localization", items: ["I18n"] },
      { name: "Admin Interfaces", items: ["ActiveAdmin", "RailsAdmin"] },
      { name: "Configuration Management", items: ["Figaro", "dotenv"] },
      { name: "File Uploads", items: ["CarrierWave", "Active Storage"] },
      { name: "Meeting", items: ["Microsoft Team", "Google Meet", "Zoom"] },
      { name: "PMS", items: ["JIRA", "Trello"] },
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Ruby on Rails Development Services We Offer",
    body: "From app development to performance tuning and long-term maintenance, we offer full-stack Ruby on Rails services that launch quickly, scale effortlessly, and address real-world business challenges with precision. All of this comes at affordable rates. Our offshore software development service connects you with expert Ruby on Rails developers, delivering high-quality solutions without compromising on cost.",
    items: [
      {
        name: "ROR Application Development",
        body: "Soft Suave delivers custom, cost-effective Ruby on Rails apps that are fast, secure, and tailored to outshine competitors. With expert developers and industry-specific solutions, they turn complex challenges into long-term business wins.",
      },
      {
        name: "ROR Integration & Migration",
        body: "Soft Suave simplifies RoR integration and migration with flawless execution and zero disruption. Our developers deliver flexible, scalable solutions and seamless third-party API integration, earning trust as a top RoR company globally.",
      },
      {
        name: "Dedicated ROR Developer Team",
        body: "Soft Suave empowers businesses to scale with dedicated RoR developers who blend seamlessly into your in-house team. Get full control, on-time delivery, and collaborative solutions tailored to your unique goals, regardless of time zone.",
      },
      {
        name: "ROR Support & Maintenance",
        body: "Soft Suave ensures peak RoR performance with 24/7 support and tailored maintenance, covering upgrades, bug fixes, security patches, and backups. A dedicated team handles client needs seamlessly, keeping applications efficient, reliable, and aligned with evolving business goals.",
      },
      {
        name: "ROR eCommerce Solutions",
        body: "Use Ruby on Rails to turn your e-commerce idea into a reality. We design and build feature-rich, secure, and scalable online stores that offer seamless user experiences, robust payment gateways, and effortless product management, driving business growth.",
      },
      {
        name: "ROR Cloud Solutions & Deployment",
        body: "Take your app to the cloud with confidence. Our ROR cloud deployment services provide secure, scalable solutions tailored to your infrastructure, ensuring smooth migrations, optimal performance, and full cloud integration for flexibility and growth.",
      },
      {
        name: "ROR Custom Web App Development",
        body: "Use Ruby on Rails to create dynamic, user-friendly web apps. Our custom development services are designed to turn complex business requirements into intuitive, scalable, and high-performing web solutions that engage users and drive results.",
      },
    ],
  },

  vetting: {
    eyebrow: "Vetting",
    title: "How We Vet and Onboard Top Ruby on Rails Developers",
    body: "Each Ruby on Rails engineer is vetted for technical brilliance, communication, and reliability. Hire expert Ruby on Rails developers who deliver from day one.",
    steps: vetting([
      "We proactively source top Ruby on Rails developers, going beyond just posting ads.",
      "We subject all developers to tough technical assessments and coding challenges.",
      "We look for developers who excel in collaborative environments and solving complex problems.",
      "We ensure our developers are adaptable and can integrate seamlessly with your team.",
    ]),
  },

  comparison: partnerTable(
    "Choosing the Right Ruby on Rails Partner for Your Specific Needs",
    "Explore different hiring models: freelancers, in-house teams, or our expert Ruby on Rails developers. Our comparison chart helps you make an informed decision.",
  ),

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "FAQs About Hiring Ruby on Rails Developers",
    body: "Learn more about our procedures & methods with the help of these FAQs.",
    items: [
      {
        q: "How much does it cost to hire Ruby on Rails developer?",
        a: "Costs depend on skills and the engagement model. We offer affordable rates starting from $14/hour when you hire expert Ruby on Rails developer talent.",
      },
      {
        q: "Is there any free trial period available?",
        a: "Yes, we offer a 40-hour trial period to help you evaluate our developers' skills before committing.",
      },
      {
        q: "What are the hiring engagement options available at Soft Suave?",
        a: "We provide flexible engagement options, including fixed price, time-based, and fully managed services.",
      },
      {
        q: "Do you provide support and maintenance services after deployment?",
        a: "Yes, we provide ongoing support and maintenance services after your project is live.",
      },
      {
        q: "Where can you find a Ruby on Rails Engineer?",
        a: "Find top-tier talent right here. Hire Ruby on Rails developers from Soft Suave to build your next solution.",
      },
    ],
  },
};

export const backendHireSkills: readonly HireSkill[] = [
  nodejs,
  nestjs,
  java,
  python,
  django,
  php,
  laravel,
  dotnet,
  rails,
];
