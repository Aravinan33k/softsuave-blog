"use client";

import { useEffect, useRef } from "react";
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
export default function TrialModal({
  form,
  href = "#trial",
}: {
  form: EnquiryFormContent;
  href?: string;
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
      className={styles.modal}
      aria-label={form.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) dialog.current?.close();
      }}
    >
      <div className={styles.modalInner}>
        <button
          type="button"
          className={styles.modalClose}
          aria-label="Close"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        <EnquiryForm content={form} idPrefix="ad-trial" cardId="trial-form" />
      </div>
    </dialog>
  );
}
