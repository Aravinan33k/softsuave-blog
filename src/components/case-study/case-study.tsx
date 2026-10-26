import Image from "next/image";
import { Check } from "lucide-react";
import Hero, { type HeroContent } from "@/components/landing/hero";
import WorkGrid, { type WorkCarouselContent } from "@/components/home/work-grid";
import Contact from "@/components/home/contact";
import CountUp from "@/components/home/count-up";
import CardIconBadge from "@/components/common/card-icon-badge";
import { linkify, type InlineLink } from "@/components/common/linkify";
import { SiteLink } from "@/themes/softsuave/site-link";
import badgeStyles from "@/components/common/card-icon-badge.module.css";
import { HIRE_CLOSING_BAND } from "@/lib/home/hire-blocks";
import type { IconKey } from "@/lib/home/icon-for";
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
 * pull quote, feature list, technology tiles, image, figures. A live case
 * study is these blocks in some mix, so a new one is a content module, not
 * new markup.
 */

export interface CaseStudyImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly blurDataURL?: string;
}

/**
 * A list item: plain text, or text led by a bold label — live's
 * "<b>Performance Optimization - </b>Improve system speed…" items.
 */
export type CaseStudyListItem = string | { readonly lead: string; readonly text: string };

export interface CaseStudySection {
  /** Anchor id — the live page's own (`section1`…), so its deep links still land. */
  readonly id: string;
  /**
   * Label in the contents list ("Key Feature"). Omitted for a section the live
   * page renders but leaves out of its contents list.
   */
  readonly nav?: string;
  /**
   * Kicker over the heading ("04 — Key Features"); set in capitals by CSS.
   * Omitted for the older case studies, whose sections carry a heading only.
   */
  readonly kicker?: string;
  /**
   * The heading. With `sub`, an empty title renders no heading — for a block
   * the live page sets under the previous one without a heading of its own.
   */
  readonly title: string;
  /**
   * A sub-section of the section before it: its title is an `h3` a step
   * down, with tighter spacing — for the older case studies' in-section
   * sub-headings ("Stash:-", "Loans:-"). Give it no `nav`.
   */
  readonly sub?: boolean;
  readonly body?: readonly string[];
  /**
   * Internal links the live page carries inside this section's paragraphs and
   * list items, matched on their own words (`common/linkify`).
   */
  readonly links?: readonly InlineLink[];
  /**
   * Titled cards. `plain` is a grid of text cards (the challenges); `icon`
   * leads each with the site's icon badge (the solution's modules).
   */
  readonly cards?: {
    readonly variant: "plain" | "icon";
    /**
     * A card without a `name` is its `body` alone, set a step larger — for the
     * older case studies' icon grids whose items are a bare sentence.
     */
    readonly items: readonly {
      readonly name?: string;
      readonly body: string;
      /** The `icon` badge's glyph, where the one read off the card's words is wrong. */
      readonly iconKey?: IconKey;
    }[];
  };
  readonly quote?: string;
  /** A two-column checklist (the key features). */
  readonly list?: readonly CaseStudyListItem[];
  /**
   * One column instead of two — for the older case studies' lists, whose
   * items are full sentences rather than short feature names.
   */
  readonly listSingle?: boolean;
  /**
   * A table: a header row, then the body rows (a short row leaves its last
   * cells empty) — for the older case studies' side-by-side option lists
   * ("Wallet Options" / "Send").
   */
  readonly table?: {
    readonly head: readonly string[];
    readonly rows: readonly (readonly string[])[];
  };
  /**
   * Logo tiles — the older case studies' "Technologies & Frameworks", and
   * their icon-and-label feature grids ("Salient Features of App").
   */
  readonly tech?: readonly {
    readonly name: string;
    readonly logo: { readonly src: string; readonly width: number; readonly height: number };
    /** The live tile's link, where it has one. */
    readonly href?: string;
    /** A label over the logo — live's stack layer ("Frontend", "Cloud"). */
    readonly group?: string;
  }[];
  /**
   * Set the tiles as wide icon-and-text cards (icon beside a left-aligned
   * line, two to a row) — for the older case studies' icon grids whose items
   * are full sentences, which the narrow logo tiles wrap into towers.
   */
  readonly techWide?: boolean;
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
            items={content.sections.flatMap((s) => (s.nav ? [{ id: s.id, label: s.nav }] : []))}
            downloadLabel={content.download.navLabel}
          />

