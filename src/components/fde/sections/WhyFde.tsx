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
    <section className="bg-background py-10 sm:py-12 lg:py-[60px]">
      <Container size="wide">
        <div className="flex flex-col items-center text-center">
          <Badge variant="soft">{content.badge}</Badge>

          <h2 className="mt-7 font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[2.25rem] lg:text-[2.6rem]">
            {content.headline}
          </h2>

          <p className="mt-5 max-w-2xl text-[0.95rem] leading-[1.7] text-muted-foreground sm:text-base">
            {content.description}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl sm:mt-14">
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
