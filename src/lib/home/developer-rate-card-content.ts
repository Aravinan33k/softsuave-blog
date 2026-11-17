/**
 * Copy for the Developer's Rate Card page (`/developer-rate-card`).
 *
 * A clone of softsuave.com/developer-rate-card on the case-study page
 * template (`components/case-study/case-study.tsx`), by request: the live
 * page is itself a contents column beside a run of sections, which is the
 * case-study layout. The copy is the live page's, verbatim, in its order.
 *
 *   Hero                kicker and H1, and a button to the download form
 *   About … Rate Card   the article's sections, listed in the contents column
 *   FAQ                 landing/faq, after the article (listed in the contents)
 *   Download Rate Card  common/form-band: the copy, the notice and the form
 *
 * Differences from the live page:
 *
 *  - The live page's closing "Book Free Consultation" block is not carried
 *    over (by request); the page closes on the "Download Rate Card" section.
 *    Its form is an ordinary enquiry, as live ("so that we can … send the best
 *    pricing"), not a PDF download, with the shared form's fields.
 *  - The hero carries a "Download Rate Card" button to that section, as does
 *    the contents column.
 *  - The company figures come from `lib/company-figures.ts`, the one place
 *    they are written (a test enforces it): 150+ clients, 400+ developers and
 *    the $14 rate match live; years read 14+ where live says 13+, and
 *    countries 20+ where live says 21+.
 *  - The "On-Demand Software Teams" cards lead with the site's icon badges,
 *    not the live line icons. The skill set is four cards of pills (by
 *    request), without the live technology logos. The hiring-process picture is the wide one only;
 *    the live page's separate portrait version for phones is not used.
 *  - The rate table sets each row's technologies as pills (by request), where
 *    live sets a bullet list in the cell.
 */

import type { CaseStudyContent } from "@/components/case-study/case-study";
import type { FaqContent } from "@/components/landing/faq";
import type { FormBandContent } from "@/components/common/form-band";
import {
  CLIENTS_PLUS,
  COUNTRIES_PLUS,
  FIGURES,
  SPECIALISTS_PLUS,
  YEARS_PLUS,
} from "@/lib/company-figures";

const IMG = "/brand/developer-rate-card";

export const rateCardMeta = {
  path: "/developer-rate-card",
  // The live page's <title>, description and canonical, verbatim. It is
  // index,follow and has no Open Graph tags and no structured data.
  title: "Download Developer's Rate Card - Soft Suave",
  description:
    "Discover Soft Suave's Developer's Rate Card and explore our competitive pricing for top-notch development services. Download now for transparent pricing and quality assurance.",
  canonical: "https://www.softsuave.com/developer-rate-card",
} as const;

/** The "Download Rate Card" section's anchor — the live page's own id. */
export const RATE_CARD_SECTION_ID = "download_rate_card";

const TO_FORM = { label: "Download Rate Card", href: `#${RATE_CARD_SECTION_ID}` } as const;


const RATE = `$${FIGURES.hourlyRate}`;

