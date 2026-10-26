import Image from "next/image";
import { Check } from "lucide-react";
import Hero, { type HeroContent } from "@/components/landing/hero";
import WorkGrid, { type WorkCarouselContent } from "@/components/home/work-grid";
import Contact from "@/components/home/contact";
import CountUp from "@/components/home/count-up";
import CardIconBadge from "@/components/common/card-icon-badge";
import badgeStyles from "@/components/common/card-icon-badge.module.css";
import { HIRE_CLOSING_BAND } from "@/lib/home/hire-blocks";
import { publicMediaUrl } from "@/lib/media-url";
import CaseStudyToc from "./case-study-toc";
import { DownloadButton, DownloadDialog, type CaseStudyDownloadContent } from "./case-study-download";
import home from "@/components/home/home.module.css";
import landing from "@/components/landing/landing.module.css";
import styles from "./case-study.module.css";

/**
 * The case-study page template — softsuave.com's `/case-study-*` pages
 * (hero, a contents column beside six numbered sections and a closing
 * download panel, related case studies and the consultation band), set in this site's own
 * surface. The copy is the live page's; the look is the landing pages'.
 *
 * A SERVER component: the article is static markup, so it ships no script of
 * its own. The interactive parts are small client islands — the contents
 * list's current-section mark, the download dialog, the count-up figures —
 * plus the shared hero, related-work lane and closing band.
 *
 * Each section's optional parts render in a fixed order: paragraphs, cards,
 * pull quote, feature list, image, figures. A live case study is these blocks
 * in some mix, so a new one is a content module, not new markup.
 */

export interface CaseStudyImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly blurDataURL?: string;
}

export interface CaseStudySection {
  /** Anchor id — the live page's own (`section1`…), so its deep links still land. */
  readonly id: string;
  /** Label in the contents list ("Key Feature"). */
  readonly nav: string;
  /** Kicker over the heading ("04 — Key Features"); set in capitals by CSS. */
  readonly kicker: string;
  readonly title: string;
  readonly body?: readonly string[];
  /**
   * Titled cards. `plain` is a grid of text cards (the challenges); `icon`
   * leads each with the site's icon badge (the solution's modules).
   */
  readonly cards?: {
    readonly variant: "plain" | "icon";
    readonly items: readonly { readonly name: string; readonly body: string }[];
  };
  readonly quote?: string;
  /** A two-column checklist (the key features). */
  readonly list?: readonly string[];
  readonly image?: CaseStudyImage;
  /** Headline figures; a leading number counts up ("90%"). */
  readonly stats?: readonly { readonly value: string; readonly label: string }[];
}

export interface CaseStudyContent {
  readonly hero: HeroContent;
  /** Heading of the contents list ("Case Study"). */
  readonly tocTitle: string;
  readonly sections: readonly CaseStudySection[];
  readonly download: CaseStudyDownloadContent;
  readonly related: WorkCarouselContent;
}

export default function CaseStudy({ content, idPrefix }: { content: CaseStudyContent; idPrefix: string }) {
  return (
    <>
      <Hero content={content.hero} idPrefix={idPrefix} />

      {/* The article: contents column + sections, on the warm-white band the
          way the live page sets its body on white. */}
      <div className={home.light}>
        <div className={`${landing.sectionShell} ${styles.layout}`}>
          <CaseStudyToc
            title={content.tocTitle}
            items={content.sections.map((s) => ({ id: s.id, label: s.nav }))}
            downloadLabel={content.download.navLabel}
          />

          <article className={styles.article}>
            {content.sections.map((s) => (
              <section key={s.id} id={s.id} className={styles.section} aria-labelledby={`${s.id}-title`}>
                <span className={landing.kicker}>{s.kicker}</span>
                <h2 id={`${s.id}-title`} className={`${landing.title} ${styles.sectionTitle}`}>
                  {s.title}
                </h2>

                {s.body?.map((p) => (
                  <p key={p.slice(0, 32)} className={styles.para}>
                    {p}
                  </p>
                ))}

                {s.cards && (
                  <ul
                    className={s.cards.variant === "icon" ? styles.iconCards : styles.plainCards}
                    role="list"
                  >
                    {s.cards.items.map((card) => (
                      <li key={card.name} className={`${landing.card} ${styles.card}`}>
                        {s.cards?.variant === "icon" && (
                          <CardIconBadge
                            title={card.name}
                            body={card.body}
                            size="sm"
                            className={badgeStyles.stack}
                          />
                        )}
                        <h3 className={landing.cardName}>{card.name}</h3>
                        <p className={landing.cardBody}>{card.body}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {s.quote && (
                  <blockquote className={styles.quote}>
                    <p>{s.quote}</p>
                  </blockquote>
                )}

                {s.list && (
                  <ul className={styles.features} role="list">
                    {s.list.map((item) => (
                      <li key={item} className={styles.feature}>
                        <Check className={styles.featureMark} strokeWidth={2.2} aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {s.image && (
                  <figure className={styles.figure}>
                    <Image
                      src={publicMediaUrl(s.image.src)}
                      alt={s.image.alt}
                      width={s.image.width}
                      height={s.image.height}
                      sizes="(max-width: 999px) 92vw, 62vw"
                      className={styles.figureImg}
                      {...(s.image.blurDataURL
                        ? { placeholder: "blur" as const, blurDataURL: s.image.blurDataURL }
                        : {})}
                    />
                  </figure>
                )}

                {s.stats && (
                  <ul className={styles.stats} role="list">
                    {s.stats.map((stat) => (
                      <li key={stat.value + stat.label} className={styles.stat}>
                        <CountUp value={stat.value} className={styles.statFigure} />
                        <span className={styles.statLabel}>{stat.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* The live page's closing download panel, set as the article's
                last section so it sits in the body column under section 6. */}
            <section
              id="section7"
              className={`${styles.section} ${styles.downloadBand}`}
              aria-label={content.download.label}
            >
              {/* The /hire-forward-deployed-engineer closing banner's dress
                  (`components/fde/sections/CtaBanner.tsx`): a CSS ember wash
                  as the fallback, its artwork over that, a scrim over both. */}
              <div className={styles.downloadPanel}>
                <Image
                  src={publicMediaUrl("/images/fde/cta-background-one.webp")}
                  alt=""
                  fill
                  sizes="(max-width: 999px) 92vw, 62vw"
                  className={styles.downloadArt}
                />
                <p className={styles.downloadBody}>{content.download.body}</p>
                <DownloadButton
                  label={content.download.label}
                  className={`${home.pill} ${home.pillFilled} ${home.pillLg}`}
                />
              </div>
            </section>
          </article>
        </div>
      </div>

      {/* Related case studies — the homepage's case-study lane, on its band. */}
      <div className={`${home.light} ${styles.related}`}>
        <WorkGrid content={content.related} id="related" countLabel="case studies" />
      </div>

      {/* "Book Free Consultation" — the live page's closing section, which every
          page here renders as the site's closing band. */}
      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />

      <DownloadDialog content={content.download} />
    </>
  );
}
