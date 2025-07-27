import Stripe from "stripe";
import { ApiError } from "@/lib/api-error";
import { handleApiRoute } from "@/lib/handle-api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

type CartItem = {
  title: string;
  price: number;
  imageUrl?: string;
};

export const POST = handleApiRoute(async () => {
  const { cart }: { cart: CartItem[] } = await new Request().json();

  if (!cart || !Array.isArray(cart)) {
    throw new ApiError(400, "Cart must be a valid array of items.");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: item.imageUrl ? [item.imageUrl] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    })),
    success_url: "http://localhost:3000/thank-you",
    cancel_url: "http://localhost:3000/checkout",
  });

  return new Response(JSON.stringify({ checkoutUrl: session.url }), {
    status: 200,
  });
});