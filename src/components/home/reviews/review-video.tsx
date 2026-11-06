"use client";

import { useRef, useState } from "react";
import { publicMediaUrl } from "@/lib/media-url";
import styles from "../home.module.css";

/**
 * In-place playback for a client's video review, laid over the story's
 * photograph inside `ReviewImage`'s frame.
 *
 * The source is always a file WE serve from /public — never a YouTube embed.
 * There was one, briefly, and it went: YouTube gates embedded playback behind a
 * "sign in to confirm you're not a bot" screen for any viewer whose IP it
 * distrusts (a VPN, an office behind one NAT), and no embed parameter defeats
 * that check. A testimonial that greets a reader with a sign-in wall is worse
 * than one that simply opens in a new tab, so a review we hold no file for
 * doesn't get a player at all — `ReviewImage` renders it as a link out instead.
 *
 * It is a FACADE: until someone presses play the frame is just the client's
 * portrait with a play badge over it, and no video is fetched. That matters
 * because the archive renders every story at once.
 *
 * Once started, the control is a single play/pause toggle that appears over the
 * picture on hover and stays put whenever the video is paused, so a paused video
 * always shows the way back in. The element is authoritative about its own
 * state — the toggle reads its `play`/`pause` events rather than guessing — so
 * it stays correct when the reader uses the browser's own controls instead.
 */
export default function ReviewVideo({
  /** Root-relative path under /public, or an absolute CDN URL. */
  file,
  /** The review's home on YouTube — the credit, and where the last-resort
   *  message sends anyone the file fails for. */
  url,
  /** The client's name — every accessible label is built from it, so a reader
   *  hears which review the control belongs to. */
  name,
  /** The client's portrait. Becomes the poster frame, so the frame looks
   *  identical either side of the press that mounts the player. */
  poster,
}: {
  file: string;
  url: string;
  name: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  /** Whether the player exists yet. Once true it stays true: tearing it down on
   *  pause would drop the reader's position in the video. */
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  /** The file didn't load — not deployed yet, or the browser can't decode it.
   *  Better to say so than to leave a black rectangle where a face was. */
  const [failed, setFailed] = useState(false);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    // No optimistic state: the element's own events set it, which also covers a
    // play() the browser refuses.
    if (el.paused) void el.play().catch(() => setPlaying(false));
    else el.pause();
  };

  return (
    <div className={styles.rVideoPlayer} data-idle={started ? undefined : ""}>
      {started ? (
        failed ? (
          <a
            className={styles.rVideoFallback}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Open"
          >
            This review wouldn&apos;t play here — watch it on YouTube
          </a>
        ) : (
          <video
            ref={videoRef}
            className={styles.rVideoFrame}
            src={publicMediaUrl(file)}
            poster={poster ? publicMediaUrl(poster) : undefined}
            playsInline
            /* The browser's own bar rides the bottom edge — scrub, volume,
               fullscreen — while ours holds the top. Ours is the one that is
               always reachable; this is the full set. */
            controls
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onError={() => setFailed(true)}
          />
        )
      ) : null}

      {/* Before the first press the badge IS the button, filling the frame over
          the portrait. It leaves once the player is mounted — the transport
          takes over from there. */}
      {!started ? (
        <button
          type="button"
          className={styles.rVideoStart}
          onClick={() => {
            setStarted(true);
            // The click is the gesture that permits autoplay, so start straight
            // into playback rather than making the reader press twice.
            queueMicrotask(() => void videoRef.current?.play()?.catch(() => setPlaying(false)));
          }}
          aria-label={`Play ${name}'s video review`}
          data-cursor="Play"
        >
          {/* The same badge the link-only frames use — one affordance, whether
              the press plays in place or opens a tab. */}
          <span className={styles.rImageBadge} aria-hidden>
            <PlayGlyph />
          </span>
        </button>
      ) : failed ? null : (
        /* Top-left on purpose: the browser's own bar owns the bottom edge, and
           two transports there is a pause button on a pause button. */
        <div className={styles.rVideoBar} data-paused={playing ? undefined : ""}>
          <button
            type="button"
            className={styles.rVideoToggle}
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? `Pause ${name}'s video review` : `Play ${name}'s video review`}
            data-cursor={playing ? "Pause" : "Play"}
          >
            <span aria-hidden>{playing ? <PauseGlyph /> : <PlayGlyph />}</span>
            <span className={styles.rVideoToggleLabel}>{playing ? "Pause" : "Play"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* The two transport glyphs. Drawn rather than pulled from an icon set so they
   share the archive's optical weight, and sized by the button's font-size. */

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden>
      {/* Nudged right of the box's centre — a triangle's optical centre is not
          its geometric one. */}
      <path fill="currentColor" d="M8.5 5.6l10.2 6.4-10.2 6.4z" />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden>
      <path fill="currentColor" d="M7.5 5.4h3.1v13.2H7.5zM13.4 5.4h3.1v13.2h-3.1z" />
    </svg>
  );
}
