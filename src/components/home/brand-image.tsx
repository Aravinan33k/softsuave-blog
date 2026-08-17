import Image from "next/image";
import { getImage } from "@/lib/home/images";
import type { PageKey } from "@/lib/home/content";

type Props = {
  page: PageKey;
  id: string;
  /** override alt from manifest if a more specific one is desired */
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** render as a fill image inside a positioned parent */
  fill?: boolean;
};

/**
 * next/image wrapper that pulls src/dimensions/blurDataURL/alt from the
 * generated Pexels manifest. Every image slot on every page uses this —
 * no placeholders, correct sizes, blur-up, priority on heroes.
 */
export default function BrandImage({
  page,
  id,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  fill = false,
}: Props) {
  const img = getImage(page, id);
  const resolvedAlt = alt ?? img.alt;
  if (fill) {
    return (
      <Image
        src={img.src}
        alt={resolvedAlt}
        fill
        placeholder="blur"
        blurDataURL={img.blurDataURL}
        priority={priority}
        sizes={sizes}
        className={className}
      />
    );
  }
  return (
    <Image
      src={img.src}
      alt={resolvedAlt}
      width={img.width}
      height={img.height}
      placeholder="blur"
      blurDataURL={img.blurDataURL}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
