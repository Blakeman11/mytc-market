import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const flips = await prisma.flipCard.findMany({
    orderBy: { createdAt: "desc" },
  });

  const cards = await prisma.yourCard.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ flips, cards });
}