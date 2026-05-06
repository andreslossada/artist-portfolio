import type { Artwork, Product } from "@/types/content";

const artworkImageFiles = [
  "20260408_222545.jpg",
  "20260408_222557.jpg",
  "20260408_222605.jpg",
  "20260408_222612.jpg",
  "20260408_222639.jpg",
  "20260408_222716.jpg",
  "20260408_222724.jpg",
  "20260408_222739.jpg",
  "20260408_222750.jpg",
  "IMG_20240630_101759_357.jpg",
  "IMG_20250618_152651_189.jpg",
  "IMG_20250621_131642_427.jpg",
  "IMG_20250622_111728_398.jpg",
  "IMG_20250622_111739_597.jpg",
  "IMG_20250622_111834_071.jpg",
] as const;

const artworkTitlePool = [
  "Resonancia de Taller",
  "Materia Suspendida",
  "Ritmo de Pigmento",
  "Marea de Luz",
  "Ecos de Lienzo",
  "Pulso Terracota",
  "Tensión y Calma",
  "Bruma Orgánica",
] as const;

const artworkDescriptionPool = [
  "Capa sobre capa, esta pieza construye una atmósfera serena con contrastes suaves y una energía contenida.",
  "Una composición de trazo libre y color profundo que invita a observar los detalles del gesto.",
  "La obra explora equilibrio entre textura y vacío, con un recorrido visual lento y contemplativo.",
  "Superficies vivas y bordes difusos generan una lectura cambiante según la distancia del espectador.",
  "Pinceladas amplias y ritmo irregular crean una narrativa abstracta enfocada en movimiento y silencio.",
  "Tonos cálidos y materia densa dialogan para producir una presencia intensa dentro del espacio.",
] as const;

const artworkCategoryPool = [
  "Serie Estudio",
  "Paisaje Abstracto",
  "Materia",
  "Coleccion 2026",
] as const;

const artworkPricePool = [180, 220, 260, 320, 390, 460, 540, 680, 820, 950] as const;

const hashString = (value: string) => {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
};

const pickByHash = <T>(pool: readonly T[], seed: string, salt: string): T => {
  const hash = hashString(`${seed}-${salt}`);
  return pool[hash % pool.length];
};

const toArtworkSlug = (fileName: string, index: number) => {
  const normalized = fileName
    .replace(/\.jpg$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `obra-${String(index + 1).padStart(2, "0")}-${normalized}`;
};

export const artworks: Artwork[] = artworkImageFiles.map((fileName, index) => {
  const slug = toArtworkSlug(fileName, index);
  const title = `${pickByHash(artworkTitlePool, fileName, "title")} ${String(index + 1).padStart(2, "0")}`;
  const description = pickByHash(artworkDescriptionPool, fileName, "description");
  const envKey = `STRIPE_PRICE_ID_ARTWORK_${String(index + 1).padStart(2, "0")}`;
  const stripePriceId = process.env[envKey] ?? "";

  return {
    id: `g${index + 1}`,
    slug,
    title,
    year: "2026",
    medium: "Acrílico sobre lienzo",
    dimensions: "100 x 100 cm",
    imageUrl: `/arte/${fileName}`,
    description,
    excerpt: description,
    price: pickByHash(artworkPricePool, fileName, "price"),
    category: pickByHash(artworkCategoryPool, fileName, "category"),
    stripePriceId,
  };
});

export const products: Product[] = [
  {
    id: "p1",
    name: "Print Fine Art - Mareas Ocre",
    description: "Impresión giclee firmada, edición limitada de 30 unidades.",
    price: 240,
    currency: "usd",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
    stripePriceId: "price_placeholder_mareas_ocre",
  },
  {
    id: "p2",
    name: "Catálogo de Estudio 2026",
    description: "Publicación de 96 páginas con proceso y archivo de obra.",
    price: 68,
    currency: "usd",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    stripePriceId: "price_placeholder_catalogo_2026",
  },
];

export function getArtworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}
