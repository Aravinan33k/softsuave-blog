/**
 * Copy for `/hire-xamarin-developer`.
 *
 * Every string is softsuave.com/hire-xamarin-developer's own, in its own order
 * — headings, paragraphs, cards, steps, table cells and FAQ answers — carried
 * across to the new theme's components without rewording. Two oddities on the
 * live page are kept as published rather than silently corrected:
 *
 *   - the process eyebrow reads "Hiring Processs" (three s's);
 *   - the expertise heading and intro name "Kotlin", not Xamarin — the live
 *     section was copied from the Kotlin page and never updated.
 *
 * The live page's "Our Xamarin Developer Profile" band (seven developer
 * cards) is deliberately not carried: it was left out of this page's brief.
 *
 * Section designs, by brief:
 *   hero, clients, process, testimonials, FAQ → hire-software-developers
 *   expert developers → typescript-development-company's Why Choose Us
 *   expertise         → data-science-services' Technology Stack
 *   what we do        → typescript-development-company's Services
 *   skill check       → hire-php-developers' "Why Are Our PHP Developers…" cards
 *   hiring guide      → hire-devops-developers' Comparison
 *
 * Images: the seven service illustrations are the live page's own art,
 * downloaded unchanged from softsuave.com/assets/images and committed under
 * `public/images/landing/hire-xamarin/` — the hand-placed convention the Java
 * and Angular pages use. All seven are 490×277.
 */

import type { HeroContent } from '@/components/generative-ai/hero';
import type { ProcessContent } from '@/components/generative-ai/process';
import type { ComparisonContent } from '@/components/generative-ai/comparison';
import type { FaqContent } from '@/components/generative-ai/faq';
import type { CardGridContent } from '@/components/landing/industries';
import type { ServicesCarouselContent } from '@/components/common/services-carousel';
import type { TechStackContent } from '@/components/landing/tech-stack';
import { heroForm } from '@/lib/home/hire-roles/shared';

export const hxMeta = {
  path: '/hire-xamarin-developer',
  // The live `<title>` and meta description, verbatim — no suffix added.
  title: 'Hire Xamarin Developer for High-Performance Apps',
  description:
    'Hire Xamarin developer on contract to build expert cross-platform apps with seamless performance on iOS, Android, & Windows. Get a 40-hour free trial today!',
  role: 'Xamarin Developers',
  serviceType: 'Xamarin development staffing',
} as const;

export const hxHero: HeroContent = {
  titleLines: ['Hire Xamarin Developers', 'in India on Contract'],
  body: [
    'Soft Suave offers Xamarin developers from India ready to build enterprise-grade cross-platform mobile apps. Hire experts in Xamarin, .NET, C#, API integrations, native performance optimization, and Android + iOS app delivery with flexible engagement models.',
    'See why businesses choose Soft Suave for their Xamarin developer hiring.',
  ],
  points: [
    '40-Hour Risk-Free Trial',
    'Hire Top Xamarin Developers in India',
    'Time-Zone & Language Aligned Teams',
    'Airtight NDA & IP Protection',
  ],
  form: heroForm({
    title: 'Get Skilled Remote Developers',
    requirementLabel: 'How Can We Help (Requirement)',
    requirementPlaceholder: 'How Can We Help(Requirement)',
    subject: 'Xamarin developer hiring enquiry',
  }),
};

/** "Expert Developers" — rendered as the Why Choose Us cards. */
export const hxWhyHire: CardGridContent = {
  eyebrow: 'Expert Developers',
  title: 'Why Hire Xamarin Developers from Soft Suave',
  body: 'Soft Suave’s Xamarin developers combine technical mastery with business insight to deliver solutions that align perfectly with your goals. Expect seamless app performance, cost efficiency, and a collaborative approach that accelerates digital success.',
  links: [{ text: 'offshore software development service', href: '/offshore-software-development-company' }],
  items: [
    {
      name: 'Pre-vetted Xamarin developers',
      body: 'Work with rigorously screened Xamarin experts, handpicked for technical excellence and reliability, ensuring your projects succeed from day one.',
    },
    {
      name: '40-Hour Risk-Free Trial',
      body: 'Test Xamarin talent with a 40-hour risk-free trial, ensuring perfect fit and performance before committing to long-term engagement.',
    },
    {
      name: 'Global delivery standards',
      body: 'Our Xamarin developers follow international best practices, ensuring every project meets global quality benchmarks, compliance requirements, and seamless delivery standards.',
    },
    {
      name: 'Strict NDA & IP protection',
      body: 'Your ideas remain safe with us — every project is secured by strict NDAs and robust IP protection for complete peace of mind.',
    },
    {
      name: 'Time Zone Flexibility',
      body: 'Work seamlessly with Xamarin developers with 4–6 hours of overlap time to keep things moving forward.',
    },
    {
      name: 'World-Class Developers at Budget-Friendly Rates',
      body: 'With our offshore software development service, engage top Xamarin developers at a budget-friendly cost with no compromises on quality & performance.',
    },
  ],
};

