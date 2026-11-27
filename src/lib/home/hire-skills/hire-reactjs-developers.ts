/**
 * The `hire-reactjs-developers` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-reactjs-developers/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { techSteps, techWhy } from "../hire-blocks";
import { HOURLY_RATE } from "../../company-figures";

export const skill: HireSkill = {
  closingCtaIcon: true,
  clientsWideTitle: true,
  slug: "hire-reactjs-developers",
  key: "react",
  name: "ReactJS",
  role: "ReactJS Developers",
  metaTitle: "Hire ReactJS Developers India with 40 Hours Risk-free Trial",
  metaDescription:
    "Hire ReactJS developers India from Soft Suave on an hourly/full-time basis and save 60% on best-in-class ReactJS app development. Enquire here.",
  serviceType: "ReactJS development staffing",
  ctaLabel: "Hire ReactJS developers",

  order: ["overview", "services", "midCta", "process", "whyUs", "exploreMore", "testimonials", "faq"],

  hero: {
    titleLines: ["Hire ReactJS Developers", "In India On contract"],
    accent: "ReactJS Developers",
    body: [
      "SoftSuave helps businesses hire pre-vetted ReactJS developers from India for faster frontend delivery and lower hiring costs. Our developers specialize in React.js, Next.js, TypeScript, Redux, UI modernization, SPA development, and scalable web applications. Get contract-ready talent onboarded quickly with flexible engagement models.",
      "See why businesses choose Soft Suave for their ReactJS developers hiring.",
    ],
    points: [
      "40-Hour Risk-Free Trial",
      "Hire Top ReactJS Developers in India",
      "Time-Zone & Language Aligned Teams",
      "Airtight NDA & IP Protection",
      "Strong Delivery Governance from Day One",
    ],
    form: {
      submitHover: 'black',
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your ReactJS requirement.",
      subject: "ReactJS Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-react-hero.webp",
      width: 1800,
      height: 900,
      alt: "Laptop showing code in a dark room lit with blue lights",
      blurDataURL:
        "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAwAgCdASoQAAsAA4BaJbACdAD2PPErD64/AAD+94JCqSUNodRi4kKw8wSKPXCmD8vSwy9qZYXL0j5+aPlLbqQIJjW4AA==",
    },
  },

  overview: {
    wideHead: true,
    // 4:3 bordered rounded frame centred against the prose, matching
    // /global-capability-center's overview treatment.
    image: {
      src: "/images/landing/ov-hire-reactjs-developers-tall.webp",
      width: 1000,
      height: 1250,
      alt: "React JSX component code on a monitor",
      blurDataURL:
        "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAQCdASoJABAAA4BaJYwAAud9plYAAP74Z8fIoeb+U966Kek0QSANmPB3TAAA",
      aspect: "4 / 3",
      align: "center",
      rounded: true,
      bordered: true,
    },
    eyebrow: "Overview",
    title: "Hire Top ReactJS Developers in India from Soft Suave",
    paragraphs: [
      "Reach the target audience effectively and grow your follower base by working with our ReactJS developers.",
      "Soft Suave offers the best React Developers in India for scalable web development projects and faster front-end solutions. Our React.js app developers hold an average of 5+ years of experience and have the commendable skillset to deliver the most interactive web apps. Our dedicated developers work as a team to help you develop scalable, faster, and quality solutions. We enable you to hire ReactJS programmers online on an hourly, monthly and full-time basis.",
      "Our React.JS app experts leverage the exceptional features like code reusability, faster rendering to save 60% on ReactJS development. With us, you can hire an individual remote developer or set up a dedicated team according to your requirements.",
      "Hire the best ReactJS developers in India if you expect excellent communication skills, end-to-end project support and on-time delivery assurance. When you hire dedicated React.JS app developers from Soft Suave, you get products with a 98% success rate at 2X faster turnaround time than competitors. Our certified app developers have a proven track record of easily understanding any complex requirements and delivering creative solutions. Get in touch for a free 1-week free trial to test and hire React developers in India.",
    ],
  },

  services: {
    wideHead: true,
    eyebrow: "Expertise",
    title: "Soft Suave's ReactJS Developers Expertise",
    body: "Hire Reactjs developers from Soft Suave to boost your business growth and add a competitive edge.",
    items: [
      {
        name: "ReactJS UI/UX Development",
        body: "ReactJS developers at Soft Suave have the latest trends of UI/UX design at their fingertips. You can be rest assured to get the most creative yet user-friendly designs that attract customers to use your application.",
      },
      {
        name: "Customized React Web Development",
        body: "Hire top-notch ReactJS programmers from Soft Suave to get the most beneficial and customized React web development at a competitive cost. Develop SPAs and real-time data exchange applications seamlessly with 100% guaranteed success.",
      },
      {
        name: "ReactJS CMS & E-commerce Development",
        body: "CMS and e-commerce development can turn into misery if the right developers do not handle it. Soft Suave has the perfect pool of ReactJS developers that develop innovative yet user-friendly CMS and e-commerce apps.",
      },
      {
        name: "ReactJS Support & Maintenance",
        body: "Our ReactJS developers do not stop just with development services; they have immense talent and proficiency to go the extra mile and provide support and maintenance at an economical cost for startup clients and SMBs.",
      },
      {
        name: "ReactJS Plugin Development",
        body: "Hire the best app developers in India today and develop ReactJS plugins for your application in no time. The experience of the developers works handy to develop plugins that extend the functionality of your application.",
      },
      {
        name: "ReactJS Integration & Migration",
        body: "Integration and migration are made simple when you hire the best developers in India at Soft Suave. Our programmers' proficiency helps you in integrating any API and migrating to ReactJS seamlessly.",
      },
    ],
  },

  midCta: {
    title: `Hire React Developers Starting from ${HOURLY_RATE}`,
    body: "We will provide you with remote react developers that work from India. Contact us to take a look at CVs.",
    cta: { label: "Request Rate Card", href: "/contact" },
  },

  process: {
    wideHead: true,
    eyebrow: "Hiring Process",
    title: "Hire ReactJS Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: techSteps("ReactJS"),
  },

  whyUs: {
    wideHead: true,
    eyebrow: "Why Soft Suave",
    title: "What Makes Our ReactJs Developers Unique and Trustworthy?",
    body: "Hire ReactJS developers from us who have 5+ years of average experience and excellent coding skills.",
    items: techWhy("ReactJS", "React.js, Next.js, TypeScript, Redux, APIs, and cloud"),
  },

  exploreMore: {
    ...webExplore,
    wideHead: true,
  },

  faq: {
    wideHead: true,
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs our clients ask.",
    // Matches the live page's own links, inside the industries-experience
    // answer (review: "internal links missing in the FAQs"). Live links
    // four of the seven industries named there; the rest stay plain text,
    // same as live.
    links: [
      { text: "Healthcare", href: "https://www.softsuave.com/healthcare-mobile-app-development-company" },
      { text: "Retail", href: "https://www.softsuave.com/ecommerce-mobile-app-development-company" },
      { text: "Education", href: "https://www.softsuave.com/education-app-development-company" },
      { text: "Construction", href: "https://www.softsuave.com/construction-employee-time-tracking-app" },
    ],
    items: [
      {
        q: "How much does it cost to hire ReactJS developers from Soft Suave?",
        a: `Soft Suave is renowned for having the dedicated Reactjs developers in India. You can hire expert ReactJS developers at a reasonable cost of ${HOURLY_RATE}. Additionally, all our React.js app developers are senior developers and have vast experience in the industry.`,
      },
      {
        q: "Is it possible to migrate an app from other technologies to ReactJS?",
        a: "Yes, our ReactJS app developers have significant hands-on experience in app migration, so your app migration can be seamlessly done without any data leakage or risks.",
      },
      {
        q: "Will I have full control over the developer I hire?",
        a: "When you hire ReactJS developers from us, you get the privilege to have full control over the ReactJS app developers. Moreover, they will be dedicated to your tasks and committed to your business goals. You can also align the communication according to your time zone and get daily reports accordingly.",
      },
      {
        q: "What are the various hiring models offered by you to hire ReactJS experts?",
        a: [
          "We have curated three hiring models keeping our valuable clients in our minds.",
        ],
        points: [
          "Full-time Basis",
          "Part-time Basis",
          "Milestone Basis",
        ],
      },
      {
        q: "What are the industries that are served by your ReactJS programmers?",
        a: "When you hire ReactJS developers from us, you get ReactJS app developers that have experience in industries like Healthcare, Finance, Retail, Education, Real estate, Construction, Entertainment, and Law firms.",
      },
      {
        q: "How do I test your React.js developer's expertise?",
        a: "If you want to hire our ReactJS app developers after testing, Soft Suave is open for Skype understand our developers' expertise in the app development industry.",
      },
    ],
  },
};
