import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/cards/[id]
export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing card ID" }, { status: 400 });
  }

  const card = await prisma.yourCard.findUnique({
    where: { id },
  });

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  return NextResponse.json(card);
}

// PUT /api/admin/cards/[id]
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing card ID" }, { status: 400 });
  }

  const data = await req.json();

  try {
    const updated = await prisma.yourCard.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update card:", error);
    return NextResponse.json({ error: "Failed to update card" }, { status: 500 });
  }
}