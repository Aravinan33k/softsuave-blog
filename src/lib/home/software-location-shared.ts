/**
 * What softsuave.com's "software development company in <location>" pages
 * share word for word (France, Germany, …), so each location's content module
 * holds only what its live page says differently:
 *
 *   - the industries band's eight tiles, their icons and their links — the
 *     live tiles link eCommerce, ELearning and Healthcare and point the other
 *     five at "#", so those five are plain tiles;
 *   - the technology stack's six groups, 32 tools and their logo alt text,
 *     with the live page's own spellings ("Jenkin", "Anisible", "kubernets",
 *     "Manaul Testing") kept as labels and drawn with the real marks;
 *   - the art folder, `public/images/landing/software-location/`.
 *
 * The form copy and the closing consultation band are the mobile location
 * pages' too — see `mobile-app-location-shared.ts`.
 */

import type { CardGridContent as TileGridContent } from '@/components/generative-ai/industries';
import type { TechStackContent } from '@/components/landing/tech-stack';
import type { TechClusterMarks } from '@/components/data-science/tech-cluster';

/** Root-relative folder of the software location pages' hand-placed art. */
export const SOFTWARE_IMG = '/images/landing/software-location';

/** The industries band's eight H4 tiles, as every software location page runs them. */
export const softwareIndustryItems: TileGridContent['items'] = [
  { key: 'ecommerce', name: 'eCommerce', body: '', href: '/ecommerce-mobile-app-development-company' },
  { key: 'edtech', name: 'ELearning', body: '', href: '/education-app-development-company' },
  { key: 'healthtech', name: 'Healthcare', body: '', href: '/healthcare-mobile-app-development-company' },
  { key: 'logistics', name: 'Logistics', body: '' },
  { name: 'Entertainment', body: '' },
  { key: 'realestate', name: 'Real Estate', body: '' },
  { name: 'Networking', body: '' },
  { name: 'Travel', body: '' },
];

/** The live tabs become the clusters; each tool keeps its live label. */
export const softwareTechGroups: TechStackContent['groups'] = [
  { name: 'Front-End', items: ['React Js', 'Angular Js', 'Bootstrap', 'Vue Js', 'Javascript', 'HTML', 'CSS'] },
  { name: 'Back-End', items: ['PHP', 'Java', 'Python', 'Node JS', '.Net', 'ROR'] },
  { name: 'Mobile', items: ['Swift', 'Kotlin', 'Java', 'React', 'Flutter', 'ionic'] },
  { name: 'DevOps/Clouds', items: ['Aws', 'Azure', 'Cloud', 'Docker', 'Jenkin', 'Anisible', 'kubernets'] },
  { name: 'Design', items: ['Photoshop', 'Illustrator', 'Adobe-XD', 'Figma'] },
  { name: 'Quality Assurance', items: ['Selenium', 'Cypress', 'Manaul Testing'] },
];

/**
 * Every logo keeps its live alt text. Labels spelled differently on the live
 * pages are drawn with the tool's real mark (`mark`); "Manaul Testing", which
 * `TechLogo` has no mark for, takes the live page's own icon.
 */
export const softwareTechMarks: TechClusterMarks = {
  'React Js': { alt: 'Hire ReactJS Developers in India' },
  'Angular Js': { alt: 'Hire Angular Developers in India' },
  Bootstrap: { alt: 'Bootstrap' },
  'Vue Js': { alt: 'Vue-js' },
  Javascript: { alt: 'Javascript' },
  HTML: { alt: 'HTML' },
  CSS: { alt: 'CSS' },
  PHP: { alt: 'Hire PHP Developers in India' },
  Java: { alt: 'Hire Java Developers in India' },
  Python: { alt: 'Hire Python Developers in India' },
  'Node JS': { alt: 'Hire NodeJS Developers in India' },
  '.Net': { alt: 'Hire .Net Developers in India' },
  ROR: { alt: 'Hire ROR Developers in India' },
  Swift: { alt: 'Hire Swift Developers in India' },
  Kotlin: { alt: 'Hire Kotlin Developers in India' },
  React: { alt: 'Hire React Developers in India' },
  Flutter: { alt: 'Hire Flutter Developers in India' },
  ionic: { alt: 'Hire Ionic Developers in India' },
  Aws: { alt: 'aws' },
  Azure: { alt: 'azure' },
  Cloud: { mark: 'Google Cloud', alt: 'Google-cloud' },
  Docker: { alt: 'Docker' },
  Jenkin: { mark: 'Jenkins', alt: 'jenkins' },
  Anisible: { mark: 'Ansible', alt: 'Anisible' },
  kubernets: { mark: 'Kubernetes', alt: 'kubernets' },
  Photoshop: { alt: 'Photoshop' },
  Illustrator: { alt: 'illustrator' },
  'Adobe-XD': { alt: 'Adobe-XD' },
  Figma: { alt: 'Figma' },
  Selenium: { alt: 'Hire Selenium Testers in India' },
  Cypress: { alt: 'Cypress' },
  'Manaul Testing': { src: `${SOFTWARE_IMG}/tech-manual-testing.webp`, alt: 'Hire Manual Testers India' },
};

/** The legacy band's illustration (`Frame-1234.svg`); its alt names each page's location. */
export const softwareLegacyFigure = (alt: string) =>
  ({ src: `${SOFTWARE_IMG}/france-legacy.webp`, width: 1200, height: 767, alt }) as const;
