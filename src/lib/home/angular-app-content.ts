/**
 * Copy for the "Angular Development" landing page
 * (`/angularjs-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from
 * https://www.softsuave.com/angularjs-development-company. The page is
 * server-rendered, so it was fetched with `curl` and walked with jsdom rather
 * than driven through a browser. Each service's paragraph was read from its own
 * container, so the pairing below is the live page's, not a guess.
 *
 * The design and the motion are this surface's; the words are not ours to
 * reword, and the live page's own spellings are kept, including "Year of
 * Experience" singular in its counter row.
 *
 * The section `eyebrow` kickers are the live page's own too — it sets them
 * above each H2 (`span.text-primary`, and `span.style-font` for the FAQs).
 *
 * Shapes match the prop types exported by the shared landing sections in
 * `components/landing/*` and `components/common/*`, so each section is
 * `<Component content={…} />` with no adapter in between.
 *
 * Two bands are the homepage's own sections rendered verbatim (see the route):
 * the awards wall and the testimonials band, whose heading here is the
 * homepage's to the word. The clients band is the homepage's component too, but
 * note its heading differs: the live Angular page shortens it to "Trusted
 * Partner for Startups and SMBs." and prints no standfirst under it, where the
 * homepage's band carries the longer AI-enabled wording. The logos are the
 * same, so the shared band is used rather than a second copy of it.
 *
 * The live page's route is `/angularjs-development-company`, with the older
 * "AngularJS" spelling, while every heading on it says "Angular". The slug is
 * kept because it is the indexed URL; the copy is left as written.
 *
 * Images: hand-placed under `public/images/landing/angular/`. All seven are
 * free-licence Pexels photographs cropped to each slot; ids, source URLs and
 * blur placeholders are in that folder's `credits.json`.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { ServicesCarouselContent } from "@/components/common/services-carousel";
import type { CardGridContent } from "@/components/landing/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { StoryCardsContent } from "@/components/common/story-cards";
import type { FaqContent } from "@/components/landing/faq";

export const ngMeta = {
  slug: "angularjs-development-company",
  path: "/angularjs-development-company",
  /**
   * The live page's `<title>` is "Angular Development Company in India - Soft
   * Suave". The route appends " | Soft Suave" as every page on this surface
   * does, so the brand is dropped here rather than shipped twice.
   */
  title: "Angular Development Company in India",
  description:
    "Trusted Angular development company in India with time-zone compatible teams. Ensuring seamless collaboration and innovative applications.",
} as const;

export const ngHero: HeroContent = {
  eyebrow: "Angular Development",
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Angular Development", "Company In India"],
  body: [
    "Soft Suave offers exceptional Angular development services, crafting web applications that deliver agility, scalability, and a dynamic user experience. Let us help you access the full potential of Angular for your next project.",
  ],
  // The four claims the live hero prints beside its headline.
  points: [
    "Save 60% Development Costs",
    "400+ In-house Resources",
    "7-Day Free Trial",
    "NDA & Flexible Engagement Models",
  ],
  // The four trust badges this surface shows beside every enquiry form.
  badges: ["Upwork Top Rated", "Clutch verified", "Microsoft Silver Partner", "AWS Partner"],
  form: {
    // The live page's own form heading and sub-line.
    eyebrow: "Let’s Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    note: "Tell us what the application has to do and who uses it, and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The application you have in mind, who uses it, anything it has to integrate with, and whether this is a new Angular build or an existing app to migrate.",
    subject: "Angular Development enquiry",
  },
  image: {
    src: "/images/landing/angular/hero.webp",
    width: 1920,
    height: 1080,
    alt: "A workspace with interface sketches on a tablet beside code on a monitor",
  },
};

