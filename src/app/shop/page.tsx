"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ShopPage() {
  const [allCards, setAllCards] = useState<any[]>([]);
  const [displayedCards, setDisplayedCards] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/api/shop")
      .then((res) => res.json())
      .then((data) => {
        setAllCards(data);
        setDisplayedCards(data);
      });
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const lower = term.toLowerCase();
    const filtered = allCards.filter(
      (card) =>
        card.title.toLowerCase().includes(lower) ||
        card.playerName.toLowerCase().includes(lower)
    );
    setDisplayedCards(filtered);
  };

  const handleSort = (criteria: string) => {
    const sorted = [...displayedCards];
    if (criteria === "low") sorted.sort((a, b) => a.price - b.price);
    else if (criteria === "high") sorted.sort((a, b) => b.price - a.price);
    else if (criteria === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));
    setDisplayedCards(sorted);
  };

  return (
    <main className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Cards For Sale</h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by player or title..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/2"
        />
        <select
          className="p-2 border rounded w-full sm:w-48"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="az">A-Z</option>
        </select>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {displayedCards.map((card) => (
          <div
            key={card.id}
            className="border rounded-lg p-3 shadow-sm bg-white flex flex-col min-w-[150px] hover:shadow-md transition"
          >
            <img
              src={
                card.imageUrl?.startsWith("http")
                  ? card.imageUrl
                  : `/uploads/${card.imageUrl}` || "/fallback.jpg"
              }
              alt={card.title}
              className="w-full h-60 object-contain mb-2 rounded"
            />
            <h2 className="text-sm font-semibold leading-snug line-clamp-2">
              {card.title}
            </h2>
            <p className="text-xs text-gray-600 truncate">
              {card.playerName} • {card.year}
            </p>
            <p className="text-sm font-bold mt-1">${card.price.toFixed(2)}</p>
            <button
              onClick={() =>
                addToCart({
                  id: card.id,
                  title: card.title,
                  price: card.price,
                  imageUrl: card.imageUrl,
                })
              }
              className="mt-auto bg-black text-white text-sm px-3 py-1 rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}