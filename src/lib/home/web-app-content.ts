/**
 * Copy for the "Web Application Development" landing page
 * (`/web-application-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from
 * https://www.softsuave.com/web-application-development-company. The page is
 * server-rendered, so it was fetched with `curl` and walked with jsdom rather
 * than driven through a browser. Each service's two paragraphs were read from
 * its own container, so the pairing below is the live page's, not a guess at
 * where the copy splits.
 *
 * The design and the motion are this surface's; the words are not ours to
 * reword, and the live page's own spellings are kept, including "Nodejs" and
 * "Reactjs" unpunctuated, and the lower-case "feedbacks" in one why-us heading.
 * Its process section heading reads "Our Web Application Developmen Process" on
 * the live page, missing a "t"; that one IS corrected here, because a missing
 * letter in a heading is a typo rather than a house style.
 *
 * The section `eyebrow` kickers are the live page's own too — it sets them
 * above each H2 (`span.text-primary`, and `span.style-font` for the FAQs).
 *
 * Shapes match the prop types exported by the shared landing sections in
 * `components/landing/*` and `components/common/*`, so each section is
 * `<Component content={…} />` with no adapter in between.
 *
 * Two bands are the homepage's own sections rendered verbatim (see the route)
 * rather than copies here, because the live page's copy for them IS the
 * homepage's, to the word: the clients band ("Preferred AI-Enabled Technology
 * Partner for Startups and SMBs") and the testimonials band ("What Our Clients
 * Say About Us").
 *
 * The "Tech Specialties" blocks carry their tool tiles, with the same link
 * targets the live page uses — including its Django tile pointing at the
 * Python page. The live page links neither VueJS nor Laravel; Laravel is
 * linked here anyway, because /hire-laravel-developer exists and a tile that
 * does nothing is worse than one that goes somewhere true. Vue is linked
 * nowhere on softsuave.com and has no page under any spelling, so that tile
 * stays inert rather than pointing at a 404.
 * `SiteLink` resolves each path per render, so Ionic and .Net already route to
 * this app's own pages while the rest still go to the live site.
 *
 * Images: hand-placed under `public/images/landing/web-app/`. All eight are
 * free-licence Pexels photographs cropped to each slot; ids, source URLs and
 * blur placeholders are in that folder's `credits.json`.
 */

import { partnerHeroBadges } from "./hero-badges";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { IntegrationContent } from "@/components/common/integration";
import type { ServiceBoardContent } from "@/components/common/service-board";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { FaqContent } from "@/components/landing/faq";

export const webMeta = {
  slug: "web-application-development-company",
  path: "/web-application-development-company",
  /**
   * The live page's `<title>` is "Web Application Development Company In India
   * - Soft Suave". The route appends " | Soft Suave" as every page on this
   * surface does, so the brand is dropped here rather than shipped twice.
   */
  title: "Web Application Development Company In India",
  description:
    "Looking for the best web app development company in India? Start with a 40-hour free trial, risk-free, and experience our expert solutions.",
} as const;

export const webHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: ["Custom Web App", "Development Services"],
  body: [
    "Let’s build your next-gen Web Apps with the crackerjack web application development company in India",
    "Want to Outsource Web Application Development Agency? Get in touch for a free quote!",
  ],
  // The live page's hero carries no bullet list — its left column is the
  // headline and these two lines alone.
  points: [],
  // The four trust badges this surface shows beside every enquiry form.
  badges: partnerHeroBadges,
  form: {
    // The live page's own form heading and sub-line.
    eyebrow: "Let’s Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    note: "Tell us what the application has to do and who uses it, and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The application you have in mind, who uses it, anything it has to integrate with, and whether this is a new build or an existing web app to modernise.",
    subject: "Web Application Development enquiry",
  },
  image: {
    src: "/images/landing/web-app/hero.webp",
    width: 1920,
    height: 1080,
    alt: "A developer building a web application at a workstation",
  },
};

