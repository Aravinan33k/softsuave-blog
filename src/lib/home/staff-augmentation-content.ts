/**
 * Copy for the "IT Staff Augmentation Services" landing page
 * (`/it-staff-augmentation-services`).
 *
 * Everything — the hero's text, the page's title, description and schema, and
 * the section set below the hero — follows the live softsuave.com page (review:
 * "Need to update the page - lot of sections have changed including the title,
 * description, canonicals, and schemas"). The hero keeps its own image, badges
 * and form fields. The mapping, in live page order:
 *
 *   client logo strip                                        → homepage `Clients`
 *   "Why Choose Us for IT Staff Augmentation?"               → `staffWhyUs` (4)
 *   "IT Staff Augmentation Models We Offer"                  → `staffModels` (4)
 *   "Our IT Staff Augmentation Process"                      → `staffProcess` (5)
 *   "Roles You Can Hire Through IT Staff Augmentation"       → `staffRoles` (7)
 *   "Choose Offshore Experts in Various Technologies"        → `staffTechnologies` (4)
 *   "Industries We Support"                                  → `staffIndustries` (10)
 *   "Why Staff Augmentation Is Better Than Traditional Hiring" → `staffBenefits` (5)
 *   "What Our Clients Say About Us"                          → homepage `Testimonials`
 *   "FAQs About IT Staff Augmentation Services"              → `staffFaqs` (6)
 *
 * The copy is the live page's own, verbatim. The live "better than traditional
 * hiring" section is five benefit cards, not a table, so it renders as cards:
 * a two-column table would need a "traditional hiring" column the live page
 * never writes.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { FaqContent } from "@/components/landing/faq";
import { sharedHeroAlert, sharedHeroBadges } from "./delivery-shared";

export const staffMeta = {
  slug: "it-staff-augmentation-services",
  path: "/it-staff-augmentation-services",
  // The live page's <title> and meta description, verbatim.
  title: "IT Staff Augmentation Services for Faster Project Delivery",
  description:
    "Accelerate delivery with our top-notch IT staff augmentation services. Access top remote talent, scale teams on demand, and strengthen your projects.",
} as const;

export const staffHero: HeroContent = {
  titleLines: ["IT Staff Augmentation", "Services"],
  body: [
    "Scale your team swiftly with cost-effective, top-tier talent. Gain access to a global pool of skilled professionals, empowering your business to adapt, grow, and excel, while maintaining high-quality performance at an efficient pace.",
  ],
  points: [
    "Rapid Team Scaling",
    "Flexible Engagement Models",
    "Maximized Cost Savings",
    "Vetted Engineering Talent",
  ],
  badges: sharedHeroBadges,
  form: {
    // The live form's own heading and sub-line.
    title: "Let's Discuss Your Project",
    body: "Get free rough quote in 24 hrs",
    submit: "Send requirements",
    sending: "Sending…",
    requirementLabel: "Which roles do you need to fill?",
    requirementPlaceholder:
      "Roles and seniority, the tech stack, how many engineers, expected duration, and the time zone you need overlap with.",
    subject: "IT staff augmentation enquiry",
    alert: sharedHeroAlert,
  },
  image: {
    src: "/images/four/svc-web.webp",
    width: 1200,
    height: 860,
    alt: "Augmented engineers working alongside an in-house product team",
  },
};

export const staffWhyUs: CardGridContent = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Us for IT Staff Augmentation?",
  body: "With proven expertise, rapid hiring, flexible models, and cost-effective solutions, we provide top-tier talent that seamlessly integrates, driving growth, innovation, and success for your business.",
  items: [
    {
      name: "Experienced Developers",
      body: "Access top-tier developers with proven expertise, extensive experience, and a wide range of successful projects across industries.",
    },
    {
      name: "Faster Hiring Process",
      body: "Our rapid shortlist-to-hire process ensures quick access to qualified developers, minimizing delays and accelerating project timelines.",
    },
    {
      name: "Flexible Engagement Models",
      body: "Choose from different models (fixed price, time & material, or dedicated team) customized to effectively address your unique requirements.",
    },
    {
      name: "Cost-Effective Engagement",
      body: "Save 40–60% compared to full-time hiring, with affordable, high-quality talent delivering exceptional value for your business.",
    },
  ],
};

export const staffModels: CardGridContent = {
  eyebrow: "Models",
  title: "IT Staff Augmentation Models We Offer",
  body: "We provide flexible augmentation solutions tailored to your business needs, ensuring seamless integration of skilled talent that drives efficiency, innovation, and success across various industries and project requirements.",
  items: [
    {
      name: "Onshore Augmentation",
      body: "Achieve seamless communication and time-zone alignment with onshore experts provided only for select scenarios, ensuring delivery.",
    },
    {
      name: "Offshore Augmentation",
      body: "Scale your team with continuous productivity, leveraging top talent for ongoing project progress and innovation.",
    },
    {
      name: "Dedicated Remote Engineers",
      body: "Integrate dedicated developers into your team, boosting productivity and efficiency with full alignment to your business goals.",
    },
    {
      name: "Hybrid Team Models",
      body: "Combine onshore and offshore strengths, maximizing flexibility, cost savings, and operational efficiency for optimal project outcomes.",
    },
  ],
};

export const staffProcess: ProcessContent = {
  eyebrow: "Process",
  title: "Our IT Staff Augmentation Process",
  body: "From seamless recruitment to smooth onboarding, our step-by-step process ensures the right talent is quickly integrated, empowering your team to achieve success with minimal disruption and maximum efficiency.",
  // The live section's own "Book a Consultation" (review: "one CTA button
  // missing"); /contact, as the reviews ask of every consultation CTA.
  cta: { label: "Book a Consultation", href: "/contact" },
  steps: [
    {
      n: "01",
      image: {
        src: "/images/four/staff-step-1.webp",
        width: 1200,
        height: 900,
        alt: "Requirement Analysis in a staff augmentation engagement",
      },
      name: "Requirement Analysis",
      body: "We analyze your tech stack, required experience, and project specifics to identify the perfect fit for your team’s needs.",
    },
    {
      n: "02",
      image: {
        src: "/images/four/staff-step-2.webp",
        width: 1200,
        height: 900,
        alt: "Candidate Shortlisting in a staff augmentation engagement",
      },
      name: "Candidate Shortlisting",
      body: "Our rigorous vetting and matching process ensures only the most qualified candidates align with your project requirements.",
    },
    {
      n: "03",
      image: {
        src: "/images/four/staff-step-3.webp",
        width: 1200,
        height: 900,
        alt: "Interviews and Skill Assessment in a staff augmentation engagement",
      },
      name: "Interviews & Skill Assessment",
      body: "From client interviews to coding tests and culture fit evaluations, we ensure the best candidates for your team.",
    },
    {
      n: "04",
      image: {
        src: "/images/four/staff-step-4.webp",
        width: 1200,
        height: 900,
        alt: "Rapid Onboarding in a staff augmentation engagement",
      },
      name: "Rapid Onboarding",
      body: "Quick and efficient onboarding with seamless access setup, tool integration, and smooth team alignment to kickstart projects faster.",
    },
    {
      n: "05",
      image: {
        src: "/images/four/staff-step-5.webp",
        width: 1200,
        height: 900,
        alt: "Continuous Support and Monitoring in a staff augmentation engagement",
      },
      name: "Continuous Support & Monitoring",
      body: "Ongoing project management, sprint reviews, and feedback loops ensure optimal performance and consistent progress throughout the engagement.",
    },
  ],
};

export const staffRoles: ServicesContent = {
  eyebrow: "Roles We Have",
  title: "Roles You Can Hire Through IT Staff Augmentation",
  body: "Access a wide range of skilled professionals, from developers to project managers, ensuring the right expertise for every role to accelerate your projects and drive success.",
  items: [
    {
      name: "Mobile App Developers",
      body: "Specializing in Flutter, React Native, iOS, and Android to build seamless, high-performance mobile applications that elevate user experience.",
    },
    {
      name: "Frontend Developers",
      body: "Proficient in React, Angular, and Vue for SPA and UI development, delivering fast, responsive, and compelling digital experiences.",
    },
    {
      name: "Backend Developers",
      body: "Experts in API development, system architecture, and backend logic using Node, Python, Java, and PHP to deliver scalable, efficient server-side solutions.",
    },
    {
      name: "Full-Stack Developers",
      body: "Bringing expertise in both frontend and backend development, combined with DevOps capabilities to streamline processes, improve collaboration, and accelerate delivery.",
    },
    {
      name: "DevOps & Cloud Engineers",
      body: "Proficient in AWS, Azure, GCP, CI/CD, and Docker, optimizing infrastructure, deployment, scalability, and ensuring efficient, reliable cloud operations across projects.",
    },
    {
      name: "QA Engineers",
      body: "Experts in Selenium, Cypress, and Jira, delivering comprehensive manual and automation testing to ensure strong quality control and flawless product performance.",
    },
    {
      name: "UI/UX Designers",
      body: "From wireframes to prototypes, crafting intuitive design systems that elevate user experience, strengthen interface clarity, and enhance overall product usability.",
    },
  ],
};

export const staffTechnologies: CardGridContent = {
  eyebrow: "Tech Expert",
  title: "Choose Offshore Experts in Various Technologies",
  body: "Our offshore software developers excel in various technologies and frameworks and are known to blend with the project and technology easily to get great outcomes.",
  items: [
    {
      name: "Web Technologies",
      body: "Utilizing React, Angular, Laravel, and Django to create dynamic, scalable, and modern web applications tailored to evolving business requirements.",
    },
    {
      name: "Mobile Technologies",
      body: "Expertise in Kotlin, Swift, Flutter, and React Native, delivering high-performance, cross-platform mobile apps that engage users everywhere.",
    },
    {
      name: "Cloud & DevOps Tools",
      body: "Optimizing with Docker, Kubernetes, Jenkins, AWS, and Azure, ensuring scalable, secure, and efficient cloud and DevOps solutions.",
    },
    {
      name: "Testing Tools",
      body: "Utilizing Selenium, Appium, JMeter, and Cypress for robust, automated testing that guarantees seamless, bug-free user experiences.",
    },
  ],
};

/** Ten sectors, so the grid runs five across and fills two rows exactly. */
export const staffIndustries: CardGridContent = {
  eyebrow: "Industries",
  title: "Industries We Support",
  body: "We tackle the unique challenges of each vertical, offering tailored solutions that drive innovation, efficiency, and growth across diverse industries, ensuring your business stays ahead of the competition.",
  items: [
    {
      name: "SaaS",
      body: "Accelerating feature velocity and enhancing product roadmaps to drive growth and deliver scalable, high-performance software solutions.",
    },
    {
      name: "FinTech",
      body: "Prioritizing data security and regulatory compliance, delivering secure, innovative financial solutions that meet industry standards.",
    },
    {
      name: "Healthcare",
      body: "Ensuring compliance, robust security, and seamless EMR integrations to improve patient care and operational efficiency.",
    },
    {
      name: "Construction",
      body: "Enhancing project management through workflow automation and system integration to boost efficiency and reduce costs.",
    },
    {
      name: "Retail & E-Commerce",
      body: "Streamlining automation and system integrations to enhance customer experience, boost sales, and optimize operations for growth.",
    },
    {
      name: "Telecom",
      body: "Optimizing network infrastructure and reliability while delivering innovative solutions that enhance communication services and customer satisfaction.",
    },
    {
      name: "Logistics",
      body: "Developing real-time tracking systems that improve efficiency, transparency, and accuracy in logistics and supply chain management.",
    },
    {
      name: "Aviation",
      body: "Improving aviation efficiency, safety, and real-time tracking to drive innovation, seamless travel, and improve performance.",
    },
    {
      name: "EdTech",
      body: "Creating scalable learning platforms, improving engagement, and enabling integrations that drive innovation and personalized education.",
    },
    {
      name: "Manufacturing",
      body: "Providing enterprise system support to enhance operational efficiency, production accuracy, and scalability for manufacturing businesses.",
    },
  ],
};

