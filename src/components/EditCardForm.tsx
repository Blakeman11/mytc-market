"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCardForm({ card }: { card: any }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: card.title || "",
    playerName: card.playerName || "",
    brand: card.brand || "",
    year: card.year || 2024,
    cardNumber: card.cardNumber || "",
    category: card.category || "",
    condition: card.condition || "",
    grade: card.grade || "",
    variant: card.variant || "",
    price: card.price || 0,
    imageUrl: card.imageUrl || "",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-card-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok && data.url) {
      setForm((prev) => ({ ...prev, imageUrl: data.url }));
    } else {
      alert("Image upload failed.");
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    const res = await fetch(`/api/admin/cards/${card.id}`, {
      method: "PUT",
      body: formData,
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
          value={form[field as keyof typeof form]}
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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        {uploading && <p className="text-sm text-gray-500 mt-1">Uploading image...</p>}
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