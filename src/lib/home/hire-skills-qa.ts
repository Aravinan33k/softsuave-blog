/**
 * QA hire pages: Selenium.
 *
 * /hire-selenium-tester runs the older softsuave.com layout — overview, expertise cards, the rate band,
 * four steps, why-hire cards, a tools band and the FAQs — closed by the full "Book Free Consultation"
 * band. Every string is the live page's own copy, including its steps and why-hire cards, which the
 * live page words for MERN.
 */

import type { HireSkill } from "./hire-skill";
import { sharedHeroAlert } from "./delivery-shared";
import { COUNTRIES_PLUS, HOURLY_RATE } from "../company-figures";

const selenium: HireSkill = {
  slug: "hire-selenium-tester",
  key: "selenium",
  name: "Selenium",
  role: "Selenium Testers",
  metaTitle: "Hire Selenium Developers\u200b with 40 Hours Risk-free Trial",
  metaDescription:
    "Hire Selenium developers in India with a 40-hour free trial. Get test automation experts from the top 3% talent pool, language/time-zone compatible.",
  serviceType: "Selenium testing staffing",
  ctaLabel: "Hire Selenium testers",
  breadcrumbLabel: "Hire Selenium Testers",

  order: ["overview", "services", "midCta", "process", "whyUs", "techStack", "faq"],
  closingEnquiry: true,
  hideHeroBreadcrumb: true,

  hero: {
    titleLines: ["Hire Selenium Testers", "in India On Contract"],
    accent: "Selenium Testers",
    titleScale: "home",
    accentGradient: true,
    body: ["Poor software quality costs more than good testing ever will. Soft Suave is a specialized QA staffing agency that connects you with pre-vetted Selenium testers within 48 hours - flexible engagement models, zero upfront investment, and built for teams that cannot afford bugs.", "Soft Suave's Python developers are built for teams that move fast.", "*Satisfaction Guaranteed – Get 40-hour Free Trial"],
    points: ["40-Hour Risk-Free Trial", "Hire Top Selenium Testers in India", "Time-Zone & Language Aligned Teams", "Airtight NDA & IP Protection", "Strong Delivery Governance from Day One"],
    form: {
      title: "Get Skilled Remote Developers",
      submit: "Start My FREE Trial",
      sending: "Sending...",
      requirementLabel: "Requirement",
      requirementPlaceholder: "Tell us about your Selenium requirement.",
      subject: "Selenium Testers enquiry",
      alert: sharedHeroAlert,
    },
  },

  overview: {
    image: {
      src: "/images/hire-selenium/content-banner.svg",
      width: 2484,
      height: 1788,
      alt: "Top Selenium Automation Testing Company Soft Suave",
    },
    eyebrow: "",
    title: "Top Selenium Automation Testing Company",
    paragraphs: ["Engage with our highly competent Selenium testers to reduce the time you invest in App test cycles.", "Outsource Selenium Testing Services to save your valuable time by automated testing. Our selenium experts have immense expertise to find the potential and even the smallest bug/vulnerabilities and make your application bug-free. Our Selenium specialists offer exceptional services from script development to maintenance that improve the quality of your App greatly. Also, they can effectively test your software application across different browsers, platforms, and programming languages.", "Our testing experts deliver top-notch Selenium automation testing services and decrease the testing time of your project. Plus, they leverage innovative testing technology tools including Selenium Web Driver, Selenium Grid, SauceLabs, TestNG, Docker Selenium, Z-Cron, and Apium, etc., to help you deploy the App safely. Soft Suave strives to provide superior Selenium performance testing for small to medium-size businesses with the help of top-rated Selenium testers. Hire Selenium Tester in India for developing Frameworks, App Testing Strategy, Continuous Integrations, Functional Test Automation, Customized Reports, Automated Regression Testing, and more"],
  },

  services: {
    eyebrow: "",
    title: "Expertise of Our Selenium Testers",
    body: "Our offshore Selenium testers teams can effectively execute multiple tests on multiple machines, environments, and browsers simultaneously. Get a glimpse of the superior software solutions offered by us.",
    items: [
      { name: "Automated Functional Testing", body: "Ensure faster test coverage and streamlined development of test cases with the help of our professional Selenium testers. And, verify integrations for numerous scenarios using functional tests for web, windows, and mobile Apps." },
      { name: "Dedicated Selenium Testers", body: "Our Selenium experts are always determined to deliver a high-quality product that meets end-user's requirements while ensuring that they are satisfied with the end results. Achieve higher portability, higher code readability, and enhance your testing capabilities with our dedicated team of Selenium testers." },
      { name: "Automated Regression Testing", body: "Soft Suave's QA and testing professionals offer superior automated regression testing services for web, mobile Apps as well as APIs by running scripts to meet the quality. Also, we can combine agile methodology and algorithms to lessen both disruptions and QA costs." },
      { name: "Browser Compatibility Testing", body: "Our testers will test and analyze whether the developed application is working as expected in any given browser or not. For this, they check code validation, seamless performance, mobile responsiveness, functioning of the user interface, and behavior of the application like dialog boxes, navigations, links, etc." },
      { name: "Continuous Integrations", body: "Our certified Selenium Testers can automate the integration of code changes from multiple contributors into a single software project by utilizing JANKINS, Maven, Test NG, etc. Thus, we produce a bug-free software product with full functionalities." },
      { name: "Apps Testing Methodology", body: "Soft Suave's trained testers can assist you to plan a compelling automation process starting from the App development stage, infrastructure analysis to deployment. We understand a challenge, formulate a plan and provide the solution accordingly." },
    ],
  },

  midCta: {
    title: `Hire Selenium Tester Starting from ${HOURLY_RATE}`,
    body: "We will provide you with remote selenium tester that work from India. Contact us to take a look at CVs.",
    cta: { label: "Request Rate Card", href: "/developer-rate-card" },
  },

  process: {
    eyebrow: "",
    title: "Hire Selenium Tester in 4 easy steps",
    body: "Below is the simple Full-time Hiring Process that we follow while offering 1-week free trial to our clients.",
    steps: [
      { n: "01", name: "Share the MERN Stack JD", body: "Send your MERN stack needs with project scope, skills, experience, and timeline." },
      { n: "02", name: "Review Soft Suave’s MERN Shortlist", body: "Review curated MERN profiles with skills, experience, availability, and project fit details." },
      { n: "03", name: "Run the 40-Hour Free Trial", body: "Start a 40-hour trial to assess coding skills, communication, quality, and delivery approach." },
      { n: "04", name: "Onboard the MERN Developer to Your Team", body: "Sign SLA and NDA, complete onboarding, and integrate the MERN developer into your workflow." },
    ],
  },

  whyUs: {
    eyebrow: "",
    title: "What Makes Our Selenium Tester Unique and Trustworthy?",
    body: "Hire Selenium Tester from us having 5+ years of average experience to build expressive, scalable, & visually appealing web applications.",
    items: [
      { name: "Senior MERN Stack Talent", body: "Hire skilled MERN developers with expertise in MongoDB, Express, React, Node, APIs, and cloud.", icon: "users" },
      { name: "Daily Reports + Clear Communication", body: "Get daily updates and sprint reports to stay informed on progress, priorities, blockers, and delivery.", icon: "gauge" },
      { name: "Free Project Quote Within 24 Hours", body: "Receive a clear project quote within 24 hours based on your scope, timeline, and needs.", icon: "globe" },
      { name: "Dedicated Project Manager Support", body: "A dedicated manager ensures smooth coordination, tracking, and communication throughout the project.", icon: "shield" },
      { name: "Flexible MERN Engagement Models", body: "Choose fixed price, time and material, or dedicated team models to match your project needs.", icon: "book" },
      { name: "Flexible Engagement Models", body: "Hire our experts from three custom engagement models as per your need - Full time, Part-time, and Milestone.", icon: "coins" },
    ],
  },

  techStack: {
    eyebrow: "",
    title: "Explore the Impressive Tools We Use",
    body: "We use a wide range of Selenium testing tools to address the functionality, security issues, user interface, and performance issues that accelerate time to market and reduce operational costs.",
    groups: [
      { name: "Framework", items: ["Selenium WebDriver", "Protractor", "Selenium IDE"] },
      { name: "Tools", items: ["Selenium Grid/VisGrid", "Cucumber", "Docker Selenium"] },
      { name: "Others", items: ["Jenkins", "Sauce Labs", "BrowserStack", "Extent-Report API"] },
    ],
  },

  faq: {
    eyebrow: "",
    title: "Frequently Asked Questions",
    body: "Know more about our processes and how we work, with the help of the following FAQs our clients ask.",
    items: [
      { q: "How experienced are the certified Selenium testers at Soft Suave?", a: "Certified Selenium Testers at Soft Suave have an average of 5+ years of experience helping companies of all sizes and in every industry to automate applications." },
      { q: "How web automation testing works with Selenium?", a: "Selenium automates testing that helps in validating web Apps across all browsers and platforms. Test scripts can be written in Java, Python, C#, PHP, Ruby, Perl & .NET and carried out in Windows, Mac, or Linux OS using any browser like Mozilla Firefox, Internet Explorer, Google Chrome, Safari, or Opera." },
      { q: "How to hire a cost-effective Selenium tester online?", a: ["First, analyze your project needs and hire a Selenium tester on a suitable hiring model. For better cost-effective hiring, opt for a mid-tier Indian software company.", `We are an award-winning Selenium testing company offering services for more than 9 years in ${COUNTRIES_PLUS} countries. Get top-quality services at the best price by choosing our milestone hiring model where you will pay only for the tasks completed.`] },
      { q: "I want you to assign a project, but I need to test your skills. Can you give a test?", a: "Yes! absolutely, we even encourage our clients to try a 1-week free trial to test our Selenium expert's skills, knowledge, and working style." },
    ],
  },
};

export const qaHireSkills: readonly HireSkill[] = [selenium];