export const rateCard: CaseStudyContent = {
  hero: {
    // Centred, the kicker a pill, the H1 on one line with "Rate Card" in the
    // accent, and two buttons (by request). The H1 reads "Developer's Rate
    // Card" as the requested design sets it (live: "Developer's RATE CARD").
    centered: true,
    eyebrow: "On-Demand Software Teams",
    titleLines: ["Developer's", "Rate Card"],
    accent: "Rate Card",
    body: [],
    points: [],
    ctas: [TO_FORM, { label: "View Rates", href: "#rate_card" }],
  },
  tocTitle: "Rate Card",
  tocExtra: [{ id: "faq", label: "FAQ's" }],
  tocAction: TO_FORM,
  // The page closes on the "Download Rate Card" section instead (see the route).
  closingBand: false,
  sections: [
    {
      id: "about",
      nav: "About",
      title: "Who is Soft Suave?",
      body: [
        "Soft Suave: Your Trusted IT Outsourcing Partner",
        `Soft Suave, founded in 2012, is a prominent Offshore Software Development Company in India. We have demonstrated success by providing excellent IT outsourcing services globally. Our company uses the expertise of over ${SPECIALISTS_PLUS} skilled and knowledgeable technology developers to offer creative and efficient technology solutions.`,
        "We use profound business domain expertise, verified methods, and cutting-edge technologies to offer solutions that are top-notch in quality, dependable, and adaptable solutions as per your business requirements.",
      ],
      links: [{ text: "Offshore Software Development Company in India", href: "/offshore-software-development-company" }],
      stats: [
        { value: YEARS_PLUS, label: "Years in Business" },
        { value: CLIENTS_PLUS, label: "Happy Customers" },
        { value: SPECIALISTS_PLUS, label: "Developers" },
        { value: COUNTRIES_PLUS, label: "Countries" },
      ],
    },
    {
      id: "on-demand_software_teams",
      nav: "Software Teams",
      title: "On-Demand Software Teams",
      body: [
        "Build Your Team with Skilled Developers",
        "Creating a strong tech team may require significant time and resources. Soft Suave simplifies the hiring process by giving you access to a pre-screened group of talented and experienced offshore developers from India. We align our selection with your particular requirements, thus saving you precious time and money.",
      ],
      cards: {
        variant: "icon",
        items: [
          {
            name: "Streamlined Recruitment",
            body: "Begin interviewing suitable applicants in less than two days after you set forth your requirements. Our effective method makes sure you get the correct talent fast, freeing up time for managing your business.",
          },
          {
            name: "Excellent Matches",
            body: "We appreciate the significance of an appropriate match. Our careful selection method shows a 93% first-interview-to-selection ratio, assuring that you receive high-level talents that match your project requirements.",
          },
          {
            name: "Solutions That Save Money",
            body: "Procure a skilled workforce with a noticeable monetary advantage. Our services can provide savings of up to 50% on salaries when compared to local hiring, yet still maintain high quality.",
          },
          {
            name: "Flawless Cooperation",
            body: "We manage a team that functions in your time zone or one with a convenient overlap for better communication, guaranteeing smooth discussions and timely delivery of projects.",
          },
          {
            name: "Smooth Onboarding",
            body: "We also deal with administrative complexities, such as IT arrangement, handling payroll, and assisting with remote onboarding. Your new employee will be prepared to start their work immediately.",
          },
          {
            name: "Clear & Monthly Payments",
            body: "We give straightforward structures every month, permitting you to concentrate on your projects rather than getting tangled in paperwork details. The agreements are easy to comprehend and make sure that every rule is followed as per law.",
          },
        ],
      },
    },
    {
      id: "what_to_expect",
      nav: "What to Expect",
      title: "What to Expect From Resources",
      body: [
        "Soft Suave understands the difficulty in locating the perfect tech talent. Therefore, we provide a careful screening process to introduce you to proficient Indian developers who could match well with your team.",
        "Our developers have solid technical abilities and relevant experience but most importantly, they are recognized for their capability in solving problems and clear communication. We also think about cultural alignment in the process, making sure that our developers fit well with your current team. Soft Suave can thus help you find the right talent for elevating your project's success.",
      ],
      image: { src: `${IMG}/expert_resource_img.webp`, width: 1043, height: 481, alt: "expert from resource" },
    },
    {
      id: "process",
      nav: "Process",
      title: "Hiring Process",
      body: [
        "We prioritize clarity and your success. Choose to interview candidates yourself or try our free 40-hour trial to find the perfect developer.",
      ],
      image: { src: `${IMG}/hire-steps-web.webp`, width: 1921, height: 309, alt: "hire steps for web view" },
    },
    {
      id: "skill_set",
      nav: "Skill Set",
      title: "Skill Set",
      body: [
        "Soft Suave's broad tech expertise lets us adapt to your project's needs. We deliver the perfect solution, no matter your software development or outsourcing requirements.",
      ],
      // The four stacks as cards of pills (by request), each name an H3 as live.
      // "Bootstrap" and "iOS" as the requested design spells them (live:
      // "Bootstarp", "ios").
      chipGroups: [
        { title: "Frontend", items: ["React Js", "Angular", "Vue Js", "HTML", "Bootstrap", "Javascript"] },
        { title: "Backend", items: [".Net", "Java", "PHP", "Node Js", "Python", "Laravel"] },
        { title: "Mobility", items: ["Android", "iOS", "React Native", "Flutter", "Swift"] },
        { title: "DevOps & Cloud Solution", items: ["Azure", "AWS", "TensorFlow", "Dialog"] },
      ],
    },
    {
      id: "rate_card",
      nav: "Rate Card",
      title: "Check Out the Developer Rates",
      // The live table's rows, as cards of pills (by request). Its prices read
      // "XXX" (they come with the downloaded rate card); two rows list no
      // experience or price, shown as a dash. "Mobile Technology" and
      // "Automation Testing" as the requested design spells them (live:
      // "Technolgy", "Automativon").
      rateTable: {
        head: ["Technologies", "Experience", "Hourly Pricing"],
        rows: [
          { name: "Mobile Technology", items: ["Hybrid (React Native, Flutter, Ionic)", "iOS - Swift, Object C", "Android - Kotlin, Java"] },
          { name: "Web Front-end Technology", items: ["React JS", "Angular", "Vue JS", "React Native"], experience: "3+ Years", price: "XXX" },
          { name: "Back-end Technology", items: ["NodeJs", "Java", ".NET", "PHP", "Python", "ROR"], experience: "4+ Years", price: "XXX" },
          { name: "DevOps", items: ["AWS", "Google Cloud", "Azure"], experience: "5+ Years", price: "XXX" },
          { name: "Quality Assurance", items: ["Automation Testing: Selenium, Cypress", "Manual Testing"], experience: "6+ Years", price: "XXX" },
          { name: "UI/UX Designer", items: ["Photoshop", "Adobe XD", "Illustrator", "Figma"] },
        ],
      },
    },
  ],
};

