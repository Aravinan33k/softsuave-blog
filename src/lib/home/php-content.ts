/**
 * Copy for the "PHP Development" landing page
 * (`/php-application-development-company`).
 *
 * SOURCE: the live softsuave.com page of the same slug, reproduced section for
 * section. Like the Java, NodeJS and Python pages, this one is already live,
 * so the live page IS the spec. It is server-rendered, so it was fetched with
 * `curl` and walked rather than driven through a browser.
 *
 * Nothing is added that the live page does not say, and no section of it is
 * dropped. The mapping, in live page order:
 *
 *   H1 + 2 paragraphs + enquiry form          → `phpHero`
 *   "PHP Development Services To Maximize …"  → `phpOverview`
 *   "Diverse PHP Development Services …" (6)  → `phpServices`
 *   "Need Dedicated PHP Developers?"          → `phpHireCta`
 *   "Topmost Technologies Used By Soft Suave" → `phpTech` (4 groups, 20 tools)
 *   "What Our Clients Say About Us"           → homepage `Testimonials`
 *   "Frequently Asked Questions"              → `phpFaqs` (5)
 *
 * This is the Python page's twin — same slug family, same section set — with
 * one difference: the PHP page carries an FAQ and the Python page does not.
 *
 * The live page carries no clients strip, no benefits grid, no case studies
 * and no counters band. None is invented to fill the band rhythm. The
 * testimonials band is the homepage's own section rendered verbatim (see the
 * route), because the live page's copy for it IS the homepage's, to the word.
 *
 * Every link the live page carries in this content points at
 * `/hire-php-developers` — written there as an absolute softsuave.com URL,
 * because the live page has no notion of a relative site. This app serves
 * that page itself, so the links are root-relative here.
 *
 * Two quirks of the live copy are left as they are rather than silently
 * rewritten: "Fred not" in the eCommerce paragraph (for "Fear not"), and the
 * MS SQL Server technology blurb, which describes LoopBack rather than SQL
 * Server. Both are the live page's words and the point of this module is to
 * carry them, not to edit them; fixing either is a copy decision for whoever
 * owns the page.
 *
 * The FAQ's third answer carries a bulleted list. On the live page each
 * bullet is wrapped in an anchor to `#service_box_0n`, an in-page target that
 * does not exist in that section — dead links, so the bullets are plain text
 * here, which is what they read as anyway.
 *
 * Images: hand-placed under `public/images/landing/php/`, the same convention
 * `public/images/landing/nodejs/` established. All eight are free-licence
 * Pexels photographs cropped to each slot; ids, source URLs and blur
 * placeholders are in that folder's `credits.json`.
 */

import { partnerHeroBadges } from "./hero-badges";
import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServiceBoardContent } from "@/components/common/service-board";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { TechStackContent } from "@/components/landing/tech-stack";
import type { FaqContent } from "@/components/landing/faq";

export const phpMeta = {
  slug: "php-application-development-company",
  path: "/php-application-development-company",
  /**
   * The live page's `<title>` is "PHP Development Company in India - Soft
   * Suave". The route appends " | Soft Suave" as every page on this surface
   * does, so the brand is dropped here rather than shipped twice.
   */
  title: "PHP Development Company in India",
  description:
    "Looking for PHP Development Company in India? Soft Suave is an award winning development company offering customized development Solution.",
} as const;

export const phpHero: HeroContent = {
  // The live H1, split so the last line takes the coral accent.
  titleLines: ["PHP Development", "Company in India"],
  body: [
    "Tired of searching for a reliable & trustworthy PHP Web Development Company In India? Soft Suave is your one-stop solution for all your PHP application development needs.",
    "Are you looking to Outsource PHP Development Services? Get in touch for a free quote!",
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
      "The PHP application you have in mind, who uses it, whether it is a storefront, a portal or a CMS, anything it has to integrate with, and whether this is a new build or an existing site to extend or upgrade.",
    subject: "PHP Application Development enquiry",
  },
  image: {
    src: "/images/landing/php/hero.webp",
    width: 1920,
    height: 1080,
    alt: "Close-up of PHP code displayed on a computer screen",
    blurDataURL: "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAABwAQCdASoQAAkAA4BaJZ12AAHJgAD+9Csg+g8xps1GSn8j74TAAA==",
  },
};