export const staffBenefits: CardGridContent = {
  eyebrow: "Comparison",
  title: "Why Staff Augmentation Is Better Than Traditional Hiring",
  body: "Staff augmentation surpasses traditional hiring by enabling rapid scaling, flexible talent access, and smoother operations, helping businesses stay focused on core goals. Here are some notable advantages it offers.",
  items: [
    {
      name: "Faster Onboarding",
      body: "Accelerate hiring with a streamlined process, reducing onboarding time compared to traditional recruitment for quicker project starts.",
    },
    {
      name: "Reduced Cost",
      body: "Save significantly on hiring expenses with staff augmentation, avoiding recruitment fees, benefits, and long-term commitments.",
    },
    {
      name: "Access to Global Talent",
      body: "Gain access to hard-to-find specialists from around the world, ensuring top-tier skills for any project need.",
    },
    {
      name: "Higher Productivity",
      body: "Boost team efficiency with dedicated experts seamlessly integrating into your workflow, driving faster, high-quality results.",
    },
    {
      name: "No Long-Term Commitment",
      body: "Enjoy flexibility with contract-based engagements, allowing you to scale up or down as your project evolves.",
    },
  ],
};

/**
 * The live accordion lists these six questions and then repeats the last five
 * verbatim (eleven entries in all) — a duplicated block, not further content.
 * Each question appears here once.
 */
