import type { Metadata } from 'next';

import styles from '@/components/home/home.module.css';
import Preloader from '@/components/home/preloader';
import Nav from '@/components/home/nav';
import ChapterNav from '@/components/home/chapter-nav';
import Manifesto from '@/components/home/manifesto';
import Stats from '@/components/home/stats';
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import Services from '@/components/home/services';
import Awards from '@/components/home/awards';
import Recognitions from '@/components/home/recognitions';
import TechStack from '@/components/home/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
import Footer from '@/components/home/footer';
// The previous homepage's hero, Industries and Journey (`/` now uses the
// redesigned ones in components/home-v2).
import Hero from '@/components/home/hero';
import Industries from '@/components/home/industries';
import Journey from '@/components/home/journey';

/**
 * The previous homepage, kept for comparison after the redesigned hero,
 * Industries and AI Transformation Journey were swapped into `/`.
 *
 * The same page as `app/(marketing)/page.tsx`, section for section and band
 * for band, with those three sections in their earlier design. Not for
 * search: noindex, no JSON-LD, and not registered in MARKETING_ROUTES, so it
 * is in no sitemap.
 */
export const metadata: Metadata = {
  title: 'Previous homepage — Soft Suave',
  robots: { index: false, follow: false },
};

export default function PreviousHomePage() {
  return (
    <div className={styles.page}>
      <Preloader />
      <Nav />
      <ChapterNav />
      <main id="main">
        <Hero />
        <div id="why" className={`${styles.light} ${styles.whySection}`}>
          <Manifesto />
          <Stats />
        </div>
        <div className={styles.light}>
          <Clients />
        </div>
        <Industries />
        <div className={styles.light}>
          <Services />
        </div>
        <Journey />
        <div className={styles.light}>
          <WorkGrid />
        </div>
        <Awards />
        <div className={styles.light}>
          <Recognitions />
        </div>
        <TechStack />
        <div className={styles.light}>
          <Testimonials />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
