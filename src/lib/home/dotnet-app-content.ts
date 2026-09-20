/**
 * Copy for the ".NET Application Development" landing page
 * (`/dot-net-application-development-company`).
 *
 * Every heading, paragraph and list item below is the live page's own copy,
 * extracted verbatim from
 * https://www.softsuave.com/dot-net-application-development-company. The page is
 * server-rendered, so it was fetched with `curl` and walked with jsdom rather
 * than driven through a browser — same DOM walk, no headless Chrome needed.
 * Each service's two paragraphs were read from its own `div.services_box`, so
 * the pairing below is the live page's, not a guess at where the copy splits.
 *
 * The design and the motion are this surface's; the words are not ours to
 * reword, and the live page's own spellings are kept, including "AWS DynomoDB",
 * "GoogleCloud" run together, "MySql", and "SharpLang" in its framework list.
 *
 * The section `eyebrow` kickers are the live page's own too — it sets them
 * above each H2 (`span.text-primary`, and `span.style-font` for the FAQs).
 *
 * Shapes match the prop types exported by the shared landing sections in
 * `components/landing/*` and `components/common/*`, so each section is
 * `<Component content={…} />` with no adapter in between.
 *
 * The testimonials band is the homepage's own section rendered verbatim (see
 * the route), because the live page's copy for it IS the homepage's, to the
 * word: "What Our Clients Say About Us" with the same standfirst.
 *
 * The live page carries no clients band, no industries grid and no case
 * studies, so none is emitted. Nothing is invented to fill the rhythm.
 */

import { partnerHeroBadges } from "./hero-badges";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServiceBoardContent } from "@/components/common/service-board";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { FaqContent } from "@/components/landing/faq";

export const netMeta = {
  slug: "dot-net-application-development-company",
  path: "/dot-net-application-development-company",
  /**
   * The live page's `<title>` is "Trusted .NET Development Company in India for
   * Your Business". The route appends " | Soft Suave" as every page on this
   * surface does, so it is trimmed to the name rather than shipped as a
   * sentence with the brand twice over.
   */
  title: ".NET Development Company in India",
  description:
    "Leading .NET development company in India delivering custom solutions for seamless, high-performance web applications and enterprise software.",
} as const;

export const netHero: HeroContent = {
  // The H1, split so the last line takes the coral accent.
  titleLines: [".NET Development", "Services"],
  body: [
    "Tired of searching a reliable custom .NET Development Company in India? Soft Suave is your one-stop destination for all your .NET App development needs.",
    "Want to hire an offshore .NET Application Development Team? Get in touch for a free quote!",
  ],
  // The live page's hero carries no bullet list — its left column is the
  // headline and these two paragraphs alone.
  points: [],
  // The four trust badges this surface shows beside every enquiry form.
  badges: partnerHeroBadges,
  form: {
    // The live page's own form heading and sub-line.
    eyebrow: "Let’s Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    note: "Tell us what the application has to do and which systems it has to work with, and we come back with an approach, timeline, and estimate. Everything stays under NDA.",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The application you have in mind, who uses it, anything it has to integrate with, and whether this is a new build or an existing .NET estate to extend or migrate.",
    subject: ".NET Application Development enquiry",
  },
  image: {
    src: "/images/landing/dotnet/hero.webp",
    width: 1920,
    height: 1080,
    alt: "A .NET application under development on a developer's screens",
    blurDataURL:
      "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAACwAQCdASoQAAkAA4BaJZwAAl26d+/wAP71vOPu8ybHM7E14mg8K2jsKC6nhAEsIxNdDMHPveG8gDhgUo4AAA==",
  },
};

