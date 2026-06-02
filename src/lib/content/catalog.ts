import type { Artwork, Product } from "@/types/content";

const artworkImageFiles = [
  "20260408_222545.webp",
  "20260408_222557.webp",
  "20260408_222605.webp",
  "20260408_222612.webp",
  "20260408_222639.webp",
  "20260408_222716.webp",
  "20260408_222724.webp",
  "20260408_222739.webp",
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

const artworkPricePool = [35, 45, 55, 60, 65, 70] as const;

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
    .replace(/\.(jpe?g|png|webp)$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `obra-${String(index + 1).padStart(2, "0")}-${normalized}`;
};

export const artworks: Artwork[] = artworkImageFiles.map((fileName, index) => {
  const slug = toArtworkSlug(fileName, index);
  const title = `${pickByHash(artworkTitlePool, fileName, "title")} ${String(index + 1).padStart(2, "0")}`;
  const description = pickByHash(artworkDescriptionPool, fileName, "description");
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
    price: 55,
    currency: "usd",
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
    category: "print",
    available: false,
  },
  {
    id: "p2",
    slug: "catalogo-estudio-2026",
    name: "Catálogo de Estudio 2026",
    description:
      "Publicación de 96 páginas con proceso, archivo de obra y ensayo visual. Tapa dura con sobrecubierta, 21 x 28 cm.",
    excerpt: "Publicación de 96 páginas con proceso y archivo de obra.",
    price: 28,
    currency: "usd",
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    category: "print",
    available: false,
  },
  {
    id: "s1",
    slug: "camiseta-marea",
    name: "Camiseta Marea",
    description:
      "Camiseta 100% algodón orgánico con serigrafía de la obra Marea de Luz. Corte unisex, disponible en blanco y negro. Lavable a máquina.",
    excerpt: "Algodón orgánico con serigrafía original.",
    price: 22,
    currency: "usd",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    category: "shirt",
    available: false,
  },
  {
    id: "s2",
    slug: "camiseta-pulso",
    name: "Camiseta Pulso",
    description:
      "Camiseta 100% algodón orgánico con serigrafía de la obra Pulso Terracota. Corte unisex, disponible en blanco y negro. Lavable a máquina.",
    excerpt: "Algodón orgánico con serigrafía original.",
    price: 22,
    currency: "usd",
    imageUrl:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=80",
    category: "shirt",
    available: false,
  },
  {
    id: "s3",
    slug: "camiseta-bruma",
    name: "Camiseta Bruma",
    description:
      "Camiseta 100% algodón orgánico con serigrafía de la obra Bruma Orgánica. Corte unisex, disponible en blanco y negro. Lavable a máquina.",
    excerpt: "Algodón orgánico con serigrafía original.",
    price: 22,
    currency: "usd",
    imageUrl:
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=900&q=80",
    category: "shirt",
    available: false,
  },
  {
    id: "s4",
    slug: "camiseta-suspendida",
    name: "Camiseta Suspendida",
    description:
      "Camiseta 100% algodón orgánico con serigrafía de la obra Materia Suspendida. Corte unisex, disponible en blanco y negro. Lavable a máquina.",
    excerpt: "Algodón orgánico con serigrafía original.",
    price: 22,
    currency: "usd",
    imageUrl:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
    category: "shirt",
    available: false,
  },
  {
    id: "k1",
    slug: "sticker-marea",
    name: "Sticker Marea de Luz",
    description:
      "Sticker vinílico de alta resistencia al agua y al sol. Basado en la obra Marea de Luz. 10 x 10 cm.",
    excerpt: "Sticker vinílico resistente al agua y sol.",
    price: 5,
    currency: "usd",
    imageUrl:
      "https://images.unsplash.com/photo-1484239398315-f1681ef72fe6?auto=format&fit=crop&w=900&q=80",
    category: "sticker",
    available: false,
  },
  {
    id: "k2",
    slug: "sticker-pulso",
    name: "Sticker Pulso Terracota",
    description:
      "Sticker vinílico de alta resistencia al agua y al sol. Basado en la obra Pulso Terracota. 10 x 10 cm.",
    excerpt: "Sticker vinílico resistente al agua y sol.",
    price: 5,
    currency: "usd",
    imageUrl:
      "https://images.unsplash.com/photo-1761897756298-b854bc9ed2ee?auto=format&fit=crop&w=900&q=80",
    category: "sticker",
    available: false,
  },
  {
    id: "k3",
    slug: "sticker-bruma",
    name: "Sticker Bruma Orgánica",
    description:
      "Sticker vinílico de alta resistencia al agua y al sol. Basado en la obra Bruma Orgánica. 10 x 10 cm.",
    excerpt: "Sticker vinílico resistente al agua y sol.",
    price: 5,
    currency: "usd",
    imageUrl:
      "https://images.unsplash.com/photo-1700779100884-824d4a9caece?auto=format&fit=crop&w=900&q=80",
    category: "sticker",
    available: false,
  },
  {
    id: "k4",
    slug: "sticker-ecos",
    name: "Sticker Ecos de Lienzo",
    description:
      "Sticker vinílico de alta resistencia al agua y al sol. Basado en la obra Ecos de Lienzo. 10 x 10 cm.",
    excerpt: "Sticker vinílico resistente al agua y sol.",
    price: 5,
    currency: "usd",
    imageUrl:
      "https://images.unsplash.com/photo-1621524440591-8f7cf4aa0949?auto=format&fit=crop&w=900&q=80",
    category: "sticker",
    available: false,
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
