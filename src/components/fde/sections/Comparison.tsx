import { AccentHeading } from "@/components/fde/ui/AccentHeading";
import { Badge } from "@/components/fde/ui/Badge";
import { ComparisonCard } from "@/components/fde/ui/ComparisonCard";
import { Container } from "@/components/fde/ui/Container";
import { ShieldCheckIcon } from "@/components/fde/ui/Icons";
import {
  comparisonColumns,
  comparisonContent,
  type ComparisonColumn,
} from "@/lib/fde/content/comparison";

type ComparisonProps = {
  content?: typeof comparisonContent;
  columns?: ComparisonColumn[];
};

export function Comparison({
  content = comparisonContent,
  columns = comparisonColumns,
}: ComparisonProps) {
  return (
    <section className="bg-surface py-10 sm:py-12 lg:py-[60px]">
      <Container size="wide">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge variant="soft" icon={<ShieldCheckIcon />} className="mb-7">
            {content.badge}
          </Badge>

          <AccentHeading
            runs={content.headline}
            className="text-foreground text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[2.25rem] lg:text-[2.6rem]"
          />

          <p className="mt-5 max-w-3xl text-[0.95rem] leading-[1.7] text-muted-foreground sm:text-base">
            {content.description}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:mt-14 md:grid-cols-2 lg:gap-8">
          {columns.map((column) => (
            <ComparisonCard key={column.title} column={column} />
          ))}
        </div>
      </Container>
    </section>
  );
}
