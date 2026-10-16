import { Badge } from "@/components/fde/ui/Badge";
import { ComparisonTable } from "@/components/fde/ui/ComparisonTable";
import { Container } from "@/components/fde/ui/Container";
import {
  whyFdeColumns,
  whyFdeContent,
  whyFdeRows,
  type TableColumn,
  type TableRow,
} from "@/lib/fde/content/whyFde";

type WhyFdeProps = {
  content?: typeof whyFdeContent;
  columns?: TableColumn[];
  rows?: TableRow[];
};

export function WhyFde({
  content = whyFdeContent,
  columns = whyFdeColumns,
  rows = whyFdeRows,
}: WhyFdeProps) {
  return (
    <section className="bg-background py-[var(--section-y)]">
      <Container size="wide">
        <div className="flex flex-col items-center text-center">
          <Badge variant="soft">{content.badge}</Badge>

          <h2 className="mt-7 font-display text-balance text-[length:var(--fs-h2)] font-light leading-[1.1] tracking-[-0.03em] text-foreground">
            {content.headline}
          </h2>

          <p className="mt-5 max-w-2xl text-pretty text-[length:var(--fs-body)] leading-[1.6] text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="mx-auto mt-[var(--section-head-gap)] max-w-5xl">
          <ComparisonTable
            columns={columns}
            rows={rows}
            rowHeaderLabel={content.rowHeaderLabel}
          />
        </div>
      </Container>
    </section>
  );
}
