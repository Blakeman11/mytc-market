"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ShopPage() {
  const [cards, setCards] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/api/shop")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Cards For Sale</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="border rounded-lg p-4 shadow bg-white">
            <img
  src={card.imageUrl || "/fallback.jpg"} // fallback prevents the crash
  alt={card.title}
  className="w-full h-48 object-cover mb-4 rounded"
/>
            <h2 className="text-xl font-semibold">{card.title}</h2>
            <p className="text-sm text-gray-600">
              {card.playerName} • {card.year}
            </p>
            <p className="mt-2 font-bold">${card.price.toFixed(2)}</p>
            <button
              onClick={() =>
                addToCart({
                  id: card.id,
                  title: card.title,
                  price: card.price,
                  imageUrl: card.imageUrl,
                })
              }
              className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}