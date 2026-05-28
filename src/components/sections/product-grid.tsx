import { ProductCard } from "@/components/ui/product-card";
import { getProducts } from "@/lib/artworks";
import type { ProductCategory } from "@/types/content";

type ProductGridProps = {
  category?: ProductCategory;
  labels: {
    addToCart: string;
    viewCart: string;
    unavailable: string;
  };
};

export async function ProductGrid({ category, labels }: ProductGridProps) {
  const allProducts = await getProducts();
  const products = category
    ? allProducts.filter((p) => p.category === category)
    : allProducts;

  if (products.length === 0) {
    return (
      <p className="text-muted mt-10 text-base leading-relaxed">
        No hay productos en esta categoría todavía.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} labels={labels} />
      ))}
    </div>
  );
}
