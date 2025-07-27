import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";
import { handleApiRoute } from "@/lib/handle-api";

export const POST = handleApiRoute(async (req: Request) => {
  const { id, newStatus } = await req.json();

  if (!id || !newStatus) {
    throw new ApiError(400, "Missing 'id' or 'newStatus'");
  }

  const updated = await prisma.flipCard.update({
    where: { id },
    data: { currentStatus: newStatus },
  });

  return new Response(JSON.stringify(updated), { status: 200 });
});