export const webOverview: OverviewContent = {
  eyebrow: "Who We Are",
  title: "Custom Web Application Development Agency in India",
  paragraphs: [
    "We are a custom web application development agency in India, building scalable, high-performance solutions tailored to your business needs with a focus on innovation and user experience.",
    "Soft Suave helps resolve and give better web development solutions to any of your business goals based on your requirements. Our next-generation technologies will help you stand out from the crowd.",
    "Web applications can be created in order to embrace the web-centric digital reality. Our web app development company in USA and India provides smart functioning, visually appealing business solutions. In our quest to deliver web apps way beyond expectations, we use the most up-to-date programming languages, Front-end and Back-end Technologies, Databases, Cloud Services, Frameworks, Architecture types, and DevOps tools.",
    "You can achieve enriching business milestones with us rapidly by expanding your user base. Unlocking new digital opportunities across channels, and reaching new business junctures. Keeping up with today's technological advancements is what we are specialized in. We help Modernize or redesign your old web interfaces as part of our web application development services to align them with modern user needs.",
  ],
  image: {
    src: "/images/landing/web-app/overview.webp",
    width: 1400,
    height: 1050,
    alt: "A laptop showing application code on a desk in a bright studio",
  },
};

/** The prose half of the live "Tech Specialties" section: one block per tier. */
export const webSpecialties: IntegrationContent = {
  eyebrow: "Built for You",
  title: "The Tech Specialties We Offer For Web App Development",
  body: "Our impressive expertise in both frontend and backend areas assist us to craft groundbreaking web Apps that achieve the modern-day web presence many businesses crave.",
  items: [
    {
      name: "Front End Web Development",
      body: "The client-side is where users see, experience, and interact with the application. Offering exceptional user experience in this area is the key to every App's success. Hence, with our robust front end development services, we always implement clean scripting and a delightful UX that are beyond user expectations.",
      tools: [
        { name: "Angular", href: "/angularjs-development-company" },
        // The live page links neither VueJS nor Laravel. Laravel has a page
        // to point at, so that tile is linked here; Vue has none anywhere on
        // softsuave.com, so it stays a plain tile rather than a dead link.
        { name: "VueJS" },
        { name: "ReactJS", href: "/reactjs-app-development-company" },
        { name: "Ionic", href: "/ionic-app-development-company" },
      ],
    },
    {
      name: "Back End Web Development",
      body: "With 13+ experience, we specialize in developing backend systems using strong microservices-based architecture. Also, our web expert's knowledge in back end development ensures our Apps render flawless speed & performance by leveraging multi-tenancy, scalability, and third-party integration.",
      tools: [
        { name: "Nodejs", href: "/nodejs-development-company" },
        { name: "Laravel", href: "/hire-laravel-developer" },
        // The live page points its Django tile at the Python page.
        { name: "Django", href: "/python-application-development-company" },
        { name: ".Net", href: "/dot-net-application-development-company" },
      ],
    },
  ],
};

/**
 * Six services, each carrying the two paragraphs the live page pairs with it.
 * Too long for cards and too long to run down the page, so they render as a
 * board: the six names to pick from, one stage to read on.
 */
