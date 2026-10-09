import {
  AlertTriangleIcon,
  CheckIcon,
  CloseIcon,
  StarOutlineIcon,
  UsersIcon,
} from "@/components/fde/ui/Icons";
import type { ComparisonColumn } from "@/lib/fde/content/comparison";
import { cn } from "@/lib/fde/utils";

const icons = {
  alert: AlertTriangleIcon,
  users: UsersIcon,
};

export function ComparisonCard({ column }: { column: ComparisonColumn }) {
  const Icon = icons[column.icon];
  const isFeatured = Boolean(column.featured);
  // The featured column is the affirmative one, so its rows are ticks.
  const Marker = isFeatured ? CheckIcon : CloseIcon;

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[1.5rem]",
        isFeatured
          ? "border-2 border-primary bg-gradient-to-b from-background to-primary/[0.05] shadow-[0_0_50px_-12px_hsl(var(--fde-primary)/0.35)]"
          : "border border-border/70 bg-background shadow-[0_10px_40px_-24px_hsl(220_15%_8%/0.18)]",
      )}
    >
      {/* Corner banner. The card's overflow-hidden trims its outer edge to the
          rounded-[0.25rem] corner; the clip-path angles the inner edge. */}
      {isFeatured && column.ribbon ? (
        <span className="absolute -right-0.5 -top-0.5 z-10 bg-primary py-2.5 pl-10 pr-6 text-sm font-semibold text-primary-foreground [clip-path:polygon(20px_0,100%_0,100%_100%,0_100%)]">
          {column.ribbon}
        </span>
      ) : null}

      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <header className="flex items-center gap-4">
          <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="font-display text-xl font-bold tracking-[-0.015em] text-foreground sm:text-2xl">
            {column.title}
          </h3>
        </header>

        <ul className="mt-9 space-y-6">
          {column.points.map((point) => (
            <li key={point} className="flex items-start gap-4">
              <Marker
                aria-hidden
                className="mt-0.5 h-[1.35rem] w-[1.35rem] shrink-0 text-primary"
              />
              <span className="text-[1.05rem] leading-[1.45] text-muted-foreground">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Full-bleed band, so it sits outside the content padding */}
      {isFeatured && column.footnote ? (
        <p className="flex items-center justify-center gap-2.5 bg-primary/[0.08] px-6 py-5 text-center text-[1.05rem] font-semibold text-primary">
          <StarOutlineIcon aria-hidden className="h-5 w-5 shrink-0" />
          {column.footnote}
        </p>
      ) : null}
    </article>
  );
}
