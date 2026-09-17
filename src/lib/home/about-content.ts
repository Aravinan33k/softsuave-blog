/**
 * Copy for /about — the Company "About Us" page.
 *
 * Sourced from the live page at https://www.softsuave.com/about rather than
 * written fresh: the headline, the mission and vision wording, the ten
 * milestones and the nine leadership entries are the company's own claims, and
 * inventing replacements would put invented facts under a real company's name.
 * Where the live page's copy is thin (it ships no meta description at all, and
 * its milestone bodies are single clauses), the wording here is tightened to
 * this surface's voice without adding any claim the live page does not make.
 *
 * Section order follows the live page: hero → mission/vision → what we do →
 * milestones → leadership → recognitions → clients → contact.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { CardGridContent } from "@/components/landing/industries";
import type { ProcessContent } from "@/components/landing/process";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { TeamContent } from "@/components/landing/team";

import { sharedHeroBadges } from "./delivery-shared";

export const aboutMeta = {
  slug: "about",
  path: "/about",
  /* The live page's title is "Know More About Soft Suave for Your Business
     Needs" — vague, and it leads on a filler phrase.
     Every page here renders as `${title} | Soft Suave`, so the brand name must
     NOT appear in this string: "About Soft Suave" would ship as "About Soft
     Suave | Soft Suave". Leading on the positioning rather than the bare word
     also gives the tab and the SERP line something to say. */
  title: "About Us — AI-Enabled Product Engineering Partner",
  /* The title above is written for the SERP line; a breadcrumb crumb and a nav
     label want the short form. */
  shortTitle: "About Us",
  /* The live page ships NO meta description, so there is nothing to follow
     here. Kept under ~160 characters: that is roughly what a result snippet
     renders before truncating, and the sibling hire pages assert a 175 ceiling
     for the same reason. */
  description:
    "Soft Suave is an AI-enabled product engineering partner with 13+ years building scalable software for global enterprises. Meet our leadership and milestones.",
} as const;

export const aboutHero: HeroContent = {
  eyebrow: "About Us",
  /* The live H1 verbatim, split so the accent lands on the noun phrase. */
  titleLines: ["AI-Enabled Product", "Engineering Partner"],
  body: [
    "Recognized as a leading AI-enabled product engineering partner, Soft Suave helps enterprises modernize systems, accelerate innovation, and build scalable digital platforms through specialized engineering expertise and outcome-driven delivery models.",
    "Thirteen years on from a single office in Chennai, the company runs delivery centres in Chennai and Bengaluru, a sales presence in the USA, and an engineering bench of 400+ specialists — now amplified by a strategic partnership with KiwiTech.",
  ],
  points: [
    "13+ years building software for global enterprises",
    "400+ AI and engineering specialists",
    "ISO 9001:2015 and ISO/IEC 27001:2022 certified",
    "Delivery in Chennai and Bengaluru, sales in the USA",
    "Strategic partnership with KiwiTech",
  ],
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

export const aboutOverview: OverviewContent = {
  eyebrow: "Our Mission And Vision",
  title: "Your Trusted AI-Enabled Product Engineering Partner",
  paragraphs: [
    "Soft Suave is a leading AI-enabled product engineering partner with 13+ years of experience delivering scalable technology solutions for global enterprises across diverse industries. From enterprise modernization to augmented engineering teams, we help businesses accelerate innovation, improve operational efficiency, and build future-ready digital ecosystems.",
    "Today, Soft Suave's capabilities are further amplified through our strategic partnership with KiwiTech. This collaboration expands our innovation ecosystem, strengthens our global reach, and unlocks new opportunities for clients seeking transformative digital solutions.",
  ],
  pullQuote:
    "To raise innovation in development to higher standards and establish our quality service with global customers.",
};

/* Mission and vision as the page's two stated commitments. Kept as a card pair
   rather than folded into the prose above because the live page gives each its
   own heading, and collapsing them would drop a documented H3. */
export const aboutMissionVision: CardGridContent = {
  eyebrow: "What Drives Us",
  title: "Mission and Vision",
  body: "Two commitments that have not changed since 2012 — what we build for clients, and the standard we hold ourselves to while building it.",
  items: [
    {
      name: "Our Mission",
      body: "To provide best-in-class AI-enabled product engineering services for diverse industries, from small to medium-sized enterprises.",
      icon: "gauge",
    },
    {
      name: "Our Vision",
      body: "To raise innovation in development to higher standards and establish our quality service with global customers.",
      icon: "globe",
    },
  ],
};

/* The ten milestones from the live page's timeline, newest first as it shows
   them. `n` carries the date because this section is a chronology, not a
   sequence of steps — the component renders it as the card's ordinal either
   way. */
export const aboutMilestones: ProcessContent = {
  eyebrow: "Milestones",
  title: "Key Moments in Soft Suave's Success Journey",
  body: "From humble beginnings to global delivery strength, our milestones showcase relentless engineering excellence, unwavering commitment, and transformative impact across industries worldwide.",
  steps: [
    {
      n: "2021",
      name: "Development Branch at Perungudi, Chennai",
      body: "Opened a new development branch at Perungudi, Chennai, expanding delivery capacity in the company's home city.",
    },
    {
      n: "2020",
      name: "Ramped up Development Team Size",
      body: "Expanded team size from 200 to 300 specialists across diverse technologies.",
    },
    {
      n: "2019",
      name: "Development Branch at Bangalore",
      body: "A second development branch was established at Bangalore, opening access to a deeper engineering talent pool.",
    },
    {
      n: "2018",
      name: "Operations in the European Region",
      body: "Established operations to meet service demand from the European region.",
    },
    {
      n: "2017",
      name: "Launched an eCommerce Product",
      body: "Launched a grocery delivery application solution, the company's first product of its own.",
    },
    {
      n: "2016",
      name: "ISO 9001-2015 Certified",
      body: "Introduced quality systems and processes to obtain ISO 9001-2015 certification.",
    },
    {
      n: "2015",
      name: "Ramped up Development Team Size",
      body: "Increased team size to 100 and delivered 100+ development projects.",
    },
    {
      n: "2014",
      name: "Market Expansion",
      body: "Business expanded to serve clientele across the UK, Australia, France, Denmark and Iceland.",
    },
    {
      n: "2013",
      name: "Sales Office in the USA",
      body: "Opened a sales office at Maryland to support US clients directly.",
    },
    {
      n: "2012",
      name: "Establishment",
      body: "Soft Suave was established to serve companies across the USA.",
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
  body: "Meet the leaders shaping Soft Suave's growth and driving the strategic decisions behind how we build and deliver.",
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

export const aboutMidCta: CtaBandContent = {
  eyebrow: "Work with us",
  title: "Thirteen years of shipping, pointed at your roadmap",
  body: "Whether you need a product built, a legacy system modernized, or an engineering team that works only on your codebase — start with a conversation and an NDA.",
  cta: { label: "Book free consultation", href: "#enquiry" },
};
