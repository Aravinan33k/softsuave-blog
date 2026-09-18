"use client";

import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

export interface TeamContent {
  eyebrow: string;
  title: string;
  body: string;
  members: readonly {
    readonly name: string;
    readonly role: string;
    /** Root-relative; resolved through `publicMediaUrl` for the mount subpath. */
    readonly image: string;
    /** Omitted renders no link rather than a dead one. */
    readonly linkedin?: string;
  }[];
}

/**
 * Leadership portraits — the one section on the Company pages the shared set
 * genuinely lacked. Every other card component here is text-first with an
 * optional thumbnail; this one is portrait-first, which is a different shape,
 * not a variant of the same one.
 *
 * The portraits are cut-outs with transparent backgrounds (copied from the live
 * site at their native 210x250), so the card supplies the shape behind them —
 * a tinted disc in the brand accent, the same device the live site uses. That
 * also means `object-fit: contain`, not `cover`: a cut-out cropped to fill would
 * lose the top of someone's head.
 *
 * Entrance is the shared `FadeUp`, so this section behaves like every other
 * card grid on the page and inherits its reduced-motion opt-out.
 */
export default function Team({
  content,
  id = "team",
}: {
  content: TeamContent;
  id?: string;
}) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        <ul className={styles.teamGrid}>
          {content.members.map((m) => (
            <li key={m.name} className={styles.teamCard}>
              <div className={styles.teamMedia}>
                <span className={styles.teamShape} aria-hidden />
                <Image
                  src={publicMediaUrl(m.image)}
                  alt={`${m.name}, ${m.role} at Soft Suave`}
                  width={210}
                  height={250}
                  sizes="(max-width: 599px) 60vw, (max-width: 999px) 30vw, 20vw"
                  className={styles.teamImg}
                />
              </div>

              <div className={styles.teamBody}>
                <h3 className={styles.teamName}>{m.name}</h3>
                <p className={styles.teamRole}>{m.role}</p>

                {m.linkedin ? (
                  <a
                    className={styles.teamLink}
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                      className={styles.teamLinkIcon}
                    >
                      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.71h.05a4.16 4.16 0 0 1 3.75-2.06c4 0 4.75 2.64 4.75 6.07V21h-4v-5.39c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21h-4V9Z" />
                    </svg>
                    <span className={styles.srOnly}>{m.name} on </span>
                    LinkedIn
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
