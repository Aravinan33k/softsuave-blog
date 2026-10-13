import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/fde/utils";

export type ButtonVariant =
  | "primary"
  | "primaryInk"
  | "outline"
  | "outlineInk"
  | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * The site's orange-button hover — the nav's "Book AI Strategy Call"
 * (`.pillFilled`, home.module.css): a contrast fill sweeps in from the left
 * under the label, painted by `::before` between the plate and the text
 * (`isolate` keeps its negative z-index inside the button). Once the sweep
 * has covered it the plate itself takes the colour (`background-color` waits
 * 0.4s), so no orange rim shows round the anti-aliased edge; it snaps back
 * to orange the moment the pointer leaves, under the retreating sweep.
 */
const wipe =
  "relative isolate overflow-hidden [transition:background-color_0s,border-color_0.3s_ease,color_0.3s_ease,box-shadow_0.3s_ease,transform_0.25s_ease] hover:[transition:background-color_0s_0.4s,border-color_0.3s_ease,color_0.3s_ease,box-shadow_0.3s_ease,transform_0.25s_ease] focus-visible:[transition:background-color_0s_0.4s,border-color_0.3s_ease,color_0.3s_ease,box-shadow_0.3s_ease,transform_0.25s_ease] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:origin-left before:scale-x-0 before:content-[''] before:transition-transform before:duration-[450ms] before:ease-[cubic-bezier(0.22,0.7,0.2,1)] hover:before:scale-x-100 focus-visible:before:scale-x-100";

/** Colour-only hover for the plates without a sweep. */
const fade =
  "transition-[background-color,border-color,color,box-shadow,transform] duration-[300ms] ease-out";

const variants: Record<ButtonVariant, string> = {
  // Near-black sweep with white ink on the light grounds, as on every light
  // band of the site.
  primary: `${wipe} border border-primary bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_hsl(var(--fde-primary)/0.6)] before:bg-foreground hover:border-foreground hover:bg-foreground hover:text-white hover:shadow-[0_10px_30px_-14px_hsl(var(--fde-foreground)/0.45)] focus-visible:border-foreground focus-visible:bg-foreground focus-visible:text-white`,
  // White sweep with dark ink on the dark section and the CTA banner.
  primaryInk: `${wipe} border border-primary bg-primary text-primary-foreground shadow-[0_16px_40px_-16px_hsl(var(--fde-primary)/0.75)] before:bg-white hover:border-white hover:bg-white hover:text-foreground hover:shadow-none focus-visible:border-white focus-visible:bg-white focus-visible:text-foreground`,
  // The site's outline button: fills with the orange on hover.
  outline: `${fade} border border-border bg-card text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground`,
  // `outline` on a dark ground. Stays translucent rather than taking a solid
  // fill so the section's own background reads through the pill; fills with
  // the orange on hover like `outline`.
  outlineInk: `${fade} border border-ink-foreground/30 bg-ink-foreground/[0.06] text-ink-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground`,
  ghost: `${fade} border border-transparent text-foreground/70 hover:bg-muted hover:text-foreground`,
};

// Label sizes are the site's button type: `lg` is the section CTA (51px tall,
// 13-15px mono), `md` and `sm` step down from it.
const sizes: Record<ButtonSize, string> = {
  sm: "h-9 gap-2 px-4 text-[0.6875rem]",
  md: "h-11 gap-2 px-6 text-[0.75rem]",
  lg: "h-[3.25rem] gap-2.5 px-7 text-[clamp(0.8125rem,0.95vw,0.9375rem)]",
};

// Mono, uppercase and tracked — the site's button voice (`.btn`, landing).
const baseStyles =
  "inline-flex items-center justify-center rounded-full font-mono font-normal uppercase tracking-[0.1em] whitespace-nowrap active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = SharedProps & { href: string };
type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  // Forward only the native button attributes, dropping our own props.
  const rest = { ...(props as ButtonAsButton) };
  delete rest.variant;
  delete rest.size;
  delete rest.className;
  delete (rest as { children?: ReactNode }).children;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
