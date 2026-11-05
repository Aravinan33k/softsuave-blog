/**
 * Copy for the /faqs index — the company-wide FAQ.
 *
 * Every other page on this surface carries its own FAQ about its own subject;
 * this is the general one softsuave.com publishes, and the questions and
 * substance below are that page's, in its three groups (General, Project
 * Development, Hire Developer).
 *
 * THREE ANSWERS DEPART FROM THE LIVE PAGE ON PURPOSE, because the live page is
 * stale against facts this repo already states:
 *
 *   - Offices. Live says "two development centres (Chennai and Bangalore) and
 *     one sales office in Maryland". `content.ts` publishes Washington, DC and
 *     Chennai (Navalur), which is also what the footer renders on every page.
 *     Shipping the live wording would put two different office lists on one
 *     site. Both answers that name locations are rewritten against
 *     `content.ts`.
 *   - ISO. Live claims ISO 9001:2015. The certification this repo holds artwork
 *     for and the footer displays is ISO/IEC 27001:2022 (information security),
 *     with the 9001 seal a smaller, older asset. The answer names 27001.
 *
 * Answers are otherwise the live page's own, tightened to the house voice and
 * with its mangled apostrophes repaired.
 */

import type { FaqContent } from "@/components/landing/faq";
import type { HeroContent } from "@/components/landing/hero";
import type { ManagerEnquiryContent } from "@/components/ad/manager-enquiry";
import { partnerHeroBadges } from "@/lib/home/hero-badges";

export const faqsPageMeta = {
  slug: "faqs",
  path: "/faqs",
  title: "Frequently Asked Questions",
  shortTitle: "FAQs",
  description:
    "How Soft Suave works — services, offices and hours, how projects are scoped and priced, NDAs and confidentiality, and what hiring dedicated developers involves.",
} as const;

/**
 * The page's header, as on the live /faqs: "Frequently Asked Questions", the line under it and a
 * "Contact" button, over the live banner photograph (a question mark in a maze, held by a hand).
 */
export const faqsPageHero: HeroContent = {
  titleLines: ["Frequently Asked Questions"],
  noAccent: true,
  body: ["We have got Answers to all Your Tech and Non-tech Questions"],
  points: [],
  ctas: [{ label: "Contact", href: "/contact" }],
  image: { src: "/brand/faqs/faq-banner.webp", width: 1920, height: 701, alt: "", still: true },
};

/** The heading and line over the question groups, as on the live /faqs. */
export const faqsPageIntro = {
  title: "How Can Soft Suave Help You?",
  body: "Here is a list of answers to all the frequently asked questions regarding services and solutions offered by Soft Suave.",
} as const;

/** The live /faqs "General FAQs" tab: its eight questions and answers, word for word. */
export const faqsGeneral: FaqContent = {
  eyebrow: "",
  title: "General FAQs",
  body: "",
  // The phrases the live answers link, as links to the pages we serve.
  links: [
    { text: "Custom App Development solutions", href: "/mobile-application-development-company" },
    { text: "outsourcing developers", href: "/hire-mobile-app-developers" },
    { text: "top app developers in India", href: "/hire-mobile-app-developers" },
  ],
  items: [
    {
      q: "What are the services provided by Soft Suave?",
      a: "Soft Suave is dedicated to offering start-ups and SMBs worldwide with several Custom App Development solutions. We are also expert in outsourcing developers to lead cutting-edge projects with the latest technologies.",
    },
    {
      q: "What is the exact location of Soft Suave’s Web and Software Development Center?",
      a: "Soft Suave has two development centres (Chennai and Bangalore) in India and one sales office in Maryland, USA.",
    },
    {
      q: "What are the working hours of Soft Suave?",
      a: "Soft Suave works five days a week, i.e., 40 hours/week. However, we are available for our clients anytime to extend our genuine support.",
    },
    {
      q: "How can I communicate with Soft Suave?",
      a: "You can reach out to Soft Suave anytime via email, phone and instant chat.",
    },
    {
      q: "What is the strength of Soft Suave?",
      a: "Soft Suave houses the top app developers in India who are expert in developing apps for all the leading industry verticals.",
    },
    {
      q: "What type of team does Soft Suave have?",
      a: "Soft Suave is a team of 400+ skilful developers well-versed in new-age technologies to develop ground-breaking web and mobile apps. Our team is knowledgeable and dedicated to offer digital transformation and revolutionize the digital world with astounding development skills.",
    },
    {
      q: "What are Soft Suave’s core competencies?",
      a: "The core competencies of Soft Suave includes;",
      points: ["Top-notch and reliable Web and Mobile App Developers", "successful custom projects"],
    },
    {
      q: "Are you flexible in adopting our standards or methodologies for the development of our projects?",
      a: "Soft Suave is flexible to acknowledge your standards and app development methodologies to establish a successful and market-winning project. Our developers are open to work according to your plans if the project requirements are met on time.",
    },
  ],
};

