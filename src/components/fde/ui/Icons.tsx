import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MessageIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <svg {...base} width="14" height="14" {...props}>
      <path d="M9.94 3.34a.5.5 0 0 1 .94 0l1.06 2.86a.5.5 0 0 0 .3.3l2.85 1.05a.5.5 0 0 1 0 .94l-2.86 1.06a.5.5 0 0 0-.29.29l-1.06 2.86a.5.5 0 0 1-.94 0L8.88 9.84a.5.5 0 0 0-.29-.29L5.73 8.49a.5.5 0 0 1 0-.94l2.86-1.05a.5.5 0 0 0 .29-.3Z" />
      <path d="M18 14.5 18.7 16.3 20.5 17 18.7 17.7 18 19.5 17.3 17.7 15.5 17 17.3 16.3Z" />
      <path d="M5 15.5 5.5 16.8 6.8 17.3 5.5 17.8 5 19.1 4.5 17.8 3.2 17.3 4.5 16.8Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} width="22" height="22" {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} width="22" height="22" {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...props}>
      <path d="m9 18-6-6 6-6M15 6l6 6-6 6" />
    </svg>
  );
}

export function TrendingUpIcon(props: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...props}>
      <path d="M3 17 9.5 10.5l4 4L21 7" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

export function DollarIcon(props: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...props}>
      <path d="M12 2v20" />
      <path d="M17 6.5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...props}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 21v-4h6v4" />
      <path d="M8.5 7h.01M12 7h.01M15.5 7h.01M8.5 11h.01M12 11h.01M15.5 11h.01" />
    </svg>
  );
}

export function ScaleIcon(props: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...props}>
      <path d="M12 3v18M7 21h10" />
      <path d="M5 7h14" />
      <path d="M5 7 2 13h6ZM19 7l-3 6h6Z" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function BrainIcon(props: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...props}>
      <path d="M12 5a2.5 2.5 0 0 0-5 0 2.5 2.5 0 0 0-2 4 2.5 2.5 0 0 0 .5 4.5A2.5 2.5 0 0 0 7 19a2.5 2.5 0 0 0 5 0Z" />
      <path d="M12 5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 2 4 2.5 2.5 0 0 1-.5 4.5A2.5 2.5 0 0 1 17 19a2.5 2.5 0 0 1-5 0Z" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...props}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7Z" />
    </svg>
  );
}

export function AlertTriangleIcon(props: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...props}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...props}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}

export function RocketIcon(props: IconProps) {
  return (
    <svg {...base} width="20" height="20" {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width="16"
      height="16"
      {...props}
    >
      <path d="m12 2.5 2.9 5.88 6.49.95-4.7 4.58 1.11 6.46L12 17.32l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.95Z" />
    </svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      width="28"
      height="28"
      {...props}
    >
      <path d="M9.5 5.5C6.46 6.9 4.5 9.9 4.5 13.2v5.3h6.2v-6.2H7.6c0-2.2 1-3.9 2.9-4.9Zm9.9 0c-3.04 1.4-5 4.4-5 7.7v5.3h6.2v-6.2h-3.1c0-2.2 1-3.9 2.9-4.9Z" />
    </svg>
  );
}

export function StarOutlineIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" {...props}>
      <path d="m12 2.8 2.85 5.77 6.37.93-4.61 4.5 1.09 6.35L12 17.35l-5.7 3 1.09-6.35-4.61-4.5 6.37-.93Z" />
    </svg>
  );
}

/**
 * Brand glyphs are solid shapes, so they opt out of the shared stroked
 * `base` and paint with `fill` instead.
 */
const brandBase = {
  fill: "currentColor",
  stroke: "none",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...brandBase} width="18" height="18" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.75H2.4V21.5Zm7.77 0h5.16v-6.2c0-1.64.31-3.22 2.34-3.22 2 0 2.03 1.87 2.03 3.32v6.1h5.16v-7.13c0-4.35-.94-7.02-5.02-7.02-1.96 0-3.28 1.08-3.82 2.1h-.07V9.75h-4.95c.07 1.4 0 11.75 0 11.75Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  // `evenodd` punches out the lens and the corner dot; without it the glyph
  // fills in as a solid rounded-[0.25rem] square.
  return (
    <svg {...brandBase} fillRule="evenodd" width="18" height="18" {...props}>
      <path d="M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.3-1.46.72-2.13 1.38A5.86 5.86 0 0 0 .63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...brandBase} width="18" height="18" {...props}>
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.8ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

/**
 * The header's dropdown caret: a filled disc with a knocked-out chevron,
 * matching Font Awesome's `circle-chevron-down` used on the live site. The
 * disc takes `currentColor` so the trigger can tint it when its panel is open.
 */
export function CircleChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden width="18" height="18" {...props}>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="m8.4 10.6 3.6 3.6 3.6-3.6"
        stroke="hsl(var(--fde-background))"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
