import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "@/components/landing/section-head";
import Marquee from "@/components/home/marquee";
import landing from "@/components/landing/landing.module.css";
import styles from "./ad.module.css";

export interface AppScreensContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly screens: readonly { readonly src: string; readonly alt: string; readonly width: number; readonly height: number }[];
  readonly cta: { readonly label: string; readonly href: string };
}

/**
 * The live "Proven App Screens" carousel: phone screens running in a loop, each
 * with its own "Get Your App" button. The loop holds still under the pointer.
 */
export default function AppScreens({ content, id = "screens" }: { content: AppScreensContent; id?: string }) {
  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <div className={styles.screens}>
        <Marquee speed={14} separator={<span />} fill>
          {content.screens.map((s) => (
            <span key={s.src} className={styles.screen}>
              <Image
                src={publicMediaUrl(s.src)}
                alt={s.alt}
                width={s.width}
                height={s.height}
                unoptimized
                className={styles.screenImg}
              />
              <a className={`${landing.btn} ${landing.btnPrimary} ${styles.screenCta}`} href={content.cta.href}>
                {content.cta.label}
              </a>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
