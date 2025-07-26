import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { cards } = await req.json();

    if (!cards || !Array.isArray(cards)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Filter out cards with missing required fields
    const validCards = cards.filter((card) =>
      card.title &&
      card.playerName &&
      card.brand &&
      card.year &&
      card.cardNumber &&
      card.category &&
      card.condition !== undefined &&
      card.grade !== undefined
    );

    if (validCards.length === 0) {
      return NextResponse.json(
        { error: "No valid cards found in input" },
        { status: 400 }
      );
    }

    const created = await prisma.marketCard.createMany({
      data: validCards.map((card) => ({
        title: card.title,
        playerName: card.playerName,
        brand: card.brand,
        year: Number(card.year),
        cardNumber: card.cardNumber,
        category: card.category,
        condition: card.condition,
        grade: card.grade,
        variant: card.variant || "",
        price: Number(card.price) || 0,
        imageUrl: card.imageUrl || "",
        isSold: false,
      })),
    });

    return NextResponse.json({ success: true, created });
  } catch (err) {
    console.error("❌ Bulk upload failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}