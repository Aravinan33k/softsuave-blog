import styles from "./coffee.module.css";

/** Sets of the phrase list in each half of the track — enough to over-fill a wide screen. */
const SETS_PER_HALF = 4;

/**
 * A slow, oversized line of phrases ("Global Expertise ✦ Personalized
 * Partnerships ✦ Shared Success ✦ …") running across the page between the
 * testimonials and the CEO's invitation — pure CSS, paused on hover and still
 * under `prefers-reduced-motion`. Decorative, so hidden from assistive tech.
 *
 * The track holds two identical halves, so the -50% loop lands seamlessly on
 * the second.
 */
export default function CoffeeMarquee({ phrases }: { phrases: readonly string[] }) {
  const half = Array.from({ length: SETS_PER_HALF }, () => phrases).flat();
  const items = [...half, ...half].map((phrase, i) => (
    <span key={i} className={styles.marqueeItem}>
      {phrase}
      <span className={styles.marqueeStar}>✦</span>
    </span>
  ));
  return (
    <div className={styles.marquee} aria-hidden>
      <div className={styles.marqueeTrack}>{items}</div>
    </div>
  );
}
