/**
 * Copy for /about — the Company "About Us" page.
 *
 * Sourced from the live page at https://www.softsuave.com/about rather than
 * written fresh: the headline, the mission and vision wording, the twelve
 * milestones and the nine leadership entries are the company's own claims, and
 * inventing replacements would put invented facts under a real company's name.
 * The meta, hero, overview and milestone copy is the live page's verbatim.
 *
 * Section order follows the live page: hero → overview with mission and vision
 * → milestones → leadership → recognitions → clients → contact.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ProcessContent } from "@/components/landing/process";
import type { TeamContent } from "@/components/landing/team";

import { sharedHeroBadges } from "./delivery-shared";
import { overviewImage } from "./overview-images";

export const aboutMeta = {
  slug: "about",
  path: "/about",
  /* The live page's title, verbatim. It already names the brand, so the page
     renders it WITHOUT the usual " | Soft Suave" suffix. */
  title: "Know More About Soft Suave for Your Business Needs",
  /* The title above is written for the SERP line; a breadcrumb crumb and a nav
     label want the short form. */
  shortTitle: "About Us",
  /* The live page's meta description, verbatim. */
  description:
    "Learn about Soft Suave, a leading technology company providing innovative solutions in software development, AI, and digital transformation worldwide.",
} as const;

export const aboutHero: HeroContent = {
  /* The live H1 verbatim, split so the accent lands on the noun phrase. The
     live hero is the H1 and this one paragraph and nothing else (review:
     "remove extra content in hero section"), so there are no points. */
  titleLines: ["AI-Enabled Product", "Engineering Partner"],
  body: [
    "Recognized as a leading AI-enabled product engineering partner, Soft Suave helps enterprises modernize systems, accelerate innovation, and build scalable digital platforms through specialized engineering expertise and outcome-driven delivery models.",
  ],
  points: [],
  badges: sharedHeroBadges,
  form: {
    eyebrow: "Talk to us",
    title: "Book a free consultation",
    note: "Tell us what you are building. We reply within one business day, and nothing is shared before an NDA is in place.",
    submit: "Book free consultation",
    sending: "Sending…",
    requirementLabel: "What are you building?",
    requirementPlaceholder:
      "A short description of the product, the team you need, or the problem you want solved.",
    subject: "Consultation request — About page",
  },
};

/* The live page's "Your Trusted AI-Enabled Product Engineering Partner" block,
   verbatim: three paragraphs, then Mission and Vision side by side inside the
   same section. The review asked for the two to be one section rather than a
   separate card grid after this one, so they are this section's two cards. */
export const aboutOverview: OverviewContent = {
  image: overviewImage("about"),
  eyebrow: "Our Mission And Vision",
  title: "Your Trusted AI-Enabled Product Engineering Partner",
  paragraphs: [
    "Soft Suave is a leading AI-enabled product engineering partner with 13+ years of experience delivering scalable technology solutions for global enterprises across diverse industries.",
    "From enterprise modernization to augmented engineering teams, we help businesses accelerate innovation, improve operational efficiency, and build future-ready digital ecosystems.",
    "Today, Soft Suave’s capabilities are further amplified through our strategic partnership with KiwiTech. This collaboration expands our innovation ecosystem, strengthens our global reach, and unlocks new opportunities for clients seeking transformative digital solutions.",
  ],
  points: [
    "Our Mission: To provide best-in-class AI-enabled product engineering services for diverse industries, from small to medium-sized enterprises.",
    "Our Vision: To raise innovation in development to higher standards and establish our quality service with global customers.",
  ],
  pointsVariant: "icons",
  pointIcons: ["target", "eye"],
};

/* The live page's timeline in its chronological order, each description
   verbatim. `n` is the year, and the page renders it as each card's label
   (`label="n"`): this is a chronology, not a sequence of steps, so there is no
   "Step N". The names are the headings the live page's older timeline markup
   gave these entries; 2023 and 2025 are named from their own descriptions. */
