/**
 * Copy for the "Python Development" landing page
 * (`/python-application-development-company`).
 *
 * SOURCE: the live softsuave.com page of the same slug, reproduced section for
 * section. Like the Java and NodeJS pages — and unlike the Next.js /
 * TypeScript / GraphQL trio, whose copy came from a written brief — this page
 * is already live, so the live page IS the spec. It is server-rendered, so it
 * was fetched with `curl` and walked rather than driven through a browser.
 *
 * Nothing is added that the live page does not say, and no section of it is
 * dropped. The mapping, in live page order:
 *
 *   H1 + 2 paragraphs + enquiry form          → `pyHero`
 *   "Outsourcing Python Web Development …"    → `pyOverview`
 *   "Our Innovative Python Development …" (6) → `pyServices`
 *   "Hire Dedicated Python Developers"        → `pyHireCta`
 *   "Python App Development Technologies …"   → `pyTech` (3 groups, 14 tools)
 *   "What Our Clients Say About Us"           → homepage `Testimonials`
 *
 * The standfirst the live page prints under "Outsourcing Python Web
 * Development Solutions" is the same sentence it prints again under "Our
 * Innovative Python Development Services". Both are kept, as the live page
 * has them: it opens the overview and introduces the services band.
 *
 * The live page carries no clients strip, no benefits grid, no case studies,
 * no counters band and — unlike the PHP page beside it — no FAQ. None is
 * invented to fill the band rhythm, so this module exports no `FaqContent`
 * and the route renders no FAQ section. The testimonials band is the
 * homepage's own section rendered verbatim (see the route), because the live
 * page's copy for it IS the homepage's, to the word.
 *
 * Both outbound links the live page carries here — the hire band's sentence
 * and its button — point at `/hire-python-developers`, which this app serves
 * itself, so the CTA stays root-relative rather than going out to
 * softsuave.com (compare the NodeJS page, whose equivalent target this app
 * does not serve).
 *
 * Images: hand-placed under `public/images/landing/python/`, the same
 * convention `public/images/landing/nodejs/` established. All eight are
 * free-licence Pexels photographs cropped to each slot; ids, source URLs and
 * blur placeholders are in that folder's `credits.json`.
 */

import { partnerHeroBadges } from "./hero-badges";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServiceBoardContent } from "@/components/common/service-board";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { TechStackContent } from "@/components/landing/tech-stack";

export const pyMeta = {
  slug: "python-application-development-company",
  path: "/python-application-development-company",
  /**
   * The live page's `<title>` is "Python Development Company India - Soft
   * Suave Technologies". The route appends " | Soft Suave" as every page on
   * this surface does, so the brand is dropped here rather than shipped twice.
   */
  title: "Python Development Company in India",
  description:
    "Outsource python web development in India With a leading python development company in India and save upto 60% python development costs.",
} as const;

export const pyHero: HeroContent = {
  // The live H1, split so the last line takes the coral accent.
  titleLines: ["Best Python Development", "Company in India"],
  body: [
    "Tired of searching for a trustworthy Python Web Development Company in India? Soft Suave is your one-stop destination for all your Python application development needs.",
    "Want to Outsource Python Development Project? Get in touch for a free quote!",
  ],
  // The live hero's left column is the headline and these two paragraphs
  // alone — it carries no bullet list.
  points: [],
  badges: partnerHeroBadges,
  form: {
    eyebrow: "Let's Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    note: "This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The Python application you have in mind, who uses it, any data or machine-learning work it involves, and whether this is a new build, a migration onto Python, or an existing codebase to extend.",
    subject: "Python Application Development enquiry",
  },
  image: {
    src: "/images/landing/python/hero.webp",
    width: 1920,
    height: 1080,
    alt: "Close-up of colourful programming code displayed on a monitor screen",
    blurDataURL: "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAABwAQCdASoQAAkAA4BaJZACdAFAAAD+8naDNUZekgdRkpiJuo40bAr2I21NgCwhQAA=",
  },
};

