'use client';

import { useEffect, useRef } from 'react';
import EnquiryForm from '@/components/common/enquiry-form';
import { posQuote } from '@/lib/home/pos-content';
import styles from './pos.module.css';

/** Anchor the popup answers to: the live page's "Get Free Quote Now" button. */
export const POS_QUOTE_HREF = '#quote';

/**
 * The "Get your FREE Quote Now !!!" popup. On the live page that form is a modal opened by the portfolio's
 * "Get Free Quote Now" button, not a section; every anchor to `#quote` here opens it the same way.
 */
export default function QuotePopup() {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    // Capture phase, so the smooth scroller's own handler for in-page anchors never sees the click.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.(`a[href="${POS_QUOTE_HREF}"]`);
      if (link) {
        e.preventDefault();
        e.stopPropagation();
        if (!el.open) el.showModal();
        return;
      }
      if (e.target === el) el.close();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return (
    <dialog ref={dialog} className={styles.dialog} aria-label={posQuote.title}>
      <div className={styles.dialogCard}>
        <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close">
          ×
        </button>
        <EnquiryForm
          content={{ ...posQuote.form, title: posQuote.title, body: posQuote.body, titleAs: 'h2' }}
          idPrefix="pos-quote"
          cardId="pos-quote-form"
        />
      </div>
    </dialog>
  );
}
