/**
 * Copy for the "Product Engineering Services" landing page
 * (`/product-engineering-services`).
 *
 * The page follows the live softsuave.com page — its title, description,
 * hero copy and section set (review: "Need to update the page - lot of
 * sections have changed including the title, description, canonicals, and
 * schemas"). The live page runs an older, simpler template; the mapping, in
 * live page order:
 *
 *   H1 + paragraph + "Our Portfolio" + enquiry form      → `prodHero`
 *   "Best-in-class Product Engineering Services Company" → `prodOverview`
 *   "Soft Suave in Product Engineering Services"         → `prodAbout`
 *   "Our Approach" (five steps)                           → `prodProcess`
 *   "Our Product Engineering Services" (six tabs)         → `prodServices`
 *   "Book Free Consultation" closing form                 → homepage `Contact`
 *
 * The copy is the live page's own, verbatim, save the two corrections marked
 * inline. The live page carries no FAQs, testimonials, benefits or engagement
 * models, so this page has none.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ProcessContent } from "@/components/landing/process";
import type { ServiceBoardContent } from "@/components/common/service-board";
import { sharedHeroAlert, sharedHeroBadges } from "./delivery-shared";
import { overviewImage } from "./overview-images";

export const prodMeta = {
  slug: "product-engineering-services",
  path: "/product-engineering-services",
  // The live page's <title> and meta description, verbatim — the description's
  // lowercase opening and "mobile,cloud" spacing included.
  title: "Software Product Engineering Services Company in India",
  description:
    "software product engineering services company helping businesses launch next-gen products with mobile,cloud Technology for secure digitalization.",
} as const;

export const prodHero: HeroContent = {
  // The live H1 is "Looking for Product Engineering Services ?"; the stray
  // space before the question mark is dropped. Split so the last line takes
  // the accent.
  titleLines: ["Looking for", "Product Engineering Services?"],
  body: [
    // Live reads "a starling Product Engineering Services Company" — the bird,
    // for "sterling".
    "Soft Suave is a sterling Product Engineering Services Company that transforms your ideas into products.",
  ],
  // The live hero carries no bullet list.
  points: [],
  // The live hero's own button, beside the copy.
  ctas: [{ label: "Our Portfolio", href: "/portfolio" }],
  badges: sharedHeroBadges,
  form: {
    // The live form's own heading pair.
    eyebrow: "Let's Discuss Your Project",
    title: "Get free rough quote in 24 hrs",
    alert: sharedHeroAlert,
    submit: "Send requirements",
    sending: "Opening your mail…",
    requirementLabel: "Tell us about your product",
    requirementPlaceholder:
      "What it does, who it is for, what exists already, and what you are trying to reach — a first release, a rebuild, or the next stage of growth.",
    subject: "Product engineering enquiry",
  },
  image: {
    src: "/images/four/work-9.png",
    width: 1536,
    height: 1024,
    alt: "A product engineering team moving a concept from design through build to release",
  },
};

/**
 * The live section's standfirst, its "Software Product Engineering Services"
 * paragraph, and its "Product engineering services help clients to" list —
 * the list's lead-in kept as the last paragraph so the three points read on
 * from it.
 */
export const prodOverview: OverviewContent = {
  image: overviewImage("product-engineering-services"),
  eyebrow: "Software Product Engineering Services",
  title: "Best-in-class Product Engineering Services Company",
  paragraphs: [
    "Soft Suave offers the Best Product Engineering service where we work with the product development team to turn your Idea into a marketable product in the most effective way possible.",
    "With today’s fast-changing business scope, companies are forced to continuously enhance their products to stand ahead of curve. Companies find it difficult to meet ever-increasing customer expectations on quality, cost control, and cutting-edge technologies. Additionally, tackling of issues such as lowering design costs, reducing product development lifecycles, and optimizing their business processes makes it a tedious task for organizations. They have to depend on product engineering solutions to satisfy complex customer requirements to create a remarkable difference.",
    "Product engineering services help clients to:",
  ],
  points: [
    "Reduce total cost of ownership.",
    "Reduce time-to-market delay.",
    "Be flexible to technology transformations such as mobile computing, cloud computing, and SAAS.",
  ],
};

export const prodAbout: OverviewContent = {
  eyebrow: "Why Soft Suave",
  title: "Soft Suave in Product Engineering Services",
  paragraphs: [
    "Using client insights, we develop products that meet customer demands and targets with success assured market goals.",
    "Soft Suave with extensive skills can help you develop quality applications aligning with changing technologies without compromising time to market. Our application make it a point to increase your ROI to a greater extent.",
    "Agile development is the methodology that helps us to create robust products and solutions, we follow the same method here. We approach product engineering in a way that sets an example for our competitors.",
  ],
  image: {
    src: "/images/four/prod-step-1.webp",
    width: 1200,
    height: 900,
    alt: "An agile sprint board of sticky notes planning the week's product work",
  },
};

export const prodProcess: ProcessContent = {
  eyebrow: "How We Deliver",
  title: "Our Approach",
  body: "Our Step-by-Step unique approach is proven to consistently satisfy our clients' expectations.",
  steps: [
    { n: "01", name: "Planning", body: "Define the challenges, gather requirements, and discover workshops." },
    { n: "02", name: "Development", body: "Plan different sprints and schedule iterative development for each sprint." },
    { n: "03", name: "Deployment", body: "Perform continuous integration and deployment of the product." },
    { n: "04", name: "Performance", body: "Fix bugs, perform quality analysis and tune product performance." },
    { n: "05", name: "Evolution", body: "Improvise product as per customer needs." },
  ],
};

