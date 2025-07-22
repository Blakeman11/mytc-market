import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cards = await prisma.yourCard.findMany({
    where: { isSold: false },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(cards);
}