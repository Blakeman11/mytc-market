import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const created = await prisma.yourCard.create({
      data,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Failed to create card:", error);
    return NextResponse.json({ error: "Failed to create card" }, { status: 500 });
  }
}