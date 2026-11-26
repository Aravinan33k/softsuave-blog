import Image from "next/image";
import { ArrowRight, CalendarCheck, CalendarDays, Crosshair, Users, Video } from "lucide-react";
import { publicMediaUrl } from "@/lib/media-url";
import FadeUp from "@/components/home/fade-up";
import CwPhoto from "./cw-photo";
import type { CwPhoto as Photo } from "@/lib/home/ad-coffee-with-us-images";
import gen from "@/components/generative-ai/gen-ai.module.css";
import landing from "@/components/landing/landing.module.css";
import styles from "./coffee.module.css";

type PointIcon = "calendar" | "people" | "target";

export type CeoInviteContent = {
  readonly eyebrow: string;
  readonly title: { readonly lead: string; readonly accent: string; readonly end: string };
  readonly body: readonly string[];
  readonly points: readonly { readonly icon: PointIcon; readonly lines: readonly [string, string] }[];
  readonly cta: { readonly label: string; readonly href: string };
  readonly note: readonly [string, string];
  readonly photo: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
  readonly caption: { readonly name: string; readonly role: string };
};

const ICONS = { calendar: CalendarDays, people: Users, target: Crosshair } as const;

/**
 * The CEO's personal invitation that closes `/ad/coffee-with-us`, in place of
 * the old pages' bottom enquiry form (to the approved card design): on the
 * left the eyebrow, the heading with its accent word, the copy, three meeting
 * points and the site's primary button beside the no-obligation note; on the
 * right the CEO in a glowing frame (his cut-out portrait over a softened
 * office photo) with a floating "30-minute virtual meeting" tag and a name
 * card. A coffee-table photo fades in behind the right side, and a glowing
 * curve runs along the bottom left. Space Grotesk and Inter only. Stacks below
 * 900px, copy first. The button is a plain in-page link, so the smooth-scroll
 * handler takes it to the form.
 */
export default function CeoInvite({
  content,
  backdrop,
  room,
  tag,
  id = "invitation",
}: {
  content: CeoInviteContent;
  /** The coffee-table photo behind the panel's right side. */
  backdrop: Photo;
  /** The room behind the CEO's cut-out portrait, inside the frame. */
  room: Photo;
  /** The meeting length, on the floating tag. */
  tag: string;
  id?: string;
}) {
  return (
    <section className={`${gen.sectionShell} ${styles.invite}`} id={id}>
      <div className={styles.invitePanel}>
        <div className={styles.inviteBackdrop} aria-hidden>
          <CwPhoto photo={backdrop} sizes="(max-width: 899px) 100vw, 640px" className={styles.photoCover} decorative />
        </div>
        <svg className={styles.inviteCurve} viewBox="0 0 800 160" preserveAspectRatio="none" aria-hidden>
          <path className={styles.inviteCurveGlow} d="M0 70 C 170 150, 330 10, 520 40 S 760 120, 800 112" />
          <path className={styles.inviteCurveLine} d="M0 70 C 170 150, 330 10, 520 40 S 760 120, 800 112" />
        </svg>

        <div className={styles.inviteCopy}>
          <span className={styles.inviteEyebrow}>{content.eyebrow}</span>
          <h2 className={styles.inviteTitle}>
            {content.title.lead} <span className={styles.inviteAccent}>{content.title.accent}</span>
            {content.title.end}
          </h2>
          <p className={styles.inviteBody}>{content.body.join(" ")}</p>

          <ul className={styles.invitePoints}>
            {content.points.map((p) => {
              const Icon = ICONS[p.icon];
              return (
                <li key={p.lines.join(" ")}>
                  <Icon size={30} strokeWidth={1.6} aria-hidden />
                  <span>
                    {p.lines[0]} <br className={styles.invitePointBreak} />
                    {p.lines[1]}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className={styles.inviteActions}>
            {/* The site's primary button (landing .btn .btnPrimary): its colour and
                the left-to-right fill on hover, as in the page's own masthead. */}
            <a href={content.cta.href} className={`${landing.btn} ${landing.btnPrimary} ${styles.inviteCta}`}>
              <CalendarCheck size={18} aria-hidden />
              {content.cta.label}
              <ArrowRight size={18} aria-hidden />
            </a>
            <p className={styles.inviteNote}>
              {content.note[0]} <br />
              {content.note[1]}
            </p>
          </div>
        </div>

        <FadeUp>
          <figure className={styles.inviteFigure}>
            <div className={styles.inviteFrame}>
              <CwPhoto photo={room} sizes="(max-width: 899px) 80vw, 420px" className={styles.inviteRoom} decorative />
              <Image
                src={publicMediaUrl(content.photo.src)}
                alt={content.photo.alt}
                width={content.photo.width}
                height={content.photo.height}
                sizes="(max-width: 899px) 70vw, 380px"
                loading="lazy"
                className={styles.invitePortrait}
              />
            </div>
            <span className={styles.inviteTag}>
              <Video size={26} strokeWidth={1.6} aria-hidden />
              {/* Two lines, the first word on its own: "30-minute / virtual meeting". */}
              <span>
                {tag.split(" ")[0]} <br />
                {tag.split(" ").slice(1).join(" ")}
              </span>
            </span>
            <figcaption className={styles.inviteName}>
              <strong>{content.caption.name}</strong>
              <span>{content.caption.role}</span>
            </figcaption>
          </figure>
        </FadeUp>
      </div>
    </section>
  );
}
