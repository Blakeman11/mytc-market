"use client";

import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Checkout failed:", errorText);
        alert("Checkout failed. Please try again.");
        return;
      }

      const data = await res.json();
      if (data.checkoutUrl) {
  clearCart(); // Clear before redirecting
  window.location.href = data.checkoutUrl;
} else {
        alert("Something went wrong with checkout.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border p-4 rounded-lg bg-white"
              >
                <div className="flex items-center gap-4">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded">
                      No Image
                    </div>
                  )}
                  <div>
                    <h2 className="font-bold">{item.title}</h2>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t pt-4 text-right">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <div className="mt-4 flex gap-2 justify-end">
              <button
                onClick={clearCart}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}