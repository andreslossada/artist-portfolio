import { cache } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from "@/lib/sanity/image";
import { getSanityClient, sanityReady } from "@/lib/sanity/client";
import {
  artworkBySlugQuery,
  artworksQuery,
} from "@/lib/sanity/queries/artworks";
import type { Artwork } from "@/types/content";

type SanityArtwork = {
  _id: string;
  slug?: string;
  title?: string;
  year?: string;
  medium?: string;
  dimensions?: string;
  category?: string;
  description?: string;
  excerpt?: string;
  price?: number;
  stripePriceId?: string;
  forSale?: boolean;
  image?: SanityImageSource;
};

function toArtwork(item: SanityArtwork): Artwork | null {
  if (!item.slug || !item.title || !item.image) {
    return null;
  }

  const imageUrl = urlForImage(item.image).width(1200).quality(85).url();

  return {
    id: item._id,
    slug: item.slug,
    title: item.title,
    year: item.year ?? "",
    medium: item.medium ?? "",
    dimensions: item.dimensions ?? "",
    category: item.category ?? "",
    description: item.description ?? item.excerpt ?? "",
    excerpt: item.excerpt ?? item.description ?? "",
    imageUrl,
    price: item.price ?? 0,
    stripePriceId: item.stripePriceId ?? "",
  };
}

export const getArtworks = cache(async (): Promise<Artwork[]> => {
  if (!sanityReady()) {
    return [];
  }

  const docs = await getSanityClient().fetch<SanityArtwork[]>(artworksQuery);
  const mapped = docs
    .map((item) => toArtwork(item))
    .filter((item): item is Artwork => item !== null);

  return mapped;
});

export const getArtworkBySlug = cache(async (slug: string) => {
  if (!sanityReady()) {
    return null;
  }

  const doc = await getSanityClient().fetch<SanityArtwork | null>(
    artworkBySlugQuery,
    {
      slug,
    },
  );

  if (!doc) {
    return null;
  }

  return toArtwork(doc);
});
