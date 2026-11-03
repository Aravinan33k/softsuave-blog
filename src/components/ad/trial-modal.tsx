"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.(`a[href="${href}"]`);
      if (!link || !dialog.current) return;
      e.preventDefault();
      e.stopPropagation();
      if (!dialog.current.open) dialog.current.showModal();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [href]);

  return (
    <dialog
      ref={dialog}
      className={side ? `${styles.modal} ${styles.modalWide}` : styles.modal}
      aria-label={form.title}
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
