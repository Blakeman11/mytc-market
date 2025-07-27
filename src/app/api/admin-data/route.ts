import { prisma } from "@/lib/prisma";
import { handleApiRoute } from "@/lib/handle-api";

export const GET = handleApiRoute(async () => {
  const flips = await prisma.flipCard.findMany({
    orderBy: { createdAt: "desc" },
  });

  const cards = await prisma.marketCard.findMany({
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify({ flips, cards }), { status: 200 });
});