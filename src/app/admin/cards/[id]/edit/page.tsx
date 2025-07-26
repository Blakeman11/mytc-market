// src/app/admin/cards/[id]/edit/page.tsx

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditCardForm from "@/components/EditCardForm";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function EditCardPage({ params }: PageProps) {
  const card = await prisma.marketCard.findUnique({
    where: { id: params.id },
  });

  if (!card) return notFound();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit Card</h1>
      <EditCardForm card={card} />
    </main>
  );
}