"use client";

import { useState } from "react";

export default function FlipMyCardPage() {
  const [form, setForm] = useState({
    senderName: "",
    trackingCode: "",
    originalCard: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/flip", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) setSubmitted(true);
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Flip My Card</h1>
      {submitted ? (
        <p className="text-green-600 text-lg">Success! Your flip request has been submitted.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="senderName"
            placeholder="Your Name"
            value={form.senderName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="trackingCode"
            placeholder="Tracking Number"
            value={form.trackingCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="originalCard"
            placeholder="Card Details"
            value={form.originalCard}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">
            Submit Flip Request
          </button>
        </form>
      )}
    </main>
  );
}