/** Six services, one paragraph each, in the live page's order. */
export const ngServices: ServicesCarouselContent = {
  eyebrow: "Services",
  title: "Our Angular Development Services",
  body: "Soft Suave offers exceptional Angular development services designed to craft exceptional user experiences.",
  items: [
    {
      name: "SPA & PWA",
      body: "As a leading Angular development company, we specialize in crafting cutting-edge Single Page Applications (SPAs) and Progressive Web Apps (PWAs). Our expertise ensures fast, seamless, and engaging user experiences crucial for modern web applications.",
      image: {
        src: "/images/landing/angular/svc-spa.webp",
        alt: "Front-end JavaScript on screen during a single-page build",
      },
    },
    {
      name: "Angular Plugin Development",
      body: "Our team crafts custom Angular plugins to integrate with your existing applications seamlessly. We develop compatible and powerful solutions to fulfill your specific needs, whether it's adding unique features or improving integration capabilities across various Angular versions.",
      image: {
        src: "/images/landing/angular/svc-plugin.webp",
        alt: "A code editor open on a laptop, the kind of work a plugin build lives in",
      },
    },
    {
      name: "Angular Widget Development",
      body: "As an Angular development company in India, we are skilled at creating custom widgets that add both functionality and aesthetic value to your applications. Our widgets are modular, reusable, and easy to integrate, enhancing user interactions and data presentation.",
      image: {
        src: "/images/landing/angular/svc-widget.webp",
        alt: "Markup on screen showing the structure a reusable widget is built from",
      },
    },
    {
      name: "Angular UI/UX Development",
      body: "We excel in UI/UX development, creating user interfaces that are visually appealing, user-friendly, and accessible. Prioritizing end-user satisfaction, we design our interfaces to provide intuitive and engaging experiences.",
      image: {
        src: "/images/landing/angular/svc-uiux.webp",
        alt: "Interface plans, pencils and a phone laid out on a designer's desk",
      },
    },
    {
      name: "Angular Enterprise Solutions",
      body: "Known as a reputable Angular development company, we deliver enterprise-grade solutions, catering to large-scale enterprises by developing secure, scalable applications capable of handling complex business processes and workflows.",
      image: {
        src: "/images/landing/angular/svc-enterprise.webp",
        alt: "Two people working through technical drawings for a large system",
      },
    },
    {
      name: "REST APIs",
      body: "Specializing in building RESTful APIs, we ensure seamless communication between your Angular applications and other systems. Our APIs are secure, reliable, and optimized for high performance, facilitating effective data handling and integration.",
      image: {
        src: "/images/landing/angular/svc-api.webp",
        alt: "Code on a dark screen, the kind that wires one service to another",
      },
    },
  ],
};

/**
 * Four stacks, each with the paragraph the live page pairs with it. Its three
 * supporting claims sit above the grid as `points`, which is where that copy
 * runs on the live page too.
 */
export const ngStacks: CardGridContent = {
  eyebrow: "Powerful Tech Combinations",
  title: "Beyond Angular: Powerful Tech Combinations",
  body: "We use powerful tech stacks specifically designed to work with Angular. This, combined with our well-researched starter architecture, gives you a significant head start on your project.",
  points: [
    "We've combined proven technologies to deliver optimal performance, scalability, and security for your Angular application.",
    "Hit the ground running with our pre-configured starter architecture. This pre-built foundation gets you coding faster.",
    "Focus on what matters most: building the unique features that set your app apart.",
  ],
  items: [
    {
      name: "MEAN",
      body: "Node.js and Express.js handle large volumes of requests efficiently, MongoDB allows for horizontal scaling, and Angular's component-based architecture ensures smooth front-end growth. This combination enables scalable web applications capable of handling increasing loads and complex functionalities.",
    },
    {
      name: "Angular + Spring Boot + PostgreSQL",
      body: "This combination is perfect for enterprise-grade web applications. Spring Boot offers a robust and flexible backend with advanced security features, while PostgreSQL provides high performance and supports complex SQL queries. Together, they create scalable, secure, and maintainable applications.",
    },
    {
      name: "Angular + Golang (Go) + PostgreSQL",
      body: "This combination is perfect for high-performance web applications and APIs. Go’s concurrency model and efficient execution make it suitable for demanding applications, while PostgreSQL adds robust database support.",
    },
    {
      name: "Angular + NestJS + TypeORM + PostgreSQL",
      body: "For scalable server-side applications with TypeScript, this stack is ideal. Angular and NestJS offer a consistent TypeScript codebase and modular architecture, while TypeORM ensures powerful and flexible database interactions.",
    },
  ],
};

