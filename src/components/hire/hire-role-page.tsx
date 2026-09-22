import type { ReactNode } from 'react';

import { BASE_PATH } from '@/lib/flags';
import type { HireBand, HireRolePageContent } from '@/lib/home/hire-roles/types';
import { assignGrounds } from '@/lib/home/hire-roles/band-grounds';
import { partnerHeroBadges } from '@/lib/home/hero-badges';
import { overviewImage } from '@/lib/home/overview-images';

// Company-level sections: the homepage's own components, rendering the
// homepage's own copy from `lib/home/content.ts`. A role page's claim to these
// clients, these figures, these case studies and these client stories is the
// same claim the homepage makes — so it is made with the same component, the
// same layout and the same words, not a second version that can drift out of
// step. Only the bands the live role pages actually run are imported: the Why
// Soft Suave manifesto, the industries fan and the awards strip are not among
// them, so they are not here.
import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
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
 * All thirteen routes share this component, but *not* one fixed band order:
 * softsuave.com does not run these pages in a single sequence, and several of
 * them differ substantially — the Salesforce and Blockchain pages open on their
 * why-hire cards, the backend page puts its evaluation criteria after the
 * delivery section, the dedicated page closes on its rate table and challenges.
 * So the order is content, declared per page in `order` and rendered here in
 * exactly that sequence. A page's module is therefore the single description of
 * both what its live page says and the order it says it in.
 *
 * **The split that matters**: a section is either about Soft Suave or about the
 * role. Everything in the first group is the homepage's component *and* the
 * homepage's content — the clients, the figures, the case studies, the client
 * stories and the closing enquiry band. Only the second group is written per
 * role, from that role's live page.
 *
 * **What is not rendered at all**: every band here corresponds to one the live
 * role pages run. The homepage bands they do not run — the Why Soft Suave
 * manifesto, the industries fan and the awards strip — are left off, so these
 * pages carry nothing their source does not.
 *
 * A server component: it holds no state, so keeping it off the client boundary
 * means the copy for the static bands is serialised once into the HTML instead
 * of shipping as props. The interactive sections inside are the client ones.
 */
