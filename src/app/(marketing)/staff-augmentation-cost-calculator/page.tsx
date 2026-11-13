import type { Metadata } from 'next';
import Image from 'next/image';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import {
  staffCostAwards,
  staffCostClients,
  staffCostHero,
  staffCostMeta,
  staffCostRoles,
  staffCostTestimonials,
} from '@/lib/home/staff-cost-calculator-content';
import { SiteLink } from '@/themes/softsuave/site-link';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Clients from '@/components/home/clients';
import Recognitions from '@/components/home/recognitions';
import Testimonials from '@/components/home/testimonials';
import TechLogo from '@/components/home/tech-logo';
import StaffCostCalculator from '@/components/staff-cost/staff-cost-calculator';
import ScrollCue from '@/components/staff-cost/scroll-cue';

import home from '@/components/home/home.module.css';
import styles from '@/components/staff-cost/staff-cost-calculator.module.css';

/** IT Staff Augmentation Cost Calculator — softsuave.com's /staff-augmentation-cost-calculator. */

export const revalidate = 300;

export const metadata: Metadata = {
  title: staffCostMeta.title,
  description: staffCostMeta.description,
  alternates: { canonical: staffCostMeta.path },
  robots: pageRobots,
  openGraph: {
    title: staffCostMeta.title,
    description: staffCostMeta.description,
    url: absoluteUrl(staffCostMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(staffCostMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: staffCostMeta.title,
    description: staffCostMeta.description,
    images: [dynamicOgImage(staffCostMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(staffCostMeta.path)}#webpage`,
  name: staffCostMeta.title,
  description: staffCostMeta.description,
  url: absoluteUrl(staffCostMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

/** The site's own mark for each technology the calculator offers, drawn here on the server. */
const TECH_NAMES = [...new Set(staffCostRoles.flatMap((r) => r.techs))];

export default function StaffCostCalculatorPage() {
  const marks = Object.fromEntries(TECH_NAMES.map((name) => [name, <TechLogo key={name} name={name} />]));
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <section className={styles.hero}>
          <Image src={staffCostHero.image} alt="" fill priority sizes="100vw" className={styles.heroImg} />
          <div className={styles.heroVeil} aria-hidden />
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>
              {staffCostHero.title.replace(staffCostHero.accent, '')}
              <span className={styles.heroAccent}>{staffCostHero.accent}</span>
            </h1>
            <p className={styles.heroBody}>{staffCostHero.body}</p>
          </div>
          <ScrollCue targetId="calculator" />
        </section>

        <div className={home.light}>
          <section className={styles.band} id="calculator">
            <StaffCostCalculator marks={marks} />
          </section>

          <Clients
            eyebrow={staffCostClients.eyebrow}
            title={staffCostClients.title}
            body={staffCostClients.body}
            logos={[...staffCostClients.logos]}
          />
          <div className={styles.moreRow}>
            <SiteLink href={staffCostClients.more.href} className={`${home.pill} ${home.pillFilled} ${home.navCta}`}>
              {staffCostClients.more.label}
            </SiteLink>
          </div>

          <Recognitions content={staffCostAwards} />
        </div>

        <Testimonials content={staffCostTestimonials} />
      </main>

      <Footer />
    </div>
  );
}