/** The live page's band, with the three counters it prints beneath. */
export const ngHireCta: CtaBandContent = {
  eyebrow: "Hire A Team",
  title: "Lack Angular Resources for Your Development Project?",
  body: "Soft Suave provides pre-screened Angular developers and dedicated teams with a 1-week risk-free trial to enhance your project.",
  cta: { label: "Hire Angular Developers", href: "#enquiry" },
  // "Year of Experience" is singular on the live page; kept as written.
  stats: [
    { figure: "1250+", label: "Projects" },
    { figure: "13+", label: "Year of Experience" },
    { figure: "150+", label: "Clients Globally" },
  ],
};

/** Six capabilities, three across so the grid runs two full rows. */
export const ngStrengths: CardGridContent = {
  eyebrow: "Strengths And Capabilities",
  title: "Our Angular Strengths And Capabilities",
  body: "Soft Suave offers exceptional Angular development services designed to craft exceptional user experiences. See how we use the power of Angular:",
  items: [
    {
      name: "Angular Material",
      body: "We don’t just build web apps, we craft exceptional user experiences. With Angular Material's extensive library of customizable UI components at our disposal, we design interfaces that are both visually stunning and intuitively responsive. Our expertise ensures an easy user journey that exceeds expectations.",
    },
    {
      name: "Angular Universal for SSR",
      body: "Soft Suave prioritizes exceptional user experience from the outset. We implement Angular Universal's server-side rendering (SSR) to optimize initial page load times. This enhances SEO visibility and fosters a seamless user experience from the initial interaction.",
    },
    {
      name: "RxJS and NgRx",
      body: "Soft Suave prioritizes the development of reactive, high-performance, and adaptable web applications. This is achieved through our expertise in RxJS and NgRx, powerful libraries that enable us to manage intricate data streams, optimize application states, and design responsive interfaces that promote user engagement.",
    },
    {
      name: "Internationalization",
      body: "Soft Suave promotes global accessibility for your web applications through easy integration of internationalization (i18n) functionalities. This simplifies translation and localization, enabling you to effectively connect with a diverse audience on a global scale. We break down language barriers, ensuring exceptional user experiences.",
    },
    {
      name: "NG Bootstrap",
      body: "Soft Suave improves the visual appeal and responsiveness of your applications through the smooth integration of NG Bootstrap, a powerful library built upon the robust Bootstrap framework. This ensures flawless cross-device and screen-size compatibility.",
    },
    {
      name: "D3 for Reporting",
      body: "Soft Suave utilizes the power of D3, a leading data visualization library, to transform complex data into captivating and interactive reports. This empowers you to extract valuable insights and make data-driven decisions with clarity, all part of our comprehensive Angular development services.",
    },
  ],
};

export const ngWhyUs: CardGridContent = {
  eyebrow: "Why Choose Soft Suave",
  title: "Why Choose Soft Suave For Angular Development?",
  body: "Empower your web applications with Soft Suave's expert Angular development services. Here's why you should choose us:",
  items: [
    {
      name: "Dozens of Angular Projects to Date",
      body: "With over 13+ years of experience in Angular development, we've honed our skills to craft custom, high-quality solutions. Our proven track record speaks for itself, ensuring we can deliver the results you need to achieve your business goals.",
    },
    {
      name: "Diverse Range of Talent",
      body: "Soft Suave offers a comprehensive team of experts. Beyond our skilled Angular developers, we have UX/UI designers, DevOps engineers, QA specialists, and more. We manage every aspect of your software, from initial design concepts to ongoing performance optimization and security maintenance.",
    },
    {
      name: "Security",
      body: "At Soft Suave, security is our top priority. We understand the critical nature of protecting your data and user information. That's why we utilize the built-in security features of Angular, including XSS protection and Content Security Policy support.",
    },
  ],
};

