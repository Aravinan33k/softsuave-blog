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
                "block font-display text-[1.75rem] font-semibold tracking-[-0.02em] sm:text-3xl lg:text-[2.25rem]",
                stat.highlight ? "text-primary" : "text-foreground",
              )}
            >
              {stat.value}
            </span>
            <span className="mt-1.5 block text-sm text-muted-foreground">
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
