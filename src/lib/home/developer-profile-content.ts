/**
 * Copy for `/developer-profile`.
 *
 * Every string is softsuave.com/developer-profile's own, in its own order —
 * the hero, the five stats, the sample profiles, the clients band, the
 * testimonials, the download dialog and the closing consultation — carried
 * across without rewording.
 *
 * Notes on the source, kept rather than silently changed:
 *
 *  - The live page sets TWO H1s: the hero's "Hire India’s Top Remote Talents"
 *    and the profiles section's "Let’s talk more about technical skills and
 *    pre-vetting". Both are kept as H1s, so the outline matches.
 *  - The live profiles are not in the page's HTML: a script fetches them from
 *    softsuave.com/forms/enquires/getAllDeveloperProfiles after load. This
 *    site's CSP allows no cross-origin requests, so the six profiles that
 *    endpoint returns today are written here (photos copied to
 *    public/images/landing/developer-profile/). Update this list when the
 *    live set changes.
 *  - The live card template gives every profile photo the same alt text,
 *    "Sudharshan" — kept verbatim, as the page publishes it.
 *  - The live download form posts to softsuave.com and redirects to a
 *    thank-you page (no file is downloaded). Here it is the site's own
 *    enquiry card (POST /api/v1/enquiry, then /thank-you), with the chosen
 *    profile sent as the requirement. Its "Select Price" field ($12 - $15,
 *    $16 - $20, $21 - $25) has no slot in the shared card, so it is not
 *    rendered.
 *  - The clients band is the software-development-company-spain page's (by
 *    request): the shared band's own heading and standfirst with the
 *    deployed homepage's 27 logos, in place of the live "OUR CLIENTS" band.
 *  - The testimonials band's YouTube icon (to /success-stories) is left out,
 *    by request.
 *  - "400+" is the company's specialist figure, from `lib/company-figures.ts`
 *    (the one place figures are written; a test enforces it).
 */

import type { TalentHeroContent } from '@/components/landing/talent-hero';
import type { DeveloperProfilesContent } from '@/components/landing/developer-profiles';
import type { Testimonial } from '@/lib/home/content';
import { SPECIALISTS_PLUS } from '@/lib/company-figures';
import { locationClose } from '@/lib/home/mobile-app-location-shared';

const IMG = '/images/landing/developer-profile';

export const devProfileMeta = {
  path: '/developer-profile',
  // The live page's head, verbatim: title, description, canonical, and
  // robots "noindex,nofollow". No Open Graph, Twitter tags or JSON-LD.
  title: 'Hire India’s Top Remote Talents On Contract',
  description:
    'Soft Suave is a leading Software development outsourcing company in India with a team of developers/programmers that can enhance your business performance.',
  canonical: 'https://www.softsuave.com/developer-profile',
} as const;

const icon = (file: string, width: number, height: number, alt: string) =>
  ({ src: `${IMG}/${file}`, width, height, alt }) as const;

export const devProfileHero: TalentHeroContent = {
  title: 'Hire India’s Top Remote Talents',
  body: `A platform that helps companies hiring from India, employ 10X faster & more efficiently. A network of ${SPECIALISTS_PLUS} talents, pre-vetted against their technical capabilities, language proficiency and behavioral skills.`,
  cta: { label: 'Hire a Talent', href: '#technical-skill-section' },
  arrow: { src: `${IMG}/arrow-down.webp`, alt: 'down-arrow' },
  stats: [
    { icon: icon('stat-network.webp', 210, 207, 'Network'), label: 'Network', value: SPECIALISTS_PLUS, unit: 'Talents' },
    { icon: icon('stat-process.webp', 136, 201, 'Process'), label: 'Process', value: '24 Hours', unit: 'Hiring' },
    { icon: icon('stat-talent.webp', 164, 157, 'Talent'), label: 'Talent', value: 'Top 4.5%', unit: 'Vetted' },
    {
      icon: icon('stat-cost.webp', 175, 175, 'Cost Advantage'),
      label: 'Cost Advantage',
      value: '60%',
      unit: 'Upto',
      // The live stat reads "Upto" (H4) above "60%" (H2).
      unitFirst: true,
    },
    { icon: icon('stat-timezone.webp', 175, 175, 'Time Zone'), label: 'Availability', value: '10+', unit: 'Time Zones' },
  ],
};

/** The live card template's alt text, the same on every photo. */
const PHOTO_ALT = 'Sudharshan';
const photo = (file: string) => ({ src: `${IMG}/${file}`, alt: PHOTO_ALT });

