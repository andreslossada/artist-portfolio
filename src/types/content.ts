export type Artwork = {
  id: string;
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  imageUrl: string;
  excerpt: string;
  category: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "usd";
  imageUrl: string;
  stripePriceId: string;
};
