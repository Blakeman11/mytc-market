import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";
import { handleApiRoute } from "@/lib/handle-api";

export const POST = handleApiRoute(async (req: Request) => {
  const { id, isSold } = await req.json();

  if (!id || typeof isSold !== "boolean") {
    throw new ApiError(400, "Missing or invalid 'id' or 'isSold' value");
  }

  const updated = await prisma.marketCard.update({
    where: { id },
    data: { isSold },
  });

  return new Response(JSON.stringify(updated), { status: 200 });
});