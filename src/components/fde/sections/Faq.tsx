import { Accordion } from "@/components/fde/ui/Accordion";
import { Badge } from "@/components/fde/ui/Badge";
import { Container } from "@/components/fde/ui/Container";
import { faqContent, faqItems, type FaqItem } from "@/lib/fde/content/faq";

type FaqProps = {
  content?: typeof faqContent;
  items?: FaqItem[];
};

export function Faq({ content = faqContent, items = faqItems }: FaqProps) {
  const entries = items.map((item) => ({
    id: item.question,
    trigger: item.question,
    content: item.answer,
  }));

  return (
    <section className="bg-background py-10 sm:py-12 lg:py-[60px]">
      <Container size="wide">
        {/*
          Two columns from lg: the intro holds a left rail and the accordion
          takes the wider right column, so the list starts level with the
          heading instead of below it. Below lg they stack in source order and
          the row gap stands in for the old `mt-12`.
        */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-20">
          {/*
            The rail pins under the sticky header (89px) while the answers
            scroll past, and releases when the grid ends. `self-start` is
            required: a grid item defaults to `align-self: stretch`, which
            makes it as tall as the row and leaves `sticky` nothing to travel
            in. Only from lg — below that the intro sits above the list, where
            pinning it would eat the viewport.
          */}
          <div className="flex flex-col items-start text-left lg:sticky lg:top-28 lg:self-start">
            <Badge variant="soft">{content.badge}</Badge>

            <h2 className="mt-6 font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[2.25rem] lg:text-[2.6rem]">
              {content.headline}
            </h2>

            <p className="mt-5 max-w-2xl text-[0.95rem] leading-[1.7] text-muted-foreground sm:text-base">
              {content.description}
            </p>
          </div>

          <Accordion items={entries} />
        </div>
      </Container>
    </section>
  );
}
