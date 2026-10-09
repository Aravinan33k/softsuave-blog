import { Badge } from "@/components/fde/ui/Badge";
import { Container } from "@/components/fde/ui/Container";
import { ShieldCheckIcon } from "@/components/fde/ui/Icons";
import { PartnerCard } from "@/components/fde/ui/PartnerCard";
import {
  modelPartners,
  modelPartnersContent,
  type ModelPartner,
} from "@/lib/fde/content/partners";

type ModelPartnersProps = {
  content?: typeof modelPartnersContent;
  partners?: ModelPartner[];
};

export function ModelPartners({
  content = modelPartnersContent,
  partners = modelPartners,
}: ModelPartnersProps) {
  return (
    <section className="border-y border-border/60 bg-muted/40 py-10 sm:py-12 lg:py-[60px]">
      <Container size="wide">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge variant="soft" icon={<ShieldCheckIcon />}>
            {content.badge}
          </Badge>

          <h2 className="mt-7 font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[2.25rem] lg:text-[2.75rem]">
            {content.headline}
          </h2>

          <p className="mt-6 max-w-2xl text-[0.95rem] leading-[1.75] text-muted-foreground sm:text-base">
            {content.description}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {partners.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:mt-14">
          {content.footnote}
        </p>
      </Container>
    </section>
  );
}
