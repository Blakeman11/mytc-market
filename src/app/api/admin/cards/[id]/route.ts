import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiError } from "@/lib/api-error";
import { handleApiRoute } from "@/lib/handle-api";

// GET /api/admin/cards/[id]
export const GET = handleApiRoute(async (_req, context: { params: { id: string } }) => {
  const { id } = context.params;

  if (!id) throw new ApiError(400, "Missing card ID");

  const card = await prisma.marketCard.findUnique({ where: { id } });

  if (!card) throw new ApiError(404, "Card not found");

  return new Response(JSON.stringify(card), { status: 200 });
});

// PUT /api/admin/cards/[id]
export const PUT = handleApiRoute(async (req: NextRequest, context: { params: { id: string } }) => {
  const { id } = context.params;

  if (!id) throw new ApiError(400, "Missing card ID");

  const data = await req.json();

  const updated = await prisma.marketCard.update({
    where: { id },
    data,
  });

  return new Response(JSON.stringify(updated), { status: 200 });
});