import type { HeroContent } from '@/components/landing/hero';
import type { FaqContent } from '@/components/landing/faq';
import { partnerHeroBadges } from '@/lib/home/hero-badges';
import { sharedHeroAlert } from '@/lib/home/delivery-shared';

/**
 * /pos-software-development-company — softsuave.com's "POS Software Development Company in India" page, word for
 * word: the hero with its quote form, "Best Custom POS Software Development Company", the five services, the
 * portfolio, the five POS solutions, the nine features, the six FAQs, the "Get your FREE Quote Now" form and the
 * closing consultation form. Images are under /images/pos; the live icons are inline artwork, so each card shows
 * the site's own icon badge instead. The page names no trial length, so there is no duration to correct. The live
 * <title> and <meta> are copied as they stand, including its "Dompany".
 */

export const posMeta = {
  path: '/pos-software-development-company',
  shortTitle: 'POS Software Development Company',
  title: 'Best Custom Pos Software Development Dompany in India',
  description:
    'Trusted custom POS software development company in India offering end-to-end solutions to streamline billing, inventory, and retail operations.',
} as const;

export const posHero: HeroContent = {
  titleLines: ['POS Software Development', 'Company in India'],
  accent: 'POS Software Development',
  titleScale: 'home',
  accentGradient: true,
  // The live banner's photo (a card tapped on a payment terminal), held still as its fixed background is.
  image: { src: '/images/pos/banner.webp', width: 2200, height: 1115, alt: '', veil: 'dark', still: true },
  body: [
    'Soft Suave is the Custom POS Development Company that offers POS software across industries to help businesses make the most out of every sale.',
    'Need a custom POS Software? We’ll help you deliver such an app. To make life easier for both buyers and sellers.',
  ],
  boldBody: ['Custom POS Development Company'],
  points: [],
  badges: partnerHeroBadges,
  form: {
    eyebrow: "Let's Discuss Your Project",
    title: 'Get free rough quote in 24 hrs',
    alert: sharedHeroAlert,
    submit: 'Submit',
    sending: 'Sending...',
    requirementLabel: 'Requirement',
    requirementPlaceholder: 'Tell us about your POS software requirement.',
    subject: 'POS Software Development enquiry',
  },
};

/** Plain text, or bold words. */
export type Piece = string | { readonly b: string };

export const posAbout = {
  title: 'Best Custom POS Software Development Company',
  body: 'Streamline your business functions with an all-in-one custom-tailored point of sale software.',
  paragraphs: [
    'Soft Suave is the best POS Software Development Company in India that builds customized and advanced POS softwares for various industry verticals. Our proficient and experienced developers at Soft Suave can develop POS softwares from scratch to optimize your business process efficiently. We also leverage industry-leading technologies to build the best POS software that you can trust to yield better results for your business.',
    'With Soft Suave’s expertise, you can transform your cash register into next-level scalable POS software. Our POS solutions are compatible with both online and offline businesses. Soft Suave is also known to offer the best POS Development Services in India and other Tier 1 countries worldwide. Our dedicated POS developers have 5+ years of experience developing Point Of Sales softwares for both small-scale companies and enterprises.',
    'Being the leading Custom POS Development Company in India, Soft Suave assures on time and quality POS solution delivery at an affordable cost. Alongside POS development services, we also have reliable domain expertise in the retail and eCommerce industry, with which you can skyrocket your business towards growth.',
  ],
  image: { src: '/images/pos/pos-system.svg', width: 1080, height: 919, alt: 'POS software development company Soft Suave' },
} as const;

export const posServices = {
  title: 'Soft Suave’s Point Of Sale Development Services',
  accent: 'Point Of Sale Development',
  body: [
    'Soft Suave is an ideal partner for ',
    { b: 'POS software development in India.' },
    ' Our developers are well equipped and have the tech expertise to efficiently handle enterprise and custom POS development services. Besides, their hands-on experience in offering custom POS softwares to a wide array of industries makes Soft Suave the most preferred company for POS development services.',
  ] as readonly Piece[],
  items: [
    { name: 'POS Software Development', body: 'Soft Suave is a POS App Development Company that transforms your custom requirement into engaging POS solutions. Our POS software solutions bring agility to payment services, enacts security and increase customer engagement.' },
    { name: 'POS Programming', body: 'Custom programming is essential in POS solutions. Soft Suave helps you program your software using codes and change colour schemes, menu interfaces and checkout. The top-notch POS development experts program custom features and functionalities as well.' },
    { name: 'POS Integration', body: 'POS development service from Soft Suave gives you a competitive edge in the market. Because we leverage third-party POS software modules to develop POS solutions, that can be customized and fully integrated in the future.' },
    { name: 'POS Upgrade', body: 'Ensuring high-security, Soft Suave offers timely upgrades to eliminate bugs in the software, increase receipt printing speed and safe payment processing. This POS upgrade process makes sure your POS software is up to date.' },
    { name: 'POS Support & Maintenance', body: 'Soft Suave’s POS development services extend to support and maintenance. Our expert developers infuse the years of experience to handle any complicated bug fixes and offer 24/7 support to help you run your business seamlessly.' },
  ],
} as const;

