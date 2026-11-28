import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import {
  RATE_CARD_SECTION_ID,
  rateCard,
  rateCardDownload,
  rateCardFaqs,
  rateCardMeta,
} from '@/lib/home/developer-rate-card-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import CaseStudy from '@/components/case-study/case-study';
import Faq from '@/components/landing/faq';
import FormBand from '@/components/common/form-band';

import home from '@/components/home/home.module.css';

/**
 * Developer's Rate Card: softsuave.com/developer-rate-card on the new theme,
 * with the same slug. It is set on the case-study page template (by request):
 * hero, then a contents column beside the article's sections. The copy, and
 * where it differs from live, are in `lib/home/developer-rate-card-content.ts`.
 *
 * After the article comes the FAQ, still listed in the contents column. The
 * page then closes on the "Download Rate Card" section, which holds the form.
 * The hero's button and the contents column's button both lead to it. The
 * live page's "Book Free Consultation" block is left out, by request.
 *
 * The head is as live: title, description and canonical. Live has no Open
 * Graph tags and no structured data, so neither does this page. The route is
 * in PAGES_WITH_OWN_SITE_GRAPH, so the layout adds no schema. Robots follows
 * the site-wide setting (`pageRobots`), as live is index,follow.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  // The live page's own title, verbatim; the root title template is "%s".
  title: rateCardMeta.title,
  description: rateCardMeta.description,
  // The live canonical, verbatim — the production URL, not this deployment's.
  alternates: { canonical: rateCardMeta.canonical },
  robots: pageRobots,
};

const HOME_HREF = BASE_PATH || '/';

export default function DeveloperRateCardPage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <CaseStudy content={rateCard} idPrefix="developer-rate-card" />

        <div className={home.light}>
          <Faq content={rateCardFaqs} idPrefix="developer-rate-card-faq" />
        </div>

        {/* On the dark ground, after the light FAQ band. */}
        <FormBand content={rateCardDownload} id={RATE_CARD_SECTION_ID} idPrefix="developer-rate-card-download" />
      </main>

      <Footer />
    </div>
  );
}
