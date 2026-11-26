import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import type { CwPhoto } from "@/lib/home/ad-coffee-with-us-images";

/**
 * One /ad/coffee-with-us photograph, filling its (positioned) parent with
 * `object-fit: cover` and the pipeline's blur placeholder while it loads.
 * `decorative` drops the alt text for a picture that only sets the mood.
 */
export default function CwPhoto({
  photo,
  sizes,
  className,
  decorative = false,
  eager = false,
}: {
  photo: CwPhoto;
  sizes: string;
  className?: string;
  decorative?: boolean;
  eager?: boolean;
}) {
  return (
    <Image
      src={publicMediaUrl(photo.src)}
      alt={decorative ? "" : photo.alt}
      fill
      sizes={sizes}
      className={className}
      loading={eager ? "eager" : "lazy"}
      {...(photo.blurDataURL ? { placeholder: "blur" as const, blurDataURL: photo.blurDataURL } : {})}
    />
  );
}
