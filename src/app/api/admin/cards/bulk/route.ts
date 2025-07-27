import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";
import { handleApiRoute } from "@/lib/handle-api";

export const POST = handleApiRoute(async (req: Request) => {
  const { cards } = await req.json();

  if (!cards || !Array.isArray(cards)) {
    throw new ApiError(400, "Invalid input: expected an array of cards.");
  }

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
    throw new ApiError(400, "No valid cards found in input.");
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

  return new Response(JSON.stringify({ success: true, created }), {
    status: 200,
  });
});