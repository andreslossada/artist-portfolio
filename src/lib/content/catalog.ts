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
    slug: "print-fine-art-mareas-ocre",
    name: "Print Fine Art - Mareas Ocre",
    description:
      "Impresión giclee firmada sobre papel Hahnemuehle Photo Rag 308 g/m². Edición limitada de 30 unidades numeradas a mano. 50 x 70 cm.",
    excerpt: "Impresión giclee firmada, edición limitada de 30 unidades.",
    price: 240,
    currency: "usd",
    imageUrl: `/arte/${artworkImageFiles[0]}`,
    stripePriceId: "price_placeholder_mareas_ocre",
    category: "print",
  },
  {
    id: "p2",
    slug: "catalogo-estudio-2026",
    name: "Catálogo de Estudio 2026",
    description:
      "Publicación de 96 páginas con proceso, archivo de obra y ensayo visual. Tapa dura con sobrecubierta, 21 x 28 cm.",
    excerpt: "Publicación de 96 páginas con proceso y archivo de obra.",
    price: 68,
    currency: "usd",
    imageUrl: `/arte/${artworkImageFiles[1]}`,
    stripePriceId: "price_placeholder_catalogo_2026",
    category: "print",
  },
  {
    id: "s1",
    slug: "camiseta-marea",
    name: "Camiseta Marea",
    description:
      "Camiseta 100% algodón orgánico con serigrafía de la obra Marea de Luz. Corte unisex, disponible en blanco y negro. Lavable a máquina.",
    excerpt: "Algodón orgánico con serigrafía original.",
    price: 48,
    currency: "usd",
    imageUrl: `/arte/${artworkImageFiles[2]}`,
    stripePriceId: "price_placeholder_camiseta_marea",
    category: "shirt",
  },
  {
    id: "s2",
    slug: "camiseta-pulso",
    name: "Camiseta Pulso",
    description:
      "Camiseta 100% algodón orgánico con serigrafía de la obra Pulso Terracota. Corte unisex, disponible en blanco y negro. Lavable a máquina.",
    excerpt: "Algodón orgánico con serigrafía original.",
    price: 48,
    currency: "usd",
    imageUrl: `/arte/${artworkImageFiles[3]}`,
    stripePriceId: "price_placeholder_camiseta_pulso",
    category: "shirt",
  },
  {
    id: "s3",
    slug: "camiseta-bruma",
    name: "Camiseta Bruma",
    description:
      "Camiseta 100% algodón orgánico con serigrafía de la obra Bruma Orgánica. Corte unisex, disponible en blanco y negro. Lavable a máquina.",
    excerpt: "Algodón orgánico con serigrafía original.",
    price: 48,
    currency: "usd",
    imageUrl: `/arte/${artworkImageFiles[4]}`,
    stripePriceId: "price_placeholder_camiseta_bruma",
    category: "shirt",
  },
  {
    id: "s4",
    slug: "camiseta-suspendida",
    name: "Camiseta Suspendida",
    description:
      "Camiseta 100% algodón orgánico con serigrafía de la obra Materia Suspendida. Corte unisex, disponible en blanco y negro. Lavable a máquina.",
    excerpt: "Algodón orgánico con serigrafía original.",
    price: 48,
    currency: "usd",
    imageUrl: `/arte/${artworkImageFiles[5]}`,
    stripePriceId: "price_placeholder_camiseta_suspendida",
    category: "shirt",
  },
  {
    id: "k1",
    slug: "sticker-marea",
    name: "Sticker Marea de Luz",
    description:
      "Sticker vinílico de alta resistencia al agua y al sol. Basado en la obra Marea de Luz. 10 x 10 cm.",
    excerpt: "Sticker vinílico resistente al agua y sol.",
    price: 8,
    currency: "usd",
    imageUrl: `/arte/${artworkImageFiles[6]}`,
    stripePriceId: "price_placeholder_sticker_marea",
    category: "sticker",
  },
  {
    id: "k2",
    slug: "sticker-pulso",
    name: "Sticker Pulso Terracota",
    description:
      "Sticker vinílico de alta resistencia al agua y al sol. Basado en la obra Pulso Terracota. 10 x 10 cm.",
    excerpt: "Sticker vinílico resistente al agua y sol.",
    price: 8,
    currency: "usd",
    imageUrl: `/arte/${artworkImageFiles[7]}`,
    stripePriceId: "price_placeholder_sticker_pulso",
    category: "sticker",
  },
  {
    id: "k3",
    slug: "sticker-bruma",
    name: "Sticker Bruma Orgánica",
    description:
      "Sticker vinílico de alta resistencia al agua y al sol. Basado en la obra Bruma Orgánica. 10 x 10 cm.",
    excerpt: "Sticker vinílico resistente al agua y sol.",
    price: 8,
    currency: "usd",
    imageUrl: `/arte/${artworkImageFiles[8]}`,
    stripePriceId: "price_placeholder_sticker_bruma",
    category: "sticker",
  },
  {
    id: "k4",
    slug: "sticker-ecos",
    name: "Sticker Ecos de Lienzo",
    description:
      "Sticker vinílico de alta resistencia al agua y al sol. Basado en la obra Ecos de Lienzo. 10 x 10 cm.",
    excerpt: "Sticker vinílico resistente al agua y sol.",
    price: 8,
    currency: "usd",
    imageUrl: `/arte/${artworkImageFiles[9]}`,
    stripePriceId: "price_placeholder_sticker_ecos",
    category: "sticker",
  },
];

export function getArtworkBySlug(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category?: Product["category"]) {
  if (!category) return products;
  return products.filter((product) => product.category === category);
}
