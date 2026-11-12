import { BASE_PATH } from '@/lib/flags';
import type { ClientLogo } from '@/lib/home/content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
// The location pages' hero, clients band, overview, FAQ and closing band.
import Hero, { type HeroContent } from '@/components/generative-ai/hero';
import Clients from '@/components/home/clients';
import Overview, { type OverviewContent } from '@/components/generative-ai/overview';
import Faq, { type FaqContent } from '@/components/generative-ai/faq';
import ConsultationClose, { type ConsultationCloseContent } from '@/components/common/consultation-close';
// data-science-services' services grid and Technology Stack.
import ServicesGrid, { type ServicesGridContent } from '@/components/common/services-grid';
import TechCluster, { type TechClusterMarks } from '@/components/data-science/tech-cluster';
import type { TechStackContent } from '@/components/landing/tech-stack';
// The hire pages' tile grid, for the legacy items and the industries.
import TileGrid, { type CardGridContent as TileGridContent } from '@/components/generative-ai/industries';
// The framed-illustration legacy band, where a page opts into it.
import LegacyShowcase from '@/components/common/legacy-showcase';

import home from '@/components/home/home.module.css';
// The location pages' type, rhythm and section widths, shared.
import location from './location-app-page.module.css';

/** Everything a "software development company in <location>" page says. */
export interface SoftwareLocationPageContent {
  /** Namespaces the forms' field ids (and is each lead's `sourceKey`) and the FAQ's ids. */
  key: string;
  hero: HeroContent;
  /** The clients band's logo strip; its heading and standfirst are the shared band's. */
  clientLogos: ClientLogo[];
  about: OverviewContent;
  services: ServicesGridContent;
  /** The legacy-modernisation band: four H3 items beside its illustration. */
  legacy: TileGridContent;
  /**
   * How the legacy band is drawn. `tiles` (default) is the tile grid beside
   * the picture; `showcase` is `common/legacy-showcase` — the picture in a
   * framed stage beside numbered service rows (requested for the Germany
   * page).
   */
  legacyStyle?: 'tiles' | 'showcase';
  /** The industries band: eight H4 tiles and its "Get Started". */
  industries: TileGridContent;
  tech: TechStackContent;
  techMarks: TechClusterMarks;
  faqs: FaqContent;
  close: ConsultationCloseContent;
}

const HOME_HREF = BASE_PATH || '/';

/**
 * The one rendering of softsuave.com's "software development company in
 * <location>" pages (France, Germany, …), carried into the new theme with the
 * location pages' design. Every one runs the same nine bands in the same
 * order — hero, clients, about, services, legacy modernisation, industries,
 * technologies, FAQ, closing consultation — and differs only in its words, so
 * each route owns its `metadata` and JSON-LD and passes its copy here.
 *
 * Heading levels are the live pages': services and legacy items are H3s, the
 * industry names and FAQ questions H4s.
 *
 * Band rhythm: hero dark, then light/dark alternating — clients light, about
 * dark, services light, legacy dark, industries light, technologies dark, FAQ
 * light — and the closing consultation dark.
 *
 * A server component: the sections inside are the client ones.
 */
export default function SoftwareLocationPage({ content }: { content: SoftwareLocationPageContent }) {
  const { key } = content;

  return (
    <div className={`${home.page} ${location.root}`} data-type-scale="hire">
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={content.hero} idPrefix={key} wide />

        <div className={home.light}>
          {/* The hire-software-developers clients band with the deployed
              homepage's logos, as on the location pages. */}
          <Clients logos={content.clientLogos} />
        </div>

        <Overview content={content.about} />

        <div className={home.light}>
          {/* `expertise`, not `services`: an id with "service" in it turns on
              name-matched card links, and the live cards do not link (except
              those that carry their own href). */}
          <ServicesGrid content={content.services} id="expertise" linkLabel="Know More" />
        </div>

        {content.legacyStyle === 'showcase' ? (
          <LegacyShowcase content={content.legacy} id="legacy" />
        ) : (
          <TileGrid content={content.legacy} id="legacy" variant="tiles" />
        )}

        <div className={home.light}>
          <TileGrid content={content.industries} id="industries" variant="tiles" nameAs="h4" />
        </div>

        <TechCluster content={content.tech} marks={content.techMarks} />

        <div className={home.light}>
          <Faq content={content.faqs} idPrefix={`${key}-faq`} questionAs="h4" />
        </div>

        <ConsultationClose content={content.close} idPrefix={`${key}-close`} />
      </main>

      <Footer />
    </div>
  );
}
