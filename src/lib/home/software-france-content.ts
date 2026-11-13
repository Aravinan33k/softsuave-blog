/**
 * Copy for `/software-development-company-france`.
 *
 * Every string is softsuave.com/software-development-company-france's own, in
 * its own order — headings, paragraphs, services, the legacy and industry
 * bands, technologies, FAQ answers and image alt text — carried across without
 * rewording. Oddities on the live page are kept as published:
 *
 *   - the `<title>` ends with a space;
 *   - "The lavishing French Software Development Company" (H1);
 *   - "As majestic and everlasting as our magnificent Eiffel Tower" (no full
 *     stop), "company , we offer" (space before the comma);
 *   - "legacy development service's", "in both new in older technologies";
 *   - "Delivering Highly Influentia Apps With These Dope Technologies";
 *   - tool labels as published: "Jenkin", "Anisible", "kubernets", "Manaul
 *     Testing", "ionic", "Cloud" (drawn with the tools' real marks);
 *   - "AI/VI Technologies".
 *
 * A *software* development company page, not the mobile app location
 * template: hero, clients, about, six services, a legacy-modernisation band,
 * an industries band, the technology stack, FAQ and the closing consultation.
 * Rendered by `components/landing/software-location-page.tsx`, the layout
 * every software location page shares; what they say identically is in
 * `software-location-shared.ts`.
 *
 * Links: the live service cards' "Know More" buttons are not links, except the
 * eCommerce card's (to the eCommerce page) — so only that card links here. Of
 * the eight industry tiles, eCommerce, ELearning and Healthcare link; the rest
 * point at "#" on the live page, so they are plain tiles here.
 *
 * Heading levels are the live page's: services and legacy items are H3s, the
 * industry names and FAQ questions H4s.
 *
 * The clients band follows the location pages built from the Dubai page: the
 * hire-software-developers band with the deployed homepage's 27 logos, in
 * place of the live "Featured Clients" strip.
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
  SOFTWARE_IMG as IMG,
  softwareIndustryItems,
  softwareLegacyFigure,
  softwareTechGroups,
  softwareTechMarks,
} from '@/lib/home/software-location-shared';

export const sdfrMeta = {
  path: '/software-development-company-france',
  // The live page's head, verbatim — the <title> ends with a space, and its
  // OG and Twitter copy each differ from the description and from each other.
  title: 'Bespoke Software Development Services In France ',
  description:
    'Soft Suave, the expert software development company in France transforms project requirements into long-term solutions for you. Contact us today!',
  canonical: 'https://www.softsuave.com/software-development-company-france',
  ogTitle: 'Custom Software Development Agency In France',
  ogDescription:
    'Let our experts at Soft Suave transform your project requirements into successful custom software, mobile app, and web solutions. Enhance your business operations in France with our exceptional development services.',
  ogSiteName: 'Soft Suave',
  ogImage: 'https://www.softsuave.com/assets/images/software-development-company-france.png',
  twitterSite: '@softsuave',
  twitterTitle: 'leading software development company in france',
  twitterDescription:
    'Enhance your business operations with custom software development, mobile app development, and web development solutions in France. Contact our expert team today for exceptional software development services.',
} as const;

export const sdfrHero: HeroContent = {
  titleLines: ['The lavishing French Software Development Company'],
  // The live H1 sets "French" apart in its own span.
  accent: 'French',
  body: [
    "Soft Suave delivers flawless, market-friendly, useful Software development solutions that boost your business' productivity and tap into digital epoch opportunities.",
    'Want to Outsource App Development Projects? Get in touch for a free quote!',
  ],
  bodyLinks: [{ text: 'for a free quote!', href: '/free-quote' }],
  points: [],
  form: locationHeroForm('Software development enquiry (France)'),
};

export const sdfrAbout: OverviewContent = {
  eyebrow: '',
  title: 'A Remarkable Software Development Agency in France',
  paragraphs: [
    'We can turn your software dreams and ideas into a market-value and customer-friendly application beyond what you imagined. As majestic and everlasting as our magnificent Eiffel Tower',
    'At Softsuave, we believe software is like a magical portal that connects people from all corners of the world. With just a few clicks, the software has made our lives easier by giving us access to everything we need. As a leading French software development company , we offer reliable and scalable software solutions designed to meet your business needs.',
    'Our industry-specific expertise and forward-thinking teams cater to companies of all sizes and have helped transform countless software products and ideas into viable business solutions. We are well-known for delivering high-quality products, exceptional availability, and tailor-made development services that precisely match your unique needs.',
    'As a software development agency, We have complete freedom in developing mobile applications and web apps. Our advanced technologies and well-planned strategies guarantee we deliver top-notch software solutions that surpass your expectations. Furthermore, we offer custom app development services to assist businesses in creating sustainable brand identities that resonate with their target audience. Our clone app development services have helped startups and SMBs earn substantial profits and remain one of our most successful projects.',
    'Our services extend beyond the development of mobile applications and web apps. We provide legacy modernization, cloud computing, product engineering services, and more, serving as a one-stop shop for all your software requirements. Soft Suave is proud to be a leading software development agency in France, delivering superior products and services that address complex business problems effectively.',
  ],
  links: [
    { text: 'mobile applications', href: '/mobile-application-development-company' },
    { text: 'web apps', href: '/web-application-development-company' },
    { text: 'cloud computing', href: '/cloud-computing' },
  ],
  image: {
    src: `${IMG}/overview-france.webp`,
    width: 849,
    height: 830,
    alt: 'Best software development company in France',
    fit: 'column',
  },
};

export const sdfrServices: ServicesGridContent = {
  eyebrow: '',
  title: 'Soft Suave’s Scope of Expertise in Software Development',
  body: 'As the top software development company in Paris and throughout France, we are renowned for delivering all business needs that never fail to fulfill business value and customer needs.',
  items: [
    {
      name: 'Enterprise Solutions',
      body: 'Our custom enterprise software helps businesses thrive in their development processes. It is custom-designed for a specific set of users and caters to their unique requirements. To ensure complete user satisfaction, our app development services are easy to use and automate your business processes.',
    },
    {
      name: 'Product Engineering Services',
      body: 'To create compelling & high-performing product solutions, our experienced software development team works closely with our clients. We specialize in SaaS and MVP development for software application development services.',
    },
    {
      name: 'AI/VI Technologies',
      body: 'You can see that many mobile and web apps, even wearables turn into AI/VI formats that let us enter into the modern era of the digital world. We develop software applications using AI and VI technologies that make your apps stand out.',
    },
    {
      name: 'Cloud Application',
      body: 'Providing cloud application development services to build cloud-native and cloud-only apps that efficiently utilize cloud features. We are experienced in working with various cloud applications like AWS.',
    },
    {
      name: 'SAAS Development',
      body: 'A SaaS application is built using cloud technology. Which means Software as a service. Our software development team includes everything from documentation to design to programming to testing to deployment.',
    },
    {
      name: 'eCommerce Development',
      body: 'We build your eCommerce solutions and make them better than others with our proven eCommerce development expertise. Connect with our eCommerce experts online, who have experience building scalable and cost-effective eCommerce applications.',
      // The one live card whose "Know More" is a link.
      href: '/ecommerce-mobile-app-development-company',
    },
  ],
};

/** "Enterprise Software Legacy Advancement" — four H3 items beside the live band's illustration. */
export const sdfrLegacy: TileGridContent = {
  eyebrow: '',
  title: 'Enterprise Software Legacy Advancement',
  body: "Technology has helped you manage your business processes better, What if your legacy system is outdated? With our software legacy development service's expertise in both new in older technologies, you can easily upgrade, scale, enhance & maintain your software.",
  bodyLinks: [{ text: "legacy development service's", href: '/legacy-modernization-services' }],
  items: [
    {
      name: 'Application Modernization',
      body: "Add new features to your legacy software to make it compatible with today's business needs.",
    },
    {
      name: 'Application Migration',
      body: 'Maintain your software by migrating to newer technologies. A change is better for the forthcoming era.',
    },
    { name: 'Maintenance & Support', body: 'Manage your business software frequently with our 24/7 available expert team.' },
    { name: 'IT Strategy Consulting', body: 'Ensure minimal downtime by consulting with our highly experienced IT team.' },
  ],
  figure: softwareLegacyFigure('Best software development company in France'),
};

