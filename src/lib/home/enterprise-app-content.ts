/**
 * Copy for `/enterprise-custom-application-development` — a clone of softsuave.com's page of that name.
 *
 * Only what the live page's own content renders, word for word. Live order: a banner (the H1 over a looping
 * video) · "Solutions Overview" (nine solutions, each a line, a heading and a paragraph, with a "GET IN
 * TOUCH" button) · "Improve Your Business with Enterprise Custom Application" (two steps, the account
 * manager, the credential lockups and the enquiry form).
 *
 * The nine solutions are the live page's two columns: a link list on the left (a sticky contents column, as on
 * the case-study pages) and the paragraphs on the right. A last section below the enquiry carries a picture
 * and two paragraphs. The page names no trial length, so there is no duration to correct. Its <meta description> is the live one, which
 * describes Flutter development — it is copied as it stands.
 */

import type { ManagerEnquiryInput } from "@/components/ad/manager-enquiry";
import { partnerHeroBadges } from "@/lib/home/hero-badges";

export const entMeta = {
  path: "/enterprise-custom-application-development",
  title: "Enterprise Custom Application Development",
  description:
    "Soft Suave leads the way in Flutter app development services, delivering top-quality solutions for both iOS and Android platforms in India and the USA.",
} as const;

export const entBanner = {
  title: "ENTERPRISE CUSTOM APPLICATION DEVELOPMENT",
  accent: "APPLICATION DEVELOPMENT",
  video: { webm: "/videos/crm-video.webm" },
} as const;

export const entSolutions = {
  /** Heading of the left-hand contents column, which lists the nine solutions beside their paragraphs. */
  title: "Solutions Overview",
  cta: { label: "GET IN TOUCH", href: "/free-quote" },
  items: [
    {
      id: "sales-funnelling",
      tag: "Track sales activity and increase conversions.",
      name: "Sales Funnelling",
      body: "Our Sales Funnelling tool provides end-to-end visibility into your sales process, allowing you to manage leads efficiently and track progress at each stage. Easily move leads through the pipeline, approve proposals instantly, and close deals faster.",
    },
    {
      id: "life-cycle-marketing",
      tag: "Strengthen customer loyalty through personalised engagement.",
      name: "Life Cycle Marketing",
      body: "Automate and manage customer journeys from acquisition to retention. Customise marketing efforts based on customer behaviour and preferences, ensuring long-term engagement and loyalty. Tailor each step of the cycle to provide relevant offers, ensuring repeat business.",
    },
    {
      id: "ticketing-systems",
      tag: "Efficiently manage and resolve customer issues",
      name: "Ticketing Systems",
      body: "Our ticketing system lets you create, assign, and prioritise tickets to ensure that customer concerns are addressed quickly. Assign tasks to the appropriate team members and monitor their progress, improving overall customer satisfaction and reducing resolution times.",
    },
    {
      id: "collections-management",
      tag: "Ensure timely payments and improve cash flow.",
      name: "Collections Management",
      body: "Track outstanding payments, automate follow-ups with defaulters, and predict debt recovery timelines. Manage your entire collections lifecycle from one platform, including field collections and fraud control features, to reduce late payments and improve financial outcomes.",
    },
    {
      id: "leads-and-opportunities",
      tag: "Maximise sales by converting leads into revenue.",
      name: "Leads and Opportunities",
      body: "Our solution allows you to capture, organise, and track leads automatically from multiple sources. Use real-time visibility into lead status, assign them to the appropriate sales team, and nurture them through the sales funnel to increase conversion rates.",
    },
    {
      id: "employee-tracking",
      tag: "Monitor employee productivity and manage tasks in real-time.",
      name: "Employee Tracking",
      body: "Track employee locations, and task progress, and assign tasks instantly to field staff. Track employee progress and establish deadlines to ensure timely completion of tasks. Gain real-time insights into team performance and productivity.",
    },
    {
      id: "customer-relations",
      tag: "Manage customer interactions and improve satisfaction.",
      name: "Customer Relations",
      body: "Our solution helps you organise customer data, track communication history, and resolve issues through integrated ticketing. Prioritise important tasks and manage relationships effectively to improve retention and customer satisfaction.",
    },
    {
      id: "payments",
      tag: "Automate invoicing and payment processing.",
      name: "Payments",
      body: "Our Payments system streamlines billing by automating invoice generation and payment tracking. Set up automated reminders for outstanding payments, process transactions securely, and maintain an accurate record of all financial interactions.",
    },
    {
      id: "btl-marketing",
      tag: "Create and measure targeted marketing campaigns.",
      name: "BTL Marketing",
      body: "Plan and execute Below-The-Line (BTL) marketing campaigns aimed at specific customer segments. Track campaign performance in real-time with detailed analytics, allowing you to fine-tune your approach and maximise engagement.",
    },
  ],
} as const;

/** The closing section below the enquiry: a picture beside two paragraphs. */
export const entCustom = {
  title: "Custom Solutions for Enterprise Application Development",
  paragraphs: [
    "Gain full visibility into your sales funnel, customer engagement, and payment cycles with applications designed to fit your business.",
    "Manage leads, enhance customer loyalty, and ensure timely collections, all while monitoring employee productivity in real-time.",
  ],
  image: { src: "/images/enterprise-app/crm.svg", width: 595, height: 371, alt: "CRM" },
} as const;

export const entEnquiry: ManagerEnquiryInput = {
  title: "Improve Your Business with Enterprise Custom Application",
  body: "Looking for more information? Reach out to us to explore how Enterprise custom applications can simplify your operations and empower your team for success.",
  steps: [
    { title: "Fill up your details", body: "Get Custom Solutions, Recommendations, Estimates." },
    { title: "What's next?", body: "One of our Account Managers will contact you shortly." },
  ],
  // No button beside the manager on the live page.
  manager: {
    name: "Madhu Kadiyala",
    role: "Technology Consultant",
    photo: "/brand/ad/madhu-manager.webp",
  },
  // Upwork, Clutch, Microsoft, AWS — the four lockups, in the live order.
  badges: partnerHeroBadges,
  form: {
    title: "",
    note: "Alert: This form is for business, not candidates. To apply for jobs,",
    noteLink: { label: "click here", href: "/career-overview" },
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "Brief about the project",
    requirementPlaceholder: "Brief about the project",
    company: { label: "Company" },
    subject: "Enterprise Custom Application Development: Improve Your Business with Enterprise Custom Application",
  },
};
