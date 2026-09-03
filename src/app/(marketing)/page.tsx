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
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import Services from '@/components/home/services';
import Journey from '@/components/home/journey';
import Industries from '@/components/home/industries';
import Awards from '@/components/home/awards';
import Recognitions from '@/components/home/recognitions';
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
        {/* Clients continues the light band opened by "Why Soft Suave" — the
            proof numbers and the names behind them read as one chapter. */}
        <div className={styles.light}>
          <Clients />
        </div>
        <Industries />
        <div className={styles.light}>
          <Services />
        </div>
        <Journey />
        {/* Case studies invert to the warm-white band — the photography and the
            outcome numbers carry more weight on light, and it breaks up the run
            of dark sections between Journey and Awards. */}
        <div className={styles.light}>
          <WorkGrid />
        </div>
        <Awards />
        {/* Warm-white band. The badges are real directory artwork with white
            grounds baked in, so each sits on a light plaque; the existing
            `.light .recogBadge` rule trades that plaque's dark drop shadow
            for a hairline, which is what keeps it separated from the band. */}
        <div className={styles.light}>
          <Recognitions />
        </div>
        <TechStack />
        {/* Client stories invert to the warm-white band, so the run reads
            TechStack(dark) → stories(light) → Contact(dark). The archive's own
            styles are token-driven, so the wrapper is the whole switch — the
            one exception is each photograph's hover veil, which stays
            near-black on purpose because it sits on the picture, not the page
            (see `.rImageVeilLabel`). */}
        <div className={styles.light}>
          <Testimonials />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
