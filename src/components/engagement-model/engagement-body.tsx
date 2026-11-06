import Image from 'next/image';
import { SiteLink } from '@/themes/softsuave/site-link';
import SectionHead from '@/components/generative-ai/section-head';
import CardIconBadge from '@/components/common/card-icon-badge';
import FadeUp from '@/components/home/fade-up';
import stackStyles from '@/components/landing/landing.module.css';
import {
  engagementGroups,
  engagementModelPerks,
  engagementTech,
  type EngagementBlock,
} from '@/lib/home/engagement-model-content';
import { gridSpansFor } from '@/components/landing/card-spans';
import gen from '@/components/generative-ai/gen-ai.module.css';
import styles from './engagement-model.module.css';
import ModelTabs from './model-tabs';

/** A heading with the live page's coloured words picked out. */
function Title({ text, accent }: { text: string; accent: string }) {
  const i = text.indexOf(accent);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className={styles.accent}>{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}

type Piece = string | { readonly text: string; readonly href: string };

function Body({ pieces }: { pieces: readonly Piece[] }) {
  return (
    <p className={styles.p}>
      <BodyText pieces={pieces} />
    </p>
  );
}

function BodyText({ pieces }: { pieces: readonly Piece[] }) {
  return pieces.map((piece, i) =>
    typeof piece === 'string' ? (
      <span key={i}>{piece}</span>
    ) : (
      <SiteLink key={i} href={piece.href}>
        {piece.text}
      </SiteLink>
    ),
  );
}

function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.chips}>
      {items.map((c) => (
        <li key={c} className={styles.chip}>
          {c}
        </li>
      ))}
    </ul>
  );
}

function Block({ block, level }: { block: EngagementBlock; level: 'h2' | 'h3' }) {
  const Tag = level;
  return (
    <FadeUp>
      <Tag className={level === 'h2' ? styles.h2 : styles.h3}>
        <Title text={block.title} accent={block.accent} />
      </Tag>
      <Body pieces={block.body} />
      {block.chips ? <Chips items={block.chips} /> : null}
    </FadeUp>
  );
}

/** Perks of hiring, the three engagement models, and the technologies band. */
export function Perks() {
  const [beforeHiring, afterHiring] = engagementModelPerks.title.split('Hiring');
  return (
    <section className={styles.band} id="perks">
      <div className={styles.wrap}>
        <FadeUp className={styles.perksHead}>
          <h2 className={styles.h2}>
            {beforeHiring}<span className={styles.accent}>Hiring</span>{afterHiring}
          </h2>
          <p className={styles.p}>{engagementModelPerks.body}</p>
        </FadeUp>

        <ModelTabs sections={engagementModelPerks.tabs} />

        {engagementGroups.map((g, gi) => {
          const splitIntro = g.blocks.length > 1 ? g.blocks[0] : undefined;
          const detailBlocks = splitIntro ? g.blocks.slice(1) : g.blocks;

          return (
            <div key={g.id} id={g.id} className={styles.modelGroup}>
              {splitIntro && (
                <FadeUp>
                  <SectionHead title={<Title text={splitIntro.title} accent={splitIntro.accent} />} intro={<BodyText pieces={splitIntro.body} />} />
                </FadeUp>
              )}
              <div className={`${styles.group} ${gi % 2 === 1 ? styles.groupFlip : ''}`}>
                <FadeUp className={styles.media}>
                  <Image
                    src={g.image.src}
                    alt={g.image.alt}
                    width={g.image.width}
                    height={g.image.height}
                    sizes="(max-width: 1000px) 100vw, 560px"
                  />
                </FadeUp>
                <div className={styles.copy}>
                  {splitIntro?.chips && <FadeUp><Chips items={splitIntro.chips} /></FadeUp>}
                  {detailBlocks.map((b) => (
                    <Block key={b.title} block={b} level="h2" />
                  ))}
                </div>
              </div>
              {g.cards ? (
              /* The hire pages' "bold" card grid (accent rule on top, icon badge, name, copy), drawn with its own classes. */
              <div className={`${gen.indGridBold} ${styles.boldGrid}`}>
                {g.cards.map((c, ci) => (
                  <article key={c.title} className={gen.indBoldCard} data-span={gridSpansFor(g.cards!.length)[ci]}>
                    <span className={gen.indBoldIcon} data-brand="true" aria-hidden>
                      <Image src={c.icon} alt="" width={131} height={112} unoptimized style={{ height: 30, width: 'auto' }} />
                    </span>
                    <h3 className={gen.indBoldName}>{c.title}</h3>
                    <p className={gen.indBoldBody}>
                      {c.body.map((piece, i) =>
                        typeof piece === 'string' ? (
                          <span key={i}>{piece}</span>
                        ) : (
                          <SiteLink key={i} href={piece.href}>
                            {piece.text}
                          </SiteLink>
                        ),
                      )}
                    </p>
                    <Chips items={c.chips} />
                  </article>
                ))}
              </div>
            ) : null}
            {g.afterCards?.map((b) => (
                <div key={b.title} className={styles.cardWide}>
                  <Block block={b} level="h2" />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function TechBand() {
  return (
    <section className={styles.band} id="technologies">
      <div className={styles.wrap}>
        <FadeUp>
          <SectionHead kicker="Technology Stack" title={<Title text={engagementTech.title} accent={engagementTech.accent} />} intro={engagementTech.body} />
        </FadeUp>
        <div className={styles.techGrid}>
          {engagementTech.groups.map((g) => (
            <FadeUp key={g.title} className={stackStyles.stackGroup}>
              <div className={stackStyles.stackGroupHead}>
                <CardIconBadge title={g.title} size="sm" className={stackStyles.stackGroupIndex} />
                <h3 className={stackStyles.stackGroupName}>{g.title}</h3>
              </div>
              <p className={`${styles.p} ${styles.techDescription}`}>{g.body}</p>
              <ul className={`${stackStyles.stackItems} ${styles.techItems}`}>
                {g.logos.map((l) => (
                  <li key={l.src} className={`${stackStyles.stackItem}${'href' in l && l.href ? ` ${styles.techLinkedItem}` : ''}`}>
                    {'href' in l && l.href ? (
                      <SiteLink href={l.href} className={styles.techLink}>
                        <span className={stackStyles.stackItemLogo}>
                          <Image src={l.src} alt={l.alt} width={28} height={28} unoptimized className={styles.techMark} />
                        </span>
                        <span className={stackStyles.stackItemName}>{l.name}</span>
                      </SiteLink>
                    ) : (
                      <>
                        <span className={stackStyles.stackItemLogo}>
                          <Image src={l.src} alt={l.alt} width={28} height={28} unoptimized className={styles.techMark} />
                        </span>
                        <span className={stackStyles.stackItemName}>{l.name}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