export const webServices: ServiceBoardContent = {
  eyebrow: "Our Services",
  title: "Our Diverse Web Application Development Services",
  body: "We have mastered web app development services for over a decade and keeping up with the newest technologies, our app development stands out among the most.",
  cta: { label: "Talk To Experts", href: "#enquiry" },
  items: [
    {
      name: "Dynamic Web App Development",
      paragraphs: [
        "Dynamic web applications that incorporate live data into their content, which helps them draw attention to the services and products being offered. All private and public data displayed on these applications is stored in databases. In most cases, web apps have an admin panel that allows administrators to control the backend and frontend portions, modify content, and add interactive features. The dynamic web apps is built using PHP, ASP.NET, etc.",
        "A dynamic web application generates pages/data in real-time, based on the request, and sends a response to the client (you). In response to the response, the client-side code will take the appropriate action. An example would be on Twitter when the follow button is clicked.",
      ],
      image: { src: "/images/landing/web-app/svc-dynamic.webp", alt: "" },
    },
    {
      name: "eCommerce Web App Development",
      paragraphs: [
        "An e-commerce web application is a web app that allows users to buy and sell products or services from your business. An eCommerce web app looks like an online shopping store, but it is more than that. It can include new products and remove outdated or old products.",
        "It can also manage payments and facilitate electronic payments. And an effective management panel is very necessary for all of these tasks. Users can customize such applications with the help of dedicated web developers. Some of the most familiar examples of e-commerce web applications are Flipkart, Amazon, Ajio, and so on.",
      ],
      image: { src: "/images/landing/web-app/svc-ecommerce.webp", alt: "" },
    },
    {
      name: "Single-page Web App Development",
      paragraphs: [
        "Single-page applications, or SPAs, are dynamic web applications that do not require browser reloads. They function as a single unit of a web application and implement all business and technological strategies in the client-side browser. SPAs are fast and dynamic since they implement all business strategies in asynchronous navigation of the client-side browser.",
        "Since communication takes place in asynchronous navigating, communication is faster. Moreover, a SPA web application of any type can be reconfigured to achieve desired results; however, the main problem with SPAs is that they do not comply with SEO guidelines. The best examples of single-page apps are Netflix, Twitter, and Gmail",
      ],
      image: { src: "/images/landing/web-app/svc-spa.webp", alt: "" },
    },
    {
      name: "Web Portal Development Company",
      paragraphs: [
        "A portal web application provides a direct link to important data, like product catalogs and guides, that a particular type of user would want to access. Portals are the best option for organizations or businesses that prefer to build customized interfaces to suit their target audience's needs. Only registered users can access and their activities can be monitored by the service provider once they log in.",
        "This facilitates the creation of a useful, secure, and personalized access point for organizing information according to the specific needs of users. When you check your purchase order online, you are using a customer portal. The different types of web portals include Customer Portals, Corporate Portals, Education Portals, Information Portals, HR Portals, eCommerce Portals, Government Portals, and Healthcare Portals.",
      ],
      image: { src: "/images/landing/web-app/svc-portal.webp", alt: "" },
    },
    {
      name: "Web CMS Development Company",
      paragraphs: [
        "A content management system (CMS) is a type of website application that lets you modify the content without any help from the technical team. You can do this by using an admin panel without any knowledge of programming languages. There are many CMS variations with various specifications and designs, some examples being WordPress, Joomla, etc.",
        "If you're planning to add or change content to your website in the future, a CMS solution is a better option. CMSs simplify tasks such as editing existing pages, publishing new pages, adding an online store, and creating web forms.",
      ],
      image: { src: "/images/landing/web-app/svc-cms.webp", alt: "" },
    },
    {
      name: "Web Legacy Modernization",
      paragraphs: [
        "We provide seamless legacy transformation services, whether you need to migrate your existing web application or revamp an outdated legacy application. Using modern technology, frameworks, and security, we can help you generate better profits from your existing applications. Modernizing legacy applications allows you to reorganize tools and technologies to meet future needs.",
        "Using legacy modernization with acceleration- The banking sector must maintain a modern, reliable digital banking experience for its customers and update it regularly to keep customers satisfied. Soft Suave app development team specializes in modernizing web applications up to date.",
      ],
      image: { src: "/images/landing/web-app/svc-legacy.webp", alt: "" },
    },
  ],
};

