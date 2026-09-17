import { BASE_PATH } from '@/lib/flags';
import type { HireRolePageContent } from '@/lib/home/hire-roles/types';

// Company-level sections: the homepage's own components, rendering the
// homepage's own copy from `lib/home/content.ts`. A role page's claim to 13+
// years, 400+ specialists, these clients, these case studies, these awards and
// these client stories is the same claim the homepage makes — so it is made
// with the same component, the same layout and the same words, not a second
// version that can drift out of step.
import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Manifesto from '@/components/home/manifesto';
import Stats from '@/components/home/stats';
import Clients from '@/components/home/clients';
import Industries from '@/components/home/industries';
import WorkGrid from '@/components/home/work-grid';
import Recognitions from '@/components/home/recognitions';
import TechStack from '@/components/home/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// Role-specific sections: the landing-page components, which exist because the
// homepage has no equivalent. The hero carries the enquiry form (the homepage
// hero is a video showreel), and the rest are the parts of a hire page that are
// genuinely about this role — what it does, which technologies, how you engage,
// how hiring works, and how we compare to the alternatives.
import Hero from '@/components/generative-ai/hero';
import Overview from '@/components/generative-ai/overview';
import Problems from '@/components/generative-ai/problems';
import Services from '@/components/generative-ai/services';
import CtaBand from '@/components/generative-ai/cta-band';
import Integration from '@/components/generative-ai/integration';
import Process from '@/components/generative-ai/process';
import CardGrid from '@/components/generative-ai/industries';
import Comparison from '@/components/generative-ai/comparison';
import Faq from '@/components/generative-ai/faq';

import styles from '@/components/home/home.module.css';

/**
 * The one rendering of a "Hire Developers by Role" page.
 *
 * All nine routes are the same section stack over different copy, so they share
 * this component rather than each repeating the band order — a change to either
 * is then a change in one place.
 *
 * **The split that matters**: a section is either about Soft Suave or about the
 * role. Everything in the first group is the homepage's component *and* the
 * homepage's content — Why Soft Suave, the stats, the clients, the case
 * studies, the recognitions, the client stories and the closing enquiry band.
 * Only the second group is written per role, from that role's live page.
 *
 * A server component: it holds no state, so keeping it off the client boundary
 * means the copy for the static bands is serialised once into the HTML instead
 * of shipping as props. The interactive sections inside are the client ones.
 *
 * Band rhythm follows the homepage — dark hero, then sections grouped two or
 * three to an inverted band so a long page breathes without strobing, and the
 * proof chapter (work, recognitions, stories) carried as one long warm-white
 * run before the page closes dark on the FAQ and the enquiry.
 */
export default function HireRolePage({ content }: { content: HireRolePageContent }) {
  return (
    <div className={styles.page}>
      {/* This page owns both of the nav bar's anchor sections — `Services`
          renders #services and the Why band below renders #why — so
          `ownsAnchors` keeps the bar scrolling in-page rather than sending the
          reader to the homepage's copies. `logoHref` is stated because
          `ownsAnchors` also keeps the logo's default `#top` in-page, and the
          lockup must go HOME from a sub-page. */}
      <Nav ownsAnchors logoHref={BASE_PATH || '/'} />

      <main id="main">
        {/* ── The role ─────────────────────────────────────────────── */}
        <Hero content={content.hero} idPrefix={content.key} />

        <div className={styles.light}>
          <Overview content={content.overview} />
          {content.fit && <Problems content={content.fit} id="fit" />}
        </div>

        <Services content={content.capabilities} />
        <CtaBand content={content.midCta} />

        {/* ── Soft Suave ───────────────────────────────────────────────
            The homepage's "Why Soft Suave" chapter, verbatim: the manifesto
            and the odometer stat cards inside the same full-viewport
            `.whySection` band, then the client proof band that follows it
            there. `id="why"` sits on the wrapper exactly as it does on the
            homepage, which is what the nav's Company link scrolls to. */}
        <div id="why" className={`${styles.light} ${styles.whySection}`}>
          <Manifesto />
          <Stats />
        </div>
        <div className={styles.light}>
          <Clients />
        </div>

        {/* The homepage's industries fan. Its cards already link to our eight
            sector pages, so this is also the page's route into them — a
            role-written industries list would have been a second, thinner
            version of the same set. */}
        <Industries />

        {/* ── The role ─────────────────────────────────────────────── */}
        <div className={styles.light}>
          <Integration content={content.engagement} id="engagement" />
          <Process content={content.process} />
        </div>

        {/* Specialisations name disciplines and technologies, which have no
            photography — so they take the card grid's `compact` text card
            rather than its picture card. */}
        <CardGrid content={content.specialisations} id="expertise" variant="compact" />
        <Comparison content={content.comparison} id="compare" />
        {content.rates && <Comparison content={content.rates} id="rates" />}

        {/* ── Soft Suave ───────────────────────────────────────────────
            The proof chapter, as one warm-white run: the case-study gallery,
            the recognition badges and the client stories, all three the
            homepage's own components over the homepage's own facts. */}
        <div className={styles.light}>
          <WorkGrid />
          <Recognitions />
          <Testimonials />
        </div>

        {/* The homepage's technology band — its marquee rows and hover chips —
            carrying this role's own stack. */}
        <TechStack content={content.techStack} />

        {/* ── Close ────────────────────────────────────────────────── */}
        <div className={styles.light}>
          <Faq content={content.faq} idPrefix={`${content.key}-faq`} />
        </div>

        {/* The homepage's closing band — the scrubbed focus pull and the
            press-and-hold confirm. `ctaHref` points at this page's own hero
            form rather than the content's default `/contact`: the form the
            reader needs is already on the page, exactly as `/contact` itself
            redirects the same band to its own section. */}
        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