export const hxProcess: ProcessContent = {
  eyebrow: 'Hiring Processs',
  title: 'Steps to Hire a Xamarin Developer',
  body: 'We keep our hiring process fair and straightforward. From sharing requirements to onboarding, we ensure every step is quick and simple. The process is designed to get you started with confidence fast.',
  steps: [
    {
      n: '01',
      name: 'Share the JD',
      body: 'Submit your project requirements and skill needs. We’ll align you with matching Xamarin expertise instantly.',
    },
    {
      n: '02',
      name: 'Shortlist The Right Developers',
      body: 'Review carefully vetted profiles, interview candidates, and select Xamarin developers who perfectly match your vision.',
    },
    {
      n: '03',
      name: 'Free 40-hour Trial',
      body: 'Experience developer skills firsthand with a 40-hour trial, ensuring complete satisfaction before long-term hiring.',
    },
    {
      n: '04',
      name: 'Onboard & Manage',
      body: 'Sign SLA & NDA agreements, onboard selected developers seamlessly, and manage projects with transparent communication tools.',
    },
  ],
};

/**
 * "Expertise" — the live page's three logo groups become the clusters. Its
 * logos carry no visible label, so each chip takes the name of the matching
 * live H4. The live section's closing sentence and its six per-technology
 * descriptions are deliberately not carried (removed on review).
 */
export const hxExpertise: TechStackContent = {
  eyebrow: 'Expertise',
  title: 'Technical Expertise of Our Xamarin Developers',
  body: 'Our Xamarin developers are technically proficient in mobile, web, server-side development, and more, which allows for the creation of high-quality code, smooth integrations, and optimised performance in every one of your projects.',
  groups: [
    { name: 'Frontend', items: ['c#'] },
    { name: 'Operating System', items: ['Android', 'ios'] },
    { name: 'Platforms', items: ['AWS', 'Azure', 'GoogleCloud'] },
  ],
};

const img = (n: number, alt: string) => ({ src: `/images/landing/hire-xamarin/hire_xamarin_${n}.webp`, alt });

/** "What We Do" — the centre-focused services carousel. */
export const hxServices: ServicesCarouselContent = {
  eyebrow: 'What We Do',
  title: 'Xamarin Development Services We Offer',
  body: 'From custom mobile app development and migration to performance tuning and ongoing support, Soft Suave delivers end-to-end Xamarin services tailored to your business needs, ensuring speed, scalability, and future-ready solutions.',
  cta: { label: 'Talk to Our Experts', href: '/contact' },
  items: [
    {
      name: 'Xamarin Development Consulting',
      body: 'Tap into top-notch consulting to help design solid Xamarin solutions that fit your overall business strategy and technology implementation.',
      image: img(1, ''),
    },
    {
      name: 'Dedicated Xamarin Development Team',
      body: 'Build a fully dedicated Xamarin team that integrates seamlessly with your business, offering flexibility and expertise for success.',
      image: img(2, ''),
    },
    {
      name: 'Cross-Platform App Development with Xamarin',
      body: 'Develop apps that seamlessly run on iOS, Android, and Windows, optimizing performance and user experience across all platforms.',
      image: img(3, ''),
    },
    {
      name: 'Xamarin Migration & Upgrade Services',
      body: 'Achieve successful legacy app migration to Xamarin and modernize apps with the latest features and functionalities.',
      image: img(4, ''),
    },
    {
      name: 'Xamarin Testing Services',
      body: 'Guarantee quality with full Xamarin app testing, including functional, performance testing, and more, to achieve bug-free and reliable apps.',
      image: img(5, ''),
    },
    {
      name: 'UI/UX Design for Xamarin Apps',
      body: 'Create attractive and user-friendly user interfaces for dynamic Xamarin-based apps to maintain the best performance.',
      image: img(6, ''),
    },
    {
      name: 'Xamarin Support & Maintenance',
      body: 'Drive long-term success with proactive support and maintenance, while keeping your Xamarin apps updated, secure, and running at their best.',
      image: img(7, ''),
    },
  ],
};

