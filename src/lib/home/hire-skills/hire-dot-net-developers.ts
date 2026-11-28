/**
 * The `hire-dot-net-developers` record, in a module of its own so that route's client
 * wrapper (`app/(marketing)/hire-dot-net-developers/sections.tsx`) imports this one page's
 * copy and not the whole registry (`hire-skills.ts`), which carries all twenty.
 */

import type { HireSkill } from "../hire-skill";
import { sharedHeroAlert } from "../delivery-shared";
import { webExplore } from "../hire-explore";
import { techSteps, techWhy } from "../hire-blocks";
import { HOURLY_RATE } from "../../company-figures";
import { CLASSIC_ORDER } from "./backend-shared";

export const skill: HireSkill = {
  closingCtaIcon: true,
  clientsWideTitle: true,
  slug: "hire-dot-net-developers",
  key: "dotnet",
  name: ".NET",
  role: ".NET Developers",
  metaTitle: "Hire Dot Net Developers India with 40 Hours Risk-free Trial",
  // Live's own description, with its price filled in: the meta tag there
  // reads "starting at /hour" (Java: "0/hour"), while the page quotes
  // $14/hour throughout.
  metaDescription:
    `Looking to hire .Net developers India ? Outsource ASP.Net application developer to build high-quality web applications starting at ${HOURLY_RATE}.`,
  serviceType: ".NET development staffing",
  ctaLabel: "Hire .NET developers",

  order: [...CLASSIC_ORDER],

  hero: {
    titleLines: ["Hire .NET Developers", "in India on Contract"],
    accent: ".NET Developers",
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
      submitHover: 'black',
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your .NET requirement.",
      subject: ".NET Developers enquiry",
      alert: sharedHeroAlert,
    },
    // A photo for this technology, darkened by the strong veil `HirePage`
    // applies (review: "update the images and add a black gradient").
    image: {
      src: "/images/landing/hs-dotnet-hero.webp",
      width: 1800,
      height: 900,
      alt: "C# project files and version history open in an IDE",
      blurDataURL:
        "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAQCdASoQAAsAA4BaJZQAAug7L2HQAAD+7ydkqmjuNB6VEDOd86EsWXe/h9+DjVcbiX7/AKYAAA==",
    },
  },

  overview: {
    wideHead: true,
    // Internal links in the second paragraph (review: "internal link missing
    // in the 2nd paragraph"). The live page has none to copy, so each is a
    // phrase already in the copy, pointed at the matching service page.
    links: [
      { text: "Web App Development Company", href: "/web-application-development-company" },
      { text: "ASP.NET development services", href: "/dot-net-application-development-company" },
    ],
    eyebrow: "Overview",
    title: "Hire Remote .NET Developer At The Right Place",
    paragraphs: [
      "Accelerate your business to a whole new level by connecting with our seasoned .NET developers.",
      "Soft Suave is a reputed Web App Development Company that houses world-class remote ASP.NET developers. Our .NET web developers are proficient in building powerful and scalable Web Apps under your budget. When you hire our dedicated ASP.NET developer, you get to work alongside programmers who have experience working with start-ups and SMBs worldwide. Our certified .NET professionals have in-depth knowledge of .NET frameworks and will go beyond their duty to provide competitive web app development. Soft Suave assures you in delivering successful ASP.NET development services with the help of our developers who have technical expertise coupled with experience in the agile development methodology.",
      "Hire .NET developers from Soft Suave to accelerate your business in a new direction and have a competitive edge in the market. Our dot net developer's exceptional experience in all the latest tools, technologies and systems assist us to build robust web apps. Whether you are building industry-specific desktop Apps or complex web Apps, our ASP.NET programmers can get it started for you and deliver tech-driven solutions. When you hire our 5+ years experienced .NET developer, you can tackle any tedious business or development challenges effortlessly.",
    ],
  },

  services: {
    wideHead: true,
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
    title: `Hire .Net Developers Starting from ${HOURLY_RATE}`,
    body: "We will provide you with remote .Net developers that work from India. Contact us to take a look at CVs.",
    cta: { label: "Request Rate Card", href: "/contact" },
  },

  process: {
    wideHead: true,
    eyebrow: "Hiring Process",
    title: "Hire .Net Developers in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: techSteps(".NET"),
  },

  whyUs: {
    wideHead: true,
    eyebrow: "Why Soft Suave",
    title: "Why Are Our .Net Programmers Considered the Best?",
    body: "Clients all around the world trust our .NET developers to acquire industry-specific .NET solutions with quality.",
    items: techWhy(".NET", "ASP.NET, .NET Core, C#, Azure, MVC, and APIs"),
  },

  exploreMore: {
    ...webExplore,
    wideHead: true,
  },

  faq: {
    wideHead: true,
    eyebrow: "FAQs",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs.",
    items: [
      {
        q: "What are the various hiring models offered by you to hire .NET developers?",
        a: [
          "Soft Suave has designed three flexible hiring models to help you hire .NET developers who are experts in providing .NET solutions. We also offer customized plans fit that your budget and requirement.",
        ],
        points: [
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