export default function HireRolePage({ content }: { content: HireRolePageContent }) {
  /**
   * `ownsAnchors` on the nav promises this page has #services and #why. Which
   * band carries each depends on what the live page runs: the services anchor
   * goes to the capability carousel, or to the specialisations grid on a page
   * whose only "what you can hire" band is that grid. The why anchor goes to
   * the page's own why-hire cards, or — on the pages that publish none — to the
   * client strip, and failing that to the overview.
   */
  const servicesBand: HireBand = content.capabilities ? 'capabilities' : 'specialisations';
  const whyBand: HireBand = content.whyRole
    ? 'whyRole'
    : content.order.includes('clients')
      ? 'clients'
      : 'overview';

  /**
   * The hero's credentials: the page's own text tags (the free-trial
   * guarantee, the FDE figures) first, then the four partner lockups every
   * other hero on the surface closes on. Added here, once, because they are
   * the company's standing rather than the role's.
   */
  const hero = {
    ...content.hero,
    badges: [...(content.hero.badges ?? []), ...partnerHeroBadges],
  };

  function render(band: HireBand): ReactNode {
    const anchor = (own: HireBand, fallback: string) => (whyBand === own ? 'why' : fallback);

    switch (band) {
      case 'clients':
        return (
          <div key={band} id={whyBand === 'clients' ? 'why' : undefined}>
            <Clients />
          </div>
        );
      case 'overview':
        return content.overview ? (
          <Overview
            key={band}
            // A page's own image wins; otherwise the pipeline's per-page photo.
            content={{
              ...content.overview,
              image: content.overview.image ?? overviewImage(content.slug.replace(/^\//, '')),
            }}
            id={anchor('overview', 'overview')}
          />
        ) : null;
      case 'capabilities':
        return content.capabilities ? (
          <Services
            key={band}
            content={content.capabilities}
            id={servicesBand === 'capabilities' ? 'services' : 'capabilities'}
          />
        ) : null;
      case 'specialisations':
        return content.specialisations ? (
          <CardGrid
            key={band}
            content={content.specialisations}
            id={servicesBand === 'specialisations' ? 'services' : 'expertise'}
            variant="bold"
          />
        ) : null;
      case 'fit':
        return content.fit ? <Problems key={band} content={content.fit} id="fit" /> : null;
      case 'engagement':
        return content.engagement ? (
          <Integration key={band} content={content.engagement} id="engagement" variant="bold" />
        ) : null;
      case 'globalDelivery':
        return content.globalDelivery ? (
          <Overview key={band} content={content.globalDelivery} id="delivery" />
        ) : null;
      case 'process':
        return <Process key={band} content={content.process} />;
      case 'midCta':
        return content.midCta ? <CtaBand key={band} content={content.midCta} /> : null;
      case 'whyRole':
        return content.whyRole ? (
          <CardGrid key={band} content={content.whyRole} id="why" variant="bold" />
        ) : null;
      case 'comparison':
        return content.comparison ? (
          <Comparison key={band} content={content.comparison} id="compare" />
        ) : null;
      case 'rates':
        return content.rates ? <Comparison key={band} content={content.rates} id="rates" /> : null;
      case 'techStack':
        return content.techStack ? <TechStack key={band} content={content.techStack} /> : null;
      case 'caseStudies':
        return <WorkGrid key={band} />;
      case 'testimonials':
        return <Testimonials key={band} />;
      case 'faq':
        return <Faq key={band} content={content.faq} idPrefix={`${content.key}-faq`} />;
      default: {
        // `list:<key>` — one of the page's own label-only bands, rendered
        // through the technology band because that is what it is: a heading and
        // a row of named things. Same treatment, its own place in the page.
        const list = content.lists?.find((l) => `list:${l.key}` === band);
        // Its own anchor, not the band's default `tech`: a page may run several
        // of these beside its real technology section, and they must not all
        // answer to the same id — that is invalid HTML and it stole the nav's
        // Tech Stack link, which belongs to the `techStack` band above.
        return list ? <TechStack key={band} content={list} id={`list-${list.key}`} /> : null;
      }
    }
  }

  // Render in the page's own order, dropping bands whose content is absent,
  // then fold each run of same-ground bands into one wrapper, so a chapter
  // reads as one surface rather than as stacked panels with doubled padding.
  const bands = content.order
    .map((band) => ({ band, node: render(band) }))
    .filter((b): b is { band: HireBand; node: ReactNode } => b.node !== null);

  const grounds = assignGrounds(bands.map((b) => b.band));
  const chapters: { light: boolean; nodes: ReactNode[] }[] = [];
  bands.forEach(({ node }, i) => {
    const light = grounds[i] === 'light';
    const last = chapters.at(-1);
    if (last && last.light === light) last.nodes.push(node);
    else chapters.push({ light, nodes: [node] });
  });

  return (
    <div className={styles.page}>
      {/* `logoHref` is stated because `ownsAnchors` also keeps the logo's
          default `#top` in-page, and the lockup must go HOME from a sub-page. */}
      <Nav ownsAnchors logoHref={BASE_PATH || '/'} />

      <main id="main">
        <Hero content={hero} idPrefix={content.key} />

        {chapters.map((chapter, i) =>
          chapter.light ? (
            <div key={i} className={styles.light}>
              {chapter.nodes}
            </div>
          ) : (
            <div key={i}>{chapter.nodes}</div>
          ),
        )}

        {/* The homepage's closing band — the scrubbed focus pull and the
            press-and-hold confirm, which is this surface's rendering of the
            "Book Free Consultation" form every live role page ends on. Its CTA
            keeps the default `/contact` destination — the review asked for
            every final CTA to lead to the contact page. */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
