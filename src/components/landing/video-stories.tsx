import Image from "next/image";
import FadeUp from "@/components/home/fade-up";
import type { VideoStoryGroup } from "@/lib/home/success-stories-content";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

/**
 * A titled grid of video cards — thumbnail, play badge, headline — each card
 * one link to the story on YouTube. Built for /success-stories, whose live
 * page is two such grids.
 *
 * The card is the case-study index card (`.caseCard` + `.caseMedia`) so a
 * story reads like a study wherever the two meet; only the 16:9 frame and the
 * play badge are its own. The video opens in a new tab rather than embedding:
 * an iframe per card is ten third-party players on one page, and the CSP does
 * not frame YouTube.
 */
export default function VideoStories({ group }: { group: VideoStoryGroup }) {
  return (
    <section className={styles.videoStories} id={group.id}>
      <SectionHead title={group.title} intro={group.intro} />

      <FadeUp>
        <div className={styles.caseGrid}>
          {group.items.map((story) => (
            <a
              key={story.key}
              href={story.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.caseCard} ${styles.caseCardRich} ${styles.videoCard}`}
            >
              <span className={`${styles.caseMedia} ${styles.videoMedia}`}>
                <Image
                  src={story.image.src}
                  alt={story.image.alt}
                  width={story.image.width}
                  height={story.image.height}
                  sizes="(min-width: 1000px) 30vw, (min-width: 700px) 45vw, 92vw"
                  className={styles.caseMediaImg}
                />
                <span className={styles.videoPlay} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M8 5.5v13l11-6.5z" />
                  </svg>
                </span>
              </span>
              <h3 className={`${styles.caseTitle} ${styles.videoTitle}`}>
                {story.title}
                <span className={styles.srOnly}> (opens YouTube in a new tab)</span>
              </h3>
            </a>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
