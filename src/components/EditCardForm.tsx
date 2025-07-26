"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ui/ImageUploader";

interface Card {
  id: string;
  title: string;
  playerName: string;
  brand: string;
  year: number;
  cardNumber: string;
  category: string;
  condition: string;
  grade: string;
  variant: string;
  price: number;
  imageUrl?: string;
}

export default function EditCardForm({ card }: { card: Card }) {
  const router = useRouter();

  const [form, setForm] = useState<Card>({
    ...card,
    imageUrl: card.imageUrl || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/admin/cards/${card.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/cards");
      router.refresh();
    } else {
      alert("Failed to update card.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this card?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/admin/cards/${card.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/admin/cards");
      router.refresh();
    } else {
      alert("Failed to delete the card.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        "title",
        "playerName",
        "year",
        "brand",
        "cardNumber",
        "category",
        "condition",
        "grade",
        "variant",
        "price",
      ].map((field) => (
        <input
          key={field}
          name={field}
          type={field === "year" || field === "price" ? "number" : "text"}
          value={form[field as keyof Card] as string | number}
          onChange={handleChange}
          placeholder={field}
          className="w-full p-2 border rounded"
        />
      ))}

      <div>
        <label className="block mb-1 font-medium">Card Image</label>
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Card"
            className="h-32 w-auto object-contain mb-2 rounded shadow"
          />
        )}
        <ImageUploader
          onUploadComplete={(url) =>
            setForm((prev) => ({ ...prev, imageUrl: url }))
          }
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Save Changes
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Card
        </button>
      </div>
    </form>
  );
}