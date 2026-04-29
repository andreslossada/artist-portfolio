import { NextResponse } from "next/server";
import { getStripeServerClient } from "@/lib/stripe/server";

export async function POST(request: Request) {
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!signingSecret || !signature) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET or stripe-signature" },
      { status: 400 },
    );
  }

  const stripe = getStripeServerClient();
  const payload = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(payload, signature, signingSecret);

    if (event.type === "checkout.session.completed") {
      console.info("Stripe checkout.session.completed", event.data.object.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook signature error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
