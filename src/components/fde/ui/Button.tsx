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

const variants: Record<ButtonVariant, string> = {
  // The border is present in both states (brand-coloured throughout) so the
  // fill-to-outline hover animates as a pure colour change — no 1px reflow of
  // the label, and no border snapping into existence.
  primary:
    "border border-primary bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_hsl(var(--fde-primary)/0.6)] hover:bg-background hover:text-primary hover:shadow-[0_4px_14px_-8px_hsl(var(--fde-primary)/0.35)]",
  // Same fill-to-outline inversion, for dark sections. Hovers to transparent
  // rather than white so it resolves to the section's own ground and still
  // reads as an outline — white here would be a solid pill, not an outline.
  primaryInk:
    "border border-primary bg-primary text-primary-foreground shadow-[0_16px_40px_-16px_hsl(var(--fde-primary)/0.75)] hover:bg-transparent hover:text-primary hover:shadow-none",
  outline:
    "border border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/[0.04] hover:text-primary",
  // `outline` on a dark ground. Stays translucent rather than taking a solid
  // fill so the section's own background reads through the pill.
  outlineInk:
    "border border-ink-foreground/30 bg-ink-foreground/[0.06] text-ink-foreground hover:border-ink-foreground/60 hover:bg-ink-foreground/[0.12] hover:text-ink-foreground",
  ghost: "border border-transparent text-foreground/70 hover:bg-muted hover:text-foreground",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 gap-2 px-4 text-sm",
  md: "h-11 gap-2 px-5 text-[0.95rem]",
  lg: "h-[3.25rem] gap-2.5 px-7 text-base",
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-[250ms] ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

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