export const rateCardFaqs: FaqContent = {
  eyebrow: "FAQ's",
  title: "Frequently Asked Questions (FAQs)",
  body: "",
  items: [
    {
      q: "Why hire developers?",
      a: "Developers are the builders of the digital world. They transform your ideas (websites, apps) into reality, improve your business processes and user experience, and keep things running smoothly behind the scenes. To ensure digital success, it is essential to have a skilled team. From creating user-friendly websites to developing a powerful web scraping tool, they help build it all.",
    },
    {
      q: "What’s the cost of hiring a developer?",
      a: `The cost depends on experience, location, and skillset. Expect ${RATE} and more from Soft Suave, according to the project scale and developer’s expertise. Think of it as an investment in your business growth.`,
    },
    {
      q: "Can I hire a skilled developer for hourly or project-based tasks?",
      a: "Yes, you can. Hourly rates are more suitable for short-term work like maintenance or short-term projects. However project-based rates are more suited for well-defined projects with a clear scope of work. The flexibility allows for finding the perfect engagement model for your needs.",
    },
    {
      q: "What is the cost of hiring a mobile app developer in India?",
      a: `India offers a competitive talent pool. Mobile app developer costs can start from ${RATE} per hour, and increase based on expertise. Procure global talents while being budget-conscious.`,
    },
    {
      q: "How much do Indian web developers charge?",
      a: "Like mobile app developers, Indian web developer rates typically vary depending on the level of complexity and the developer's experience. Get quality work done without breaking the bank.",
    },
    {
      q: "Are there any industry standards for software developer hourly rates?",
      a: "While there's no one-size-fits-all standard, online freelance platforms and developer salary reports can provide a good idea of average rates. Make sure you are getting the right price by conducting research.",
    },
    {
      q: "What if I'm not satisfied with the work?",
      a: "Look for reputable developers with established processes for addressing client concerns. Clear communication channels and well-defined revision policies are key. Peace of mind knowing you're protected with clear communication and revision options.",
    },
    {
      q: "Do you offer additional skills?",
      a: "Many development teams encompass a range of specializations beyond just coding. This may include testers, quality assurance (QA) specialists, UI/UX designers, and business analysts. Build a well-rounded team with the expertise to bring your project to fruition.",
    },
  ],
};

export const rateCardDownload: FormBandContent = {
  kicker: "Download",
  title: "Download Rate Card",
  body: "To download, help us understand your requirements so that we can match your expectations and send the best pricing.",
  // The live form's notice, verbatim.
  alert: {
    label: "Alert:",
    text: "This form is for business, not candidates. To apply for jobs,",
    linkLabel: "click here",
    href: "/career-overview",
  },
  form: {
    // The section's own heading names the form; the card carries none.
    title: "",
    submit: "Submit",
    sending: "Sending...",
    requirementLabel: "Please tell us your requirements.",
    requirementPlaceholder: "Please tell us your requirements.",
    subject: "Developer rate card request",
  },
};
