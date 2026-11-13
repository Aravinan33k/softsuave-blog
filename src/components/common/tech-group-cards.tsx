import Image from "next/image";
import TechLogo from "@/components/home/tech-logo";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/generative-ai/section-head";
import { linkify, type InlineLink } from "@/components/common/linkify";
import { publicMediaUrl } from "@/lib/media-url";
import { SiteLink } from "@/themes/softsuave/site-link";
import gen from "@/components/generative-ai/gen-ai.module.css";
import styles from "./tech-group-cards.module.css";

/** One technology chip: its logo, its name, and where it links (if anywhere). */
export interface TechGroupItem {
  readonly name: string;
  /** Destination page, where the source page links the technology. */
  readonly href?: string;
  /**
   * The shared `TechLogo` mark to draw, when it differs from `name` ("iOS"
   * drawn with the Apple mark). Ignored when `logo` is set.
   */
  readonly mark?: string;
  /** A hand-placed logo file, for a technology `TechLogo` has no mark for. */
  readonly logo?: { readonly src: string };
  /** The logo's accessible name — the source page's alt text, kept verbatim. */
  readonly alt?: string;
}

export interface TechGroup {
  /** The group's name — an H3. */
  readonly name: string;
  readonly body: string;
  /** Optional illustration at the top of the card. */
  readonly icon?: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
  /** Optional checklist under the body (the services a group covers). */
  readonly points?: readonly string[];
  readonly items: readonly TechGroupItem[];
}

export interface TechGroupCardsContent {
  /** Kicker above the heading. Empty or omitted renders none. */
  eyebrow?: string;
  title: string;
  body?: string;
  /** Phrases in the groups' bodies to link — see `common/linkify`. */
  links?: readonly InlineLink[];
  groups: readonly TechGroup[];
}

/**
 * Technology groups as cards: each group's name, a paragraph, an optional
 * checklist, and a row of technology chips — logo and name, linked where the
 * source page links them. For a section whose groups carry prose *and* named
 * technologies (the Poland page's "developers' expertise" and "technologies"
 * bands), which neither the card grid (no nested items) nor the tech stack
 * cluster (no prose per group) holds.
 *
 * `itemHeading` sets each chip's name as an H4, for a source page whose
 * technology names are headings in its outline; otherwise they are plain
 * text. Logos come from the shared `TechLogo` set where it has a mark, else
 * from a hand-placed file; either way an `alt` is kept as the mark's
 * accessible name.
 *
 * A server component: the marks are inline SVG drawn on the server, so none
 * of `TechLogo` ships as JavaScript.
 */
export default function TechGroupCards({
  content,
  id,
  itemHeading,
  columns = 2,
}: {
  content: TechGroupCardsContent;
  id: string;
  itemHeading?: "h4";
  /** Cards across from 1000px: 2 or 3. */
  columns?: 2 | 3;
}) {
  const usedLinks = new Set<string>();
  const Name = itemHeading ?? "span";

  return (
    <section className={gen.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow || undefined} title={content.title} intro={content.body} />

      <FadeUp>
        <div className={styles.grid} data-cols={columns}>
          {content.groups.map((group) => (
            <article key={group.name} className={styles.card}>
              {group.icon ? (
                <span className={styles.icon}>
                  <Image
                    src={publicMediaUrl(group.icon.src)}
                    alt={group.icon.alt}
                    width={group.icon.width}
                    height={group.icon.height}
                    sizes="56px"
                  />
                </span>
              ) : null}
              <h3 className={styles.name}>{group.name}</h3>
              <span className={styles.rule} aria-hidden />
              <p className={styles.body}>{linkify(group.body, content.links, usedLinks, gen.proseLink)}</p>

              {group.points && group.points.length > 0 ? (
                <ul className={styles.points}>
                  {group.points.map((point) => (
                    <li key={point} className={styles.point}>
                      <svg
                        className={styles.pointMark}
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M4 10.6l4 3.8 8-8.8" />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <ul className={styles.chips}>
                {group.items.map((item) => {
                  const mark = item.logo ? (
                    <span className={styles.chipLogo}>
                      <Image
                        src={publicMediaUrl(item.logo.src)}
                        alt={item.alt ?? ""}
                        width={22}
                        height={22}
                        className="object-contain"
                      />
                    </span>
                  ) : item.alt ? (
                    <span className={styles.chipLogo} role="img" aria-label={item.alt}>
                      <TechLogo name={item.mark ?? item.name} />
                    </span>
                  ) : (
                    <span className={styles.chipLogo} aria-hidden>
                      <TechLogo name={item.mark ?? item.name} />
                    </span>
                  );
                  const inner = (
                    <>
                      {mark}
                      <Name className={styles.chipName}>{item.name}</Name>
                    </>
                  );
                  return (
                    <li key={item.name}>
                      {item.href ? (
                        <SiteLink href={item.href} className={`${styles.chip} ${styles.chipLink}`}>
                          {inner}
                        </SiteLink>
                      ) : (
                        <span className={styles.chip}>{inner}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
