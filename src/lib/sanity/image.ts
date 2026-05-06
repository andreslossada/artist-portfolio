import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { getSanityClient } from "@/lib/sanity/client";

export function urlForImage(source: SanityImageSource) {
  const builder = createImageUrlBuilder(getSanityClient());
  return builder.image(source);
}
