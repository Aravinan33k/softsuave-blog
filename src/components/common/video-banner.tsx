import { publicMediaUrl } from "@/lib/media-url";
import styles from "./video-banner.module.css";

/**
 * A masthead over a looping background video: one centred H1, as the live AI / ML Solutions page opens.
 * The video is muted, plays inline and loops; it is hidden for visitors who ask for reduced motion, which
 * leaves the dark ground and the heading.
 */
export default function VideoBanner({
  title,
  accent,
  video,
}: {
  title: string;
  /** The words of `title` set in the accent colour. */
  accent?: string;
  /** Root-relative under /public. */
  video: { readonly webm: string };
}) {
  return (
    <section className={styles.banner} id="top">
      <video className={styles.video} autoPlay muted loop playsInline preload="metadata" aria-hidden>
        <source src={publicMediaUrl(video.webm)} type="video/webm" />
      </video>
      <div className={styles.veil} aria-hidden />
      <div className={styles.glow} aria-hidden />
      <h1 className={styles.title}>
        {accent && title.includes(accent) ? (
          <>
            {title.slice(0, title.indexOf(accent))}
            <span className={styles.accent}>{accent}</span>
            {title.slice(title.indexOf(accent) + accent.length)}
          </>
        ) : (
          title
        )}
      </h1>
    </section>
  );
}
