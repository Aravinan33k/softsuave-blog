"use client";

import { useRef, useState, type ReactNode } from "react";
import FadeUp from "../fade-up";
import ReviewImage from "./review-image";
import { pad, splitRole, useIsClamped, VerifiedMark } from "./review-shared";
import type { NumberedReview } from "./review-shared";
import styles from "../home.module.css";

/**
 * The two independent dimensions of a story's layout, so the run never settles
 * into a pattern:
 *
 *   side   which side the photograph sits on. The archive ALTERNATES this every
 *          story — the zig-zag — so no two consecutive rows match.
 *   frame  the photograph's proportion and size, cycled separately: tall,
 *          square, wide.
 *
 * Because the two cycle at different lengths (2 and 3), a run of six stories
 * gets six distinct combinations before anything repeats.
 */
export type StorySide = "left" | "right";
export type StoryFrame = "tall" | "square" | "wide";

/** Per-frame image geometry. Kept here rather than in CSS because the ratio and
 *  the `sizes` hint have to agree with the px caps in `home.module.css` — a
 *  wrong `sizes` costs a source the browser then never uses. */
const FRAME: Record<StoryFrame, { ratio: string; sizes: string }> = {
  tall: { ratio: "4 / 5", sizes: "(min-width: 1000px) 240px, 90vw" },
  square: { ratio: "1 / 1", sizes: "(min-width: 1000px) 225px, 90vw" },
  wide: { ratio: "16 / 10", sizes: "(min-width: 1000px) 340px, 90vw" },
};

/**
 * One client story in the archive — a self-contained editorial unit, not a
 * card: no panel, no shadow, no border box. What holds it together is the mono
 * ordinal in its kicker, a hairline at its foot, and the relationship between
 * the photograph and the text beside it.
 *
 * The quote clamps to a few lines so the run of stories keeps an even rhythm,
 * with an inline expander where clamping actually hides something. There is no
 * per-review route in the app, so expanding in place is the whole of "read the
 * full story" — nothing links out to a detail page that does not exist.
 *
 * A review that carries `videoUrl` — the link softsuave.com's own testimonial
 * puts on the client's portrait — is the one exception. Its photograph plays
 * the video in place (`ReviewVideo`), and the action row carries a named link
 * out to YouTube beside the expander: the frame's own control is discoverable
 * only by looking at the picture, and it is not the fallback when the embed
 * can't run.
 */
export default function ReviewStory({
  review,
  side,
  frame: frameName,
  expandable = true,
  reveal = true,
}: {
  review: NumberedReview;
  side: StorySide;
  frame: StoryFrame;
  /** Whether the quote clamps behind an inline expander. The story that OPENS
   *  the archive sets the reading rhythm for every story under it, so it runs
   *  its quote in full — it should never be the one card that greets you
   *  truncated with a control beneath it. */
  expandable?: boolean;
  /** Whether the story fades itself in on scroll. A caller that shows one story
   *  at a time in a fixed slot owns that motion itself — two reveal tweens on
   *  one story would stack — so it turns this off. */
  reveal?: boolean;
}) {
  const quoteRef = useRef<HTMLParagraphElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  /** The quote is open either because the reader opened it or because this
   *  story never clamps in the first place. */
  const open = !expandable || expanded;
  // Nothing to measure while the clamp is off, so passing `open` here keeps a
  // non-expandable story from ever reporting itself clamped.
  const clamped = useIsClamped(quoteRef, open);
  /** The expander earns its place only where the clamp is actually hiding
   *  something — or where it already opened one. */
  const showMore = expandable && (clamped || expanded);
  const { designation, company } = splitRole(review.role);
  const frame = FRAME[frameName];

  /* The wrapper exists so a reveal tween owns an element of its own — the
     story under it carries the tilts and hover transforms. With `reveal` off it
     is the same element, only static. */
  const Wrap = reveal ? FadeUp : StaticWrap;

  return (
    <Wrap className={styles.rStoryWrap} y={40} start="top 86%">
      <article
        className={styles.rStory}
        data-side={side}
        data-frame={frameName}
        data-story-ordinal={review.ordinal}
      >
        <ReviewImage
          review={review}
          sizes={frame.sizes}
          ratio={frame.ratio}
          overlay={review.category}
          href={review.videoUrl}
          className={styles.rStoryImage}
        />

        <div className={styles.rStoryBody}>
          <span className={styles.rStoryKicker}>Client story {pad(review.ordinal)}</span>

          <h3 className={styles.rStoryName}>
            {review.name}
            <VerifiedMark className={styles.rStoryVerified} />
          </h3>

          <blockquote className={styles.rStoryQuoteWrap}>
            <p
              ref={quoteRef}
              className={styles.rStoryQuote}
              data-expanded={open || undefined}
            >
              &ldquo;{review.quote}&rdquo;
            </p>
          </blockquote>

          {showMore || review.videoUrl ? (
            <div className={styles.rStoryActions}>
              {showMore ? (
                <button
                  type="button"
                  className={styles.rStoryMore}
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  data-cursor={expanded ? "Close" : "Read"}
                >
                  {expanded ? "Close story" : "Read full story"}
                </button>
              ) : null}

              {/* The photograph plays the review in place; this is the way OUT
                  to the source — full screen, captions, the channel. It is also
                  the fallback wherever the embed can't run, which is why the
                  destination is named in words rather than left to a badge. */}
              {review.videoUrl ? (
                <a
                  className={styles.rStoryWatch}
                  href={review.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Watch"
                >
                  Watch on YouTube
                  <svg
                    className={styles.rStoryWatchArrow}
                    viewBox="0 0 16 16"
                    aria-hidden
                    focusable="false"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 11.5l7-7m0 0h-5m5 0v5"
                    />
                  </svg>
                </a>
              ) : null}
            </div>
          ) : null}

          <footer className={styles.rStoryFoot}>
            {designation || company ? (
              <span className={styles.rStoryRole}>
                {[designation, company].filter(Boolean).join(" · ")}
              </span>
            ) : (
              /* Two of the reviews state neither a title nor a company at
                 source. Rather than invent one, the foot says what it is. */
              <span className={styles.rStoryRole}>Client review</span>
            )}
            {review.category ? (
              <span className={styles.rStoryTag}>{review.category}</span>
            ) : null}
          </footer>
        </div>
      </article>
    </Wrap>
  );
}

/** `FadeUp`'s shape without the tween, so the two are interchangeable above. */
function StaticWrap({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  start?: string;
}) {
  return <div className={className}>{children}</div>;
}
