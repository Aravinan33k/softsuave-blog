import type { Metadata } from 'next';

import styles from '@/components/home/home.module.css';
import Preloader from '@/components/home/preloader';
import Nav from '@/components/home/nav';
import ChapterNav from '@/components/home/chapter-nav';
import TechStack from '@/components/home/tech-stack';
import Footer from '@/components/home/footer';
import Sections from './sections';

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
        <Sections
          techStack={<TechStack />}
        />
      </main>
      <Footer />
    </div>
  );
}
