import { BoltIcon, BrainIcon, SparklesIcon } from "@/components/fde/ui/Icons";
import type { ModelPartner, PartnerIconName } from "@/lib/fde/content/partners";

const icons: Record<
  PartnerIconName,
  React.ComponentType<{ className?: string }>
> = {
  sparkles: SparklesIcon,
  brain: BrainIcon,
  bolt: BoltIcon,
};

export function PartnerCard({ partner }: { partner: ModelPartner }) {
  const Icon = icons[partner.icon];

  return (
    <article className="flex h-full flex-col rounded-[1rem] border border-border bg-background p-7 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_24px_50px_-30px_hsl(220_15%_8%/0.25)] sm:p-8">
      <span className="flex h-11 w-11 items-center justify-center rounded-[0.75rem] bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>

      <h3 className="mt-8 font-display text-lg font-bold tracking-[-0.01em] text-foreground sm:text-xl">
        {partner.name}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{partner.models}</p>

      <ul className="mt-7 space-y-3">
        {partner.strengths.map((strength) => (
          <li key={strength} className="flex gap-2.5">
            <span
              aria-hidden
              className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            />
            <span className="text-[0.95rem] leading-[1.6] text-muted-foreground">
              {strength}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
