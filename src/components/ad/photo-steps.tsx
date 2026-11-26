import Image from "next/image";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/landing/section-head";
import type { ProcessContent } from "@/components/landing/process";
import landing from "@/components/landing/landing.module.css";
import { publicMediaUrl } from "@/lib/media-url";
import styles from "./ad.module.css";

/**
 * The hiring steps as photo cards: each step a rounded photo with its stage
 * ("Define", "Select" …) and number as glass chips on it, then the step's
 * name and line under the photo. Four across from 1100px, two from 640px,
 * one below. A thin connector runs behind the chips on desktop so the four
 * read as one sequence.
 *
 * /ad/remote-developers only (review: "make the page creative, add image
 * visuals"); the shared `Process` stays icon-led everywhere else. Steps
 * without an `image` get a plain surface where the photo would be.
 */
export default function PhotoSteps({ content, id = "journey" }: { content: ProcessContent; id?: string }) {
  return (
    <section className={styles.shell} id={id}>
      {content.title && <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />}

      <div className={styles.photoSteps}>
        {content.steps.map((step, i) => (
          <FadeUp key={step.name} delay={i * 0.08}>
            <article className={styles.photoStep}>
              <div className={styles.photoStepMedia}>
                {step.image && (
                  <Image
                    src={publicMediaUrl(step.image.src)}
                    alt={step.image.alt}
                    fill
                    sizes="(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={styles.photoStepImg}
                  />
                )}
                <span className={styles.photoStepStage}>{step.n}</span>
                <span className={styles.photoStepNum} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className={styles.photoStepName}>{step.name}</h3>
              <p className={styles.photoStepBody}>{step.body}</p>
            </article>
          </FadeUp>
        ))}
      </div>

      {content.cta && (
        <div className={styles.cta}>
          <a className={`${landing.btn} ${landing.btnPrimary} ${landing.btnLg}`} href={content.cta.href}>
            {content.cta.label}
          </a>
        </div>
      )}
    </section>
  );
}
