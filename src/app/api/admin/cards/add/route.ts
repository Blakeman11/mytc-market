import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      playerName,
      brand,
      year,
      cardNumber,
      category,
      condition,
      grade,
      variant,
      price,
      imageUrl,
    } = body;

    const newCard = await prisma.marketCard.create({
      data: {
        title,
        playerName,
        brand,
        year: parseInt(year),
        cardNumber,
        category,
        condition,
        grade,
        variant,
        price: parseFloat(price),
        imageUrl,
        isSold: false,
      },
    });

    return NextResponse.json(newCard, { status: 201 });
  } catch (error) {
    console.error("Add Card Error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}