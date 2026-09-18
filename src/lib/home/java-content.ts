/**
 * Copy for the "Java Application Development" landing page
 * (`/java-application-development-company`).
 *
 * SOURCE: the live softsuave.com page of the same slug, reproduced section for
 * section. Unlike the Next.js / TypeScript / GraphQL trio on this surface —
 * whose copy came from a written brief — this page had no brief: it is already
 * live, so the live page IS the spec. Every heading, paragraph, service, card
 * and FAQ answer below is that page's own wording, edited only where the live
 * markup had broken whitespace mid-sentence ("faster and and ease" is the
 * one typo corrected) or where a fragment had to become a complete phrase to
 * fit a typed field.
 *
 * Nothing is added that the live page does not say, and no section of it is
 * dropped. The mapping, in live page order:
 *
 *   H1 + intro + 3 assurance points + enquiry form  → `javaHero`
 *   "Trusted Partner for Startups and SMBs."        → homepage `Clients` band
 *   "Our Java Application Development Services"     → `javaServices` (6)
 *   "Advanced Java Development Techniques …"        → `javaOverview` + `javaTechniques` (6)
 *   "Are You Looking For Top-Notch Java …?"         → `javaMidCta`
 *   1250+ / 13+ / 150+ counters                     → `javaOverview.stats`
 *   "Benefits of Using Java Web Development …"      → `javaBenefits` (6)
 *   "Why Need Soft Suave for Java …?"               → `javaWhyUs` (3)
 *   "Looking For Expert Java Developers?"           → `javaHireCta`
 *   "Success Stories"                               → homepage `WorkGrid`
 *   "Awards & Certifications"                       → homepage `Recognitions`
 *   "What Our Clients Say About Us"                 → homepage `Testimonials`
 *   "Frequently Asked Questions"                    → `javaFaqs` (10)
 *
 * The four company-level bands are the homepage's own components over the
 * homepage's own facts (`lib/home/content.ts`) rather than a second copy of
 * the same claims — the convention every other page on this surface follows,
 * and the reason no success story, award or testimonial is restated here.
 *
 * The live page has no technology table, so this module exports no
 * `TechStackContent` and the route renders no technology band. That is
 * deliberate: adding one would put words on the page the live copy does not
 * have.
 *
 * Images: the six technique illustrations are the live page's own art,
 * downloaded from softsuave.com/assets/images and committed under
 * `public/images/landing/java/` — the hand-placed convention the Next.js page
 * established, not the Pexels manifest. All six are 601×314.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesCarouselContent } from "@/components/common/services-carousel";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { CardGridContent } from "@/components/landing/industries";
import type { FaqContent } from "@/components/landing/faq";

export const javaMeta = {
  slug: "java-application-development-company",
  path: "/java-application-development-company",
  // The live <title> less its " - Soft Suave" suffix: every content module on
  // this surface stores the bare title and the route appends the suffix once.
  title: "Top Java Development Company in India",
  description:
    "Custom Java development company in India offering tailored solutions for diverse industries with reliable and scalable applications.",
} as const;

export const javaHero: HeroContent = {
  eyebrow: "Java Development Services",
  // The live H1, split so the last line takes the coral accent.
  titleLines: ["Java Development", "Company in India"],
  body: [
    "Soft Suave is a top Java development company in India that provides outstanding Java development services and creates web applications that offer flexibility, scalability, and a robust user experience.",
    "Let us assist you in utilizing the full potential of Java for your next project.",
  ],
  // The live hero's three assurance points, verbatim.
  points: [
    "Save 60% on Development Costs",
    "NDA & Flexible Engagement Models",
    "400+ In-house Resources",
  ],
  badges: ["Upwork Top Rated", "Clutch verified", "Microsoft Silver Partner", "AWS Partner"],
  form: {
    eyebrow: "Business Enquiry",
    title: "Let's Discuss Your Project",
    // The live form's own sub-heading and applicant notice.
    note: "Get free rough quote in 24 hrs. Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "What do you want to build?",
    requirementPlaceholder:
      "The Java application you have in mind, whether this is a new build, a migration of an existing system, or an API layer, and which platforms and integrations it touches.",
    subject: "Java Application Development enquiry",
  },
};

/**
 * The live page's "Advanced Java Development Techniques for Your Solutions"
 * lead — its paragraph, its three claim bullets and its CTA — plus the three
 * counters the page carries in its mid-page band. Both belong to the same
 * stretch of the live page, and the overview panel is the one section on this
 * surface that renders prose, points, a CTA and stats together.
 */
