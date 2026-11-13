import { BASE_PATH } from '@/lib/flags';
import type { ClientLogo } from '@/lib/home/content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// hire-software-developers' hero, clients and FAQ.
import Hero, { type HeroContent } from '@/components/generative-ai/hero';
import Clients from '@/components/home/clients';
import Faq, { type FaqContent } from '@/components/generative-ai/faq';
// The shared prose + image overview.
import Overview, { type OverviewContent } from '@/components/generative-ai/overview';
// data-science-services' services grid and Technology Stack.
import ServicesGrid, { type ServicesGridContent } from '@/components/common/services-grid';
import TechCluster, { type TechClusterMarks } from '@/components/data-science/tech-cluster';
import type { TechStackContent } from '@/components/landing/tech-stack';
// The landing card grid, and the homepage's work lane for the portfolio.
import CardGrid, { type CardGridContent } from '@/components/landing/industries';
import WorkGrid, { type WorkCarouselContent } from '@/components/home/work-grid';
// The long-form process and the full consultation close.
import ProcessStepper, { type ProcessStepperContent } from '@/components/common/process-stepper';
import ConsultationClose, { type ConsultationCloseContent } from '@/components/common/consultation-close';

import home from '@/components/home/home.module.css';
import styles from './location-app-page.module.css';

/** Everything a "mobile app development company in <location>" page says. */
export interface LocationAppPageContent {
  /** Namespaces the forms' field ids (and is each lead's `sourceKey`) and the FAQ's ids. */
  key: string;
  hero: HeroContent;
  /** The clients band's logo strip; its heading and standfirst are the shared band's. */
  clientLogos: ClientLogo[];
  about: OverviewContent;
  services: ServicesGridContent;
  who: CardGridContent;
  portfolio: WorkCarouselContent;
  /** Heading level of the portfolio titles, as the live page sets them. Default H3. */
  portfolioTitleAs?: 'h3' | 'h4' | 'h5';
  /** The process band. Optional: a live page without one (Maryland) omits it. */
  process?: ProcessStepperContent;
  tech: TechStackContent;
  techMarks: TechClusterMarks;
  /** The FAQ band. Optional: a live page without one (Maryland) omits it. */
  faqs?: FaqContent;
  /** Heading level of the FAQ questions, as the live page sets them. Default H3. */
  faqQuestionAs?: 'h3' | 'h4';
  close: ConsultationCloseContent;
}

const HOME_HREF = BASE_PATH || '/';

/**
 * The one rendering of softsuave.com's "mobile app development company in
 * <location>" pages (Dubai, Germany, …), carried into the new theme. Every
 * location page runs the same ten bands in the same order and differs only in
 * its words, so the route owns its `metadata` and JSON-LD and passes its copy
 * here; nothing about the layout is written twice.
 *
 * Bands, by brief: hero, clients and FAQ from hire-software-developers; the
 * shared Overview; data-science-services' services grid and Technology Stack;
 * the landing card grid for "who we work for"; the homepage work lane (a
 * swipeable row on mobile) for the portfolio; `ProcessStepper`; and
 * `ConsultationClose`.
 *
 * Typography and rhythm are the deployed hire-software-developers page's:
 * `data-type-scale="hire"` (labels, cards, stack, FAQ sizes) plus this
 * component's stylesheet (heading weight 600, section rhythm, gutter, and the
 * per-section widths reviewed on the Dubai page).
 *
 * Band rhythm: hero dark, then light/dark alternating with no two dark
 * sections touching — the technology stack and the FAQ share the last light
 * chapter, and the closing consultation band is dark. A page without a
 * process band (Maryland) runs the portfolio, stack and any FAQ as one light
 * chapter; the process and FAQ bands are each optional.
 *
 * A server component: the sections inside are the client ones.
 */
export default function LocationAppPage({ content }: { content: LocationAppPageContent }) {
  const { key } = content;

  const portfolio = (
    <WorkGrid
      content={content.portfolio}
      id="portfolio"
      countLabel="projects"
      tileTitleAs={content.portfolioTitleAs}
      mobileSlide
    />
  );
  // The technology stack, and the FAQ where the page has one.
  const closingLight = (
    <>
      <TechCluster content={content.tech} marks={content.techMarks} />
      {content.faqs ? (
        <Faq content={content.faqs} idPrefix={`${key}-faq`} questionAs={content.faqQuestionAs} />
      ) : null}
    </>
  );

  return (
    <div className={`${home.page} ${styles.root}`} data-type-scale="hire">
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={content.hero} idPrefix={key} wide />

        <div className={home.light}>
          <Clients logos={content.clientLogos} />
        </div>

        <Overview content={content.about} />

        <div className={home.light}>
          <ServicesGrid content={content.services} linkLabel="Know More" />
        </div>

        <CardGrid content={content.who} id="who-we-work-for" variant="feature" columns={2} autoLink={false} />

        {content.process ? (
          <>
            <div className={home.light}>{portfolio}</div>
            <ProcessStepper content={content.process} id="journey" />
            <div className={home.light}>{closingLight}</div>
          </>
        ) : (
          // No process band between them: the portfolio and the closing
          // light bands meet, so they are one light chapter rather than two
          // stacked wrappers with doubled padding.
          <div className={home.light}>
            {portfolio}
            {closingLight}
          </div>
        )}

        <ConsultationClose content={content.close} idPrefix={`${key}-close`} />
      </main>

      <Footer />
    </div>
  );
}
