import { NextResponse } from "next/server";
import { getStripeServerClient } from "@/lib/stripe/server";

type CheckoutPayload = {
  priceId?: string;
  quantity?: number;
};

async function getCheckoutPayload(request: Request): Promise<CheckoutPayload> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return request.json();
  }

  const formData = await request.formData();

  return {
    priceId: String(formData.get("priceId") ?? ""),
    quantity: Number(formData.get("quantity") ?? 1),
  };
}

export async function POST(request: Request) {
  try {
    const payload = await getCheckoutPayload(request);

    if (!payload.priceId) {
      return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
    }

    const stripe = getStripeServerClient();
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: payload.priceId,
          quantity: Math.max(1, payload.quantity ?? 1),
        },
      ],
      success_url: `${origin}/contact?checkout=success`,
      cancel_url: `${origin}/contact?checkout=cancel`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL" },
        { status: 500 },
      );
    }

    const requestContentType = request.headers.get("content-type") ?? "";

    if (requestContentType.includes("application/json")) {
      return NextResponse.json({ checkoutUrl: session.url });
    }

    return NextResponse.redirect(session.url, { status: 303 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown checkout error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
