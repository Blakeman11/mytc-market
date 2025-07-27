import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";
import { handleApiRoute } from "@/lib/handle-api";

export const POST = handleApiRoute(async (req: Request) => {
  const body = await req.json();

  const { senderName, trackingCode, originalCard } = body;

  if (!senderName || !trackingCode || !originalCard) {
    throw new ApiError(400, "Missing required flip fields");
  }

  const flip = await prisma.flipCard.create({
    data: {
      senderName,
      trackingCode,
      originalCard,
      flipFeePaid: false,
      currentStatus: "pending",
    },
  });

  return new Response(JSON.stringify(flip), { status: 201 });
});