export const netOverview: OverviewContent = {
  eyebrow: ".NET Development Company",
  title: ".NET Development Company That Brings Your Vision To Life",
  paragraphs: [
    "With extensive expertise in .NET, we provide top-notch ASP.NET development services as one of the most experienced ASP.NET Web Development Companies. Our custom, success-proven solutions span various industry domains, ensuring the best-in-class .NET solutions for your business.",
    ".NET is the choice of many customers due to its flexibility and efficiency in developing complex web applications, providing user engagement, and improving productivity. As a leading .NET Development Company in India, Soft Suave helps clients from diverse industries to create user-centric applications.",
    "We define the best strategy for providing customized .NET Web Development Services using the most advanced technologies and frameworks. Moreover, our .NET developers implement creative and innovative ideas to serve our clients with even better applications.",
    "Understanding client requirements and building applications is an ongoing process in Soft Suave. Hence, we are known for the exceptional ASP.NET application development with shorter development time and lower costs.",
  ],
  image: {
    src: "/images/landing/dotnet/overview.webp",
    width: 1400,
    height: 1050,
    alt: "C# source code on screen, the language a .NET application is written in",
    blurDataURL:
      "data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAABwAQCdASoQAAwAA4BaJYwC7AGIQAD+8fPftHP8UkfoOTXyX7DxL2U/swAAAA==",
  },
};

/**
 * Six services, each carrying the two paragraphs the live page pairs with it.
 * Too long for cards and too long to run down the page, so they render as a
 * board: the six names to pick from, one stage to read on. Same section the
 * Android, React Native, Flutter, Ionic and Xamarin pages use.
 */
export const netServices: ServiceBoardContent = {
  eyebrow: ".NET Development Services",
  title: "Full-Cycle .NET Development Services For Your Business",
  body: "With the help of the best-skilled ASP.NET development team with talented developers, designers, project managers, and business analysts, we deliver high-quality results.",
  cta: { label: "Talk To Experts", href: "#enquiry" },
  items: [
    {
      name: "Custom .NET Development",
      paragraphs: [
        "Our expertise lies in making use of ASP.NET technology to deliver high-performance, custom web application development services tailored to your business needs. Regardless of project complexity, we aim to provide the best solutions.",
        "As a prominent .NET development company, we built various apps with high scalability and efficient performance across multiple devices. With the profound knowledge of our .NET developers, we have been able to implement prominent security features in our tailor-made solutions.",
      ],
      image: { src: "/images/landing/dotnet/svc-custom.webp", alt: "" },
    },
    {
      name: "Dedicated .NET Developer Team",
      paragraphs: [
        "We use .NET technology to build attractive and fast web and desktop applications that meet the latest standards, allowing complete flexibility to enhance the user experience and meet business requirements.",
        "Our dedicated .NET development team follows a pattern-driven approach, using an agile methodology to deliver customized mobile applications that best represent our clients’ businesses.",
      ],
      image: { src: "/images/landing/dotnet/svc-team.webp", alt: "" },
    },
    {
      name: "Third-Party .NET Customization",
      paragraphs: [
        "Apart from .NET Mobile App Development and web development, Soft Suave also takes care of third-party .NET customization solutions. Our crew of professionals strives to provide your business with the utmost support in every requirement- from UI improvement to API development. We also help with maintainability, technical support, UI skinning, and enhancement of functionality.",
        "As an ASP.NET development service company, we have skilled software engineers who have more than 5 years of experience. This helps them to bring your project to life by making use of the industry's best App development methods and practices.",
      ],
      image: { src: "/images/landing/dotnet/svc-customization.webp", alt: "" },
    },
    {
      name: "ASP.NET Consulting Services",
      paragraphs: [
        "The flexibility of the .NET Framework empowers our developers to craft powerful and safe applications. With more than 13+ years of experience in the field, we as a company help SMBs and startups gain the ultimate digital presence with our programming expertise.",
        "Procure quality, industry/international-standard ASP.NET consulting services by utilizing our .NET developers' talents. We understand that every business has its requirements, and strive to make sure the projects are tailored to meet these unique demands.",
      ],
      image: { src: "/images/landing/dotnet/svc-consulting.webp", alt: "" },
    },
    {
      name: "ASP.NET Enterprise Solutions",
      paragraphs: [
        "Being the leading ASP.NET Development Company India, we craft enterprise-grade .Net web and mobile Apps. Implementing our .NET solutions not only simplifies your business processes but also enhances the business by accelerating revenues.",
        "Offering a wealth of knowledge, we supply solutions keeping in mind the goals of the company, that effectively solve our clients’ business challenges. With our .Net development services, you get world-class enterprise Apps with the best strategic solutions for your business.",
      ],
      image: { src: "/images/landing/dotnet/svc-enterprise.webp", alt: "" },
    },
    {
      name: ".NET Support & Maintenance",
      paragraphs: [
        "An App needs uninterrupted support and maintenance, in other words, post-deployment services to make sure it performs well and stays up to date. Hence, our .NET development team always examines App for enhancing existing features, cloud, and mobility-related functionalities and bug-fixing.",
        "We pride ourselves in our continued post-project support, and this has contributed to us being an established ASP.NET Web Development company. We additionally offer our support to enhance existing applications and provide complete support from start to finish to fulfill evolving commercial enterprise needs.",
      ],
      image: { src: "/images/landing/dotnet/svc-support.webp", alt: "" },
    },
  ],
};