export const javaOverview: OverviewContent = {
  eyebrow: "Overview",
  title: "Advanced Java Development Techniques for Your Solutions",
  paragraphs: [
    "Enterprise applications are now a crucial asset for organizations, and partnering with a Java app development company is the optimal choice for your enterprise solutions. Modern Java technologies effectively meet your business needs.",
  ],
  points: [
    "Build high-performance web apps with our quality Java development services",
    "Get highly secure web apps, with Java's in-built security features",
    "Make response times faster and ease development processes with Java's rich APIs",
  ],
  cta: { label: "Talk to Our Experts", href: "#enquiry" },
  // The live page's counters, exactly as it writes them.
  stats: [
    { figure: "1250+", label: "Projects Executed Successfully" },
    { figure: "13+", label: "Years of Experience in this Field" },
    { figure: "150+", label: "Total No. of Satisfied Customers" },
  ],
};

/** The live page's six "Our Java Application Development Services" cards. */
export const javaServices: ServicesCarouselContent = {
  eyebrow: "Services",
  title: "Our Java Application Development Services",
  body: "Soft Suave has designed, built, and launched various native Java applications with high success rates. Look through our core services below.",
  items: [
    {
      name: "Java Cloud Development",
      body: "We specialize in building cloud-native and serverless applications that make use of the full range of cloud features, including elasticity, scalability, and cost-efficiency. Our solutions are designed to efficiently utilize cloud services, ensuring high performance, smooth scaling, and powerful functionality for your business needs.",
    },
    {
      name: "Java-based SaaS App Development",
      body: "We deliver reliable, secure, and high-performing SaaS solutions with sub-second response times. Our expertise spans online gaming backends, video streaming software, VoIP, messaging apps, and more. Trust us to create solutions that are efficient, robust, and perfectly tailored to meet the unique demands of your business.",
    },
    {
      name: "Java Application Migration",
      body: "Our Java developers are highly skilled in migrating your business applications to meet continually evolving business demands. We incorporate modern architecture, intuitive UI/UX, and the latest web standards, ensuring your applications are future-proof, scalable, and perfectly aligned with your business goals.",
    },
    {
      name: "Java API Development",
      body: "Our Java developers excel in crafting lightweight, high-performance, and secure REST APIs that easily integrate with any front-end or third-party application. Count on us for robust solutions that improve connectivity, scalability, and security across your ecosystem. Let us simplify your digital initiatives.",
    },
    {
      name: "Java Maintenance & Support",
      body: "Being a Java Web development company in India, we provide comprehensive maintenance and support services for Java applications. Our team ensures easy integration of new features and modules, aligning with your evolving requirements. Trust us to improve functionality and enable continuous innovation and growth.",
    },
    {
      name: "Dedicated Java Team",
      body: "Our dedicated team of Java developers offers a flexible extension to your workforce, easily scalable to meet changing business demands. With proven cost-effectiveness, we easily integrate with your operations, providing the expertise and agility needed to drive success. Trust us to adapt to your evolving needs.",
    },
  ],
};

/**
 * The six techniques the live page lists under "Advanced Java Development
 * Techniques for Your Solutions", each carrying that page's own illustration.
 *
 * Rendered through the card grid's `feature` variant — the treatment the
 * Global Capability Center page uses for a card set that has artwork, which is
 * what these six have and the services above do not.
 */
