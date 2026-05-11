import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCartCta } from "@/components/ui/product-cart-cta";
import { getProducts, getProductBySlug } from "@/lib/artworks";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";
import { isCommerceEnabled } from "@/lib/runtime-mode";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

const categoryLabels: Record<string, string> = {
  shirt: "Camiseta",
  sticker: "Sticker",
  print: "Edición",
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const commerceEnabled = isCommerceEnabled();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 md:px-10 md:py-6">
      <article className="border-ink/10 shadow-card grid gap-6 border bg-surface p-4 md:grid-cols-[22rem_minmax(0,1fr)] md:items-start md:gap-7 md:p-5">
        <div className="relative mx-auto aspect-4/5 w-[min(92vw,22rem)] overflow-hidden bg-canvas-soft md:mx-0 md:w-88">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 92vw, 22rem"
          />
        </div>

        <div className="flex h-full flex-col">
          <Link
            href="/shop"
            className="text-muted hover:text-accent mb-5 inline-flex text-xs tracking-[0.2em] uppercase transition"
          >
            {dict.shopPage.backToShop}
          </Link>
          <p className="text-muted text-xs tracking-[0.3em] uppercase">
            {categoryLabels[product.category] ?? product.category}
          </p>
          <h1 className="font-display mt-4 text-5xl leading-[0.95] md:text-6xl">
            {product.name}
          </h1>
          <p className="text-muted mt-6 max-w-xl text-base leading-relaxed md:text-lg">
            {product.description}
          </p>

          <p className="text-accent mt-7 text-3xl font-semibold">
            ${product.price.toFixed(2)} USD
          </p>

          <div className="border-ink/10 mt-10 border-t pt-8 md:mt-auto">
            <div className="flex flex-wrap gap-3">
              {commerceEnabled ? (
                <ProductCartCta
                  product={product}
                  labels={{
                    addToCart: dict.shopPage.addToCart,
                    viewCart: dict.shopPage.viewCart,
                  }}
                />
              ) : null}
              <Link
                href="/contact"
                className="border-accent/35 text-accent hover:bg-accent-soft/55 inline-flex h-11 items-center justify-center border px-5 text-sm font-semibold transition"
              >
                {dict.contactPage.channels.email}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
