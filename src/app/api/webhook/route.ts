import { NextRequest } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
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

  // Handle only known types
  switch (event.type) {
    case "checkout.session.completed":
      try {
        const session = event.data.object as Stripe.Checkout.Session;

        await prisma.order.create({
          data: {
            stripeSessionId: session.id,
            email: session.customer_details?.email ?? "",
            amount: session.amount_total ?? 0,
          },
        });

        console.log("✅ Checkout stored:", session.id);
      } catch (err) {
        console.error("❌ Failed to store order in DB:", err);
        return new Response("Failed to process order", { status: 500 });
      }
      break;

    default:
      console.warn("Unhandled event type:", event.type);
  }

  return new Response("Webhook received", { status: 200 });
}

export const config = {
  api: {
    bodyParser: false,
  },
};