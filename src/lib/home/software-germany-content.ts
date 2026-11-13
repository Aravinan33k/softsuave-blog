/**
 * Copy for `/software-development-company-germany`.
 *
 * Every string is softsuave.com/software-development-company-germany's own,
 * in its own order — headings, paragraphs, services, the legacy and industry
 * bands, technologies, FAQ answers and image alt text — carried across without
 * rewording. Oddities on the live page are kept as published:
 *
 *   - the overview image's alt text names Spain ("Best software development
 *     company in Spain");
 *   - "the experts at the Software development firms in Germany from Soft
 *     Suave." (a sentence without a verb, Product Engineering card);
 *   - "Soft Suave place the highest priority", "germanian projects", "soft
 *     suave" (FAQ);
 *   - "It's safe until we handed it to you."
 *
 * The same layout as the France page — rendered by
 * `components/landing/software-location-page.tsx`, with the bands every
 * software location page shares (industries tiles, technology stack, legacy
 * art) from `software-location-shared.ts`. Links as live: only the eCommerce
 * service card links; three of the eight industry tiles link.
 *
 * The live page publishes no FAQPage schema, so none is emitted for its FAQ.
 */

import type { HeroContent } from '@/components/generative-ai/hero';
import type { OverviewContent } from '@/components/generative-ai/overview';
import type { FaqContent } from '@/components/generative-ai/faq';
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

export const sddeMeta = {
  path: '/software-development-company-germany',
  // The live page's head, verbatim.
  title: 'The Best Software Development Company In Germany',
  description:
    'Looking for a reliable software development company in Germany? We specialize in custom solutions for various industries. Get in touch today!',
  canonical: 'https://www.softsuave.com/software-development-company-germany',
  ogTitle: 'The Best Software Development Company in Germany',
  ogDescription:
    'Looking for a reliable software development company in Germany? We specialize in custom solutions for various industries. Get in touch today!',
  ogSiteName: 'Soft Suave Technologies',
  ogImage: 'https://www.softsuave.com/assets/images/software-development-company-germany.jpg',
  twitterSite: '@softsuave',
} as const;

export const sddeHero: HeroContent = {
  titleLines: ['Custom Software Development Company In Germany'],
  // The live H1 highlights "Germany".
  accent: 'Germany',
  body: [
    'Enhance Your Business Efficiency With a Software Development Agency in Germany from Soft Suave.',
    'Want to Outsource Software Development Projects? Get in touch for a free quote!',
  ],
  bodyLinks: [{ text: 'for a free quote!', href: '/free-quote' }],
  points: [],
  form: locationHeroForm('Software development enquiry (Germany)'),
};

export const sddeAbout: OverviewContent = {
  eyebrow: '',
  title: 'Get the Feature-rich Solutions Through Soft Suave IT Solutions',
  paragraphs: [
    'Understanding modern markets and translating them into real business solutions is Soft Suave’s specialty.',
    'Soft Suave IT Solutions is a leading software development company in Germany that offers bespoke solutions and expertise in multiple technologies. We offer software development services to help businesses succeed, from simple to large software solutions.',
    'Backed by over a decade of experience in technology and delivering remarkable solutions, our team of software development engineers and designers specialize in creating tailor-made software solutions using a range of technologies and processes. We pride ourselves on delivering superior software experience, creative features, and on-time project delivery with agility.',
    'As a top software development agency, we are dedicated to delivering success for our European clients. Businesses looking to develop user-friendly software can turn to us for custom software development services in Germany.',
  ],
  links: [{ text: 'software development engineers', href: '/hire-software-developers' }],
  image: {
    src: `${SOFTWARE_IMG}/overview-germany.webp`,
    width: 434,
    height: 427,
    // The live alt text, verbatim — it names Spain.
    alt: 'Best software development company in Spain',
    fit: 'column',
  },
};