export const posPortfolio = {
  title: 'Our Portfolio',
  body: 'One single POS Software to organize inventory & staff levels, perform data analysis, and bill customers.',
  name: 'Smart Point of Sales Software',
  text: 'A smart POS software designed for restaurants of all sizes to organize orders, streamline business operations, and manage sales effectively. Seamless integration and PCI compliance are default to level up your business conveniently.',
  cta: { label: 'Get Free Quote Now', href: '#quote' },
  image: { src: '/images/pos/portfolio.png', width: 1080, height: 812, alt: 'POS software development company Soft Suave' },
} as const;

export const posSolutions = {
  title: 'POS Solutions We Create',
  body: 'Custom Developed POS & Store Management Software Perfect For Stores For',
  items: [
    { name: 'Cloud-Based POS Development', body: 'Cloud-based POS solutions store and process all of your data online. You can access and utilize your information from any location.' },
    { name: 'Mobile POS Development', body: 'The Mobile POS device is an ideal solution for small-scale firms. Simply install it on your tablet or smartphone and manage your business while on the move.' },
    { name: 'On-Premise POS Development', body: 'Traditional POS systems save information in an internal database. It is accessible only through your computer, however, these systems offer security and security.' },
    { name: 'Terminal POS Development', body: 'Terminal POS systems integrate both software and hardware capabilities including the management of inventory, CRM and analytics. They are ideal for large retail outlets like Departmental Stores, Supermarkets, and so on.' },
    { name: 'Food Service POS Development', body: 'Customized Food service POS systems that are suitable for establishments of any size. Take care of your payments, orders, as well as the back and front-of-house, needs effortlessly.' },
  ],
} as const;

export const posFeatures = {
  title: 'Robust Features of POS Software',
  accent: 'Robust Features',
  body: [
    'POS softwares are developed to make sales easier for businesses. Soft Suave is a custom ',
    { b: 'POS Software Development Company' },
    ' that can build custom POS solutions for your industry according to your business needs. We also have a set of prebuilt features to help you save cost on POS development. Here are a few top features;',
  ] as readonly Piece[],
  items: [
    'Accurate Billing',
    'Inventory Management',
    'Customer Management',
    'Employee Management',
    'Multiple Payment Gateways',
    'Accurate Real-time Reports',
    'Simplified Accounting',
    'Loyalty Programs',
    'Easy Third-party Integrations',
  ],
} as const;

export const posFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our processes and how we work, with the help of the following FAQs.',
  items: [
    { q: 'What is POS Software?', a: 'POS is Point Of Sales software that facilitates retailers to conduct sales efficiently. This software is specifically used to maintain the balance between inventory and sales. You can also build Custom POS softwares to input your products through a computer, iPad, and cash register.' },
    { q: 'Are POS solutions recommended for smaller organizations or larger ones?', a: 'POS solutions are recommended for both smaller and larger organizations. However, you can customize the size of your solution based on your business needs. At Soft Suave, we are equipped to build classic POS apps and enterprise-level POS solutions at an attractive price.' },
    { q: 'Is an industry-specific POS system necessary?', a: 'Yes, absolutely! Every industry has unique needs; thus, the industry-specific POS system is the best solution. However, depending upon your business needs, you can club the services and packages accordingly.' },
    { q: 'Why your retail business needs a POS software development?', a: 'POS software was designed specifically for the retail business to operate smoothly and efficiently. If you want to increase your data accuracy, generate real-time reports, manage inventory and employees swiftly, your retail business needs a POS software development instantly.' },
    { q: 'Can you integrate payment gateways in the POS software?', a: 'Yes, we at Soft Suave help you integrate robust payment gateways into your POS software. This will expand your capability to receive payment through EMV chip cards, contactless payments (NFC), and mobile wallet payments such as Apple Pay, Android Pay, and Samsung Pay.' },
    { q: 'Can I transfer my data on a current POS to a new POS software system?', a: 'Yes, Soft Suave can help you transfer data from your current POS to a new POS software system. Migrating/transferring data can be challenging. However, experts at Soft Suave help you transfer data to your new POS system without losing any data.' },
  ],
};

/** The "Get your FREE Quote Now !!!" form — a popup on the live page, opened by the portfolio's button. */
export const posQuote = {
  title: 'Get your FREE Quote Now !!!',
  body: 'Fill this form to get a personalized quote from experts at Soft Suave.',
  form: {
    title: '',
    alert: sharedHeroAlert,
    submit: 'Get Quote Now',
    sending: 'Sending...',
    requirementLabel: 'Describe your Project',
    requirementPlaceholder: 'Describe your Project',
    subject: 'POS Software Development: Get your FREE Quote Now',
  },
} as const;