export const devProfileProfiles: DeveloperProfilesContent = {
  title: 'Let’s talk more about technical skills and pre-vetting',
  body: 'Here are a few sample profiles, with pre-vetting summaries.',
  // The live page sets this heading as an H1 too.
  titleLevel: 1,
  labels: {
    skills: 'MAIN SKILLS',
    experience: 'YEARS OF EXPERIENCE',
    location: 'Location',
    download: 'Download Profile',
  },
  // As getAllDeveloperProfiles returns them, in its order.
  profiles: [
    {
      id: 3,
      name: 'Jayasin',
      designation: 'Senior MERN Stack Developer',
      experience: '7+ years',
      location: 'India (Remote)',
      skills: ['ReactJS', 'Angular', 'NodeJS', 'Firebase', 'MongoDB', 'DynamoDB'],
      photo: photo('profile-jayasin.webp'),
    },
    {
      id: 4,
      name: 'Indhu',
      designation: 'Full Stack Developer',
      experience: '7+ years',
      location: 'India (Remote)',
      skills: ['Angular', 'NodeJS', 'NextJS', 'ExpressJS', 'Loopback', 'AWS'],
      photo: photo('profile-indhu.webp'),
    },
    {
      id: 5,
      name: 'Dinesh',
      designation: 'Senior Java Developer',
      experience: '6+ years',
      location: 'India (Remote)',
      skills: ['ReactJS', 'Java', 'Spring Boot', 'Servlets', 'Hibernate', 'Microservices'],
      photo: photo('profile-dinesh.webp'),
    },
    {
      id: 6,
      name: 'Antony',
      designation: 'Python Developer',
      experience: '5+ years',
      location: 'India (Remote)',
      skills: ['ReactJS', 'Python', 'Docker', 'AWS', 'MySQL', 'Mariadb'],
      photo: photo('profile-antony.webp'),
    },
    {
      id: 7,
      name: 'Sudharshan',
      designation: 'Backend Developer',
      experience: '5+ years',
      location: 'India (Remote)',
      skills: ['Angular', 'Python', 'Django', 'Flask', 'AWS RDS', 'AWS Lambda'],
      photo: photo('profile-sudharshan.webp'),
    },
    {
      id: 8,
      name: 'Mariappan',
      designation: 'FullStack Developer',
      experience: '4+ years',
      location: 'India (Remote)',
      skills: ['Laravel', 'ReactJS', 'MySQL', 'Docker', 'RXJS', 'AWS'],
      photo: photo('profile-mari.webp'),
    },
  ],
  dialog: {
    title: 'Download Profile Here',
    body: 'Choose the right developer to start your 1-week Free Trial.',
    close: 'Close',
    form: {
      // The dialog carries its own heading, so the card shows none.
      title: '',
      submit: 'Download Profile',
      sending: 'Sending...',
      requirementLabel: 'Requirements',
      requirementPlaceholder: 'Requirements',
      subject: 'Developer profile download',
    },
  },
};

/**
 * The live "TESTIMONIALS" band: its heading and paragraph, and its five
 * quotes and names, verbatim (including "time and money.From day 1"). The
 * live quotes carry no photos, so the stories show their monograms.
 */
export const devProfileTestimonials: {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly Testimonial[];
} = {
  eyebrow: '',
  title: 'TESTIMONIALS',
  body: 'Soft Suave assisted industries across the world by providing exceptional software service and resources with our talented developers and app development teams. Have a look at some of our satisfied clients.',
  items: [
    {
      quote:
        '"I love working with the team at Soft Suave because they helped me save time and money.From day 1, Soft Suave has been a reliable development partner who handles the work with the utmost professionalism."',
      name: 'Vinny Nuthakki',
      rating: '5.0',
    },
    {
      quote:
        '"Working with Soft Suave is a great experience so far. The developer I am working with right now is outstanding. The project manager always assigns the best resources to work on my project."',
      name: 'Marcio. M',
      rating: '5.0',
    },
    {
      quote:
        '"Working with Soft Suave’s developers has been an extremely efficacious process for me. The answers are timely, explanations are never rushed, and communications are consistently clear and concise."',
      name: 'Robert. S',
      rating: '5.0',
    },
    {
      quote:
        '"The communication with Soft Suave’s developers was very easy and their response time was quick. The team helped me build very beautiful and visually aesthetic websites at an economical cost."',
      name: 'Sophiea. K',
      rating: '5.0',
    },
    {
      quote:
        '"Soft Suave provides amazing service. I am completely satisfied with the projects and look forward to continuing my relationship. I will also recommend their services without question."',
      name: 'Aaron. G',
      rating: '5.0',
    },
  ],
};

export const devProfileClose = locationClose('Developer profile consultation');