export const phpOverview: OverviewContent = {
  eyebrow: "PHP Web Development",
  title: "PHP Development Services To Maximize Your Business Growth",
  paragraphs: [
    "With our best-in-class PHP web development services we cater to the needs of global as well as domestic clients.",
    "Soft Suave is a top-of-the-line PHP Web Development Company in India operating for more than 13+ years winning the trust and loyalty of our respectful customers. Being an experienced PHP development company, we leverage the power of this server-side scripting language and combine our HTML5 skills with PHP knowledge to create responsive and secure applications.",
    "We consistently craft creative, unique, and attractive solutions, thanks to our skillful development team of qualified PHP developers, designers, analysts, and project managers. Besides, having a strong team specialized in PHP assists us to develop web Apps with superior performance, greater reliability, and scalable functionality. To achieve such results, we always utilize a range of PHP extensions and libraries so we can integrate all the latest extensions in our client's projects.",
    "To ensure our PHP Application Development Solutions attracts end-users, we pay special attention to our PHP professionals and constantly nourish them with personnel training, motivation, knowledge sharing, and performance monitoring.",
  ],
  image: {
    src: "/images/landing/php/overview.webp",
    width: 1400,
    height: 1050,
    alt: "Two programmers working together at a desk in a modern office",
    blurDataURL: "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAwAgCdASoQAAwAA4BaJZQC7AD/SedtwrrMgAD+5vqgH9qp35mxsI/sL7ckv+4NilkblUpaTfGIAO4YAVXwUrxCnV/YTW5ZKJAD+vFccywkVzG3RN1ImxoIGP1nMVBOfopOjAAA",
  },
};

/**
 * Six services, each carrying the two paragraphs the live page pairs with it.
 * Too long for cards and too long to run down the page, so they render as a
 * board: the six names to pick from, one stage to read on — the same section
 * the NodeJS, Python, Android, React Native, Flutter, Ionic, Xamarin, .NET
 * and Ruby on Rails pages use.
 */
export const phpServices: ServiceBoardContent = {
  eyebrow: "PHP Development Services",
  title: "Diverse PHP Development Services To Build Dynamic Applications",
  body: "Our expertise in PHP frameworks encompasses a broader span of world-class features and functionalities that help businesses gain an enormous web presence.",
  cta: { label: "Talk To Experts", href: "#enquiry" },
  items: [
    {
      name: "PHP Web App Development",
      paragraphs: [
        "Do you know what Wikipedia, Tumblr, Flickr, MailChimp, and Canva have in common? This software has been built with the power of PHP.",
        "Being a scalable server-side scripting language, PHP is used to manage dynamic content, databases, and session tracking. Moreover, it is integrated with a number of popular databases like MySQL, PostgreSQL, Oracle, Sybase, Informix, and Microsoft SQL Server. Our developers have extensive expertise in PHP through which we provide PHP Web Development that includes seamless customization with MySQL, easy maintenance, and high compatibility with different operating systems. Our Apps would not just look great but will be loved by your target audience.",
      ],
      image: {
        src: "/images/landing/php/svc-webapp.webp",
        alt: "Close-up of colourful code on a laptop screen",
      },
    },
    {
      name: "Custom eCommerce Development",
      paragraphs: [
        "If you are looking to build a highly-innovative, attractive, user-friendly eCommerce web App, you've come to the right place. Building an eCommerce web application that's unique for each business is no easy task. Fred not, eCommerce development is one of our core competencies where we craft Apps with an easy-to-use interface and rich UI/UX design.",
        "As an elite PHP Development Company in India, we can work with any complex business process and design eCommerce Apps to help our clients achieve the maximum ROI. Moreover, our outputs offer a magnificent user experience to the visitors.",
      ],
      image: {
        src: "/images/landing/php/svc-ecommerce.webp",
        alt: "Person holding a credit card while shopping online on a laptop",
      },
    },
    {
      name: "Enterprise Portal Development",
      paragraphs: [
        "Our expert PHP developers are specialized in creating comprehensive web portals for enterprises that can be deployed in a large network in the future. We carefully analyze our client's specific needs and offer apt portal development solutions.",
        "Our enterprise portal solutions integrate information access, workflow management, and connection with third-party online services to provide a rich user interface and content delivery. Our implementation satisfies current and future organizational requirements. Plus, we guarantee a smooth portal implementation and functionality testing & delivery.",
      ],
      image: {
        src: "/images/landing/php/svc-portal.webp",
        alt: "Tablet displaying analytics charts on an office desk",
      },
    },
    {
      name: "OpenSource CMS Development",
      paragraphs: [
        "Soft Suave, with its combined experience of 13+ years, has dealt with a plethora of PHP Web Application Development projects including CMS solutions. We have the expertise and experience to deal with any Open Source CMS regardless of its complexity or duration. Whether you require a small and compact web App or a complex e-commerce web application, we can address all your requirements. Soft Suave would be honored to start a business relationship with you.",
        "Our PHP experts have the knowledge and experience to provide you with matchless PHP-based CMS development, ensuring that your final PHP-based output is in line with your business plan.",
      ],
      image: {
        src: "/images/landing/php/svc-cms.webp",
        alt: "Hands typing on a laptop with a blog post open on screen",
      },
    },
    {
      name: "Dedicated PHP Developer Team",
      paragraphs: [
        "As a full-stack PHP development company, we have a strong PHP team of PHP that provides a high level of qualitative deliverables to our clients at all times. Also, our dedicated PHP project manager assures all our Apps are of the best quality and perform well in the market.",
        "Hire PHP developers from us on a Fixed cost, Full time or Hourly basis, and acquire a competitive edge in the marketplace. Plus, our feature-rich, fast, and scalable PHP solutions meet the needs of B2B, B2C, B2B2C businesses ranging from an array of industries.",
      ],
      image: {
        src: "/images/landing/php/svc-team.webp",
        alt: "A team of professionals working through a problem at a whiteboard",
      },
    },
    {
      name: "PHP Support & Maintenance",
      paragraphs: [
        "Our job doesn't end after we deliver your App. Every software needs to be updated regularly in order to fix issues or add new features. We always seek and value long-term relationships with all our clients. Hence, we render 360-degree support and maintenance services. These services include any solution-related issues like functionality issues, bug issues, or errors. This helps you to make sure applications are highly available, reliable, and relevant to evolving business needs.",
        "Our PHP Developers will be ready 24×7 providing top-class support and maintenance services for your PHP App along with regular updates enhancing the seamless performance of your Apps.",
      ],
      image: {
        src: "/images/landing/php/svc-support.webp",
        alt: "IT professional working at a computer in a modern office",
      },
    },
  ],
};

