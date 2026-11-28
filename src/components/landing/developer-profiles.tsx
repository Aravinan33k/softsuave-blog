"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import FadeUp from "@/components/home/fade-up";
import EnquiryForm, { type EnquiryFormContent } from "@/components/common/enquiry-form";
import styles from "./developer-profiles.module.css";

export interface DeveloperProfile {
  readonly id: number;
  /** The card's name — an H4, as on the source page. */
  readonly name: string;
  readonly designation: string;
  readonly experience: string;
  readonly location: string;
  readonly skills: readonly string[];
  readonly photo: { readonly src: string; readonly alt: string };
}

export interface DeveloperProfilesContent {
  /** The section's heading. */
  title: string;
  body: string;
  /** Heading level of `title` — the source page sets it as a second H1. */
  titleLevel?: 1 | 2;
  profiles: readonly DeveloperProfile[];
  labels: { readonly skills: string; readonly experience: string; readonly location: string; readonly download: string };
  /** The download dialog: its heading (an H3), line, and the enquiry card's copy. */
  dialog: { readonly title: string; readonly body: string; readonly close: string; readonly form: EnquiryFormContent };
}

/**
 * Sample developer profiles as cards — photo, name, role, main skills, years
 * of experience and location — each with a "Download Profile" button that
 * opens a dialog with the shared enquiry card.
 *
 * The dialog is a native `<dialog>` opened with `showModal()`, so focus moves
 * into it, Escape closes it, and the page behind is inert, without a focus
 * trap of our own. The form is the site's one enquiry card (validation, POST
 * to /api/v1/enquiry, /thank-you redirect — what the source page's download
 * did too) with the chosen developer sent as the lead's requirement, so the
 * enquiry says which profile was asked for.
 *
 * Cards run three / two / one across. Band tokens only.
 */
export default function DeveloperProfiles({
  content,
  id = "technical-skill-section",
}: {
  content: DeveloperProfilesContent;
  id?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [chosen, setChosen] = useState<DeveloperProfile | null>(null);

  const open = (profile: DeveloperProfile) => {
    setChosen(profile);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <section className={styles.section} id={id}>
      {/* Its own masthead rather than `SectionHead`: the source sets this
          heading as a second H1, and SectionHead's H1 is an index-page
          masthead that also carries the breadcrumb. */}
      <div className={styles.headBlock}>
        {content.titleLevel === 1 ? (
          <h1 className={styles.title}>{content.title}</h1>
        ) : (
          <h2 className={styles.title}>{content.title}</h2>
        )}
        <p className={styles.intro}>{content.body}</p>
      </div>

      <FadeUp>
        <ul className={styles.grid}>
          {content.profiles.map((p) => (
            <li key={p.id} className={styles.card}>
              <div className={styles.head}>
                <span className={styles.photo}>
                  <Image src={publicMediaUrl(p.photo.src)} alt={p.photo.alt} width={80} height={80} />
                </span>
                <div>
                  <h4 className={styles.name}>{p.name}</h4>
                  <p className={styles.role}>{p.designation}</p>
                </div>
              </div>

              <p className={styles.label}>{content.labels.skills}</p>
              <ul className={styles.skills}>
                {p.skills.map((s) => (
                  <li key={s} className={styles.skill}>
                    {s}
                  </li>
                ))}
              </ul>

              <dl className={styles.facts}>
                <div>
                  <dt className={styles.label}>{content.labels.experience}</dt>
                  <dd className={styles.fact}>{p.experience}</dd>
                </div>
                <div>
                  <dt className={styles.label}>{content.labels.location}</dt>
                  <dd className={styles.fact}>{p.location}</dd>
                </div>
              </dl>

              <button
                type="button"
                className={styles.download}
                onClick={() => open(p)}
                aria-haspopup="dialog"
              >
                {content.labels.download}
                <span className="sr-only">: {p.name}</span>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M10 3v11M5 9.5l5 5 5-5M4 17h12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </FadeUp>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="profile-dialog-title"
        onClick={(e) => {
          // A click on the backdrop (the dialog box itself, outside its
          // panel) closes it.
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className={styles.panel}>
          <button type="button" className={styles.close} onClick={close} aria-label={content.dialog.close}>
            <span aria-hidden>&times;</span>
          </button>
          <h3 id="profile-dialog-title" className={styles.dialogTitle}>
            {content.dialog.title}
          </h3>
          <p className={styles.dialogBody}>{content.dialog.body}</p>
          {chosen ? (
            <p className={styles.dialogFor}>
              {chosen.name} · {chosen.designation}
            </p>
          ) : null}
          {/* Keyed by the profile, so choosing another one starts a clean form. */}
          <EnquiryForm
            key={chosen?.id ?? "none"}
            content={content.dialog.form}
            idPrefix="developer-profile"
            cardId="developer-profile-form"
            fixedRequirement={
              chosen
                ? `Developer profile download — ${chosen.name}, ${chosen.designation} (profile #${chosen.id})`
                : undefined
            }
          />
        </div>
      </dialog>
    </section>
  );
}
