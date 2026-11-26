import Image from "next/image";
import { ArrowRight, Code, Globe, House, Layers, Settings, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/landing/section-head";
import landing from "@/components/landing/landing.module.css";
import { publicMediaUrl } from "@/lib/media-url";
import styles from "./ad.module.css";

const ICONS = {
  code: Code,
  shield: ShieldCheck,
  users: Users,
  house: House,
  layers: Layers,
  settings: Settings,
  globe: Globe,
} satisfies Record<string, LucideIcon>;

export interface PracticeShowcaseContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly items: readonly {
    readonly name: string;
    readonly body: string;
    readonly icon: keyof typeof ICONS;
    /** Root-relative photo, darkened and faded in behind the card's right side. */
    readonly image: string;
  }[];
  /** "Learn More" under every card. */
  readonly more: { readonly label: string; readonly href: string };
  /** The closing card in the grid's last slot. */
  readonly closer: {
    readonly eyebrow: string;
    readonly lines: readonly [string, string];
    readonly body: string;
    readonly cta: { readonly label: string; readonly href: string; readonly external?: boolean };
  };
}

/**
 * "Code & Practice" as photo-backed cards (review, from a reference): each card
 * an icon tile with a coral glow, the name, its line and a "Learn More" link,
 * over a dark photo that fades in from the right. The grid closes on a CTA
 * card — an eyebrow, a two-line headline (the second line in the accent), a
 * line and a button, over a drawn coral wave.
 *
 * Four across from 1200px (seven cards and the closer make two even rows), two
 * from 640px, one below. /ad/remote-developers only.
 */
export default function PracticeShowcase({ content, id = "practice" }: { content: PracticeShowcaseContent; id?: string }) {
  const { closer } = content;
  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div className={styles.showGrid}>
        {content.items.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <FadeUp key={item.name} delay={(i % 4) * 0.06}>
              <article className={styles.showCard}>
                <div className={styles.showMedia} aria-hidden>
                  <Image
                    src={publicMediaUrl(item.image)}
                    alt=""
                    fill
                    sizes="(min-width: 1200px) 18vw, (min-width: 640px) 35vw, 70vw"
                    className={styles.showImg}
                  />
                </div>
                <span className={styles.showIcon} aria-hidden>
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className={styles.showName}>{item.name}</h3>
                <p className={styles.showBody}>{item.body}</p>
                <a className={styles.showMore} href={content.more.href}>
                  {content.more.label}
                  <span className={landing.srOnly}> about {item.name}</span>
                  <ArrowRight size={16} strokeWidth={2} aria-hidden />
                </a>
              </article>
            </FadeUp>
          );
        })}

        <FadeUp delay={0.18}>
          <article className={`${styles.showCard} ${styles.showCloser}`}>
            <svg className={styles.showWave} viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden>
              {Array.from({ length: 14 }, (_, n) => (
                <path
                  key={n}
                  d={`M ${20 + n * 6} 200 C ${60 + n * 5} ${150 - n * 4}, ${120 + n * 3} ${170 - n * 9}, 200 ${40 + n * 7}`}
                />
              ))}
            </svg>
            <span className={styles.showCloserEyebrow}>{closer.eyebrow}</span>
            <p className={styles.showCloserTitle}>
              {closer.lines[0]}
              <br />
              <span>{closer.lines[1]}</span>
            </p>
            <p className={styles.showCloserBody}>{closer.body}</p>
            <a
              className={`${landing.btn} ${landing.btnPrimary} ${styles.showCloserBtn}`}
              href={closer.cta.href}
              {...(closer.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {closer.cta.label}
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </a>
          </article>
        </FadeUp>
      </div>
    </section>
  );
}
