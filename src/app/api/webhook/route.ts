// src/app/api/webhook/route.ts
import { NextRequest } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const error = err as Error;
    console.error("❌ Webhook signature verification failed:", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await prisma.order.create({
        data: {
          stripeSessionId: session.id,
          email: session.customer_details?.email ?? "",
          amount: session.amount_total ?? 0,
        },
      });

      console.log("✅ Checkout stored:", session.id);
    } catch (err) {
      console.error("❌ Failed to store order:", err);
    }
  }

  return new Response("Webhook received", { status: 200 });
}

// Required: disables Next.js body parsing so we can verify the raw Stripe payload
export const config = {
  api: {
    bodyParser: false,
  },
};