export const aboutMilestones: ProcessContent = {
  eyebrow: "Milestones",
  title: "Key Moments in Soft Suave’s Success Journey",
  body: "From humble beginnings to global delivery strength, our milestones showcase relentless engineering excellence, unwavering commitment, and transformative impact across industries worldwide",
  steps: [
    {
      n: "2012",
      name: "Establishment",
      body: "Soft Suave was established to serve companies across the USA.",
    },
    {
      n: "2013",
      name: "Sales Office in the USA",
      body: "Opened up a sales office at Maryland to support US clients.",
    },
    {
      n: "2014",
      name: "Market Expansion",
      body: "Business expanded to serve clientele across the UK, Australia, France, Denmark and Iceland.",
    },
    {
      n: "2015",
      name: "Ramped up Development Team Size",
      body: "Increased team size to 100 and delivered 100+ development projects.",
    },
    {
      n: "2016",
      name: "ISO 9001-2015 Certified",
      body: "Introduced quality systems and process to obtain ISO 9001-2015 certification.",
    },
    {
      n: "2017",
      name: "Launched an eCommerce Product",
      body: "Launched a grocery delivery application solution.",
    },
    {
      n: "2018",
      name: "Operations in the European Region",
      body: "Established operations to meet service demand from the European Region.",
    },
    {
      n: "2019",
      name: "Development Branch at Bangalore",
      body: "A development branch was established at Bangalore",
    },
    {
      n: "2020",
      name: "Ramped up Development Team Size",
      body: "Expanded team size from 200 to 300 specialists in diverse technologies.",
    },
    {
      n: "2021",
      name: "Development Branch at Perungudi, Chennai",
      body: "Opened a new development branch at Perungudi, Chennai.",
    },
    {
      n: "2023",
      name: "Moved to Navalur",
      body: "Perungudi branch office shifted with team expansion to Navalur.",
    },
    {
      n: "2025",
      name: "Strategic Partnership with KiwiTech",
      body: "KiwiTech acquires Soft Suave, forming a strategic partnership to accelerate global innovation.",
    },
  ],
};

/**
 * The nine leaders the live page lists, with the portrait assets copied from
 * softsuave.com into `public/images/about/`.
 *
 * Titles are the live page's own. Note the live page's Person JSON-LD is stale
 * against its own markup — it names four people, two with job titles the cards
 * no longer show, and points at an older asset directory. The cards are the
 * source of truth here, and the schema is generated from this list so the two
 * cannot drift apart again.
 */
export const aboutLeadership: TeamContent = {
  eyebrow: "Team",
  title: "Our Leadership Team: Visionaries Leading the Way",
  body: "Meet the leaders shaping Soft Suave’s growth and driving strategic innovations that redefine success.",
  members: [
    {
      name: "Ramesh Vayyavuru",
      role: "Founder & CEO",
      image: "/images/about/ramesh-vayyavuru.webp",
      linkedin: "https://www.linkedin.com/in/ramesh-vayavuru/",
    },
    {
      name: "Manohar Vayyavuru",
      role: "Co-Founder and CTO",
      image: "/images/about/manohar-vayyavuru.webp",
      linkedin: "https://www.linkedin.com/in/manohar-vayyavuru/",
    },
    {
      name: "Rakesh Gupta",
      role: "Chairman of the Board",
      image: "/images/about/rakesh-gupta.webp",
      linkedin: "https://www.linkedin.com/in/rakesh-gupta-506a34203/",
    },
    {
      name: "Gurvinder Batra",
      role: "Chief Strategy Officer",
      image: "/images/about/gurvinder-batra.webp",
      linkedin: "https://www.linkedin.com/in/gsbatra/",
    },
    {
      name: "Madhu Kadiyala",
      role: "Chief Delivery Head",
      image: "/images/about/madhu-kadiyala.webp",
      linkedin: "https://www.linkedin.com/in/madhu-kadiyala-97b39760/",
    },
    {
      name: "Kani Kumar",
      role: "Senior Technical Manager",
      image: "/images/about/kani-kumar.webp",
      linkedin: "https://www.linkedin.com/in/kani-kumar-179567aa/",
    },
    {
      name: "Monika Baranikumar",
      role: "Technical Manager",
      image: "/images/about/monika-baranikumar.webp",
      linkedin: "https://www.linkedin.com/in/monika-baranikumar-0269a6148/",
    },
    {
      name: "Sudhendra Devi",
      role: "Director – People & Strategic Alliance",
      image: "/images/about/sudhendra-devi.webp",
      linkedin: "https://www.linkedin.com/in/sudhendra-devi-281a6b91/",
    },
    {
      name: "Veeramani",
      role: "Lead – Digital Marketing",
      image: "/images/about/veeramani.webp",
      linkedin: "https://www.linkedin.com/in/joinwithveera/",
    },
  ],
};
