"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Download, X } from "lucide-react";
import EnquiryForm, { type EnquiryFormContent } from "@/components/common/enquiry-form";
import { CASE_STUDY_DOWNLOAD_PATH } from "@/lib/home/case-study-download-content";
import styles from "./case-study.module.css";

/**
 * The case study's PDF download — softsuave.com's "Download Case Study!!!"
 * modal, rebuilt on this site's enquiry card.
 *
 * Live gates the PDF behind name, e-mail and phone and posts them to its own
 * case-study endpoint; nothing downloads on the page — the server e-mails the
 * visitor the case study and the visitor lands on /case-study-download. Here the same three fields go
 * through the site's one lead path (`/api/v1/enquiry`, via `EnquiryForm` with
 * a fixed requirement naming the case study and the PDF's path), so the request
 * is stored and the team is notified like any other lead, and the visitor is
 * e-mailed the case study as a "Download Case Study" button (lib/leads/auto-reply.ts).
 * With no database configured the request goes to live's own case-study
 * endpoint instead (lib/leads/forward-case-study.ts), which sends that e-mail.
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
  /** Left over from the in-page confirmation: the visitor now goes to /case-study-download, so none of it is shown. */
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
  const router = useRouter();

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
        <EnquiryForm
          content={content.form}
          idPrefix="case-study-download"
          cardId="case-study-download"
          fixedRequirement={content.requirement}
          caseStudyPdf={content.pdf}
          // As on softsuave.com: once the request is in, the visitor goes to the thank-you page, carrying their
          // e-mail in the address (`/case-study-download?email=…`). The case study itself is e-mailed.
          onSent={(lead) => {
            dialog.current?.close();
            router.push(`${CASE_STUDY_DOWNLOAD_PATH}?email=${encodeURIComponent(lead.email)}`);
          }}
        />
      </div>
    </dialog>
  );
}
