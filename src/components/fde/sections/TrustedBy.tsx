import { ClientLogoItem } from "@/components/fde/ui/ClientLogoItem";
import { Container } from "@/components/fde/ui/Container";
import { Marquee } from "@/components/fde/ui/Marquee";
import {
  clientLogos,
  trustedByLabel,
  type ClientLogo,
} from "@/lib/fde/content/logos";

/** Keeps the reel wide enough to scroll even with only a couple of logos. */
const MIN_ITEMS_PER_REEL = 8;

function buildReel(logos: ClientLogo[]) {
  if (logos.length === 0) return [];
  const times = Math.max(1, Math.ceil(MIN_ITEMS_PER_REEL / logos.length));
  return Array.from({ length: times }, () => logos).flat();
}

type TrustedByProps = {
  label?: string;
  logos?: ClientLogo[];
  /** One full loop, in seconds. */
  duration?: number;
};

export function TrustedBy({
  label = trustedByLabel,
  logos = clientLogos,
  duration = 60,
}: TrustedByProps) {
  const reel = buildReel(logos);

  return (
    <section
      aria-label={label}
      className="relative border-t border-border/60 bg-gradient-to-b from-muted/35 via-background to-background"
    >
      <Container size="wide" className="py-12 sm:py-14 lg:py-16">
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <span aria-hidden className="hidden h-px w-10 bg-border sm:block lg:w-16" />
          <h2 className="text-center text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.28em]">
            {label}
          </h2>
          <span aria-hidden className="hidden h-px w-10 bg-border sm:block lg:w-16" />
        </div>
      </Container>

      {reel.length > 0 ? (
        <div className="pb-14 sm:pb-16 lg:pb-20">
          <Marquee duration={duration}>
            {reel.map((logo, index) => (
              <ClientLogoItem key={`${logo.src}-${index}`} logo={logo} />
            ))}
          </Marquee>
        </div>
      ) : null}
    </section>
  );
}
