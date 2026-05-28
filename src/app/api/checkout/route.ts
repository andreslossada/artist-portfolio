import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Checkout is no longer available. Please contact us directly." },
    { status: 410 },
  );
}

export async function GET() {
  return NextResponse.json(
    { error: "Checkout is no longer available. Please contact us directly." },
    { status: 410 },
  );
}