"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/ui/ImageUploader";

type CardForm = {
  title: string;
  playerName: string;
  brand: string;
  year: number;
  cardNumber: string;
  category: string;
  condition: string;
  grade: string;
  price: number;
  imageUrl: string;
  isSold: boolean;
};

export default function NewCardPage() {
  const router = useRouter();

  const [form, setForm] = useState<CardForm>({
    title: "",
    playerName: "",
    brand: "",
    year: new Date().getFullYear(),
    cardNumber: "",
    category: "",
    condition: "",
    grade: "",
    price: 0,
    imageUrl: "",
    isSold: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setForm((prev) => ({
        ...prev,
        [name]: checkbox.checked,
      }));
    } else if (type === "number") {
      setForm((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/admin/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/cards");
    } else {
      const error = await res.json();
      alert("Failed to submit: " + error.message);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Add New Card</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {(
          [
            { label: "Title", name: "title" },
            { label: "Player Name", name: "playerName" },
            { label: "Brand", name: "brand" },
            { label: "Year", name: "year", type: "number" },
            { label: "Card Number", name: "cardNumber" },
            { label: "Category", name: "category" },
            { label: "Condition", name: "condition" },
            { label: "Grade", name: "grade" },
            { label: "Price", name: "price", type: "number" },
          ] as const
        ).map(({ label, name, type }) => (
          <div key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Input
              name={name}
              id={name}
              type={type || "text"}
              value={form[name]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div>
          <Label>Upload Image</Label>
          <ImageUploader
            onUploadComplete={(url) =>
              setForm((prev) => ({ ...prev, imageUrl: url }))
            }
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
            id="isSold"
            checked={form.isSold}
            onChange={handleChange}
          />
          <Label htmlFor="isSold">Mark as Sold</Label>
        </div>

        <Button type="submit">Create Card</Button>
      </form>
    </main>
  );
}