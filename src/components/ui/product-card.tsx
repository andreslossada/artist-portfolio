import Image from "next/image";
import Link from "next/link";
import { ProductCartCta } from "@/components/ui/product-cart-cta";
import type { Product } from "@/types/content";

type ProductCardProps = {
  product: Product;
  labels: {
    addToCart: string;
    viewCart: string;
  };
};

export function ProductCard({ product, labels }: ProductCardProps) {
  return (
    <article className="group border-ink/10 hover:border-accent/35 flex flex-col overflow-hidden border bg-surface transition-colors">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-4/5 overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-accent">
              {product.name}
            </h3>
          </Link>
          <p className="text-muted mt-1 line-clamp-2 text-sm leading-relaxed">
            {product.excerpt}
          </p>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <p className="text-accent text-lg font-semibold">
            ${product.price.toFixed(2)} USD
          </p>
          <ProductCartCta product={product} labels={labels} />
        </div>
      </div>
    </article>
  );
}
