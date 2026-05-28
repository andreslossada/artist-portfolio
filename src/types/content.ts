export type Artwork = {
  id: string;
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  imageUrl: string;
  description: string;
  excerpt: string;
  price: number;
  category: string;
  stripePriceId: string;
};

export type ProductCategory = "shirt" | "sticker" | "print";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  excerpt: string;
  price: number;
  currency: "usd";
  imageUrl: string;
  stripePriceId: string;
  category: ProductCategory;
  available: boolean;
};

export type CartItemKind = "artwork" | "product";