          <article className={styles.article}>
            {content.sections.map((s) => {
              // Threaded through the section's paragraphs and list so a
              // phrase that recurs is linked once (see `linkify`).
              const used = new Set<string>();
              return (
                <section
                  key={s.id}
                  id={s.id}
                  className={s.sub ? `${styles.section} ${styles.sub}` : styles.section}
                  aria-labelledby={s.title ? `${s.id}-title` : undefined}
                >
                  {s.kicker && <span className={landing.kicker}>{s.kicker}</span>}
                  {s.sub ? (
                    s.title && (
                      <h3 id={`${s.id}-title`} className={styles.subTitle}>
                        {s.title}
                      </h3>
                    )
                  ) : (
                    <h2 id={`${s.id}-title`} className={`${landing.title} ${styles.sectionTitle}`}>
                      {s.title}
                    </h2>
                  )}

                  {s.body?.map((p) => (
                    <p key={p.slice(0, 32)} className={styles.para}>
                      {linkify(p, s.links, used, landing.proseLink)}
                    </p>
                  ))}

                  {s.cards && (
                    <ul
                      className={s.cards.variant === "icon" ? styles.iconCards : styles.plainCards}
                      role="list"
                    >
                      {s.cards.items.map((card) => (
                        <li key={card.name ?? card.body} className={`${landing.card} ${styles.card}`}>
                          {s.cards?.variant === "icon" && (
                            <CardIconBadge
                              title={card.name ?? card.body}
                              body={card.name ? card.body : undefined}
                              iconKey={card.iconKey}
                              size="sm"
                              className={badgeStyles.stack}
                            />
                          )}
                          {card.name ? (
                            <>
                              <h3 className={landing.cardName}>{card.name}</h3>
                              <p className={landing.cardBody}>{card.body}</p>
                            </>
                          ) : (
                            <p className={`${landing.cardBody} ${styles.cardLead}`}>{card.body}</p>
                          )}
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
                    <ul
                      className={`${styles.features}${s.listSingle ? ` ${styles.featuresSingle}` : ""}`}
                      role="list"
                    >
                      {s.list.map((item) => {
                        const text = typeof item === "string" ? item : item.text;
                        return (
                          <li key={typeof item === "string" ? item : item.lead} className={styles.feature}>
                            <Check className={styles.featureMark} strokeWidth={2.2} aria-hidden />
                            <span>
                              {typeof item !== "string" && <strong className={styles.featureLead}>{item.lead}</strong>}
                              {linkify(text, s.links, used, landing.proseLink)}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {s.table && <SectionTable table={s.table} />}

                  {s.tech && (
                    <ul className={s.techWide ? `${styles.tech} ${styles.techWide}` : styles.tech} role="list">
                      {s.tech.map((t) => {
                        const tile = (
                          <>
                            {t.group && <span className={styles.techGroup}>{t.group}</span>}
                            <Image
                              src={publicMediaUrl(t.logo.src)}
                              alt=""
                              width={t.logo.width}
                              height={t.logo.height}
                              unoptimized
                              className={styles.techLogo}
                            />
                            <span className={styles.techName}>{t.name}</span>
                          </>
                        );
                        return (
                          <li key={t.name} className={`${landing.card} ${styles.techTile}`}>
                            {t.href ? (
                              <SiteLink href={t.href} className={styles.techLink}>
                                {tile}
                              </SiteLink>
                            ) : (
                              tile
                            )}
                          </li>
                        );
                      })}
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
              );
            })}

            {/* The live page's closing download panel, set as the article's
                last section so it sits in the body column under section 6. */}
            <section
              id="case-study-download-panel"
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
                {/* Live's short-form case studies have the button alone. */}
                {content.download.body && <p className={styles.downloadBody}>{content.download.body}</p>}
                <DownloadButton
                  label={content.download.label}
                  className={`${home.pill} ${home.pillFilled} ${home.pillLg}`}
                />
              </div>
            </section>
          </article>
        </div>
      </div>

      {/* Related case studies — the homepage's case-study lane, on its band
          (the cards chosen by `relatedCaseStudies`). Skipped if a lane has no
          cards, rather than a heading over an empty carousel. */}
      {content.related.items.length > 0 && (
        <div className={`${home.light} ${styles.related}`}>
          <WorkGrid content={content.related} id="related" countLabel="case studies" />
        </div>
      )}

      {/* "Book Free Consultation" — the live page's closing section, which every
          page here renders as the site's closing band. */}
      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />

      <DownloadDialog content={content.download} />
    </>
  );
}

/** A section's `table`: the header row, then each body row padded to its width. */
function SectionTable({ table }: { table: NonNullable<CaseStudySection["table"]> }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {table.head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r}>
              {table.head.map((h, c) => (
                <td key={h}>{row[c] ?? ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