export const staffFaqs: FaqContent = {
  eyebrow: "Ask Us",
  title: "FAQs About IT Staff Augmentation Services",
  body: "A quick guide for CTOs and founders seeking clear answers to the most common IT staff augmentation questions.",
  items: [
    {
      q: "What are IT staff augmentation services, and how do they work in practice?",
      a: "IT staff augmentation allows businesses to quickly scale their teams by integrating skilled developers on a temporary basis. The process includes recruitment, onboarding, and seamless team integration to drive project success.",
    },
    {
      q: "How much does IT staff augmentation cost per developer per month?",
      a: "Costs vary based on developer expertise, location, and engagement model, with factors like experience level and project complexity influencing the final rate.",
    },
    {
      q: "How fast can I onboard developers through your IT staff augmentation model?",
      a: "Our streamlined process enables fast onboarding, typically within 48 hours. From recruitment to full integration, we ensure minimal delays, allowing developers to start contributing to your project quickly.",
    },
    {
      q: "What is the difference between IT staff augmentation and IT outsourcing or dedicated teams?",
      a: "Staff augmentation provides flexible, short-term access to specific skill sets, while outsourcing involves a third-party managing entire projects. Dedicated teams offer long-term collaboration but with a focus on a single client.",
    },
    {
      q: "What types of roles and tech stacks can I hire through IT staff augmentation?",
      a: "You can hire developers, QA engineers, project managers, and more, across various tech stacks like Java, Python, React, AWS, and Azure.",
    },
    {
      q: "Do I retain full control over augmented developers and their day-to-day work?",
      a: "Yes, you maintain complete control over your augmented developers’ tasks, deadlines, and work priorities. They seamlessly integrate into your existing workflows and report directly to your management team.",
    },
    // The six questions the live page's own FAQ schema carries, word for word
    // (review: "Few FAQs are missing"). Shown here, the page's schema — which
    // is live's, verbatim — only names questions a visitor can read.
    {
      q: "Staff augmentation in the IT industry: What is it?",
      a: "Staff augmentation, which is common in the IT field is when you hire outside professionals for a short time to help out with the needs of the in-house team. This method allows companies to fill gaps of skill, finish projects on time, and handle workload without making long-term agreements.",
    },
    {
      q: "How do you offer staff augmentation services?",
      a: "Soft Suave provides staff augmentation services and our skilled IT professionals easily fit into your current team. The process involves grasping the requirements of your project, choosing appropriate talent, and making sure that the onboarding and collaboration process are smooth.",
    },
    {
      q: "Why should companies consider IT staff augmentation services?",
      a: "Thinking about IT staff augmentation, companies can use this method to easily get more specialized skills when needed, increase their team size as necessary, lower the costs of recruitment, and maintain project schedules. This kind of flexibility supports businesses in adjusting to varying demands and concentrating on core activities.",
    },
    {
      q: "How to choose the right IT staff augmentation provider?",
      a: "Checking experience, technical skills, client feedback, and comprehension of project needs are the most important factors when selecting an IT staff augmentation provider. Good communication and past performance in similar projects also play a significant role.",
    },
    {
      q: "Can IT staff augmentation services help with specific project needs?",
      a: "Certainly, IT staff augmentation services can assist in fulfilling specific project requirements by supplying professionals who possess the needed abilities for your project. Augmented staff are skilled and reliable, and with them, you can scale up operations, and procure the needed technical support and help.",
    },
    {
      q: "What is the difference between IT outsourcing and IT staff augmentation?",
      a: "IT Outsourcing is a situation where a company hires an outside service provider to manage its entire or some part of the IT functions. IT Staff Augmentation, on the other hand, means you are adding professionals from outside to your team. In this way, tasks are not given completely as they would be in outsourcing but rather divided between internal and external parties.",
    },
  ],
};
