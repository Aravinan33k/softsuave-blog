import { JsonLd } from '@/components/seo/json-ld';
import { homeMetadata, homeJsonLd } from '@/lib/home/home-seo';

import styles from '@/components/home/home.module.css';
import ad from '@/components/ad/ad.module.css';
import landing from '@/components/landing/landing.module.css';
import genAi from '@/components/generative-ai/gen-ai.module.css';
import Preloader from '@/components/home/preloader';
// Custom cursor disabled — using the native OS cursor. Kept for easy re-enable.
// import Cursor from '@/components/home/cursor';
import Nav from '@/components/home/nav';
import ChapterNav from '@/components/home/chapter-nav';
import TechStack from '@/components/home/tech-stack';
import Footer from '@/components/home/footer';
import Sections from './sections';

/**
 * The homepage.
 *
 * A SERVER component, which is what lets it own the two things the 11 Sep
 * review found missing: its own `metadata` (the group layout's is the fallback
 * for the pages that declare none, and carried no Open Graph tags) and a
 * JSON-LD block. Every section below is a client component and behaves exactly
 * as before — nothing here uses state, effects or handlers, so there was never
 * anything for `'use client'` to buy.
 *
 * The hero, Industries and AI Transformation Journey are the redesigned
 * versions in `components/home-v2` (reviewed at /home-v2 first, then swapped
 * in). The versions they replaced still live in `components/home` — other
 * pages reuse that Industries and Journey — and /home-v2 now shows the
 * previous homepage with them, for comparison.
 */
export const metadata = homeMetadata;

export default function HomePage() {
  return (
    <div className={`${styles.page} ${styles.stackedHeads} ${landing.stackedHeads} ${genAi.stackedHeads} ${ad.stackHeads}`}>
      {/* softsuave.com's homepage schema, verbatim: one <script> per block,
          as live serves them — see `lib/home/home-live-schema.ts`. */}
      {homeJsonLd().map((node) => (
        <JsonLd key={String(node['@type'])} data={node} />
      ))}
      <Preloader />
      {/* <Cursor /> */}
      <Nav />
      <ChapterNav />
      {/* `homeHeadGap`: twice the shared head-to-content gap in every section;
          `homeStoryQuote`: the client-story quote at 16px (review). */}
      <main id="main" className={`${styles.homeHeadGap} ${styles.homeStoryQuote}`}>
        <Sections
          techStack={<TechStack />}
        />
      </main>
      <Footer />
    </div>
  );
}