export const sddeServices: ServicesGridContent = {
  eyebrow: '',
  title: 'Soft Suave’s Multi-dimensional Expertise Service',
  body: 'As one of the leading software development companies in Germany, we assist businesses, including start-ups and SMEs, by providing software development services.',
  items: [
    {
      name: 'Enterprise App Development',
      body: 'You must establish a mobile strategy for your organization to engage your customers more effectively when you create a mobile app. The decision-making process is also sped up as a result of this.',
    },
    {
      name: 'Product Engineering Services',
      body: 'Using high-end technologies and architectures, the experts at the Software development firms in Germany from Soft Suave. To deploy innovative software products, organizations need world-class software product engineering services and solutions.',
    },
    {
      name: 'AI/VI Technologies',
      body: 'AI allows a computer to perform fast and accurate testing, reducing failure rates and shortening development time. The development of software should be automated with artificial intelligence, which will streamline processes, reduce waste, and substitute repetitive manual processes for more automated ones.',
    },
    {
      name: 'Cloud Application',
      body: 'There are different stages of software development involved in preparing your app for market launch. DevOps practices and tools like Kubernetes are used by the best Cloud app development teams.',
    },
    {
      name: 'SAAS Development',
      body: 'Through our cloud expertise, we help you create SaaS-based solutions that offer minimal infrastructure complexity, improve scalability, reduce operational costs, and achieve performance excellence across your business endpoints.',
    },
    {
      name: 'eCommerce Development',
      body: 'Businesses of all types are now using eCommerce apps. Using an eCommerce app, you can directly sell whatever you want. With the help of an eCommerce app development company like Soft Suave, you can develop a variety of different eCommerce applications.',
      // The one live card whose "Know More" is a link.
      href: '/ecommerce-mobile-app-development-company',
    },
  ],
};

/** "Enrich Legacy Upgrade" — four H3 items beside the live band's illustration. */
export const sddeLegacy: TileGridContent = {
  eyebrow: '',
  title: 'Enrich Legacy Upgrade',
  body: 'Enhancement is what sweetens the application with customer-attractive features and support that made them trust you.',
  items: [
    {
      name: 'Application Modernization',
      body: 'Update your existing applications with advanced features and technology to boost your online presence.',
    },
    {
      name: 'Application Migration',
      body: 'Change is one of the best options to get rid of some useless or outdated technologies.',
    },
    { name: 'Maintenance & Support', body: 'Our expert team is available 24/7 to assist you in managing your business software.' },
    { name: 'IT Strategy Consulting', body: 'Ensure minimal downtime by consulting with our highly experienced IT team.' },
  ],
  figure: softwareLegacyFigure('Best software development company in Germany'),
};

/** "Our Profit Guaranteed Service to Diverse Industries" — eight H4 tiles and the live "Get Started". */
export const sddeIndustries: TileGridContent = {
  eyebrow: '',
  title: 'Our Profit Guaranteed Service to Diverse Industries',
  body: "Providing high-tech software solutions to a variety of industries, including Retail, Healthcare, Education, and Logistics, is our goal. We will help you develop an action plan aligned with your organization's goals for software's short- and long-term goals.",
  cta: { label: 'Get Started', href: '/free-quote' },
  items: softwareIndustryItems,
};

export const sddeTech: TechStackContent = {
  eyebrow: '',
  title: 'Develop Effective Apps With These Technologies',
  body: 'Tools and technologies and frameworks are the driving force behind every software development.',
  groups: softwareTechGroups,
};

/** The visible FAQ, verbatim — questions are H4s on the live page, which publishes no FAQPage schema. */
export const sddeFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Here are some bits about software development services provided by Soft Suave.',
  links: [{ text: 'consultation with our experts', href: '/30-min-free-consultation' }],
  items: [
    {
      q: 'How do we comply with Intellectual Property issues?',
      a: "We follow strict NDA procedures, so you don't have to worry about any leakage of your asset. It's safe until we handed it to you.",
    },
    {
      q: 'What is your method for estimating project timelines?',
      a: 'Defining an MVP is the first step we take before promising a timeline to our clients. Phases and milestones are then defined for MVP. Each developmental milestone is calculated, followed by quality assurance checks and client feedback to ensure we are on the right track.',
    },
    {
      q: 'How do you ensure client satisfaction?',
      a: 'Soft Suave place the highest priority on customer satisfaction and strive to achieve this by communicating with them after short intervals to share our developmental milestones and to get their feedback. Additionally, we keep ourselves updated in an ever-changing technological space by maintaining a cloud-based code repository.',
    },
    {
      q: 'Why choose soft suave for software development in Germany?',
      a: 'We worked with many germanian projects, and we know what kind of app should be developed for German citizens. We know what you need. Because of that, we have a clear idea of what to do. So, start your software development journey by having a consultation with our experts to know more details about app development.',
    },
  ],
};

export const sddeClose = locationClose('Software development consultation (Germany)');

/** The whole page, for `SoftwareLocationPage`. */
export const sddePage: SoftwareLocationPageContent = {
  key: 'software-germany',
  hero: sddeHero,
  clientLogos: locationClientLogos,
  about: sddeAbout,
  services: sddeServices,
  legacy: sddeLegacy,
  // The framed-illustration design for "Enrich Legacy Upgrade", by request.
  legacyStyle: 'showcase',
  industries: sddeIndustries,
  tech: sddeTech,
  techMarks: softwareTechMarks,
  faqs: sddeFaqs,
  close: sddeClose,
};
