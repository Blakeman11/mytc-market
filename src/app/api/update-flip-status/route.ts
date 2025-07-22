import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { id, newStatus } = await req.json();

  const updated = await prisma.flipCard.update({
    where: { id },
    data: { currentStatus: newStatus },
  });

  return NextResponse.json(updated);
}