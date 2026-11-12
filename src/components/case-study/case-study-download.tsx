"use client";

import { useEffect, useRef, useState } from "react";
import { Download, X } from "lucide-react";
import EnquiryForm, { type EnquiryFormContent } from "@/components/common/enquiry-form";
import { appPath } from "@/lib/media-url";
import styles from "./case-study.module.css";

/**
 * The case study's PDF download — softsuave.com's "Download Case Study!!!"
 * modal, rebuilt on this site's enquiry card.
 *
 * Live gates the PDF behind name, e-mail and phone and posts them to its own
 * lead endpoint before handing the file over. Here the same three fields go
 * through the site's one lead path (`/api/v1/enquiry`, via `EnquiryForm` with
 * a fixed requirement naming the case study), so the request is stored and
 * the team is notified like any other lead; once it is accepted the PDF —
 * hosted at the same path as live's — downloads straight away, with a button
 * to fetch it again.
 *
 * Every "Download" control on the page opens the one dialog through a window
 * event, so the contents list and the download band need no shared state.
 */

const OPEN_EVENT = "ss:case-study-download";

export interface CaseStudyDownloadContent {
  /** The contents list's button ("Download"). */
  readonly navLabel: string;
  /** The download band's copy and button. */
  readonly body: string;
  readonly label: string;
  /** Site path of the PDF, and the name it saves under. */
  readonly pdf: string;
  readonly fileName: string;
  /** Stored as the lead's requirement, so the team sees what was asked for. */
  readonly requirement: string;
  readonly form: EnquiryFormContent;
  /** Shown once the lead is in and the download has started. */
  readonly done: { readonly title: string; readonly body: string; readonly cta: string };
}

/** A button that opens the download dialog. */
export function DownloadButton({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      {label}
      <Download className={styles.downloadGlyph} strokeWidth={2} aria-hidden />
    </button>
  );
}

/** The dialog itself — mount once per page. */
export function DownloadDialog({ content }: { content: CaseStudyDownloadContent }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [sent, setSent] = useState(false);
  const pdf = appPath(content.pdf);

  useEffect(() => {
    const open = () => {
      const el = dialog.current;
      if (!el || el.open) return;
      el.showModal();
      // Straight to the first field rather than the close button.
      el.querySelector<HTMLInputElement>("input:not([tabindex='-1'])")?.focus();
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const startDownload = () => {
    const a = document.createElement("a");
    a.href = pdf;
    a.download = content.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-label={content.form.title}
      // A click on the backdrop (the dialog element itself, outside its box)
      // closes it, as the live modal's overlay does.
      onClick={(e) => {
        if (e.target === e.currentTarget) dialog.current?.close();
      }}
      data-lenis-prevent
    >
      <div className={styles.dialogBox}>
        <button
          type="button"
          className={styles.dialogClose}
          onClick={() => dialog.current?.close()}
          aria-label="Close"
        >
          <X strokeWidth={1.8} aria-hidden />
        </button>
        {sent ? (
          <div className={styles.dialogDone} role="status">
            <p className={styles.dialogDoneTitle}>{content.done.title}</p>
            <p className={styles.dialogDoneBody}>{content.done.body}</p>
            <a className={styles.dialogDoneCta} href={pdf} download={content.fileName}>
              {content.done.cta}
              <Download className={styles.downloadGlyph} strokeWidth={2} aria-hidden />
            </a>
          </div>
        ) : (
          <EnquiryForm
            content={content.form}
            idPrefix="case-study-download"
            cardId="case-study-download"
            fixedRequirement={content.requirement}
            onSent={() => {
              setSent(true);
              startDownload();
            }}
          />
        )}
      </div>
    </dialog>
  );
}
