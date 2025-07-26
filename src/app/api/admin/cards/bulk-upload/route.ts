// src/app/api/admin/cards/bulk-upload/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "Expected an array of card objects" }, { status: 400 });
    }

    const formatted = data.map((card) => ({
      title: card.title || "",
      playerName: card.playerName || "",
      brand: card.brand || "",
      year: parseInt(card.year) || 2024,
      cardNumber: card.cardNumber || "",
      category: card.category || "",
      condition: card.condition || "",
      grade: card.grade || "",
      variant: card.variant || "",
      price: parseFloat(card.price) || 0,
      imageUrl: card.imageUrl || "",
      isSold: false,
    }));

    const created = await prisma.yourCard.createMany({ data: formatted });

    return NextResponse.json({ success: true, count: created.count });
  } catch (err) {
    console.error("Bulk upload failed:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}