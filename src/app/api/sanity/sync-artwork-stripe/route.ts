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
  stripeProductId?: string;
  stripePriceId?: string;
  forSale?: boolean;
};

type ArtworkLookup = {
  published: SanityArtworkForSync | null;
  draft: SanityArtworkForSync | null;
};

const artworkByIdQuery = `{
  "published": *[_type == "artwork" && _id == $publishedId][0]{
    _id,
    title,
    slug,
    price,
    stripeProductId,
    stripePriceId,
    forSale
  },
  "draft": *[_type == "artwork" && _id == $draftId][0]{
    _id,
    title,
    slug,
    price,
    stripeProductId,
    stripePriceId,
    forSale
  }
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

  const publishedId = payload._id.replace(/^drafts\./, "");
  const draftId = `drafts.${publishedId}`;
  const isDraftEvent = payload._id.startsWith("drafts.");

  const sanity = getSanityServerClient();
  const lookup = await sanity.fetch<ArtworkLookup>(
    artworkByIdQuery,
    {
      publishedId,
      draftId,
    },
  );

  const artwork = isDraftEvent
    ? (lookup.draft ?? lookup.published)
    : (lookup.published ?? lookup.draft);

  if (!artwork) {
    return NextResponse.json({ error: "Artwork not found" }, { status: 404 });
  }

  const knownStripeProductId =
    artwork.stripeProductId ?? lookup.published?.stripeProductId ?? lookup.draft?.stripeProductId;

  const knownStripePriceId =
    artwork.stripePriceId ?? lookup.published?.stripePriceId ?? lookup.draft?.stripePriceId;

  if (!artwork.forSale) {
    if (knownStripeProductId) {
      const stripe = getStripeServerClient();
      await stripe.products.update(knownStripeProductId, {
        active: false,
      });
    }

    return NextResponse.json({ ok: true, skipped: "not-for-sale" });
  }

  if (!artwork.title || !artwork.slug?.current || !artwork.price) {
    return NextResponse.json(
      { error: "Artwork must have title, slug, and price" },
      { status: 400 },
    );
  }

  const stripe = getStripeServerClient();

  const expectedAmount = Math.round(artwork.price * 100);

  let stripeProductId = knownStripeProductId;

  if (!stripeProductId) {
    const existingProducts = await stripe.products.search({
      query: `metadata['sanityArtworkId']:'${publishedId}'`,
      limit: 1,
    });

    stripeProductId = existingProducts.data[0]?.id;

    if (!stripeProductId) {
      const product = await stripe.products.create({
        name: artwork.title,
        description: `Artwork slug: ${artwork.slug.current}`,
        active: true,
        metadata: {
          sanityArtworkId: publishedId,
          sanitySlug: artwork.slug.current,
        },
      });
      stripeProductId = product.id;
    }
  }

  await stripe.products.update(stripeProductId, {
    name: artwork.title,
    description: `Artwork slug: ${artwork.slug.current}`,
    active: true,
    metadata: {
      sanityArtworkId: publishedId,
      sanitySlug: artwork.slug.current,
    },
  });

  let stripePriceId = knownStripePriceId;
  let shouldCreatePrice = true;

  const activePrices = await stripe.prices.list({
    product: stripeProductId,
    active: true,
    limit: 100,
  });

  const matchingActivePrice = activePrices.data.find(
    (price) => price.currency === "usd" && price.unit_amount === expectedAmount,
  );

  if (matchingActivePrice) {
    stripePriceId = matchingActivePrice.id;
    shouldCreatePrice = false;
  }

  if (shouldCreatePrice) {
    const newPrice = await stripe.prices.create({
      product: stripeProductId,
      currency: "usd",
      unit_amount: expectedAmount,
    });
    stripePriceId = newPrice.id;
  }

  await Promise.all(
    activePrices.data
      .filter((price) => price.id !== stripePriceId)
      .map((price) =>
        stripe.prices.update(price.id, {
          active: false,
        }),
      ),
  );

  const docsToPatch = [lookup.published?._id, lookup.draft?._id].filter(
    (id): id is string => Boolean(id),
  );

  let transaction = sanity.transaction();

  for (const id of docsToPatch) {
    transaction = transaction.patch(id, {
      set: {
        stripeProductId,
        stripePriceId,
      },
    });
  }

  await transaction.commit();

  return NextResponse.json({
    ok: true,
    stripePriceId,
    stripeProductId,
    priceCreated: shouldCreatePrice,
  });
}