/** Three projects, each labelled with the industry the live page names. */
export const ngStories: StoryCardsContent = {
  eyebrow: "Our Work",
  title: "Success Stories",
  body: "Learn how we transformed business operations across various industries with cutting-edge solutions and tailored them to their unique requirements.",
  items: [
    {
      industry: "Healthcare",
      name: "Telehealth App For Doctor Consultation",
      body: "Soft Suave developed a custom telehealth app for a MedTech start-up, aiming to simplify healthcare management with mobile solutions. The app allows doctors to register, connect with patients via video, and manage appointments. Hire mobile app developers and procure similar apps for your business requirements.",
    },
    {
      industry: "Retail & eCommerce",
      name: "Multi-Vendor Marketplace App",
      body: "Soft Suave developed a customized multi-vendor eCommerce platform for an eCommerce start-up to deliver a superior online shopping experience. The platform includes multiple payment options, real-time inventory management, and different user panels to ensure smoother operation. Hire app developers and improve your business operations.",
    },
    {
      industry: "Business- Consulting",
      name: "Tool For Project Progress Tracking",
      body: "Soft Suave created a job progress tracking application for a consulting company focused on the construction and real estate industries in New York City. The app facilitates project management by breaking large tasks into smaller, manageable units, and providing tools for task assignment, progress tracking, and resource allocation. Scale up your app performance by hiring mobile app developers.",
    },
  ],
};

export const ngFaqs: FaqContent = {
  eyebrow: "Questions",
  title: "Frequently Asked Questions",
  body: "Know more about our processes and how we work, with the help of the following FAQs.",
  items: [
    {
      q: "What is Angular and why is it popular for web development?",
      a: "Angular is a robust platform created by Google for building single-page applications using HTML and TypeScript. It is popular due to its ability to produce dynamic, efficient web applications, supported by a comprehensive range of integrated features and best practices.",
    },
    {
      q: "What are the benefits of using Angular for front-end development?",
      a: "Angular's benefits include modularity for easier code management, component reusability for streamlined front-end development, and extensive tools and libraries that enhance developer productivity.",
    },
    {
      q: "How does Angular ensure the security of web applications?",
      a: "While the Angular framework itself promotes secure coding practices and offers features to help mitigate common vulnerabilities like XSS and CSRF, we understand that a layered security approach is necessary. Our team implements additional best practices and security measures to ensure your application remains safe and secure.",
    },
    {
      q: "How experienced is your team in Angular development?",
      a: "Our Angular development team is highly experienced, boasting years of hands-on involvement in delivering complex and scalable Angular applications across various industries. With rigorous training and continuous upskilling, our developers stay at the forefront of Angular technology and best practices.",
    },
    {
      q: "Do you have experience in migrating existing applications to Angular?",
      a: "Yes, we have extensive experience in migrating existing applications to Angular. We employ a systematic approach to ensure a smooth transition, leveraging Angular's advanced features to enhance your application's performance, scalability, and maintainability without disrupting your existing operations.",
    },
    {
      q: "Will I get post-development support?",
      a: "Yes, at Soft Suave, we provide comprehensive post-development support to ensure your Angular application operates smoothly and continues to meet your business needs. Our support includes troubleshooting, regular updates, and performance enhancements to keep your application-optimized and secure.",
    },
    {
      q: "Why Choose Soft Suave for your Angular development partner?",
      a: "Soft Suave stands out for our Angular development services thanks to our deep expertise, experienced development team, and commitment to delivering quality solutions. We focus on crafting tailored solutions that meet specific business requirements, ensuring scalability, maintainability, and performance. Our proactive approach to adopting the latest technologies, combined with our agile methodology, ensures timely and successful project completion.",
    },
  ],
};
