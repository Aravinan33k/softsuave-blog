export type ClientLogo = {
  /** Used for alt text. */
  name: string;
  /** Path under /public. */
  src: string;
  /** Intrinsic size of the source file — keeps layout stable before load. */
  width: number;
  height: number;
  href?: string;
  /** Per-logo optical size nudge, since brand marks are rarely balanced. */
  scale?: number;
};

/**
 * Add new marks here — the carousel sizes, repeats and loops itself.
 * Drop the artwork in /public/logos and reference it by filename.
 */
export const clientLogos: ClientLogo[] = [
  { name: "Atomise", src: "/images/fde/logos/atomise.png", width: 150, height: 60 },
  { name: "CloudBankin", src: "/images/fde/logos/cloudbankin.png", width: 150, height: 60 },
  { name: "Enigma Networkz", src: "/images/fde/logos/enigma-networkz.png", width: 150, height: 60 },
  { name: "Oasis Digital", src: "/images/fde/logos/oasis-digital.png", width: 150, height: 60 },
  { name: "OfficeSpace", src: "/images/fde/logos/officespace.png", width: 150, height: 60 },
  { name: "OMRI Listed", src: "/images/fde/logos/omri.png", width: 150, height: 60 },
  { name: "Outsource Consultants", src: "/images/fde/logos/outsource-consultants.png", width: 150, height: 60 },
  { name: "PaceWisdom", src: "/images/fde/logos/pacewisdom.png", width: 150, height: 60 },
  { name: "Poorvika", src: "/images/fde/logos/poorvika.png", width: 150, height: 60 },
  { name: "PromosTV", src: "/images/fde/logos/promostv.png", width: 150, height: 60 },
  { name: "Sulekha.com", src: "/images/fde/logos/sulekha.png", width: 150, height: 60 },
  { name: "Teamicate", src: "/images/fde/logos/teamicate.png", width: 150, height: 60 },
  { name: "The 20/20 Diet", src: "/images/fde/logos/the-2020-diet.png", width: 150, height: 60 },
  { name: "Traffic Spy", src: "/images/fde/logos/trafficspy.png", width: 150, height: 60 },
  { name: "Utiliko", src: "/images/fde/logos/utiliko.png", width: 150, height: 60 },
  { name: "Warm Point Alarm", src: "/images/fde/logos/warmpoint-alarm.png", width: 150, height: 60 },
  // Tighter crop than the rest, so it renders wider at a shared height.
  { name: "WayMore", src: "/images/fde/logos/waymore.png", width: 150, height: 33 },
  { name: "Who's Up", src: "/images/fde/logos/whos-up.png", width: 150, height: 60 },
];

export const trustedByLabel = "Trusted by Startups, SMBs, and Global Businesses";
