import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const flip = await prisma.flipCard.create({
    data: {
      senderName: body.senderName,
      trackingCode: body.trackingCode,
      originalCard: body.originalCard,
      flipFeePaid: false,
      currentStatus: "pending",
    },
  });

  return NextResponse.json(flip);
}