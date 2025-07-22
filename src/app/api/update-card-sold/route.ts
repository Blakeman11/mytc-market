import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { id, isSold } = await req.json();

  const updated = await prisma.yourCard.update({
    where: { id },
    data: { isSold },
  });

  return NextResponse.json(updated);
}