export const pyOverview: OverviewContent = {
  eyebrow: "Python Web Development",
  title: "Outsourcing Python Web Development Solutions",
  paragraphs: [
    "We are a reliable custom Python Web Development Company operating more than 13+ successful years. Our best-in-class Python services include,",
    "Soft Suave is the leading Python development company in India that offers clients best-in-class solutions with the help of experienced developers who are experts in advanced Python development web framework, programming language and cutting-edge tools. Our developers show the finest commitment to deliver the highest level of customer service by creating innovative and customized Python solutions at an economical price.",
    "Our developers are also known for building custom solutions using Python to simplify complex software development. The Python applications from Soft Suave are developed in a way to handle the changes in the future technological trends.",
    "Soft Suave being the best Python web development company in India and the USA has all the technical capabilities and tools to develop web applications that matches the client requirements.",
  ],
  image: {
    src: "/images/landing/python/overview.webp",
    width: 1400,
    height: 1050,
    alt: "Developer in headphones coding on a laptop in a modern office",
    blurDataURL: "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAwAgCdASoQAAwAA4BaJZwAD5Yxe+9i0yO0IAD8As32dTEPYFivRzQqfbHDKDb4hVYkOqp33Esjky6gBIZx79kUf/B3imvj8Dwg3nZnbHXrpr77akfFOsy0I58J+P4YG+zCeRidAFgAAA==",
  },
};

/**
 * Six services, each carrying the two paragraphs the live page pairs with it.
 * Too long for cards and too long to run down the page, so they render as a
 * board: the six names to pick from, one stage to read on — the same section
 * the NodeJS, Android, React Native, Flutter, Ionic, Xamarin, .NET and Ruby
 * on Rails pages use.
 */
