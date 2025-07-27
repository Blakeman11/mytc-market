import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";
import { handleApiRoute } from "@/lib/handle-api";

export const POST = handleApiRoute(async (req: Request) => {
  const data = await req.json();

  if (!data || !data.title || !data.playerName || !data.price) {
    throw new ApiError(400, "Missing required fields: title, playerName, price");
  }

  const created = await prisma.marketCard.create({
    data,
  });

  return new Response(JSON.stringify(created), { status: 201 });
});