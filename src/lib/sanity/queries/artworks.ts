import { groq } from "next-sanity";

export const artworksQuery = groq`*[_type == "artwork"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  year,
  medium,
  dimensions,
  excerpt,
  image
}`;
