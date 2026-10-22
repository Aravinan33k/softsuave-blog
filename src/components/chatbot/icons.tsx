/**
 * The widget's icons, redrawn as inline SVG from softsuave.com's chat widget
 * (its PNGs and SVGs), so they inherit colour and cost no requests. Every one
 * is decorative: the button it sits in carries the accessible name.
 */

type IconProps = { className?: string };

/** The Soft Suave cube mark, white, as in the live widget's title bar. */
export function LogoMark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 31 36" fill="none" aria-hidden>
      <path
        d="M28.9462 8.28184L15.4679 15.7242L6.22567 10.5576L15.4679 5.39099L20.6667 8.28184L24.7743 6.00607L15.4679 0.839447L0 9.38897V11.6647L13.4141 19.1686V29.4404L4.10766 24.2738V18.5536L0 16.2778V26.5495L15.4679 35.1606L17.5859 33.9919V19.1686L26.8282 14.002V24.2738L21.6936 27.1646V31.7161L31 26.5495V9.38897L28.9462 8.28184Z"
        fill="currentColor"
      />
      <path d="M17.8425 16.0318L30.1013 9.266L28.9461 8.58942L16.6873 15.3552L17.8425 16.0318Z" fill="currentColor" />
      <path d="M20.6666 6.6822L21.8218 6.06712L17.8425 3.85286L16.6873 4.52944L20.6666 6.6822Z" fill="currentColor" />
      <path d="M2.63124 25.1347V16.8312L0.320679 15.5396V25.1347L15.4677 33.5612L16.6871 32.9461L2.63124 25.1347Z" fill="currentColor" />
    </svg>
  );
}

/** A ring with a cross — the title bar's close button. */
export function CloseRing({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" aria-hidden>
      <circle cx="16" cy="16" r="14.5" strokeWidth="1.6" />
      <path d="M11.5 11.5l9 9M20.5 11.5l-9 9" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MicIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="22" />
    </svg>
  );
}

/** The mic with a slash, for the voice-chat mute button. */
export function MicMuteIcon({ className, muted }: IconProps & { muted: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="22" />
      {muted && <line x1="3" y1="3" x2="21" y2="21" />}
    </svg>
  );
}

export function StopIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
    </svg>
  );
}

/** The paper plane from the live widget's `send-img-chat.svg`. */
export function SendIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 14" fill="currentColor" aria-hidden>
      <path d="M14.894 5.913 1.543.375A.75.75 0 0 0 .501 1.086v3.541c0 .359.256.667.61.736l7.279 1.346a.13.13 0 0 1 0 .246L1.111 8.301a.75.75 0 0 0-.61.736v3.541a.744.744 0 0 0 1.041.68l13.346-5.504a1.004 1.004 0 0 0 .006-1.84Z" />
    </svg>
  );
}

/** Five bars: the "start voice chat" button. */
export function WaveIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
      <line x1="4" y1="10" x2="4" y2="14" />
      <line x1="8" y1="7" x2="8" y2="17" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="16" y1="7" x2="16" y2="17" />
      <line x1="20" y1="10" x2="20" y2="14" />
    </svg>
  );
}

/** The slot picker's month arrows: a rounded box around an arrow. */
export function BoxedArrow({ className, dir }: IconProps & { dir: "left" | "right" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="1.5" y="1.5" width="17" height="17" rx="4.5" strokeWidth="1.6" />
      <path d={dir === "left" ? "M14 10H6.5M9.5 6.5 6 10l3.5 3.5" : "M6 10h7.5M10.5 6.5 14 10l-3.5 3.5"} strokeWidth="1.7" />
    </svg>
  );
}

/** The slot picker's day arrows: a solid arrowhead. */
export function Arrowhead({ className, dir }: IconProps & { dir: "left" | "right" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d={dir === "left" ? "M17 3 3 10l14 7-4.5-7Z" : "M3 3l14 7-14 7 4.5-7Z"} />
    </svg>
  );
}

/** Grey disc with a chevron: jump to the latest message. */
export function ScrollDownIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10.75" fill="#cccccc" />
      <path d="M8.2 10.6 12 14.4l3.8-3.8" fill="none" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
