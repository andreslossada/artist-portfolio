import type { Artwork, Product } from "@/types/content";

export const artworks: Artwork[] = [
  {
    id: "a1",
    slug: "mareas-ocres",
    title: "Mareas Ocre",
    year: "2024",
    medium: "Oleo sobre lino",
    dimensions: "120 x 90 cm",
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Estudio de luz costera con capas densas y trazos expansivos.",
  },
  {
    id: "a2",
    slug: "jardin-nocturno",
    title: "Jardin Nocturno",
    year: "2025",
    medium: "Acrilico y carbon",
    dimensions: "100 x 100 cm",
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1201&q=80",
    excerpt: "Paleta profunda con contrastes de cobre y negro mineral.",
  },
  {
    id: "a3",
    slug: "latido-del-polvo",
    title: "Latido del Polvo",
    year: "2025",
    medium: "Mixta sobre madera",
    dimensions: "140 x 80 cm",
    imageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Texturas de erosion y gesto rapido en superposicion de pigmentos.",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Print Fine Art - Mareas Ocre",
    description: "Impresion giclee firmada, edicion limitada de 30 unidades.",
    price: 240,
    currency: "usd",
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
    stripePriceId: "price_placeholder_mareas_ocre",
  },
  {
    id: "p2",
    name: "Catalogo de Estudio 2026",
    description: "Publicacion de 96 paginas con proceso y archivo de obra.",
    price: 68,
    currency: "usd",
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    stripePriceId: "price_placeholder_catalogo_2026",
  },
];

export function getArtworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}