/** "Our Profit Guaranteed Service To Diverse Industries" — eight H4 tiles and the live "Get Started". */
export const sdfrIndustries: TileGridContent = {
  eyebrow: '',
  title: 'Our Profit Guaranteed Service To Diverse Industries',
  body: "Our goal is to provide high-tech software solutions to various industries, such as Retail, Healthcare, Education, Logistics, and others. To achieve the software's short- and long-term goals, we'll assist you in developing an action plan aligned with your organization's goals.",
  cta: { label: 'Get Started', href: '/free-quote' },
  items: softwareIndustryItems,
};

/** The live tabs become the clusters; each tool keeps its live label. */
export const sdfrTech: TechStackContent = {
  eyebrow: '',
  title: 'Delivering Highly Influentia Apps With These Dope Technologies',
  body: 'Here is a list of Soft Suave developers with expertise in a variety of technologies.',
  groups: softwareTechGroups,
};

/** The visible FAQ, verbatim — questions are H4s on the live page, which publishes no FAQPage schema. */
export const sdfrFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Here are some bits about software development services provided by Soft Suave',
  links: [{ text: '30 minutes free consultation', href: '/30-min-free-consultation' }],
  items: [
    {
      q: 'Should I create a mobile or a web app?',
      a: 'Each has its benefits and flaws. You can collect and monetize much more data with mobile applications than with web applications. A progressive web app is a good compromise between a mobile app and a web app. Remember, you may need both a mobile app and a web app sooner or later, and we are here to help when that time comes.',
    },
    {
      q: 'What do I need to know before I contact you?',
      a: "It's important to know what you want to achieve first. What is the purpose of this software? What for? What should it do? When ordering a software application, it's important to have a clear vision in mind. Don't spend months developing it with us before you know what you need. If you have no experience in app development feel free to consult with our experts. It's a 30 minutes free consultation.",
    },
    {
      q: 'Which technology do you use?',
      a: "Python, Django, and Node.js are used for the back end. We use Angular.js and React.js for the front end. We use Flutter and Swift for mobile development. Do you think that's it? No way. These are some examples, based on your requirements, we can talk about what are the technologies to use for your app and our experts are there to solve any of your queries.",
    },
    {
      q: 'How do you ensure software quality?',
      a: 'To ensure you get what you are paying for, we evaluate the results more often, test our work, and present it to you.',
    },
    {
      q: 'What happens after finishing the app?',
      a: 'Apart from delivering a finished product, we are happy to offer you technical support and app maintenance should you need it.',
    },
  ],
};

export const sdfrClose = locationClose('Software development consultation (France)');

/** The whole page, for `SoftwareLocationPage`. */
export const sdfrPage: SoftwareLocationPageContent = {
  key: 'software-france',
  hero: sdfrHero,
  clientLogos: locationClientLogos,
  about: sdfrAbout,
  services: sdfrServices,
  legacy: sdfrLegacy,
  // The framed-illustration design for the legacy band, as on the Germany page.
  legacyStyle: 'showcase',
  industries: sdfrIndustries,
  tech: sdfrTech,
  techMarks: softwareTechMarks,
  faqs: sdfrFaqs,
  close: sdfrClose,
};