export const javaTechniques: CardGridContent = {
  eyebrow: "Techniques",
  title: "Modern Techniques Built Into Your Java Solutions",
  body: "Modern Java technologies effectively meet your business needs. These are the capabilities we build into the Java applications we deliver.",
  items: [
    {
      name: "Artificial Intelligence (AI)",
      body: "We empower your Java web solutions with the latest advancements, including Artificial Intelligence (AI) and powerful algorithms. This translates to a user-friendly support system and a smooth, multichannel experience, ultimately boosting your brand recognition. AI also optimizes testing processes, ensuring solutions are tailored to your specific needs.",
      image: {
        src: "/images/landing/java/tech-ai.webp",
        width: 601,
        height: 314,
        alt: "Artificial intelligence built into a Java web solution",
      },
    },
    {
      name: "Smart Automation",
      body: "Intelligent automation revolutionizes Java web development, enabling efficient trend analysis and swift decision-making. As a leader in software testing, we seamlessly integrate automation into your sales workflows, maximizing performance and accelerating results.",
      image: {
        src: "/images/landing/java/tech-automation.webp",
        width: 601,
        height: 314,
        alt: "Intelligent automation running inside a Java workflow",
      },
    },
    {
      name: "RPA",
      body: "Expand your market reach by incorporating Robotic Process Automation (RPA) into your Java web services. This technology automates repetitive tasks such as lead nurturing and proposal generation. RPA simplifies operations, unifies data from various sources, and reduces development time, ultimately boosting productivity.",
      image: {
        src: "/images/landing/java/tech-rpa.webp",
        width: 601,
        height: 314,
        alt: "Robotic process automation applied to Java web services",
      },
    },
    {
      name: "Data Analytics",
      body: "Our advanced data analytics go beyond historical data processing — they predict future trends and empower strategic planning for Java web development. By using automated testing and powerful analytics, we equip you with the insights needed to navigate market trends, optimize financial strategies, and identify growth opportunities.",
      image: {
        src: "/images/landing/java/tech-analytics.webp",
        width: 601,
        height: 314,
        alt: "Analytics dashboards predicting trends for a Java application",
      },
    },
    {
      name: "CRM",
      body: "Customer Relationship Management (CRM) systems are at the forefront of enhanced software testing services. These systems manage and nurture interactions with potential customers, emphasizing the importance of user experience in design. CRM facilitates easier reporting and effective lead management.",
      image: {
        src: "/images/landing/java/tech-crm.webp",
        width: 601,
        height: 314,
        alt: "A CRM system managing customer interactions",
      },
    },
    {
      name: "Machine Learning (ML)",
      body: "Machine learning is crucial for large-scale predictive analysis. Our ML technologies simplify complex tasks, allowing businesses to accurately forecast demands. Utilize ML to identify trends, analyze user behavior, and automate decision-making processes, ensuring solutions remain user-centric.",
      image: {
        src: "/images/landing/java/tech-ml.webp",
        width: 601,
        height: 314,
        alt: "Machine learning models forecasting demand from application data",
      },
    },
  ],
};

/** The live page's mid-page conversion band. */
export const javaMidCta: CtaBandContent = {
  eyebrow: "Next Step",
  title: "Are You Looking For Top-Notch Java Development Services?",
  body: "Get the best Java development services from Soft Suave and procure high-performing apps to scale up your business operations efficiently!",
  cta: { label: "Get FREE Consultation", href: "#enquiry" },
};

/** The live page's six "Benefits of Using Java Web Development" cards. */
export const javaBenefits: CardGridContent = {
  eyebrow: "Benefits",
  title: "Benefits of Using Java Web Development for Enterprise Applications",
  body: "Java stands out as the venerable and widely adopted programming language. With its inherent capacity to handle the intricacies of enterprise applications and cater to unique business requirements, it remains a top choice for developers.",
  items: [
    {
      name: "Platform Independence",
      body: "Java's Write Once, Run Anywhere (WORA) principle allows developers to write code on one platform and run it smoothly on different devices, delivering excellent cross-platform adaptability.",
    },
    {
      name: "Versatile Applications",
      body: "Java's versatility extends across diverse domains, accommodating applications spanning from web development to mobile apps, and even enterprise-grade embedded systems.",
    },
    {
      name: "Large Community",
      body: "You enjoy the support of a huge community and access to a wide array of pre-built components, frameworks, and tools that accelerate development.",
    },
    {
      name: "Security Features",
      body: "It offers built-in safeguards against common security threats such as buffer overflows and includes tools for encryption, authentication, and access control.",
    },
    {
      name: "Scalable Solutions",
      body: "Its scalability is ideal for both small-scale applications and large enterprise-level systems, ensuring maintainable solutions.",
    },
    {
      name: "Continuous Evolution",
      body: "Java continuously evolves with frequent updates that bring new features, improvements, and optimizations to stay current and relevant.",
    },
  ],
};

