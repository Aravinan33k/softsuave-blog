"use client";

import Image from "next/image";
import type { Testimonial } from "@/lib/home/content";
import { publicMediaUrl } from "@/lib/media-url";
import BrandImage from "../brand-image";
import ReviewVideo from "./review-video";
import { initials } from "./review-shared";
import styles from "../home.module.css";

/**
 * The one image slot the whole archive uses — featured story, archive story,
 * mobile stack. It owns the three-source fallback and the hover treatment, so
 * no caller repeats either.
 *
 * The three sources exist in this order, and the order matters: the client's
 * real bundled `photo`, else a generated Pexels `avatarId` slot, else a
 * typographic monogram. `photo` goes through plain `next/image` rather than
 * `BrandImage` because these are our own assets in /public, not entries in the
 * generated Pexels manifest that `BrandImage` reads.
 *
 * `ratio` and `className` are how the composition varies the frame: portrait
 * for the featured plate, squarer for the archive stories, so no two images on
 * the page are the same size. Everything else — the crop, the hover scale, the
 * metadata veil — is constant, which is what keeps the collage from reading as
 * a set of unrelated pictures.
 */
export default function ReviewImage({
  review,
  sizes,
  ratio,
  priority = false,
  className,
  /** Wide-tracked label revealed over the image on hover. Usually the category. */
  overlay,
  /**
   * The review's source on softsuave.com — `review.videoUrl`, passed in by the
   * story rather than read here so this stays a pure image slot.
   *
   * The frame becomes a link to it. Where the review ALSO names a `videoFile`
   * we host, the frame becomes an in-place player instead and this is only the
   * credit behind it. Either way the portrait itself is the control, which is
   * how softsuave.com presents these: the picture IS the anchor.
   */
  href,
}: {
  review: Testimonial;
  sizes: string;
  ratio: string;
  priority?: boolean;
  className?: string;
  overlay?: string;
  href?: string;
}) {
  return (
    <figure
      className={`${styles.rImage} ${className ?? ""}`}
      style={{ aspectRatio: ratio }}
      data-cursor={href ? "Watch" : overlay ?? "Story"}
      data-linked={href ? "" : undefined}
    >
      {review.photo ? (
        <Image
          src={publicMediaUrl(review.photo)}
          alt={review.name}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.rImageImg}
        />
      ) : review.avatarId ? (
        <BrandImage
          page="four"
          id={review.avatarId}
          fill
          sizes={sizes}
          className={styles.rImageImg}
        />
      ) : (
        <span className={styles.rMonogram} aria-hidden>
          {initials(review.name)}
        </span>
      )}

      {/* Sits above the photo at all times but only becomes legible on hover;
          `aria-hidden` because the same words are already in the story's text. */}
      {overlay ? (
        <figcaption className={styles.rImageVeil} aria-hidden>
          <span className={styles.rImageVeilLabel}>{overlay}</span>
        </figcaption>
      ) : null}

      {/* Last in the frame so it stacks over both the photo and the veil.

          A review whose film we HOST plays here, in the frame. One we only hold
          a YouTube link for opens in a new tab — deliberately, rather than
          embedding: YouTube shows an embedded player a "sign in to confirm
          you're not a bot" wall whenever it distrusts the viewer's IP, and a
          testimonial is the last place to put that. Both wear the same play
          badge, because to the reader the gesture is the same one. */}
      {review.videoFile && href ? (
        <ReviewVideo
          file={review.videoFile}
          url={href}
          name={review.name}
          poster={review.photo}
        />
      ) : href ? (
        <a
          className={styles.rImageLink}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch ${review.name}'s video review on YouTube`}
        >
          <span className={styles.rImageBadge} aria-hidden>
            <svg viewBox="0 0 24 24" focusable="false">
              <path fill="currentColor" d="M8.5 5.6l10.2 6.4-10.2 6.4z" />
            </svg>
          </span>
        </a>
      ) : null}
    </figure>
  );
}
