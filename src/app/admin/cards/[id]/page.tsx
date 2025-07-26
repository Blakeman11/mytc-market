"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { YourCard } from "@prisma/client";
import ImageUploader from "@/components/ui/ImageUploader";

export default function EditCardPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [card, setCard] = useState<YourCard | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    playerName: "",
    brand: "",
    year: 2024,
    cardNumber: "",
    category: "",
    condition: "",
    grade: "",
    price: 0,
    imageUrl: "",
    isSold: false,
  });

  useEffect(() => {
  if (!id) return;

  fetch(`/api/admin/cards/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data || !data.title) {
        console.error("Card not found or missing fields:", data);
        setLoading(false);
        return;
      }
      setCard(data);
      setForm(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setLoading(false);
    });
}, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/admin/cards/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/admin/cards");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Edit Card</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input name="title" value={form.title} onChange={handleChange} />
        </div>
        <div>
          <Label>Player Name</Label>
          <Input name="playerName" value={form.playerName} onChange={handleChange} />
        </div>
        <div>
          <Label>Brand</Label>
          <Input name="brand" value={form.brand} onChange={handleChange} />
        </div>
        <div>
          <Label>Year</Label>
          <Input type="number" name="year" value={form.year} onChange={handleChange} />
        </div>
        <div>
          <Label>Card Number</Label>
          <Input name="cardNumber" value={form.cardNumber} onChange={handleChange} />
        </div>
        <div>
          <Label>Category</Label>
          <Input name="category" value={form.category} onChange={handleChange} />
        </div>
        <div>
          <Label>Condition</Label>
          <Input name="condition" value={form.condition} onChange={handleChange} />
        </div>
        <div>
          <Label>Grade</Label>
          <Input name="grade" value={form.grade} onChange={handleChange} />
        </div>
        <div>
          <Label>Price</Label>
          <Input type="number" name="price" value={form.price} onChange={handleChange} />
        </div>
        <div>
          <Label>Upload Image</Label>
          <ImageUploader
            onUploadComplete={(url) => {
              setForm((prev) => ({ ...prev, imageUrl: url }));
            }}
          />
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Card Preview"
              className="mt-2 w-full max-w-xs rounded shadow"
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isSold"
            checked={form.isSold}
            onChange={handleChange}
          />
          <Label htmlFor="isSold">Mark as Sold</Label>
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </main>
  );
}