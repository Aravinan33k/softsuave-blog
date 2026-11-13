/**
 * Copy for `/software-development-company-spain`.
 *
 * Every string is softsuave.com/software-development-company-spain's own, in
 * its own order — headings, paragraphs, services, the legacy and industry
 * bands, technologies, FAQ answers (lists included) and image alt text —
 * carried across without rewording. Oddities on the live page are kept as
 * published:
 *
 *   - the `<title>` ends with a space;
 *   - "a software development company in Spain , we focus" (space before the
 *     comma);
 *   - "Yes. we offer" (FAQ);
 *   - "Soft Suave completely owns it" (the answer to who owns the software).
 *
 * The live page's head has Open Graph tags but no Twitter tags and no
 * structured data at all (no JSON-LD block), so this page emits neither.
 *
 * The same layout as the France and Germany pages — rendered by
 * `components/landing/software-location-page.tsx`, with the bands every
 * software location page shares from `software-location-shared.ts`. Its
 * overview art is the France page's (`custom-m.png`), with Spain's alt text.
 */

import type { HeroContent } from '@/components/generative-ai/hero';
import type { OverviewContent } from '@/components/generative-ai/overview';
import type { FaqContent, FaqAnswerBlock } from '@/components/generative-ai/faq';
import type { CardGridContent as TileGridContent } from '@/components/generative-ai/industries';
import type { ServicesGridContent } from '@/components/common/services-grid';
import type { TechStackContent } from '@/components/landing/tech-stack';
import type { SoftwareLocationPageContent } from '@/components/landing/software-location-page';
import { locationClientLogos, locationClose, locationHeroForm } from '@/lib/home/mobile-app-location-shared';
import {
  SOFTWARE_IMG,
  softwareIndustryItems,
  softwareLegacyFigure,
  softwareTechGroups,
  softwareTechMarks,
} from '@/lib/home/software-location-shared';

export const sdesMeta = {
  path: '/software-development-company-spain',
  // The live page's head, verbatim — the <title> ends with a space. It has
  // no Twitter tags.
  title: 'Dynamic Software Development Company in Spain ',
  description:
    'Soft Suave is one of the most reliable software development companies in Spain with a decade of experienced experts.',
  canonical: 'https://www.softsuave.com/software-development-company-spain',
  ogTitle: 'Dynamic Software development Company in Spain',
  ogDescription:
    'Soft Suave is one of the most reliable software development companies in Spain with a decade of experienced experts.',
  ogSiteName: 'Soft Suave',
  ogImage: 'https://www.softsuave.com/assets/images/software-development-company-spain.jpg',
} as const;

export const sdesHero: HeroContent = {
  titleLines: ['High-end Software Development Company In Spain'],
  // The live H1 highlights "Software Development Company In Spain".
  accent: 'Software Development Company In Spain',
  body: [
    "Soft Suave delivers flawless, market-friendly, useful Software development solutions that boost your business' productivity and tap into digital epoch opportunities.",
    'Want to Outsource Software Development Projects? Get in touch for a free quote!',
  ],
  bodyLinks: [{ text: 'for a free quote!', href: '/free-quote' }],
  points: [],
  form: locationHeroForm('Software development enquiry (Spain)'),
};

export const sdesAbout: OverviewContent = {
  eyebrow: '',
  title: 'A Premium Software Development Company in Spain',
  paragraphs: [
    'Enhance your business growth through innovative software engineering and transform digitally. The primary mission of Soft Suave is to provide innovative applications for the betterment of the world and simplify tasks.',
    "Our goal is to transform dynamic business ideas into exceptional digital products. Are you looking for a suitable software development company in Spain that can take care of the software development process for you? Here's where you can find everything you need. Ideate, Design, and Develop data-driven digital products that address business challenges.",
    'Our clients around the world build booming businesses relying on technology. Founders and stakeholders working on upcoming software-driven initiatives often need assistance translating their vision into a polished, market-ready product. Our expertise lies in that area. Conceptualizing, Designing, and Developing custom features for complex web systems is what we excel at.',
    "As a software development company in Spain , we focus on setting clear Expectations, Providing excellent communication, and Delivering best-in-class products on time and within the budget for the Spanish people's needs. Hopefully, we will earn the privilege of having you as a long-term partner and continue to be a vital part of your business as a result.",
  ],
  image: {
    // The same art as the France page's overview (`custom-m.png`).
    src: `${SOFTWARE_IMG}/overview-france.webp`,
    width: 849,
    height: 830,
    alt: 'Best software development company in Spain',
    fit: 'column',
  },
};

export const sdesServices: ServicesGridContent = {
  eyebrow: '',
  title: 'Software Development Expertise at Soft Suave',
  body: 'Our history as the top software development company in Spain ensures we always deliver all business needs that fulfill business value and customer needs.',
  items: [
    {
      name: 'Enterprise Solutions',
      body: 'With our custom enterprise software, businesses can thrive in their development processes. Specifically designed for a distinctive group of users and tailored to suit their needs. Our software development company automates your business processes and ensures complete user satisfaction.',
    },
    {
      name: 'Product Engineering Services',
      body: 'Product engineers are responsible for designing commercial products and their production processes. Based on industry research, this position works closely with product development teams to turn ideas into marketable products. Our experienced software development team works closely with our clients to create compelling and high-performing product solutions.',
    },
    {
      name: 'AI/VI Technologies',
      body: 'The use of artificial intelligence reduces the failure rate and speeds up the development process by allowing a computer to do fast and accurate testing. AI can help software developers streamline processes, reduce waste, and automate repetitive manual processes faster and more efficiently.',
    },
    {
      name: 'Cloud Application',
      body: 'Our Applications hosted in the cloud provide quick response times and do not need to be installed locally. Although they can function offline, they can also be updated online. Despite constant control, cloud applications do not always consume computer or communication storage space.',
    },
    {
      name: 'SAAS Development',
      body: 'Utilizing our cloud expertise, we help you create SaaS-based solutions that minimize infrastructure complexity, improve scalability, reduce operational costs, and improve performance across your business.',
    },
    {
      name: 'eCommerce Development',
      body: 'You can hire our highly professional eCommerce app development team to develop an app in the niche of your choice. The entire eCommerce app development cycle can be handled by us, Including building custom eCommerce applications for Android, iOS platforms, and cross-platform.',
      // The one live card whose "Know More" is a link.
      href: '/ecommerce-mobile-app-development-company',
    },
  ],
};

