"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [flips, setFlips] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin-data")
      .then((res) => res.json())
      .then((data) => {
        setFlips(data.flips);
        setCards(data.cards);
      });
  }, []);

  const updateFlipStatus = async (id: string, newStatus: string) => {
    const res = await fetch("/api/update-flip-status", {
      method: "POST",
      body: JSON.stringify({ id, newStatus }),
    });

    if (res.ok) {
      setFlips((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, currentStatus: newStatus } : f
        )
      );
    }
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Flip Submissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flips.map((flip) => (
            <div key={flip.id} className="border p-4 rounded bg-gray-50">
              <p><strong>Sender:</strong> {flip.senderName}</p>
              <p><strong>Tracking:</strong> {flip.trackingCode}</p>
              <p><strong>Card:</strong> {flip.originalCard}</p>
              <p>
                <strong>Status:</strong>{" "}
                <select
                  value={flip.currentStatus}
                  onChange={(e) =>
                    updateFlipStatus(flip.id, e.target.value)
                  }
                  className="border p-1 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="received">Received</option>
                  <option value="flipping">Flipping</option>
                  <option value="sold">Sold</option>
                  <option value="returned">Returned</option>
                </select>
              </p>
              <p><strong>Paid:</strong> {flip.flipFeePaid ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Your Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={card.id} className="border p-4 rounded bg-white">
              <img src={card.imageUrl} alt={card.title} className="h-40 object-cover w-full mb-2 rounded" />
              <h3 className="font-bold">{card.title}</h3>
              <p>{card.playerName} — {card.year}</p>
              <p><strong>${card.price.toFixed(2)}</strong></p>
              <label className="flex items-center gap-2 text-sm">
  <input
    type="checkbox"
    checked={card.isSold}
    onChange={async (e) => {
      const res = await fetch("/api/update-card-sold", {
        method: "POST",
        body: JSON.stringify({
          id: card.id,
          isSold: e.target.checked,
        }),
      });

      if (res.ok) {
        setCards((prev) =>
          prev.map((c) =>
            c.id === card.id ? { ...c, isSold: e.target.checked } : c
          )
        );
      }
    }}
  />
  {card.isSold ? "Sold" : "Available"}
</label>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}