/**
 * The live page's "Need Dedicated PHP Developers?" band. Its button points at
 * `/hire-php-developers`, which this app serves, so the CTA stays
 * root-relative rather than leaving for softsuave.com.
 */
export const phpHireCta: CtaBandContent = {
  eyebrow: "Hire A Team",
  title: "Need Dedicated PHP Developers?",
  body: "Soft Suave has a pool of certified and experienced PHP developers who deliver your app development project on time and under your budget.",
  cta: { label: "Hire PHP Developers", href: "/hire-php-developers" },
};

/**
 * The live page's four technology tabs, as the shared stack's groups. Names
 * go straight to `components/home/tech-logo.tsx`; Sass, Laravel, CakePHP,
 * CodeIgniter, Zend, Yii, SOAP, JSON and AJAX had no mark there, and all nine
 * were added with this page rather than left on the generic glyph — a stack
 * where half the chips fall back reads as broken, which is exactly the case
 * `TechStack`'s `logos` switch exists for.
 */
export const phpTech: TechStackContent = {
  eyebrow: "PHP Technologies",
  title: "Topmost Technologies Used By Soft Suave",
  body: "To ensure elite PHP web development services, our developers always utilize proven technologies.",
  groups: [
    { name: "Frontend", items: ["HTML", "Sass", "Javascript"] },
    { name: "Frameworks", items: ["Laravel", "CakePHP", "CodeIgniter", "Zend", "Yii"] },
    { name: "Web Services", items: ["SOAP", "XML", "JSON", "AJAX"] },
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

/** The live page's five FAQs, questions and answers verbatim. */
export const phpFaqs: FaqContent = {
  eyebrow: "Questions",
  title: "Frequently Asked Questions",
  body: "Know more about our processes and how we work, with the help of the following FAQs.",
  items: [
    {
      q: "What are the benefits of using PHP for web development?",
      a: "Since PHP is an open-source, platform-independent, flexible, high-performing, and user-friendly technology, you can develop successful applications that will be loved by users in an easy way.",
    },
    {
      q: "How to select the right PHP development company?",
      a: "When you choose a PHP development company, you should examine what development methodology they follow - Is it flexible? and how experienced they are. Moreover, focus on the strength of the company, reviews of past clients, etc.",
    },
    {
      q: "What are the benefits of outsourcing PHP website development?",
      a: "Outsourcing to a reliable PHP web development company like Soft Suave has the following benefits,",
      points: [
        "Cost-effective development",
        "Flexible work timing",
        "Access to top-skilled developers",
        "Quick development",
        "Implementation of state-of-the-art technology, tools, etc",
      ],
    },
    {
      q: "How much does it cost to develop a PHP website?",
      a: "It depends on some crucial factors like development platform, App categories, App complexity, country of the agency, and the number of features. The best way to know the exact cost is to talk with our experts.",
    },
    {
      q: "Can you help to redesign my website to the latest PHP version?",
      a: "Yes. In fact, migration service is one where our developers excel. Hence, we can effectively redesign your existing website to the latest PHP version. However, we need all the details about the website. Connect with us via Soft Suave chat system, phone, email, or filling the contact us form. Our dedicated project manager will schedule a meeting and collect all the necessary details. After analyzing them, we'll upgrade your site with our strong PHP team.",
    },
  ],
};