/** The live /faqs "Project Development" tab: its eighteen questions and answers, word for word. */
export const faqsProject: FaqContent = {
  eyebrow: "",
  title: "Project Development",
  body: "",
  // The phrases the live answers link, as links to the pages we serve.
  links: [
    { text: "“Free Quote Form”", href: "/free-quote" },
    { text: "app development solutions", href: "/mobile-application-development-company" },
    { text: "mobile app development company", href: "/mobile-application-development-company" },
  ],
  items: [
    {
      q: "What makes Soft Suave unique?",
      a: "The price factor that makes development affordable for start-ups and SMBs is among the few uniqueness of Soft Suave.",
    },
    {
      q: "What are your standard Terms and Conditions?",
      a: "Soft Suave starts any project by signing an NDA as we prioritize the confidentiality of the client’s information. Then we offer the right project plan according to the client’s requirement. After approval and payment, our development team will start the project accordingly. After project completion, the source codes belong to the client.",
    },
    {
      q: "How can I be assured that I am not wasting my time and money?",
      a: "Soft Suave’s development methodologies are transparent. If you have any suggestions or concerns, you can reach the dedicated project manager to resolve them quickly. Moreover, if you hire dedicated web or mobile app developers, you can directly oversee, manage, and assign tasks.",
    },
    {
      q: "How can I trust your productivity and charges to me?",
      a: "The productivity is determined by the development process approved by you during the start of the project. However, if you face any unanticipated issues and want to make immediate changes, our development team will be open and flexible. As we are transparent, you have the privilege to monitor the development phases.",
    },
    {
      q: "What are the risks I have in developing offshore?",
      a: "Every software development process has some issues in the background. However, Soft Suave has covered all the drawbacks of developing offshore with the help of an experienced development team. Communication and privacy are the primary concerns of clients worldwide. In addition, Soft Suave has developers that excel in communication, and we assure NDA before we start the project.",
    },
    {
      q: "Can I first get a rough idea about the cost of my system?",
      a: "Yes! You can use our “Free Quote Form” to get a rough estimation for your web and mobile app development idea.",
    },
    {
      q: "Can I try your services before giving you an important and big Project?",
      a: "Yes! Our development team is focused on offering satisfactory service to clients worldwide. You can start a pilot with us for a minimal cost or at zero cost, and then upon successful completion, you can hand over your big-scale project.",
    },
    {
      q: "What should I provide you to create a proposal?",
      a: "To create a proposal, Soft Suave needs to understand your project requirements. Hence, we will need technical documents, specifications, and design documents you have prepared about your project.",
    },
    {
      q: "What do you mean by an estimate?",
      a: "An estimate means a rough number on the time period and cost of project completion.",
    },
    {
      q: "What is the difference between a proposal and an estimate?",
      a: "An estimate gives you a rough idea about your project cost and duration. However, a proposal will state details about the project specifications, development methodologies, schedule of the project, and deliverables, including time and cost.",
    },
    {
      q: "What do you expect from the client during the project?",
      a: "The client has to be associated with the project and must be available to clarify any doubts related to the app development project. Moreover, clients have to be transparent in sharing feedback with the team at regular intervals.",
    },
    {
      q: "Do you provide post-development support?",
      a: "Yes, Soft Suave provides post-development support free of cost for a limited period as a part of project contact. However, we also offer a special contract to extend the post-development support for a lifetime or according to your feasibility.",
    },
    {
      q: "How can I be sure of security from competitors?",
      a: "Soft Suave has a confidentiality agreement in place for every member of our development team. Moreover, our team is matured and dedicated to respective clients. Thus we assure that they will never risk their professional integrity by misusing client’s data.",
    },
    {
      q: "What kinds of guarantee do I get about the work?",
      a: "We give guaranteed free support for a limited period after the final delivery. After which, you can sign a monthly or quarterly contract and continue to get ongoing support.",
    },
    {
      q: "How does Soft Suave protect confidentiality?",
      a: "We sign NDA (Non-disclosure Agreement) with the client before we start to gather project requirements. We also have a confidentiality agreement with our development team to ensure your information is safe and secure with Soft Suave.",
    },
    {
      q: "Can you provide references of your clients?",
      a: "Yes! We have a great rapport and long-term relationship with many of our clients. We are renowned among them as a reliable app development partner with cost-effective and high-quality app development solutions. You can check their testimonials for any references.",
    },
    {
      q: "How do you ensure the quality of services to your clients?",
      a: "Soft Suave is an ISO 9001-2015 certified mobile app development company that strictly follows the international app development process and methodologies. Most importantly, our developers are highly experienced and have immense expertise in handling high-quality project in almost all the industry verticals.",
    },
    {
      q: "Can we outsource our projects that we have received from our clients to Soft Suave?",
      a: "Yes. We do not shy away from accepting challenging projects from your clients. We also have experience working with renowned consulting companies around the world. So, we assure your client’s projects will be safe and successfully delivered with Soft Suave.",
    },
  ],
};

