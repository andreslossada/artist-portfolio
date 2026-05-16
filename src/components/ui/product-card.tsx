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
        <div className="relative aspect-[3/4] overflow-hidden md:aspect-4/5">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 active:scale-[1.02] md:group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col justify-between p-3 md:p-4">
        <div>
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-display text-xl leading-tight transition-colors group-hover:text-accent md:text-2xl">
              {product.name}
            </h3>
          </Link>
          <p className="text-muted mt-1 line-clamp-2 text-sm leading-relaxed">
            {product.excerpt}
          </p>
        </div>
        <div className="mt-3 flex flex-col gap-2 md:mt-4 md:flex-row md:items-end md:justify-between md:gap-3">
          <p className="text-accent text-lg font-semibold">
            ${product.price.toFixed(2)} USD
          </p>
          <ProductCartCta product={product} labels={labels} />
        </div>
      </div>
    </article>
  );
}