/** Eight core technologies, four across, so the grid runs two full rows. */
export const webCoreTech: CardGridContent = {
  eyebrow: "Core Tech",
  title: "Major Web App Development Technologies",
  body: "We have supported many new businesses and small companies that create mobile apps in the USA, UK, and other countries. Our help has allowed them to succeed by making attractive apps for iPhones, and Android phones, and apps that work on multiple platforms.",
  items: [
    {
      name: "Reactjs App Development",
      body: "Supercharge your web presence with ReactJS! Our AI-enabled developers craft dynamic, responsive, and fast web apps that deliver unmatched performance and seamless user experiences. Build scalable apps that stand out and evolve with your business.",
    },
    {
      name: "Angular Development",
      body: "Unlock the full potential of Angular for your web apps with our elite Angular development service. Our skilled devs create robust, feature-rich solutions with clean code, ensuring your app is fast and built to evolve in a fast-paced digital world.",
    },
    {
      name: "ROR Development",
      body: "Revolutionize your web development with Ruby on Rails! We design clean, scalable, and high-performance apps that boost efficiency and speed up your development process, ensuring rapid delivery and a seamless user experience.",
    },
    {
      name: "Node.js Development",
      body: "Optimize your web apps with our top-tier Node.js development service. Our expert AI-assisted devs create real-time, scalable, & high-performance apps that deliver lightning-fast responses, ensuring smooth UX & seamless back-end operations.",
    },
    {
      name: "Java Application Development",
      body: "Build scalable, secure, and reliable web apps with Java. Our team delivers powerful solutions, ensuring smooth integration and high performance while future-proofing your application for growth in an ever-evolving digital landscape.",
    },
    {
      name: "Python Development",
      body: "Unleash innovation with the power of Python! Get scalable and secure web apps tailored to your business needs with our Python development service. With Python’s versatility and our expertise, your digital solutions will be ready for tomorrow's challenges.",
    },
    {
      name: "PHP Development",
      body: "Elevate your website with PHP! Our expert developers build dynamic, interactive, and secure web apps, ensuring seamless functionality and a user-friendly experience. Get robust solutions that are reliable and scalable for your growing business.",
    },
    {
      name: ".Net Development",
      body: "Power your web projects with .NET! We specialize in creating top-notch web applications using the latest .NET technologies. Our solutions are designed to grow with your business, providing long-term reliability and flexibility.",
    },
  ],
};

/** The live page's four delivery models, four across on a wide desktop. */
export const webDelivery: CardGridContent = {
  eyebrow: "Delivery Method",
  title: "Flexible Solutions for Every Need",
  body: "Accelerate your digital journey with flexible delivery methods from Soft Suave. We align with your business goals, ensuring seamless collaboration, faster delivery, and scalable solutions tailored for long-term success.",
  items: [
    {
      name: "Offshore Software Development Service",
      body: "Unlock success with our reliable offshore software development services that ensure fast, quality delivery.",
    },
    {
      name: "Software Development Outsourcing Service",
      body: "Outsource software development with confidence and save time while ensuring the highest quality.",
    },
    {
      name: "IT Staff Augmentation Service",
      body: "Expand your workforce rapidly with our staff augmentation, matching skilled professionals to your needs.",
    },
    {
      name: "Hire Dedicated Developers Team",
      body: "Build your project with a dedicated team of developers focused on delivering top-tier results.",
    },
  ],
};

/**
 * Seven stages. The live page numbers them inside each heading ("1. Requirement
 * Gathering"); the numeral moves to `n` here, which is where this surface draws
 * it, so it is not printed twice.
 */
