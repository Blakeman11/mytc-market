import { prisma } from "@/lib/prisma";
import { handleApiRoute } from "@/lib/handle-api";

export const GET = handleApiRoute(async () => {
  const cards = await prisma.marketCard.findMany({
    where: { isSold: false },
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(cards), { status: 200 });
});