import { getArtworks } from "@/lib/artworks";

export async function getLandingGalleryItems() {
  return getArtworks();
}
