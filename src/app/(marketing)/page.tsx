'use client';

import styles from '@/components/home/home.module.css';
import Preloader from '@/components/home/preloader';
// Custom cursor disabled — using the native OS cursor. Kept for easy re-enable.
// import Cursor from '@/components/home/cursor';
import Nav from '@/components/home/nav';
import ChapterNav from '@/components/home/chapter-nav';
import Hero from '@/components/home/hero';
import Manifesto from '@/components/home/manifesto';
import Stats from '@/components/home/stats';
import WorkGrid from '@/components/home/work-grid';
import Services from '@/components/home/services';
import Journey from '@/components/home/journey';
import Industries from '@/components/home/industries';
import StoryBlock from '@/components/home/story-block';
import Awards from '@/components/home/awards';
import TechStack from '@/components/home/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
import Footer from '@/components/home/footer';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <Preloader />
      {/* <Cursor /> */}
      <Nav />
      <ChapterNav />
      <main id="main">
        <Hero />
        <div id="why" className={`${styles.light} ${styles.whySection}`}>
          <Manifesto />
          <Stats />
        </div>
        <WorkGrid />
        <div className={styles.light}>
          <Services />
        </div>
        <Journey />
        <Industries />
        <StoryBlock />
        <Awards />
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