export const webProcess: ProcessContent = {
  eyebrow: "Process",
  // The live heading reads "Developmen", missing a "t". Corrected.
  title: "Our Web Application Development Process",
  body: "The process of our web application development company is all about making a masterpiece from scratch to stand out among every other app in the market.",
  steps: [
    {
      n: "01",
      name: "Requirement Gathering",
      body: "Web app development begins with collecting your ideas and features, as well as your purpose and primary goal to develop an app.",
    },
    {
      n: "02",
      name: "UI/UX Design",
      body: "With wireframes, we get the visual design of placements, layouts, breadcrumbs, features, colors, designs, etc., from your idea.",
    },
    {
      n: "03",
      name: "Prototype",
      body: "Using the wireframes, we will create a digital workable product, where we can see the design and features of the web app.",
    },
    {
      n: "04",
      name: "Development",
      body: "After the prototype design is confirmed, we start to develop the web app using the chosen technologies and frameworks.",
    },
    {
      n: "05",
      name: "Quality Assurance",
      body: "After the web app is developed, QA testers will perform numerous tests to identify and fix bugs, and helps prevent future errors.",
    },
    {
      n: "06",
      name: "Deployment",
      body: "Once it has been tested and approved by the QA team, the Web application will be launched on its respective platforms.",
    },
    {
      n: "07",
      name: "Support & Maintenance",
      body: "Our app development team is available 24/7 to support you with any issue or updation regarding the maintenance of the app.",
    },
  ],
};

/**
 * "Who We Work With" names three audiences and describes none of them, so they
 * render as the overview's claim list rather than as cards that would need a
 * body each we do not have.
 */
export const webAudience: OverviewContent = {
  eyebrow: "Who We Work With",
  title: "Who We Work With",
  paragraphs: [
    "Soft Suave provides meticulous web app development services for a wide range of sectors in India, the US, and other countries. Help them grow and glow in their respective Industry. For over a decade we delivered numerous services to Startups and SMBs. whatever your business needs are, We can fulfill all your app development requirements in one place.",
  ],
  points: ["Start Up Business", "Small & Medium Business", "Agencies"],
};

export const webWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Soft Suave For Web App Development Services",
  body: "Create & Contemporize web Applications To Digitally Convert Your Business",
  items: [
    {
      name: "Client Satisfaction",
      body: "We provide web app services more than what you needed for your business and its growth including future planning.",
    },
    {
      name: "Decade of Experience",
      body: "Our experience in the field for a decade enlightened us with the high skill in technology, what businesses needed with the market goal achievements.",
    },
    {
      name: "Better Communication",
      body: "We understand your requirements and get to know what is good for you, we travel with your business to know more and have frequent conversations, and queries for updates.",
    },
    {
      // The live page's own lower-case "feedbacks", kept as written.
      name: "We Consider Your Ideas And feedbacks",
      body: "Throughout the app development process, we get your feedback and ideas to update the web app to how you want it.",
    },
    {
      name: "Support Access 24/7",
      body: "You can contact our web app development team anytime regarding issues and support even after the completion of web app development.",
    },
  ],
};

export const webFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Frequently Asked Questions",
  body: "Know more about our processes and how we work, with the help of the following FAQs our clients ask.",
  items: [
    {
      q: "Which web application platform is right for me?",
      a: [
        "AngularJS, Ruby on Rails, and React Native, Ionic are among the tools available for web application development. Choosing the right platform for a web application development project requires consideration of a variety of factors, including user experience.",
        "For web app development, the platform must have an ideal balance between coding sophistication and user experience. Coding more than UX/UI can lead to bad results when you focus on coding. To select the right platform for your project, you should work with an experienced and skilled web application development company like soft suave.",
      ],
    },
    {
      q: "How will you help me stand out among competitors?",
      a: "An effective and unique web app development strategy is usually necessary to stay competitive and meet customer demands. Due to the increasing availability of tools for developing bigger, better, and high-performing products, web application development services are evolving exponentially. An app development project's success is determined by a number of factors. The technical expertise of web application development company professionals is one of those factors. Don't worry, you are in the safe hands of Soft Suave.",
    },
    {
      q: "Can I get expert advice before processing?",
      a: "You can get 30 minutes free consultation, with Soft Suave’s web development experts to know more about web applications and share your ideas to develop them into a possible product.",
    },
    {
      q: "I want my web app to be totally new and represent my brand. Can you do it?",
      a: "One of our reputed services as a web app development company is Custom web app development. You will get a fully customized app that represents your brand. Once you pour all your ideas, we will deliver them exactly how you wanted the app.",
    },
  ],
};