/** "Skill Check" — the hire-php-developers bold card grid. */
export const hxSkillCheck: CardGridContent = {
  eyebrow: 'Skill Check',
  title: 'How We Vet and Onboard Top Xamarin Developers',
  body: 'Our multi-stage vetting process screens for coding brilliance, communication skills, and cultural fit. Only the top talent makes it through, ensuring you hire Xamarin developers who perform from day one.',
  items: [
    {
      name: 'Rigorous talent sourcing',
      body: 'To ensure the greatest caliber of work, we exclusively choose the top 3% of Xamarin developers.',
    },
    {
      name: 'In-depth skill assessment',
      body: 'Our multi-tiered skill tests guarantee your Xamarin developer is not just qualified but exceptional in every aspect',
    },
    {
      name: 'Thinkers & Innovators',
      body: 'We recruit Xamarin developers who don’t just solve problems. They redefine what’s possible with innovation.',
    },
    {
      name: 'Cultural fit & adaptability',
      body: 'Cultural alignment is key; we ensure developers seamlessly integrate with your team for lasting collaboration.',
    },
  ],
};

/**
 * "Hiring Guide" — already a comparison on the live page. Headers and every
 * cell are its own; the Soft Suave column moves last only because this
 * component accents its final column (the same move `lib/home/hire-roles/shared`
 * makes for every role page).
 */
export const hxComparison: ComparisonContent = {
  eyebrow: 'Hiring Guide',
  title: 'Choosing the Right Xamarin Partner for Your Specific Needs',
  body: 'Finding the perfect Xamarin partner is essential to realizing your specific objectives. Compare and choose the right one, so you can work together smoothly and get high-quality results for your projects.',
  columns: ['Factor', 'In-house', 'Freelancer', 'Soft Suave'],
  rows: [
    { criterion: 'Time to get right developers', values: ['4 - 8 Weeks', '2 - 4 Weeks', 'Within 48 hours'] },
    { criterion: 'Time to start a project', values: ['4 - 8 Weeks', '2 - 4 Weeks', 'Within 48 hours'] },
    { criterion: 'Recurring cost', values: ['$2000 to $3000', '0', '0'] },
    { criterion: 'Project failure risk', values: ['Low', 'High', 'Extremely Low'] },
    { criterion: 'Dedicated resources', values: ['Yes', 'No', 'Yes'] },
    { criterion: 'Communications', values: ['Seamless', 'Uncertain', 'Seamless'] },
  ],
};

export const hxFaqs: FaqContent = {
  eyebrow: 'Ask Us',
  title: 'FAQs About Hiring Xamarin Developers',
  body: 'Get the answers you need to make an informed decision about Xamarin development.',
  items: [
    {
      q: 'How much does it cost to hire a Xamarin developer?',
      a: 'Costs will depend on experience level and project complexity; however, Soft Suave guarantees that you will get competitive and negotiable prices.',
    },
    {
      q: 'Is there any free trial period available?',
      a: "Yes, we provide a 40-hour risk-free trial so that you can assess our developer's skills and fit before making a long-term commitment.",
    },
    {
      q: 'What are the hiring engagement options available at Soft Suave?',
      a: 'We provide flexible engagement models to hire Xamarin developers as per your project requirements, like fixed price, time and material, and dedicated team model.',
    },
    {
      q: 'Do you provide support and maintenance services after deployment?',
      a: 'Absolutely. We offer post-launch support, performance tracking and constant maintenance to make sure your Xamarin app never stops running as effectively as it should.',
    },
    {
      q: 'Where can you find a Xamarin Engineer?',
      a: 'Right here at Soft Suave. Our network of pre-vetted Xamarin developers means that you can easily and quickly recruit an engineer.',
    },
  ],
};
