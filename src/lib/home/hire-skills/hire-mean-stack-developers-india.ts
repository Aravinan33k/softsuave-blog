/**
 * The `hire-mean-stack-developers-india` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-mean-stack-developers-india/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { techSteps, techWhy } from "../hire-blocks";
import { HOURLY_RATE } from "../../company-figures";

export const skill: HireSkill = {
  slug: "hire-mean-stack-developers-india",
  key: "mean",
  name: "MEAN Stack",
  role: "MEAN Stack Developers",
  // VERBATIM, INCLUDING THE TYPO: the live title says "Devlopers", not
  // "Developers", in its second half.
  metaTitle: "Hire MEAN Stack Developers in India | Remote MEAN Stack Devlopers India",
  metaDescription:
    "Hire a MEAN Stack developer in India from soft suave for your project to make it an Ideal and futuristic outcome.",
  serviceType: "MEAN stack development staffing",
  ctaLabel: "Hire MEAN developers",

  order: ["overview", "services", "midCta", "process", "whyUs", "exploreMore", "testimonials", "faq"],

  hero: {
    titleLines: ["Hire MEAN Stack Developers", "in India on Contract"],
    accent: "MEAN Stack Developers",
    body: [
      "Finding reliable MEAN Stack developers is hard, and retaining them is even harder. Soft Suave is a top software development firm that addresses both challenges through pre-vetted engineers, with access to a large, cost-effective talent pool, and flexible engagement models designed to scale without disruption.",
      "Here's how Soft Suave solves common MEAN Stack hiring challenges",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top MEAN Stack Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your MEAN stack requirement.",
      subject: "MEAN Stack Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-mean-hero.webp",
      width: 1800,
      height: 900,
      alt: "Developer working on a laptop at night by a city-lit window",
      blurDataURL:
        "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAQAgCdASoQAAsAA4BaJbACdAEfbjybxzd0AP71l3fHwHJBkfycN2jtPsEKaljZ6a9kuJnuYTt5e85H1k4N4NKqhf0ZQ7uN3v0Q4gAA",
    },
  },

  overview: {
    // No `image` here, on purpose: this page takes the pipeline's photo, centred
    // against the prose (13 Oct review: "center align the image"), and that photo
    // comes from `overview-images`, which pulls in a 302 KB placeholder table this
    // module must not drag into the browser. `components/landing/hire-page.tsx`
    // resolves it on the server (see CENTERED_OVERVIEW_IMAGES there).
    eyebrow: "Overview",
    title: "Hire MEAN Stack Developers to Start Your Ideal Project",
    paragraphs: [
      "MEAN Stack developers from Soft Suave are good at making your ideal business goal come true with their full control over the Project and Lavishing Ideology in Advancement and updation.",
      "Soft Suave believes in building long-term relationships and providing flexible services to meet your needs. Hire MEAN stack developers in India from us, they dedicatedly work 24/7 to ensure that you receive excellent service.",
      "You don't need any hesitation to hire remote MEAN stack programmers in India. Because of the Flexible work model as you can hire them on a monthly/hourly or full-time basis. And mainly, they work according to your timeline with exceptional communication skills.",
      "Our MEAN Stack developers specialize in building robust, high-performance applications that can scale on demand. From small web and mobile apps to large enterprise systems, our developers can work with anyone regardless of their experience.",
      "The MEAN Stack technology has its own responsible duty while taking care of Full stack development. Here is how. For Database management - MongoDB / MySQL, Backend framework - ExpressJS, Front End Framework - Angular, and Backend platform: NodeJS.",
    ],
  },

  services: {
    eyebrow: "Expertise",
    title: "Our MEAN Stack Developers' Expertise",
    body: "Having the best MEAN stack programmers in India, Soft Suave developers are great at these following MEAN stack development services and solutions.",
    items: [
      {
        name: "MEAN Stack E-commerce Development",
        body: "Our e-commerce app development is instinctive and responsive to improve your business productivity by using a document-oriented NoSQL database and JS. Our MEAN stack developers excelled in it.",
      },
      {
        name: "MEAN Stack Web Development",
        body: "We equip secure, scalable, innovative, and advanced web app development with our expert knowledge in Express JS, Angular, and NodeJS.",
      },
      {
        name: "MEAN Stack CMS Development",
        body: "For SMEs businesses, we provide exceptional CMS development by our qualified MEAN stack developers. You can get flexible and feature-rich business CMS by hiring our Remote MEAN stack programmers.",
      },
      {
        name: "MEAN Stack API Development",
        body: "We at Soft Suave, help close the gaps in the digital world by building a backend with safe, scalable APIs. You may now connect to and access data in an easy and controlled way because of our expertise in API development and documentation.",
      },
      {
        name: "MEAN Stack Maintenance & Support",
        body: "You can work on other important aspects of your business, meanwhile, we offer extensive maintenance and support services. So you don't need to worry about anything. Our MEAN Stack developer's help is always there for you.",
      },
      {
        name: "MEAN Stack Integration & Migration",
        body: "We seamlessly move your legacy software products to MEAN Stack-based platforms with careful pre-migration preparation with many tests and strategies. To organize your migration, speak with Soft Suave's experienced MEAN stack experts.",
      },
    ],
  },

  midCta: {
    title: `Hire MEAN Stack Developers Starting from ${HOURLY_RATE}`,
    body: "We will provide you with remote MEAN stack developers that work from India. Contact us to take a look at the rate card.",
    cta: { label: "Request Rate Card", href: "/contact" },
  },

  process: {
    eyebrow: "Hiring Process",
    title: "Hire MEAN Stack Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: techSteps("MEAN Stack"),
  },

  whyUs: {
    eyebrow: "Why Soft Suave",
    title: "Why Are Our MEAN Stack Developers Considered the Best?",
    body: "Our strong team of remote MEAN Stack developers in India has complete expertise and exceptional knowledge in the front end, back end, databases, cloud deployment, and integration solutions.",
    items: techWhy("MEAN Stack", "MongoDB, Express, Angular, Node, APIs, and cloud"),
  },

  exploreMore: webExplore,

  faq: {
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs our clients ask.",
    items: [
      {
        q: "How do I hire a MEAN stack developer?",
        a: "You can hire MEAN Stack developers from Soft Suave which offers 1 week of risk-free trial for developers and select them based on the requirements on an hourly, monthly, or full-time basis. They also can work based on your timeline.",
      },
      {
        q: "How experienced are the remote MEAN Stack Developers at Soft Suave?",
        a: "Our dedicated offshore MEAN Stack programmers have significant experience in app development in a maximum of 6+ years.",
      },
      {
        q: "Why choose Soft Suave for hiring MEAN Stack resources?",
        a: [
          "Our MEAN Stack programmers are well experienced, and talented, have knowledge of Advanced technologies, and are constantly updated with new technologies and tools.",
          "Another important benefit of hiring from soft Suave is, that",
        ],
        points: [
          "you can choose who you want to work with.",
          "You can hire them based on your timeline.",
          "Flexible hire on an hourly, monthly, and full-time basis.",
          "1-week free trial for the developers before hiring.",
        ],
        pointsAfter: 1,
      },
      {
        q: "What are the benefits of hiring MEAN Stack Developers?",
        a: [
          "Hiring MEAN stack programmers are also in high demand since they work with a technology that allows them to produce high-performance digital solutions that are quick to build and execute.",
        ],
        points: [
          "MEAN allow Isomorphic coding.",
          "One developer can manage both Front End and Back End single-handed.",
          "The MEAN stack is faster in speed.",
          "Less development time because of the component's reusability principles.",
          "High performance & Scalability.",
        ],
      },
    ],
  },
};