/** "Enhancing Legacy Enterprise Software" — four H3 items beside the live band's illustration. */
export const sdesLegacy: TileGridContent = {
  eyebrow: '',
  title: 'Enhancing Legacy Enterprise Software',
  body: "Managing your business processes has become easier because of technology, but you may encounter problems if your legacy system is outdated. With our software development service's expertise in both new and older technologies, you can easily upgrade, enhance & maintain your software.",
  bodyLinks: [{ text: 'legacy system', href: '/legacy-modernization-services' }],
  items: [
    {
      name: 'Application Modernization',
      body: "Upgrade your legacy software to meet the needs of today's businesses by adding new features.",
    },
    {
      name: 'Application Migration',
      body: 'Migrate your software to newer technologies to maintain its quality. A change is better for the upcoming generation.',
    },
    { name: 'Maintenance & Support', body: 'Our 24/7 expert team is available to help you manage your business software on a regular basis.' },
    { name: 'IT Strategy Consulting', body: 'With the help of our highly experienced IT team, you can ensure minimal downtime.' },
  ],
  figure: softwareLegacyFigure('Best software development company in Spain'),
};

/** "Top Firms In Spain Benefited From the Service" — eight H4 tiles and the live "Get Started". */
export const sdesIndustries: TileGridContent = {
  eyebrow: '',
  title: 'Top Firms In Spain Benefited From the Service',
  body: "We provide high-tech software solutions to a wide range of industries. Our team will help you develop an action plan aligned with your organization's goals in order to achieve the software's short- and long-term objectives.",
  cta: { label: 'Get Started', href: '/free-quote' },
  items: softwareIndustryItems,
};

export const sdesTech: TechStackContent = {
  eyebrow: '',
  title: 'Significant Technologies For Your Software Development',
  body: 'Here is a list of Soft Suave developers with expertise in a variety of technologies.',
  groups: softwareTechGroups,
};

/** An answer's blocks as one plain-text string, for `a`. */
const plain = (blocks: readonly FaqAnswerBlock[]) =>
  blocks.map((b) => (typeof b === 'string' ? b : b.list.join(' '))).join(' ');

const prepareBlocks: readonly FaqAnswerBlock[] = [
  'You should know what you need first, software development is the main category of many separate technologies and device based. Like web app development, and mobile app development or Apps that connect with wearables or machines.',
  {
    list: [
      'What are your requirements and why do you need an app in the first place?',
      'What do you like to gain from developing this software?',
      'Who are you developing this software for? Age, specific gender, or geographical location-based.',
      'What kind of UX and UI ideas do you have and how do you want to present your brand identity to the world?',
    ],
  },
  'These are some basics, for you to prepare before coming to us for custom software development services.',
];

const timeBlocks: readonly FaqAnswerBlock[] = [
  "There's no clear answer. Because based on the size of the application, these processes will take a certain amount of time:",
  {
    list: [
      'Amount of modules and functions.',
      'The number of future users.',
      'The complexity of particular processes.',
      'Software integration potential.',
    ],
  },
  'The time it will take to build the solution can only be estimated when all of these factors are taken into account.',
];

/** The visible FAQ, verbatim — questions are H4s on the live page, which publishes no structured data. */
export const sdesFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Some useful pieces of information about our Spanish software development service.',
  links: [{ text: '30 minutes free consultation', href: '/30-min-free-consultation' }],
  items: [
    {
      q: 'Before hiring a software development team, what should I do to prepare myself?',
      a: plain(prepareBlocks),
      blocks: prepareBlocks,
    },
    {
      q: 'Do you provide software development consulting services?',
      a: 'Yes. we offer 30 minutes free consultation, where you can get to have a conversation with Industry experts in software development services. You can clear all your doubts and have a clear idea of how you want to build your software.',
    },
    {
      q: 'How do you ensure confidentiality? Who owns the software that you write for me?',
      a: "Soft Suave completely owns it and you don't have to worry about security leaks, we follow strict NDA procedures. With trust and skills, your software will definitely stand out in the market.",
    },
    {
      q: 'What is the estimated development time for my application?',
      a: plain(timeBlocks),
      blocks: timeBlocks,
    },
  ],
};

export const sdesClose = locationClose('Software development consultation (Spain)');

/** The whole page, for `SoftwareLocationPage`. */
export const sdesPage: SoftwareLocationPageContent = {
  key: 'software-spain',
  hero: sdesHero,
  clientLogos: locationClientLogos,
  about: sdesAbout,
  services: sdesServices,
  legacy: sdesLegacy,
  // The framed-illustration design for the legacy band, as on Germany and France.
  legacyStyle: 'showcase',
  industries: sdesIndustries,
  tech: sdesTech,
  techMarks: softwareTechMarks,
  faqs: sdesFaqs,
  close: sdesClose,
};