/**
 * The live /faqs "Hire Developer" tab: its thirty questions and answers, word for word — except the
 * two answers that offer "the free 1-week trial", which read "40-hour" here, as everywhere on this site.
 */
export const faqsHire: FaqContent = {
  eyebrow: "",
  title: "Hire Developer",
  body: "",
  // The phrases the live answers link, as links to the pages we serve.
  links: [
    { text: "onboard dedicated developers", href: "/hire-mobile-app-developers" },
    { text: "hire dedicated developers", href: "/hire-mobile-app-developers" },
    { text: "top application developers in India", href: "/hire-mobile-app-developers" },
  ],
  items: [
    {
      q: "What is the procedure for hiring dedicated resources from Soft Suave?",
      a: "Hiring dedicated resources from Soft Suave is effortless. All you have to do is share your resource requirement. Then, we will share relevant profiles of pre-screened developers. You can then conduct interviews and onboard them as soon as you want them on your offshore team.",
    },
    {
      q: "Do you have your own development centres, or do you work on subcontract?",
      a: "Soft Suave operates from two development centres in Chennai and Bangalore. We also have a sales office in Maryland. Moreover, our developers are proficient enough to handle any complex tasks; hence we do not subcontract any of our works.",
    },
    {
      q: "How long does it take to get a developer started on my work once we pay charges?",
      a: "Once the payment is completed, you can onboard dedicated developers from Soft Suave anytime, according to your project timeline.",
    },
    {
      q: "Will my hired developers speak English or any other international languages?",
      a: "All the developers at Soft Suave are proficient to understand and speak English. However, if you want our developer to understand any other international language, we will assign a dedicated Lead/ Business Analyst to bridge the communication gap between you and the developer.",
    },
    {
      q: "What is the length of the contract?",
      a: "We do not have any fixed contract at Soft Suave. However, we have flexible agreements to offer clients based on the project requirements.",
    },
    {
      q: "How does payment take place?",
      a: "We accept payments through credit cards, PayPal and Wire Transfer.",
    },
    {
      q: "If I hire a developer, does that mean I have that person dedicated only to me?",
      a: "Yes, when you hire dedicated developers from Soft Suave, they will 40 hours a week dedicated only to you.",
    },
    {
      q: "Could I hire a developer for a project-based task?",
      a: "Yes, we have three flexible hiring models to help clients accomplish projects successfully. And, project-based is one of the most popular models chosen by clients.",
    },
    {
      q: "Do you have a price list for developers with different skills?",
      a: "Yes, we have a price list for our developers based on their expertise and experience. However, based on your requirement, we will share our developer profiles along with the exclusive price.",
    },
    {
      q: "How do we communicate and monitor the project development with our hired developer?",
      a: "When you hire dedicated developers from Soft Suave, you get the privilege to communicate and monitor projects directly. You can communicate with the developers through Skype, Slack, Google Meet and Microsoft Teams. You can also monitor our developers with project management tools like Jira, Trello, Teamwork, and Basecamp.",
    },
    {
      q: "Is my business concept and data safe with your company?",
      a: "Absolutely! We have a confidentiality agreement signed with clients to safeguard the data and business concepts shared with us. As privacy is our primary concern, we also have strict confidentiality agreements with all our developers.",
    },
    {
      q: "Is there an option of replacement in case of dissatisfaction with any resources?",
      a: "Client satisfaction is our No.1 priority. Hence, if you are dissatisfied with any resources, Soft Suave will step in and replace the resource with another expert resource that fits your project.",
    },
    {
      q: "What is the reporting process of the work done? How often do I get the timesheet reports?",
      a: "The client decides the reporting process of the work before the project starts. However, we send the timesheets on a weekly basis for the client’s perusal.",
    },
    {
      q: "What makes Soft Suave different from other companies?",
      a: "Soft Suave provides the top application developers in India at an affordable cost. We also offer flexible hiring models focused on helping start-ups and SMBs. Soft Suave also allows you to leverage the free 40-hour trial to test the dedicated developers on your business and then hire accordingly.",
    },
    {
      q: "What if the developer takes a day off, sick or leaves the company?",
      a: "All the planned leaves are informed prior to the client and taken after consideration with the client. Sick leaves or any leaves pertaining to any medical emergencies will be reported to you by the respective TL. Furthermore, Soft Suave has a standard notice period for each employee to ensure a smooth transition happens along with the right amount of knowledge transfer.",
    },
    {
      q: "What are the benefits of outsourcing?",
      a: "Outsourcing your projects and developer requirements to Soft Suave helps you reduce cost, save time and increase the quality of your app development.",
    },
    {
      q: "Offshore dedicated centres and teams are offered by many other vendors. What makes your company different?",
      a: "Soft Suave provides the top web and mobile app developers in India at an affordable cost. We also offer flexible hiring models focused on helping start-ups and SMBs. Soft Suave also allows you to leverage the free 40-hour trial to test the dedicated developers on your business and then hire accordingly.",
    },
    {
      q: "Will I own all of the source code produces by my offshore team?",
      a: "Yes, your offshore team will hand over all the source codes and other documents to the respective client.",
    },
    {
      q: "Does the billing rate depend on the team members’ experience, skills, language proficiency, etc.?",
      a: "Yes, the factors mentioned above will impact the billing rate of the developers. However, we assure you the costs will never pinch your pockets.",
    },
    {
      q: "I just need one developer. Can you help?",
      a: "Soft Suave is focused on delivering enterprise-level success. Be it one developer or a development team; we are here to help you accomplish your dreams effortlessly.",
    },
    {
      q: "Do you offer onsite deployment of the team if I need the team to work closely at our office location?",
      a: "Yes, we deploy dedicated resources to work onsite depending on the client and project requirement. However, we will follow a different engagement model and agreement.",
    },
    {
      q: "What if I would like to request a pilot project before signing a contract?",
      a: "Yes, Soft Suave would be elated to work on your pilot project for free or minimal amount. However, it depends on the scope and requirement of the project.",
    },
    {
      q: "Can the developer work in the same time zone as ours?",
      a: "Yes, our dedicated developers at Soft Suave are flexible to overlap your time zones according to the project's necessity.",
    },
    {
      q: "Can I visit your office or meet my offshore team?",
      a: "When you build your own offshore team, you get the privilege to meet them in person to build trust and rapport. Executives at Soft Suave would also be happy to host you at our development centres in India.",
    },
    {
      q: "What is the lead time required to ramp up the resources?",
      a: "We have standby developers to fill in your requirement immediately. However, if you want to conduct an interview and onboard our pre-screened developers, the lead time will change accordingly.",
    },
    {
      q: "How can I terminate a contract before the lapse of the original period?",
      a: "If you want to terminate a contract before the original period, you have to give a one-month notice so we can make the process smooth and hassle-free.",
    },
    {
      q: "What technologies does Soft Suave work with?",
      a: "Soft Suave has expert developers who have hands-on experience working in the following mobile and web technologies like; Native iOS, Android, Cross-platform, PHP, .NET, Java, Ionic, Python, ROR, ReactJS, NodeJS, Angular, Magento, and WordPress.",
    },
    {
      q: "I have different requirements; what should I do?",
      a: "We are open to working on any requirement, be it complex or challenging. So get in touch with us and share your needs; we have got you covered.",
    },
    {
      q: "Do you provide technical support and maintenance?",
      a: "Yes, we offer technical support and maintenance post-deployment at free of cost and charge only a minimum for any distinct support and maintenance projects.",
    },
    {
      q: "Will you be willing to sign a non-disclosure and confidentiality agreement? Is signing a scanned copy and sending over an email ok for you, or do you prefer a fax?",
      a: "Client data privacy and confidentiality is our priority. Hence, we will sign NDA documents sent according to your convenience.",
    },
  ],
};

/** Closing band, pointing at the enquiry form the Contact section renders. */
/**
 * The page's closing band, as on the live /faqs: "Book Free Consultation" — two steps, the account
 * manager with a "Schedule a Call" button, the four credential lockups, and the enquiry form with its
 * Company row. (Our form's own field wording is kept.)
 */
export const faqsPageEnquiry: ManagerEnquiryContent = {
  title: "Book Free Consultation",
  body: "Get a 30-minute free consultation from a field expert. Validate your idea for free and get a rough quote once you complete this form.",
  steps: [
    { title: "Fill up your details", body: "Get Custom Solutions, Recommendations, Estimates." },
    { title: "What's next?", body: "One of our Account Managers will contact you shortly." },
  ],
  manager: {
    name: "Madhu Kadiyala",
    role: "Technology Consultant",
    photo: "/brand/ad/madhu-manager.webp",
    cta: { label: "Schedule a Call", href: "/30-min-free-consultation" },
  },
  // Upwork, Clutch, Microsoft, AWS — the four lockups, in the live order.
  badges: partnerHeroBadges,
  form: {
    title: "",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "Brief about the project",
    requirementPlaceholder: "Brief about the project",
    company: { label: "Company" },
    subject: "FAQs: Book Free Consultation",
  },
};
