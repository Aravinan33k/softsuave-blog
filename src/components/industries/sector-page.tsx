import Nav from "@/components/home/nav";
import Footer from "@/components/home/footer";
import homeStyles from "@/components/home/home.module.css";
import { BASE_PATH } from "@/lib/flags";
import type { SectorPageContent } from "@/lib/home/sectors/types";

import SectorHero from "./sector-hero";
import SectorSolutions from "./sector-solutions";
import SectorProof from "./sector-proof";
import ProofRail from "./proof-rail";
import SectorCapabilities from "./sector-capabilities";
import Closing from "./closing";

/**
 * One layout for all eight sector pages: hero, the sector's solutions on a
 * warm-white band, its proof, the shared figures rail, the capabilities it
 * leans on, and the closing panel. Everything that differs between sectors is
 * in the content object, so the pages cannot drift apart structurally.
 *
 * A plain function component, not a page: each route owns its own `metadata`
 * and JSON-LD and renders this.
 */

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath. */
const HOME_HREF = BASE_PATH || "/";

export default function SectorPage({ content }: { content: SectorPageContent }) {
  return (
    <div className={homeStyles.page}>
      {/* The homepage's own bar — same divisions, same mega panels, on every
          page of the surface. Its in-page anchors resolve back to the homepage
          off it (see `navHrefForPage`), and the Industries panel's own items
          now point at these very pages. */}
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <SectorHero content={content} />

        <div className={homeStyles.light}>
          <SectorSolutions content={content} />
        </div>

        <SectorProof content={content} />
        <ProofRail />

        <div className={homeStyles.light}>
          <SectorCapabilities content={content} />
        </div>

        <Closing
          content={{
            eyebrow: "Next step",
            title: content.closing.title,
            body: content.closing.body,
            primaryCta: { label: "Book a Free Consultation", href: "/contact" },
            secondaryCta: { label: "All industries", href: "/industries" },
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
