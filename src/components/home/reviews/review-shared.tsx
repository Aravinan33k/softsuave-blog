"use client";

import { useEffect, useState, type RefObject } from "react";
import type { Testimonial } from "@/lib/home/content";
import styles from "../home.module.css";

/**
 * Small pieces every part of the client-story archive shares: the zero-padded
 * ordinal format, the monogram fallback, the named-client seal, and the
 * split of a review's one `role` string into a designation and a company.
 *
 * These live together because the archive's five components each need two or
 * three of them, and none is big enough to own a file.
 */

/** Ordinals in this design language are always zero-padded — `01`, not `1`. */
export const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Initials for the monogram fallback ("Roland White" → "RW", "Aaron. G" →
 * "AG"). Punctuation is stripped so an abbreviated name doesn't yield a "."
 * initial.
 */
export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => word.replace(/[^A-Za-z]/g, "").charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

/**
 * The content model carries one `role` string ("COO, Phoenix Technologies")
 * because that is how the source states it. The editorial layout wants the two
 * halves on separate lines, so split on the FIRST comma only — a company name
 * may itself contain one — and hand back whatever is actually there. Two of the
 * five reviews state no role at all, so both halves are optional.
 */
export function splitRole(role?: string): { designation?: string; company?: string } {
  if (!role) return {};
  const at = role.indexOf(",");
  if (at === -1) return { designation: role.trim() };
  return {
    designation: role.slice(0, at).trim() || undefined,
    company: role.slice(at + 1).trim() || undefined,
  };
}


/**
 * Scalloped check beside the name. It says only what we can stand behind: every
 * review here is a named client from softsuave.com's own testimonials, not an
 * anonymous or third-party-scored one — hence the label, rather than a bare
 * "Verified" that would imply an outside auditor.
 *
 * Unchanged from the card layout this archive replaces, including what it
 * means: the mark is a property of the collection, so it shows for every review
 * in it. `--tick-ink` is the knocked-out tick's colour, set by whatever ground
 * the seal sits on.
 */
export function VerifiedMark({ className }: { className?: string }) {
  return (
    <svg
      className={`${styles.rVerified} ${className ?? ""}`}
      viewBox="0 0 24 24"
      role="img"
      aria-label="Named client review"
    >
      <path
        fill="currentColor"
        d="M12 1.6l2.3 1.8 2.9-.3 1 2.7 2.5 1.5-.9 2.8.9 2.8-2.5 1.5-1 2.7-2.9-.3L12 22.4l-2.3-1.8-2.9.3-1-2.7-2.5-1.5.9-2.8-.9-2.8 2.5-1.5 1-2.7 2.9.3z"
      />
      <path
        fill="none"
        stroke="var(--tick-ink, #040508)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.2 12.2l2.6 2.6 5-5.2"
      />
    </svg>
  );
}

/** A review plus the ordinal it carries in the archive, which is its identity
 *  in the composition: the number is printed, and it drives the layout rhythm. */
export type NumberedReview = Testimonial & { ordinal: number };

/**
 * Whether a line-clamped element is actually hiding anything — measured, not
 * guessed from the string's length, because the same quote clamps at one width
 * and fits at another.
 *
 * The "read full story" control exists only where this returns true, so a short
 * review never shows a button that would reveal nothing. Re-measures on resize
 * and whenever the caller collapses the element again; while `expanded` is true
 * the clamp is off, so there is nothing to measure and the last answer stands.
 */
export function useIsClamped(ref: RefObject<HTMLElement | null>, expanded: boolean) {
  const [clamped, setClamped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || expanded) return;

    // 1px of tolerance: sub-pixel line heights can leave scrollHeight a hair
    // above clientHeight on text that is in fact fully visible.
    const measure = () => setClamped(el.scrollHeight - el.clientHeight > 1);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, expanded]);

  return clamped;
}