/**
 * The live section's six tabs, each carrying all the paragraphs the live page
 * gives it — too long for cards, so they render as a board: the six names to
 * pick from, one stage to read on. The live standfirst ends on "Our software
 * engineering services include", which the board's six names then complete.
 */
export const prodServices: ServiceBoardContent = {
  eyebrow: "Core Services",
  title: "Our Product Engineering Services",
  body: "Soft Suave provides end-to-end product engineering solutions that unlock the potential in the emerging market. We offer features that offer scalability, flexibility and robustness by improving time-to market and reducing the time for R&D. Meeting today’s customer expectation is not an easy task, hence, we ensure to reduce the overall cost of the product development lifecycle and confirm smooth run of project for each client. Our software engineering services include",
  items: [
    {
      name: "Product Consulting",
      image: { src: "/images/landing/pe-svc-consulting.webp", alt: "Product consultants discussing requirements with a client" },
      paragraphs: [
        "Our business consulting team helps you flesh out your ideas and validate your concept. We also provide advisory services on software product concepts, launch, development strategy and product roadmap.",
        "In case the scope of the product is not defined, our consultants will work closely with you to outline the business objectives and software requirements of the project. Our experts follow best practices of software engineering and business analysis to deliver precise and clear specifications.",
      ],
    },
    {
      name: "Product Architecture",
      image: { src: "/images/landing/pe-svc-architecture.webp", alt: "Team planning a product architecture at a whiteboard" },
      paragraphs: [
        "Soft Suave ensures to build product architectures that meet evolving business needs of the customer. Product architecture defines programs, work assignments, and processes that should be designed, developed, and implemented while developing a product. It is created to ensure that a product engineering project would yield the required result. Creating an effective architecture documentation helps to identify possible risks during the initial phases of development, and hence would help to take actions to alleviate them.",
        "Soft Suave provides a wide range of software product architecture, design, and development services by helping companies create performance-oriented products that can bring big changes to their business.",
        "With our vast expertise, we have helped clients build software, mobile apps, web 2.0, embedded software, and business-oriented applications. Our design experts and technology consultants provide assistance in selecting the right software solution for your business.",
      ],
    },
    {
      name: "Product UI/UX Designing",
      image: { src: "/images/landing/pe-svc-uiux.webp", alt: "Designer sketching an app interface on a tablet" },
      paragraphs: [
        "Our motto is to create user experience designs that engages and delights end-users. To get a quick visual illustration of every final product, we make clickable wireframes.",
        "We perform functional implementations of prototypes to ensure that the product is perfect while delivering. At this stage, we get the clarity of user experience, interactions, and roles of access for each type of users. Our UX experts and graphic design team build highly-detailed functional implementations at the starting of a new product development that helps to simulate and test user experiences.",
        "Keeping the target audience in mind, our designers create a GUI and show you a visual image of what the final output would be, and how users will interact with the application. Through surveys and interviews with clients, we identify user’s requirements and create multiple use cases showing how the user moves in the system. We combine targeted user’s expectation with our product strategy to deliver eye-catching and engaging designs that are compatible with desktops, mobiles, and tablets.",
      ],
    },
    {
      name: "Product Development",
      image: { src: "/images/landing/pe-svc-development.webp", alt: "Developers writing product code together" },
      paragraphs: [
        "Converting an idea into a product demands expertise and commitment. Our implementation experts work on established methodologies and procedures to develop high-quality products.",
        "We follow an iterative scrum development cycle using razor-edge technologies ensuring faster time to market, robustness, and flexibility. It involves various sprints, designs, feedback, implementation, testing, and support for every iteration and releases.",
        "Our idea is to reduce a design to code and include quality codes while developing the application to improve the quality of the product by eliminating complexities at the early stages of development.",
      ],
    },
    {
      name: "Product Testing & Delivery",
      image: { src: "/images/landing/pe-svc-testing.webp", alt: "Engineer testing a product across two laptops" },
      paragraphs: [
        "We perform unit testing on small units of the application without disturbing any other code which helps to improve the quality of application during the development process.",
        "Soft Suave’s approach to review manual code aids to streamline the whole product engineering process by fixing bugs unnoticed during preliminary development stages. Manual testing helps in maintenance and ensure stability across other projects. Automated QA testing allows cost saving, adding new test cases and can be run along with ongoing development process to increase test coverage of the application.",
        "Quality testing that we trail around with helps the team to produce the product in short cycles and ensures the release on right time.",
      ],
    },
    {
      name: "Product Deployment & Maintenance",
      image: { src: "/images/landing/pe-svc-deployment.webp", alt: "Engineer monitoring servers with a tablet in a data center" },
      paragraphs: [
        // Live runs "test new product,and" with no space after the comma.
        "Our expertise enables us quickly find out development errors, bugs, test new product, and enhance the quality of deployment.",
        "We ensure client to focus on fluctuating market conditions and user demand by continuous integration. Our deployment process emphasizes stable development process which helps in achieving early product-to-market and ROI.",
        "A periodic maintenance of system is ensured once product is deployed to avoid the system from getting outdated by immediate bugs, permanent fixes to critical issues for low cost and higher Performance.",
        "With ever-changing business landscape, enterprises must be future-ready and must leverage the services of product engineering to maximize their potential outperform competitors. We have the expertise of developing strong business applications using best-in-class technologies.",
      ],
    },
  ],
};