/** The live page's three "Why Need Soft Suave for Java Application Development?" cards. */
export const javaWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Need Soft Suave for Java Application Development?",
  body: "Improve your web applications with Soft Suave's skilled Java development services. Find out why picking us is the perfect choice:",
  items: [
    {
      name: "Modern Technology Practice",
      body: "Soft Suave excels in using cutting-edge technology like Java to meet businesses' various technological needs. By incorporating Java into your operations, Soft Suave aids in updating your business processes, providing a competitive edge. With Java's strong features, wide range of tools, and supportive community, Soft Suave can create customized, efficient, and adaptable applications to meet your needs.",
    },
    {
      name: "Transparent Communication",
      body: "Being a leading Java App Development Company in India, Soft Suave helps you gain access to transparent communication regarding all project-related information throughout the development process. This facilitates informed collaboration and reduces misunderstandings through clear and consistent updates. Additionally, we can promptly resolve any issues to ensure the success of the project.",
    },
    {
      name: "Round-the-Clock Assistance",
      body: "Soft Suave's post-deployment support entails delivering timely upgrades and promptly resolving any issues to improve software application performance. This proactive approach ensures that applications remain optimized and functional, meeting the evolving needs of users and business requirements. Our dedicated team continuously monitors applications, provides regular maintenance.",
    },
  ],
};

/**
 * The live page's "Looking For Expert Java Developers?" band, whose CTA is the
 * one link on the page that leaves it — for the hire-by-skill page this app
 * already serves at `/hire-java-developers`.
 */
export const javaHireCta: CtaBandContent = {
  eyebrow: "Hire Developers",
  title: "Looking For Expert Java Developers?",
  body: "Soft Suave's experienced Java developers deliver your application on time, within budget, and tailored to your specific needs with robust, scalable, and efficient solutions.",
  cta: { label: "Hire Java Developers", href: "/hire-java-developers" },
};

/** The live page's ten FAQs, questions and answers verbatim. */
export const javaFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "Frequently Asked Questions",
  body: "Know more about our processes and how we work, with the help of the following FAQs.",
  items: [
    {
      q: "How much does Java application development cost?",
      a: "Our costs depend on the application's requirements, features, and complexities. We recommend contacting our experts for a precise quote.",
    },
    {
      q: "How long does it take to go live with a custom Java development project?",
      a: "Our timeline varies based on project needs, but our use of Agile methodologies helps speed up development, including accommodating changes during the process.",
    },
    {
      q: "What kind of applications can we build using Java?",
      a: "We utilize Java's versatility to develop web apps, desktop apps, mobile apps, and more, across multiple platforms.",
    },
    {
      q: "What are the benefits of using Java for application development?",
      a: "Our Java development offers robust security, scalability, and cross-platform capabilities, making it suitable for a wide range of applications. However, before you start a Java development project, consider the risks and rewards of outsourcing Java development to determine the best approach for your needs.",
    },
    {
      q: "Can Java be used for mobile app development?",
      a: "Yes, we commonly use Java for developing mobile applications, especially for Android platforms.",
    },
    {
      q: "How does outsourcing to our Java development company work?",
      a: "We bring the expertise and resources, you bring the vision. Together, we'll deliver efficient and cost-effective results. Outsource your Java developers and partner with our team to create custom solutions.",
      link: { label: "Hire Java developers", href: "/hire-java-developers" },
    },
    {
      q: "How can you monitor the progress of your Java development project?",
      a: "We utilize project management tools and provide regular updates to keep our clients informed of progress.",
    },
    {
      q: "Does our Java software development company offer post-development support?",
      a: "Yes, we offer ongoing support and maintenance as part of our services to ensure applications remain up-to-date and perform optimally.",
    },
    {
      q: "What types of Java development services do we offer?",
      a: "Our services include cloud-based solutions, migrations, integrations, mobile and web application development, and Java consulting. So when you are planning to hire a Java developer, make sure to know your project requirements before making decisions.",
      link: { label: "Hire a Java developer", href: "/hire-java-developers" },
    },
    {
      q: "Is Java still a good option for software development?",
      a: "Yes, Java is a good choice for software development, all thanks to its powerful security, scalability, and cross-platform abilities. For your next project, make sure to choose the best Java development framework as it builds reliable and high-performance applications. We ensure Java's large community and ongoing updates keep it relevant and powerful in the evolving tech landscape.",
    },
  ],
};