export const pyServices: ServiceBoardContent = {
  eyebrow: "Python Development Services",
  title: "Our Innovative Python Development Services",
  body: "We are a reliable custom Python Web Development Company operating more than 13+ successful years. Our best-in-class Python services include,",
  cta: { label: "Talk To Experts", href: "/contact" },
  items: [
    {
      name: "Custom Python Development",
      paragraphs: [
        "Python developers in Soft Suave apply their wide range of hands-on experience and technical knowledge in custom Python development. Python, known to support rapid application development, increases our scope to develop quality applications that cater requirements of our clients all over the world. Our Python developers use Python's integration capabilities to develop smooth and feature-rich applications that takes on competitor's applications with ease. We develop application with codes that are easy to read and maintain.",
        "Leveraging on the fact that Python is compatible with major platforms and systems, Soft Suave ceases this feature to develop the best custom application that fits the client's business.",
      ],
      image: {
        src: "/images/landing/python/svc-custom.webp",
        alt: "Close-up of a person coding on a laptop",
      },
    },
    {
      name: "Python Machine Learning Development",
      paragraphs: [
        "By leveraging data analysis and scientific computing libraries, Soft Suave implements machine learning algorithms at the best levels and gains the trust of the clients in the USA, Europe and Canada. Python's consistent syntax is too close to the standard English language, which persuades our developers to create machine learning algorithms that wins business for our clients. Considering the rapidly changing future technological trends, We develop solutions that are future-ready and gives a high level of competition in the market.",
        "Our developers not only implement your idea in the Python app but also make it successful in the market by customizing based on customer's needs. This makes us the reliable Python web development company in India and USA.",
      ],
      image: {
        src: "/images/landing/python/svc-ml.webp",
        alt: "Abstract artwork representing machine learning, rendered as digital text",
      },
    },
    {
      name: "Python CMS Development",
      paragraphs: [
        "Content Management System is the heart of the IT industry. Knowing the importance of CMS, our developers use advanced features of Python to develop scalable, user-friendly and secure content management systems. The availability of Python's open-source frameworks and tools helps us to develop time and cost-efficient CMS applications for the clients. The level of complexity in CMS is reduced with the integration of Python and the technical knowledge of our developers.",
        "The quality of CMS developed with Python in Soft Suave is the benchmark set in the industry. Thus, making us the leading Python development company in India and USA.",
      ],
      image: {
        src: "/images/landing/python/svc-cms.webp",
        alt: "Laptop showing a content dashboard with charts on screen",
      },
    },
    {
      name: "Python Hybrid Programming",
      paragraphs: [
        "Soft Suave is the best web application development company in India and the USA that extends flexibility to Python landscape with C/C++, Java or C# modules, and write Python scripts. Since Python has features that support various concepts of functional programming language, it enables many programmers to go for hybrid programming by facilitating easy implementation. A whole new generation of developers is going forward with Python hybrid programming to implement machine learning and scientific experiments to prototyping and data analysis.",
        "As an experienced Python development company, we help you to cope up with the growing trend and take business to the next level.",
      ],
      image: {
        src: "/images/landing/python/svc-hybrid.webp",
        alt: "Close-up of source code from more than one language on a computer screen",
      },
    },
    {
      name: "Python Migration & Upgradation",
      paragraphs: [
        "Our team of developers are the best in the Python development service industry, that migrate your web app from other platforms to Python or upgrade to the present version of Python with ease. Our developers are familiar and well-versed with Python programming and legacy app development services, which facilitates the smooth migration of your existing platform to Python.",
        "Soft Suave takes an extra step to ensure a smooth and seamless migration by helping out from the strategy planning to the implementation of the migration process.",
      ],
      image: {
        src: "/images/landing/python/svc-migration.webp",
        alt: "Close-up of server racks in a data centre",
      },
    },
    {
      name: "Python Maintenance & Support",
      paragraphs: [
        "Developers at Soft Suave are dedicated to providing test solutions that involve the most reliable testing and quality checks to give you the best application without errors. We also start from the phase of execution to provide you with world-class error-free applications that excel in quality and perfection. We also provide our clients with expert quality analysts from the initial stage of the project to make sure the application runs across all browsers and platforms.",
        "This not only makes Soft Suave the best Python development company but also the most trusted one in India and the USA.",
      ],
      image: {
        src: "/images/landing/python/svc-maintenance.webp",
        alt: "Computer screen displaying code alongside debug output",
      },
    },
  ],
};

/**
 * The live page's "Hire Dedicated Python Developers" band. Its button and the
 * link inside its sentence both point at `/hire-python-developers`, which
 * this app serves, so the CTA stays root-relative.
 */
export const pyHireCta: CtaBandContent = {
  eyebrow: "Hire A Team",
  title: "Hire Dedicated Python Developers",
  body: "Soft Suave has a pool of Python Developers who deliver your app development project on time and under your budget.",
  cta: { label: "Hire Python Developer", href: "/hire-python-developers" },
};

/**
 * The live page's three technology tabs, as the shared stack's groups. Names
 * go straight to `components/home/tech-logo.tsx`; Flask and Pyramid were the
 * only two of these fourteen without a mark there, and both were added with
 * this page rather than left on the generic glyph.
 */
export const pyTech: TechStackContent = {
  eyebrow: "Python Technologies",
  title: "Python App Development Technologies We Use",
  body: "Developers from Soft Suave are well versed in the following technologies to provide custom Python solutions.",
  groups: [
    { name: "Frameworks", items: ["Django", "Flask", "Pyramid"] },
    { name: "Platforms", items: ["AWS", "Azure", "Google Cloud"] },
    {
      name: "Database",
      items: [
        "MySQL",
        "MongoDB",
        "PostgreSQL",
        "AWS DynamoDB",
        "SQLite",
        "Cloud Firestore",
        "Oracle",
        "MS SQL Server",
      ],
    },
  ],
};
