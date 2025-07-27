import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";
import { handleApiRoute } from "@/lib/handle-api";

export const POST = handleApiRoute(async (req: Request) => {
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

  if (!title || !playerName || !brand || !year || !price) {
    throw new ApiError(400, "Missing required fields");
  }

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

  return new Response(JSON.stringify(newCard), { status: 201 });
});