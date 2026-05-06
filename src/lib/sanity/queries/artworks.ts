import { groq } from "next-sanity";

export const artworksQuery = groq`*[_type == "artwork"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  year,
  medium,
  dimensions,
  category,
  description,
  excerpt,
  price,
  stripePriceId,
  forSale,
  image
}`;

export const artworkBySlugQuery = groq`*[_type == "artwork" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  year,
  medium,
  dimensions,
  category,
  description,
  excerpt,
  price,
  stripePriceId,
  forSale,
  image
}`;
