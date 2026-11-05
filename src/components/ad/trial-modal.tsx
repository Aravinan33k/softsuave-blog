"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import EnquiryForm, { type EnquiryFormContent } from "@/components/common/enquiry-form";
import styles from "./ad.module.css";

/**
 * The modal every "Start … Free Trial" button opens, as on the live ad pages
 * (where all of them target one Bootstrap modal).
 *
 * The buttons are ordinary `<a href="#trial">` links rendered by shared
 * sections that know nothing about it, so a document-level listener, in the
 * capture phase, claims those clicks before `ScrollProvider`'s Lenis handler can
 * try to scroll to an element that does not exist. A native `<dialog>` gives the
 * focus trap, Esc and backdrop for free; a click on the backdrop closes it.
 */
export interface TrialModalSide {
  title: string;
  body: string;
  logos: readonly { name: string; src: string }[];
  /**
   * Optional stack of testimonial cards under the logo rail — the live remote
   * developer popup. The newest sits in front with the two before it peeking
   * out behind; one is brought forward every 2.5 s while the popup is open.
   */
  testimonials?: readonly { text: string; name: string; title: string; photo: string }[];
}

/** The live popup's rotation: a new card comes to the front every 2.5 s. */
const ROTATE_MS = 2500;

function TestimonialStack({
  items,
  active,
}: {
  items: readonly { text: string; name: string; title: string; photo: string }[];
  active: boolean;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % items.length), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [active, items.length]);

  // Front, middle, back — the card that was in front steps back one place.
  const shown = [0, 1, 2]
    .filter((p) => p < items.length)
    .map((p) => ({ item: items[(index - p + items.length * 3) % items.length], pos: p }));

  return (
    <div className={styles.tStack} aria-hidden>
      {shown.map(({ item, pos }) => (
        <div key={item.name} className={styles.tCard} data-pos={pos}>
          <span className={styles.tQuote}>“</span>
          <p className={styles.tText}>{item.text}</p>
          <div className={styles.tUser}>
            <Image
              src={publicMediaUrl(item.photo)}
              alt=""
              width={44}
              height={44}
              className={styles.tPhoto}
            />
            <div>
              <h3 className={styles.tName}>{item.name}</h3>
              <p className={styles.tTitle}>{item.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TrialModal({
  form,
  href = "#trial",
  idPrefix = "ad-trial",
  fixedRequirement,
  wipe = false,
  side,
}: {
  form: EnquiryFormContent;
  href?: string;
  /** Namespaces the form's field ids and doubles as the lead's `sourceKey`. */
  idPrefix?: string;
  /** Sent as the requirement, with that field left out — a name/email/phone-only card (the rate-card popup). */
  fixedRequirement?: string;
  /** The black left-to-right hover fill on the form's submit button. */
  wipe?: boolean;
  /** A left column beside the form from 1000px up: a heading, a line and a scrolling logo row — the live FDE popup. */
  side?: TrialModalSide;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.(`a[href="${href}"]`);
      if (!link || !dialog.current) return;
      e.preventDefault();
      e.stopPropagation();
      if (!dialog.current.open) dialog.current.showModal();
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [href]);

  return (
    <dialog
      ref={dialog}
      className={side ? `${styles.modal} ${styles.modalWide}` : styles.modal}
      aria-label={form.title}
      onClose={() => setOpen(false)}
      onClick={(e) => {
        if (e.target === e.currentTarget) dialog.current?.close();
      }}
    >
      <div
        className={[styles.modalInner, wipe ? styles.wipeForm : "", side ? styles.modalSplit : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <button
          type="button"
          className={styles.modalClose}
          aria-label="Close"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        {side && (
          <div className={styles.modalSide}>
            <h2 className={styles.modalSideTitle}>{side.title}</h2>
            <p className={styles.modalSideBody}>{side.body}</p>
            <div className={styles.logoRail} aria-hidden>
              <div className={styles.logoTrack}>
                {[...side.logos, ...side.logos].map((l, i) => (
                  <Image
                    key={`${l.name}-${i}`}
                    src={publicMediaUrl(l.src)}
                    alt=""
                    width={150}
                    height={60}
                    className={styles.logoImg}
                  />
                ))}
              </div>
            </div>
            {side.testimonials && side.testimonials.length > 0 && (
              // Keyed on `open` so each opening starts again at the first card.
              <TestimonialStack key={open ? "open" : "closed"} items={side.testimonials} active={open} />
            )}
          </div>
        )}
        <EnquiryForm
          content={form}
          idPrefix={idPrefix}
          fixedRequirement={fixedRequirement}
          cardId={`${idPrefix}-form`}
        />
      </div>
    </dialog>
  );
}