/** The live page's band between the services and the technology stack. */
export const netHireCta: CtaBandContent = {
  eyebrow: "Hire A Team",
  title: "Hire an Offshore .NET Application Development Team",
  body: "Soft Suave has a pool of Dedicated .NET Developers who deliver your app development project on time and under your budget.",
  cta: { label: "Hire .NET Developer", href: "#enquiry" },
};

/**
 * The live page's three technology tabs, as the shared stack's groups. Names go
 * straight to `components/home/tech-logo.tsx`; the ones with no mark there fall
 * back to the generic glyph.
 */
export const netTech: TechStackContent = {
  eyebrow: ".NET Application Development",
  title: "Our Expertise in .NET Application Development Technologies",
  body: "Soft Suave's .NET developers work across the frameworks, databases and cloud platforms below.",
  groups: [
    { name: "Frameworks", items: ["ASP.NET Core", "C#", "VB.NET", "SharpLang", "Blazor"] },
    {
      name: "Database",
      items: [
        "MySql",
        "MongoDB",
        "PostgreSQL",
        "AWS DynomoDB",
        "SQLite",
        "Cloud Firestore",
        "Oracle",
        "MS SQL Server",
      ],
    },
    // "GoogleCloud" is the live page's own spelling, run together.
    { name: "Clouds", items: ["AWS", "Azure", "GoogleCloud", "Rackspace"] },
  ],
};

export const netFaqs: FaqContent = {
  eyebrow: "Questions",
  title: "Frequently Asked Questions",
  body: "Know more about our processes and how we work, with the help of the following FAQs.",
  items: [
    {
      q: "How much does it cost to build an ASP.NET application?",
      // `points` renders after the first paragraph — the line that introduces
      // the list — and the closing remark follows underneath it.
      a: [
        "It depends on;",
        "Talk to our project managers to know the exact cost to Develop .NET Applications.",
      ],
      points: [
        "App complexity",
        "Number of features to be added",
        "App design and functionality",
        "Development platform",
      ],
    },
    {
      q: "How will you assign the resources for my .NET web App development?",
      a: "We carefully analyze your requirements and assign resources that fit your hiring model.",
    },
    {
      q: "What are the advantages of the dot net framework for software development?",
      a: ".NET is one of the best frameworks that have the following advantages;",
      points: [
        "Operational Simplicity",
        "Consistency",
        "Reliability & Scalability",
        "Flexible Deployment",
        "Security & Safety",
        "Simple Caching System",
        "Interoperability",
        "Code Reusing",
      ],
    },
    {
      q: "Should I migrate my application to .NET core?",
      a: "If your existing App requires cross-platform support, microservice architecture, and containers, or improved performance, then it is a wise choice to migrate to the .NET core.",
    },
  ],
};
