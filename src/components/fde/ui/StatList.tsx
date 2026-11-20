import type { HeroStat } from "@/lib/fde/content/hero";
import { cn } from "@/lib/fde/utils";

export function StatList({
  stats,
  className,
}: {
  stats: HeroStat[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-8 gap-y-8 sm:flex sm:flex-wrap sm:items-start sm:justify-center sm:gap-x-12 lg:gap-x-16",
        className,
      )}
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            "text-center",
            // A 3rd odd stat spans the full row on the smallest screens.
            index === stats.length - 1 && stats.length % 2 === 1
              ? "col-span-2 sm:col-span-1"
              : "",
          )}
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span
              className={cn(
                // The site's counter figure (`.trustFigure`, landing).
                "block font-display text-[clamp(1.85rem,3.2vw,2.75rem)] font-normal leading-none tracking-[-0.035em]",
                stat.highlight ? "text-primary-deep" : "text-foreground",
              )}
            >
              {stat.value}
            </span>
            <span className="mt-2.5 block text-sm text-muted-foreground">
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
