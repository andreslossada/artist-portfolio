import { NextResponse } from "next/server";
import { getSanityServerClient, sanityServerReady } from "@/lib/sanity/server-client";
import { getStripeServerClient } from "@/lib/stripe/server";

type SyncPayload = {
  _id?: string;
};

type SanityArtworkForSync = {
  _id: string;
  title?: string;
  slug?: {
    current?: string;
  };
  price?: number;
  stripePriceId?: string;
  forSale?: boolean;
};

const artworkByIdQuery = `*[_type == "artwork" && _id == $id][0]{
  _id,
  title,
  slug,
  price,
  stripePriceId,
  forSale
}`;

export async function POST(request: Request) {
  const expectedSecret = process.env.SANITY_STRIPE_SYNC_SECRET;
  const providedSecret = request.headers.get("x-sanity-sync-secret");

  if (!expectedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!sanityServerReady()) {
    return NextResponse.json(
      { error: "Sanity server config missing" },
      { status: 500 },
    );
  }

  const payload = (await request.json()) as SyncPayload;

  if (!payload._id) {
    return NextResponse.json({ error: "Missing _id" }, { status: 400 });
  }

  const sanity = getSanityServerClient();
  const artwork = await sanity.fetch<SanityArtworkForSync | null>(
    artworkByIdQuery,
    {
      id: payload._id,
    },
  );

  if (!artwork) {
    return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
  }

  if (!artwork.forSale) {
    return NextResponse.json({ ok: true, skipped: "not-for-sale" });
  }

  if (!artwork.title || !artwork.slug?.current || !artwork.price) {
    return NextResponse.json(
      { error: "Artwork must have title, slug, and price" },
      { status: 400 },
    );
  }

  if (artwork.stripePriceId) {
    return NextResponse.json({
      ok: true,
      stripePriceId: artwork.stripePriceId,
      skipped: "already-has-price",
    });
  }

  const stripe = getStripeServerClient();

  const product = await stripe.products.create({
    name: artwork.title,
    description: `Artwork slug: ${artwork.slug.current}`,
    metadata: {
      sanityArtworkId: artwork._id,
      sanitySlug: artwork.slug.current,
    },
  });

  const price = await stripe.prices.create({
    product: product.id,
    currency: "usd",
    unit_amount: Math.round(artwork.price * 100),
  });

  await sanity
    .patch(artwork._id)
    .set({
      stripePriceId: price.id,
    })
    .commit();

  return NextResponse.json({
    ok: true,
    stripePriceId: price.id,
    stripeProductId: product.id,
  });
}
